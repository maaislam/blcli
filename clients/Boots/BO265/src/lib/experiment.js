/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from '../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import { carousel } from '../Components/categoryCarousel';
import { product_carousel } from '../Components/productCarousel';
import { fetchData, fetchDataWithParams, getPLPData } from "../helper";
import AddToBag from '../addToBag';
import { mobile_carousel } from '../Components/categoryCarouselMobile';

export default () => {
	const { ID, VARIATION } = shared;

	setup();

	if (window.usabilla_live) {
		window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
	}

	console.log("activated");

	let isPLPVisited = false;
	let isPDPVisited = false;
	let isTimeStamp = false;
	window.userObject.pageView.filter((item) => { item.pageType === "PLP" ? isPLPVisited = true : false });
	window.userObject.productViews.length > 1 ? isPDPVisited = true : false;
	window.userObject.sessionTimestamp.length > 1 ? isTimeStamp = true : false;
	// INVESTIGATE TIMESTAMP THING
	isTimeStamp = true;

	console.log(isPLPVisited);
	console.log(isPDPVisited);
	console.log(isTimeStamp);

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == 'control') {
		if (isPLPVisited && !isPDPVisited && isTimeStamp && window.userObject.pageView.slice(-1)[0].pageType === "PLP") {
			fireEvent('Conditions Met');
		} else if (isPDPVisited && isTimeStamp && window.userObject.pageView.slice(-1)[0].pageType === "PLP") {
			fireEvent('Conditions Met');
		}
		return;
	}

	let carouselItemsLength = 0;
	if (isPLPVisited && isTimeStamp && !isPDPVisited) {
		fireEvent('Conditions Met');
		console.log("SHOULD SHOW PLP CAROUSEL");
		const paramsArray = getPLPData();
		fetchDataWithParams(paramsArray)
			.then(data => {
				carouselItemsLength = data.Data.length
				if (window.matchMedia("(max-width: 600px)").matches) {
					const content = mobile_carousel(data.Data);
					document.querySelector(".oct-carousel-horizontalnav").closest('.oct-grid__row').insertAdjacentHTML("beforebegin", content);

				}
				else {
					const content = carousel(data.Data);
					document.querySelector(".oct-carousel-horizontalnav").closest('.oct-grid__row').insertAdjacentHTML("beforebegin", content)
				}

			})
			.catch(error => {
				console.error(error);
			});


	} else if (isPDPVisited && isTimeStamp && isPLPVisited) {
		fireEvent('Conditions Met');
		console.log("SHOULD SHOW PDP CAROUSEL");
		fetchData()
			.then(data => {
				console.log("DATA: ",data);
				carouselItemsLength = data.Data.length;
				const content = carouselItemsLength > 3 && product_carousel(data.Data);
				carouselItemsLength > 3 && document.querySelector(".oct-carousel-horizontalnav").closest('.oct-grid__row').insertAdjacentHTML("beforebegin", content)
			})
			.catch(error => {
				console.error(error);
			});

	}


	pollerLite([`.${ID}__category_carousel_container .${ID}__category_carousel`], () => {

		let slidesToShowVal = carouselItemsLength > 6 ? 6 : carouselItemsLength - 1;
		if (slidesToShowVal < 6) {
			slidesToShowVal = 6;
		} else {
			document.querySelector(`.${ID}-prev-arrow`).classList.remove(`${ID}-hidden`);
			document.querySelector(`.${ID}-next-arrow`).classList.remove(`${ID}-hidden`);
			window.jQuery(`.${ID}__category_carousel`).slick({
				infinite: false,
				speed: 300,
				loop: true,
				prevArrow: `.${ID}-prev-arrow`,
				nextArrow: `.${ID}-next-arrow`,
				slidesToShow: 6,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 1150,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1
						}
					}

				]


			});
		}

		


	});

	//product carousel
	pollerLite([`.${ID}__product_carousel_container .${ID}__product_carousel`], () => {
		let slidesToShowVal = carouselItemsLength > 4 ? 4 : carouselItemsLength - 1;
		if (slidesToShowVal < 3) {
			slidesToShowVal = 3;
		}

		//figure out if we ever have less than 4.


		window.jQuery(`.${ID}__product_carousel`).slick({
			infinite: false,
			speed: 300,
			loop: true,
			prevArrow: `.${ID}-prev-arrow`,
			nextArrow: `.${ID}-next-arrow`,
			slidesToShow: 4,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
					}
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}

			]


		});

		var $progressBar = document.querySelector('.product-progress-bar');

		if (slidesToShowVal <= 4){
			$progressBar.classList.add(`${ID}-hidden`);
		}

		pollerLite([`.atc__btn`], () => {
			const atcBtns = document.querySelectorAll(".atc__btn");
			atcBtns && atcBtns.forEach((button) => {
				const model = button.getAttribute("data-model");
				const name = button.getAttribute("data-name");
				const object = button.getAttribute("data-object");
				const addToBag = new AddToBag(
					object,
					parseInt(object, 10) - 1,
					model,
					name
				);
				button.addEventListener("click", (e) => {
					e.preventDefault();
					addToBag.add();
					fireEvent(
						`Click - User clicked add to basket from the recommendations`
					);

				});
			});

		})


	});

	pollerLite([`.${ID}__mobile_category_carousel_container .${ID}__mobile_category_carousel`], () => {

		window.jQuery(`.${ID}__mobile_category_carousel`).slick({
			infinite: false,
			speed: 300,
			slidesToShow: 2,
			slidesToScroll: 2,

		});

		var $slider = $(`.${ID}__mobile_category_carousel`);
		var $progressBar = $('.mobile-progress-bar');
		var count = $slider.find('.slick-slide').length;
		var visibleSlides = 2;


		$progressBar
			.css('background-size', 100 / count * visibleSlides + '% 100%')
			.attr('aria-valuenow', 100 / count * visibleSlides);

		$slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {

			var calc = 100 / count * (nextSlide);

			$progressBar
				.css('background-size', (100 / count * visibleSlides) + calc + '% 100%')
				.attr('aria-valuenow', (100 / count * visibleSlides) + calc);
		});



	});







};


