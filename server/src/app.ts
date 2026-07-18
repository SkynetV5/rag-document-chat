import './env';
import express from 'express';
import cors from 'cors';
import chatRoutes from "./routes/chat.route";
import messageRouters from "./routes/message.route";
import documentRoutes from "./routes/document.route";
import documentChunksRoutes from "./routes/document-chunks.route";
import documentsChatsRoutes from "./routes/documents-chats.route";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

/**
 * @swagger
 * components:
 *   schemas:
 *     Document:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         file_path:
 *           type: string
 *         size:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *     DocumentsArray:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Document'
 *     Chat:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *     ChatsArray:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Chat'
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         chat_id:
 *           type: string
 *         role:
 *           type: string
 *         content:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *     MessagesArray:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Message'
 *     DocumentChat:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         chat_id:
 *           type: string
 *         document_id:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *     DocumentChatsArray:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/DocumentChat'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     CreateChatRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *       required:
 *         - title
 *     CreateMessageRequest:
 *       type: object
 *       properties:
 *         chatId:
 *           type: string
 *         role:
 *           type: string
 *         content:
 *           type: string
 *       required:
 *         - chatId
 *         - role
 *         - content
 *     CreateDocumentChatRequest:
 *       type: object
 *       properties:
 *         documentId:
 *           type: string
 *         chatId:
 *           type: string
 *       required:
 *         - documentId
 *         - chatId
 *     UploadDocumentRequest:
 *       type: object
 *       properties:
 *         file:
 *           type: string
 *           format: binary
 */
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/docs.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );

  // test route
  
  app.get("/health", (req, res) => {
  
      res.json({status: "ok", message: "Server is running"});
  });


//routes
app.use("/chat", chatRoutes);
app.use("/message", messageRouters)
app.use("/document", documentRoutes);
app.use("/document-chunks", documentChunksRoutes);
app.use("/document-chats", documentsChatsRoutes)



export default app;