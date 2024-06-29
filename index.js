import express from "express";
import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js";
import { connectDB } from "./database/db.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";


config({
    path: "./database/config.env",
})

connectDB();

const app=express();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}));
app.use("/users",userRoutes);
app.use("/tasks",taskRoutes);



app.get("/",(req,res)=>{
    res.send("noice");
});



app.use(errorMiddleware);




















app.listen(process.env.PORT,()=>{
    console.log(`server connected at ${process.env.PORT} and in ${process.env.NODE_ENV} mode`);
})