/* eslint-disable */
/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import {poller} from '../../../../lib/uc-lib';
import {fullStory, events, getCookie, setCookie, deleteCookie, viewabilityTracker} from '../../../../lib/utils';

const Promise = window.Promise; // || require('@qubit/es6-promise');
const MP073 = {
	lib: {
		/**
		 * @returns {Array} - JSON of all products on first page of /en-gb/c/mattress-covers
		 */
		getData: new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('GET', '/en-gb/c/mattress-covers', true);
			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					// Convert string response into elements
					const html = document.createElement('html');
					html.innerHTML = request.responseText;

					// Extract product data from response elements
					const extractData = (product) => {
						const link = product.querySelector('.productCard_title > a');
						const url = link.href;
						const name = link.innerText.trim();
						const sku = link.getAttribute('data-code');
						const price = product.querySelector('.price').innerHTML;
						const image = product.querySelector('img').src;

						return {
							url,
							name,
							sku,
							price,
							image,
						};
					};

					const products = [...html.querySelectorAll('.productCard')].filter(el => {
						return !!el.querySelector('.productCard_details');
					});
					const allProductData = [];
					for (let i = 0; i < products.length; i++) {
						const productData = extractData(products[i]);
						allProductData.push(productData);
					}
					resolve(allProductData);
				} else {
					reject();
				}
			};

			request.send();
		}),

		/**
		 * @description - Waits for poller to complete before resolving promise
		 * @returns {undefined}
		 */
		waitForElements: new Promise((resolve, reject) => {
			poller([
				'.pdp-continer',
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
		carousel: {
			/**
			 * @returns {HTMLElement} Component
			 */
			create: function(products) {
				const container = document.createElement('div');
				container.classList.add('MP073_carousel', 'row');

				const heading = document.createElement('div');
				heading.classList.add('MP073_title');
				heading.innerText = 'Mattresses';

				const ul = document.createElement('ul');
				ul.classList.add('MP073_products');

				const buildProductHtml = function(product) {
					const li = document.createElement('li');
					li.classList.add('MP073_product');

					const a = document.createElement('a');
					a.href = product.url;
					
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
					const button = document.createElement('span');
					button.classList.add('btn', 'btn-default', 'w-100', 'MP073_details__btn');
					button.innerText = 'More Info';
					
					details.appendChild(name);
					details.appendChild(price);
					a.appendChild(img);
					a.appendChild(details);
					a.appendChild(button);
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
				const $productRecs = $(component).find('.MP073_products');
				let isSliding = false;
				$productRecs.on('beforeChange', () => {
						isSliding = true;
				});
				$productRecs.on('afterChange', () => {
						isSliding = false;
				});
				$productRecs.find('li a').click(() => {
						if (isSliding) return;
						// User clicked and didn't swipe, page change expected
						events.send('MP073', 'Click', 'V1 - Clicked mattress product', {sendOnce: true});
						qubit && qubit.sendEvent ? qubit.sendEvent('MP073:click:mattress carousel product') : null;
				});

				// Send GA event when carousel is in view
				viewabilityTracker(document.querySelector('.MP073_carousel'), () => {
					events.send('MP073', 'View', 'V1 - Carousel is in view', {sendOnce: true});
				}, {removeOnView: true});
			},
			
			/**
			 * @param {HTMLElement} component - Instance of the component
			 * @param {jQuery} $
			 */
			render: function(component, $) {
				const container = document.querySelector('.pdp-continer');
				const reviews = document.querySelector('.slidePanel-reviews');
				const MP049 = document.querySelector('.MP049_product-recs-row');

				// Inject to DOM
				if (MP049) {
					MP049.parentElement.insertBefore(component, MP049);
				} else if (reviews) {
					reviews.parentElement.insertBefore(component, reviews);
				} else {
					container.appendChild(component);
				}
				
				// Build slick
				$(component).find('.MP073_products').slick({
					slidesToShow: 4,
					slidesPerRow: 4,
					infinite: true,
					arrows: true,
					prevArrow: '<div class="MP073_prev"></div>',
					nextArrow: '<div class="MP073_next"></div>',
					responsive: [
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 3
							}
						},
						{
							breakpoint: 600,
							settings: {
								slidesToShow: 2
							}
						}
					]
				});
			},

			/**
			 * @param {Array} - JSON of all products returned from lib.getData
			 */
			init: function(products) {
				const $ = window.jQuery;
				const component = this.create(products);
				this.render(component, $);
				this.attachEvents(component, $);
			}
		},

		minibasketUpsell: {
			/**
			 * @returns {HTMLElement} Component
			 */
			create: function() {
				const container = document.createElement('div');
				container.classList.add('MP073_minibasketUpsell');

				const message = document.createElement('p');
				message.classList.add('MP073_minibasketUpsell__text');
				message.innerText = 'Ready to add a mattress? Find one designed to fit this bed?';

				const buttonWrap = document.createElement('div');
				buttonWrap.classList.add('MP073_minibasketUpsell__btnWrap');
				
				const button = document.createElement('a');
				button.classList.add('MP073_minibasketUpsell__btn');
				button.href = '/c/mattress-covers';
				button.innerText = 'View all mattresses';

				buttonWrap.appendChild(button);
				container.appendChild(message);
				container.appendChild(buttonWrap);

				return container;
			},

			/**
			 * @param {HTMLElement} component - Instance of the component
			 */
			attachEvents: function(component) {
				const sendTrackingEvent = (e) => {
					events.send('MP073', 'Click', 'V1 - Clicked minibasket upsell', {sendOnce: true});
					qubit && qubit.sendEvent ? qubit.sendEvent('MP073:click:minibasket upsell') : null;
					e.target.removeEventListener(sendTrackingEvent);
				};

				component.addEventListener('click', sendTrackingEvent);
			},

			/**
			 * @param {HTMLElement} component - Instance of the component 
			 * @param {HTMLElement} productElement - Element in the minibasket this should be rendered after
			 */
			render: function(component, productElement) {
				productElement.appendChild(component);
			},

			/**
			 * @param {HTMLElement} productElement - Element in the minibasket this should be rendered after
			 */
			init: function(productElement) {
				const component = this.create();
				this.attachEvents(component);
				if (!document.querySelector('.MP073_minibasketUpsell')) {
					this.render(component, productElement);
				}
			}
		},
	},

	activate: function() {
		// Setup
		fullStory('MP073', 'Variation 1');
		document.body.classList.add('MP073');
		const lib = this.lib;

		Promise.all([lib.getData, lib.waitForElements])
			.then((data) => {
				const productData = data[0];
				const $ = window.jQuery;

				/** 
				 * @function 
				 * @description Logic for rendering the carousel component
				 */
				const carousel = (() => {
					this.components.carousel.init(productData);
				})();

				/** 
				 * @function 
				 * @description Logic for rendering the minibasketUpsell component
				 */
				const minibasketUpsell = (() => {
					/* 
					 * Cookie 'MP073_addToBag' exists when a product has been added to bag. If this
					 * exists when the page has just loaded we can assume MP059 is also running and
					 * has refreshed the page on add to bag. As the pushchair has just been added
					 * to bag we should render this component
					 */
					if (getCookie('MP073_addToBag')) {
						const lastProductElement = document.querySelectorAll('#basket_products .basket_product')[0];
						const lastProductElementName = lastProductElement.querySelector('.basket_productTitle a').innerText;
						const thisProductName = document.querySelector('.productDetail_title').innerText;

						// If most recently added minibasket product is this product, render component on this element
						if (lastProductElementName === thisProductName) {
							this.components.minibasketUpsell.init(lastProductElement);
							events.send('MP073', 'View', 'V1 - Minibasket upsell is in view', {sendOnce: true});
						}
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
								setCookie('MP073_addToBag', true, null, null, 15000);
								const lastProductElement = document.querySelectorAll('#basket_products .basket_product')[0];
								const lastProductElementName = lastProductElement.querySelector('.basket_productTitle a').innerText;
								this.components.minibasketUpsell.init(lastProductElement);

								// Send 'View' event if MP059 is not active. If it is active we can expect a page refresh
								if (!document.body.classList.contains('MP059')) {
									events.send('MP073', 'View', 'V1 - Minibasket upsell is in view', {sendOnce: true});
								}
							}, 500);
						};

						$(document).on('ajaxSuccess', callback);
					});
					
				})();
			});
	},
};

MP073.activate();