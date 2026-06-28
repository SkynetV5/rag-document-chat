import { Request, Response } from "express";
import { chatService } from "../services/chat.service";
import {supabase} from "../lib/supabase";


export const ChatController = {

    async sendMessage(req: Request, res: Response) {
        try{
            const {chatId,message} = req.body;
        
            const result = await chatService.handleChat({
                chatId,
                message
            });

        res.status(200).json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json({error: "Chat failed"});
        }
    },

    async getAllChats(req:Request, res:Response){
       try{
            const data = await chatService.getAllChats();
            res.status(200).json(data);
       }
       catch(error){
            return res.status(500).json(error);
        }
       
    },

    async getChatById(req:Request<{id:string}>, res:Response){

        try{
            const {id} = req.params;
            const data = await chatService.getChatById(id);
            res.status(200).json(data);
        
        } catch(error){
            return res.status(500).json(error);
        }
        
    },

    async create(req:Request, res:Response){
        try{
            const { title } = req.body;
            const data = await chatService.create(title);
            res.status(201).json(data);
        }
        catch (error){
            return res.status(500).json(error);
        }

       
    },

    async delete(req:Request<{id:string}>, res:Response){
        try{
            const {id} = req.params;
            const data = await chatService.delete(id);
            res.status(204).json(data);
       }
        catch(error){
            return res.status(500).json(error);
        }

        
    }

}