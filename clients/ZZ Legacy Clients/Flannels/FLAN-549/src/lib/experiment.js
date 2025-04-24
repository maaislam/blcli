/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import {
	events,
	pollerLite,
	observer,
	logMessage,
} from "../../../../../lib/utils";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;
var mySwiper, firstRun;

const initiateSlider = (colvarId, direction) => {
	// Run slick
	let slider = document.querySelector(`#${ID}-carousel-${colvarId}`);
	slider.classList.add("swiper-active");

	mySwiper = new Swiper(slider, {
		// Optional parameters
		init: false,
		loop: true,
		// If we need pagination
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 0,
		// Disable preloading of all images
		preloadImages: true,
		// Enable lazy loading
		lazy: false,
		// Responsive breakpoints
		navigation: {
			nextEl: `#${ID}-real-arrow-${colvarId}-right`,
			prevEl: `#${ID}-real-arrow-${colvarId}-left`,
		},
		pagination: false,
	});

	let nextEl = document.getElementById(`${ID}-real-arrow-${colvarId}-right`);
	let prevEl = document.getElementById(`${ID}-real-arrow-${colvarId}-left`);

	nextEl.addEventListener("click", (e) => {
		fireEvent(
			`Click - next carousel arrow clicked on #${ID}-carousel-${colvarId}`,
			true
		);
	});

	prevEl.addEventListener("click", (e) => {
		fireEvent(
			`Click - prev carousel arrow clicked on #${ID}-carousel-${colvarId}`,
			true
		);
	});

	// Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel

	// setTimeout(function () {
	mySwiper.init();

	if (direction == "left") {
		mySwiper.slidePrev();
	} else {
		mySwiper.slideNext();
	}
	// }, 300);

	setTimeout(function () {
		document
			.querySelector(`.${ID}-carousel-holder`)
			?.classList.remove("loading");
	}, 600);

	return mySwiper;
};

const loadCarouselImages = (item, direction) => {
	item.querySelector(".ProductImageList")?.classList.add(`${ID}-loading`);

	let itemHref = "https://www.flannels.com" + item.getAttribute("li-url");
	let currColvarId = item.getAttribute("li-productid");

	const request = new XMLHttpRequest();
	request.open("GET", itemHref, true);

	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {
			// Success!

			const data = request.responseText;
			// const sizeVariantId = request.responseURL;
			if (data) {
				let pdp = document.createElement("div");

				pdp.classList.add("hidden");
				pdp.id = "no-visual";
				pdp.innerHTML = data;

				let allImages = JSON.parse(
					pdp
						.querySelector(".ProductDetailsVariants")
						.getAttribute("data-variants")
				);
				let productImages = [];

				if (allImages.length == 1) {
					productImages = Object.values(
						allImages[0].ProdImages.AlternateImages
					);
				} else {
					let detailArray = Object.values(allImages);

					detailArray = detailArray.filter((item) => {
						if (item.ColVarId == currColvarId) {
							return true;
						} else {
							return false;
						}
					});

					productImages = detailArray[0].ProdImages.AlternateImages;
				}

				if (productImages.length == 1) {
					item.querySelector(".ProductImageList")?.classList.add(
						`${ID}-no-images`
					);
					setTimeout(() => {
						item.querySelector(
							".ProductImageList"
						).classList.remove(`${ID}-loading`);
						item.querySelector(
							".ProductImageList"
						).classList.remove(`${ID}-no-images`);
						let itemFakeArrows = item.querySelectorAll(
							`.${ID}-fake-arrow`
						);
						[].slice.call(itemFakeArrows).forEach((arrow) => {
							arrow.remove();
						});
					}, 800);
					return;
				}

				productImages = productImages.slice(0, 3);

				let carouselHTML = `
        
          <div id="${ID}-carousel-${currColvarId}" class="${ID}-images-carousel swiper-container">
            <div class="swiper-wrapper">
            
              ${productImages
					.map((image) => {
						return `<a href="${itemHref}" class="swiper-slide"><img src="${image.ImgUrlLarge}" alt="${image.AltText}" /></a>`;
					})
					.join("")}
            
            </div>

            <button class="${ID}-real-arrow left" id="${ID}-real-arrow-${currColvarId}-left"><svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 1.75006L2.5 8.31256L10 14.8751" stroke="black" stroke-width="2" stroke-linecap="round"/></svg></button>

            <button class="${ID}-real-arrow right" id="${ID}-real-arrow-${currColvarId}-right"><svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 1.75L9 8.3125L1.5 14.875" stroke="black" stroke-width="2" stroke-linecap="round"/></svg></button>

          </div>
        
        
        `;

				item.querySelector(".ProductImageList").insertAdjacentHTML(
					"beforebegin",
					carouselHTML
				);
				item.querySelector(".ProductImageList").remove();
				item.querySelector(`.${ID}-fake-arrow.left`).remove();
				item.querySelector(`.${ID}-fake-arrow.right`).remove();
				fireEvent(
					"Interaction - user has requested to see additional images on item: " +
						itemHref +
						" with colvarID: " +
						currColvarId +
						" by hovering on the item and the secondary images were loaded into the carousel",
					true
				);
				const s = initiateSlider(currColvarId, direction);
				if (s) {
					var status = false;
					document.addEventListener("mouseover", (e) => {
						if (
							e.target.closest(
								`li[li-productid="${currColvarId}"]`
							) &&
							status
						) {
							s.slideNext();
							status = false;
						} else if (
							!e.target.closest(
								`li[li-productid="${currColvarId}"]`
							)
						) {
							status = true;
						}
					});
				}
			}
		} else {
			// We reached our target server, but it returned an error
			fireEvent(
				"Interaction - failed to retrieve images from product page",
				true
			);
		}
	};

	request.onerror = function () {
		// There was a connection error of some sort
	};

	request.send();
};

