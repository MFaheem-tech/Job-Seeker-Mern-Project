import app from './app.js';
import cloudinary from 'cloudinary';


cloudinary.v2.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
})



const PORT=process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})