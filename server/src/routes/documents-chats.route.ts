import { Router } from "express";
import { DocumentsChatsController } from "../controllers/documents-chats.controller";

const router = Router();

/**
 * @openapi
 * /document-chats/create:
 *   post:
 *     summary: Create a document-chat relation
 *     tags:
 *       - Document Chats
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDocumentChatRequest'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DocumentChatsArray'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/create", DocumentsChatsController.create);

/**
 * @openapi
 * /document-chats/deleteByChatId/{id}:
 *   delete:
 *     summary: Delete document-chat relations by chat id
 *     tags:
 *       - Document Chats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/deleteByChatId/:id", DocumentsChatsController.deleteByChatId);

/**
 * @openapi
 * /document-chats/deleteByDocumentId/{id}:
 *   delete:
 *     summary: Delete document-chat relations by document id
 *     tags:
 *       - Document Chats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/deleteByDocumentId/:id", DocumentsChatsController.deleteByDocumentId);

/**
 * @openapi
 * /document-chats/getByDocumentId:
 *   get:
 *     summary: Get document-chat relations by document id
 *     tags:
 *       - Document Chats
 *     parameters:
 *       - in: query
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DocumentChatsArray'
 */
router.get("/getByDocumentId", DocumentsChatsController.getByDocumentId);

/**
 * @openapi
 * /document-chats/getByChatId:
 *   get:
 *     summary: Get document-chat relations by chat id
 *     tags:
 *       - Document Chats
 *     parameters:
 *       - in: query
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DocumentChatsArray'
 */
router.get("/getByChatId", DocumentsChatsController.getByChatId);

export default router;

