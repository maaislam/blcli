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
	getCookie,
	setCookie,
	pollerLite,
} from "../../../../../lib/utils";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

const startExperiment = () => {
	if (window.location.pathname == "/") {
		let newHTML = `
  
      <div class="swiper-slide swiper-slide-active" style="margin-right: 5px;"> <a href="/mens"> <span class="slideName">Mens</span> </a> </div>
      <div class="swiper-slide swiper-slide-active" style="margin-right: 5px;"> <a href="/ladies"> <span class="slideName">Womens</span> </a> </div>
      <div class="swiper-slide swiper-slide-active" style="margin-right: 5px;"> <a href="/kids"> <span class="slideName">Kids</span> </a> </div>
    
    
    `;

		pollerLite([".swiper-container-topCategories .swiper-slide"], () => {
			const carousel = document.querySelector(
				".swiper-container-topCategories"
			);
			let carouselWrapper = carousel.querySelector(".swiper-wrapper");
			carouselWrapper.insertAdjacentHTML("afterbegin", newHTML);
			const config = {
				attributes: true,
				childList: false,
				subtree: false,
			};
			const swiperObserver = new MutationObserver(
				(mutationsList, observer) => {
					swiperObserver.disconnect();
					const wrapper = carouselWrapper
						? carouselWrapper
						: document.querySelector(
								".swiper-container-topCategories .swiper-wrapper"
						  );
					if (window.innerWidth < 1530) {
						var mainStyle = wrapper?.getAttribute("style");
						mainStyle = mainStyle?.split(";");
						if (mainStyle && mainStyle.length > 0) {
							for (
								let index = 0;
								index < mainStyle.length;
								index++
							) {
								if (
									mainStyle[index].indexOf("transform:") > -1
								) {
									var text = mainStyle[index].replace(
										" !important",
										""
									);
									mainStyle[index] = text + " !important";
									break;
								}
							}
							wrapper.setAttribute("style", mainStyle.join(";"));
						}
					}
					swiperObserver.observe(wrapper, config);
				}
			);

			const targetDom = carouselWrapper
				? carouselWrapper
				: document.querySelector(
						".swiper-container-topCategories .swiper-wrapper"
				  );
			swiperObserver.observe(targetDom, config);
			pollerLite(
				[
					() => {
						return carousel.swiper !== undefined;
					},
				],
				() => {
					const carouselSwiper = carousel.swiper;
					carouselSwiper.update();
					fireEvent(
						`Visible - new m/f/k links added to quicklinks group`
					);
					addEvents();
				}
			);
		});
	} else if (document.body.classList.contains("ProdDetails")) {
		addEvents();
	}
};

const addEvents = () => {
	if (document.body.classList.contains("ProdDetails")) {
		// page is a product page

		if (getCookie(`${ID}-clicked-quicklink`)) {
			pollerLite(["#aAddToBag"], () => {
				let atbButton = document.getElementById("aAddToBag");
				atbButton.addEventListener("click", (e) => {
					fireEvent(
						`Click - user clicked on ATB button on product page: ${
							window.location.href
						} after clicking category: ${getCookie(
							`${ID}-clicked-quicklink`
						)}`
					);
				});
			});
		}
	}
	if (window.location.pathname == "/") {
		pollerLite([".swiper-container-topCategories .swiper-slide a"], () => {
			let allQuickLinks = document.querySelectorAll(
				".swiper-container-topCategories .swiper-slide a"
			);

			[].slice.call(allQuickLinks).forEach((link) => {
				link.addEventListener("click", (e) => {
					setCookie(
						`${ID}-clicked-quicklink`,
						e.currentTarget.innerText
					);
					fireEvent(
						`Click - user clicked on '${e.currentTarget.innerText}' category from the quicklinks`
					);
				});
			});
		});
	}
};

export default () => {
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// If control, bail out from here but add events
	// -----------------------------
	if (shared.VARIATION == "control") {
		addEvents();
		return;
	}

	// Write experiment code here
	// ...

	startExperiment();
};
