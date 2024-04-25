export const catchAsyncError=(endpoint) => {
	return (req, res, next) => {
		Promise.resolve(endpoint(req, res, next)).catch(next)
	}
}