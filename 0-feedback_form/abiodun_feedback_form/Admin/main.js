const url = "https://codetrybe-form-api.vercel.app/api/codetrybe/feedback";

const refreshButton = document.querySelector("#refresh-btn");
const dataTable = document.querySelector("#data-table tbody");
const eventFilter = document.querySelector("#event-filter");
const sortBy = document.querySelector("#sort-by");
const sortOrder = document.querySelector("#sort-order");

const retrieveData = () => {
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			// Clear the table
			dataTable.innerHTML = "";

			const dataArray = data.data;
			let count = 1;
			// Populate the table with data
			dataArray.forEach((item) => {
				const row = document.createElement("tr");

				const serialNumber = document.createElement("td");
				serialNumber.textContent = count++;
				row.appendChild(serialNumber);

				const nameCell = document.createElement("td");
				nameCell.textContent = item.name;
				row.appendChild(nameCell);

				const emailCell = document.createElement("td");
				emailCell.textContent = item.email;
				row.appendChild(emailCell);

				const cohortCell = document.createElement("td");
				cohortCell.textContent = item.cohort;
				row.appendChild(cohortCell);

				const sexCell = document.createElement("td");
				sexCell.textContent = item.sex;
				row.appendChild(sexCell);

				const dataCell = document.createElement("td");
				dataCell.textContent = item.date.split("T")[0];
				row.appendChild(dataCell);

				const eventTypeCell = document.createElement("td");
				eventTypeCell.textContent = item.event_type;
				row.appendChild(eventTypeCell);

				const feedbackCell = document.createElement("td");
				feedbackCell.textContent = item.feedback;
				row.appendChild(feedbackCell);

				dataTable.appendChild(row);
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

window.onload = () => {
	retrieveData();
};

const fetchData = () => {
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			// Clear the table
			dataTable.innerHTML = "";

			const dataArray = data.data;
			let count = 1;

			// Filter data by event type if eventFilter is not "all"
			const filteredData =
				eventFilter.value === ""
					? dataArray
					: dataArray.filter(
							(item) => item.event_type === eventFilter.value
					  );

			// Sort data by selected column and order
			const sortedData = filteredData.sort((a, b) => {
				if (sortOrder.value === "asc") {
					return a[sortBy.value] > b[sortBy.value] ? 1 : -1;
				} else {
					return a[sortBy.value] < b[sortBy.value] ? 1 : -1;
				}
			});

			// Populate the table with data
			sortedData.forEach((item) => {
				const row = document.createElement("tr");

				const serialNumber = document.createElement("td");
				serialNumber.textContent = count++;
				row.appendChild(serialNumber);

				const nameCell = document.createElement("td");
				nameCell.textContent = item.name;
				row.appendChild(nameCell);

				const emailCell = document.createElement("td");
				emailCell.textContent = item.email;
				row.appendChild(emailCell);

				const cohortCell = document.createElement("td");
				cohortCell.textContent = item.cohort;
				row.appendChild(cohortCell);

				const sexCell = document.createElement("td");
				sexCell.textContent = item.sex;
				row.appendChild(sexCell);

				const dataCell = document.createElement("td");
				dataCell.textContent = item.date.split("T")[0];
				row.appendChild(dataCell);

				const eventTypeCell = document.createElement("td");
				eventTypeCell.textContent = item.event_type;
				row.appendChild(eventTypeCell);

				const feedbackCell = document.createElement("td");
				feedbackCell.textContent = item.feedback;
				row.appendChild(feedbackCell);

				dataTable.appendChild(row);
			});
		})
		.catch((error) => {
			console.log(error);
		});
};
// Add event listeners to the filter dropdowns
eventFilter.addEventListener("change", () => {
	fetchData();
});

sortBy.addEventListener("change", () => {
	fetchData();
});

sortOrder.addEventListener("change", () => {
	fetchData();
});
