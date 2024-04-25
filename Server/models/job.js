import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please provide job title!'],
		minLength: [3, "Job Title must contains atleast 3 characters"],
		maxLength: [50, "Job title cannot exceed 50 characters"]
	},
	description: {
		type: String,
		required: [true, 'Please provide job description!'],
		minLength: [3, "Job description must contains atleast 3 characters"],
		maxLength: [350, "Job description cannot exceed 350 characters"]
	},
	category: {
		type: String,
		required: [true, 'Please provide job category!'],
	},
	country: {
		type: String,
		required: [true, 'Please provide job country!'],
	},
	city: {
		type: String,
		required: [true, 'Please provide job city!'],
	},
	location: {
		type: String,
		required: [true, 'Please provide job location!'],
		minLength: [20, "Job location must contains atleast 20 characters"],
	},
	fixedSalary: {
		type: Number,
		minLength: [4, 'Fixed salary must contain atleast 4 digits'],
		maxlength: [9, 'Fixed salary must not exceed 9 digits']
	},
	salaryFrom: {
		type: Number,
		minLength: [4, 'Starting salary must contain atleast 4 digits'],
		maxlength: [9, 'Starting salary must not exceed 9 digits']
	},
	salaryTo: {
		type: Number,
		minLength: [4, 'Ending salary must contain atleast 4 digits'],
		maxlength: [9, 'Ending salary must not exceed 9 digits']
	},
	expired: {
		type: Boolean,
		default: false
	},
	jobPostedOn: {
		type: Date,
		default: Date.now,
	},
	postedBy: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	}

})

export const Job=mongoose.model('Job', jobSchema)