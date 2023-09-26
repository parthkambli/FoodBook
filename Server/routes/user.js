import { Router } from "express";
import { loginUser, signupUser } from "../controllers/User.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);

export default router;
