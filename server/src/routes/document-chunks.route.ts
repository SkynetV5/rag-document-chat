import { Router } from "express";
import { DocumentChunksController } from "../controllers/document-chunks.controller";

const router = Router();

/**
 * @openapi
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
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/indexDocumentChunks/:documentId", DocumentChunksController.indexDocumentChunks);

export default router;
