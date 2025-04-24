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
import { carousel, imports } from "./assets";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");
	// console.log(`%c${ID}-${VARIATION}`, `color: green; font-size: 30px`);
	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------

	if (
		(window.location.href.indexOf("/equity-release/calculator") > -1 ||
			window.location.href.indexOf("/equity-release-calculator-ppc") >
				-1) &&
		window.location.href.indexOf("/results") == -1
	) {
		pollerLite([".hero-banner__button"], () => {
			let continueButton = document.querySelector(".hero-banner__button");
			continueButton.addEventListener("click", () => {
				// console.log(continueButton);
				fireEvent(`User clicks the above, the fold CTA`);
			});
		});
	}
	pollerLite([`#er-calculator button[type='submit']`], () => {
		const calculateWrapper = document.querySelector("#er-calculator");
		let oldHref = document.location.href;
		const submitForm = () => {
			let calculateButton = calculateWrapper?.querySelector(
				`button[type='submit']`
			);
			let timeout;
			const clickHandler = () => {
				// console.log("clicked");
				clearTimeout(timeout);
				// console.log(document.querySelectorAll(`.form__message.form__message--error`).length == 0 && window.location.href.indexOf("/results") > -1);
				timeout = setTimeout(() => {
					if (
						document.querySelectorAll(
							`.form__message.form__message--error`
						).length == 0 &&
						window.location.href.indexOf("/results") > -1
					) {
						// console.log(`User successfully submits the form`);
						fireEvent(`User successfully submits the form`);
						calculateButton?.removeEventListener(
							"click",
							clickHandler
						);
					}
				}, 2000);
			};
			calculateButton?.addEventListener("click", clickHandler);
		};
		submitForm();

		const observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (oldHref != document.location.href) {
					// console.log("mutation...");
					oldHref = document.location.href;
					submitForm();
				}
			});
		});
		observer.observe(calculateWrapper, {
			attributes: false,
			childList: true,
			subtree: false,
		});
	});

	pollerLite([`input.form__field`], () => {
		document.querySelectorAll("input.form__field").forEach((ele) =>
			ele.addEventListener("click", (e) => {
				fireEvent(`User clicks the form field, "${e.target.id}"`);
				// console.log(e.target.id);e
			})
		);
	});

	if (VARIATION == "control") {
		setTimeout(() => {
			fireEvent("Trust marks would be visible to the user");
		}, 1000);
		pollerLite([`.kr-body-container section.banner--secondary`], () => {
			let isFired = false;
			window.addEventListener("scroll", () => {
				if (!isFired) {
					const targetDom = document.querySelector(
						`.kr-body-container section.banner--secondary .swiper-wrapper .swiper-slide:first-child`
					);
					// console.log(targetDom);
					if (targetDom) {
						var position = targetDom.getBoundingClientRect();
						if (
							position.top <
								window.innerHeight - position.height &&
							position.bottom > position.height
						) {
							// console.log("User sees the old trust marks");
							fireEvent("User sees the old trust marks");
							isFired = true;
						}
					}
				}
			});
		});
		return;
	}
	imports();
	pollerLite(
		[
			() => {
				if (window.jQuery !== undefined) {
					window.jQuery.getScript(
						"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"
					);
					return window.jQuery?.fn?.slick;
				}
			},
			`section.hero-banner`,
			`section.hero-banner .hero-banner__section`,
		],
		() => {
			carousel();

			const heroBannerContent = document.querySelector(
				`section.hero-banner .hero-banner__section .hero-banner__content`
			);
			heroBannerContent.classList.add(`${ID}--hero-banner-content`);
			heroBannerContent.setAttribute("id", `${ID}--hero-banner-content`);
			heroBannerContent.innerHTML = `<ul class="list--tick"><li><p>See how much you could release</p></li><li><p>Quick, easy and secure</p></li><li><p>Instant estimate, in seconds</p></li></ul>`;

			// goals
			pollerLite([`.${ID}--carousel-container`], () => {
				fireEvent("Trust marks visible to the user");
			});
		}
	);

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...
};
