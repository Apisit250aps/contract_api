import { Router } from "express"
import authController from "../controllers/auth.controller"
import { authenticated } from "../middlewares/auth.middleware"

const auth = Router()
auth.post("/register", authController.authRegister)
auth.post("/login", authController.authLogin)
auth.use(authenticated)
auth.get("/", authController.checkAuth)

export default auth
