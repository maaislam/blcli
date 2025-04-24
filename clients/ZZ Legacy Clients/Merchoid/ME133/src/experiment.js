import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const ME133 = (() => {
	const activate = () => {
		const $ = window.jQuery,
			  $body = $('body');
		
		$body.addClass('ME133');
		
		//add product info in tab
		const productInfo = () => {
			let productInfo = $('.product-details');
				productInfo.prependTo('#secondary-tab-product-features');

				$(`<h2 class="ME133-title">Product Features</h2>`).insertAfter('.product-details.tabs-style');
		}
		productInfo();

		//add view all brand/products link based on page
		const viewAllLinks = () => {

			//Get links/names
			const brand = $('meta[property="og:brand"]').attr("content"),
				  brandURL = $('.row.product-page input[name="_merchoid_pa_brand_link"]').val(),
				  productInfo = $('.product-breadcrumb.breadcrumb a:last'),
				  productCatLink = productInfo.attr('href'),
				  productCatName = productInfo.text().trim();
			
			const $newLinks = $(`<div class="ME133_links"/>`);
				  $newLinks.insertBefore('.large-6.columns.product-gallery');

			//create and add the two links
			const links = [
				[brand,brandURL],
				[productCatName,productCatLink]
			]
			$.each(links,function(){
				const $this = $(this);
				const linkName = $this[0],
					  linkTarget = $this[1];

				$(`<div class="ME133_newLink"><a href="${linkTarget}">View all ${linkName} ></a></div>`).appendTo($newLinks);
			});
		}
		viewAllLinks();

		//Stick header on scroll up with two new links
		const stickOnScroll = () => {

			const pageHeader = $('.header-wrapper'),
			 	  newLinks = $('.ME133_links');
			newLinks.clone().appendTo(pageHeader);

			const detectScroll = () => {
				let lastScrollTop = 0;
				$(window).scroll(function (event) {
					let $thisScroll = $(this);

					let scrollAmount = $thisScroll.scrollTop();
					if (scrollAmount > lastScrollTop) {
						pageHeader.removeClass('ME133-fixed');
					} else {
						pageHeader.addClass('ME133-fixed');
					}
					lastScrollTop = scrollAmount;
					if($(window).scrollTop() === 0){
						$('.header-wrapper').removeClass('ME133-fixed');
					}
				});
			}
			detectScroll();


		}
		stickOnScroll();

		const readMore = () => {
			const topText = $('.product-information__content'),
				  topTextContent = topText.text(),
				  readMoreLink = $(`<div class="ME133-readmore">Read More</div>`);

				  const maxLength = 900;

				  if(topTextContent.length > maxLength){
					  topText.append(`<div class="ME133-readMore">Read more ></div>`);
					  topText.addClass('ME133-contentHidden');

					  $('.ME133-readMore').click(function(){
						  let readText = $(this);
						if(readText.text() === 'Read more >'){
							readText.text('Read Less >');
							topText.removeClass('ME133-contentHidden');
							readText.addClass('ME133-readLess');
						}else{
							readText.text('Read more >');
							topText.addClass('ME133-contentHidden');
							readText.removeClass('ME133-readLess');	
						}
					  });

				  }
				

		}
		readMore();


	};

	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
			'body',
			'.header-wrapper',	
			'.small-12.columns.product-secondary-tabs',
			'meta[property="og:brand"]',
			'.row.product-page input[name="_merchoid_pa_brand_link"]',
			() => {
				return !!window.jQuery;
			},
			() => {
				return !!window.ga;
			}
			], () => {
			 $ = window.jQuery;
			 utils.fullStory('ME133', 'Variation 1'); 
			 activate();
			});
	})();

})();
