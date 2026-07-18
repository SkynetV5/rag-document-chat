import { supabase } from "../lib/supabase";
import { DocumentsChatsService } from "./documents-chats.service";
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
    },

    async getAllChats(){
        const {data, error} = await supabase.from("chats").select("*").order("created_at", {ascending: false});

        
        if (error) throw error;

        return data
    },

    async getChatById(id:string){
        const {data, error} = await supabase.from("chats").select("*").eq("id", id).single();

        if (error) throw error;

        return data;
    },

    async create(title:string){
        const {data, error} = await supabase.from("chats").insert({title}).select().single();

        if (error) throw error;

        return data;
    },

    async delete(id:string){

        const documentsChatByChatId = await DocumentsChatsService.getByChatId(id);

        for (let i = 0; i < documentsChatByChatId.length; i++){
            await DocumentsChatsService.deleteByChatId(id);
        }

        const {data, error} = await supabase.from("chats").delete().eq("id", id).single();

        if (error) throw error;

        return data;
    }
}