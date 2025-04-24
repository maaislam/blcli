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

	// Needed for attribution to Adobe Dynamics - do not remove
	document.documentElement.classList.add(
		`experimentation-${
			VARIATION == "control" ? `control` : `variant-${VARIATION}`
		}`
	);

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// transfers sessionStorage from one tab to another
	var sessionStorage_transfer = function (event) {
		if (!event) {
			event = window.event;
		} // ie suq
		if (!event.newValue) return; // do nothing if no value to work with
		if (event.key == "getSessionStorage") {
			// another tab asked for the sessionStorage -> send it
			localStorage.setItem(
				"shareSessionStorage",
				sessionStorage.getItem(`${ID}-exit-intent-shown`)
			);
			// the other tab should now have it, so we're done with it.
			localStorage.removeItem("shareSessionStorage"); // <- could do short timeout as well.
		} else if (event.key == "shareSessionStorage") {
			// another tab sent data <- get it
			var data = JSON.parse(event.newValue);
			if (data != "" && data != null) {
				sessionStorage.setItem(`${ID}-exit-intent-shown`, data);
			}
		}
	};
	// listen for changes to localStorage
	if (window.addEventListener) {
		window.addEventListener("storage", sessionStorage_transfer, false);
	} else {
		window.attachEvent("onstorage", sessionStorage_transfer);
	}
	// Ask other tabs for session storage (this is ONLY to trigger event)
	if (!sessionStorage.getItem(`${ID}-exit-intent-shown`)) {
		localStorage.setItem("getSessionStorage", `${ID}`);
		localStorage.removeItem("getSessionStorage", `${ID}`);
	}

	if (location.pathname.indexOf("/equity-release/calculator") > -1) {
		pollerLite([`#er-calculator button[type='submit']`], () => {
			const calculateWrapper = document.querySelector("#er-calculator");
			let oldHref = document.location.href;
			const submitForm = () => {
				let calculateButton = calculateWrapper?.querySelector(
					`button[type='submit']`
				);
				let timeout;
				const clickHandler = () => {
					clearTimeout(timeout);
					fireEvent("Click - User clicks the calculate button", true);
					timeout = setTimeout(() => {
						if (
							document.querySelectorAll(
								`.form__message.form__message--error`
							).length == 0 &&
							window.location.href.indexOf("/results") > -1
						) {
							if (
								localStorage.getItem(`${ID}-exit-intent-status`)
							) {
								localStorage.removeItem(
									`${ID}-exit-intent-status`
								);
								sessionStorage.setItem(
									`${ID}-exit-intent-shown`,
									"true"
								);
							}
							if (VARIATION == 1) {
								fireEvent(
									`Interaction - User successfully submits the form`,
									true
								);
							}
							fireEvent(
								`Interaction - User successfully submits the form`,
								true
							);
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
				mutations.forEach(function () {
					if (oldHref != document.location.href) {
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

			pollerLite([`input.form__field`], () => {
				document.querySelectorAll("input.form__field").forEach((ele) =>
					ele.addEventListener("click", (e) => {
						fireEvent(
							`Click - User clicks the form field: ${e.target.id}`
						);
					})
				);
			});

			if (
				document.querySelector(
					`#er-calculator form__field-wrapper.form__field-wrapper--success`
				)
			) {
				if (localStorage.getItem(`${ID}-exit-intent-status`)) {
					localStorage.removeItem(`${ID}-exit-intent-status`);
				}
			} else {
				localStorage.setItem(`${ID}-exit-intent-status`, true);
			}
		});
	}

	const mouseEvent = (e) => {
		if (localStorage.getItem(`${ID}-exit-intent-status`)) {
			//console.log(e);
			const shouldShowExitIntent =
				!e.toElement && !e.relatedTarget && e.clientY < 2;

			if (
				shouldShowExitIntent &&
				!sessionStorage.getItem(`${ID}-exit-intent-shown`)
			) {
				// Show exit intent
				if (VARIATION == 1) {
					overlay.classList.add("active");
					document
						.querySelector(`.${ID}-exit-intent-modal`)
						.classList.add("active");
					fireEvent(`Interaction - User sees exit intent`, true);
				} else {
					fireEvent(
						`Interaction - User would have seen the exit intent`,
						true
					);
					sessionStorage.setItem(`${ID}-exit-intent-shown`, "true");
				}
			}
		}
	};

	setTimeout(() => {
		document.addEventListener("mouseout", mouseEvent);
	}, 2000);

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

	// Render the exit intent modal

	const overlay = document.createElement("div");
	overlay.classList.add(`${ID}-exit-intent-overlay`);

	const modalDom = `
	<div class="${ID}-exit-intent-modal">
		<div class="exit-intent-modal__content">
			<div class="exit-intent-modal__image">
				<img src="https://blcro.fra1.digitaloceanspaces.com/KG-123/exitIntentPhoto.png" alt="Exit Intent Image" />
			</div>
			<div class="exit-intent-modal__text">
				<div class="exit-intent-modal__header">
					<h3 class="exit-intent-modal__title">You’re a few seconds away from seeing your calculation</h3>
					<div class="exit-intent-modal__close">
						<img src="https://blcro.fra1.digitaloceanspaces.com/KG-123/closeIcon.svg" alt="Close" />
						<span class="exit-intent-modal__close-text">Close</span>
					</div>
				</div>
				<div class="exit-intent-modal__body">
					<ul class="exit-intent-modal__list">
						<li class="exit-intent-modal__list-item">
							<img src="https://blcro.fra1.digitaloceanspaces.com/KG-123/checkIcons.svg" alt="Check" />
							<span class="exit-intent-modal__list-item-text">Free, easy to complete form</span>
						</li>
						<li class="exit-intent-modal__list-item">
							<img src="https://blcro.fra1.digitaloceanspaces.com/KG-123/checkIcons.svg" alt="Check" />
							<span class="exit-intent-modal__list-item-text">No obligation and no credit checks</span>
						</li>
						<li class="exit-intent-modal__list-item">
							<img src="https://blcro.fra1.digitaloceanspaces.com/KG-123/checkIcons.svg" alt="Check" />
							<span class="exit-intent-modal__list-item-text">Find how much you could release</span>
						</li>
					</ul>
					<div class="exit-intent-modal__button--container">
						<a href="/equity-release/calculator" class="exit-intent-modal__button">Calculate now</a>
					</div>
				</div>
				<div class="exit-intent-modal__footer">
					<img src="https://blcro.fra1.digitaloceanspaces.com/KG-123/trustPilot.svg" alt="Trustpilot" />
				</div>
			</div>
		</div>
	</div>
	`;
	overlay.addEventListener("click", () => {
		overlay.classList.remove("active");
		document
			.querySelector(`.${ID}-exit-intent-modal`)
			.classList.remove("active");
		sessionStorage.setItem(`${ID}-exit-intent-shown`, "true");
	});

	document.body.appendChild(overlay);
	document.body.insertAdjacentHTML("beforeend", modalDom);

	pollerLite([`.${ID}-exit-intent-modal`], () => {
		const closeIcon = document.querySelector(
			`.${ID}-exit-intent-modal .exit-intent-modal__close`
		);
		closeIcon?.addEventListener("click", () => {
			overlay.classList.remove("active");
			document
				.querySelector(`.${ID}-exit-intent-modal`)
				.classList.remove("active");
			fireEvent(`Click - User clicks to close the exit intent`);
			sessionStorage.setItem(`${ID}-exit-intent-shown`, "true");
		});

		const modalButton = document.querySelector(
			`.${ID}-exit-intent-modal .exit-intent-modal__button`
		);
		modalButton?.addEventListener("click", () => {
			fireEvent(
				`Click - User clicks to go to the calculator form from the exit intent`
			);
			sessionStorage.setItem(`${ID}-exit-intent-shown`, "true");
		});
	});
};
