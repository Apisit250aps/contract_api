import mongoose from "mongoose"

import { db_url } from "../configs"

const uri = db_url as string

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri)
    console.log("Database connected successfully")
  } catch (error) {
    console.error("Database connection error:", error)
    process.exit(1)
  }
}

export { connectToDatabase }