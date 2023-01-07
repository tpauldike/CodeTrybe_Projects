import express from "express";
const app = express();

const port = 8000;

app.get("/users", (request, response) => {
	response.json({message : "Welcome to Our Feedback Form"})
})

app.listen(port, () => {
	console.log(`server listening on http://localhost:${port}`);
})

