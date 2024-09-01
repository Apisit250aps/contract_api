import { Router } from "express"
import authController from "../controllers/auth.controller"

const auth = Router()
auth.post("/register", authController.authRegister)
auth.post("/login", authController.authLogin)

export default auth
