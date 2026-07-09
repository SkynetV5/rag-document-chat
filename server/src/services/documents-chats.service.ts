import { supabase } from "../lib/supabase"
import { chatService } from "./chat.service";
import { documentService } from "./document.service";

export const DocumentsChatsService = {

    async create({documentId, chatId} : {documentId:string, chatId:string}) {

        const {data: chat, error: errorChat} = await chatService.getChatById(chatId);
        const {data: document, error: documentError} = await documentService.getDocumentById(documentId);

        if (errorChat) throw errorChat;
        if (documentError) throw documentError;

        if (!chat[0].id || !document[0].id) throw new Error("Chat Id or Document Id doesn't exists.")

        const {data: documentChat, error: documentChatError} = await supabase.from("chat_documents").select("*").eq("chat_id", chatId).eq("document_id", documentId).single();

        if (documentChatError) throw documentChatError;
        
        if (documentChat.data.length == 0){
            const {data, error} = await supabase.from("chat_documents").insert({
                chat_id: chatId,
                document_id: documentId
            })

            if (error) throw error;

            return data;
        }

        if (documentChat.data.length != 0){
            throw new Error("Record already exist.");
        }

        return []
        

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