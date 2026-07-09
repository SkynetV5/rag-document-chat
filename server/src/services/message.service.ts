import { supabase } from "../lib/supabase"
import { chatService } from "./chat.service";

export const messageService = {
    async getAllMessages(){
        const {data, error} = await supabase.from("messages").select('*').order("created_at", {ascending: true});

        if (error) throw error;

        return data;
    },

    async getMessageById(id:string){
        const {data, error} = await supabase.from("messages").select("*").eq("id",id).single();

        if (error) throw error;

        return data;
    },

    async getMessagesByChatId(chatId:string){
        const {data, error} = await supabase.from("messages").select("*").eq("chat_id", chatId).order("created_at", {ascending:true});
        
        if (error) throw error;

        return data;
    },

    async getMessagesByRole(role:string){
        const {data, error} = await supabase.from("messages").select("*").eq("role", role).order("created_at", {ascending:true});
        
        if (error) throw error;

        return data;
    },
    async getMessagesByChatIdAndRole({chatId, role}: {chatId: string, role:string}){
        const {data, error} = await supabase.from("messages").select("*").eq("chat_id", chatId).eq("role", role).order("created_at", {ascending:true});
        
        if (error) throw error;

        return data;
    },


    async create({chatId, role, content}: {chatId:string, role:string, content:string}){

        const {data: chat, error: chatError} = await chatService.getChatById(chatId);

        if (!chat[0].id) throw new Error("This Chat Id doesn't exist.");

        const {data, error} = await supabase.from("messages").insert({chatId,role,content}).select().single();

        if (error) throw error;

        return data;
    },

    async delete(id:string){
        const {data, error} = await supabase.from("messages").delete().eq("id", id).single();

        if (error) throw error;

        return data;
    }
}