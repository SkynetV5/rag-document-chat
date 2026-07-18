import { Request, Response } from "express";
import { documentChunksService } from "../services/document-chunks.service";
import { asyncHandler, validateId } from "../utils/validation";

export const DocumentChunksController = {

    indexDocumentChunks: asyncHandler(async (req:Request<{documentId:string}>, res:Response) => {
        const { documentId } = req.params;
      
        const data = await documentChunksService.indexDocumentChunks(validateId(documentId,"documentId"));

        return res.status(201).json(`Created document chunks on document Id: ${documentId}`);
    })
}