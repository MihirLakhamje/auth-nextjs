import { Router } from "express";
import { 
  login,
  logout,
  me,
  signup
} from "../controllers/user.controller.js";
import { authVerify } from "../middlewares/authVerify.js";
const router = Router()

router.route("/signup").post(signup)
router.route("/login").post(login)

router.route("/logout").get(authVerify, logout)

router.route("/me").get(authVerify, me)

export default router