import { Router } from "express"
import AuthController from "../controllers/auth.controller";

const auth = Router()
auth.post("/register", AuthController.authLogin)
auth.post("/login", AuthController.authLogin)

export default auth