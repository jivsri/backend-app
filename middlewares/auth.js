import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated=async(req,res,next)=>{
    let {token}=req.cookies;
    if(!token){
        return res.status(404).json({
            success: false,
            message: "Logg in first",
        });
    }

    let decoded=jwt.decode(token,process.env.JWT_SECRET);
    let user=await User.findById(decoded.id).select("+password");
    req.user=user;
    next();
}