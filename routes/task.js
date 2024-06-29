import express from "express";
import { createNewTask,getMyTasks,deleteTask,updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";



const router=express.Router();

router.post("/new",isAuthenticated,createNewTask);
router.get("/getmytasks",isAuthenticated,getMyTasks);
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask)


export default router;