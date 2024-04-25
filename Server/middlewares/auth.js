import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import Jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const auth=catchAsyncError(async (req, res, next) => {
	const { token }=req.cookies;
	if (!token) {
		return next(new ErrorHandler('User not authorized', 400))
	}
	const decoded=Jwt.verify(token, process.env.JWT_SECRET)
	req.user=await User.findById(decoded.id)
	next();
})