import { Router } from "express";
import { upload } from "../lib/upload";
import { DocumentController } from "../controllers/document.controller";

const router = Router();

/**
 * @swagger
 * /document/create:
 *   post:
 *     summary: Upload document
 *     tags:
 *       - Documents
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UploadDocumentRequest'
 *     responses:
 *       201:
 *         description: Document created
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
 *       204:
 *         description: No Content
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DocumentsArray'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DocumentsArray'
 */
router.get("/getDocumentsByName/:name", DocumentController.getDocumentsByName);

export default router;

