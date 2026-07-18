import { embeddingService } from "./embedding.service";
import { supabase } from "../lib/supabase";
import { groq } from "../lib/groq";

export const ragService = {
    async getRelevantContext({
        chatId,
        query,
    }: {
        chatId: string,
        query:string,
    }) {

        const embedding = await embeddingService.embed(query);

        const {data} = await supabase.rpc("match_documents", {
            query_embedding: embedding,
            match_count:5,
            chat_id: chatId
        })

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
            model: "llama-3.1-8b-instant",
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant using provided context.",
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