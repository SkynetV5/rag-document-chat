import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";

const router = Router();

/**
 * @swagger
 * /chat/sendMessage:
 *   post:
 *     summary: Send a message
 *     tags:
 *       - Chats
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/sendMessage", ChatController.sendMessage);

/**
 * @swagger
 * /chat/create:
 *   post:
 *     summary: Create a new chat
 *     tags:
 *       - Chats
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/create", ChatController.create);

/**
 * @swagger
 * /chat/getAllChats:
 *   get:
 *     summary: Get all chats
 *     tags:
 *       - Chats
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/getAllChats", ChatController.getAllChats);

/**
 * @swagger
 * /chat/getChatById/{id}:
 *   get:
 *     summary: Get chat by id
 *     tags:
 *       - Chats
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
router.get("/getChatById/:id", ChatController.getChatById);

/**
 * @swagger
 * /chat/delete/{id}:
 *   delete:
 *     summary: Delete a chat
 *     tags:
 *       - Chats
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
router.delete("/delete/:id", ChatController.delete);

export default router;