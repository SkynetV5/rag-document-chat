import { Router } from "express";
import { DocumentsChatsController } from "../controllers/documents-chats.controller";

const router = Router();

/**
 * @swagger
 * /document-chats/create:
 *   post:
 *     summary: Create a document-chat relation
 *     tags:
 *       - Document Chats
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/create", DocumentsChatsController.create);

/**
 * @swagger
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
 *       200:
 *         description: Success
 */
router.delete("/deleteByChatId/:id", DocumentsChatsController.deleteByChatId);

/**
 * @swagger
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
 *       200:
 *         description: Success
 */
router.delete("/deleteByDocumentId/:id", DocumentsChatsController.deleteByDocumentId);

/**
 * @swagger
 * /document-chats/getByDocumentId:
 *   get:
 *     summary: Get document-chat relations by document id
 *     tags:
 *       - Document Chats
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/getByDocumentId", DocumentsChatsController.getByDocumentId);

/**
 * @swagger
 * /document-chats/getByChatId:
 *   get:
 *     summary: Get document-chat relations by chat id
 *     tags:
 *       - Document Chats
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/getByChatId", DocumentsChatsController.getByChatId);

export default router;

