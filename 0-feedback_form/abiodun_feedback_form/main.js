const form = document.querySelector("#form");
const btn = document.querySelector(".btn");
const emailInput = document.querySelector("#email");
const nameInput = document.querySelector("#name");
const cohortInput = document.querySelector("#cohort");
const dateInput = document.querySelector("#date");
const event_type = document.getElementById("event");
const pldTopicGroup = document.querySelector("#pldTopicGroup");
const pldTopicInput = document.querySelector("#pldTopic");

const url = "https://codetrybe-api.vercel.app/api/codetrybe/feedback";
// const url = "http://localhost:6060/api/codetrybe/feedback";

// Focus on Email field when the page loads
window.onload = setTimeout(() => {
	emailInput.focus();
}, 1000);

event_type.addEventListener("change", (e) => {
	e.preventDefault();
	const eventType = event_type.value;
	if (eventType === "PLD") {
		pldTopicGroup.style.display = "block";
	} else {
		pldTopicGroup.style.display = "none";
	}
});

// Functionality for the form validation
form.addEventListener("submit", (e) => {
	e.preventDefault();

	checkInputs();

	// send a post request to the server to send data to google sheet after the form has been validated and submitted
	submitForm();
});

function checkInputs() {
	const emailInputValue = emailInput.value;
	const nameInputValue = nameInput.value;
	const cohortInputValue = cohortInput.value;
	const pldTopicInputValue = pldTopicInput.value;
	const sexInputs = document.querySelectorAll('input[name="Sex"]');
	const sex = document.querySelector(".sex");
	const feedback = document.querySelector("#Feedback");

	if (emailInputValue === "") {
		setErrorFor(emailInput, "Email Address cannot be empty");
		emailInput.focus();
	} else if (!isEmail(emailInputValue)) {
		setErrorFor(emailInput, "Looks like this is not an email");
		emailInput.focus();
	} else {
		setSuccessFor(emailInput);
	}
	if (nameInputValue === "") {
		setErrorFor(nameInput, "Name cannot be empty");
		nameInput.focus();
	} else {
		setSuccessFor(nameInput);
	}
	if (cohortInputValue === "Nil") {
		setErrorFor(cohortInput, "Please select your cohort");
		cohortInput.focus();
	} else {
		setSuccessFor(cohortInput);
	}

	if (!document.querySelector('input[name="Sex"]:checked')) {
		setErrorFor(sex, "Please select your gender");
		return;
	} else {
		setSuccessFor(sexInputs[0].parentElement);
	}
	if (event_type.value === "PLD" && pldTopicInputValue.trim() === "") {
		setErrorFor(pldTopicInput, "PLD Topic cannot be empty");
		pldTopicInput.focus();
	} else {
		setSuccessFor(pldTopicInput);
	}
	if (feedback.value === "") {
		setErrorFor(feedback, "Feedback cannot be empty");
		return;
	} else {
		setSuccessFor(feedback);
	}
}

function setErrorFor(input, message) {
	const formGroup = input.parentElement;
	const small = formGroup.querySelector("small");
	small.innerText = message;
	formGroup.className = "form-group error";
}

function setSuccessFor(input) {
	const formGroup = input.parentElement;
	formGroup.className = "form-group success";
}

function isEmail(email) {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function submitForm() {
	const email = emailInput.value;
	const name = nameInput.value;
	const cohort = cohortInput.value;
	const sex = document.querySelector('input[name="Sex"]:checked').value;
	const date = dateInput.value;
	const eventType = document.querySelector("#event").value;
	const feedback = document.querySelector("#Feedback").value;
	const pldTopic = pldTopicInput.value;

	if (!email || !name || !cohort || !sex || !eventType || !feedback) {
		console.log("all fields are required");
		return;
	}

	const data = {
		name,
		email,
		cohort,
		sex,
		date: date || new Date(),
		event_type: eventType,
		feedback,
		pld_topic: pldTopic || "Nil",
	};

	console.log(data);
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	btn.innerHTML = "Loading... ";

	// send a post request to the server
	fetch(url, options)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data.message === "Feedback created successfully") {
				btn.innerHTML = "Submit";
				swal({
					title: "Good job!",
					text: "Thank you for your feedback",
					icon: "success",
					timer: 3000,
					button: "Ok",
				}).then(() => {
					window.location.href = "subscribe.html";
				});
			} else if (
				data.message === "Your Feedback has already been taken"
			) {
				console.log("Your feedback has already been taken");
				swal({
					title: "Whoops!!!",
					text: "You have already submitted your feedback",
					icon: "error",
					button: "Ok",
				}).then(() => {
					window.location.reload();
				});
				return;
			}
		})
		.catch((error) => {
			console.log(error);
			swal({
				title: "Oops!",
				text: error.message,
				icon: "error",
				button: "Ok",
			});
		});
}
