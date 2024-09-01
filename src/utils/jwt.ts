import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.SECRET_KEY as string

export function generateToken(
  payload: object,
  expiresIn: string = "1d"
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
