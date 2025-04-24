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

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

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
		const fireEvents = (wrapper) => {
			if (wrapper) {
				const column = wrapper.querySelector(
					"div.content-asset ul.sub-level li.sub-level-item"
				);

				const items = column.querySelectorAll(
					"div.sub-level-content ul li a"
				);
				if (items.length > 0) {
					items.forEach((item) => {
						let copy = item.innerText.trim();
						item.addEventListener("click", (e) => {
							fireEvent(`Click - User clicked '${copy}' item`);
						});
					});
				}
			}
		};

		pollerLite(["#main-navigation ul"], () => {
			const giftWrapper =
				document
					.querySelector(
						"#main-navigation a.has-sub-menu[href='https://www.hotelchocolat.com/uk/shop/gift-ideas/']"
					)
					?.closest("li.top-level") ||
				document.querySelector(
					"#main-navigation li.top-level:nth-child(2)"
				);
			const chocolateWrapper =
				document
					.querySelector(
						"#main-navigation a.has-sub-menu[href='https://www.hotelchocolat.com/uk/shop/collections/']"
					)
					?.closest("li.top-level") ||
				document.querySelector(
					"#main-navigation li.top-level:nth-child(3)"
				);

			fireEvents(giftWrapper);
			fireEvents(chocolateWrapper);
		});
		return;
	}
	const modifyDom = (wrapper) => {
		if (wrapper) {
			const column = wrapper.querySelector(
				"div.content-asset ul.sub-level li.sub-level-item"
			);

			const items = column.querySelectorAll(
				"div.sub-level-content ul li a"
			);
			if (items.length > 0) {
				items.forEach((item) => {
					let copy = item.innerText.trim();
					const label = copy;
					copy = copy.replaceAll("Gifts", "");
					copy = copy.replaceAll("GIFTS", "");
					copy = copy.replaceAll("Chocolate", "");
					copy = copy.replaceAll("CHOCOLATE", "");

					item.innerText = copy.trim().toLowerCase();
					item.addEventListener("click", (e) => {
						fireEvent(`Click - User clicked '${label}' item`);
					});
				});
			}
		}
	};

	pollerLite(["#main-navigation ul"], () => {
		const giftWrapper =
			document
				.querySelector(
					"#main-navigation a.has-sub-menu[href='https://www.hotelchocolat.com/uk/shop/gift-ideas/']"
				)
				?.closest("li.top-level") ||
			document.querySelector(
				"#main-navigation li.top-level:nth-child(2)"
			);
		const chocolateWrapper =
			document
				.querySelector(
					"#main-navigation a.has-sub-menu[href='https://www.hotelchocolat.com/uk/shop/collections/']"
				)
				?.closest("li.top-level") ||
			document.querySelector(
				"#main-navigation li.top-level:nth-child(3)"
			);

		modifyDom(giftWrapper);
		modifyDom(chocolateWrapper);
		fireEvent(`Visilible - User sees variation 1`);
	});

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...
};
