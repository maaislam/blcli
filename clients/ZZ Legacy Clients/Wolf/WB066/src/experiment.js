// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------
/* eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const WB066 = (() => {
	let slideQ = false,
		$;

	function init() {
		utils.fullStory('WB066', 'Variation 1');
		//utils.events.send('WB066', 'Category', 'Action', true, 6, 'Non-Trade');
		//utils.events.send('WB066', 'Category', 'Action', true);

		const cacheDom = (() => {
			//Cache useful selectors for later use
			const bodyVar = document.body;
			const URL = window.location.pathname;

			let catpagetype,
				prodpagetype,
				uc_gender,
				usergender = false;

			bodyVar.classList.add('WB066');

			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar,
				URL,
				catpagetype,
				prodpagetype,
				uc_gender,
				usergender
			};
		})();

		const genderStorage = {
			// Hide some content thats no longer used
			run() {
				// Check if gender JSON exists, if so store it in variable
				if (localStorage.getItem('uc_gender')) {
					cacheDom.uc_gender = localStorage.getItem('uc_gender');
					cacheDom.uc_gender = JSON.parse(cacheDom.uc_gender);
				} 
				// if not then create blank gender JSON
				else {
					cacheDom.uc_gender = {
						Newsession: 0,
						Male: 0,
						Female: 0,
						userType: false
					}
				}

				// Test url for male or female product listing page, if it matches increment the relevent gender
				if (/.*\/men\/.*/.test(cacheDom.URL)) {
					cacheDom.catpagetype = 'Men';
					cacheDom.uc_gender.Male++;
					cacheDom.uc_gender.Newsession++;
				} 
				else if (/.*\/women\/.*/.test(cacheDom.URL)) {
					cacheDom.catpagetype = 'Women';
					cacheDom.uc_gender.Female++;
					cacheDom.uc_gender.Newsession++;
				}

				// If page is a product details apge check breadcrumb for gender then incremenet if found
				if (cacheDom.bodyVar.classList.contains('product-detail-body')) {
					UC.poller([
						'.breadcrumbs a:nth-child(2)',
					], function(){
						const breadCrumbGender = document.querySelector('.breadcrumbs a:nth-child(2)').innerText;

						if (breadCrumbGender == "Men") {
							cacheDom.prodpagetype = 'Men';
							cacheDom.uc_gender.Male++;
							cacheDom.uc_gender.Newsession++;
						}
						if (breadCrumbGender == "Women") {
							cacheDom.prodpagetype = 'Women';
							cacheDom.uc_gender.Female++;
							cacheDom.uc_gender.Newsession++;
						}
					});
				}

				// Check if the user is returning and has a gender defined by the JSON
				if (/..*(wolfandbadger.com).*/.test(document.referrer) === false && localStorage.getItem('uc_gender') && cacheDom.uc_gender.Newsession > 0) {
					if (cacheDom.uc_gender.Male > cacheDom.uc_gender.Female) {
						cacheDom.uc_gender.userType = 'Male';
					} else {
						cacheDom.uc_gender.userType = 'Female';
					}
				}

				// Store the upadted JSON in the localstorage with updated changes
				let storeObj = JSON.stringify(cacheDom.uc_gender);
				localStorage.setItem('uc_gender', storeObj);
				
				cacheDom.usergender = cacheDom.uc_gender.userType;
			}
		};

		const homePage = {
			changeMarkup(){
				UC.poller([
					'#home-category-boxes .category_box img',
					() => {
						if (window.jQuery) {
							$ = window.jQuery
							return true;
						}
					}
				], function(){
					utils.events.send('WB066', 'View', 'User has seen changed homepage, Gender:' + cacheDom.uc_gender.userType, {sendOnce: true});
					// If the usergender variable is not false, they are a returning user with a defined gender on the homepage
					if(cacheDom.usergender == 'Male'){
						cacheDom.bodyVar.querySelector('#home-category-boxes > .row-fluid').insertBefore(cacheDom.bodyVar.querySelector('#home-category-boxes > .row-fluid > .span6 + .span6'), cacheDom.bodyVar.querySelector('#home-category-boxes > .row-fluid > .span6'));
					}

					// Re order the first mini blocks
					$('.WB066 #home-category-boxes > .row-fluid.top_row .span6:first-child .undertopimagelinks .toplinks .category-nav-links').eq(3).insertAfter($('.WB066 #home-category-boxes > .row-fluid.top_row .span6:first-child .undertopimagelinks .toplinks .category-nav-links:first-child'));
					$('.WB066 #home-category-boxes > .row-fluid.top_row .span6:first-child .undertopimagelinks .toplinks .category-nav-links').eq(3).insertAfter($('.WB066 #home-category-boxes > .row-fluid.top_row .span6:first-child .undertopimagelinks .toplinks .category-nav-links').eq(1));

					// Re order the second mini blocks
					$('.WB066 #home-category-boxes > .row-fluid.top_row .span6:first-child + .span6 .undertopimagelinks .toplinks .category-nav-links').eq(3).insertAfter($('.WB066 #home-category-boxes > .row-fluid.top_row .span6:first-child + .span6 .undertopimagelinks .toplinks .category-nav-links:first-child'));
					$('.WB066 #home-category-boxes > .row-fluid.top_row .span6:first-child + .span6 .undertopimagelinks .toplinks .category-nav-links').eq(3).insertAfter($('.WB066 #home-category-boxes > .row-fluid.top_row .span6:first-child + .span6 .undertopimagelinks .toplinks .category-nav-links').eq(1));
					
					// Remove random spans that arent used anymore
					$('.WB066 #home-category-boxes > .row-fluid.top_row .span6 .undertopimagelinks .toplinks span').remove();

					// Add gender defining class
					$('#home-category-boxes .category_box .image-container .img-link .bannerlinkoverlay .undertitletext').each(function(){
						let el = $(this),
							parent = el.closest('.category_box');

						if(el.text().toLowerCase().indexOf('women') > -1){
							parent.addClass('WB066_female-blocks');
						}
						else {
							parent.addClass('WB066_male-blocks');
						}
					});

          $('.WB066_female-blocks li.category-nav-links a').prepend('<span>Women\'s</span>');
          $('.WB066_male-blocks li.category-nav-links a').prepend('<span>Men\'s</span>');

					$('.WB066_female-blocks .image-container').on('click', function(){
						utils.events.send('WB066', 'Click', 'User clicked main "Browse Women", Gender:' + cacheDom.uc_gender.userType, {sendOnce: true});
					});
					$('.WB066_male-blocks .image-container').on('click', function(){
						utils.events.send('WB066', 'Click', 'User clicked main "Browse Men", Gender:' + cacheDom.uc_gender.userType, {sendOnce: true});
					});


					$('.WB066_male-blocks .undertopimagelinks .category-nav-links').on('click', function(){
						utils.events.send('WB066', 'Click', 'User clicked Men - ' + $(this).find('a').text() + ', Gender:' + cacheDom.uc_gender.userType, {sendOnce: true});
					});

					$('.WB066_female-blocks .undertopimagelinks .category-nav-links').on('click', function(){
						utils.events.send('WB066', 'Click', 'User clicked Women - ' + $(this).find('a').text() + ', Gender:' + cacheDom.uc_gender.userType, {sendOnce: true});
					});
				});
			}
		}

		genderStorage.run();
		homePage.changeMarkup();
	}

	init();
})();