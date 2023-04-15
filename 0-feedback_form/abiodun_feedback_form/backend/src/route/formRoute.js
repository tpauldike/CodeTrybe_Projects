import { Router } from "express";
import { postFeedback } from "../controller/formController.js";

const router = Router();

router.post("/feedback", postFeedback);

export default router;
