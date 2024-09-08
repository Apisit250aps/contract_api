import { Request, Response } from "express"
import Job, { IJob } from "../models/job.model"
import { PaginationResult } from "./worker.controller";

const createJob = async (req: Request<{ body: IJob }>, res: Response) => {
  try {
    const jobData = req.body
    const newJob = new Job(jobData)
    const savedJob = await newJob.save()
    res.status(201).json(savedJob)
  } catch (error) {
    res.status(400).json({ message: "Error creating job", error })
  }
}

const getAllJobs = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1)
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit as string) || 10)
    )

    const skip = (page - 1) * limit
    const jobs = await Job.find().populate("workers").skip(skip).limit(limit)

    const totalJobs = await Job.countDocuments()
    const totalPages = Math.ceil(totalJobs / limit)
    const totalItems = await Job.countDocuments()
    const result: PaginationResult<(typeof jobs)[0]> = {
      data: jobs,
      currentPage: page,
      totalPages,
      totalItems
    }
    res.json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: (error as Error).message })
  }
}

const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id).populate("workers")
    if (job) {
      res.json(job)
    } else {
      res.status(404).json({ message: "Job not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error })
  }
}

const updateJob = async (req: Request, res: Response) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).populate("workers")
    if (updatedJob) {
      res.json(updatedJob)
    } else {
      res.status(404).json({ message: "Job not found" })
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating job", error })
  }
}

const deleteJob = async (req: Request, res: Response) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id)
    if (deletedJob) {
      res.json({ message: "Job deleted successfully" })
    } else {
      res.status(404).json({ message: "Job not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error })
  }
}

export default {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
}
