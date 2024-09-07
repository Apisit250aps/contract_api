import mongoose, { Document, Schema } from "mongoose"

export interface IWorker extends Document {
  name: string
  contactInfo?: string
}

// Schema for Worker
const WorkerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    contactInfo: { type: String, required: false }
  },
  {
    timestamps: true
  }
)

const Worker = mongoose.model<IWorker>("Worker", WorkerSchema)

export default Worker
