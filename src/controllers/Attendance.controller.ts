import { Request, Response } from "express"
import Attendance, { IAttendance } from "../models/attendance.model"

const createAttendance = async (req: Request, res: Response) => {
  try {
    const attendanceData: IAttendance = req.body
    const newAttendance = new Attendance(attendanceData)
    const savedAttendance = await newAttendance.save()
    res.status(201).json(savedAttendance)
  } catch (error) {
    res.status(400).json({ message: "Error creating attendance", error })
  }
}

const getAllAttendances = async (req: Request, res: Response) => {
  try {
    const attendances = await Attendance.find().populate("worker job")
    res.json(attendances)
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendances", error })
  }
}

const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const attendance = await Attendance.findById(req.params.id).populate(
      "worker job"
    )
    if (attendance) {
      res.json(attendance)
    } else {
      res.status(404).json({ message: "Attendance not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error })
  }
}

const updateAttendance = async (req: Request, res: Response) => {
  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("worker job")
    if (updatedAttendance) {
      res.json(updatedAttendance)
    } else {
      res.status(404).json({ message: "Attendance not found" })
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating attendance", error })
  }
}

const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id)
    if (deletedAttendance) {
      res.json({ message: "Attendance deleted successfully" })
    } else {
      res.status(404).json({ message: "Attendance not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting attendance", error })
  }
}

const getAttendancesByJob = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params
    const attendances = await Attendance.find({ job: jobId }).populate("worker")
    res.json(attendances)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching attendances for job", error })
  }
}

export default {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  getAttendancesByJob
}
