/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events } from "../../../../../lib/utils";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	// if (shared.VARIATION == 'control') {
	//   return;
	// }

	// Write experiment code here
	// ...
	const topCategories = document.querySelectorAll(`.topCategories`);
	topCategories.forEach((item) => {
		item.classList.add(`${ID}__topCategories--${VARIATION}`);
	});
	if (VARIATION == "2") {
		document
			.querySelector(".topCatHeader")
			?.classList.remove("hidden-xs", "hidden-sm");
	}
	const linksParent = document.querySelector(
		`.${ID}__topCategories--${VARIATION}`
	);

	//client keeps changing mind

	// const newDataArr = [
	//   { title: 'Football', link: '/football' },
	//   { title: 'Mens', link: '/mens' },
	//   { title: 'Ladies', link: '/ladies' },
	//   { title: 'Running', link: '/running' },
	//   { title: 'Nike', link: '/nike' },
	//   { title: 'Adidas', link: '/adidas' },
	// ];

	const controlSwiperSlides = [
		...document.querySelectorAll(".SDSwiperWrapperGoldCat .swiper-slide"),
	];

	const newDataArr = controlSwiperSlides.map((item) => {
		const title = item.querySelector(".slideName").innerText;
		const link = item.querySelector("a").getAttribute("href");
		return {
			title,
			link,
		};
	});
	console.log(newDataArr);

	linksParent.querySelectorAll(".swiper-slide").forEach((item, idx) => {
		const anchorTag = item.querySelector("a");
		if (!newDataArr[idx]) {
			item.classList.add("force-remove-margin");
			return;
		}
		anchorTag.querySelector("span").innerText = newDataArr[idx].title;
		anchorTag.setAttribute("href", newDataArr[idx].link);
	});

	linksParent.addEventListener("click", (e) => {
		const target = e.target;
		const targetMatched = (desiredMatch) =>
			target.closest(`.${ID}__topCategories--${VARIATION}`) &&
			(target.matches(desiredMatch) || target.closest(desiredMatch));
		if (targetMatched(".swiper-slide")) {
			fireEvent(
				`User clicked "${target.innerText}" quick link from ${
					DY.deviceInfo.type || "desktop"
				}`
			);
		}
	});
};
