import { Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt"
import { IUser } from "../models/user.model"
import User from "../models/user.model"
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      user?: IUser
      headers: {
        authorization?: string
      }
    }
  }
}

export const authenticated = async (
  req: Express.Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" })
  }
  
  const tokenParts = authHeader.split(" ")
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid token format" })
  }

  const token = tokenParts[1]

  try {
    const decoded = verifyToken(token) as IUser
    const user = await User.findById(decoded.id).select("-password")

    if (!user) {
      return res.status(401).json({ error: "User not found" })
    }

    req.user = user
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ error: "Token has expired" })
    } else if (error instanceof JsonWebTokenError) {
      return res.status(403).json({ error: "Invalid token" })
    }
    return res.status(500).json({ error: "Internal server error" })
  }
}