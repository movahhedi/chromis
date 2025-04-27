import ImageUrl from "./images/back.png";
// import ImageUrlLow from "./images/back-low.png";
import "./new-tab.css";

// Simple function to create an element with text
function createElement(tag, className, text) {
	const element = document.createElement(tag);
	if (className) element.className = className;
	if (text) element.textContent = text;
	return element;
}

// Get current time in HH:MM format
function getCurrentTime() {
	const now = new Date();
	const hours = now.getHours().toString().padStart(2, "0");
	const minutes = now.getMinutes().toString().padStart(2, "0");
	return `${hours}:${minutes}`;
}

// Get current date in a readable format
function getCurrentDate() {
	const now = new Date();
	const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
	return now.toLocaleDateString("en-US", options);
}

// Create the main container
const newTabPage = document.createElement("div");
newTabPage.className = "new-tab-page";

// Add background image
const backgroundImg = document.createElement("img");
backgroundImg.src = ImageUrl;
backgroundImg.alt = "Background";
newTabPage.appendChild(backgroundImg);

// Create content container
const content = document.createElement("div");
content.className = "content";

// Create and add time element
const timeElement = createElement("h1", "time", getCurrentTime());
content.appendChild(timeElement);

// Create and add date element
const dateElement = createElement("div", "date", getCurrentDate());
content.appendChild(dateElement);

// Add content to the main container
newTabPage.appendChild(content);

// Update time and date every second
setInterval(() => {
	timeElement.textContent = getCurrentTime();
	dateElement.textContent = getCurrentDate();
}, 1000);

// Add the new tab page to the DOM
const appDiv = document.getElementById("app");
if (appDiv) {
	appDiv.appendChild(newTabPage);
}

document.title = "New Tab Page";
