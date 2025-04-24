/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup, categoryJSON } from './services';
import shared from './shared';
import settings from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

// Variables 


let allPills;
let categories = categoryJSON();

const { ID, VARIATION } = settings;

// helper functions
const addFunctionality = () => {

	let brandCarousel = document.querySelector('.swiper-container-brands');
	let brandElements = document.querySelectorAll('.swiper-container-brands .swiper-slide');
	let brandElementLinks = document.querySelectorAll('.swiper-container-brands .swiper-slide a');
	let closeX, categoryHolder;
	// create category HTML and insert it
	let categoryHTML = `
		<div class="category-holder" id="category-holder">
			<h2> Suggestions for you: </h2>
			<div class="category-pills">
				<a href="#" id="view-all" class="pill"> View All </a> 
				<a href="#" class="pill"> Clothes </a>
				<a href="#" class="pill"> Shoes </a> 
			</div>

			<a href="#" id="close-categories" class="close-button"> x </a>
		</div> 
	`;

	brandCarousel.insertAdjacentHTML('afterend', categoryHTML);

	categoryHolder = document.getElementById('category-holder');
	// get all brand elements, add event listener
	[].slice.call(brandElements).forEach(function(brandElement) {

		
		let swiperSlideLink = brandElement.querySelector('a');	

		if(!brandElement.classList.contains('sliderAllBrands')) {
			swiperSlideLink.addEventListener('click', (e) => {
			

				if(!e.target.classList.contains('active')) {
					e.preventDefault();

					[].slice.call(brandElementLinks).forEach(function(bEle) {
						bEle.classList.remove('active');
					});

					e.target.classList.add('active');						
					let currHref = e.currentTarget.href;
					let swiperSlideText = e.currentTarget.querySelector('.hp_brands_slideText').innerText;
					let categoryH2 = document.querySelector('.category-holder h2');
					// filter category JSON to find the one that matches the clicked element
					let singleCat = categories.filter((category) => {
						
						if(category.brand.toUpperCase() == swiperSlideText) {
							return true;
						} 
					})
					// build new pill html
					let newCategoryPills = `
						<div class="category-pills">
							<a href="${currHref}" class="pill"> View All </a>
							<a href="${singleCat[0].url_1}" class="pill"> ${singleCat[0].category_1} </a>
							<a href="${singleCat[0].url_2}" class="pill"> ${singleCat[0].category_2} </a>
							<a href="${singleCat[0].url_3}" class="pill"> ${singleCat[0].category_3} </a>
							<a href="${singleCat[0].url_4}" class="pill"> ${singleCat[0].category_4} </a>
						</div>
					`;
					// remove existing pills
					let categoryHolderPillSection = categoryHolder.querySelector('.category-pills');
					categoryHolderPillSection.remove();
					// add new pills
					categoryH2.insertAdjacentHTML('afterend', newCategoryPills);
					// send event and add class active to the category holder to show it
					events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, `Opened brand: ${category.brand} category holder to display options`);
					brandCarousel.classList.add('active');
					categoryHolder.classList.add('active');
					// add event listeners to new pills
					addEventListenersToPills();
				} else if(e.target.classList.contains('sliderAllBrands')) {
					events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, `Navigated to brand outer landing page`);
				} else {
					events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, `Navigated to brand landing page: ${category.brand} by clicking on the brand image after categories opened`);
				}

			});
		}

		

	});

	closeX = document.getElementById('close-categories');
	closeX.addEventListener('click', (e) => {
		e.preventDefault();

		let currEle = e.currentTarget;

		[].slice.call(brandElementLinks).forEach(function(bEle) {
			bEle.classList.remove('active');
		});

		brandCarousel.classList.remove('active');
		categoryHolder.classList.remove('active');
		events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, `Category nav closed by X`);
	});

}


const addEventListenersToPills = () => {
	allPills = document.querySelectorAll('.category-pills > .pill');
	[].slice.call(allPills).forEach(function(pill) {
		pill.addEventListener('click', (e) => {
			let currEle = e.currentTarget;
			let catText = currEle.innerText;
			let catHref = currEle.href;
			events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, `Category Name: ${catText} URL: ${catHref} clicked by user - navigating`);
		});

	});
}


// default activation function

export default () => {

	// initiate experiment

	setup();
  
	addFunctionality();

};

