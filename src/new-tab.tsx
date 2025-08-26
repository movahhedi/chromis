import { GetCurrentTime, GetCurrentDate, GetNextPrayer, tehranCoordinates, GetPersianDateNow } from "./Utilities/Prayer";

const timeElement = <h1 class="time">{GetCurrentTime()}</h1>;
const dateElement = <div class="date">{GetCurrentDate()}</div>;

const persianDate = GetPersianDateNow();

const newTabPage = (
	<div class="new-tab-page">
		<div class="content-start">
			<div className="persian-date">
				<h1 class="persian-date-day">{persianDate.day}</h1>

				<p class="persian-date-month">
					{persianDate.month} {persianDate.year}
				</p>
			</div>
		</div>

		<div class="content-center">
			{timeElement}
			{/* {dateElement} */}
			<div class="date">{persianDate.weekday}</div>
		</div>

		<div class="content-end">
			<div></div>
			<div>
				<div class="next-prayer">
					<h1 class="next-prayer-time">{GetNextPrayer(tehranCoordinates).time}</h1>
					<p class="next-prayer-name">{GetNextPrayer(tehranCoordinates).persianName}</p>
				</div>
			</div>
			<div></div>
		</div>
	</div>
);

setInterval(() => {
	timeElement.textContent = GetCurrentTime();
	dateElement.textContent = GetCurrentDate();
}, 500);

const appDiv = document.getElementById("app");
appDiv.appendChild(newTabPage);
