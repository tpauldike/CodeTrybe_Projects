import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const {DB_URI} = process.env;

export const initiateDb = async () => {
	try {
		await mongoose.connect(DB_URI)
		console.log("Connection to database established")		
	} catch (error) {
		console.log(`Error connecting to database: ${error.message}`)
	}
};