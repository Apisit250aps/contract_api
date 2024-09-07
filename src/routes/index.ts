import { Router, Request, Response } from "express"
import auth from "./auth.route"
import job from "./job.route"
import worker from "./workers.route"
import attendance from "./attendance.route"

const router = Router()
router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!").status(200)
})

router.use("/auth", auth)
router.use("/job", job)
router.use("/worker", worker)
router.use("/attendance", attendance)

export default router
