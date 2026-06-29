import './env';
import express from 'express';
import cors from 'cors';
import chatRoutes from "./routers/chat.route";
import messageRouters from "./routers/message.route";
import documentRoutes from "./routers/document.route";

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/chat", chatRoutes);
app.use("/message", messageRouters)
app.use("/document", documentRoutes);


// test route

app.get("/health", (req, res) => {

    res.json({status: "ok", message: "Server is running"});
});

export default app;