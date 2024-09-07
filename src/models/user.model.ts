import mongoose, { Document, Schema } from "mongoose"

export interface IUser extends Document {
  username: string
  password: string
  email: string
  createdAt?: Date
}

const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    default: null
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const User = mongoose.model<IUser>("User", UserSchema)
