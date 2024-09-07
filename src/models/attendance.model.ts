import mongoose, { Schema } from "mongoose"
import { IWorker } from "./worker.model"
import { IJob } from "./job.model";

export interface IAttendance extends Document {
  date: Date
  present: boolean
  worker: mongoose.Types.ObjectId | IWorker
  job: mongoose.Types.ObjectId | IJob
}

const AttendanceSchema: Schema = new Schema({
  date: { type: Date, required: true },
  present: { type: Boolean, required: true },
  worker: { type: Schema.Types.ObjectId, ref: "Worker", required: true },
  job: { type: Schema.Types.ObjectId, ref: "Job", required: true }
})

const Attendance = mongoose.model<IAttendance>("Attendance", AttendanceSchema)

export default Attendance
