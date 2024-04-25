import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRoutes from './routes/user.js';
import jobRoutes from './routes/job.js';
import applicationRoutes from './routes/application.js';
import { connection } from './db/index.js'
import errorMiddleware from './middlewares/error.js';
config();


const app=express();
app.use(cors({
	origin: [process.env.FRONTEND_URL],
	methods: ['GET', 'POST', 'DELETE', 'PUT'],
	credentials: true,
})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
	useTempFiles: true,
	tempFileDir: "/tmp"
}))

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/application', applicationRoutes);


connection();

app.use(errorMiddleware)
export default app;
