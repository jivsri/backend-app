import {User} from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";


export const register=async(req,res)=>{
    try {
        let {name,email,password}=req.body;
        let user=await User.findOne({email});
        if(user){
            res.status(404).json({
                success: false,
                message: "User already exists. Login First",
            });
        }
        let hashedPassword=await bcrypt.hash(password,10);
        user=await User.create({
            name :name,
            email: email,
            password: hashedPassword,
        });
        sendCookie(user._id,201,res,"registered successfully");
    } catch (error) {
        next(error);
    }
};



export const login=async(req,res)=>{
    try {
        let {email,password}=req.body;
        let user=await User.findOne({email}).select("+password");
        if(user){
            let boolCheck=await bcrypt.compare(password,user.password);
            if(boolCheck){
                sendCookie(user._id,200,res,"logged in successfully");
            }
            else{
                res.status(404).json({
                    success: false,
                    message: "Incorrect email or password",
                });
            }
        }
        else{
            res.status(404).json({
                success: false,
                message: "Incorrect email or password",
            });
        }
    } catch (error) {
        next(error);
    }
}



export const getAllUsers=async(req,res)=>{
    try {
        let arr=await User.find({});
        if(!arr) return next(new ErrorHandler("Users not found",404));
        res.status(200).json({
            success: true,
            users: arr,
        });
    } catch (error) {
        next(error);
    }
};



export const getUserDetail=(req,res)=>{   
    res.status(200).json({
        success: true,
        user: req.user,
    })
};

export const logout=(req,res)=>{
    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
        secure: process.env.NODE_ENV==="Development"?false:true,
    }).json({
        success: true,
        message: "User Logout",
    })
}