import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/application.js";
import cloudinary from 'cloudinary';
import { Job } from "../models/job.js";

export const employeerGetAllApplications=catchAsyncError(async (req, res, next) => {
	const { role }=req.user;
	if (role==="Job Seeker") {
		return next(new ErrorHandler('Job Seeker is not allowed to access this resource!'))
	}

	const { _id }=req.user;
	const applications=await Application.find({ "employerId.user": _id })
	res.status(200).json({
		success: true,
		applications
	})
})
export const jobSeekerGetAllApplications=catchAsyncError(async (req, res, next) => {
	const { role }=req.user;
	if (role==="Employer") {
		return next(new ErrorHandler('Employer is not allowed to access this resource!'))
	}

	const { _id }=req.user;
	const applications=await Application.find({ "applicantId.user": _id })
	res.status(200).json({
		success: true,
		applications
	})
});

export const deleteApplicationbyJobSeeker=catchAsyncError(async (req, res, next) => {
	const { role }=req.user;
	if (role==="Employer") {
		return next(new ErrorHandler('Employer is not allowed to access this resource!'))
	}

	const { id }=req.params;
	const application=await Application.findById(id);
	if (!application) {
		return next(new ErrorHandler('Application not found!', 404))
	}

	await application.deleteOne();
	res.status(200).json({
		success: true,
		message: 'Application deleted successfully'
	})

})

export const sendApplication=catchAsyncError(async (req, res, next) => {
	const { role }=req.user;
	try {


		if (role==="Employer") {
			return next(new ErrorHandler('Employer is not allowed to access this resource!'))
		}
		if (!req.files||Object.keys(req.files).length===0) {
			return next(new ErrorHandler('Resume File required!'));
		}
		const { resume }=req.files;
		const allowedFormats=['image/png', 'image/jpg', 'image/webp'];
		if (!allowedFormats.includes(resume.mimetype)) {
			return next(new ErrorHandler('Invalid File type. Allowed formats are PNG, JPG, WEBP..'));
		}

		const cloudinaryResponse=await cloudinary.uploader.upload(resume.tempFilePath)

		if (!cloudinaryResponse||cloudinaryResponse.error) {
			console.log("Cloudinary error", cloudinaryResponse.error
			)
			return next(new ErrorHandler("Failed to upload resume", 500))
		}

		const { name, email, coverLetter, phone, address, jobId }=req.body;
		const applicantId={
			user: req.user._id,
			role: "Job Seeker"
		};

		if (!jobId) {
			return next(new ErrorHandler("Job not found", 404))
		}

		const jobdetail=await Job.findById(jobId)
		if (!jobdetail) {
			return next(new ErrorHandler("Job not found", 404))
		}

		const employerId={
			user: jobdetail.postedBy,
			role: 'Employer'
		}

		const app=await Application.create({
			name,
			email,
			coverLetter,
			phone,
			address,
			jobId,
			applicantId,
			employerId,
			resume: {
				public_id: cloudinaryResponse.public_id,
				url: cloudinaryResponse.secure_url
			}
		})
		res.status(200).json({
			success: true,
			message: "Application submited",
			app

		})

	} catch (error) {
		console.log(error)
	}

})