import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initiateDb } from "./src/database/db.js";
import router from "./src/route/formRoute.js";
dotenv.config();

const app = express();
const { PORT } = process.env || 6000;

app.use(express.json());
app.use(cors());

initiateDb();

app.get('/api/test', (req, res) => {
	return res.status(200).json({message: "FeedBack service is available!!!"})
})

app.use('/api/codetrybe/', router)

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
