import { Request, Response } from "express"
import Worker, { IWorker } from "../models/worker.model"

export interface PaginationResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const totalItems = await Worker.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    const workers = await Worker.find()
      .skip(skip)
      .limit(limit)
      .lean();

    const result: PaginationResult<typeof workers[0]> = {
      data: workers,
      currentPage: page,
      totalPages,
      totalItems,
    };

    res.json(result);
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({ message: "Error fetching workers", error: (error as Error).message });
  }
};

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
