import mongoose, { Schema } from "mongoose"
import { IWorker } from "./worker.model"

// Interface for Job
export interface IJob extends Document {
  title: string
  description?: string
  startDate?: Date
  endDate?: Date
  areaSize?: number
  ratePerArea?: number
  workers: mongoose.Types.ObjectId[] | IWorker[]
}

const JobSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  areaSize: { type: Number, required: false },
  ratePerArea: { type: Number, required: false },
  workers: [{ type: Schema.Types.ObjectId, ref: "Worker" }]
})

const Job = mongoose.model<IJob>("Job", JobSchema)

export default Job
