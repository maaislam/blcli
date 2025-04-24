/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { VARIATION } = shared;

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

	const EVENT_DELAY = 300;
	let currentTarget;

	if (window.innerWidth > 959) {
		const level1Dropdowns = document.querySelectorAll(
			"ul.menu__list.mob_level-1 > li.list__item_main"
		);

		const level2Dropdowns = [...level1Dropdowns]
			.map((l) => l.querySelectorAll(":scope > [data-megamenu] > .submenu_inner > ul > li"))
			.filter((l) => l.length > 0);

		const level3Dropdowns = [...level2Dropdowns]
			.map((l) => [...l].map((n) => n.querySelectorAll(":scope > div > ul li")))
			.filter((l) => l.length > 0);

		level1Dropdowns.forEach((l) => {
			const link = l.querySelector(":scope > a");

			link?.addEventListener("mouseenter", (e) => {
				currentTarget = e.target;

				setTimeout(() => {
					if (currentTarget == e.target) {
						fireEvent(`Level 1 Dropdown Hover (${e.target.textContent.trim()})`);
					}
				}, EVENT_DELAY);
			});

			link?.addEventListener("mouseleave", () => (currentTarget = null));

			link?.addEventListener("click", (e) => {
				fireEvent(`Level 1 Dropdown Click (${e.target.textContent.trim()})`);
			});
		});

		level2Dropdowns.forEach((l) => {
			[...l].forEach((n) => {
				const link = n.querySelector(":scope > a");

				link?.addEventListener("mouseenter", (e) => {
					currentTarget = e.target;

					setTimeout(() => {
						if (currentTarget == e.target) {
							fireEvent(`Level 2 Dropdown Hover (${e.target.textContent.trim()})`);
						}
					}, EVENT_DELAY);
				});

				link?.addEventListener("mouseleave", () => (currentTarget = null));

				link?.addEventListener("click", (e) => {
					fireEvent(`Level 2 Dropdown Click (${e.target.textContent.trim()})`);
				});
			});
		});

		level3Dropdowns.forEach((l) => {
			[...l].forEach((n) => {
				[...n].forEach((m) => {
					const link = m.querySelector(":scope > a");
					link?.addEventListener("mouseenter", (e) => {
						currentTarget = e.target;

						setTimeout(() => {
							if (currentTarget == e.target) {
								fireEvent(`Level 3 Dropdown Hover (${e.target.textContent.trim()})`);
							}
						}, EVENT_DELAY);
					});

					link?.addEventListener("mouseleave", () => (currentTarget = null));

					link?.addEventListener("click", (e) => {
						fireEvent(`Level 3 Dropdown Click (${e.target.textContent.trim()})`);
					});
				});
			});
		});
	} else {
		const menu = document.querySelector(".header__bottom_main");

		new MutationObserver((mutations) => {
			for (let i = 0; i < mutations.length; i += 1) {
				if (
					mutations[i].target.classList.contains("is_in_view") &&
					mutations[i].target.parentElement.querySelector(":scope > a")
				) {
					let level = 1;
					if (mutations[i].target.classList.contains("mob_level-2")) {
						level = 2;
					}

					if (mutations[i].target.classList.contains("mob_level-3")) {
						level = 3;
					}

					if (mutations[i].target.classList.contains("mob_level-4")) {
						level = 4;
					}

					fireEvent(
						`Level ${level} in view (${mutations[i].target.parentElement
							.querySelector(":scope > a")
							.textContent.trim()})`
					);
				}
			}
		}).observe(menu, {
			subtree: true,
			childList: true,
			attributeFilter: ["class"],
		});
	}
};
