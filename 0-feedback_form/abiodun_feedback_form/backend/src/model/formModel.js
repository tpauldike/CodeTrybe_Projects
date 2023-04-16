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
		enum: [
			"Cohort 7",
			"Cohort 8",
			"Cohort 9",
			"Cohort 10",
			"Cohort 11",
			"Cohort 12",
			"Cohort 13",
			"Cohort 14",
			"Cohort 15",
		],
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
		required: true,
		enum: ["Community Hangout", "PLD", "Other"],
	},
	feedback: {
		type: String,
		required: true,
	},
});

export const Form = model("Form", formSchema);
