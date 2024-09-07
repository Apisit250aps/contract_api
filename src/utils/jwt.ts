import jwt from "jsonwebtoken"
import { secret_key } from "../configs";

const JWT_SECRET = secret_key as string

export function generateToken(
  payload: object,
  expiresIn: string = "30d"
): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error("Invalid or expired token")
  }
}
