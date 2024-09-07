import { Router } from "express"
import jobController from "../controllers/job.controller"

const job = Router()
job.post("/create", jobController.createJob)
job.get("/all", jobController.getAllJobs)
job.get("/get/:id", jobController.getJobById)
job.put("/update/:id", jobController.updateJob)
job.delete("/delete/:id", jobController.deleteJob)

export default job
