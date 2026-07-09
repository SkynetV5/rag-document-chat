import { Request, Response } from "express";
import { documentService } from "../services/document.service";

export const DocumentController = {

    async create(req: Request, res: Response){
        try{
            const file = req.file;

            if (!file){
                return res.status(400).json({error: "Not file uploaded."});
            }

            const data = await documentService.create(file);
            
            return res.status(201).json({message: "Document created successfully."});
        } catch (error){
            return res.status(500).json({error: `Failed to create document. Error: ${error}`});
        }
    },

    async delete(req: Request<{id: string}>, res: Response){
        try{
            const { id } = req.params;
            const data = await documentService.delete(id);

            return res.status(204).json({message: "Document deleted successfully."});
        } catch (error){
            return res.status(500).json({error: `Failed to delete document. Error: ${error}`});
        }
    },
    
    async getAllDocuments(req: Request, res: Response){
        try{
            const data = await documentService.getAllDocuments();
            
            return res.status(200).json(data);
        }
        catch (error){
            return res.status(500).json({error: "Failed to get all documents."});
        }
    },

    async getDocumentById(req: Request<{id: string}>, res: Response){
        try{
            const { id } = req.params;
            const data = await documentService.getDocumentById(id);

            return res.status(200).json(data);
        }
        catch (error){
            return res.status(500).json({error: `Failed to get document by id. Error: ${error}`});
        }
    },

    async getDocumentsByName(req: Request<{name: string}>, res: Response){
        try{
            const { name } = req.params;
            const data = await documentService.getDocumentsByName(name);

            return res.status(200).json(data);
        } catch (error){
            return res.status(500).json({error: `Failed to get documents by name. Error: ${error}`});
        }
    }
}