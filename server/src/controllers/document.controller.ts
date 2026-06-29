import { Request, Response } from "express";
import { create } from "node:domain";
import { documentService } from "../services/document.service";

export const DocumentController = {

    async create(req: Request, res: Response){
        try{
            const file = req.file;

            if (!file){
                return res.status(400).json({error: "Not file uploaded."});
            }

            const data = await documentService.create(file);
            
            return res.status(201).json(data);
        } catch (error){
            return res.status(500).json(error);
        }
    }
}