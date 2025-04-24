/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	const entry = document.querySelector("header#page-header");

	const root = document.createElement("div");
	root.classList.add(`${ID}-root`);
	root.innerHTML = /* html */ `
	<div>
		<h4>Day:</h4>
		<select id="day-select">
			<option value="">Any</option>
			<option value="weekday">Weekday</option>
			<option value="weekend">Weekend</option>
		</select>
	</div>
	<div>
		<h4>Time:</h4>
		<select id="time-select">
			<option value="">Any</option>
			<option value="morning">Morning</option>
			<option value="afternoon">Afternoon</option>
			<option value="evening">Evening</option>
		</select>
	</div>
	`;

	function setDayOption(type) {
		pollerLite([".day-select-ribbon__date-range"], () => {
			const days = document.querySelectorAll(
				".day-select-ribbon__date-range .specs-day-button"
			);

			console.log("-- ran", type);

			days.forEach((day) => {
				const name = day.textContent.trim();

				if (type == "weekend") {
					if (!name.includes("Sat") && !name.includes("Sun")) {
						day.style.display = "none";
					} else {
						day.style.display = "block";
					}
				} else {
					if (name.includes("Sat") || name.includes("Sun")) {
						day.style.display = "none";
					} else {
						day.style.display = "block";
					}
				}
			});
		});
	}

	entry.insertAdjacentElement("afterend", root);

	const timesContainer = document.querySelector(".appointment-times");

	function setTimeClasses() {
		const times = document.querySelectorAll(
			".appointment-times .selectable-time-button"
		);

		times.forEach((time) => {
			const t = time.textContent.replace(":", "");

			if (t > 800 && t < 1200) {
				time.classList.add = "morning";
			}

			if (t >= 1200 && t < 1700) {
				time.classList.add = "afternoon";
			}

			if (t >= 1700) {
				time.classList.add = "evening";
			}
		});
	}

	setTimeClasses();

	pollerLite([".day-select-ribbon"], () => {
		setDayOption();

		new MutationObserver(setDayOption).observe(
			document.querySelector(".day-select-ribbon"),
			{
				childList: true,
				subtree: true,
			}
		);
	});

	const daySelect = document.querySelector("#day-select");
	const timeSelect = document.querySelector("#time-select");

	daySelect.addEventListener("change", () => {
		setDayOption(daySelect.value);
	});
};
