import { Router } from "express";
import { getFeedbacks, postFeedback } from "../controller/formController.js";

const router = Router();

router.post("/feedback", postFeedback);
router.get("/feedback", getFeedbacks)

export default router;
