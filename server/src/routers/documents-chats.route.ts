import { Router } from "express";
import { upload } from "../lib/upload";
import { DocumentsChatsController } from "../controllers/documents-chats.controller";

const router  = Router();

router.post("/create", DocumentsChatsController.create)
router.delete("/deleteByChatId/:id", DocumentsChatsController.deleteByChatId)
router.delete("/deleteByDocumentId/:id", DocumentsChatsController.deleteByDocumentId)
router.get("/getByDocumentId", DocumentsChatsController.getByDocumentId)
router.get("/getByChatId", DocumentsChatsController.getByChatId)

export default router;