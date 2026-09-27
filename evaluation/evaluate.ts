import "../server/src/env";

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ragService } from "../server/src/services/rag.service";
import {
    RetrievedChunk,
    hitAtK,
    reciprocalRank,
} from "./metrics";

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

type QuestionResult = {
    id: string;
    question: string;
    expectedDocument: string;
    expectedPages: number[];
    retrieved: RetrievedChunk[];
    hitAt1: boolean;
    hitAt3: boolean;
    hitAt5: boolean;
    hitAt10: boolean;
    reciprocalRank: number;
};

const datasetPath = path.join(__dirname, "dataset.json");
const chatsPath = path.join(__dirname, "chats.json");


async function evaluate() {

    const dataset: EvaluationQuestion[] = JSON.parse(
        await readFile(datasetPath, "utf-8")
    );
    
    const chats: ChatMapping = JSON.parse(
        await readFile(chatsPath, "utf-8")
    );

    const results: QuestionResult[] = [];

    for (const item of dataset) {
        console.log(`\nEvaluating ${item.id}: ${item.question}`);

        const chatId = chats[item.expected_document];

        if (!chatId) {
            console.error(
                `No chatId found for document: ${item.expected_document}`
            );
            continue;
        }

        const retrieved = await ragService.getRelevantContext({
            chatId,
            query: item.question,
            match_count: 10,
        });

        const typedResults = retrieved as RetrievedChunk[];

        const result: QuestionResult = {
            id: item.id,
            question: item.question,
            expectedDocument: item.expected_document,
            expectedPages: item.expected_pages,
            retrieved: typedResults,

            hitAt1: hitAtK(typedResults, item.expected_pages, 1),
            hitAt3: hitAtK(typedResults, item.expected_pages, 3),
            hitAt5: hitAtK(typedResults, item.expected_pages, 5),
            hitAt10: hitAtK(typedResults, item.expected_pages, 10),

            reciprocalRank: reciprocalRank(
                typedResults,
                item.expected_pages
            ),
        };

        results.push(result);

        console.log({
            HitAt1: result.hitAt1,
            HitAt3: result.hitAt3,
            HitAt5: result.hitAt5,
            HitAt10: result.hitAt10,
            MRR: result.reciprocalRank,
        });

        console.log(
            item.id,
            "expected:",
            item.expected_pages,
            "retrieved:",
            typedResults.map((r) => r.page_number)
        );
    }

    const total = results.length;

    if (total === 0) {
        console.log("No evaluation results.");
        return;
    }

    const summary = {
        totalQuestions: total,

        hitAt1: results.filter((r) => r.hitAt1).length / total,
        hitAt3: results.filter((r) => r.hitAt3).length / total,
        hitAt5: results.filter((r) => r.hitAt5).length / total,
        hitAt10: results.filter((r) => r.hitAt10).length / total,

        MRR:
            results.reduce(
                (sum, result) => sum + result.reciprocalRank,
                0
            ) / total,
    };

    console.log("\n=== EVALUATION SUMMARY ===");
    console.table(summary);

    const outputDir = path.join(__dirname, "results");

    await mkdir(outputDir, { recursive: true });

    await writeFile(
        path.join(outputDir, "retrieval-results.json"),
        JSON.stringify(
            {
                summary,
                results,
            },
            null,
            2
        )
    );

    console.log(
        "\nResults saved to evaluation/results/retrieval-results.json"
    );
}

evaluate().catch((error) => {
    console.error("Evaluation failed:", error);
    process.exitCode = 1;
});