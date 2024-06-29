import express from "express";
import { register, login ,getUserDetail,getAllUsers} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=express.Router();

router.post("/new",register);
router.post("/login",login);
router.get("/all",isAuthenticated,getAllUsers);
router.get("/me",isAuthenticated,getUserDetail);

export default router;