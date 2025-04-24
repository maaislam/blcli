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
	const config = {
		attributes: true,
		childList: true,
		subtree: true,
	};

	pollerLite(["#productDetails", "#aAddToBag"], () => {
		let atbButton = document.getElementById("aAddToBag");

		atbButton.addEventListener("click", (e) => {
			let sizeSelected = $("#hdnSelectedSizeName").val() !== "";
			if (sizeSelected) {
				fireEvent("Click - User adds product to Bag");
			}
		});
	});
	pollerLite(
		[
			() => {
				return window.productImageCarousel ? true : false;
			},
		],
		() => {
			let alreadyregistered = [];
			window.productImageCarousel
				.getSwiperElement()
				.swiperInstance.on("slideChange", function () {
					fireEvent(`Interaction - User scrolls the images`);
				});

			alreadyregistered.push(
				$("span.ProductDetailsVariants").attr("data-selectedcolour")
			);

			const ddlColours = document.querySelector(
				"#ddlColours span#spanDropdownSelectedText"
			);

			if (ddlColours) {
				const colorOptions = document.querySelectorAll(
					"#ddlColours li.image-dropdown-option"
				);
				if (colorOptions.length > 0) {
					colorOptions.forEach((item) => {
						item.addEventListener("click", () => {
							fireEvent(`Interaction - User selects a colour`);
						});
					});

					const colorObserver = new MutationObserver(
						(mutationList, observer) => {
							fireColorChangeEvent(
								`${$("span.ProductDetailsVariants").attr(
									"data-selectedcolour"
								)}`
							);
						}
					);
					colorObserver.observe(ddlColours, config);
				}
			}

			function fireColorChangeEvent(colVarId) {
				let isDeclared = alreadyregistered.includes(colVarId);
				if (!isDeclared) {
					alreadyregistered.push(colVarId);
					let currentCarousel;
					if (colVarId) {
						currentCarousel =
							window.productImageCarousel.getSwiperElement(
								colVarId
							);
					} else {
						currentCarousel =
							window.productImageCarousel.getSwiperElement()
								.swiperInstance;
					}
					if (currentCarousel) {
						currentCarousel.on("slideChange", function () {
							fireEvent(`Interaction - User scrolls the images`);
						});
					}
				}
			}

			const isOneSized =
				document
					.querySelector("#hdnSelectedSizeName")
					.value.toLowerCase() == "One Size".toLowerCase();

			if (!isOneSized) {
				const allSizes = document.querySelectorAll(
					"#ddlSizes ul.dropdown-menu li"
				);

				if (allSizes.length > 0) {
					allSizes.forEach((size) => {
						size.querySelector("a").addEventListener(
							"click",
							(e) => {
								fireEvent(`Interaction - User selects a size`);
							}
						);
					});
				}
			}
		}
	);
	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		pollerLite(["#productDetails", "#aAddToBag"], () => {
			let isFired = false;
			window.addEventListener("scroll", function (e) {
				if (!isFired) {
					const mainAtbButton = document.querySelector(
						"#sAddToBagWrapper a#aAddToBag"
					);
					let topOff = mainAtbButton?.getBoundingClientRect().bottom;
					let compareOff;
					if (window.innerWidth > 767.98) {
						compareOff = 130;
					} else {
						compareOff = 0;
					}
					if (topOff <= compareOff) {
						fireEvent("User would have seen the Sticky ATB");
						isFired = true;
					}
				}
			});
		});
		return;
	}

	// Write experiment code here
	// ...

	const PersonalisationOFSizeAndColour = () => {
		const resetTheActiveSizes = (allSizes, selectedSize) => {
			if (allSizes.length > 0) {
				for (let index = 0; index < allSizes.length; index++) {
					if (
						allSizes[index].getAttribute("data-value").trim() ==
							selectedSize &&
						!allSizes[index]
							.querySelector("a")
							.classList.contains("greyOut")
					) {
						allSizes[index].classList.add("selected");
					} else {
						allSizes[index].classList.remove("selected");
					}
				}
			}
		};
		const resetTheActiveColours = (allColours, selectedColour) => {
			for (let index = 0; index < allColours.length; index++) {
				if (
					allColours[index].getAttribute("data-text").trim() ==
					selectedColour.textContent.trim()
				) {
					allColours[index].classList.add("selected");
				} else {
					allColours[index].classList.remove("selected");
				}
			}
		};

		const resetTheGreyOutColours = (allColours, selectedSizeName) => {
			const colVariants = productDetailsShared.getColourVariants();
			const colVarsWithoutTheSize = [];
			for (let k = 0; k < colVariants.length; k++) {
				const sizeVar = colVariants[k].SizeVariants;
				let isVarFound = false;
				for (let index = 0; index < sizeVar.length; index++) {
					if (sizeVar[index].SizeName === selectedSizeName) {
						isVarFound = true;
						break;
					}
				}
				if (!isVarFound) {
					colVarsWithoutTheSize.push(colVariants[k].ColVarId);
				}
			}
			for (let index = 0; index < allColours.length; index++) {
				let isFound = false;
				let itemToRemove = -1;

				if (colVarsWithoutTheSize.length > 0) {
					for (let j = 0; j < colVarsWithoutTheSize.length; j++) {
						if (
							colVarsWithoutTheSize[j] ===
							allColours[index].getAttribute("data-value")
						) {
							isFound = true;
							itemToRemove = j;
							break;
						}
					}
				} else {
					isFound = false;
				}
				if (isFound) {
					allColours[index].classList.add("greyOut");
					colVarsWithoutTheSize.splice(itemToRemove, 1);
				} else {
					allColours[index].classList.remove("greyOut");
				}
			}
		};
		const trackChange = function (element) {
			const allSizes = document.querySelectorAll(
				"#ddlSizes ul.dropdown-menu li"
			);
			var observer = new MutationObserver(function (mutations, observer) {
				if (mutations[0].attributeName == "value") {
					resetTheActiveSizes(allSizes, element.value);
				}
			});
			observer.observe(element, {
				attributes: true,
			});
		};

		pollerLite(["#spanDropdownSelectedText"], () => {
			let isShadeSwitch = false;
			if (
				document.querySelector("#divColour") &&
				document.querySelector("#divColourImages")
			) {
				document.querySelector("#divColourImages").style.display =
					"none";
			}
			if (document.body.classList.contains("shadeSwitch")) {
				isShadeSwitch = true;
				document.querySelector(
					"#divColour #BuyColourText"
				).textContent = "Shade";
			}

			const isSingleColour =
				document.querySelector(
					"span.product-detail__variants-singular"
				) ||
				!document.querySelector(
					"#divColourImageDropdownGroup #ddlColours"
				);
			const selectedColour = document.querySelector(
				"#btnImageDropdown #spanDropdownSelectedText"
			);
			const colorTextDom = `<div id="${ID}-divColour-inner" class="colourChooser-inner">
				<span id="BuyColourText">${isShadeSwitch ? `Shade` : "Colour"}</span>
				<span id="colourName" class="colourText">
					${
						isSingleColour
							? document
									.querySelector(
										"span.product-detail__variants-singular"
									)
									.textContent.trim()
							: selectedColour.textContent.trim()
					}
				</span>
			</div>`;

			// Add colour text to the DOM
			$("#divColour").prepend(colorTextDom);

			if (!isSingleColour) {
				const allColours = document.querySelectorAll(
					"#divColourImageDropdownGroup #ddlColours ul li"
				);
				if (allColours.length > 0) {
					for (let index = 0; index < allColours.length; index++) {
						if (
							allColours[index]
								.getAttribute("data-text")
								.trim() == selectedColour.textContent.trim()
						) {
							allColours[index].classList.add("selected");
							break;
						}
					}
					allColours.forEach((colour) => {
						colour
							.querySelector("a")
							.addEventListener("click", (e) => {
								// Remove all selected classes
								allColours.forEach((colour) => {
									colour.classList.remove("selected");
								});
								// Add selected class to the clicked colour
								colour.classList.add("selected");

								// Update colour text
								document.querySelector(
									"#colourName"
								).textContent = colour
									.getAttribute("data-text")
									.trim();

								setTimeout(() => {
									if ($("#hdnSelectedSizeName").val() == "") {
										allColours.forEach((colour) => {
											colour.classList.remove("greyOut");
										});
									}
									resetTheActiveSizes(
										document.querySelectorAll(
											"#ddlSizes ul.dropdown-menu li"
										),
										$("#hdnSelectedSizeName").val()
									);
								}, 200);
							});
					});
				}
			}

			const isOneSized =
				document
					.querySelector("#hdnSelectedSizeName")
					.value.toLowerCase() == "One Size".toLowerCase();

			if (!isOneSized) {
				const allSizes = document.querySelectorAll(
					"#ddlSizes ul.dropdown-menu li"
				);
				const selectedSize = document.querySelector(
					"#btnNoImageDropdown #spanDropdownSelectedText"
				);
				if (allSizes.length > 0) {
					trackChange(document.querySelector("#hdnSelectedSizeName"));
					for (let index = 0; index < allSizes.length; index++) {
						if (
							allSizes[index].getAttribute("data-value").trim() ==
							selectedSize.textContent.trim()
						) {
							allSizes[index].classList.add("selected");
							break;
						}
					}
					allSizes.forEach((size) => {
						// $(size).off("click");
						size.querySelector("a").addEventListener(
							"click",
							(e) => {
								// Remove all selected classes
								allSizes.forEach((size) => {
									size.classList.remove("selected");
								});
								// Add selected class to the clicked colour
								size.classList.add("selected");

								setTimeout(() => {
									resetTheActiveColours(
										document.querySelectorAll(
											"#divColourImageDropdownGroup #ddlColours ul li"
										),
										document.querySelector(
											"#btnImageDropdown #spanDropdownSelectedText"
										)
									);
								}, 500);
								setTimeout(() => {
									resetTheGreyOutColours(
										document.querySelectorAll(
											"#divColourImageDropdownGroup #ddlColours ul li"
										),
										size.getAttribute("data-value").trim()
									);
								}, 200);
							}
						);
					});
				}
			}
		});
	};

	const RenderStickyATB = () => {
		pollerLite(
			[
				"#aAddToBag",
				"#lblProductName",
				"#HeaderGroup",
				".product-detail__price",
			],
			() => {
				if (document.getElementById("aPrePersAddToBag")) {
					fireEvent(
						`Interaction - page is personalised product so experiment not fired`,
						true
					);
					return;
				}

				document.documentElement.classList.add(`${ID}-active`);
				const sizeTextElm = document.querySelector(
					"#divSize #BuySizeText"
				);
				const sizeText = sizeTextElm ? sizeTextElm.innerText : "Size";
				const config = {
					attributes: true,
					childList: true,
					subtree: true,
				};
				let atbButton =
					document.querySelector(
						"#spanAddToBagWrapper #aPrePersAddToBag"
					) || document.querySelector("#sAddToBagWrapper #aAddToBag");
				let isOneColored =
					document.querySelector(
						"span.product-detail__variants-singular"
					) ||
					!document.querySelector(
						"#divColourImageDropdownGroup #ddlColours"
					);
				let isOneSized = false;
				const ulSizes = document.querySelector(
					"#ddlSizes ul.dropdown-menu"
				);
				if (ulSizes) {
					const sizes = ulSizes.querySelectorAll("li");
					isOneSized = sizes.length > 1 ? false : true;
				}
				let atbInner;
				if (atbButton?.querySelector("span.addToBagInner")) {
					atbInner = atbButton?.querySelector("span.addToBagInner");
				} else {
					atbInner = atbButton;
				}
				let initialTitle = atbInner?.innerText.trim();
				let fakeCtaClass = "",
					fakeCtaTitle;
				const atbText = atbInner?.innerText.trim();
				const nonBuyAble = document.querySelector("#NonBuyableOverlay");
				const isNonBuyAble =
					nonBuyAble?.classList.contains(
						"NonBuyableOverlayOutOfStock"
					) ||
					nonBuyAble?.classList.contains("NonBuyableOverlayVisible");
				if (isNonBuyAble) {
					atbInner.innerText = "Out of stock";
					fakeCtaClass = "Out-of-stock";
					fakeCtaTitle = "Out of stock";
				} else if (!isOneSized && atbInner) {
					atbInner.innerText = "Select size";
					fakeCtaClass = "single-sized";
					fakeCtaTitle = "Select size";
					atbButton.classList.add("single-sized");
				} else {
					fakeCtaTitle = atbText;
				}

				let prodImageSrc;
				if (
					isOneColored &&
					document.querySelector(
						".productRollOverPanel .swiper-container.swiper-initialized img"
					)
				) {
					let currentCarousel;
					if (
						$("span.ProductDetailsVariants").attr(
							"data-selectedcolour"
						)
					) {
						currentCarousel =
							window.productImageCarousel.getSwiperElement(
								$("span.ProductDetailsVariants").attr(
									"data-selectedcolour"
								)
							);
					} else {
						currentCarousel =
							window.productImageCarousel.getSwiperElement()
								.swiperInstance;
					}
					if (currentCarousel) {
						prodImageSrc =
							currentCarousel.slides[
								currentCarousel.activeIndex
							].querySelector("img")?.src;
					}
				} else if (
					document.querySelector(
						`#ddlColours ul li[data-value='${$(
							"span.ProductDetailsVariants"
						).attr("data-selectedcolour")}'] a img`
					)
				) {
					prodImageSrc = document.querySelector(
						`#ddlColours ul li[data-value='${$(
							"span.ProductDetailsVariants"
						).attr("data-selectedcolour")}'] a img`
					)?.src;
				} else {
					let currentCarousel;
					if (
						$("span.ProductDetailsVariants").attr(
							"data-selectedcolour"
						)
					) {
						currentCarousel =
							window.productImageCarousel.getSwiperElement(
								$("span.ProductDetailsVariants").attr(
									"data-selectedcolour"
								)
							);
					} else {
						currentCarousel =
							window.productImageCarousel.getSwiperElement()
								.swiperInstance;
					}
					if (currentCarousel) {
						prodImageSrc =
							currentCarousel.slides[
								currentCarousel.activeIndex
							].querySelector("img")?.src;
					}
				}
				let prodTitle =
					document.getElementById(`lblProductName`).innerText;
				let priceHTML = document.querySelector(
					".product-detail__price"
				).innerHTML;
				let stickyBarHTML = `
					<div class=${ID}-sticky-atb-wrapper>
						<div class="${ID}-sticky-atb">
							<div class="${ID}-sticky-atb-product-img">
							<img id="${ID}-sticky-atb-product-img" src="${prodImageSrc}" alt="${prodTitle}" />
							</div>
							<div class="${ID}-sticky-atb--info">
								<div class="${ID}-sticky-atb--title">
									<p>${prodTitle}</p>
									<div class="${ID}-sticky-atb--pricesection">
										${priceHTML}
									</div>
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

				document
					.querySelector(`.${ID}-sticky-atb--buybutton`)
					?.addEventListener("click", (e) => {
						const continueAdding = document.querySelector(
							"#spanAddToBagWrapper a.ContinueWithPers:not(.hidden)"
						);

						if (continueAdding) {
							continueAdding.click();
							sizeTextElm.classList.remove("sizeerror");
							fireEvent("Click - clicks the sticky add to bag");
						} else {
							atbButton.click();
							fireEvent("Click - clicks the sticky add to bag");
						}
					});
				document
					.querySelector(
						"#pnlPersonaliseSpace .personalisationTitlePanel"
					)
					?.addEventListener("click", (e) => {
						if (
							atbInner.innerText.trim().toLowerCase() ===
							"select size"
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
							"select size"
						) {
							document
								.querySelector("#productDetails")
								?.scrollIntoView({
									behavior: "smooth",
								});
						}
					});
				atbButton.addEventListener("click", (e) => {
					if (
						atbInner.innerText.trim().toLowerCase() ===
						"select size"
					) {
						document
							.querySelector("#productDetails")
							?.scrollIntoView({
								behavior: "smooth",
							});
					}
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
								const checkIfSelected =
									$("#hdnSelectedSizeName").val() !== "";
								if (
									!checkIfSelected &&
									atbInner.innerText.trim().toLowerCase() !==
										"select size"
								) {
									atbInner.innerText = "select size";
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
							//allSizesObserver.disconnect();
							setTimeout(() => {
								const divPersaddToBasketContainer =
									document.querySelector(
										"#divPersaddToBasketContainer a.ContinueWithPers:not(.hidden)"
									);
								if (!divPersaddToBasketContainer) {
									const checkIfSelected =
										$("#hdnSelectedSizeName").val() !== "";
									if (checkIfSelected) {
										atbInner.innerText = initialTitle;
										const popover = document.querySelector(
											"#ProductStandardAddToBag .popover.SelectSizePopover"
										);
										if (popover) {
											popover.remove();
										}
										sizeTextElm.innerText = sizeText;
										sizeTextElm.classList.remove(
											"sizeerror"
										);
									} else {
										atbInner.innerText = "select size";
										atbButton.classList.add("single-sized");
										document
											.querySelector(
												`.${ID}-sticky-atb--buybutton`
											)
											.classList.add("single-sized");
										document.querySelector(
											`.${ID}-sticky-atb--buybutton`
										).innerText = "select size";
										atbObserver.observe(atbButton, config);
									}
								}
							}, 200);
							//allSizesObserver.observe(sizeTextDomStore, config);
						}
					);
					const sizeTextDomStore = document.querySelector(
						"#divSize #btnNoImageDropdown #spanDropdownSelectedText"
					);
					allSizesObserver.observe(sizeTextDomStore, config);

					const priceContainer = document.querySelector(
						".product-detail__price"
					);
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
					const allColors = document.querySelector(
						"#divColour #divColourImageDropdownGroup ul"
					);
					if (allColors) {
						const allColorsObserver = new MutationObserver(
							(mutationsList, observer) => {
								// allColorsObserver.disconnect();
								setTimeout(() => {
									let currentCarousel;
									let imageSrc;
									if (
										$("span.ProductDetailsVariants").attr(
											"data-selectedcolour"
										)
									) {
										currentCarousel =
											window.productImageCarousel.getSwiperElement(
												$(
													"span.ProductDetailsVariants"
												).attr("data-selectedcolour")
											);
									} else {
										currentCarousel =
											window.productImageCarousel.getSwiperElement()
												.swiperInstance;
									}
									if (currentCarousel) {
										imageSrc =
											currentCarousel.slides[
												currentCarousel.activeIndex
											].querySelector("img")?.src;
									}

									if (imageSrc) {
										document.querySelector(
											`img#${ID}-sticky-atb-product-img`
										).src = imageSrc;
									}

									if ($("#hdnSelectedSizeName").val() == "") {
										document.querySelector(
											"#divSize #btnNoImageDropdown #spanDropdownSelectedText"
										).innerText = "Select size";
									}
								}, 200);
								// allColorsObserver.observe(allColors, config);
							}
						);
						allColorsObserver.observe(allColors, config);
					}
				}
				window.addEventListener("scroll", function (e) {
					const mainAtbButton = document.querySelector(
						"#sAddToBagWrapper a#aAddToBag"
					);
					const fakeButton = document.querySelector(
						`.${ID}-sticky-atb`
					);

					let topOff = mainAtbButton?.getBoundingClientRect().bottom;

					let compareOff;
					if (window.innerWidth > 1023.98) {
						compareOff = 130;
					} else {
						compareOff = 0;
					}
					if (
						document
							.querySelector(`.${ID}-sticky-atb-wrapper`)
							?.classList.contains(`${ID}-show-sticky-bar`)
					) {
						if (window.innerWidth < 1023.98) {
							compareOff = 155;
							if (topOff >= compareOff) {
								document
									.querySelector(`.${ID}-sticky-atb-wrapper`)
									?.classList.remove(`${ID}-show-sticky-bar`);
							}
						} else {
							if (topOff >= compareOff) {
								document
									.querySelector(`.${ID}-sticky-atb-wrapper`)
									?.classList.remove(`${ID}-show-sticky-bar`);
							}
						}
					} else {
						if (topOff <= compareOff) {
							document
								.querySelector(`.${ID}-sticky-atb-wrapper`)
								?.classList.add(`${ID}-show-sticky-bar`);
						}
					}
				});
			}
		);
	};

	if (VARIATION == "1" || VARIATION == "3") {
		// ...
		PersonalisationOFSizeAndColour();
		if (VARIATION == "1") {
			pollerLite(["#productDetails", "#aAddToBag"], () => {
				let isFired = false;
				window.addEventListener("scroll", function (e) {
					if (!isFired) {
						const mainAtbButton = document.querySelector(
							"#sAddToBagWrapper a#aAddToBag"
						);
						let topOff =
							mainAtbButton?.getBoundingClientRect().bottom;
						let compareOff;
						if (window.innerWidth > 767.98) {
							compareOff = 130;
						} else {
							compareOff = 0;
						}
						if (topOff <= compareOff) {
							fireEvent("User would have seen the Sticky ATB");
							isFired = true;
						}
					}
				});
			});
		}
	}
	if (VARIATION == "2" || VARIATION == "3") {
		RenderStickyATB();
	}
};
