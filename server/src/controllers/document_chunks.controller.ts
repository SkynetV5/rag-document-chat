import { Request, Response } from "express";
import { documentChunksService } from "../services/document_chunks.service";

export const DocumentChunksController = {

    async indexDocumentChunks(req:Request<{documentId:string}>, res:Response){
        const { documentId } = req.params;
        try{
            
            const data = await documentChunksService.indexDocumentChunks(documentId);

            return res.status(201).json(`Created document chunks on document Id: ${documentId}`);
        } catch (error){

            return res.status(500).json(`Failed document chunks on document Id: ${documentId}, Error: ${error}`);
        }
    }
}