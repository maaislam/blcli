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

const { ID, VARIATION } = shared;

export default () => {
	events.analyticsReference = window.ga ? "ga" : "_gaUAT";

	setup();
	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		pollerLite(["#aAddToBag"], () => {
			let atbButton =
				document.querySelector(
					"#spanAddToBagWrapper #aPrePersAddToBag"
				) || document.querySelector("#sAddToBagWrapper #aAddToBag");
			atbButton?.addEventListener("click", (e) => {
				fireEvent("Click - User clicks on the add to bag CTA");
			});
		});

		pollerLite(["ul#ulSizes"], () => {
			const ulSizes = document.querySelector("ul#ulSizes");
			if (ulSizes) {
				const sizes = ulSizes.querySelectorAll("li");
				if (sizes.length > 0) {
					sizes.forEach((size) => {
						size.addEventListener("click", (e) => {
							fireEvent(
								"Click - User clicks on the size input elements"
							);
						});
					});
				}
			}
		});
		return;
	}
	const config = { attributes: true, childList: true, subtree: true };
	if (VARIATION == "1") {
		const downArrow = `<svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
								<line y1="-0.75" x2="12.5523" y2="-0.75" transform="matrix(0.712079 0.702099 -0.712079 0.702099 0 2.02872)" stroke="#3D3D3D" stroke-width="1.5"/>
								<line x1="18.9775" y1="1.37198" x2="9.2889" y2="11.0606" stroke="#3D3D3D" stroke-width="1.5"/>
							</svg>`;

		const closeIcon = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1 1L16 16" stroke="black" stroke-miterlimit="10"/>
							<path d="M1 16L15.7 1.30002" stroke="black" stroke-miterlimit="10"/>
						</svg>`;
		// Write experiment code here
		// ...
		function isIOS() {
			return (
				[
					"iPad Simulator",
					"iPhone Simulator",
					"iPod Simulator",
					"iPad",
					"iPhone",
					"iPod",
				].includes(navigator.platform) ||
				// iPad on iOS 13 detection
				(navigator.userAgent.includes("Mac") &&
					"ontouchend" in document)
			);
		}
		pollerLite(["#aAddToBag"], () => {
			if (document.getElementById("aPrePersAddToBag")) {
				fireEvent(
					`Interaction - page is personalised product so experiment not fired`,
					true
				);
				return;
			}

			let atbButton =
				document.querySelector(
					"#spanAddToBagWrapper #aPrePersAddToBag"
				) || document.querySelector("#sAddToBagWrapper #aAddToBag");
			let isOneSized = false;
			const ulSizes = document.querySelector("ul#ulSizes");
			if (ulSizes) {
				const sizes = ulSizes.querySelectorAll("li.sizeButtonli");
				isOneSized = sizes.length > 0 ? false : true;
			}
			let isOneColored = !document.querySelector("ul#ulColourImages");
			let atbInner;
			if (atbButton?.querySelector("span.addToBagInner")) {
				atbInner = atbButton?.querySelector("span.addToBagInner");
			} else {
				atbInner = atbButton;
			}
			const atbText = atbInner?.innerText.trim();
			let prodBrand =
				document.getElementById(`lblProductBrand`).innerText;
			let prodTitle = document.getElementById(`lblProductName`).innerText;
			let priceHTML = document.querySelector(".pdpPriceRating").innerHTML;
			let stickyBarHTML = `
				<div class="${ID}-sticky-atb-wrapper">
					<div class="${ID}-sticky-atb">
						<div class="${ID}-sticky-atb--info">
							<div class="${ID}-sticky-atb--title">
								<p><strong>${prodBrand}</strong>&nbsp;${prodTitle}</p>
							</div>
							<div class="${ID}-sticky-atb--pricesection">
								${priceHTML}
							</div>
						</div>
						<div class="${ID}-sticky-atb--buysection">
							<div class="${ID}-size-selector">
								<div class="${ID}-size-selector--label">
									<p>SELECT SIZE</p>
									${downArrow}
								</div>
								<div class="${ID}-size-selector--sizes">
									<div class="${ID}-size-selector--header">
										<span>SELECT SIZE</span>
										${closeIcon}
									</div>
									<ul class="${ID}-size-selector--sizes-list">
										
									</ul>
								</div>
							</div>
							<button class="${ID}-sticky-atb--buybutton">
								${atbText}
							</button>
						</div>      
					</div>
				</div>
				`;
			let insertionPoint = document.querySelector(
				`.mp-scroller-inner .HeaderTopSpacer`
			);

			insertionPoint.insertAdjacentHTML("afterend", stickyBarHTML);
			document
				.querySelector(`.${ID}-sticky-atb--buybutton`)
				?.addEventListener("click", (e) => {
					fireEvent(`Click - User clicks the sticky add to bag CTA`);

					if (
						document.querySelectorAll("ul#ulSizes li.sizeButtonli")
							.length !== 1 &&
						!document.querySelector(
							"ul#ulSizes li.sizeVariantHighlight"
						)
					) {
						// document
						// 	.querySelector("#productDetails")
						// 	?.scrollIntoView({
						// 		behavior: "smooth",
						// 	});
						document
							.querySelector(`.${ID}-size-selector--sizes`)
							.classList.add("show");
					} else {
						atbButton.click();
					}
				});

			atbButton.addEventListener("click", (e) => {
				if (e.isTrusted) {
					fireEvent(
						"Click - User clicks the add to bag CTA (standard)"
					);
				}
			});

			if (!isOneSized) {
				const atbObserver = new MutationObserver(
					(mutationsList, observer) => {
						const checkIfSelected = ulSizes.querySelector(
							"li.sizeVariantHighlight"
						);

						if (checkIfSelected) {
							document.querySelector(
								`.${ID}-sticky-atb--buybutton`
							).innerText =
								atbButton?.querySelector(
									"span.addToBagInner"
								).innerText;
						}
					}
				);
				atbObserver.observe(atbButton, config);

				const priceContainer =
					document.querySelector(".pdpPriceRating");
				const priceObserver = new MutationObserver(
					(mutationsList, observer) => {
						priceObserver.disconnect();
						const newPrice = document.querySelector(
							`.${ID}-sticky-atb--pricesection`
						);
						if (newPrice) {
							newPrice.innerHTML = priceContainer.innerHTML;
						}
						priceObserver.observe(priceContainer, config);
					}
				);
				priceObserver.observe(priceContainer, config);

				pollerLite(["#ulSizes", `.${ID}-sticky-atb-wrapper`], () => {
					fireEvent(
						"Visible - User sees both sticky size & add to bag CTAs"
					);
					const ulSizes = document.querySelectorAll("ul#ulSizes li");
					if (ulSizes.length > 0) {
						const sizeSelector = document.querySelector(
							`.${ID}-size-selector--sizes-list`
						);
						ulSizes.forEach((size) => {
							const sizeText = size.getAttribute("data-text");
							const sizeTextElm = size.cloneNode(true);
							sizeTextElm.innerHTML = `<span>${sizeText}</span>`;
							sizeSelector.appendChild(sizeTextElm);

							if (
								size.classList.contains("sizeVariantHighlight")
							) {
								document.querySelector(
									`.${ID}-size-selector--label p`
								).innerText = sizeText;
							}
							if (size.classList.contains("greyOut")) {
								sizeTextElm.classList.add("greyOut");
							}
							sizeTextElm.addEventListener("click", (e) => {
								e.preventDefault();
								if (
									!sizeTextElm.classList.contains("greyOut")
								) {
									size.click();
									const parent = e.target.closest("ul");
									const children =
										parent.querySelectorAll("li");
									children.forEach((child) => {
										child.classList.remove(
											"sizeVariantHighlight"
										);
									});
									e.target
										.closest("li")
										.classList.add("sizeVariantHighlight");
									document.querySelector(
										`.${ID}-size-selector--label p`
									).innerText = sizeText;
								}

								// if (
								// 	!isOneColored &&
								// 	sizeTextElm.classList.contains("greyOut")
								// ) {
								// 	document
								// 		.querySelector("#productDetails")
								// 		?.scrollIntoView({
								// 			behavior: "smooth",
								// 		});
								// }
							});

							const sizeObserver = new MutationObserver(
								(mutationsList, observer) => {
									sizeObserver.disconnect();

									if (size.classList.contains("greyOut")) {
										sizeTextElm.classList.add("greyOut");
									} else {
										sizeTextElm.classList.remove("greyOut");
									}
									if (
										size.classList.contains(
											"sizeVariantHighlight"
										)
									) {
										sizeTextElm.classList.add(
											"sizeVariantHighlight"
										);
										document.querySelector(
											`.${ID}-size-selector--label p`
										).innerText =
											size.getAttribute("data-text");
									} else {
										sizeTextElm.classList.remove(
											"sizeVariantHighlight"
										);
									}
									sizeObserver.observe(size, config);
								}
							);
							sizeObserver.observe(size, config);
						});
					}
				});

				const sizeSelector = document.querySelector(
					`.${ID}-size-selector`
				);
				sizeSelector?.addEventListener("click", (e) => {
					e.preventDefault();
					// if (!e.target.closest(`.${ID}-size-selector--sizes`)) {
					// 	document
					// 		.querySelector(`.${ID}-size-selector--sizes`)
					// 		.classList.toggle("show");
					// 	fireEvent(
					// 		"Click - User clicks with the sticky size element"
					// 	);
					// }
					setTimeout(() => {
						// console.log(e.target);
						if (
							!e.target.closest(
								`.${ID}-size-selector--header svg`
							) &&
							!e.target.closest(`li.greyOut`)
						) {
							document
								.querySelector(`.${ID}-size-selector--sizes`)
								.classList.toggle("show");
							fireEvent(
								"Click - User clicks with the sticky size element"
							);
						}
					}, 100);
				});

				const closeSizeSelector = document.querySelector(
					`.${ID}-size-selector--header svg`
				);
				closeSizeSelector?.addEventListener("click", (e) => {
					e.preventDefault();
					document
						.querySelector(`.${ID}-size-selector--sizes`)
						.classList.toggle("show");
				});
			}

			if (!isOneColored) {
				const allColors = document.querySelector("ul#ulColourImages");
				if (allColors) {
					const allColorsObserver = new MutationObserver(
						(mutationsList, observer) => {
							allColorsObserver.disconnect();
							if (
								!document.querySelector(
									"ul#ulSizes li.sizeVariantHighlight"
								)
							) {
								document.querySelector(
									`.${ID}-size-selector--label p`
								).innerText = "SELECT SIZE";
							}

							allColorsObserver.observe(allColors, config);
						}
					);
					allColorsObserver.observe(allColors, config);
				}
			}

			if (isIOS()) {
				document
					.querySelector(`.${ID}-sticky-atb-wrapper`)
					.classList.add("ios");
			}
			function makeSticky() {
				const mainAtbButton = document.querySelector(
					"#sAddToBagWrapper a#aAddToBag"
				);
				const ulSizes = document.querySelector("ul#ulSizes");

				let bottomOffset =
					mainAtbButton?.getBoundingClientRect().bottom;

				let topOffset = ulSizes?.getBoundingClientRect().top;

				if (bottomOffset < 10) {
					document
						.querySelector(`.${ID}-sticky-atb-wrapper`)
						?.classList.add(`${ID}-show-sticky-bar`);
				} else if (
					topOffset >
					window.innerHeight - ulSizes?.getBoundingClientRect().height
				) {
					document
						.querySelector(`.${ID}-sticky-atb-wrapper`)
						?.classList.add(`${ID}-show-sticky-bar`);
				} else {
					document
						.querySelector(`.${ID}-sticky-atb-wrapper`)
						?.classList.remove(`${ID}-show-sticky-bar`);
					document
						.querySelector(
							`.${ID}-sticky-atb-wrapper .${ID}-size-selector--sizes`
						)
						?.classList.remove("show");
				}
			}

			makeSticky();
			window.onscroll = () => {
				makeSticky();
			};
			document.body.addEventListener("click", (e) => {
				if (
					e.isTrusted &&
					!e.target.closest(`.${ID}-sticky-atb-wrapper`) &&
					!e.target.closest(`.${ID}-size-selector--sizes`) &&
					document
						.querySelector(
							`.${ID}-sticky-atb-wrapper .${ID}-size-selector--sizes`
						)
						?.classList.contains("show")
				) {
					e.preventDefault();
					document
						.querySelector(
							`.${ID}-sticky-atb-wrapper .${ID}-size-selector--sizes`
						)
						?.classList.remove("show");
				}
			});
		});
	}

	if (VARIATION == "2" || VARIATION == "3") {
		function makeSticky() {
			const mainAtbButton = document.querySelector(
				"#sAddToBagWrapper a#aAddToBag"
			);
			let bottomOffset = mainAtbButton?.getBoundingClientRect().bottom;
			let topOffset = mainAtbButton?.getBoundingClientRect().top;
			// let compareOff;
			// if (window.innerWidth > 767.98) {
			// 	compareOff = 130;
			// } else {
			// 	compareOff = 113;
			// }

			if (
				document
					.querySelector(`.${ID}-sticky-atb-wrapper`)
					?.classList.contains(`${ID}-show-sticky-bar`)
			) {
				if (topOffset > 110 && bottomOffset < window.innerHeight) {
					document
						.querySelector(`.${ID}-sticky-atb-wrapper`)
						?.classList.remove(`${ID}-show-sticky-bar`);
					document
						.querySelector("#BodyWrap")
						.classList.remove("sticky-cta-shown");
				}
			} else {
				if (bottomOffset < 1 || topOffset > window.innerHeight) {
					document
						.querySelector(`.${ID}-sticky-atb-wrapper`)
						?.classList.add(`${ID}-show-sticky-bar`);
					document
						.querySelector("#BodyWrap")
						.classList.add("sticky-cta-shown");
					if (pageYOffset === 0) {
						document
							.querySelector("#BodyWrap")
							.classList.add("no-offset");
					} else {
						document
							.querySelector("#BodyWrap")
							.classList.remove("no-offset");
					}
				}
			}
		}
		pollerLite(["#aAddToBag"], () => {
			let stickyBarHTML = `
				<div class="${ID}-sticky-atb-wrapper">
					<div class="${ID}-sticky-atb">
						<button class="${ID}-sticky-atb--buybutton">
							ADD TO BAG
						</button>    
					</div>
				</div>
				`;

			if (VARIATION == 2) {
				document.body.insertAdjacentHTML("beforeend", stickyBarHTML);
			} else if (VARIATION == 3) {
				let insertionPoint = document.querySelector(
					`.mp-scroller-inner .HeaderTopSpacer`
				);
				insertionPoint.insertAdjacentHTML("afterend", stickyBarHTML);
			}

			if (VARIATION == 2 || VARIATION == 3) {
				pollerLite(
					["#aAddToBag", `.${ID}-sticky-atb--buybutton`],
					() => {
						fireEvent(
							"Visible - User sees the sticky add to bag CTA"
						);

						let isOneSized = false;
						const ulSizes = document.querySelector("ul#ulSizes");
						if (ulSizes) {
							const sizes =
								ulSizes.querySelectorAll("li.sizeButtonli");
							isOneSized = sizes.length > 1 ? false : true;

							if (sizes.length > 0) {
								sizes.forEach((size) => {
									size.addEventListener("click", (e) => {
										fireEvent(
											"Click - User clicks on the size input elements"
										);
									});
								});
							}
						}

						let atbButton =
							document.querySelector(
								"#spanAddToBagWrapper #aPrePersAddToBag"
							) ||
							document.querySelector(
								"#sAddToBagWrapper #aAddToBag"
							);

						var isClickedFromFakeCta = false;
						document
							.querySelector(`.${ID}-sticky-atb--buybutton`)
							?.addEventListener("click", (e) => {
								fireEvent(
									"Click - User clicks the sticky add to bag CTA(test)"
								);
								isClickedFromFakeCta = true;
								atbButton.click();
								if (
									!isOneSized &&
									!document.querySelector(
										"ul#ulSizes li.sizeVariantHighlight"
									)
								) {
									document
										.querySelector("#productDetails")
										?.scrollIntoView({
											behavior: "smooth",
										});
								}
							});

						atbButton.addEventListener("click", (e) => {
							if (!isClickedFromFakeCta) {
								fireEvent(
									"Click - User clicks the add to bag CTA (standard)"
								);
							}
							isClickedFromFakeCta = false;
						});

						if (!isOneSized) {
							const atbObserver = new MutationObserver(
								(mutationsList, observer) => {
									const checkIfSelected =
										ulSizes.querySelector(
											"li.sizeVariantHighlight"
										);

									if (checkIfSelected) {
										document.querySelector(
											`.${ID}-sticky-atb--buybutton`
										).innerText =
											atbButton?.querySelector(
												"span.addToBagInner"
											).innerText;
									}
								}
							);
							atbObserver.observe(atbButton, config);
						}
					}
				);
				makeSticky();
				window.onscroll = () => {
					makeSticky();
				};
			}
		});
	}
};
