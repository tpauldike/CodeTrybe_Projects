const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;
	const btn = document.querySelector("#submit")
	const errorMessage = document.querySelector(".error-message");

	// Check if username and password are valid
	if (username === "CodeTrybe" && password === "admin@CT001") {
		btn.value = "Loading...";
		errorMessage.innerHTML = ""
		localStorage.setItem("username", "CodeTrybe");
		localStorage.setItem("password", "admin@CT001");
		// If valid, redirect to admin page
		setTimeout(() => {
			window.location.href = "./admin.html";
		}, 2000);
	} else {
		// If invalid, show error message
		localStorage.clear();
		errorMessage.innerHTML = "Invalid username or password";
	}
});
