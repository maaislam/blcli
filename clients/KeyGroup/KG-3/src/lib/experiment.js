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
import scrollDepth from "./scrollDepth";
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	var isClicked = false;
	const isHomePage = true;
	// const isHomePage = location.pathname === "/" || location.pathname === "";
	// transfers sessionStorage from one tab to another
	if (isHomePage) {
		pollerLite(
			[
				".hero-banner .hero-banner__button-container a.button.button__primary",
			],
			() => {
				const button = document.querySelector(
					".hero-banner .hero-banner__button-container a.button.button__primary"
				);
				console.log(
					button.matches(
						".hero-banner .hero-banner__button-container a.button.button__primary"
					),
					"does match"
				);
				button.addEventListener("click", (e) => {
					fireEvent(`User clicked ${button.innerText} CTA`);
					isClicked = true;
				});
				document.body.addEventListener("click", (e) => {
					const target = e.target;
					if (
						!isClicked &&
						!target.matches(
							".hero-banner .hero-banner__button-container a.button.button__primary"
						) &&
						target.matches("a") &&
						!target.classList.contains("navigation__link") &&
						(target.getAttribute("href").startsWith("/") ||
							target.getAttribute("href").startsWith("http"))
					) {
						fireEvent(
							`User clicked anchor to visit ${target} without clicking the CTA`
						);
					}
				});
			}
		);
		scrollDepth(fireEvent);
	}

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

	if (isHomePage) {
		pollerLite(
			[
				".hero-banner .hero-banner__button-container a.button.button__primary",
			],
			() => {
				const list = `
					<li>Benefit from personalised advice</li>
					<li>Get your questions answered</li>
					<li>Award-winning, friendly service</li>
				`;
				const listContainer = document.querySelector(
					".hero-banner__additional-subtext ul.list.list--tick"
				);
				listContainer.innerHTML = list;
				const button = document.querySelector(
					".hero-banner .hero-banner__button-container a.button.button__primary"
				);

				if (VARIATION == "1") {
					button.innerText = "Speak to an advisor";
					button.setAttribute(
						"href",
						"/campaigns/book-advisor-callback "
					);
				} else if (VARIATION == "2") {
					button.innerText = "Schedule a Zoom call";
					button.setAttribute("href", "/campaigns/book-zoom");
				}
			}
		);

		scrollDepth(fireEvent);
	}
};
