import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userSchema=mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide your name'],
		minLength: [3, 'Name must contains at least 3 characters'],
		maxLength: [30, 'Name can not exees 30 characters']
	},
	email: {
		type: String,
		required: [true, 'Please provide a valid email'],
		validate: [validator.isEmail, "Please provide a valid email"]
	},
	phone: {
		type: Number,
		required: [true, 'Please provide a phone number']

	},
	password: {
		type: String,
		required: [true, 'Please provide your password'],
		minLength: [6, 'Password must contains at least 8 characters'],
		maxLength: [32, 'Password can not exees 32 characters'],
		select: false
	},

	role: {
		type: String,
		required: [true, "Please provide your role"],
		enum: ['Job Seeker', 'Employer']
	},
	createdAt: {
		type: Date,
		default: Date.now,
	}
})

// hashing the password

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}
	this.password=await bcrypt.hash(this.password, 10)

});


// compare password 

userSchema.methods.comparePassword=async function (userPassword) {
	return await bcrypt.compare(userPassword, this.password);
}

// generate token

userSchema.methods.getJwtToken=function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWR_EXPIRE
	})
}

export const User=mongoose.model('User', userSchema)



