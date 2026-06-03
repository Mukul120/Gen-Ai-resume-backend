const express = require("express")
const { authUser } = require("../middleware/authUser")
const { generateInterViewReportController, getAllInterviewReportsController, generateResumePdfController, getInterviewReportByIdController } = require("../Controller/interview.controller")
const upload = require("../middleware/file.middleware")


const interviewRouter = express.Router()

interviewRouter.post("/", authUser, upload.single("resume"), generateInterViewReportController)
interviewRouter.get("/report/:interviewId", authUser, getInterviewReportByIdController)
interviewRouter.get("/", authUser, getAllInterviewReportsController)
interviewRouter.post("/resume/pdf/:interviewReportId", authUser, generateResumePdfController)



module.exports = interviewRouter
