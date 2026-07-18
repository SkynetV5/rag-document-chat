import { Request, Response } from "express";
import { documentService } from "../services/document.service";
import { documentChunksService } from "../services/document-chunks.service";
import { asyncHandler, validateId, validateRequiredString } from "../utils/validation";
import { Multer } from "multer";


type UploadedFile = {
    originalname: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
  };

type UploadRequest = Request & { file?: UploadedFile };

export const DocumentController = {

    create: asyncHandler(async (req: UploadRequest, res: Response) => {
       
        const file = req.file;

        if (!file){
            return res.status(400).json({error: "Not file uploaded."});
        }

        const data = await documentService.create(file);

        await documentChunksService.indexDocumentChunks(validateId(
            data.id, "documentId"));
        
        return res.status(201).json({message: "Document created successfully."});
    }),

    delete: asyncHandler(async (req: Request<{id: string}>, res: Response) => {
       
        const { id } = req.params;
        const data = await documentService.delete(validateId(id,"id"));

        return res.status(204).json({message: "Document deleted successfully."});
    }),
    
    getAllDocuments: asyncHandler(async (req: Request, res: Response) => {
       
        const data = await documentService.getAllDocuments();
        
        return res.status(200).json(data);
        
    }),

    getDocumentById: asyncHandler(async (req: Request<{id: string}>, res: Response) => {
       
        const { id } = req.params;
        const data = await documentService.getDocumentById(validateId(id, "id"));

        return res.status(200).json(data);
        
    }),

    getDocumentsByName: asyncHandler(async(req: Request<{name: string}>, res: Response) => {
       
        const { name } = req.params;
        const data = await documentService.getDocumentsByName(validateRequiredString(name,"name"));

        return res.status(200).json(data);
        
    })
}