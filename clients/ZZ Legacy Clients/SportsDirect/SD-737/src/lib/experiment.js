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
import scrollDepth from "./scrollDepth";
// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

const startExperiment = () => {
	pollerLite(
		["#aAddToBag", "#lblProductName", "#HeaderGroup", ".pdpPriceRating"],
		() => {
			if (document.getElementById("aPrePersAddToBag")) {
				fireEvent(
					`Interaction - page is personalised product so experiment not fired`,
					true
				);
				return;
			}

			document.documentElement.classList.add(`${ID}-active`);

			// const nonBuyAble = document.querySelector("#NonBuyableOverlay");
			// nonBuyAble?.classList.add("NonBuyableOverlayOutOfStock");
			const sizeTextElm = document.querySelector("#divSize #BuySizeText");
			const sizeText = sizeTextElm ? sizeTextElm.innerText : "Size";
			const config = { attributes: true, childList: true, subtree: true };
			let atbButton =
				document.querySelector(
					"#spanAddToBagWrapper #aPrePersAddToBag"
				) || document.querySelector("#sAddToBagWrapper #aAddToBag");
			let isOneColored = !document.querySelector("ul#ulColourImages");
			let isOneSized = false;
			const ulSizes = document.querySelector("ul#ulSizes");
			if (ulSizes) {
				const sizes = ulSizes.querySelectorAll("li.sizeButtonli");
				isOneSized = sizes.length > 1 ? false : true;
			}
			let atbInner;
			if (atbButton?.querySelector("span.addToBagInner")) {
				atbInner = atbButton?.querySelector("span.addToBagInner");
			} else {
				atbInner = atbButton;
			}
			let initialTitle = "Add to bag";
			let fakeCtaClass = "",
				fakeCtaTitle;
			const atbText = atbInner?.innerText.trim();
			const nonBuyAble = document.querySelector("#NonBuyableOverlay");
			const isNonBuyAble =
				nonBuyAble?.classList.contains("NonBuyableOverlayOutOfStock") ||
				nonBuyAble?.classList.contains("NonBuyableOverlayVisible");
			if (isNonBuyAble) {
				atbInner.innerText = "Out of stock";
				fakeCtaClass = "Out-of-stock";
				fakeCtaTitle = "Out of stock";
			} else if (!isOneSized && atbInner) {
				atbInner.innerText = "Select a size";
				fakeCtaClass = "single-sized";
				fakeCtaTitle = "Select a size";
				atbButton.classList.add("single-sized");
			} else {
				fakeCtaTitle = atbText;
			}

			let prodImageSrc;
			if (
				isOneColored &&
				document.querySelector("#productRollOverPanel img#imgProduct")
			) {
				prodImageSrc = document.querySelector(
					"#productRollOverPanel img#imgProduct"
				)?.src;
			} else if (
				document.querySelector(
					".tooltip.colorImgli.variantHighlight > a > img"
				)
			) {
				prodImageSrc = document.querySelector(
					".tooltip.colorImgli.variantHighlight > a > img"
				)?.src;
			} else {
				prodImageSrc = document.querySelector(
					"#zoomMainImage_1 img"
				)?.src;
			}
			let prodTitle = document.getElementById(`lblProductName`).innerText;
			let priceHTML = document.querySelector(".pdpPriceRating").innerHTML;
			let stickyBarHTML = `
				<div class=${ID}-sticky-atb-wrapper>
					<div class="${ID}-sticky-atb">
						<div class="${ID}-sticky-atb-product-img">
						<img id="${ID}-sticky-atb-product-img" src="${prodImageSrc}" alt="${prodTitle}" />
						</div>
						<div class="${ID}-sticky-atb--info">
						<div class="${ID}-sticky-atb--title">
							<p>${prodTitle}</p>
						</div>
						<div class="${ID}-sticky-atb--pricesection">
							${priceHTML}
						</div>
						</div>
						<div class="${ID}-sticky-atb--buysection">
						<button class="${ID}-sticky-atb--buybutton ${fakeCtaClass}">
							${fakeCtaTitle}
						</button>
						</div>      
					</div>
				</div>
				`;
			let insertionPoint = document.querySelector(
				`.mp-scroller-inner .HeaderTopSpacer`
			);

			insertionPoint.insertAdjacentHTML("afterend", stickyBarHTML);
			var isClickedFromFakeCta = false;
			document
				.querySelector(`.${ID}-sticky-atb--buybutton`)
				?.addEventListener("click", (e) => {
					fireEvent("Clicks on scrollable header ATB CTA");

					scrollDepth(fireEvent);
					isClickedFromFakeCta = true;

					const continueAdding = document.querySelector(
						"#spanAddToBagWrapper a.ContinueWithPers:not(.hidden)"
					);
					if (continueAdding) {
						continueAdding.click();
						sizeTextElm.classList.remove("sizeerror");
					} else {
						atbButton.click();
					}
				});
			document
				.querySelector(
					"#pnlPersonaliseSpace .personalisationTitlePanel"
				)
				?.addEventListener("click", (e) => {
					if (
						atbInner.innerText.trim().toLowerCase() ===
						"select a size"
					) {
						document
							.querySelector("#productDetails")
							?.scrollIntoView({
								behavior: "smooth",
							});
					}
				});
			document
				.querySelector(
					"#pnlPersonaliseSpace .personalisationTitlePanel #lblPersonalisationTitleText"
				)
				?.addEventListener("click", (e) => {
					if (
						atbInner.innerText.trim().toLowerCase() ===
						"select a size"
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
					fireEvent("Clicks on original ATB CTA");
				}
				if (
					atbInner.innerText.trim().toLowerCase() === "select a size"
				) {
					fireEvent("User clicks on disabled CTA");
					document.querySelector("#productDetails")?.scrollIntoView({
						behavior: "smooth",
					});
				}
				isClickedFromFakeCta = false;
			});
			if (!isOneSized) {
				const atbObserver = new MutationObserver(
					(mutationsList, observer) => {
						atbObserver.disconnect();
						const divPersaddToBasketContainer =
							document.querySelector(
								"#divPersaddToBasketContainer a.ContinueWithPers:not(.hidden)"
							);
						if (!divPersaddToBasketContainer) {
							const checkIfSelected = ulSizes.querySelector(
								"li.sizeVariantHighlight"
							);
							if (
								!checkIfSelected &&
								atbInner.innerText.trim().toLowerCase() !==
									"select a size"
							) {
								atbInner.innerText = "select a size";
							} else if (checkIfSelected) {
								atbButton.classList.remove("single-sized");
								document
									.querySelector(
										`.${ID}-sticky-atb--buybutton`
									)
									.classList.remove("single-sized");
								document.querySelector(
									`.${ID}-sticky-atb--buybutton`
								).innerText = atbInner.innerText.trim();
							}
							if (checkIfSelected) {
								atbObserver.disconnect();
							} else {
								atbObserver.observe(atbButton, config);
							}
						} else {
							atbObserver.observe(atbButton, config);
						}
					}
				);
				atbObserver.observe(atbButton, config);
				const allSizesObserver = new MutationObserver(
					(mutationsList, observer) => {
						allSizesObserver.disconnect();
						const divPersaddToBasketContainer =
							document.querySelector(
								"#divPersaddToBasketContainer a.ContinueWithPers:not(.hidden)"
							);
						if (!divPersaddToBasketContainer) {
							const checkIfSelected = ulSizes.querySelector(
								"li.sizeVariantHighlight"
							);
							if (checkIfSelected) {
								atbInner.innerText = initialTitle;
								const popover = document.querySelector(
									"#ProductStandardAddToBag .popover.SelectSizePopover"
								);
								if (popover) {
									popover.remove();
								}
								sizeTextElm.innerText = sizeText;
								sizeTextElm.classList.remove("sizeerror");
							} else {
								atbInner.innerText = "select a size";
								atbButton.classList.add("single-sized");
								document
									.querySelector(
										`.${ID}-sticky-atb--buybutton`
									)
									.classList.add("single-sized");
								document.querySelector(
									`.${ID}-sticky-atb--buybutton`
								).innerText = "select a size";
								atbObserver.observe(atbButton, config);
							}
						}
						allSizesObserver.observe(ulSizes, config);
					}
				);
				allSizesObserver.observe(ulSizes, config);

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
			}
			if (!isOneColored) {
				const allColors = document.querySelector("ul#ulColourImages");
				if (allColors) {
					const allColorsObserver = new MutationObserver(
						(mutationsList, observer) => {
							allColorsObserver.disconnect();
							const imageSrc = document.querySelector(
								"li.tooltip.colorImgli.variantHighlight > a > img"
							)?.src;
							if (imageSrc) {
								document.querySelector(
									`img#${ID}-sticky-atb-product-img`
								).src = imageSrc;
							}
							allColorsObserver.observe(allColors, config);
						}
					);
					allColorsObserver.observe(allColors, config);
				}
			}
			if (shared.VARIATION == 1) {
				window.onscroll = () => {
					const mainAtbButton = document.querySelector(
						"#sAddToBagWrapper a#aAddToBag"
					);
					const fakeButton = document.querySelector(
						`.${ID}-sticky-atb`
					);
					let topOff = mainAtbButton?.getBoundingClientRect().bottom;
					let compareOff;
					if (window.innerWidth > 767.98) {
						compareOff = 130;
					} else {
						compareOff = 113;
					}
					if (
						document
							.querySelector(`.${ID}-sticky-atb-wrapper`)
							?.classList.contains(`${ID}-show-sticky-bar`)
					) {
						if (topOff >= compareOff) {
							document
								.querySelector(`.${ID}-sticky-atb-wrapper`)
								?.classList.remove(`${ID}-show-sticky-bar`);
						}
					} else {
						if (topOff <= compareOff) {
							document
								.querySelector(`.${ID}-sticky-atb-wrapper`)
								?.classList.add(`${ID}-show-sticky-bar`);
						}
					}
				};
			}
		}
	);
};

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
		pollerLite(
			[
				"#aAddToBag",
				"#lblProductName",
				"#HeaderGroup",
				".pdpPriceRating",
			],
			() => {
				const atbButton = document.querySelector(
					"#sAddToBagWrapper #aAddToBag"
				);
				let isOneSized = false;
				const ulSizes = document.querySelector("ul#ulSizes");
				if (ulSizes) {
					const sizes = ulSizes.querySelectorAll("li.sizeButtonli");
					isOneSized = sizes.length > 1 ? false : true;
				}

				atbButton.addEventListener("click", (e) => {
					fireEvent("Clicks on original ATB CTA");
					const checkIfSelected = ulSizes.querySelector(
						"li.sizeVariantHighlight"
					);
					if (!isOneSized && !checkIfSelected) {
						fireEvent("User clicks on disabled CTA");
					}
				});
			}
		);
		return;
	}

	// Write experiment code here
	// ...

	startExperiment();
};
