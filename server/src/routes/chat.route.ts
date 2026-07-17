import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";

const router = Router();

/**
 * @openapi
 * /chat/sendMessage:
 *   post:
 *     summary: Send a message
 *     tags:
 *       - Chats
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMessageRequest'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 answer:
 *                   type: string
 *                 contextUsed:
 *                   type: integer
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/sendMessage", ChatController.sendMessage);

/**
 * @openapi
 * /chat/create:
 *   post:
 *     summary: Create a new chat
 *     tags:
 *       - Chats
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateChatRequest'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/create", ChatController.create);

/**
 * @openapi
 * /chat/getAllChats:
 *   get:
 *     summary: Get all chats
 *     tags:
 *       - Chats
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatsArray'
 */
router.get("/getAllChats", ChatController.getAllChats);

/**
 * @openapi
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/getChatById/:id", ChatController.getChatById);

/**
 * @openapi
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
 *       204:
 *         description: No Content
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/delete/:id", ChatController.delete);

export default router;