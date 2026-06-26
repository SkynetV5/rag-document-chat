import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test route

app.get("/health", (req, res) => {

    res.json({status: "ok", message: "Server is running"});
});

export default app;