const processSwitchImage = (item) => {
	let itemHref = "https://www.flannels.com" + item.getAttribute("li-url");
	let currColvarId = item.getAttribute("li-productid");

	const request = new XMLHttpRequest();
	request.open("GET", itemHref, true);

	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {
			// Success!

			const data = request.responseText;
			// const sizeVariantId = request.responseURL;
			if (data) {
				let pdp = document.createElement("div");

				pdp.classList.add("hidden");
				pdp.id = "no-visual";
				pdp.innerHTML = data;

				let allImages = JSON.parse(
					pdp
						.querySelector(".ProductDetailsVariants")
						.getAttribute("data-variants")
				);

				let productImages = [];

				if (allImages.length == 1) {
					productImages = Object.values(
						allImages[0].ProdImages.AlternateImages
					);
				} else {
					let detailArray = Object.values(allImages);

					detailArray = detailArray.filter((item) => {
						if (item.ColVarId == currColvarId) {
							return true;
						} else {
							return false;
						}
					});

					productImages = detailArray[0].ProdImages.AlternateImages;
				}

				if (typeof productImages[1] === "undefined") {
					fireEvent(
						"Interaction - no secondary image available",
						true
					);
					return;
				}

				if (item.querySelector(`.${ID}-switch-div`)) {
					return;
				}

				let switchImageHTML = `
        
          <div id="${ID}-switch-div-${currColvarId}" class="${ID}-switch-div">
          
            <img src="${productImages[1].ImgUrlLarge}" alt="${productImages[1].ImgUrlLarge}" />
          
          </div>
        
        `;

				item.querySelector(".ProductImageList").insertAdjacentHTML(
					"beforeend",
					switchImageHTML
				);

				pollerLite(
					[
						`#${ID}-switch-div-${currColvarId}`,
						() => {
							let switchDivImage = document.querySelector(
								`#${ID}-switch-div-${currColvarId} img`
							);
							if (
								switchDivImage.complete &&
								switchDivImage.naturalHeight !== 0
							) {
								return true;
							}
						},
					],
					() => {
						item.classList.add(`${ID}-switch-div-active`);
						fireEvent(
							"Interaction - user has hovered on item: " +
								itemHref +
								" with colvarID: " +
								currColvarId +
								" and the secondary image was loaded",
							true
						);
					}
				);
			}
		} else {
			// We reached our target server, but it returned an error
			fireEvent(
				"Interaction - failed to retrieve secondary image from product page",
				true
			);
		}
	};

	request.onerror = function () {
		// There was a connection error of some sort
	};

	request.send();
};

const startExperiment = () => {
	firstRun = false;

	if (VARIATION == 1) {
		pollerLite(["#navlist li", ".ProductImageList"], () => {
			let allCurrItems = document.querySelectorAll("#navlist li");

			[].slice.call(allCurrItems).forEach((item, iterator) => {
				let arrowHTML = `
        
          <button class="${ID}-fake-arrow left" id="${ID}-fake-arrow-${iterator}-left"><svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 1.75006L2.5 8.31256L10 14.8751" stroke="black" stroke-width="2" stroke-linecap="round"/></svg></button>

          <button class="${ID}-fake-arrow right" id="${ID}-fake-arrow-${iterator}-right"><svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 1.75L9 8.3125L1.5 14.875" stroke="black" stroke-width="2" stroke-linecap="round"/></svg></button>
        
        `;

				if (
					!item.querySelector(`.${ID}-fake-arrow`) &&
					item.querySelector(".AlternateImageContainerDiv")
				) {
					let insertionPoint =
						item.querySelector(".ProductImageList");

					insertionPoint.insertAdjacentHTML("beforebegin", arrowHTML);

					let leftArrow = document.getElementById(
						`${ID}-fake-arrow-${iterator}-left`
					);
					let rightArrow = document.getElementById(
						`${ID}-fake-arrow-${iterator}-right`
					);
					let status = true;
					item.addEventListener("mouseover", (e) => {
						if (status) {
							loadCarouselImages(item, "right");
							status = false;
						}
					});

					// leftArrow.addEventListener("click", (e) => {
					// 	e.preventDefault();
					// 	e.stopPropagation();
					// 	loadCarouselImages(item, "left");

					// 	return false;
					// });

					// rightArrow.addEventListener("click", (e) => {
					// 	e.preventDefault();
					// 	e.stopPropagation();
					// 	loadCarouselImages(item, "right");

					// 	return false;
					// });
				}
			});
		});
	} else if (VARIATION == 2) {
		pollerLite(["#navlist li", ".ProductImageList"], () => {
			let allCurrItems = document.querySelectorAll("#navlist li");

			[].slice.call(allCurrItems).forEach((item, iterator) => {
				item.addEventListener("mouseenter", (e) => {
					processSwitchImage(item);
				});
			});
		});
	}
};

