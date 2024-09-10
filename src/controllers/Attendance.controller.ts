import { Request, Response } from "express"
import Attendance, { IAttendance } from "../models/attendance.model"
import mongoose from "mongoose"

const createAttendance = async (req: Request, res: Response) => {
  try {
    const attendanceData: IAttendance = req.body

    // Check if an attendance record already exists for this job and date
    const existingAttendance = await Attendance.findOne({
      job: attendanceData.job,
      date: attendanceData.date,
      worker: attendanceData.worker
    })

    if (existingAttendance) {
      return res.status(409).json({
        message:
          "Attendance record already exists for this job, worker, and date",
        existingAttendance
      })
    }

    // If no existing record, create a new one
    const newAttendance = new Attendance(attendanceData)
    const savedAttendance = await newAttendance.save()
    res.status(201).json(savedAttendance)
  } catch (error) {
    console.error("Error in createAttendance:", error)
    res.status(400).json({
      message: "Error creating attendance",
      error: error instanceof Error ? error.message : String(error)
    })
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
    const id = new mongoose.Types.ObjectId(req.params.id)
    const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, {
      new: true
    }).populate("worker job")
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
