import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";
import { countdown } from "./../../../../../lib/uc-lib";
export default () => {
	const { ID, VARIATION } = shared;

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

	pollerLite(["#wrapper #main-header"], () => {
		var promoMsg =
			"<span>2 for 1 on &nbsp;</span>Selected Drinking Chocolate";
		if (VARIATION == 1) {
			promoMsg =
				"<span>2 for 1 on &nbsp;</span>Selected Drinking Chocolate";
		} else if (VARIATION == 2) {
			promoMsg = "<span>2 for 1 on &nbsp;</span>Selected Hot Chocolate";
		}

		const dom = `
		<div id="${ID}-global-banner">
			<a href="https://www.hotelchocolat.com/uk/shop/collections/products/hot-chocolate/hot-chocolate-sachets/">
				<div class="promo-msg-container">
					<span class="promo-text">${promoMsg}</span>
					<span class="ends-in">&nbsp;ends in&nbsp;</span>
					<span class="${ID}-offer-timer hide-seconds">Timer loading..</span>
				</div> 
				<span class="arrow-icon-right">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M5.23982 15.3C5.11982 15.3 4.99982 15.2533 4.90648 15.16C4.72648 14.98 4.72648 14.68 4.90648 14.5L10.9132 8.49998L4.90648 2.49331C4.72648 2.31331 4.72648 2.01998 4.90648 1.83331C5.08648 1.64665 5.38648 1.65331 5.56648 1.83331L12.2265 8.49998L5.56648 15.1666C5.47315 15.2533 5.35315 15.3 5.23982 15.3Z" fill="white"/>
					</svg>
				</span>
			</a>
		</div>
		`;
		document
			.querySelector("#main-header")
			.insertAdjacentHTML("beforebegin", dom);

		const targetDate = new Date(2022, 9, 1);

		const initCountdown = () => {
			// set up the countdown timer
			countdown({
				cutoff: targetDate,
				element: `.${ID}-offer-timer`,
				labels: {
					d:
						(new Date(2022, 9, 1) - new Date()) / (3600 * 1000) < 24
							? ""
							: "d",
					h: "h",
					m: "m",
					s: "s",
				},
				zeroPrefixHours: true,
				zeroPrefixMinutes: true,
				zeroPrefixSeconds: true,
				hoursInsteadOfDays: false,
				delivery: {
					deliveryDays: null,
					excludeDays: null,
					deliveryDayElement: null,
					tomorrowLabel: false,
					showFullDate: false,
					dayLabelStyle: "long",
					monthLabelStyle: "long",
				},
			});
		};

		const initDestroyCountDown = () => {
			// Update the count down every 1 second
			var x = setInterval(function () {
				const countDownDate = new Date(2022, 9, 1);
				// Get today's date and time
				var now = new Date();
				// Find the distance between now and the count down date
				if (countDownDate < now) {
					document.querySelector(`#${ID}-global-banner`)?.remove();
					clearInterval(x);
				} else if ((countDownDate - new Date()) / (3600 * 1000) < 72) {
					if (
						!document
							.querySelector(`#${ID}-global-banner`)
							.classList.contains(`${ID}-timer-active`)
					) {
						if ((countDownDate - new Date()) / (3600 * 1000) < 24) {
							document
								.querySelector(`.${ID}-offer-timer`)
								.classList.remove(`hide-seconds`);
						}
						document
							.querySelector(`#${ID}-global-banner`)
							.classList.add(`${ID}-timer-active`);
						initCountdown();
					}
				}
			}, 1000);
		};
		initDestroyCountDown();
	});
	pollerLite([`#${ID}-global-banner`], () => {
		var isFired = false;
		if (window.scrollY <= 0) {
			fireEvent("Visible - User sees the global banner");
			isFired = true;
		}

		document.addEventListener("scroll", (e) => {
			if (!isFired) {
				const targetDom = document.querySelector(
					`#${ID}-global-banner`
				);
				if (targetDom) {
					var position = targetDom.getBoundingClientRect();
					// console.log(position);
					if (position.top > -2) {
						fireEvent("Visible - User sees the global banner");
						isFired = true;
					}
				}
			}
		});
		const globalBannerLink = document.querySelector(
			`#${ID}-global-banner a`
		);
		globalBannerLink.addEventListener("click", (e) => {
			fireEvent("Click - User clicks the global banner");
		});
	});
};
