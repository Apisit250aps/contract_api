import { Request, Response } from "express"
import User, { IUser } from "../models/user.model"
import { comparePasswords, hashPassword } from "../utils/password"
import { generateToken } from "../utils/jwt"

async function authRegister(req: Request<{ body: IUser }>, res: Response) {
  try {
    const { username, password } = req.body

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists!" })
    }

    const hashedPassword = await hashPassword(password)
    const newUser = await User.create({
      username,
      password: hashedPassword
    })

    return res
      .status(201)
      .json({ message: "Register successfully!", user: newUser })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

async function authLogin(req: Request<{ body: IUser }>, res: Response) {
  try {
    const { username, password } = req.body

    // Find the user by username
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password!" })
    }

    // Check if the password matches
    const isMatch = await comparePasswords(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password!" })
    }
    // Generate a JWT token
    const token = generateToken({ id: user._id, username: user.username })

    return res.status(200).json({ token })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
async function checkAuth(req: Request, res: Response) {
  try {
    // The user object is attached to the request by the authenticateJWT middleware
    const user = req.user as IUser

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    // Fetch fresh user data from the database
    const freshUserData = await User.findById(user._id).select("-password")

    if (!freshUserData) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json({ user: freshUserData })
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while checking authentication" })
  }
}

export default { authRegister, authLogin, checkAuth }
