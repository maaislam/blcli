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
	pollerLite([`a.navigation__link[href="/retirewise"`], () => {
		const retirewiseLink = document.querySelector(
			`a.navigation__link[href="/retirewise"]`
		);
		if (retirewiseLink) {
			retirewiseLink.addEventListener("click", (e) => {
				fireEvent(`User clicks to see the RetireWise page`);
			});
		}
	});

	pollerLite([".mortgage-calculator__form form a.submit-button"], () => {
		document
			.querySelector(".mortgage-calculator__form form a.submit-button")
			?.addEventListener("click", (e) => {
				setTimeout(() => {
					if (
						!document.querySelector(".not-found") &&
						!document.querySelector(
							".mortgage-calculator__form form a.submit-button"
						)
					) {
						fireEvent(
							`User completes the ${document
								.querySelector(
									".breadcrumb__text.breadcrumb__text--current"
								)
								.textContent.trim()} form`
						);
					}
				}, 2000);
			});
	});

	pollerLite(["#er-calculator button[type='submit']"], () => {
		document
			.querySelector("#er-calculator button[type='submit']")
			?.addEventListener("click", (e) => {
				setTimeout(() => {
					if (
						!document.querySelector(".not-found") &&
						window.location.href.indexOf("/results") > -1
					) {
						if (sessionStorage.getItem(`${ID}-calculate`)) {
							fireEvent(
								`User completes the ${document
									.querySelector(
										".breadcrumb__text.breadcrumb__text--current"
									)
									.textContent.trim()} form after clicking the calculate now CTA`
							);
							sessionStorage.removeItem(`${ID}-calculate`);
							localStorage.setItem(
								"removeSessionStorage",
								"dummy"
							);
							localStorage.removeItem(
								"removeSessionStorage",
								"dummy"
							);
						} else {
							fireEvent(
								`User completes the ${document
									.querySelector(
										".breadcrumb__text.breadcrumb__text--current"
									)
									.textContent.trim()} form`
							);
						}
					}
				}, 2000);
			});
	});

	pollerLite([".submit-button-container button.submit-button"], () => {
		document
			.querySelector(".submit-button-container button.submit-button")
			?.addEventListener("click", (e) => {
				setTimeout(() => {
					if (
						!document.querySelector(".not-found") &&
						window.location.href.indexOf("/results") > -1
					) {
						if (sessionStorage.getItem(`${ID}-calculate`)) {
							fireEvent(
								`User completes the ${document
									.querySelector(
										".breadcrumb__text.breadcrumb__text--current"
									)
									.textContent.trim()} form after clicking the calculate now CTA`
							);
							sessionStorage.removeItem(`${ID}-calculate`);
							localStorage.setItem(
								"removeSessionStorage",
								"dummy"
							);
							localStorage.removeItem(
								"removeSessionStorage",
								"dummy"
							);
						} else {
							fireEvent(
								`User completes the ${document
									.querySelector(
										".breadcrumb__text.breadcrumb__text--current"
									)
									.textContent.trim()} form`
							);
						}
					}
				}, 2000);
			});
	});

	pollerLite([".enquiry-page"], () => {
		const enqueryFormSubmitCTA = document.querySelector(
			".enquiry-page .enquriy__form form a.submit-button"
		);
		if (enqueryFormSubmitCTA) {
			let storeTimeOut = null;
			enqueryFormSubmitCTA.addEventListener("click", (e) => {
				clearTimeout(storeTimeOut);
				storeTimeOut = setTimeout(() => {
					if (
						!document.querySelector(".enquiry-page .enquriy__form")
					) {
						fireEvent(
							`User submits the callback request from Request a callback page`
						);
					}
				}, 1000);
			});
		}
	});
	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		pollerLite([".kr-body-container .last-updated"], () => {
			var isFired = false;
			if (!isFired) {
				const targetDom = document.querySelector(
					".kr-body-container .last-updated"
				);
				if (targetDom) {
					var position = targetDom.getBoundingClientRect();
					if (
						position.top > window.innerHeight / 3 &&
						position.bottom < window.innerHeight - 150
					) {
						fireEvent(`User would have seen the next step element`);
						isFired = true;
					}
				}
			}

			document.addEventListener("scroll", (e) => {
				if (!isFired) {
					const targetDom = document.querySelector(
						".kr-body-container .last-updated"
					);
					if (targetDom) {
						var position = targetDom.getBoundingClientRect();
						if (
							position.top > window.innerHeight / 3 &&
							position.bottom < window.innerHeight - 150
						) {
							fireEvent(
								`User would have seen the next step element`
							);
							isFired = true;
						}
					}
				}
			});
		});
		return;
	}

	// -----------------------------
	// Write experiment code here
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
				sessionStorage.getItem(`${ID}-calculate`)
			);
			// the other tab should now have it, so we're done with it.
			localStorage.removeItem("shareSessionStorage"); // <- could do short timeout as well.
		} else if (event.key == "shareSessionStorage") {
			// another tab sent data <- get it
			var data = JSON.parse(event.newValue);
			if (data != "" && data != null) {
				sessionStorage.setItem(`${ID}-calculate`, data);
			} else {
				sessionStorage.removeItem(`${ID}-calculate`);
			}
		} else if (event.key == "removeSessionStorage") {
			sessionStorage.removeItem(`${ID}-calculate`);
		}
	}; // listen for changes to localStorage
	if (window.addEventListener) {
		window.addEventListener("storage", sessionStorage_transfer, false);
	} else {
		window.attachEvent("onstorage", sessionStorage_transfer);
	} // Ask other tabs for session storage (this is ONLY to trigger event)
	if (!sessionStorage.getItem(`${ID}-calculate`)) {
		localStorage.setItem("getSessionStorage", `dummy`);
		localStorage.removeItem("getSessionStorage", `dummy`);
	}

	const exceptions = [
		"/retirewise",
		"/about",
		"/equity-release/callback",
		"/mortgages/speak-to-a-specialist",
		"/wills-lpas",
		"/mortgages",
	];

	const checkExceptions = () => {
		let isException = false;
		for (let index = 0; index < exceptions.length; index++) {
			const exception = exceptions[index];
			if (window.location.href.indexOf(exception) > -1) {
				console.log("Exception found", exception);
				isException = true;
				break;
			}
		}

		return isException;
	};

	if (!checkExceptions()) {
		pollerLite([".kr-body-container .last-updated"], () => {
			const footer = document.querySelector(
				".kr-body-container .last-updated"
			);

			const currentDateTime = new Date();
			const currentHour = currentDateTime.getHours();
			let isCallAble = true;
			if (currentHour >= 20 || currentHour < 9) {
				isCallAble = false;
			}
			const nextStepContent = `
                              <div class="${ID}-next-step">
                                <div class="next-step__content">
                                  <div class="next-step__top">
                                    <h3 class="next-step__title">What are my next steps?</h3>
                                    <p class="next-step__text">Calculate how much you could unlock</p>
                                    <a class="calculate-now-green-btn" href="/equity-release/calculator">Calculate now</a>
                                    <div class="next-step-or-divider">or</div>
                                    <p class="next-step__text">
									${
										isCallAble
											? `Talk to our friendly team to learn everything you’ll need to know`
											: `Our calling hours have closed for the day but you can schedule a callback on a time that works for you.`
									}</p>
                                    ${
										isCallAble
											? `<a class="call-now-button" href="tel:0800 531 6027">Call now</a>`
											: `<a class="call-now-button schedule-a-callback" href="/equity-release/callback">Schedule a callback</a>`
									}
                                    
                                  </div>
                                  <div class="next-step__bottom">
                                    <p class="next-step-bottom__text">Other options:</p>
  
                                    <a href="/equity-release/request-a-free-guide#download" target="_self" class="other-options-btn">
                                      <span class="button__text">Download our Guide</span>
                                      <span class="button__icon">
                                        <svg width="10" height="21" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                          <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                          <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                        </svg>
                                      </span>
                                    </a>
  
                                    
                                    <a href="/equity-release/customer-stories" target="_self" class="other-options-btn">
                                      <span class="button__text">Read our Case Studies</span>
                                      <span class="button__icon">
                                        <svg width="10" height="21" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                          <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                          <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                        </svg>
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              `;

			footer.insertAdjacentHTML("beforebegin", nextStepContent);
			const callNowBtn = document.querySelector(
				`.${ID}-next-step a.call-now-button`
			);

			setInterval(function () {
				const currentDateTime = new Date();
				var currentHour = currentDateTime.getHours();
				if (
					(currentHour >= 20 || currentHour < 9) &&
					!callNowBtn.classList.contains("schedule-a-callback")
				) {
					callNowBtn.previousElementSibling.innerText = `Our calling hours have closed for the day but you can schedule a callback on a time that works for you.`;
					callNowBtn.classList.add("schedule-a-callback");
					callNowBtn.innerText = "Schedule a callback";
					callNowBtn.setAttribute("href", "/equity-release/callback");
				} else if (
					currentHour >= 9 &&
					currentHour < 20 &&
					callNowBtn.classList.contains("schedule-a-callback")
				) {
					callNowBtn.previousElementSibling.innerText = `Talk to our friendly team to learn everything you’ll need to know`;
					callNowBtn.innerText = "Call now";
					callNowBtn.setAttribute("href", "tel:0800 531 6027");
					callNowBtn.classList.remove("schedule-a-callback");
				}
			}, 1000);

			pollerLite([`.${ID}-next-step`], () => {
				var isFired = false;
				if (!isFired) {
					const targetDom = document.querySelector(
						`.${ID}-next-step`
					);
					if (targetDom) {
						var position = targetDom.getBoundingClientRect();
						if (
							position.top > 150 &&
							position.bottom < window.innerHeight - 50
						) {
							fireEvent(`User sees the next step element`);
							isFired = true;
						}
					}
				}

				document.addEventListener("scroll", (e) => {
					if (!isFired) {
						const targetDom = document.querySelector(
							`.${ID}-next-step`
						);
						if (targetDom) {
							var position = targetDom.getBoundingClientRect();
							if (
								position.top > 150 &&
								position.bottom < window.innerHeight - 50
							) {
								fireEvent(`User sees the next step element`);
								isFired = true;
							}
						}
					}
				});

				const calculateNow = document.querySelector(
					`.${ID}-next-step a.calculate-now-green-btn`
				);

				if (calculateNow) {
					calculateNow.addEventListener("click", () => {
						sessionStorage.setItem(`${ID}-calculate`, "true");
						fireEvent(`User clicks on calculate now CTA`);
					});
				}
				const callNowBtn = document.querySelector(
					`.${ID}-next-step a.call-now-button`
				);
				if (callNowBtn) {
					callNowBtn.addEventListener("click", () => {
						if (
							callNowBtn.classList.contains("schedule-a-callback")
						) {
							fireEvent(`User clicks on Schedule a callback CTA`);
						} else {
							fireEvent(`User clicks on call now CTA`);
						}
					});
				}

				const otherOptionsBtn = document.querySelectorAll(
					`.${ID}-next-step a.other-options-btn`
				);
				if (otherOptionsBtn.length > 0) {
					otherOptionsBtn.forEach((btn) => {
						btn.addEventListener("click", () => {
							let title = btn
								.querySelector("span.button__text")
								.innerText.trim();
							fireEvent(
								`User clicks ${title} CTA from the other options`
							);
						});
					});
				}
			});
		});
	}
};
