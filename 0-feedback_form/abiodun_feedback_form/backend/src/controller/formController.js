import { Form } from "../model/formModel.js";

// Post a new Feedback
export const postFeedback = async (req, res) => {
	try {
		const { name, email, cohort, sex, date, event_type, feedback } =
			req.body;
		const checkIfEmailExists = await Form.findOne({ email });
		if (checkIfEmailExists) {
			return res
				.status(409)
				.json({ message: "Email has already posted a feedback" });
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
		return res
			.status(201)
			.json({
				message: "Feedback created successfully",
				data: newFeedback,
			});
	} catch (error) {
		console.log(`Error creating Feedback: ${error.message}`);
	}
};
