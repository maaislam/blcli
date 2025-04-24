import { setup, fireEvent } from "../../../../../core-files/services";
import { events, pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

export default () => {
	const { ID, VARIATION } = shared;
	events.analyticsReference = window.ga ? "ga" : "_gaUAT";
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

	var updateUserJouney = (action, label) => {
		let currentEventData = JSON.parse(
			sessionStorage.getItem(`${ID}-eventData`)
		);
		let lastData = currentEventData[currentEventData.length - 1];
		lastData["action"] = action;
		lastData.order = currentEventData.length + 1;
		currentEventData.push(lastData);
		sessionStorage.setItem(
			`${ID}-eventData`,
			JSON.stringify(currentEventData)
		);
		// fireEvent(`User Journey - ${JSON.stringify(lastData)}`);

		fireEvent(`Click - ${label}`);
	};

	// Track the user Journey
	pollerLite(
		[() => window.dataLayer, () => document.readyState == "complete"],
		() => {
			let isReloaded = false;

			// Use getEntriesByType() to just get the "navigation" events
			window.performance
				.getEntriesByType("navigation")
				.forEach((p, i) => {
					if (p.type == "reload") {
						isReloaded = true;
					}
				});

			const pageData = dataLayer.filter(
				(item) => item.event == "pageLoad"
			);
			let eventData;
			let userActions = {};
			if (sessionStorage.getItem(`${ID}-eventData`)) {
				eventData = JSON.parse(
					sessionStorage.getItem(`${ID}-eventData`)
				);
				if (isReloaded) {
					userActions["visit_type"] =
						"Reloaded the page on current session";
				} else {
					userActions["visit_type"] = "Browsing on current session";
				}
			} else {
				eventData = [];
				userActions["visit_type"] = "New session";
			}

			userActions["page_name"] = pageData[0].page_name;
			userActions["page_url"] = pageData[0].page_url;
			userActions["customer_type"] = pageData[0].customer_type;
			userActions["login_status"] = pageData[0].login_status;
			eventData.push(userActions);
			eventData[eventData.length - 1]["order"] = eventData.length;
			sessionStorage.setItem(
				`${ID}-eventData`,
				JSON.stringify(eventData)
			);
			// fireEvent(
			// 	`User Journey - ${JSON.stringify(
			// 		eventData[eventData.length - 1]
			// 	)}`
			// );

			let prevUserType, currentUserType;
			let currentEventData = JSON.parse(
				sessionStorage.getItem(`${ID}-eventData`)
			);
			currentUserType =
				currentEventData[currentEventData.length - 1].customer_type;
			if (currentEventData.length > 1) {
				prevUserType =
					currentEventData[currentEventData.length - 2].customer_type;
			} else {
				prevUserType = currentUserType;
			}
			if (prevUserType != currentUserType) {
				fireEvent(
					`User Type Changed - ${prevUserType} to ${currentUserType}`
				);
			} else {
				fireEvent(
					`User Type Remains Same: ${prevUserType} | ${currentUserType}`
				);
			}
			if (location.href.includes("/basket")) {
				fireEvent(`User Reached Basket Page`);
			}
		}
	);

	// Check for velvitiser PDP
	pollerLite(
		[
			".HC129-topContent",
			".HC129-accordionStep.HC129-colours",
			() => window.dataLayer,
		],
		() => {
			const { HCcolours, dataLayer } = window;
			let velvetiserProductIds;
			if (HCcolours) {
				velvetiserProductIds = Object.values(HCcolours).map(
					(item) => item.id
				);
			} else {
				velvetiserProductIds = [
					"472824",
					"472727",
					"472726",
					"472725",
					"472809",
				];
			}

			const velvetiserPDP = dataLayer.filter(
				(item) => item.event == "productDetails"
			);

			if (
				velvetiserPDP.length > 0 &&
				velvetiserProductIds.includes(velvetiserPDP[0].product_ID)
			) {
				//console.log("Velvetiser PDP");

				const vipMember = Object.values(dataLayer).filter((item) => {
					return item.customer_type === "VIP.ME member";
				});
				if (vipMember.length > 0) {
					document.body.classList.add(`${ID}-vip`);
					const tergetDom = document.querySelector(
						".HC129-topContent .HC129-accordionStep.HC129-colours"
					);
					const srcHtml = `<p class="${ID}-promo-msg">
										<span class="vip-me-icon">VIP.ME</span>
										<span class="vip-me-price">£69.95</span>
										<span class="vip-me-text"> Discount applied at checkout.</span>
									</p>`;
					tergetDom.insertAdjacentHTML("beforebegin", srcHtml);
				} else {
					// console.log("NON VIP Member");
					document.body.classList.add(`${ID}-nonVip`);
					const link = `https://www.hotelchocolat.com/uk/my-account/login?TargetPipeline=VipMeSignUp-Show`;
					const vipMe = `<div class="${ID}-vipme-wrapper"><p class="${ID}-vipme-text"><span class="${ID}-vipme-text-main">VIP.ME</span>&nbsp;&nbsp;<span class="${ID}-vipme-text-secondary"><span class="${ID}-vipme-text-secondary-symbol">£</span><span class="${ID}-vipme-text-secondary-price">69.95</span> members-only price. <a href="${link}" class="${ID}-vipme-text-secondary-link">Join</a> or <a href="${link}" class="${ID}-vipme-text-secondary-link">log in</a></span></p></div>`;
					document
						.querySelector(`.HC129-accordionStep.HC129-colours`)
						.insertAdjacentHTML("beforebegin", vipMe);
				}
				pollerLite(
					[() => sessionStorage.getItem(`${ID}-eventData`)],
					() => {
						let prevUserType, currentUserType;
						let currentEventData = JSON.parse(
							sessionStorage.getItem(`${ID}-eventData`)
						);
						currentUserType =
							currentEventData[currentEventData.length - 1]
								.customer_type;
						if (currentEventData.length > 1) {
							prevUserType =
								currentEventData[currentEventData.length - 2]
									.customer_type;
						} else {
							prevUserType = currentUserType;
						}

						if (!sessionStorage.getItem(`${ID}-velvetiserPDP`)) {
							sessionStorage.setItem(
								`${ID}-velvetiserPDP`,
								currentUserType
							);
							fireEvent(
								`${prevUserType} | ${currentUserType} | User sees Velvetiser PDP`
							);
						} else {
							let onLoadUserType = sessionStorage.getItem(
								`${ID}-velvetiserPDP`
							);
							if (
								onLoadUserType !== currentUserType &&
								currentUserType === "VIP.ME member"
							) {
								fireEvent(
									`Sees Velvetiser PDP was a ${onLoadUserType} is now a ${currentUserType}`
								);
							}
							sessionStorage.setItem(
								`${ID}-velvetiserPDP`,
								currentUserType
							);
						}
					}
				);

				pollerLite(
					[".HC129-subscription .HC129-subscription__link"],
					() => {
						const subscriptionLink = document.querySelector(
							".HC129-subscription .HC129-subscription__link"
						);

						subscriptionLink.addEventListener("click", (e) => {
							updateUserJouney(
								"Subscription CTA clicked from velvetiser PDP",
								"User clicked on subscription CTA from velvetiser PDP"
							);
						});
					}
				);

				pollerLite([`.${ID}-vipme-text-secondary-link`], () => {
					const vipMeButtons = document.querySelectorAll(
						`.${ID}-vipme-text-secondary-link`
					);
					// console.log("vipMeButtons", vipMeButtons);
					vipMeButtons.forEach((button) => {
						button.addEventListener("click", (e) => {
							updateUserJouney(
								`User clicks ${button.textContent.trim()} from VIP.ME promo message on velvetiser PDP`,
								`User clicks ${button.textContent.trim()} from VIP.ME promo message on velvetiser PDP`
							);
						});
					});
				});

				pollerLite([".product-add-to-cart .HC129-add"], () => {
					const btn = document.querySelector(
						".product-add-to-cart .HC129-add"
					);
					btn.addEventListener("click", () => {
						const starterKits = document.querySelectorAll(
							".HC129-accordionStep.HC129-kits .HC129-selected"
						);
						if (starterKits.length > 0) {
							updateUserJouney(
								`User added Velvetiser with starter kits to the bag on velvetiser PDP`,
								`User added Velvetiser with starter kits to the bag on velvetiser PDP`
							);
						} else {
							updateUserJouney(
								`User added Velvetiser without starter kits to the bag on velvetiser PDP`,
								`User added Velvetiser without starter kits to the bag on velvetiser PDP`
							);
						}
					});
				});
			}
		}
	);

	// All Pages
	pollerLite(["form#search-form input[type='text']"], () => {
		const searchForm = document.querySelector(
			"form#search-form input[type='text']"
		);
		searchForm.addEventListener("blur", (e) => {
			updateUserJouney(
				`User uses search and typed: ${searchForm.value}`,
				`User uses search and typed: ${searchForm.value}`
			);
		});
	});
	pollerLite(["#navigation"], () => {
		const searchForm = document.querySelector("#navigation");
		searchForm.addEventListener("click", (e) => {
			if (e.target.closest("a")) {
				updateUserJouney(
					"User uses navigation",
					"User uses navigation"
				);
			}
		});
	});

	if (location.href.includes("choose-your-machine?step=")) {
		pollerLite(
			[".configurator-landing .right_container button#nextStep"],
			() => {
				console.log("Subs page loaded");
				const targetNextStepButton = document.querySelector(
					".configurator-landing .right_container button#nextStep"
				);
				let step = window.location.href?.split("=")[1];
				let current = targetNextStepButton
					.querySelector(".next-step-btn.activeStep")
					?.getAttribute("stepbtn-id")
					.trim();
				targetNextStepButton.addEventListener("click", function (e) {
					if (step == "Addons" && current == "addons") {
						updateUserJouney(
							`User adds item to the bag from the velvitiser subscriptions page`,
							`User adds item to the bag from the velvitiser subscriptions page`
						);
					}
					step = window.location.href?.split("=")[1];
					current = targetNextStepButton
						.querySelector(".next-step-btn.activeStep")
						?.getAttribute("stepbtn-id")
						.trim();
				});
			}
		);
	}

	pollerLite([".cart-items-form .HC083-addonsBox .HC083-add"], () => {
		const btn = document.querySelector(
			".cart-items-form .HC083-addonsBox .HC083-add"
		);
		btn.addEventListener("click", () => {
			updateUserJouney(
				`User clicks to add velvitiser starter kit on basket page`,
				`User clicks to add velvitiser starter kit on basket page`
			);
		});
	});

	pollerLite([".HC129-addonsBox .HC129-add"], () => {
		const btn = document.querySelector(".HC129-addonsBox .HC129-add");
		btn.addEventListener("click", () => {
			updateUserJouney(
				`User clicks to add little extra item on basket page`,
				`User clicks to add little extra item on basket page`
			);
		});
	});

	pollerLite(["button#add-to-cart", () => window.pageContext], () => {
		if (window.pageContext.type === "product") {
			const btn = document.querySelector("button#add-to-cart");
			btn.addEventListener("click", () => {
				updateUserJouney(
					`User clicks to add to the bag on PDP`,
					`User clicks to add to the bag on PDP`
				);
			});
		}
	});

	pollerLite(["#QuickViewDialog"], () => {
		const btn = document.querySelector("#QuickViewDialog");
		btn.addEventListener("click", (e) => {
			if (e.target.closest("button#add-to-cart")) {
				updateUserJouney(
					`User clicks to add to the bag from Quick Buy`,
					`User clicks to add to the bag from Quick Buy`
				);
			}
		});
	});

	pollerLite(["#account-menu-signin"], () => {
		const signIn = document.querySelector("#account-menu-signin");
		signIn.addEventListener("click", (e) => {
			updateUserJouney(
				"User Clicked Sign In from header dropdown",
				"User clicked on Sign In and is a guest"
			);
		});
	});

	pollerLite(["#account-menu-register"], () => {
		const register = document.querySelector("#account-menu-register");
		register.addEventListener("click", (e) => {
			updateUserJouney(
				"User Clicked Register from header dropdown",
				"User clicked on Register and is a guest"
			);
		});
	});
	pollerLite(['#my-account-dropdown a[href$="/Login-Logout"]'], () => {
		const logOut = document.querySelector(
			'#my-account-dropdown a[href$="/Login-Logout"]'
		);

		logOut.addEventListener("click", (e) => {
			//e.preventDefault();
			// console.log("Log Out button Available", logOut);
			let currentUserType;
			let currentEventData = JSON.parse(
				sessionStorage.getItem(`${ID}-eventData`)
			);
			currentUserType =
				currentEventData[currentEventData.length - 1].customer_type;
			updateUserJouney(
				"User Clicked Log Out from header dropdown",
				`User clicked on Log Out and is a ${currentUserType}`
			);
		});
	});
	pollerLite([".login-intercept.account .login-box.welcome-back"], () => {
		const signIn = document.querySelector(
			'.login-intercept.account .login-box.welcome-back button[name="dwfrm_login_login"]'
		);

		signIn.addEventListener("click", (e) => {
			updateUserJouney(
				`User clicked Sign In CTA on my account page`,
				`User clicked on Sign In CTA on my account page and is a guest`
			);
		});
	});
	pollerLite(
		[
			".new-customer.new-customer-registration button[name='dwfrm_profile_confirm']",
		],
		() => {
			const register = document.querySelector(
				".new-customer.new-customer-registration button[name='dwfrm_profile_confirm']"
			);
			register.addEventListener("click", (e) => {
				updateUserJouney(
					`User clicked Register CTA on my account page`,
					`User clicked on Register CTA on my account page and is a guest`
				);
			});
		}
	);
	pollerLite([`.vipme-container`], () => {
		if (document.querySelector(`.vipme-container .step-1`)) {
			const forms = document.querySelectorAll(
				`.vipme-container .step-1 #tabs-2 form, .vipme-container .step-1 #tabs-1 form`
			);
			forms.forEach((form) => {
				form.addEventListener("submit", function (e) {
					let currentUserType;
					let currentEventData = JSON.parse(
						sessionStorage.getItem(`${ID}-eventData`)
					);
					currentUserType =
						currentEventData[currentEventData.length - 1]
							.customer_type;
					updateUserJouney(
						"User submitted step-1 of VIP Membership form: Sign In/Register",
						`User submitted step-1 of VIP Membership form: Sign In/Register and is a ${currentUserType}`
					);
				});
			});
		} else {
			// Step 2
			document
				.querySelector(`.vipme-container .step-2`)
				.addEventListener("click", function ({ target }) {
					let button = target.closest(`button.vipme-button`);
					if (button.closest(`.step-2`)) {
						// console.log(`User submitted step-2: Already a member?`);
						let currentUserType;
						let currentEventData = JSON.parse(
							sessionStorage.getItem(`${ID}-eventData`)
						);
						currentUserType =
							currentEventData[currentEventData.length - 1]
								.customer_type;
						updateUserJouney(
							"User submitted step-2 of VIP Membership form: Already a member?",
							`User submitted step-2 of VIP Membership form: Already a member? and is a ${currentUserType}`
						);
					}
				});
			document
				.querySelector(`.vipme-container .step-2 .barcode-submit`)
				.addEventListener("submit", function (e) {
					//   console.log(`User submitted step-2: Already a member?`);
					// fireEvent(`User submitted step-2: Already a member?`);
					let currentUserType;
					let currentEventData = JSON.parse(
						sessionStorage.getItem(`${ID}-eventData`)
					);
					currentUserType =
						currentEventData[currentEventData.length - 1]
							.customer_type;
					updateUserJouney(
						"User submitted step-2 of VIP Membership form: Already a member?",
						`User submitted step-2 of VIP Membership form: Already a member? and is a ${currentUserType}`
					);
				});
			// Step 3
			let timeout;
			// document.querySelector(`.vipme-container .step-3 .vipme-signup`).addEventListener("submit", function (e) {
			document
				.querySelector(`.vipme-container .step-3 button.vipme-button`)
				.addEventListener("click", function (e) {
					// console.log("step3 clicked!");
					const birthDaySelects = Array.from(
						document.querySelectorAll(`select.input-select`)
					).map((select) => select.value);
					clearTimeout(timeout);
					timeout = setTimeout(() => {
						const ageRestriction = document
							.querySelector(`.age-restriction-note`)
							.classList.contains(`active`);
						// console.log(ageRestriction);
						//   console.log(birthDaySelects);
						if (
							birthDaySelects.indexOf("") < 0 &&
							!ageRestriction
						) {
							// console.log(`User completed step-3: Confirm and join`);
							// fireEvent(
							// 	`User completed step-3: Confirm and join`
							// );
							// localStorage.removeItem(`${ID}-FromVelvetiser`);
							let currentUserType;
							let currentEventData = JSON.parse(
								sessionStorage.getItem(`${ID}-eventData`)
							);
							currentUserType =
								currentEventData[currentEventData.length - 1]
									.customer_type;
							updateUserJouney(
								"User submitted step-3 of VIP Membership form: Confirm and join",
								`User submitted step-3 of VIP Membership form: Confirm and join and is a ${currentUserType}`
							);
						}
					}, 100);
				});
		}
	});
};
