import { Schema, model } from "mongoose";

const formSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	cohort: {
		type: String,
		required: true,
	},
	sex: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: new Date(),
	},
	event_type: {
		type: String,
	},
	feedback: {
		type: String,
	},
});

export const Form = model("Form", formSchema);
