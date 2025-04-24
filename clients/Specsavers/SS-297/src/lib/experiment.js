/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import data from "./data";

const { ID, VARIATION } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	const bannerToSwap = document.querySelector(".ss__merchandising-tile");

	if (bannerToSwap) {
		new IntersectionObserver((i, o) => {
			if (i[0].isIntersecting) {
				fireEvent("Banner position is in view");
				o.disconnect();
			}
		}).observe(bannerToSwap);
	}

	if (VARIATION == "control") {
		return;
	}

	const person = data.find((d) => d.page.includes(window.location.pathname));

	let heading;
	let subheading;

	const pronoun = person.gender == "lilia" ? "their" : "your";

	if (VARIATION == 1) {
		heading = `Book ${pronoun} appointment today!`;
		subheading = "With your local opticians";
	} else if (VARIATION == 2) {
		heading = `Is ${pronoun} prescription up to date?`;
		subheading = "Book your appointment today with your local opticians";
	} else {
		heading = `Noticed a change in ${pronoun} vision?`;
		subheading = "Book your appointment today with your local opticians";
	}

	const Banner = /* html */ `
		<div class="${ID}-banner ${person.gender}">
			<div class="${ID}-banner-content">
				<h3>${heading}</h3>
				<p>${subheading}</p>
				<a href="https://www.specsavers.co.uk/book/location">Book now</a>
			</div>
		</div>
	`;

	if (bannerToSwap) {
		bannerToSwap.innerHTML = Banner;
		bannerToSwap.classList.add(`${ID}-clear`);
	}

	const bannerCta = document.querySelector(`.${ID}-banner-content a`);

	if (bannerCta) {
		bannerCta.addEventListener("click", () => fireEvent('Clicked "Book now" CTA'));
	}

	const banner = document.querySelector(`.${ID}-banner`);

	if (banner) {
		new IntersectionObserver((i, o) => {
			if (i[0].isIntersecting) {
				fireEvent("Banner is in view");
				o.disconnect();
			}
		}).observe(banner);
	}
};
