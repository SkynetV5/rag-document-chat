import "../server/src/env";

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ragService } from "../server/src/services/rag.service";
import { groq } from "../server/src/lib/groq";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type EvaluationQuestion = {
    id: string;
    question: string;
    expected_answer: string;
    expected_document: string;
    expected_pages: number[];
};

type ChatMapping = Record<string, string>;

async function evaluate() {
    const datasetPath = path.join(__dirname, "dataset.json");
    const chatsPath = path.join(__dirname, "chats.json");

    const dataset: EvaluationQuestion[] = JSON.parse(
        await readFile(datasetPath, "utf-8")
    );

    const chats: ChatMapping = JSON.parse(
        await readFile(chatsPath, "utf-8")
    );

    const results = [];

    for (const item of dataset) {
        console.log(`\nEvaluating ${item.id}: ${item.question}`);

        const chatId = chats[item.expected_document];

        if (!chatId) {
            console.error(
                `No chatId found for document: ${item.expected_document}`
            );
            continue;
        }

        // 1. Retrieval
        const retrieved = await ragService.getRelevantContext({
            chatId,
            query: item.question,
            match_count: 10,
        });

        console.log(
            "Retrieved pages:",
            retrieved.map((r: any) => r.page_number)
        );

        // 2. Generate answer using your actual application LLM
        const generatedAnswer = await ragService.askLLM({
            message: item.question,
            context: retrieved,
        });

        console.log("Generated answer:");
        console.log(generatedAnswer);

        // 3. Evaluate generated answer
        const evaluation = await evaluateAnswer({
            question: item.question,
            expectedAnswer: item.expected_answer,
            generatedAnswer: generatedAnswer || "",
            context: retrieved,
        });

        results.push({
            id: item.id,
            question: item.question,
            expectedAnswer: item.expected_answer,
            generatedAnswer,
            retrievedPages: retrieved.map((r: any) => r.page_number),
            evaluation,
        });
    }

    const outputDir = path.join(__dirname, "results");

    await mkdir(outputDir, { recursive: true });

    await writeFile(
        path.join(outputDir, "answer-results.json"),
        JSON.stringify(
            {
                results,
            },
            null,
            2
        )
    );

    console.log("\nEvaluation finished.");
}


async function evaluateAnswer({
    question,
    expectedAnswer,
    generatedAnswer,
    context,
}: {
    question: string;
    expectedAnswer: string;
    generatedAnswer: string;
    context: any[];
}) {
    const contextText = context
        .map((c) => c.content)
        .join("\n\n");

    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",

        messages: [
            {
                role: "system",
                content: `
You are an evaluator for a Retrieval-Augmented Generation system.

Evaluate the generated answer using the question, expected answer,
and retrieved context.

Score each category from 1 to 5.

Correctness:
Does the generated answer provide the correct information?

Groundedness:
Is the generated answer supported by the retrieved context?
Do not give credit for information that is not supported by the context.

Relevance:
Does the answer directly address the question?

Completeness:
Does the answer contain all important information required to answer
the question?

Return only the requested JSON structure.
                `,
            },
            {
                role: "user",
                content: `
Question:
${question}

Expected answer:
${expectedAnswer}

Generated answer:
${generatedAnswer}

Retrieved context:
${contextText}
                `,
            },
        ],

        response_format: {
            type: "json_schema",
            json_schema: {
                name: "rag_evaluation",
                strict: true,
                schema: {
                    type: "object",
                    properties: {
                        correctness: {
                            type: "integer",
                        },
                        groundedness: {
                            type: "integer",
                        },
                        relevance: {
                            type: "integer",
                        },
                        completeness: {
                            type: "integer",
                        },
                        reason: {
                            type: "string",
                        },
                    },
                    required: [
                        "correctness",
                        "groundedness",
                        "relevance",
                        "completeness",
                        "reason",
                    ],
                    additionalProperties: false,
                },
            },
        },
    });

    return JSON.parse(
        response.choices[0].message.content || "{}"
    );
}

evaluate().catch((error) => {
    console.error("Evaluation failed:", error);
    process.exitCode = 1;
});