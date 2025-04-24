import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as reviews from './lib/ME136-reviews.js';

const ME136 = (() => {
	
	let VARIATION = null;
	if (typeof VARIATION != 'ME136') {
		VARIATION = ME136VARIATION;
	} else {
		VARIATION = 1;
	}

	//content based on varation
	let reviewContentObj;
	switch(VARIATION) {
		case 1:
		reviewContentObj = reviews.typeReviews;
			break;
		case 2:
		reviewContentObj = reviews.brandReviews;
			break;
	}

	const activate = () => {
		document.body.classList.add('ME136');
		document.body.classList.add('ME136v'+VARIATION);	

		const pageWrapper = document.querySelector('.product-info.large-6'),
		addTocart = document.querySelector('.variations_form.cart');

		//get the brand name & the product type
		const productBrand = document.querySelector("[property='og:brand']").content.toLowerCase(),
		productType = document.querySelectorAll('.product-breadcrumb.breadcrumb a')[1].textContent.toLowerCase().replace(/ /g, "");
		
		//define object based on product type/brand
		let reviewContent;
		if(VARIATION === 1){
			switch(productType) {
				case 'hoodiesandsweatshirts':
				reviewContent = reviewContentObj.hoodiesandsweatshirts;
					break;
				case 't-shirtsandtops':
				reviewContent = reviewContentObj.tshirtsandtops;
					break;
				case 'jacketsandouterwear':
				reviewContent = reviewContentObj.jacketsandouterwear;
					break;
				case 'bags':
				reviewContent = reviewContentObj.bags;
					break;
				case 'accessories':
				reviewContent = reviewContentObj.accessories;
					break;
			}
		}else if(VARIATION === 2){
			switch(productBrand) {
				case 'legend of zelda':
				reviewContent = reviewContentObj.zelda;
					break;
				case 'star wars':
				reviewContent = reviewContentObj.starwars;
					break;
				case 'dc comics':
				reviewContent = reviewContentObj.DC;
					break;
				case 'marvel':
				reviewContent = reviewContentObj.marvel;
					break;
				case 'rick and morty':
				reviewContent = reviewContentObj.rickandmorty;
					break;
			}
		}

		//add the reviews to the page
		for (const key in reviewContent) {
			if (reviewContent.hasOwnProperty(key)) {
				const element = reviewContent[key];
				const reviewWrap = document.createElement('div');
				reviewWrap.classList.add('ME136-review-wrapper');
				reviewWrap.innerHTML = 
				`<div class="ME136-stars"></div>
				<h3 class="ME136-headline">${element.heading}</h3>
				<p class="ME136-reviewText">${element.text}</p>
				<span class="ME136-reviewer">${element.name}</span>`;
			
				pageWrapper.insertBefore(reviewWrap, addTocart.nextSibling);
			}
		}

		//shows one or the other on page load
		const reviewBlock = document.querySelectorAll('.ME136-review-wrapper')
		if (reviewBlock.length) {
			const showReview = Math.floor(Math.random() * reviewBlock.length);
			for (let i = 0; i < reviewBlock.length; ++i) {
				if (i !== showReview) {
					reviewBlock[i].classList.add('ME136-hidden');
				}
			}
		}
	}

	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
			'.product-info.large-6',
			'.variations_form.cart',
			'.product-breadcrumb.breadcrumb a',
		], () => {
			utils.fullStory('ME136', 'Variation 1');
			activate();
		});
	})();

})();
