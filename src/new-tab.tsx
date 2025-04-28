// import ImageUrl from "./images/back.png";
// import ImageUrlLow from "./images/back-low.png";
import PersianDate from "persian-date";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import { c } from "vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf";

const coordinates = new Coordinates(35.7, 51.42);
const date = new Date();
const prayerTimes = new PrayerTimes(coordinates, date, CalculationMethod.Tehran());

function getNextPrayer() {
	// Get current date and prayer times for today
	const now = new Date();
	const today = new Date();
	const todayPrayers = new PrayerTimes(coordinates, today, CalculationMethod.Tehran());

	// Prayer names and their corresponding times
	const prayers = [
		{ name: "Fajr", time: todayPrayers.fajr, persianName: "اذان صبح" },
		{ name: "Sunrise", time: todayPrayers.sunrise, persianName: "طلوع آفتاب" },
		{ name: "Dhuhr", time: todayPrayers.dhuhr, persianName: "اذان ظهر" },
		{ name: "Asr", time: todayPrayers.asr, persianName: "اذان عصر" },
		{ name: "Sunset", time: todayPrayers.sunset, persianName: "غروب آفتاب" },
		{ name: "Maghrib", time: todayPrayers.maghrib, persianName: "اذان مغرب" },
		{ name: "Isha", time: todayPrayers.isha, persianName: "اذان عشاء" },
		// { name: "Midnight", time: todayPrayers.midnight, persianName: "نیمه شب" },
	];

	// Find the next prayer
	for (const prayer of prayers) {
		if (prayer.time > now) {
			// Format the prayer time
			const hours = prayer.time.getHours().toString().padStart(2, "0");
			const minutes = prayer.time.getMinutes().toString().padStart(2, "0");

			return {
				name: prayer.name,
				persianName: prayer.persianName,
				time: `${hours}:${minutes}`,
				timeObj: prayer.time,
			};
		}
	}

	// If all prayers for today have passed, get tomorrow's Fajr
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	const tomorrowPrayers = new PrayerTimes(coordinates, tomorrow, CalculationMethod.Tehran());

	const hours = tomorrowPrayers.fajr.getHours().toString().padStart(2, "0");
	const minutes = tomorrowPrayers.fajr.getMinutes().toString().padStart(2, "0");

	return {
		name: "Fajr (Tomorrow)",
		persianName: "اذان صبح فردا",
		time: `${hours}:${minutes}`,
		timeObj: tomorrowPrayers.fajr,
	};
}

function getCurrentTime() {
	const now = new Date();
	const hours = now.getHours().toString().padStart(2, "0");
	const minutes = now.getMinutes().toString().padStart(2, "0");
	// const seconds = now.getSeconds().toString().padStart(2, "0");
	// HH:MM
	// return `${hours}:${minutes}:${seconds}`;
	return `${hours}:${minutes}`;
}

function getCurrentDate() {
	const now = new Date();
	return now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

const timeElement = <h1 class="time">{getCurrentTime()}</h1>;
const dateElement = <div class="date">{getCurrentDate()}</div>;

const persianDate = new PersianDate();
const persianDateDay = persianDate.format("D");
const persianDateMonth = persianDate.format("MMMM");
const persianDateYear = persianDate.format("YYYY");
const persianWeekday = persianDate.format("dddd");

const newTabPage = (
	<div class="new-tab-page">
		<div class="content-start">
			<div className="persian-date">
				<h1 class="persian-date-day">{persianDateDay}</h1>

				<p class="persian-date-month">
					{persianDateMonth} {persianDateYear}
				</p>
			</div>
		</div>
		<div class="content-center">
			{timeElement}
			{/* {dateElement} */}
			<div class="date">{persianWeekday}</div>
		</div>
		<div class="content-end">
			<div>
			</div>
			<div>
				<div class="next-prayer">
					<h1 class="next-prayer-time">{getNextPrayer().time}</h1>
					<p class="next-prayer-name">{getNextPrayer().persianName}</p>
				</div>
			</div>
			<div>
			</div>
		</div>
	</div>
);

setInterval(() => {
	timeElement.textContent = getCurrentTime();
	dateElement.textContent = getCurrentDate();
}, 500);

const appDiv = document.getElementById("app");
appDiv.appendChild(newTabPage);
