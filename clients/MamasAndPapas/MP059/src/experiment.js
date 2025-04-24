/* eslint-disable */
/*
 * MP059 - Minibasket Improvements
 * 
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import {fullStory, setCookie, getCookie, deleteCookie, events} from '../../../../lib/utils';

// Experiment code
const MP059 = {
	cacheDOM: function() {
		const miniBasket = document.querySelector('#basket');
		const miniBasketSlider = miniBasket.parentElement.parentElement;
		const basketProducts = miniBasket.querySelectorAll('#basket_products > .basket_product');
		const deliveryMessage = miniBasket.querySelector('.basket_strap');
		const totals = document.querySelectorAll('.basket_checkout .font-size-5');

		return {
			miniBasket,
			miniBasketSlider,
			basketProducts,
			deliveryMessage,
			totals,
		};
	},

	activate: function() {
		/* 
		 * Setup
		 * Reverse the uvItems array so the product data is in the same 
		 * order as the DOM listing
		 */
		const cacheDOM = this.cacheDOM();
		const uv = window.universal_variable;
		const isBasket = uv.page.type === 'Basket';
		const basketProducts = [].slice.call(cacheDOM.basketProducts);
		let uvItems;
		document.body.classList.add('MP059');


		// Refresh page to update universal_variable if necessary
		const checkRefresh = () => {
			/**
			 * refresh
			 * @desc: Forces a page refresh to ensure universal_variable is up to date
			 * Cookies are a preventative measure where the issue might be caused
			 * by something unexpected (e.g. broken UV implementation). If the page
			 * is force refreshed 3 times it won't happen again to prevent an infinite
			 * loop
			 */
			const refresh = () => {
				let cookie = getCookie('MP059_forcedRefresh'); // Cookie value
				if (cookie && parseInt(cookie) >= 3) {
					events.send('MP059', 'error', 'Page refreshed 3 times for unexpected reasons', {sendOnce: true});
					deleteCookie('MP059_forcedRefresh');
					return false;
				} else {
					setCookie('MP059_reloaded', true); // Opens minibasket on reload
					const cookieValue = cookie ? parseInt(cookie)+1 : '1';
					
					// Cookie expires in 15 seconds as this scenario may happen on other pages
					setCookie('MP059_forcedRefresh', cookieValue, null, null, 15000);
					window.location.reload();
					return true;
				}
			};
			
			/**
			 * Force refresh in 2 scenarios:
			 * 1: If there are products in the minibasket but not in universal_variable
			 * then UV is outdated. Force refresh to update it.
			 * 
			 * 2: If number of basket items doesn't match number if line_items and this
			 * is a product page, user has likely added a product to the basket before 
			 * runtime. Force refresh to update UV;
			 */
			if (basketProducts.length && !uv.basket) {
				refresh();
				return true;
			} else {
				// set uvItems
				uvItems = (() => {
          if (isBasket && uv.basket && uv.basket.line_items) {
            return uv.basket.line_items;
          } else if (!isBasket && uv.basket && uv.basket.line_items) {
            return uv.basket.line_items.reverse();
          } else {
            return [];
          }
        })();
				if (uv.page.type === 'Product' && basketProducts.length > uvItems.length) {			
					refresh();
					return true;
				}
			}
		};
		if (checkRefresh()) return false;

		// Add size info to products
		const sizeInfo = (() => {
			for (let i = 0; i < basketProducts.length; i++) {
				const basketProduct = basketProducts[i];
				const basketProductData = uvItems[i];
				const size = basketProductData.product.size;

				if (size) {
					// Render size information
					const htmlString = `<div class="MP059_size">Size: ${size}</div>`;
					basketProduct.querySelector('.basket_productTitle').insertAdjacentHTML('afterend', htmlString);
				}
			}
		})();

		// Add amount needed for free delivery
		const deliveryUpsell = (() => {
			const totalCost = uv.basket ? uv.basket.total : 0;
			const threshold = 50;

			/*
			 * If order hasn't reached free delivery threshold, insert message at top of minibasket
			 * showing how much more is needed for free delivery
			 */
			if (totalCost >= threshold) {
				return false;
			} else {
				const difference = threshold - totalCost;
				const deliveryMessage = cacheDOM.deliveryMessage;
				const htmlString = `<div class="MP059_delivery">Spend another £${difference.toFixed(2)} for free delivery</div>`;
				deliveryMessage.innerHTML += htmlString;
			}
		})();

		// Hide savings total if it equals 0
		const savings = (() => {
      const totals = cacheDOM.totals;
      if (totals.length) {
        const savingsTotalEl = [].slice.call(totals).filter((element) => {
          return element.childNodes[0].innerText === 'Savings:';
        });
        if (savingsTotalEl.length) {
          const savingsTotal = savingsTotalEl[0];
          const noSavings = savingsTotal.querySelector('.sub-total-amt').innerText === '£0.00';
          if (noSavings) {
            savingsTotal.style.display = 'none';
          }
        }
      }
		})();

		// Turn product images into links
		const linkImages = (() => {
			for (let i = 0; i < basketProducts.length; i++) {
				const basketProduct = basketProducts[i];
				const basketProductData = uvItems[i];
				const url = basketProductData.product.url;

				if (url) {
					const basketProductImage = basketProduct.querySelector('img');
					const htmlString = `<a class="MP059_img" href="${url}">${basketProductImage.outerHTML}</a>`;
					const el = document.createElement('a');
					el.classList.add('MP059_img');
					el.href = url;
					el.innerHTML = basketProductImage.outerHTML;
					el.addEventListener('click', () => {
						events.send('MP059', 'click', 'User clicked minibasket image', {sendOnce: true});
					});

					basketProductImage.parentElement.innerHTML = htmlString;
				}
			}
		})();

		/**
		 * Force page refresh on successful add to bag
		 * Necessary as universal_variable isn't up to date until page refresh
		 * Only run on pages with add to cart button (e.g. Product pages)
		 */
		const pageRefresh = (() => {
			UC.poller([
				'.addToCartButton',
				() => !!window.jQuery
			], () => {
        const $ = window.jQuery;

				/*
				 * If cookie exists page has been reloaded after successful add to
				 * bag. Show the minicart and delete the cookie
				 */
				if (getCookie('MP059_reloaded')) {
					// Open minibasket
					UC.poller([
						'.js-slidePanel[data-target="#basket"]'
					], () => {
						$('.js-slidePanel[data-target="#basket"]').trigger('click');
						deleteCookie('MP059_reloaded');
					});
				}

				/* 
				 * Unbind self from ajax success to prevent multiple reloads and
				 * set cookie so we know to automatically open the minicart
				 * when the page has reloaded
				 */
				let pageReloading = false;
				function reloadPage() {
					if (pageReloading) {
						return false;
					} else {
						pageReloading = true;
						
						// Hide minibasket before reload
						cacheDOM.miniBasketSlider.style.display = 'none';

						$(document).off('ajaxSuccess', reloadPage);
						setCookie('MP059_reloaded', true);
						window.location.reload();
					}
				}
				
				/*
				 * Reload page when add to cart button is clicked and ajax
				 * request is successful
				 */
				$('.addToCartButton').on('click', () => {
					$(document).on('ajaxSuccess', reloadPage);
				});

				$(document).on('click', '.pickup_add_to_bag_instore_button', () => {
					$(document).on('ajaxSuccess', reloadPage);
				});
			});
		})();

		// Add collection info to products
		const collectionInfo = (() => {
			if (!basketProducts) return false;
			const miniBasketSlider = cacheDOM.miniBasketSlider;
			const ajaxRequest = () => {
				/*
				* Finds store collection labels and renders them
				* on minibasket. If basket page this can run instantly
				* using the DOM, otherwise we have to make a GET request
				* to the basket to get this data.
				*/
				const createStoreCollectionLabels = (html) => {
					/* 
					* Loop through each product in the basket and if collect from store is
					* selected, update the data object to contain the store name
					*/
					const products = html.querySelectorAll('.checkout_item');
					for (let i = 0; i < products.length; i++) {
						const product = products[i];
						const isCollection = product.querySelector('[name="shipMode"][value="pickUp"]').checked;
						if (isCollection) {
							const uvItem = uvItems[i];

							/*
								* Double check that the product name matches the one in the product data
								* There's a quirk where every other request to the /cart page returns
								* the products in reverse order so they won't match up
								*/
							const elementProductName = product.querySelector('.cart-item-name-product-url').innerText;
							const dataProductName = uvItem.product.name;
							if (dataProductName === elementProductName) {
								// Order is for collection
								uvItems[i].collection = product.querySelector('.pointOfServiceName > span').innerText;
							}
						}
					}

					// Render collection information
					for (let i = 0; i < basketProducts.length; i++) {
						const basketProduct = basketProducts[i];
						const basketProductData = uvItems[i];
						const collection = basketProductData.collection;
						if (collection) {
							const element = document.createElement('div');
							element.classList.add('MP059_collection');
							element.innerHTML = `Collection from: ${collection}</div>`;

							basketProduct.insertBefore(element, basketProduct.firstChild);
						}
					}
				};

				// Add collect from store locations from /cart page
				if (isBasket) {
					// Get locations directly from current page
					createStoreCollectionLabels(document.body);
				} else {
					// Make GET request to basket from current page
					const request = new XMLHttpRequest();
					request.open('GET', '/cart', true);
					request.onload = function() {
						if (request.status >= 200 && request.status < 400) {
							// Convert string response into elements
							const html = document.createElement('div');
							html.innerHTML = request.responseText;
							createStoreCollectionLabels(html);
						}
					};

					request.send();
				}
			};

			/*
			 * Perform inital check to see if minibasket had been opened before
			 * the experiment script has ran, then call ajaxRequest if so
			 */
			if (miniBasketSlider.classList.contains('active')) {
				ajaxRequest();
			} else {
				/*
				 * If minibasket hasn't been opened yet, only call ajaxRequest
				 * when it is opened to avoid making unnecessary requests
				 */
				UC.observer.connect(miniBasketSlider, () => {
					// Disconnect self
					ajaxRequest();
					UC.observer.disconnect(miniBasketSlider);
				}, { 
					throttle: 1000, 
					config: {subtree: false, attributes: true, childList: false}
				});
			}
		})();
	},

	triggers: function(options) {
		// FullStory tagging
		fullStory('MP059', 'Variation 1');
		this.activate();
	}
};

MP059.triggers();