/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events, pollerLite } from "../../../../../lib/utils";
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
	if (shared.VARIATION == "control") {
		return;
	}
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
				sessionStorage.getItem(`${ID}-ps-survey`)
			);
			// the other tab should now have it, so we're done with it.
			localStorage.removeItem("shareSessionStorage"); // <- could do short timeout as well.
		} else if (event.key == "shareSessionStorage") {
			// another tab sent data <- get it
			var data = JSON.parse(event.newValue);
			if (data != "" && data != null) {
				sessionStorage.setItem(`${ID}-ps-survey`, data);
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
	if (!sessionStorage.getItem(`${ID}-is-dismissed`)) {
		localStorage.setItem("getSessionStorage", `${ID}`);
		localStorage.removeItem("getSessionStorage", `${ID}`);
	}
	if (sessionStorage.getItem(`${ID}-ps-survey`) !== "true") {
		const body = document.body;
		body.classList.add(`${ID}`);

		var surveyOverlayDom = `<div class="${ID}-survey-overlay hidden"></div>`;
		body.insertAdjacentHTML("beforeend", surveyOverlayDom);

		var data = {
			actionType: "Navigates away",
			question: "",
			response: "",
		};
		var steps = `
                <div class="${ID}-PS-survey-container hidden">
                  <div class="${ID}-close-survey"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L22 22" stroke="black" stroke-width="3"></path><path d="M2 22L22 2" stroke="black" stroke-width="3"></path></svg></div>
                  <div class="${ID}-step ${ID}-step-1 ${ID}-step-active" id="${ID}-step-1">
                    <div class="${ID}-step-top">
                        <div class="${ID}-progress">1/1</div>
                        <div class="${ID}-question">
                          Can you tell us why you're not going ahead with this product?
                        </div>
                    </div>
                    <div class="${ID}-step-mid">
                        <div class="${ID}-inputs-container">
                            <div class="${ID}-input">
                                <input type="radio" id="why_not1" name="why_not" value="Product Price">
                                <label for="why_not1">Product Price</label>
                            </div>
                            <div class="${ID}-input">
                                <input type="radio" id="why_not2" name="why_not" value="Delivery time">
                                <label for="why_not2">Delivery time</label>
                            </div>
                            <div class="${ID}-input">
                                <input type="radio" id="why_not3" name="why_not" value="Delivery price">
                                <label for="why_not3">Delivery price</label>
                            </div>
                            <div class="${ID}-input">
                                <input type="radio" id="why_not4" name="why_not" value="Missing information">
                                <label for="why_not4">Missing information</label>
                            </div>
                            <div class="${ID}-input">
                                <input type="radio" id="why_not5" name="why_not" value="Not available in my size/colour">
                                <label for="why_not5">Not available in my size/colour</label>
                            </div>
                            <div class="${ID}-input">
                                <input type="radio" id="why_not6" name="why_not" value="Website issue">
                                <label for="why_not6">Website issue</label>
                            </div>
                            <div class="${ID}-input">
                                <input type="radio" id="why_not7" name="why_not" value="Other">
                                <label for="why_not7">Other</label>
                                <div class="${ID}-other-input">
                                    <input type="text" class="${ID}-why_not-other" placeholder="Type your answer here"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="${ID}-step-bottom">
                        <button class="${ID}-next-btn ${ID}-disabled" step="${ID}-step-2">Submit</button>
                    </div>
                </div>
                <div class="${ID}-step ${ID}-step-2" id="${ID}-step-2">
                    <div class="${ID}-step-last">
                        <div class="${ID}-close-circle">
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="${ID}-check-icon"><path fill="currentColor" d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z" class=""></path></svg>
                        </div>
                        <div class="${ID}-response">Thank You!</div>
                        <p class="${ID}-response-text">We value your feedback.</p>
                        <a class="${ID}-home-btn" href="https://www.flannels.com">Go to home page</a>
                    </div>
                </div>
              </div>`;

		body.insertAdjacentHTML("beforeend", steps);
		const radios = document.querySelectorAll(
			`.${ID}-input input[type="radio"]`
		);
		radios.forEach(function (elm) {
			elm.addEventListener("change", function (e) {
				const step = elm.closest(`.${ID}-step`);
				const selectedValue = elm.value.trim();
				const isOther = selectedValue === "Other";
				if (isOther) {
					const textFieldContainer = elm
						.closest(`.${ID}-input`)
						.querySelector(`.${ID}-other-input`);
					if (textFieldContainer != null) {
						textFieldContainer.classList.add(
							`${ID}-why_not-other-input-show`
						);
						textFieldContainer.querySelector("input").focus();
						if (
							textFieldContainer.querySelector("input").value ==
							""
						) {
							step.querySelector(`.${ID}-next-btn`).classList.add(
								`${ID}-disabled`
							);
						}
					}
				} else {
					data["response"] = e.target.value.trim();
					const textfields = step.querySelector(`.${ID}-other-input`);
					if (textfields !== null) {
						textfields.classList.remove(
							`${ID}-why_not-other-input-show`
						);
						textfields.querySelector("input").value = "";
					}
					step.querySelector(`.${ID}-next-btn`).classList.remove(
						`${ID}-disabled`
					);
				}
			});
		});

		const OthertextFields = document.querySelectorAll(
			`.${ID}-other-input input[type="text"]`
		);

		OthertextFields.forEach(function (elm) {
			elm.addEventListener("keyup", function (e) {
				const step = elm.closest(`.${ID}-step`);
				if (e.target.value.trim() !== "") {
					step.querySelector(`.${ID}-next-btn`).classList.remove(
						`${ID}-disabled`
					);
				} else {
					step.querySelector(`.${ID}-next-btn`).classList.add(
						`${ID}-disabled`
					);
				}
				data["response"] = "Other - " + e.target.value.trim();
			});
		});

		const nextBtn = document.querySelector(`.${ID}-next-btn`);
		const question = document.querySelector(`.${ID}-question`);
		nextBtn.addEventListener("click", function (e) {
			const nextStep = document.getElementById(this.getAttribute("step"));
			const step = this.closest(`.${ID}-step`);
			const textfields = step.querySelector(
				`.${ID}-input .${ID}-why_not-other`
			);
			data["question"] = question.innerText.trim();
			step.classList.remove(`${ID}-step-active`);
			nextStep.classList.add(`${ID}-step-active`);
			fireEvent(`Product Selection Survey Data: ${JSON.stringify(data)}`);
		});

		const surveyOverlay = document.querySelector(`.${ID}-survey-overlay`);
		const surveyContainer = document.querySelector(
			`.${ID}-PS-survey-container`
		);

		document
			.querySelector(`.${ID}-close-survey`)
			.addEventListener("click", (e) => {
				surveyOverlay.classList.add("hidden");
				surveyContainer.classList.add("hidden");
				sessionStorage.setItem(`${ID}-ps-survey`, "true");
			});

		var isItemAdded = false;
		pollerLite(["#productDetails"], () => {
			const addToBagBtn = document.querySelector(
				"#productDetails #sAddToBagWrapper #aAddToBag"
			);
			addToBagBtn.addEventListener("click", (e) => {
				var allSelected = false;
				const detailsContainer =
					document.querySelector("#productDetails");
				if (detailsContainer) {
					const selectItems = document.querySelectorAll(
						"#productDetails select"
					);
					if (selectItems.length > 0) {
						selectItems.forEach((item) => {
							if (item.value != false && item.value !== "") {
								allSelected = true;
							} else {
								allSelected = false;
							}
						});
						if (allSelected) {
							isItemAdded = true;
						}
					} else {
						isItemAdded = true;
					}
				}
			});
		});
		const elements = {
			question: question,
			surveyOverlay: surveyOverlay,
			surveyContainer: surveyContainer,
			text: `Can you tell us why you're not going ahead with this product?`,
			expId: ID,
		};

		pollerLite(["#BreadcrumbGroup ul"], () => {
			const breadCrumbs = document.querySelectorAll(
				"#BreadcrumbGroup ul li:not(:last-child) a"
			);
			if (breadCrumbs.length > 0 && !isItemAdded) {
				handleMouseInOut(breadCrumbs, elements);
			}
		});

		pollerLite(["#logoContainer .LogoWrap a"], () => {
			const headerLogo = document.querySelector(
				"#logoContainer .LogoWrap a"
			);
			let logoTimer;
			headerLogo.addEventListener("mouseenter", (e) => {
				logoTimer = setTimeout(() => {
					if (
						sessionStorage.getItem(`${ID}-ps-survey`) !== "true" &&
						!isItemAdded
					) {
						question.innerText = `Can you tell us why you're not going ahead with this product?`;
						surveyOverlay.classList.remove("hidden");
						surveyContainer.classList.remove("hidden");
						sessionStorage.setItem(`${ID}-ps-survey`, "true");
					}
				}, 400);
			});
			headerLogo.addEventListener("mouseleave", (e) => {
				clearTimeout(logoTimer);
			});
		});

		pollerLite(["#topMenuWrapper #topMenu"], () => {
			const topMenus = document.querySelectorAll(
				"#topMenuWrapper #topMenu li a"
			);
			if (topMenus.length > 0 && !isItemAdded) {
				handleMouseInOut(topMenus, elements);
			}
		});

		const mouseEvent = (e) => {
			if (sessionStorage.getItem(`${ID}-ps-survey`) !== "true") {
				const shouldShowExitIntent =
					!e.toElement && !e.relatedTarget && e.clientY < 2;

				if (shouldShowExitIntent && !isItemAdded) {
					document.removeEventListener("mouseout", mouseEvent);
					question.innerText = `Help us  improve - Why are you leaving today?`;
					surveyOverlay.classList.remove("hidden");
					surveyContainer.classList.remove("hidden");
					sessionStorage.setItem(`${ID}-ps-survey`, "true");
					data.actionType = "Exit intent";
				}
			}
		};

		setTimeout(() => {
			document.addEventListener("mouseout", mouseEvent);
		}, 2000);

		function handleMouseInOut(menuItem, elements) {
			menuItem.forEach((item) => {
				let inTimer;
				item.addEventListener("mouseenter", (e) => {
					inTimer = setTimeout(() => {
						if (
							sessionStorage.getItem(
								`${elements.expId}-ps-survey`
							) !== "true" &&
							!isItemAdded
						) {
							elements.question.innerText = elements.text;
							elements.surveyOverlay.classList.remove("hidden");
							elements.surveyContainer.classList.remove("hidden");
							sessionStorage.setItem(
								`${elements.expId}-ps-survey`,
								"true"
							);
						}
					}, 400);
				});

				item.addEventListener("mouseleave", () => {
					clearTimeout(inTimer);
				});
			});
		}
	}
};
