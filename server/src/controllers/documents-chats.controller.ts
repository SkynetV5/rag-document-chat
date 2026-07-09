import { Request, Response } from "express";
import { DocumentsChatsService } from "../services/documents-chats.service";

export const DocumentsChatsController = {

    async create(req: Request, res: Response){

        try{

            const {documentId, chatId} = req.body;

            const data = await DocumentsChatsService.create({documentId,chatId});

            return res.status(201).json(data);
        } catch(error){
            return res.status(500).json({error: `Failed to create documentsChats. Error: ${error}`});
        }
    },

    async deleteByDocumentId(req: Request<{documentId:string}>, res: Response){
        try{

            const {documentId} = req.params;

            const data = await DocumentsChatsService.deleteByDocumentId(documentId);

            res.status(204).json({message: "Deleted successfully."});
        } catch(error){
            return res.status(500).json({error: `Failed to delete. Error: ${error}`});
        }
    },

    async deleteByChatId(req: Request<{chatId:string}>, res: Response){
        try{

            const {chatId} = req.params;

            const data = await DocumentsChatsService.deleteByDocumentId(chatId);

            res.status(204).json({message: "Deleted successfully."});
        } catch(error){
            return res.status(500).json({error: `Failed to delete. Error: ${error}`});
        }
    },

    async getByChatId(req: Request<{chatId:string}>, res: Response){
        try{

            const {chatId} = req.params;

            const data = await DocumentsChatsService.getByChatId(chatId);

            res.status(200).json(data);
        } catch(error){
            return res.status(500).json({error: `Failed to get data. Error: ${error}`});
        }
    },

    async getByDocumentId(req: Request<{documentId:string}>, res: Response){
        try{

            const {documentId} = req.params;

            const data = await DocumentsChatsService.getByChatId(documentId);

            res.status(200).json(data);
        } catch(error){
            return res.status(500).json({error: `Failed to get data. Error: ${error}`});
        }
    }
}