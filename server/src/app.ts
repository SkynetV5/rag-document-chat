import './env';
import express from 'express';
import cors from 'cors';
import chatRoutes from "./routers/chat.route";

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/chat", chatRoutes);


// test route

app.get("/health", (req, res) => {

    res.json({status: "ok", message: "Server is running"});
});

export default app;