import bodyParser from "body-parser"
import express, { Express, Response, Request } from "express"
import helmet from "helmet"
import morgan from "morgan"
import router from "./routes";
import cors from 'cors'
const app: Express = express()
// basic middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())
// index route
app.use("/", router)
//
export default app
