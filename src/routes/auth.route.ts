import { Router } from "express"
import AuthController from "../controllers/auth.controller"
import { authenticateJWT } from "../middlewares/auth.middleware"

const auth = Router()
auth.post("/register", AuthController.authLogin)
auth.post("/login", AuthController.authLogin)
auth.use(authenticateJWT)
auth.get("/", AuthController.checkAuth)
export default auth
