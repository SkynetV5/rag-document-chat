import { Router } from "express";
import { DocumentChunksController } from "../controllers/document_chunks.controller";

const router  = Router();

router.post("/indexDocumentChunks/:documentId", DocumentChunksController.indexDocumentChunks)


export default router;