import { Form } from "../model/formModel.js";

// Post a new Feedback
export const postFeedback = async (req, res) => {
	try {
		const { name, email, cohort, sex, date, event_type, pld_topic, feedback } =
			req.body;
		const existingFeedback = await Form.findOne({ email, event_type });
		if (existingFeedback) {
			const today = (new Date()).toISOString().split("T")[0];
			const existingDate = existingFeedback.date.toISOString().split("T")[0];
			if (existingDate === today) {
				return res
					.status(409)
					.json({ message: "Your Feedback has already been taken" });
			}
		}
		const newFeedback = await Form.create({
			name,
			email,
			cohort,
			sex,
			date,
			event_type,
			pld_topic,
			feedback,
		});
		return res.status(201).json({
			message: "Feedback created successfully",
			data: newFeedback,
		});
	} catch (error) {
		console.log(`Error creating Feedback: ${error.message}`);
		return res.status(500).json({
			message: "Internal Server Error, please contact administrator",
		});
	}
};

// Retrieve feedback
export const getFeedbacks = async (req, res) => {
	try {
		const feedbacks = await Form.find();
		return res
			.status(200)
			.json({
				message: "Feedback retrieved successfully",
				data: feedbacks,
			});
	} catch (error) {
		console.log(`Error getting feedbacks: ${error.message}`);
		return res
			.status(500)
			.json({
				message: "Internal Server Error, please contact administrator",
			});
	}
};
