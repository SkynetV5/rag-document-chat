import { Request, Response } from "express";
import { chatService } from "../services/chat.service";
import { asyncHandler, validateId, validateRequiredString } from "../utils/validation";


export const ChatController = {

    sendMessage: asyncHandler(async (req: Request, res: Response) => {
        
        const {chatId, message} = req.body;

        const validChatId = validateId(chatId, "chatId");
        const validMessage = validateRequiredString(message,"message");


        const data = await chatService.handleChat({
            chatId: validChatId,
            message: validMessage
        });

        res.status(200).json(data);
    }),

    getAllChats: asyncHandler(async (req:Request, res:Response) => {

        const data = await chatService.getAllChats();
        return res.status(200).json(data);
       
    }),

    getChatById: asyncHandler(async (req:Request<{id:string}>, res:Response) => {

        const {id} = req.params;
        const data = await chatService.getChatById(validateId(id,"id"));
        return res.status(200).json(data);
        
    }),

    create: asyncHandler(async (req:Request, res:Response) =>{

        const { title } = req.body;
        const data = await chatService.create(validateRequiredString(title,"title"));
        return res.status(201).json(data);

    }),

    delete: asyncHandler( async (req:Request<{id:string}>, res:Response) => {
      
            const {id} = req.params;
            const data = await chatService.delete(validateId(id,"id"));
            return res.status(204).json({message: "Chat deleted successfully."});
        
    })

}