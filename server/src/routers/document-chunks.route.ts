import { Router } from "express";
import { DocumentChunksController } from "../controllers/document-chunks.controller";

const router  = Router();

router.post("/indexDocumentChunks/:documentId", DocumentChunksController.indexDocumentChunks)


export default router;