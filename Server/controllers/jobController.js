import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/job.js";


export const getAllJob=catchAsyncError(async (req, res, next) => {
	const jobs=await Job.find({ expired: false });
	res.status(200).json({
		success: true,
		jobs,

	})
});

export const createJob=catchAsyncError(async (req, res, next) => {
	const { role }=req.user;
	if (role==="Job Seeker") {
		return next(new ErrorHandler('Job Seeker is not allowed to access this resource!'))
	}
	const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo }=req.body;
	if (!title||!description||!category||!country||!city||!location) {
		return next(new ErrorHandler("Please provide complete job details", 400))
	}

	if ((!salaryFrom||!salaryTo)&&!fixedSalary) {
		return next(new ErrorHandler("Please provide either fixed salary or ranged salary!"))
	}
	if (salaryFrom&&salaryTo&&fixedSalary) {
		return next(new ErrorHandler("You must provide only one salary type either fixed or ranged salary!"))
	}

	const postedBy=req.user._id;
	const job=await Job.create({
		title,
		description,
		category,
		country,
		city,
		location,
		fixedSalary,
		salaryFrom,
		salaryTo,
		postedBy
	});

	res.status(200).json({
		success: true,
		message: 'Job created successfully',
		job
	})

})

export const getMyJobs=catchAsyncError(async (req, res, next) => {
	const { role }=req.user;
	if (role==="Job Seeker") {
		return next(new ErrorHandler('Job Seeker is not allowed to access this resource!'))
	}
	const myjobs=await Job.find({ postedBy: req.user._id });
	res.status(200).json({
		success: true,
		myjobs
	})
});

export const updateJob=catchAsyncError(async (req, res, next) => {
	const { role }=req.user;
	const { id }=req.params;
	if (role==="Job Seeker") {
		return next(new ErrorHandler('Job Seeker is not allowed to access this resource!'))
	}
	let job=await Job.findById(id);
	if (!job) {
		new ErrorHandler("Job not found", 404)
	}
	job=await Job.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	})
	res.status(200).json({
		success: true,
		message: "Job update successfully",
		job
	})
})

export const deleteJob=catchAsyncError(async (req, res, next) => {
	const { role }=req.user;
	const { id }=req.params;
	if (role==="Job Seeker") {
		return next(new ErrorHandler('Job Seeker is not allowed to access this resource!'))
	}
	let job=await Job.findById(id);

	if (!job) {
		return next(new ErrorHandler("Job not found", 404)); // Return the error
	}

	await job.deleteOne();
	res.status(200).json({
		success: true,
		message: "Job deleted successfully",
	})
})