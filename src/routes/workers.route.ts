import { Router } from "express"
import workerController from "../controllers/worker.controller"
import { authenticated } from "../middlewares/auth.middleware";

const worker = Router()
worker.use(authenticated)
worker.post("/create", workerController.createWorker)
worker.get("/all", workerController.getAllWorkers)
worker.get("/get/:id", workerController.getWorkerById)
worker.put("/update/:id", workerController.updateWorker)
worker.delete("/delete/:id", workerController.deleteWorker)

export default worker
