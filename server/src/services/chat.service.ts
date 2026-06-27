import { ragService } from "./rag.service";

export const chatService = {
    async handleChat({chatId, message}: {chatId: string; message:string}){

        // RAG pipeline
        const context = await ragService.getRelevantContext({
            chatId,
            query:message,
        });

        const answer = await ragService.askLLM({
            message,
            context,
        });

        return {
            answer,
            contextUsed: context.length
        }
    }
}