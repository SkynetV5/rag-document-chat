import { Request, Response } from "express";
import { messageService } from "../services/message.service";
import { asyncHandler, validateId, validateRequiredString, validateRole } from "../utils/validation";

export const MessageController = {

    getAllMessages: asyncHandler(async (req: Request, res: Response) => {
        
        const data = await messageService.getAllMessages();

        res.status(200).json(data);

    }),

    getMessageById: asyncHandler(async (req: Request<{id:string}>, res: Response) => {
       
        const {id} = req.params;

        const data = await messageService.getMessageById(validateId(id,"id"));
        res.status(200).json(data);
       
    }),

    getMessagesByChatId: asyncHandler(async (req: Request<{chatId:string}>, res: Response) => {
      
        const {chatId} = req.params;

        const data = await messageService.getMessagesByChatId(validateId(chatId,"chatId"));
        res.status(200).json(data);
    }),

    getMessagesByChatIdAndRole: asyncHandler(async (req: Request<{chatId:string, role:string}>, res: Response) => {
        
        const {chatId, role} = req.params;
        const validatedChatId = validateId(chatId,"chatId");
        const validatedRole = validateRole(role);

        const data = await messageService.getMessagesByChatIdAndRole({chatId: validatedChatId,role: validatedRole});
        res.status(200).json(data);
    }),

    getMessagesByRole: asyncHandler(async (req: Request<{role:string}>, res: Response) => {
        
        const {role} = req.params;

        const data = await messageService.getMessagesByRole(validateRole(role));
        res.status(200).json(data);
      
    }),

    create: asyncHandler(async (req: Request, res: Response) => {
        
        const {chatId, role, content} = req.body;

        const validatedChatId = validateId(chatId,"chatId");
        const validatedRole = validateRole(role);
        const validatedContent = validateRequiredString(content,"content");

        const data = await messageService.create({
            chatId: validatedChatId,
            role: validatedRole,
            content: validatedContent
        });

        res.status(201).json(data);
    
    }),

   delete: asyncHandler(async (req: Request<{id:string}>, res:Response) => {

        const {id} = req.params;

        const data = await messageService.delete(validateId(id,"id"));
        res.status(204).json({message: "Message deleted successfully."});
    
    })
}