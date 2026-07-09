import { Router } from "express";
import { DocumentChunksController } from "../controllers/document-chunks.controller";

const router = Router();

/**
 * @swagger
 * /document-chunks/indexDocumentChunks/{documentId}:
 *   post:
 *     summary: Index document chunks
 *     tags:
 *       - Document Chunks
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/indexDocumentChunks/:documentId", DocumentChunksController.indexDocumentChunks);

export default router;
