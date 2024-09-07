import { Router } from "express"
import attendanceController from "../controllers/Attendance.controller";

const attendance = Router()

attendance.post("/create", attendanceController.createAttendance)
attendance.get("/all", attendanceController.getAllAttendances)
attendance.get("/get/:id", attendanceController.getAttendanceById)
attendance.put("/update/:id", attendanceController.updateAttendance)
attendance.delete("delete/:id", attendanceController.deleteAttendance)
attendance.get("/job/:jobId", attendanceController.getAttendancesByJob)
export default attendance
