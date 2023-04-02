const form = document.querySelector("#form");
const btn = document.querySelector(".btn");
const emailInput = document.querySelector("#email");
const nameInput = document.querySelector("#name");
const cohortInput = document.querySelector("#cohort");

const url =
	"https://script.google.com/macros/s/AKfycby8g9GB6io4wLb72A5OVNxG74DvZbUQu7V4-pdszyOQib2EnIoXUhCQXiAJWZw0j_K6/exec";

// Focus on Email field when the page loads
window.onload = setTimeout(() => {
	emailInput.focus();
}, 1000);

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

	if (cohortInputValue === "Nil") {
		setErrorFor(cohortInput, "Please select your cohort");
		cohortInput.focus();
	} else {
		setSuccessFor(cohortInput);
	}

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

	if (!email || !name || cohort === "Nil") {
		console.log("Please enter all required fields");
	} else {
		const savedEmail = localStorage.getItem("email");
		if (savedEmail) {
			const savedTime = localStorage.getItem("time");
			const currentTime = new Date().getTime();
			const elapsedTime = (currentTime - savedTime) / 1000 / 60;
			if (elapsedTime < 2) {
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
			} else {
				localStorage.clear();
			}
		}
		localStorage.setItem("email", email);
		localStorage.setItem("time", new Date().getTime());

		btn.innerHTML = "Loading... ";

		fetch(url, {
			method: "POST",
			body: new FormData(form),
		})
			.then((response) => {
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
			})
			.catch((error) => {
				swal({
					title: "Oops!",
					text: error.message,
					icon: "error",
					button: "Ok",
				});
			});
	}
}
