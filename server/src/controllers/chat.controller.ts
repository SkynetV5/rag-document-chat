import { Request, Response } from "express";
import { chatService } from "../services/chat.service";


export const ChatController = {

    async sendMessage(req: Request, res: Response){
        try {
            const {chatId, message} = req.body;
    
    
            const data = await chatService.handleChat({
                chatId,
                message
            });
    
            res.status(200).json(data);
    
        } catch(error){
            console.error(error);
            res.status(500).json({
                error: `Chat failed. Error: ${error}`
            });
        }
    },

    async getAllChats(req:Request, res:Response){
       try{
            const data = await chatService.getAllChats();
            return res.status(200).json(data);
       }
       catch(error){
            return res.status(500).json({error: `Failed to get all chats. Error: ${error}`});
        }
       
    },

    async getChatById(req:Request<{id:string}>, res:Response){

        try{
            const {id} = req.params;
            const data = await chatService.getChatById(id);
            return res.status(200).json(data);
        
        } catch(error){
            return res.status(500).json({error: `Failed to get chat by id. Error: ${error}`});
        }
        
    },

    async create(req:Request, res:Response){
        try{
            const { title } = req.body;
            const data = await chatService.create(title);
            return res.status(201).json(data);
        }
        catch (error){
            return res.status(500).json({error: `Failed to create chat. Error: ${error}`});
        }

       
    },

    async delete(req:Request<{id:string}>, res:Response){
        try{
            const {id} = req.params;
            const data = await chatService.delete(id);
            return res.status(204).json({message: "Chat deleted successfully."});
       }
        catch(error){
            return res.status(500).json({error: `Failed to delete chat. Error: ${error}`});
        }

        
    }

}