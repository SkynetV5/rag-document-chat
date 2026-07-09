import './env';
import express from 'express';
import cors from 'cors';
import chatRoutes from "./routes/chat.route";
import messageRouters from "./routes/message.route";
import documentRoutes from "./routes/document.route";
import documentChunksRoutes from "./routes/document-chunks.route";
import documentsChatsRoutes from "./routes/document-chunks.route";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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