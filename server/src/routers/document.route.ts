import { Router } from "express";
import { upload } from "../lib/upload";
import { DocumentController } from "../controllers/document.controller";

const router  = Router();

router.post("/create", upload.single('file'), DocumentController.create)
router.delete("/delete/:id", DocumentController.delete)
router.get("/getAllDocuments", DocumentController.getAllDocuments)
router.get("/getDocumentById/:id", DocumentController.getDocumentById)
router.get("/getDocumentsByName/:name", DocumentController.getDocumentsByName)

export default router;