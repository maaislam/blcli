import {poller} from '../../../../lib/uc-lib';
import {fullStory, eventFire, events} from '../../../../lib/utils';

const ME132 = {
	variables: {
		ID: 'ME132',
		allOutOfStockTitle: 'Let us email you when this item is back in stock.',
		sizeOutOfStockTitle: 'Let us email you when this item is back in stock in your size.',
		outOfStockDropdownLabel: '[Out of stock]'
	},

	cache: {
		elements: function() {
			const sizeSelectorWrap = document.querySelector('.variations_form');
			const sizeSelector = sizeSelectorWrap.querySelector('#pa_size');
			const sizeOptions = [...sizeSelector.children];
			const outOfStockForm = document.querySelector('#merchoid-mailchimp-out-of-stock-form');
			const sizeGuideTrigger = document.querySelector('.size-guide-init');
			const addToCart = document.querySelector('.woocommerce-variation-add-to-cart');
			const relatedItems = document.querySelector('#radical-related-products');
	
			this.elements = {
				sizeSelectorWrap,
				sizeSelector,
				sizeOptions,
				outOfStockForm,
				sizeGuideTrigger,
				addToCart,
				relatedItems,
			};
		},

		stockLevels: function() {
			function getJSONFromDataAttr(selector, dataAttr) {
				const element = document.querySelector(selector);
				const dataStr = element.getAttribute(dataAttr);
				return JSON.parse(dataStr);
			}
			
			const productData = getJSONFromDataAttr('.variations_form', 'data-product_variations');
			const stockData = getJSONFromDataAttr('.merchoid-limited', 'data-merchoid-dispatch-info').variation_stock;
			const stockLevels = (() => {
				const obj = {};
				for (let i = 0; i < productData.length; i++) {
					const variationData = productData[i];
					const variationId = variationData.variation_id;
					const size = variationData.attributes.attribute_pa_size;
					const isInStock = stockData[variationId] > 0;
				
					obj[size] = isInStock;
				}
				return obj;
			})();
		
			this.stockLevels = stockLevels;
		}
	},

	variations: {
		allSizesOutOfStock: function(experiment) {
			events.send('ME132', 'View', 'All sizes out of stock', {sendOnce: true});

			// Generic
			const elements = experiment.cache.elements;
			const variables = experiment.variables;
	
			// Elements
			const addToCart = elements.addToCart;
			const sizeSelectorWrap = elements.sizeSelectorWrap;

			/**
			 * Hide add to cart and size selector
			 */
			(() => {
				addToCart.style.display = 'none';
				sizeSelectorWrap.style.display = 'none';
			})();
	
			/**
			 * Modify out of stock form title
			 */
			(() => {
				const outOfStockForm = elements.outOfStockForm;
				outOfStockForm.querySelector('header').innerText = variables.allOutOfStockTitle;
			})();

			/**
			 * Show out of stock message
			 */
			(() => {
				const element = document.createElement('div');
				element.classList.add('ME132_outOfStockLabel');
				element.innerText = 'Out of stock';
				sizeSelectorWrap.parentElement.insertBefore(element, sizeSelectorWrap);

				// Ensure out of stock form is visible
				elements.outOfStockForm.style.display = 'block';
				events.send('ME132', 'View', 'User saw out of stock message', {sendOnce: true});
			})();

			/**
			 * Show popup linking to similar items
			 */
			(() => {
				const outOfStockPopup = experiment.components.outOfStockPopup.init();
				document.body.appendChild(outOfStockPopup.component);
			})();
		},
	
		someSizesOutOfStock: function(experiment) {
			events.send('ME132', 'View', 'Some sizes out of stock', {sendOnce: true});
			// Generic
			const elements = experiment.cache.elements;
			const variables = experiment.variables;
			const stockLevels = experiment.cache.stockLevels;

			// Elements
			const sizeSelector = elements.sizeSelector;
			const addToCart = elements.addToCart;
			const outOfStockForm = elements.outOfStockForm;
			const sizeOptions = elements.sizeOptions;
	
			/**
			 * Add "[Out of stock]" label to any out of stock sizes
			 * in size selector
			 */
			(() => {
				for (let i = 0; i < sizeOptions.length; i++) {
					const sizeOption = sizeOptions[i];
					const value = sizeOption.value;
					if (stockLevels[value] === false) {
						sizeOption.innerText += ' ' + variables.outOfStockDropdownLabel;
					}
				}
			})();
	
			/**
			 * New out of stock message
			 * If size is out of stock show this
			 * Hide if size is in stock
			 */
			(() => {
				const outOfStockComponent = experiment.components.outOfStockMessage.init();
				outOfStockForm.parentElement.insertBefore(outOfStockComponent.component, outOfStockForm);

				// Check stock level for this size
				const checkStock = () => {
					const value = sizeSelector.value;
					if (stockLevels[value] === false) {
						// Out of stock
						outOfStockComponent.updateSize(value.toUpperCase());
						outOfStockComponent.show();
						addToCart.style.display = 'none';
						events.send('ME132', 'View', 'User saw variation out of stock message', {sendOnce: true});
					} else {
						// In stock
						outOfStockComponent.hide();
						addToCart.style.display = 'block';
					}
				};
				checkStock();
				sizeSelector.addEventListener('change', checkStock);
			})();

			/**
			 * Modify out of stock form title
			 */
			(() => {
				outOfStockForm.querySelector('header').innerText = variables.sizeOutOfStockTitle;
			})();
		}
	},

	components: {
		outOfStockMessage: {
			src: '<div class="ME132_outOfStock"><span class="ME132_outOfStock__heading">Out of stock in size <span id="ME132_outOfStock__size"></span></span><br/>see our <a id="ME132_outOfStock__sizeGuide" href="#">size guide</a> and select an alternative size<span class="ME132_outOfStock__separator">OR</span></div>',
			init: function() {
				const wrap = document.createElement('div');
				wrap.innerHTML = this.src;
				const component = wrap.firstChild;

				const sizeGuide = document.querySelector('.size-guide-init');
				component.querySelector('#ME132_outOfStock__sizeGuide').addEventListener('click', (e) => {
					e.preventDefault();
					events.send('ME132', 'click', 'clicked size guide', {sendOnce: true});
					eventFire(sizeGuide, 'click');
				});

				function updateSize(size) {
					component.querySelector('#ME132_outOfStock__size').innerText = size;
				}

				function show() {
					component.style.display = 'block';
				}

				function hide() {
					component.style.display = 'none';
				}

				return {
					updateSize,
					show,
					hide,
					component
				};
			}
		},

		outOfStockPopup: {
			src: '<div class="ME132_outOfStockPopup"><div class="ME132_outOfStockPopup__col"><div class="ME132_outOfStockPopup__msg"><em>Oh no! This item is out of stock.</em><br/>But don\'t worry, we have lots of similar items we think you\'ll love</div></div><div class="ME132_outOfStockPopup__col"><div class="ME132_outOfStockPopup__btn"><span>See Similar Items</span></div></div></div>',
			init: function() {
				const wrap = document.createElement('div');
				wrap.innerHTML = this.src;
				const component = wrap.firstChild;
				const btn = component.querySelector('.ME132_outOfStockPopup__btn');

				// Bind click handler when jQuery exists
				poller([() => !!window.jQuery], () => {
					const $ = window.jQuery;
					const relatedItems = document.querySelector('#radical-related-products');
					btn.addEventListener('click', () => {
						events.send('ME132', 'click', 'clicked "see similar items"', {sendOnce: true});
						$('html, body').stop().animate({
							scrollTop: $(relatedItems).offset().top - 100
						}, 500);
					});
				});

				function show() {
					component.style.display = 'block';
				}

				function hide() {
					component.style.display = 'none';
				}

				return {
					show,
					hide,
					component,
				};
			}
		}
	},

	activate: function() {
		const experiment = this;
		const variables = this.variables;
		const elements = this.cache.elements;
		const stockLevels = this.cache.stockLevels;
		const sizesInStock = (() => {
			let inStock = false;
			for (let size in stockLevels) {
				if (stockLevels[size] === true) {
					inStock = true;
					break;
				}
			}
			return inStock;
		})();

		if (sizesInStock) {
			this.variations.someSizesOutOfStock(experiment);
		} else {
			this.variations.allSizesOutOfStock(experiment);
		}
	},

	init: function() {
		const experiment = this;
		fullStory(experiment.variables.ID, 'Variation 1');
		poller([
			'#pa_size option'
		], () => {
			// Cache everything
 			for (let prop in experiment.cache) {
				experiment.cache[prop]();
			}
			document.body.classList.add(experiment.variables.ID); // Namespace CSS
			experiment.activate.call(this); // Activate experiment
		});
	}
};

ME132.init();