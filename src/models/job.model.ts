import mongoose, { Schema } from "mongoose"
import { IWorker } from "./worker.model"

// Interface for Job
export interface IJob extends Document {
  title: string
  description: string
  startDate: Date
  endDate: Date
  areaSize: number
  ratePerArea: number
  workers: mongoose.Types.ObjectId[] | IWorker[]
}

const JobSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  areaSize: { type: Number, required: true },
  ratePerArea: { type: Number, required: true },
  workers: [{ type: Schema.Types.ObjectId, ref: "Worker" }]
})

const Job = mongoose.model<IJob>("Job", JobSchema)

export default Job
