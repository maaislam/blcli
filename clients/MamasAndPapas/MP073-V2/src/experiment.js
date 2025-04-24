/*eslint-disable*/
import {poller} from '../../../../lib/uc-lib';
import {fullStory, events, getCookie, setCookie, deleteCookie, viewabilityTracker} from '../../../../lib/utils';

const Promise = window.Promise; // || require('@qubit/es6-promise');
const MP073 = {
	lib: {
		/**
		 * @returns {Array} - JSON of all products hardcoded in the carousel
		 */
		getData: new Promise((resolve, reject) => {
			const productData = [
				{
					url: '/en-gb/all-seasons-footmuff-for-pushchair-grey-marl/p/626246200',
					name: 'All Seasons Footmuff for Pushchair - Grey Marl',
					sku: '626246200',
					price: '£49.00',
					image: 'https://i1.adis.ws/i/mamasandpapas/626246200_01?w=400'
				},
				{
					url: '/en-gb/all-seasons-footmuff-for-pushchair-black/p/626225300',
					name: 'All Seasons Footmuff for Pushchair - Black',
					sku: '626225300',
					price: '£49.00',
					image: 'https://i1.adis.ws/i/mamasandpapas/626225300_01?w=400'
				},
				{
					url: '/en-gb/cold-weather-plus-footmuff-dark-navy/p/1277v7002',
					name: 'Cold Weather Plus Footmuff - Dark Navy',
					sku: '1277v7002',
					price: '£89.00',
					image: 'https://i1.adis.ws/i/mamasandpapas/1277T1401_cold_weather_plus_footmuff_dark_navy?w=400'
				},
				{
					url: '/en-gb/cold-weather-plus-footmuff-skyline-grey/p/1277x7400',
					name: 'Cold Weather Plus Footmuff - Skyline Grey',
					sku: '1277x7400',
					price: '£89.00',
					image: 'https://i1.adis.ws/i/mamasandpapas/SKYLINE2?w=400'
				},
				{
					url: '/en-gb/cold-weather-plus-footmuff-sage-green/p/2638x0500',
					name: 'Cold Weather Plus Footmuff - Sage Green',
					sku: '2638x0500',
					price: '£79.00',
					image: 'https://i1.adis.ws/i/mamasandpapas/1277X0500_cold_weather_plus_footmuff_sage_green?w=400'
				},
			];
			resolve(productData);
		}),

		/**
		 * @description - Waits for poller to complete before resolving promise
		 * @returns {undefined}
		 */
		waitForElements: new Promise((resolve, reject) => {
			poller([
				'.addToCartButton',
				function() {
					try {
						return !!window.jQuery.fn.slick();
					} catch (e) {
					}
				}
			], () => {
				resolve();
			});
		}),
	},

	components: {
		minibasketCarousel: {
			/**
			 * @returns {HTMLElement} Component
			 */
			create: function(products) {
				const container = document.createElement('div');
				container.classList.add('MP073_minibasketCarousel', 'row');

				const heading = document.createElement('div');
				heading.classList.add('MP073_title');
				heading.innerText = 'Don\'t forget your mattress...';

				const ul = document.createElement('ul');
				ul.classList.add('MP073_products');

				const buildProductHtml = function(product) {
					const li = document.createElement('li');
					li.classList.add('MP073_product');

					const a = document.createElement('a');
					a.href = 'javascript:void(0)';
					
					const imgWrap = document.createElement('div');
					imgWrap.classList.add('MP073_imgWrap');

					const img = document.createElement('img');
					img.src = product.image;

					const details = document.createElement('div');
					details.classList.add('MP073_details');

					const name = document.createElement('div');
					name.classList.add('MP073_product__name');
					name.innerText = product.name;

					const price = document.createElement('div');
					price.classList.add('MP073_product__price');
					price.innerHTML = product.price;

					const addToCartButton = document.createElement('a');
					addToCartButton.classList.add('btn', 'btn-default', 'w-100', 'MP073_details__btn', 'MP073_details__btn--addToCart');
					addToCartButton.innerText = 'Move to bag';
					addToCartButton.setAttribute('data-sku', product.sku);
					addToCartButton.href = 'javascript:void(0)';
					
					const infoButton = document.createElement('a');
					infoButton.classList.add('btn', 'btn-default', 'w-100', 'MP073_details__btn', 'MP073_details__btn--info');
					infoButton.innerText = 'More Info';
					infoButton.href = product.url;
					
					details.appendChild(name);
					details.appendChild(price);
					details.appendChild(addToCartButton);
					details.appendChild(infoButton);
					imgWrap.appendChild(img);
					a.appendChild(imgWrap);
					a.appendChild(details);
					li.appendChild(a);

					return li;
				};

				for (let i = 0; i < products.length; i++) {
					const product = buildProductHtml(products[i]);
					ul.appendChild(product);
				}

				container.appendChild(heading);
				container.appendChild(ul);

				return container;
			},

			/**
			 * @param {HTMLElement} component - Instance of the component
			 * @param {jQuery} $
			 */
			attachEvents: function(component, $) {
				// Add to cart functionality
				const ajaxAddToBag = (sku) => {
					if (!sku) return false;
					const request = new XMLHttpRequest();
					request.open('POST', '/en-gb/cart/add', true);
					request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
					request.onload = () => {
						if (request.status >= 200 && request.status < 400) {
							// Product added, refreshes minicart content
							events.send('MP073', 'Submit', 'V2 - Added mattress to bag from minibasket carousel', {sendOnce: true});
							ACC.minicart.getMiniCart();
						}
					};
					request.onerror = () => events.send('MP073', 'Error', 'V2 - Error adding mattress to bag');

					const data = `qty=1&productCodePost=${sku}`;
					request.send(data);
				}

				component.addEventListener('click', (e) => {
					const target = e.target;
					if (target) {
						// More info
						if (target.classList.contains('MP073_details__btn--info')) {
							events.send('MP073', 'Click', 'V2 - Clicked more info on mattress carousel', {sendOnce: true});
						}

						// Add to bag
						if (target.classList.contains('MP073_details__btn--addToCart')) {
							e.preventDefault();
							events.send('MP073', 'Click', 'V2 - Clicked move to bag on mattress carousel', {sendOnce: true});
							const sku = target.getAttribute('data-sku');
							if (sku) ajaxAddToBag(sku);
						}
					}
				});

				/**
				 * NOTE: Sliding disabled due to minibasket functionality
				 * Minibasket automatically closes on swipe resulting in closing
				 * as you swipe through the carousel
				 */
				// Slider GA Events
				// const $productRecs = $(component).find('.MP073_products');
				// let isSliding = false;
				// $productRecs.on('beforeChange', () => {
				// 		isSliding = true;
				// });
				// $productRecs.on('afterChange', () => {
				// 		isSliding = false;
				// });
				// $productRecs.find('li a').click(() => {
				// 		if (isSliding) return;
				// 		// User clicked and didn't swipe, page change expected
				// 		events.send('MP073', 'Click', 'Clicked mattress product', {sendOnce: true});
				// 		qubit && qubit.sendEvent ? qubit.sendEvent('MP073:click:mattress carousel product') : null;
				// });
			},
			
			/**
			 * @param {HTMLElement} component - Instance of the component
			 * @param {HTMLElement} productElement - Element in the minibasket this should be rendered after
			 * @param {jQuery} $
			 */
			render: function(component, productElement, $) {
				productElement.appendChild(component);
				
				// Build slick
				$(component).find('.MP073_products').slick({
					slidesToShow: 1,
					slidesPerRow: 1,
					infinite: true,
					arrows: true,
					prevArrow: '<div class="MP073_prev"></div>',
					nextArrow: '<div class="MP073_next"></div>',
					dots: true,
					draggable: false,
				});
			},

			/**
			 * @param {Array} - JSON of all products returned from lib.getData
			 */
			init: function(products, productElement) {
				const $ = window.jQuery;
				const component = this.create(products);
				if (!document.querySelector('.MP073_minibasketCarousel')) {
					this.render(component, productElement, $);
				}
				this.attachEvents(component, $);
			}
		},
	},

	activate: function() {
		// Setup
		fullStory('MP073', 'Variation 2');
		document.body.classList.add('MP073-V2');
		const lib = this.lib;

		Promise.all([lib.getData, lib.waitForElements])
			.then((data) => {
				const productData = data[0];
				const $ = window.jQuery;

				/** 
				 * @function 
				 * @description Logic for rendering the minibasket carousel component
				 */
				const minibasketCarousel = (() => {
					/* 
					 * Cookie 'MP073_addToBag' exists when a product has been added to bag. If this
					 * exists when the page has just loaded we can assume MP059 is also running and
					 * has refreshed the page on add to bag. As the pushchair has just been added
					 * to bag we should render this component
					 */
					const devMode = false;

					if (devMode) {
						const lastProductElement = document.querySelectorAll('#basket_products .basket_product')[0];
						this.components.minibasketCarousel.init(productData, lastProductElement);
					} else {
						if (getCookie('MP073_addToBag')) {
							setTimeout(() => {
								const lastProductElement = document.querySelectorAll('#basket_products .basket_product')[0];
								const lastProductElementName = lastProductElement.querySelector('.basket_productTitle a').innerText;
								const thisProductName = document.querySelector('.productDetail_title').innerText;

								// If most recently added minibasket product is this product, render component on this element
								if (lastProductElementName === thisProductName) {
									this.components.minibasketCarousel.init(productData, lastProductElement);
									events.send('MP073', 'View', 'V2 - Minibasket carousel is in view', {sendOnce: true});
								}
							}, 500);
						}
					
						/* 
						* Sets cookie on add to bag in case MP059 is also running alongside this which
						* causes a page refresh on add to bag. This is then checked on page load to determine
						* if a product has just been added to bag or not
						*/
						document.querySelector('.addToCartButton').addEventListener('click', () => {
							const callback = () => {
								$(document).off('ajaxSuccess', callback);

								setTimeout(() => {
									poller(['#basket_products .basket_product .basket_productTitle'], () => {
										setCookie('MP073_addToBag', true, null, null, 15000);
										const lastProductElement = document.querySelectorAll('#basket_products .basket_product')[0];
										const lastProductElementName = lastProductElement.querySelector('.basket_productTitle a').innerText;
										this.components.minibasketCarousel.init(productData, lastProductElement);

										// Send 'View' event if MP059 is not active. If it is active we can expect a page refresh
										if (!document.body.classList.contains('MP059')) {
											events.send('MP073', 'View', 'V2 - Minibasket carousel is in view', {sendOnce: true});
										}
									});
								}, 500);
							};

							$(document).on('ajaxSuccess', callback);
						});
					}
					
				})();
			});
	},
};

MP073.activate();