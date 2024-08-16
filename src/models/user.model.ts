import mongoose, { Document, Schema } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  createdAt?: Date
}

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model<IUser>("User", UserSchema)

export default User
