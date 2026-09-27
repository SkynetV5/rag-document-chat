import { embeddingService } from "./embedding.service";
import { supabase } from "../lib/supabase";
import { groq } from "../lib/groq";

export const ragService = {
    async getRelevantContext({
        chatId,
        query,
        match_count = 5,
    }: {
        chatId: string,
        query:string,
        match_count?: number,
    }) {

        const embedding = await embeddingService.embed(query);

        const {data, error} = await supabase.rpc("match_documents", {
            query_embedding: embedding,
            match_count:match_count,
            chat_id: chatId
        })

        if (error) {
            console.error("Supabase RPC error:", error);
            throw error;
        }

        //console.log(data);

        return data || [];
    },

    async askLLM({
        message,
        context,
    }: {
        message:string;
        context: any[]
    }) {
        const contextText = context.map((c) => c.content).join("\n");

        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant who uses the context provided. Keep your answers as brief as possible, but precise. Don't use tables, lists, or dashes. Write only adult-style sentences. Always answer in the language of the question.",
              },
              {
                role: "user",
                content: `Context:\n${contextText}\n\nQuestion:\n${message}`,
              },
            ],
          });
        return response.choices[0].message.content;
    }
}