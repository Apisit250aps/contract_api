import { Router } from "express"
import workerController from "../controllers/worker.controller"

const worker = Router()

worker.post("/create", workerController.createWorker)
worker.get("/all", workerController.getAllWorkers)
worker.get("/get/:id", workerController.getWorkerById)
worker.put("/update/:id", workerController.updateWorker)
worker.delete("/delete/:id", workerController.deleteWorker)

export default worker
