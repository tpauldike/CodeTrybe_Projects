import { Form } from "../model/formModel.js";

// Post a new Feedback
export const postFeedback = async (req, res) => {
	try {
		const { name, email, cohort, sex, date, event_type, feedback } =
			req.body;
		const existingFeedback = await Form.findOne({ email, event_type });
		if (existingFeedback) {
			return res
				.status(409)
				.json({ message: "Your Feedback has already been taken" });
		}
		const newFeedback = await Form.create({
			name,
			email,
			cohort,
			sex,
			date,
			event_type,
			feedback,
		});
		return res.status(201).json({
			message: "Feedback created successfully",
			data: newFeedback,
		});
	} catch (error) {
		console.log(`Error creating Feedback: ${error.message}`);
	}
};
