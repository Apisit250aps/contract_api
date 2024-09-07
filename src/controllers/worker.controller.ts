// src/controllers/worker.controller.ts

import { Request, Response } from "express"
import Worker, { IWorker } from "../models/worker.model"

const createWorker = async (req: Request, res: Response) => {
  try {
    const workerData: IWorker = req.body
    const newWorker = new Worker(workerData)
    const savedWorker = await newWorker.save()
    res.status(201).json(savedWorker)
  } catch (error) {
    res.status(400).json({ message: "Error creating worker", error })
  }
}

const getAllWorkers = async (req: Request, res: Response) => {
  try {
    const workers = await Worker.find()
    res.json(workers)
  } catch (error) {
    res.status(500).json({ message: "Error fetching workers", error })
  }
}

const getWorkerById = async (req: Request, res: Response) => {
  try {
    const worker = await Worker.findById(req.params.id)
    if (worker) {
      res.json(worker)
    } else {
      res.status(404).json({ message: "Worker not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching worker", error })
  }
}

const updateWorker = async (req: Request, res: Response) => {
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (updatedWorker) {
      res.json(updatedWorker)
    } else {
      res.status(404).json({ message: "Worker not found" })
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating worker", error })
  }
}

const deleteWorker = async (req: Request, res: Response) => {
  try {
    const deletedWorker = await Worker.findByIdAndDelete(req.params.id)
    if (deletedWorker) {
      res.json({ message: "Worker deleted successfully" })
    } else {
      res.status(404).json({ message: "Worker not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting worker", error })
  }
}

export default {
  createWorker,
  getAllWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker
}
