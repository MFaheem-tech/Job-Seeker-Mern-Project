class ErrorHandler extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode=statusCode;
	}
}

export const errorMiddleware=(err, req, res, next) => {
	err.message=err.message||"Internal server error";
	err.statusCode=err.statusCode||500;

	if (err.name==='CaseError') {
		const message=`Resource not found. Invalid ${err.path}`;
		err=new ErrorHandler(message, 400);
	}
	if (err.name==='JsonWebTokenError') {
		const message=`Token is invalid. Try again`;
		err.message=message;
	}
	if (err.name==='TokenExpiredError') {
		const message=`Token has expired. Try again`;
		err.message=message;
	}

	return res.status(err.statusCode).json({
		success: false,
		message: err.message
	});
};

export default ErrorHandler;