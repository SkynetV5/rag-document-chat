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

        res.json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json({error: "Chat failed"});
        }
    },

    async getAllChats(req:Request, res:Response){
        const {data, error} = await supabase.from("chats").select("*").order("created_at", {ascending: false});

        if(error){
            return res.status(500).json(error);
        }
        res.json(data);
    },

    async create(req:Request, res:Response){
        const { title} = req.body;
        const {data, error} = await supabase.from("chats").insert({title}).select().single();

        if(error){
            return res.status(500).json(error);
        }

        res.json(data);
    },

    async delete(req:Request, res:Response){
        const {id} = req.params;

        const {data, error} = await supabase.from("chats").delete().eq("id", id);

        if(error){
            return res.status(500).json(error);
        }

        res.json(data);
    }

}