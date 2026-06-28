import { Router } from "express";
import { ChatController} from "../controllers/chat.controller";

const router = Router();

router.post("/sendMessage", ChatController.sendMessage);
router.post("/create", ChatController.create);
router.get("/getAllChats", ChatController.getAllChats);
router.get("/getChatById/:id", ChatController.getChatById);
router.delete("/delete/:id", ChatController.delete);

export default router;