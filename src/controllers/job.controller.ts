import { Request, Response } from "express"
import Job, { IJob } from "../models/job.model"

const createJob = async (req: Request, res: Response) => {
  try {
    const jobData: IJob = req.body
    const newJob = new Job(jobData)
    const savedJob = await newJob.save()
    res.status(201).json(savedJob)
  } catch (error) {
    res.status(400).json({ message: "Error creating job", error })
  }
}

const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().populate("workers")
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error })
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
