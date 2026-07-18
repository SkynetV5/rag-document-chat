import { Request, Response } from "express";
import { DocumentsChatsService } from "../services/documents-chats.service";
import { asyncHandler, validateId, validateRequiredString } from "../utils/validation";

export const DocumentsChatsController = {

    create: asyncHandler(async (req: Request, res: Response) => {

        const {documentId, chatId} = req.body;

        const validatedDocumentId = validateId(documentId,"documentId")
        const validatedChatId = validateId(chatId,"chatId")

        const data = await DocumentsChatsService.create({documentId: validatedDocumentId,chatId: validatedChatId});

        return res.status(201).json(data);
        
    }),

    deleteByDocumentId: asyncHandler(async (req: Request<{documentId:string}>, res: Response) => {
        
        const {documentId} = req.params;

        const data = await DocumentsChatsService.deleteByDocumentId(validateId(documentId,"documentId"));

        res.status(204).json({message: "Deleted successfully."});
    }),

    deleteByChatId: asyncHandler(async (req: Request<{chatId:string}>, res: Response) => {
    
        const {chatId} = req.params;

        const data = await DocumentsChatsService.deleteByDocumentId(validateId(chatId,"chatId"));

        res.status(204).json({message: "Deleted successfully."});
    }),

    getByChatId: asyncHandler(async (req: Request<{chatId:string}>, res: Response) => {
       
        const {chatId} = req.params;

        const data = await DocumentsChatsService.getByChatId(validateId(chatId,"chatId"));

        res.status(200).json(data);

    }),

    getByDocumentId: asyncHandler(async (req: Request<{documentId:string}>, res: Response) => {
        
        const {documentId} = req.params;

        const data = await DocumentsChatsService.getByChatId(validateId(documentId, "documentId"));

        res.status(200).json(data);
        
    })
}