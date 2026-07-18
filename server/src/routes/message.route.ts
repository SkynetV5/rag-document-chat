import { Router } from "express";
import { MessageController } from "../controllers/message.controller";

const router = Router();

/**
 * @openapi
 * /message/create:
 *   post:
 *     summary: Create a message
 *     tags:
 *       - Messages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMessageRequest'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/create", MessageController.create);

/**
 * @openapi
 * /message/getAllMessages:
 *   get:
 *     summary: Get all messages
 *     tags:
 *       - Messages
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessagesArray'
 */
router.get("/getAllMessages", MessageController.getAllMessages);

/**
 * @openapi
 * /message/getMessageById/{id}:
 *   get:
 *     summary: Get message by id
 *     tags:
 *       - Messages
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
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/getMessageById/:id", MessageController.getMessagesByChatId);

/**
 * @openapi
 * /message/getMessageByRole/{role}:
 *   get:
 *     summary: Get messages by role
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessagesArray'
 */
router.get("/getMessageByRole/:role", MessageController.getMessagesByRole);

/**
 * @openapi
 * /message/getMessagesByChatId/{chatId}:
 *   get:
 *     summary: Get messages by chat id
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: path
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
 *               $ref: '#/components/schemas/MessagesArray'
 */
router.get("/getMessagesByChatId/:chatId", MessageController.getMessagesByChatId);

/**
 * @openapi
 * /message/getMessagesByChatIdAndRole/{chatId}/{role}:
 *   get:
 *     summary: Get messages by chat id and role
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessagesArray'
 */
router.get("/getMessagesByChatIdAndRole/:chatId/:role", MessageController.getMessagesByChatIdAndRole);

/**
 * @openapi
 * /message/delete/{id}:
 *   delete:
 *     summary: Delete a message
 *     tags:
 *       - Messages
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
router.delete("/delete/:id", MessageController.delete);

export default router;
