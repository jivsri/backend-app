import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const createNewTask=async(req,res,next)=>{
    try {
        const {title,description}=req.body;
        let task=await Task.create({
            title: title,
            description: description,
            user: req.user._id,
        });
        return res.status(201).json({
            success: true,
            message: "task added scucessfully",
        });
    } catch (error) {
        next(error)
    }
};

export const getMyTasks=async(req,res)=>{
    try {
        let tasks=await Task.find({user: req.user._id});
        if(!tasks) return next(new ErrorHandler("Task not Found",404));
        res.status(200).json({
            success: true,
            tasks,
        });    
    } catch (error) {
        next(error);
    }
    
}

export const updateTask=async(req,res)=>{
    try {
        let task=await Task.findById({_id: req.params.id});
        if(!task) return next(new ErrorHandler("Task not Found",404));
        task.isCompleted=!task.isCompleted;
        await task.save();
        return res.status(200).json({
            success: true,
            message: "task updated",
            task,
        });
    } catch (error) {
        next(error);
    }
}

export const deleteTask=async(req,res,next)=>{
    try {
        let tasks=await Task.findById({_id: req.params.id});
        if(!tasks) return next(new ErrorHandler("Task not Found",404));
        await tasks.deleteOne();
        return res.status(200).json({
            success: true,
            message: "task deleted",
        });
    } catch (error) {
        next(error);
    }
}
