import { Router } from "express";
import { upload } from "../lib/upload";
import { DocumentController } from "../controllers/document.controller";

const router = Router();

/**
 * @swagger
 * /document/create:
 *   post:
 *     summary: Upload a document
 *     tags:
 *       - Documents
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/create", upload.single("file"), DocumentController.create);

/**
 * @swagger
 * /document/delete/{id}:
 *   delete:
 *     summary: Delete a document
 *     tags:
 *       - Documents
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
router.delete("/delete/:id", DocumentController.delete);

/**
 * @swagger
 * /document/getAllDocuments:
 *   get:
 *     summary: Get all documents
 *     tags:
 *       - Documents
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/getAllDocuments", DocumentController.getAllDocuments);

/**
 * @swagger
 * /document/getDocumentById/{id}:
 *   get:
 *     summary: Get a document by id
 *     tags:
 *       - Documents
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
router.get("/getDocumentById/:id", DocumentController.getDocumentById);

/**
 * @swagger
 * /document/getDocumentsByName/{name}:
 *   get:
 *     summary: Get documents by name
 *     tags:
 *       - Documents
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/getDocumentsByName/:name", DocumentController.getDocumentsByName);

export default router;

