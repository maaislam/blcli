import { pollerLite } from "../../../../../../lib/utils";
import shared from "../../../../../../core-files/shared";
import { fireEvent } from "../../../../../../core-files/services";
const { ID, VARIATION } = shared;

const renderSlider = (colVarId) => {
	let currentCarousel;
	if (colVarId) {
		currentCarousel =
			window.productImageCarousel.getSwiperElement(colVarId);
	} else {
		currentCarousel =
			window.productImageCarousel.getSwiperElement().swiperInstance;
	}
	currentCarousel.allowTouchMove = false;

	let index_currentSlide = currentCarousel.realIndex;
	let currentSlide = currentCarousel.slides[index_currentSlide];
	let images = [];
	if (currentCarousel.slides.length > 0) {
		currentCarousel.slides.forEach((elm) => {
			let url =
				elm.querySelector("img")?.getAttribute("src") ||
				elm.querySelector("img")?.getAttribute("data-src");
			images.push(url);
		});
	}

	const newSliderDom = `
        <div class="${ID}-slider-container">
            <div class="swiper ${ID}-slider">
                <div class="swiper-wrapper">
                    ${images
						.map((item) => {
							return `
                                <div class="swiper-slide"><img src="${item}"/></div>
                            `;
						})
						.join("\n")}
                </div>
				<div class="swiper-button-next"></div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    `;

	if (VARIATION == "1") {
		const wrapper = document.querySelector("#productImageContainer");
		document
			.querySelector(`.ThumbProdWrap .${ID}-slider-container`)
			?.remove();
		wrapper?.insertAdjacentHTML("afterend", newSliderDom);
		const horizontalSliderConfig = {
			speed: 800,
			slidesPerView: 3.5,
			slideToClickedSlide: true,
			loop: true,
			spaceBetween: 6,
			pagination: {
				el: ".swiper-pagination",
				type: "bullets",
				clickable: true,
			},
		};
		pollerLite([`.${ID}-slider`], () => {
			const initializeSlider = () => {
				var horizontalSlider = new Swiper(
					`.${ID}-slider`,
					horizontalSliderConfig
				);
				horizontalSlider.on("slideChange", function (slider) {
					currentCarousel.slideTo(slider.realIndex);
					fireEvent(
						`Interaction - User interacted with the carousel`
					);
				});
				if (colVarId) {
					fireEvent(
						`Visible - Image carousel loaded after color change`
					);
				} else {
					fireEvent(`Visible - Image carousel loaded`);
				}
			};
			pollerLite(
				[
					() => {
						return currentSlide.querySelector(
							"img.swiper-lazy-loaded"
						);
					},
				],
				() => {
					initializeSlider();
				}
			);
		});
	} else if (VARIATION == "2") {
		const wrapper = document.querySelector("#productImages .ThumbProdWrap");
		wrapper?.querySelector(`.${ID}-slider-container`)?.remove();
		wrapper?.insertAdjacentHTML("beforeend", newSliderDom);

		const verticalSliderConfig = {
			direction: "vertical",
			speed: 800,
			slidesPerView: 3,
			centeredSlides: true,
			centeredSlidesBounds: true,
			slideToClickedSlide: true,
			loop: true,
			spaceBetween: 6,
			touchEventsTarget: "container",
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			// pagination: {
			// 	el: ".swiper-pagination",
			// 	type: "bullets",
			// 	clickable: true,
			// },
		};
		pollerLite([`.${ID}-slider`], () => {
			const updateHeight = () => {
				const sliderContainer = document.querySelector(
					`.${ID}-slider-container`
				);
				sliderContainer.style.height = `${
					currentCarousel.el.querySelector(".swiper-wrapper")
						.clientHeight
				}px`;
			};

			const initializeSlider = () => {
				var verticalSlider = new Swiper(
					`.${ID}-slider`,
					verticalSliderConfig
				);
				verticalSlider.on("slideChange", function (slider) {
					currentCarousel.slideTo(slider.realIndex);
					fireEvent(
						`Interaction - User interacted with the carousel`
					);
				});
				// verticalSlider.on('slidePrevTransitionStart', () => {
				// 	containerElm.classList.remove('last-slide-reached');
				//   });
				if (colVarId) {
					fireEvent(
						`Visible - Image carousel loaded after color change`
					);
				} else {
					fireEvent(`Visible - Image carousel loaded`);
				}
			};

			pollerLite(
				[
					() => {
						return currentSlide.querySelector(
							"img.swiper-lazy-loaded"
						);
					},
				],
				() => {
					setTimeout(() => {
						updateHeight();
						initializeSlider();
						updateHeight();
					}, 500);
				}
			);
			window.addEventListener("resize", () => {
				setTimeout(() => {
					updateHeight();
				}, 50);
			});
		});
	}
};

export default renderSlider;
