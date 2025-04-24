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

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		// add tracking for clicks
		const currentBar = document.querySelector('.dev.sib-home [data-module="alert-bar"]');
		if (currentBar) {
			currentBar.querySelector('a').addEventListener('click', () => {
				fireEvent('USP bar click');
			});
		}
		const promoBannerBar = document.querySelectorAll('.promo-banner a');
		if (promoBannerBar.length > 0) {
			for (let index = 0; index < promoBannerBar.length; index++) {
				const element = promoBannerBar[index];
				element.addEventListener('click', () => {
					fireEvent('USP bar click');
				});
			}
		}
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...
	// this is V1 & V2
	window.addEventListener("load", (event) => {

	if(VARIATION == 1 || VARIATION == 2) {

			//const randomInt = Math.floor(Math.random() * 3);
			const options = {
				prevNextButtons: false,
				pageDots: false,
				accessibility: true, //true by default
				autoPlay: 3000, // advance cells every 3 seconds
				cellAlign: "left",
				contain: false,
				draggable: true,
				wrapAround: true,
				initialIndex: 1,
				imagesLoaded: true,
				setGallerySize: false,
			};

			// get the element
			var element; 
			
			if (document.querySelector('.ss-homepage')){
				element = document.querySelector(`.ss-homepage .sib-home section.bg-mono-light.centered[data-module="objective"]`);
			}
			else {
			
			if (document.querySelector('.ss__category-header')) {
				if (window.innerWidth < 768) {
					element = document.querySelectorAll(
						`.promo-banner`
					)[1];
					}
					else {
						element = document.querySelector(
							`.promo-banner`
						);
					}
			}
			else {
				element = document.querySelector(
					`.promo-banner`
				)
			}
				
				function loadScriptByURL(id, url, callback) {
					const isScriptExist = document.getElementById(id);
				   
					if (!isScriptExist) {
					  var script = document.createElement("script");
					  script.type = "text/javascript";
					  script.src = url;
					  script.id = id;
					  script.onload = function () {
						if (callback) callback();
					  };
					  document.body.appendChild(script);
					}
				   
					if (isScriptExist && callback) callback();
				  }
				
			  
				  loadScriptByURL('flickity', 'https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js', function () {
					pollerLite([`.${ID}-service-banner`], () => {
						var elem = document.querySelector(
							`.${ID}-service-banner .banner-carousel_wrapper`
						);
		
						var isInitiated = false;
						var slider;
						var isFlickity;
						if (window.innerWidth < 768) {
							if (!isFlickity) {
							}
							slider = new Flickity(elem, options);
							isFlickity = true;
		
							if (!isInitiated) {
								const initailSlide =
									slider.cells[options.initialIndex].element;
								const offerName = initailSlide
									.querySelector("a.banner-slide-links")
									.textContent.trim();
								fireEvent(
									`Carousel Initiated: In View - ${offerName} | ${
										options.initialIndex + 1
									}`,
									true
								);
								slider.on("change", function (index) {
									const currentSlide = slider.cells[index].element;
									const offerName = currentSlide
										.querySelector("a.banner-slide-links")
										.textContent.trim();
									fireEvent(
										`Slide Changed: In View - ${offerName} | ${
											index + 1
										}`
									);
								});
		
								slider.on("pointerUp", function (event, pointer) {
									slider.player.play();
								});
								isInitiated = true;
								window.dispatchEvent(new Event("resize"));
								setTimeout(function () {
									// flickity fix
									window.dispatchEvent(new Event("resize"));
								}, 50);
							}
						} else {
							if (isFlickity) {
								slider.destroy();
								isFlickity = !isFlickity;
							}
						}
		
						const allLinks = document.querySelectorAll(
							`.${ID}-service-banner .banner-slide a.banner-slide-links`
						);
		
						if (allLinks.length > 0) {
							allLinks.forEach((link, index) => {
								link.addEventListener("click", (e) => {
									const offerName = link.textContent.trim();
									fireEvent(
										`Offer Clicked: ${offerName} | ${index + 1}`
									);
								});
							});
						}
		
						window.addEventListener("resize", () => {
							if (window.innerWidth < 768) {
								if (!isFlickity) {
									slider = new Flickity(elem, options);
									isFlickity = true;
									if (!isInitiated) {
										const initailSlide =
											slider.cells[options.initialIndex].element;
										const offerName = initailSlide
											.querySelector("a.banner-slide-links")
											.textContent.trim();
										fireEvent(
											`Carousel Initiated: In View - ${offerName} | ${
												options.initialIndex + 1
											}`,
											true
										);
										slider.on("change", function (index) {
											const currentSlide =
												slider.cells[index].element;
											const offerName = currentSlide
												.querySelector("a.banner-slide-links")
												.textContent.trim();
											fireEvent(
												`Slide Changed: In View - ${offerName} | ${
													index + 1
												}`
											);
										});
		
										slider.on(
											"pointerUp",
											function (event, pointer) {
												slider.player.play();
											}
										);
										isInitiated = true;
										slider.resize();
									}
								}
								slider.resize();
							} else {
								if (isFlickity) {
									slider.destroy();
									isFlickity = !isFlickity;
									isInitiated = !isInitiated;
								}
							}
						});
					});
				  });
				
			}

			let serviceBannerDom;

			if (VARIATION == 1) {
			serviceBannerDom = `
        <div class="${ID}-service-banner">
            <div class="banner-carousel_wrapper carousel">
							<div class="carousel-cell slide banner-slide">
								<div class="banner-slide-content">
									<a href="/offers/2-for-1-glasses-from-gbp69" class="banner-slide-links"><div><span>2 for 1</span> from £69</div></a>
								</div>
							</div>
							<div class="carousel-cell slide banner-slide">
								<div class="banner-slide-content">
									<a href="/offers/complete-glasses-from-gbp15" class="banner-slide-links"><div>Complete glasses <span>from £15</span></div></a>
								</div>
							</div>
							<div class="carousel-cell slide banner-slide">
								<div class="banner-slide-content">
									<a href="/offers/free-varifocal-lenses" class="banner-slide-links"><div><span>Free varifocals</span> with glasses from £69</div></a>
								</div>
							</div>
					</div>
        </div>`;
			} else if(VARIATION == 2) {
				serviceBannerDom = `
        <div class="${ID}-service-banner">
            <div class="banner-carousel_wrapper carousel">
							<div class="carousel-cell slide banner-slide">
								<div class="banner-slide-content">
									<a href="/offers/complete-glasses-from-gbp15" class="banner-slide-links"><div>Complete glasses <span>from £15</span></div></a>
								</div>
							</div>
							<div class="carousel-cell slide banner-slide">
								<div class="banner-slide-content">
									<a href="/offers/2-for-1-glasses-from-gbp69" class="banner-slide-links"><div><span>2 for 1</span> from £69</div></a>
								</div>
							</div>
							<div class="carousel-cell slide banner-slide">
								<div class="banner-slide-content">
								<a href="/offers/free-varifocal-lenses" class="banner-slide-links"><div><span>Free varifocals</span> with glasses from £69</div></a>
								</div>
							</div>
					</div>
        </div>`;
			}
			
			if (!document.querySelector(`.${ID}-service-banner`)) {
				element.insertAdjacentHTML("beforebegin", serviceBannerDom);
			}
			
			pollerLite([`.${ID}-service-banner`, '.ss-homepage'], () => {
				var elem = document.querySelector(
					`.${ID}-service-banner .banner-carousel_wrapper`
				);

				var isInitiated = false;
				var slider;
				var isFlickity;
				if (window.innerWidth < 768) {
					if (!isFlickity) {
					}
					slider = new Flickity(elem, options);
					isFlickity = true;

					if (!isInitiated) {
						const initailSlide =
							slider.cells[options.initialIndex].element;
						const offerName = initailSlide
							.querySelector("a.banner-slide-links")
							.textContent.trim();
						fireEvent(
							`Carousel Initiated: In View - ${offerName} | ${
								options.initialIndex + 1
							}`,
							true
						);
						slider.on("change", function (index) {
							const currentSlide = slider.cells[index].element;
							const offerName = currentSlide
								.querySelector("a.banner-slide-links")
								.textContent.trim();
							fireEvent(
								`Slide Changed: In View - ${offerName} | ${
									index + 1
								}`
							);
						});

						slider.on("pointerUp", function (event, pointer) {
							slider.player.play();
						});
						isInitiated = true;
						window.dispatchEvent(new Event("resize"));
						setTimeout(function () {
							// flickity fix
							window.dispatchEvent(new Event("resize"));
						}, 50);
					}
				} else {
					if (isFlickity) {
						slider.destroy();
						isFlickity = !isFlickity;
					}
				}

				const allLinks = document.querySelectorAll(
					`.${ID}-service-banner .banner-slide a.banner-slide-links`
				);

				if (allLinks.length > 0) {
					allLinks.forEach((link, index) => {
						link.addEventListener("click", (e) => {
							const offerName = link.textContent.trim();
							fireEvent(
								`Offer Clicked: ${offerName} | ${index + 1}`
							);
						});
					});
				}

				window.addEventListener("resize", () => {
					if (window.innerWidth < 768) {
						if (!isFlickity) {
							slider = new Flickity(elem, options);
							isFlickity = true;
							if (!isInitiated) {
								const initailSlide =
									slider.cells[options.initialIndex].element;
								const offerName = initailSlide
									.querySelector("a.banner-slide-links")
									.textContent.trim();
								fireEvent(
									`Carousel Initiated: In View - ${offerName} | ${
										options.initialIndex + 1
									}`,
									true
								);
								slider.on("change", function (index) {
									const currentSlide =
										slider.cells[index].element;
									const offerName = currentSlide
										.querySelector("a.banner-slide-links")
										.textContent.trim();
									fireEvent(
										`Slide Changed: In View - ${offerName} | ${
											index + 1
										}`
									);
								});

								slider.on(
									"pointerUp",
									function (event, pointer) {
										slider.player.play();
									}
								);
								isInitiated = true;
								slider.resize();
							}
						}
						slider.resize();
					} else {
						if (isFlickity) {
							slider.destroy();
							isFlickity = !isFlickity;
							isInitiated = !isInitiated;
						}
					}
				});
			});
	}
	});
};
