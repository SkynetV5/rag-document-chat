import { Router } from "express";
import { MessageController } from "../controllers/message.controller";

const router = Router();

router.post("/create", MessageController.create);
router.get("/getAllMessages", MessageController.getAllMessages);
router.get("/getMessageById", MessageController.getMessagesByChatId);
router.get("/getMessageByRole", MessageController.getMessagesByRole);
router.get("/getMessagesByChatId", MessageController.getMessagesByChatId)
router.get("/getMessagesByChatIdAndRole", MessageController.getMessagesByChatIdAndRole);
router.delete("/delete", MessageController.delete);

export default router;