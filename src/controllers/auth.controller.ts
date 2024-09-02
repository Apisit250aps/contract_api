import { Request, Response } from "express"
import { User } from "../models"
import { IUser } from "../models/user.model"
import { comparePasswords, hashPassword } from "../utils/password"
import { generateToken } from "../utils/jwt"

async function authRegister(req: Request<IUser>, res: Response) {
  try {
    const { username, password, email } = req.body
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists!" })
    }

    // Hash the password and create a new user
    const hashedPassword = await hashPassword(password) // Ensure this function returns a promise
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    })

    return res.status(201).json({ newUser })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

async function authLogin(req: Request, res: Response) {
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

export default { authRegister, authLogin }
