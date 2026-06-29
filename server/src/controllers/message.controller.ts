import { Request, Response } from "express";
import { messageService } from "../services/message.service";

export const MessageController = {

    async getAllMessages(req: Request, res: Response){
        try{

            const data = await messageService.getAllMessages();

            res.status(200).json(data);
        } catch (error){
            return res.status(500).json(error);
        }

    },

    async getMessageById(req: Request<{id:string}>, res: Response){
        try{
            const {id} = req.params;

            const data = await messageService.getMessageById(id);
            res.status(200).json(data);
        } catch (error){
            return res.status(500).json(error);
        }
    },

    async getMessagesByChatId(req: Request<{chatId:string}>, res: Response){
        try{
            const {chatId} = req.params;

            const data = await messageService.getMessagesByChatId(chatId);
            res.status(200).json(data);
        } catch (error){
            return res.status(500).json(error);
        }
    },

    async getMessagesByChatIdAndRole(req: Request<{chatId:string, role:string}>, res: Response){
        try{
            const {chatId, role} = req.params;

            const data = await messageService.getMessagesByChatIdAndRole({chatId,role});
            res.status(200).json(data);
        } catch (error){
            return res.status(500).json(error);
        }
    },

    async getMessagesByRole(req: Request<{role:string}>, res: Response){
        try{
            const {role} = req.params;

            const data = await messageService.getMessagesByRole(role);
            res.status(200).json(data);
        } catch (error){
            return res.status(500).json(error);
        }
    },

    async create(req: Request, res:Response){
        try{
            const {chatId, role, content} = req.body;

            const data = await messageService.create({chatId,role,content})
            res.status(201).json(data);
        } catch (error){
            return res.status(500).json(error);
        }
    },

    async delete(req: Request<{id:string}>, res:Response){
        try{
            const {id} = req.params;

            const data = await messageService.delete(id);
            res.status(204).json(data);
        } catch (error){
            return res.status(500).json(error);
        }
    }
}