import mongoose from "mongoose";
import { config } from 'dotenv';
config();

export const connection=() => {
	const dbName='JOB_SEEKING_APP';

	mongoose.connect(process.env.MONGO_URI).then(() => {
		console.log('Database Connected', dbName);
	}).catch((err) => {
		console.log(`Some error occurred while connecting to the database ${err}`);
	});
}