const addEvents = () => {
	if (
		document.body.classList.contains("ProdDetails") &&
		localStorage.getItem(`${ID}-going-to-pdp-from-plp`) === "true"
	) {
		fireEvent(
			`Interaction - user has entered a PDP with href: ${window.location.href}`,
			true
		);

		pollerLite(["#aAddToBag"], () => {
			let addtobag = document.getElementById("aAddToBag");
			addtobag.addEventListener("click", (e) => {
				fireEvent(
					`Click - user has added item to bag from PDP with url: ${window.location.href} and they came from page: ${document.referrer}`
				);
			});

			let wishlist = document.getElementById("aWishListToLogin");
			wishlist.addEventListener("click", (e) => {
				fireEvent(
					`Click - user has clicked on the wishlist button on PDP with url: ${window.location.href} and they came from page: ${document.referrer}`
				);
			});
		});

		localStorage.setItem(`${ID}-going-to-pdp-from-plp`, false);
	}

	pollerLite(["#navlist li", ".ProductImageList"], () => {
		let allCurrItems = document.querySelectorAll("#navlist li");

		[].slice.call(allCurrItems).forEach((item, iterator) => {
			if (item.querySelector(".AlternateImageContainerDiv")) {
				item.addEventListener("mouseenter", (e) => {
					fireEvent(
						`Hover - user has hovered an item which has a secondary hover image`,
						true
					);
				});

				item.querySelector(".hotspotquickbuy").addEventListener(
					"click",
					(e) => {
						fireEvent(
							`Click - user has clicked 'Quick Buy' on an item which has a secondary hover image`,
							true
						);
					}
				);

				item.querySelector("a").addEventListener("click", (e) => {
					fireEvent(
						`Click - user has clicked to go to the PDP for item ${e.currentTarget.href}`,
						true
					);
					localStorage.setItem(`${ID}-going-to-pdp-from-plp`, true);
				});

				item.querySelector(".hotspotwishlist").addEventListener(
					"click",
					(e) => {
						fireEvent(
							`Click - user has clicked the wishlist icon on the PLP for item ${e.currentTarget.href}`,
							true
						);
					}
				);
			}
		});
	});

	pollerLite(["#hotspotModal"], () => {
		document
			.querySelector("#hotspotModal")
			.addEventListener("click", (e) => {
				let sizeSelected = false;
				let currSizeSelected = "";
				let currSizes = document.querySelectorAll("#ulHsSizes li");
				[].slice.call(currSizes).forEach((size) => {
					if (size.classList.contains("hsVariantHighlight")) {
						sizeSelected = true;
						currSizeSelected = size
							.getAttribute("data-hsvariantid")
							.substring(
								0,
								size.getAttribute("data-hsvariantid").length - 3
							);
					}
				});
				if (
					(e.target.id == "addHotspotToBag" ||
						e.target.closest("#addHotspotToBag")) &&
					sizeSelected == true
				) {
					if (
						document.querySelector(
							`#navlist li[li-productid="${currSizeSelected}"] .AlternateImageContainerDiv`
						)
					) {
						fireEvent(
							`Click - user clicks add to bag on quick buy modal for product ${
								e.target
									.closest(".PinWrapText")
									.querySelector("h2").innerText
							}`,
							true
						);
					}
				}
			});
	});
};

export default () => {
	setup();

	logMessage(ID + " Variation: " + VARIATION);

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	addEvents();

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		return;
	}

	// Write experiment code here
	// ...

	firstRun = true;

	startExperiment();

	pollerLite(["#navlist"], () => {
		const navlist = document.getElementById("navlist");
		observer.connect(
			navlist,
			() => {
				setTimeout(() => {
					if (firstRun == false) {
						startExperiment();
					}
				}, 500);
			},
			{
				config: {
					attibutes: true,
					childList: true,
					subTree: true,
				},
			}
		);
	});
};
