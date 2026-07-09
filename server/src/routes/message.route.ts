import { Router } from "express";
import { MessageController } from "../controllers/message.controller";

const router = Router();

/**
 * @swagger
 * /message/create:
 *   post:
 *     summary: Create a message
 *     tags:
 *       - Messages
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/create", MessageController.create);

/**
 * @swagger
 * /message/getAllMessages:
 *   get:
 *     summary: Get all messages
 *     tags:
 *       - Messages
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/getAllMessages", MessageController.getAllMessages);

/**
 * @swagger
 * /message/getMessageById:
 *   get:
 *     summary: Get messages by chat id
 *     tags:
 *       - Messages
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/getMessageById", MessageController.getMessagesByChatId);

/**
 * @swagger
 * /message/getMessageByRole:
 *   get:
 *     summary: Get messages by role
 *     tags:
 *       - Messages
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/getMessageByRole", MessageController.getMessagesByRole);

/**
 * @swagger
 * /message/getMessagesByChatId:
 *   get:
 *     summary: Get messages by chat id
 *     tags:
 *       - Messages
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/getMessagesByChatId", MessageController.getMessagesByChatId);

/**
 * @swagger
 * /message/getMessagesByChatIdAndRole:
 *   get:
 *     summary: Get messages by chat id and role
 *     tags:
 *       - Messages
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/getMessagesByChatIdAndRole", MessageController.getMessagesByChatIdAndRole);

/**
 * @swagger
 * /message/delete:
 *   delete:
 *     summary: Delete a message
 *     tags:
 *       - Messages
 *     responses:
 *       200:
 *         description: Success
 */
router.delete("/delete", MessageController.delete);

export default router;
