// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import sliderMarkup from './lib/sliderMarkup.js';

const TP079 = (() => {
	let $ = null;

	const UCPoller = (() => {
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'script[id^="s7req_"]',
			'.tp_prodImage',
			() => {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], init);
	})();

	function init(){
		utils.fullStory('TP079', 'Variation 1');
		const cacheDom = (() => {
			//Cache useful selectors for later use
			const bodyVar = document.querySelector('body');

			const $imgScript = $('script[id^="s7req_"]');
			const slideImg = [];
			let imgData;

			bodyVar.classList.add('TP079');

			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar,
				$imgScript,
				slideImg
			};
		})();

		const imgAjax = {
			getImage() {
				// Remove params from imgApi url to shorten response
				let imgApi = cacheDom.$imgScript.attr('src');
					imgApi = imgApi.match(/[\w,-=?\/]+/)[0];

				// Make request to imgApi
				$.ajax({
					type: 'GET',
					url: imgApi,
					success: function (data) {
						buildImageCarousel(data.responseText);
						imgAjax.imageLoop();
					},
					error: function (data) {
						// data.responseText still returns what we need even with 403 error
						buildImageCarousel(data.responseText);
						imgAjax.imageLoop();
					}
				});

				function buildImageCarousel(response) {
					// Extract JSON from response
					var str = response;
					str = str.replace('/*jsonp*/s7jsonResponse(', '');
					str = str.replace(',"");', '');
					cacheDom.imgData = JSON.parse(str);
				}
			},
			imageLoop(){
				const imgURLStart = '//travisperkins.scene7.com/is/image/';
				const imgURLEnd = '?defaultImage=travisperkins/missing-product&id=JRvSP0&fmt=jpg&fit=constrain,1&wid=700&hei=700';
				// If there is more than one slide
				if (cacheDom.imgData.set.item.length == undefined) {
					cacheDom.slideImg.push(imgURLStart + cacheDom.imgData.set.item.i.n + imgURLEnd);
				}
				if(cacheDom.imgData.set.item.length > 1){
					// Loop through the image urls
					for(let v = 0; v < cacheDom.imgData.set.item.length; v++) {
						cacheDom.slideImg.push(imgURLStart + cacheDom.imgData.set.item[v].i.n + imgURLEnd);
					}
				}
				imgAjax.sliderCreate();
			},
			sliderCreate(){
				$.get('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', function(){
					$('.tp_prodImage').after(sliderMarkup);
				
					const slider = sliderMarkup.find('.TP079_prod_slider');

					for(let i = 0; i < cacheDom.slideImg.length; i++){
						slider.append('<div style="background-image: url(\'' + cacheDom.slideImg[i] + '\');"></div>');
					}

					slider.slick({
						dots: true,
						slidesToShow: 1,
						slidesToScroll: 1,
						autoplaySpeed: 3000
					});

					$('.TP079_prod_slider').on('swipe', function(){
						utils.events.send('TP079', 'Swipe', 'Swiped on slider', {sendOnce: true});
					});
					$('.TP079_prod_slider').on('click', function(){
						utils.events.send('TP079', 'Click', 'Clicked on slider', {sendOnce: true});
					});
				});	
			}
		}
		
		imgAjax.getImage();
	}	
})();