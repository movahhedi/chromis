import PersianDate from "persian-date";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";

export const tehranCoordinates = new Coordinates(35.7, 51.42);

export function GetNextPrayer(coordinates: Coordinates) {
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

export function GetCurrentTime() {
	const now = new Date();
	const hours = now.getHours().toString().padStart(2, "0");
	const minutes = now.getMinutes().toString().padStart(2, "0");
	// const seconds = now.getSeconds().toString().padStart(2, "0");
	// HH:MM
	// return `${hours}:${minutes}:${seconds}`;
	return `${hours}:${minutes}`;
}

export function GetCurrentDate() {
	const now = new Date();
	return now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export function GetPersianDateNow() {
	const persianDate = new PersianDate();

	return {
		day: persianDate.format("D"),
		month: persianDate.format("MMMM"),
		year: persianDate.format("YYYY"),
		weekday: persianDate.format("dddd"),
	}
}
