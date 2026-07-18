import { supabase } from "../lib/supabase"
import { chatService } from "./chat.service";
import { documentService } from "./document.service";

export const DocumentsChatsService = {

    async create({documentId, chatId}: {documentId:string, chatId:string}) {

        const chat = await chatService.getChatById(chatId);
        const document = await documentService.getDocumentById(documentId);

        if (!chat?.id || !document?.id) {
            throw new Error("Chat Id or Document Id doesn't exist.");
        }
    
    
        const {data: existingRelation, error: existingError} = await supabase
            .from("chat_documents")
            .select("*")
            .eq("chat_id", chatId)
            .eq("document_id", documentId)
            .maybeSingle();
    
    
        if (existingError) throw existingError;
    
    
        if (existingRelation) {
            return undefined;
        }
    
    
        const {data, error} = await supabase
            .from("chat_documents")
            .insert({
                chat_id: chatId,
                document_id: documentId
            })
            .select()
            .single();
    
    
        if (error) throw error;
    
        return data;
    },

    async deleteByDocumentId(documentId: string){
        const {data, error} = await supabase.from("chat_documents").delete().eq("document_id", documentId);

        if (error) throw error;

        return data;
    },

    async deleteByChatId(chatId: string){
        const {data, error} = await supabase.from("chat_documents").delete().eq("chat_id", chatId);

        if (error) throw error;

        return data;
    },

    async getByChatId(chatId:string){
        const {data, error} = await supabase.from("chat_documents").select("*").eq("chat_id", chatId);

        if (error) throw error;

        return data;
    },

    async getByDocumentId(documentId:string){
        const {data, error} = await supabase.from("chat_documents").select("*").eq("document_id", documentId);

        if (error) throw error;

        return data;
    }
}