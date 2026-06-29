import { Router } from "express";
import { upload } from "../lib/upload";
import { DocumentController } from "../controllers/document.controller";

const router  = Router();

router.post("/create", upload.single('file'), DocumentController.create)

export default router;