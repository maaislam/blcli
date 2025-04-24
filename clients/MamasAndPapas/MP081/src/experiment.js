/* eslint-disable */
import { poller } from '../../../../lib/uc-lib';
import { fullStory, events } from '../../../../lib/utils';
import { createElement } from './utils/utils';
import bundleItems from './data/bundleItems';
import loadProducts from './data/products'; // PRODUCTION ONLY - MOVE PRODUCT DATA TO GLOBALS.JS AND COMMENT THIS LINE OUT

/**
 * MP081 - Pushchair Product Page Consolidation
 */
export const Experiment = {
	globals: {
		ID: 'MP081',
		VARIATION: '{{VARIATION}}',
		isMobile: window.innerWidth <= 768,
		brandData: null,
		colourData: null,
		bundleData: null,
		imageCarousel: null,
		selectedProduct: {
			activeSku: null,
			name: null,
			colour: null,
			bundle: null
		}
	},

	init: function() {
		// Cache
		const globals = Experiment.globals;
		const services = Experiment.services;
		const components = Experiment.components;	
    const elements = Experiment.cache.elements;
    loadProducts(); // PRODUCTION ONLY - COMMENT OUT WHEN GOING LIVE

		// Services
		services.cacheDOM();
		services.tracking();
		services.populateGlobals();
		services.addBodyClasses([
			globals.ID,
			`MP081--${globals.brandData.brand.replace(/\s/g, '')}`
		]);

		// Components
		elements.description = components.Description.init(globals.brandData.data.content);
		elements.colourPicker = components.ColourPicker.init(globals.brandData.data.colours);
		elements.bundlePicker = components.BundlePicker.init(globals.brandData.data.colours);
		services.waitForSlick(() => {
			const imageCarousel = components.ImageCarousel.init(Experiment.cache.elements.productImages);
			globals.imageCarousel = imageCarousel;
			services.updateProduct(globals.bundleData.sku);
		});

		// Misc. Page changes
		// - Hide unused elements
		(() => {
			const elements = Experiment.cache.elements;
			if (elements.stockStatus) elements.stockStatus.parentElement.classList.add('MP081_forceHide');
			if (elements.qty)  elements.qty.parentElement.classList.add('MP081_forceHide');
			if (elements.variantSelector) elements.variantSelector.parentElement.classList.add('MP081_forceHide');
		})();

		// - Change column widths
		(() => {
			const elements = Experiment.cache.elements;
			const galleryPane = elements.galleryPane;
			const detailPane = elements.detailPane;
			galleryPane.classList.remove('col-md-6');
			galleryPane.classList.add('col-md-8');
			detailPane.classList.remove('col-md-6');
			detailPane.classList.add('col-md-4');
			detailPane.classList.remove('col-lg-4');
			detailPane.classList.add('col-lg-3');
		})();

		// - Change add to bag text to 'Add to Bag' for out of stock products
		// - If add to bag is disabled, enable it (unless out of stock)
		(() => {
			const elements = Experiment.cache.elements;
			const addToBagBtn = elements.addToBagBtn;
			addToBagBtn.innerText = 'Add to Bag';
			const isOutOfStock = (() => {
				const productCache = Experiment.cache.productInfo[globals.bundleData.sku];
				if (productCache) {
					if (productCache.stockLevel === 0 && productCache.isPreorder === false) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			})();
			if (addToBagBtn.getAttribute('disabled') !== null && !isOutOfStock) {
				addToBagBtn.removeAttribute('disabled');
				addToBagBtn.setAttribute('type', 'submit');
				addToBagBtn.setAttribute('onclick', 'tryAddToCart(false)');
				addToBagBtn.classList.add('addToCartButton');
				addToBagBtn.classList.add('btn-primary');
				addToBagBtn.classList.remove('btn-default');
				document.querySelector('#addToCartForm').removeAttribute('novalidate');
			}
		})();

		// - If colour swatches already exist on page, remove the links and anchor them to new Colour Picker
		(() => {
			const swatches = document.querySelectorAll('.colour-swatch ul > li');
			const scrollToColourPicker = e => {
				e.preventDefault();
				window.jQuery('html, body').animate({
					scrollTop: window.jQuery(elements.colourPicker).offset().top - 65
				}, 700);
			};
			for (let i = 0; i < swatches.length; i++) {
				const swatch = swatches[i];
				const link = swatch.querySelector('a');
				if (link) {
					link.setAttribute('href', 'javascript:void(0);');
					link.addEventListener('click', scrollToColourPicker.bind(null, e));
				}
			}
		})();
	},

	services: {
		/**
		 * @description Populate global variables with current selections
		 */
		populateGlobals: function() {
			const globals = Experiment.globals;
			const UV = window.universal_variable;
			globals.selectedProduct.name = UV.product.name;
			globals.selectedProduct.activeSku = UV.product.sku_code;
			
			const brandData = this.getBrandData();
			globals.brandData = brandData;
			
			const productColour = this.getProductColour();
			const colourData = (() => {
				let matchingData;
				for (let i = 0; i < brandData.data.colours.length; i++) {
					const colour = brandData.data.colours[i];
					if (colour.name === productColour) {
						matchingData = colour;
					}
				}
				return matchingData;
			})();
			globals.selectedProduct.colour = productColour;
			globals.colourData = colourData;

			const bundleData = this.getBundleData();
			globals.bundleData = bundleData;
			globals.selectedProduct.bundle = bundleData.name;
		},

		/**
		 * @description Get all possible colour and bundle options for this brand 
		 * @returns {String} Brand name
		 */
		getBrandData: function() {
			const UV = window.universal_variable;
			const productName = UV.product.name.toLowerCase();
      const products = window.MP081;

      /*
       * Some brands with longer names (e.g. Ocarro Jewel) occasionally contain
       * words between them (e.g. Ocarro Signature Jewel or Ocarro Edition Jewel)
       * Place all possiblities in this object to ensure the correct brand object is chosen 
       */ 
      const brandAliases = {
        'ocarro jewel': ['ocarro jewel', 'ocarro signature jewel', 'ocarro edition jewel'],
        'ocarro explorer': ['ocarro explorer', 'ocarro signature explorer', 'ocarro edition explorer'],
      };

      let data;
			for (let brand in products) {
        const normalisedBrand = brand.toLowerCase();
        const aliases = brandAliases[normalisedBrand];
        if (productName.indexOf(normalisedBrand) > -1 || (aliases && aliases.filter((item) => productName.indexOf(item) > -1).length)) {
          data = {
            'brand': brand,
            'data': products[brand]
          };
					break;
				}
			}

			return data;
		},

		/**
		 * @description Get the colour from the active selection in the colour picker
		 * if it exists. If not, get it from the product title
		 * @returns {String} Product colour
		 */
		getProductColour: function() {
			const globals = Experiment.globals;
			const colourPicker = document.querySelector('.MP081_ColourPicker');
			if (colourPicker) {
				const active = colourPicker.querySelector('.MP081_ColourPicker__option--active');
				return active.getAttribute('data-colour');
			} else {
				const coloursData = globals.brandData.data.colours;
				const productName = globals.selectedProduct.name;
				let activeColour;
				for (let i = 0; i < coloursData.length; i++) {
					const colourData = coloursData[i];
					const colourName = colourData.name;
					if (productName.indexOf(colourName) > -1) {
						activeColour = colourName;
						break;
					}
				}
				return activeColour;
			}
		},

		/**
		 * @description Get the bundle from the active selection in the bundle picker
		 * if it exists. If not, get it from the select element on the page. If that
		 * is not selected, get the first option in the colour data object
		 * @returns {object} Selected bundle object
		 */
		getBundleData: function() {
			const globals = Experiment.globals;
			const elements = Experiment.cache.elements;	
			const variations = globals.colourData.variations;
			const activeBundle = (() => {
				const bundlePicker = document.querySelector('.MP081_BundlePicker');
				const select = elements.variantSelect;
				let selectedBundle;
				if (bundlePicker) {
					// Bundle picker exists, get active bundle from this component
					selectedBundle = bundlePicker.querySelector('.MP081_BundlePicker__option--active').getAttribute('data-bundle');
				} else if (select) {
					const selected = select.selectedOptions[0].innerText.replace(/ bundle/gi, '').replace(/ \(out of stock\)/gi, '').trim();
					if (selected !== 'Select option') {
						// Option selected, get active bundle from selected option
						selectedBundle = selected;
					}
				}
				return selectedBundle;
			})();
			if (activeBundle) {
				for (let i = 0; i < variations.length; i++) {
					const variation = variations[i];
					if (variation.name === activeBundle) {
						/* Flag that the bundle is already selected on the inital page load.
						This is used when running update product to avoid making a GET request
						to the current page */
						globals.initialPageProduct = true;

						// Bundle is selected, return relevant data object
						return variation;
					}
				}
			} else {
				// No bundle selected, default to first availible bundle
				return variations[0];
			}
		},

		/**
		 * @description Updates content on the page to reflect the selected
		 * combination (heading, price, ctas)
		 * @param {String} sku Product code
		 */
		updateProduct: function(sku) {
			const globals = Experiment.globals;
			const elements = Experiment.cache.elements;
			const bundleData = globals.bundleData;

			function updateHeading() {
				elements.productHeading.innerHTML = `<strong>${bundleData.h1}</strong>`;
			}
			
			function updateBreadcrumb() {
				elements.activeBreadcrumb.innerHTML = bundleData.h1;
			}

			function updatePrice() {
				const priceBlock = elements.priceBlock;
				const priceBlockBottom = (() => {
					// Create price block above add to bag 
					if (!elements.priceBlockBottom) {
						const element = document.createElement('div');
						element.classList.add('MP081_priceBlockBottom');
						elements.priceBlockBottom = element;
						const ctaBlock = elements.ctaBlock;
						ctaBlock.parentElement.insertBefore(element, ctaBlock);
					}

					return elements.priceBlockBottom;
				})();

				let priceString = `<p class="MP081_price">£${bundleData.price}</p>`;
				if (bundleData.wasPrice) priceString += `<p class="MP081_price--was">£${bundleData.wasPrice}</p>`;
				if (bundleData.worthPrice) priceString += `<p class="MP081_price--rrp">Worth £${bundleData.worthPrice}*</p>`;
				priceBlock.innerHTML = priceString;
				priceBlockBottom.innerHTML = priceString;

				/* iPhone X Fix -
				Bug: Sometimes the price won't render correctly after changing product
				Fix: Change styling temporarily to force browser to re-render then change back to original styling */
				priceBlock.style.opacity = '0.5';
				priceBlock.removeAttribute('style');
				priceBlockBottom.style.opacity = '0.5';
				priceBlockBottom.removeAttribute('style');
			}

			function updateUrl() {
				document.title = `${bundleData.h1} | Mamas & Papas`;
				if (window.history) {
					const hash = window.location.hash;
					window.history.replaceState(null, `${bundleData.h1} | Mamas & Papas`, `${bundleData.url}${hash}`);
				}
			}

			function updateProductInfo() {
				const cache = Experiment.cache;
				const responseIsCached = !!cache.productInfo[sku];

				const showLoader = () => {
					const stockMessaging = document.querySelector('.MP081_stockMessaging');
					stockMessaging.innerHTML = '';
					stockMessaging.classList.add('MP081_stockMessaging--loading');
					elements.addToBagBtn.setAttribute('disabled', '');
				};

				const hideLoader = () => {
					const stockMessaging = document.querySelector('.MP081_stockMessaging');
					stockMessaging.classList.remove('MP081_stockMessaging--loading');
					elements.addToBagBtn.removeAttribute('disabled');
				};

				const cacheItems = (doc) => {
					if (!cache.productInfo[sku]) cache.productInfo[sku] = {};
					const productInfo = cache.productInfo[sku];

					const description = doc.querySelector('.productDetail_panelContent').innerHTML;
					const stockMessaging = doc.querySelector('.productDetail .py-3').innerHTML;
					const stockLevel = (() => {
						const stockJSON = doc.querySelector('#stock-levels-check').innerHTML;
						if (stockJSON) {
							return Number(JSON.parse(stockJSON).head_office_stock);
						}
					})();
					const isPreorder = stockMessaging.indexOf('pre-order') > -1;

					if (description !== undefined) productInfo.description = description;
					if (stockMessaging !== undefined) {
						productInfo.stockMessaging = stockMessaging;
					}
					if (stockLevel !== undefined) productInfo.stockLevel = stockLevel;
					if (isPreorder !== undefined) productInfo.isPreorder = stockMessaging.indexOf('pre-order') > -1;
				};

				const render = () => {
					/* Do nothing if product has changed before GET request
					had time to completed because the info will be outdated */
					if (sku !== globals.bundleData.sku) {
						/* If current product is out of stock, disable add to bag again as it was enabled
						when hideLoader was invoked */
						const info = cache.productInfo[sku];
						if (info && info.stockLevel === 0 && info.isPreorder === false) {
							elements.addToBagBtn.setAttribute('disabled', '');
						}
						return false;
					}

					const productInfo = cache.productInfo[sku];

					// Enable add to bag
					elements.addToBagBtn.removeAttribute('disabled');

					// Render Description
					elements.productFullDescription.innerHTML = productInfo.description;

					// Render Stock Messaging
					const stockMessaging = document.querySelector('.MP081_stockMessaging');
					if (productInfo.stockMessaging) {
						stockMessaging.innerHTML = productInfo.stockMessaging;
					} else {
						stockMessaging.innerHTML = '';
					}

					// Disable add to bag if out of stock and not preorder
					if (productInfo.stockLevel === 0 && productInfo.isPreorder === false) {
						elements.addToBagBtn.setAttribute('disabled', '');

						// Change stock message to say product is out of stock
						stockMessaging.innerHTML = '<p>Product out of stock online</p>';
					}

					// Don't show if message is In Stock Free Delivery
					// const inStockMsg = '<pid="inStock"class="productDetail-in-stock"><small><iclass="icoico-tickCircle"></i>instock<br>FreeDelivery</small></p>';
					// if (html.replace(/\s/g, '') === inStockMsg) return false;
				}

				// Create stock message container if it doesn't exist
				(() => {
					if (!elements.stockMessaging) {
						const el = document.createElement('div');
						el.classList.add('MP081_stockMessaging');
            const bundlePicker = document.querySelector('.MP081_BundlePicker');
            if (bundlePicker) {
              bundlePicker.insertAdjacentHTML('afterend', el.outerHTML);
            } else {
              document.querySelector('.MP081_ColourPicker').insertAdjacentHTML('afterend', el.outerHTML);
            }
						elements.stockMessaging = el;
					}
				})();

				if (responseIsCached) {
					render();
				} else {
					if (globals.initialPageProduct) {
						// Page is already a bundle page, get info from current page
						globals.initialPageProduct = false;
						cacheItems(document);
						render();
					} else {
						// Get info with GET request to product URL
						showLoader();
						const request = new XMLHttpRequest();
						request.open('GET', bundleData.url, true);
						request.onload = function() {
							if (request.status >= 200 && request.status < 400) {
								const temp = document.createElement('div');
								temp.innerHTML = request.responseText;
								cacheItems(temp);
								hideLoader();
								render();
							}
						};
						request.send();
					}
				}
			}

			function updateColourLabel() {
				const elements = Experiment.cache.elements;
				elements.colourPicker.querySelector('.MP081_ColourPicker__label').innerText = globals.colourData.name;
			}

			function updateImages() {
				globals.imageCarousel.updateImages(bundleData.img);
			}

			function updateSKUs() {
				elements.addToBagSKU.setAttribute('value', sku);

				/* Recreate 'Find in Store' button if it exists, it needs to be
				recreated every time the product is change to work properly */
				if (elements.findInStoreBtn) {
					elements.findInStoreBtn.parentNode.removeChild(elements.findInStoreBtn);
				}
				Experiment.components.FindInStoreBtn.init();
				elements.findInStoreBtn.setAttribute('id', `product_${sku}`);
				elements.findInStoreBtn.setAttribute('data-actionurl', `/en-gb/store-pickup/${sku}/pointOfServices`);
				elements.findInStoreBtn.setAttribute('data-productname', bundleData.h1);
      }
      
      function updateSavings() {
        // Remove all old savings if applicable
        const savings = document.querySelectorAll('.MP081_BundlePicker__savings');
        for (let i = 0; i < savings.length; i++) {
          const saving = savings[i];
          saving.parentElement.removeChild(saving);
        }

        const bundlePickerOpts = document.querySelectorAll('.MP081_BundlePicker__option');
        if (bundlePickerOpts) {
          const bundles = globals.colourData.variations;
          for (let i = 0; i < bundles.length; i++) {
            const bundle = bundles[i];
            const name = bundle.name;
            let price = bundle.price;
            let worth = bundle.worthPrice;

            // Skip this if it doesn't have a worth price
            if (!worth) continue;

            const thisBundleOpt = [...bundlePickerOpts].filter((el) => {
              return el.getAttribute('data-bundle') === name;
            })[0];

            /**
             * @description Returns a string as a number
             * @param {String} string number as a string
             */
            const formatNumber = string => Number(string.replace(',', ''));
            price = formatNumber(price);
            worth = formatNumber(worth);
            const saving = Math.floor(((worth - price) / worth) * 100);
            const savingElement = createElement('p', 'MP081_BundlePicker__savings');
            savingElement.innerText = `Save ${saving}%`;
            if (thisBundleOpt) thisBundleOpt.appendChild(savingElement);
          }
        }
      }

      function rebuildBundlePicker() {
        const bundlePicker = document.querySelector('.MP081_BundlePicker');
        if (bundlePicker) {
          bundlePicker.parentElement.removeChild(bundlePicker);
          Experiment.components.BundlePicker.init();
        }
      }

			function init() {
				updateProductInfo();
				updateColourLabel();
				updateHeading();
				updateBreadcrumb();
				updatePrice();
				updateUrl();
				updateImages();
        updateSKUs();
        updateSavings();
        rebuildBundlePicker();
			}

			init();
		},

		/**
		 * @description Wait for slick slider to exist before running callback
		 * @param {function} cb Callback
		 */
		waitForSlick: function(cb) {
			poller([() => { 
				try { 
					return !!$.fn.slick;
				} catch(e) {}
			}], () => cb());
		},

		/**
		 * @description Add classes to the body to namespace CSS
		 * @param {string|array} classes Single class or array of classes to add
		 * to the body
		 */
		addBodyClasses: function(classes) {
			if (typeof classes === 'string') {
				document.body.classList.add(classes);
			}
			for (let i = 0; i < classes.length; i++) {
				document.body.classList.add(classes[i]);
			}
		},

		/**
		 * @description Init all page tracking
		 */
		tracking: function() {
			const ID = Experiment.globals.ID;
			const VARIATION = Experiment.globals.VARIATION;
			fullStory(ID, `Variation ${VARIATION}`);
		},

		/**
		 * @description Cache all used elements in Experiment.cache.elements
		 * @returns {object} All cached elements
		 */
		cacheDOM: function() {
			const elements = Experiment.cache.elements;
			elements.detailPane = document.querySelector('.js-detailPane');
			elements.galleryPane = document.querySelector('.js-galleryPane');
			elements.activeBreadcrumb = document.querySelector('.breadcrumb_item.breadcrumb-active');
			elements.productFullDescription = document.querySelector('.productDetail_panelContent');
			elements.productImages = document.querySelector('#js-desktopImageContainer');

			const sidebar = document.querySelector('.productDetail');
			elements.sidebar = sidebar;
			elements.productDescription = sidebar.querySelector('.pb-2 > .mb-2');
			elements.productHeading = sidebar.querySelector('.productDetail_title');
			elements.priceBlock = sidebar.querySelector('.price-block');
			elements.stockStatus = sidebar.querySelector('#inStock');
			
			const variantSelector = sidebar.querySelector('.variant-selector');
			if (variantSelector) {
				elements.variantSelector = variantSelector;
				elements.variantSelect = variantSelector.querySelector('select');
			}
			
			const ctaBlock = sidebar.querySelector('.qty-block');
			elements.ctaBlock = ctaBlock;
			elements.qty = ctaBlock.querySelector('#qtyInput');
			elements.addToBagSKU = ctaBlock.querySelector('#productCodePost');
			elements.addToBagBtn = ctaBlock.querySelector('.addToCartButton');
			if (!elements.addToBagBtn) elements.addToBagBtn = document.querySelector('#addToCartForm > button');
			const findInStoreContainer = ctaBlock.querySelector('#PickUpInStore-PickUpInStoreAction');
			elements.findInStoreContainer = findInStoreContainer;
			elements.findInStoreBtn = findInStoreContainer.querySelector('.pickupInStoreBtn');

			return elements;
		}
	},

	components: {
		Description: {
			/**
			 * @returns {HTMLElement} Component
			 */
			_create: function(content) {
				const ul = createElement('ul', 'MP081_Description');

				for (let i = 0; i < content.length; i++) {
					const li = createElement('li', 'MP081_Description__item');
					li.innerHTML = `<p>${content[i]}</p>`;
					ul.appendChild(li);
				}

				return ul;
			},

			/**
			 * @param {HTMLElement} component Instance of the component
			 */
			_render: function(component) {
				const desc = Experiment.cache.elements.productDescription;
				desc.innerHTML = '';
				desc.appendChild(component);
			},

			/**
			 * @param {object} content Content for this brand from products.js
			 * @returns {HTMLElement} Component
			 */
			init: function(content) {
				const API = this;
				const component = API._create(content);
				API._render(component);

				return component;
			}
		},

		ColourPicker: {
			/**
			 * @param {object} data JSON containing all possible selections for this brand
			 * @returns {HTMLElement} Component
			 */
			_create: function(data) {
				const globals = Experiment.globals;
				const productColour = globals.selectedProduct.colour;

				// Container
				const element = createElement('div', 'MP081_ColourPicker');
				
				// Heading
				const heading = createElement('div', 'MP081_sectionHeading');
				heading.innerText = 'Pick Your Colour:';

				// Colours
				const colours = createElement('ul', 'MP081_ColourPicker__options');
				for (let i = 0; i < data.length; i++) {
					const li = document.createElement('li');
					const colour = createElement('div', 'MP081_ColourPicker__option');
					const name = data[i].name;
					const normalisedName = name.replace(/[\s /]/g, '').toLowerCase();
					colour.setAttribute('data-colour', name);
					// If this colour is currently selected, add active class
					if (name === productColour) {
						colour.classList.add('MP081_ColourPicker__option--active');
					}

					// Tooltip
					const tooltip = createElement('div', 'MP081__tooltip');
					tooltip.innerHTML = `<div><h3>${name}</h3></span>`;

					// Append to colours
					li.appendChild(colour);
					li.appendChild(tooltip);
					colours.appendChild(li);
				}

				// Colour label (mobile)
				const label = createElement('div', 'MP081_ColourPicker__label');

				// Append to container
				element.appendChild(heading);
				element.appendChild(colours);
				element.appendChild(label);

				return element;
			},

			/**
			 * @param {HTMLElement} component - Instance of the component
			 */
			_bindEvents: function(component) {
				const globals = Experiment.globals;
				const services = Experiment.services;	
				const checkClicksOnOptions = e => {
					let el = e.target;

					/* If target is tooltip act as if it was a button click
					Loop through the parent elements until the tooltip or component
					is found to calcuate if click was in tooltip or not */
					const tooltip = (() => {
						let elToCheck = el;
						let tooltipElement;
						while (elToCheck) {
							// Stop loop at component to prevent unnecessary checks
							if (elToCheck === component) {
								break;
							} else if (elToCheck.classList.contains('MP081__tooltip')) {
								tooltipElement = elToCheck;
								break;
							}
							elToCheck = elToCheck.parentElement;
						}

						return tooltipElement;
					})();

					if (tooltip) {
						el = tooltip.previousSibling;
					}
					
					if (el && el.classList.contains('MP081_ColourPicker__option')) {
						if (el.classList.contains('MP081_ColourPicker__option--active')) {
							return false;
						} else {
							component.querySelector('.MP081_ColourPicker__option--active').classList.remove('MP081_ColourPicker__option--active');
							el.classList.add('MP081_ColourPicker__option--active');
							const bundle = globals.bundleData.name;
							const colour = el.getAttribute('data-colour');
							const newColourData = (() => {
								const colours = globals.brandData.data.colours;
								for (let i = 0; i < colours.length; i++) {
									if (colours[i].name === colour) {
										return colours[i];
									}
								}
							})();

							const variations = newColourData.variations;
							const newBundleData = (() => {
                let toReturn;
								for (let i = 0; i < variations.length; i++) {
									const variation = variations[i];
									if (variation.name === bundle) {
										// Found bundle product for selected colour
                    toReturn = variation;
                    break;
									}
                }
                return toReturn ? toReturn : variations[0];
							})();

							// Update globals
							globals.colourData = newColourData;
							globals.bundleData = newBundleData;
							services.updateProduct(newBundleData.sku);

							// Send GA event
							events.send('MP081', 'Clicked Colour', newColourData.name);
						}
					}
				};

				component.addEventListener('click', function(e) {
					checkClicksOnOptions(e);
				});
			},

			/**
			 * @param {HTMLElement} component - Instance of the component
			 */
			_render: function(component) {
				const ctaBlock = Experiment.cache.elements.ctaBlock;
				ctaBlock.parentElement.insertBefore(component, ctaBlock);
			},

			/**
			 * @param {object} data JSON containing all possible selections for this brand
			 * @returns {HTMLElement} Component
			 */
			init: function(data) {
				const API = this;
				const component = API._create(data);
				API._bindEvents(component);
				API._render(component);

				return component;
			}
		},

		BundlePicker: {
			/**
			 * @param {object} data JSON containing all possible selections for this brand
			 * @returns {HTMLElement} Component
			 */
			_create: function(data) {
				const globals = Experiment.globals;
				const colourData = globals.colourData;
				const bundleData = globals.bundleData;
				const API = this;

				// Container
				const element = createElement('div', 'MP081_BundlePicker');

				// Heading
				const heading = createElement('div', 'MP081_sectionHeading');
				heading.innerText = 'Pick Your Bundle:';

				// Images
				const images = createElement('ul', 'MP081_BundlePicker__images');
				for (let i = 0; i < bundleItems.length; i++) {
					const bundle = bundleItems[i];
					
					// Item
					const li = createElement('li', 'MP081_BundlePicker__image');
					const img = createElement('img');
					img.src = bundle.image;
					img.setAttribute('data-name', bundle.name);

					// Tooltip
					const tooltip = createElement('div', 'MP081__tooltip');
					tooltip.innerHTML = `<div><h3>${bundle.name}</h3><p>${bundle.description}<p></span>`;

					// Append to image wrap
					li.appendChild(img);
					li.appendChild(tooltip);
					images.appendChild(li);
				}

				// Options
				const variations = colourData.variations;
				const options = createElement('ul', 'MP081_BundlePicker__options');
				for (let i = 0; i < variations.length; i++) {
					const bundle = variations[i];
					const option = createElement('li', 'MP081_BundlePicker__option');
					const radioBtn = createElement('div', 'MP081_BundlePicker__option__btn');
					const label = createElement('p', 'MP081_BundlePicker__option__label');
					option.setAttribute('data-bundle', bundle.name);
					label.innerText = bundle.name;

					// Set default active bundle
					if (bundleData.name === bundle.name) {
						option.classList.add('MP081_BundlePicker__option--active');
						API._updateBundleImages(bundleData.name, images);
					}
					option.appendChild(radioBtn);
					option.appendChild(label);
					options.appendChild(option);
				}

				// Append to container
				element.appendChild(heading);
				element.appendChild(images);
				element.appendChild(options);

				return element;
			},

			/**
			 * @param {String} bundleName The bundle to match the images to
			 * @param {HTMLElement} component Cached bundle picker component (optional)
 			 */
			_updateBundleImages: function(bundleName, component) {
				const bundleImages = component ? [...component.querySelectorAll('.MP081_BundlePicker__image')] : [...document.querySelectorAll('.MP081_BundlePicker__image')];

				// Remove class from all active images
				const activeImages = bundleImages.filter((el) => el.classList.contains('MP081_BundlePicker__image--active'));
				for (let i = 0; i < activeImages.length; i++) {
					activeImages[i].classList.remove('MP081_BundlePicker__image--active');
				}

				// Filter the included products and add active class
				const activeItems = [];
				switch (bundleName) {
					case 'Pushchair Only':
					activeItems.push('Pushchair');
					break;

					case '4 Piece':
					activeItems.push('Pushchair', 'Carrycot', 'Cup Holders', 'Click and Go Adaptors');
					break;

					case '5 Piece':
					activeItems.push('Pushchair', 'Carrycot', 'Cup Holders', 'Click and Go Adaptors', 'Car Seat');
					break;

					case '6 Piece':
					activeItems.push('Pushchair', 'Carrycot', 'Cup Holders','Click and Go Adaptors', 'Car Seat', 'Isofix Base');
					break;
				}

				const newActiveImages = bundleImages.filter((el) => {
					const attr = el.querySelector('img').getAttribute('data-name');
					return activeItems.indexOf(attr) > -1;
				});
				
				for (let i = 0; i < newActiveImages.length; i++) {
					newActiveImages[i].classList.add('MP081_BundlePicker__image--active');
				}
			},

			/**
			 * @param {HTMLElement} component - Instance of the component
			 */
			_bindEvents: function(component) {
				const globals = Experiment.globals;
				const services = Experiment.services;
				const API = this;
				
				component.addEventListener('click', (e) => {
					const el = e.target;
					if (el && el.classList.contains('MP081_BundlePicker__option__btn')) {
						if (el.parentElement.classList.contains('MP081_BundlePicker__option--active')) {
							return false;
						} else {
							component.querySelector('.MP081_BundlePicker__option--active').classList.remove('MP081_BundlePicker__option--active');
							el.parentElement.classList.add('MP081_BundlePicker__option--active');
							const colour = globals.colourData.name;
							const bundle = el.parentElement.getAttribute('data-bundle');
							const variations = globals.colourData.variations;
							const newBundleData = (() => {
								for (let i = 0; i < variations.length; i++) {
									const variation = variations[i];
									if (variation.name === bundle) {
										// Found selected bundle for this colour
										return variation;
									}
								}
							})();

							// Update globals
							globals.bundleData = newBundleData;
							API._updateBundleImages(newBundleData.name, component);
							services.updateProduct(newBundleData.sku);

							// Send GA event
							events.send('MP081', 'Clicked Bundle', newBundleData.name);
						}
					}
				});
			},

			/**
			 * @param {HTMLElement} component - Instance of the component
			 */
			_render: function(component) {
        const hasBundles = (() => {
          let maxNumberOfBundles = 1;
          const colours = Experiment.globals.brandData.data.colours;
          for (let i = 0; i < colours.length; i++) {
            const colour = colours[i];
            const bundles = colour.variations;
            if (bundles.length > maxNumberOfBundles) {
              maxNumberOfBundles = bundles.length;
            }
          }
          return maxNumberOfBundles > 1;
        })();

        // Don't render if there's only one bundle availible
        if (hasBundles) {
          const colorPicker = document.querySelector('.MP081_ColourPicker');
          if (colorPicker) {
            colorPicker.parentElement.insertBefore(component, colorPicker.nextSibling);
          } else {
            const ctaBlock = Experiment.cache.elements.ctaBlock;
            ctaBlock.parentElement.insertBefore(component, ctaBlock);
          }
        }
			},

			/**
			 * @param {object} data JSON containing all possible selections for this brand
			 * @returns {HTMLElement} Component
			 */
			init: function(data) {
				const API = this;
				const component = API._create(data);
				API._bindEvents(component);
				API._render(component);

				/** 
				 * @description Realigns tooltips on small devices if they go outside the screen width
				 */
				const realignTooltips = () => {
					setTimeout(() => {
						const windowWidth = window.innerWidth;
						if (windowWidth <= 900) {
							const tooltips = component.querySelectorAll('.MP081__tooltip');
							
							// Fallback to hide all tooltips if error occurs in for loop below
							setTimeout(() => {
								[...tooltips].forEach(el => {
									el.removeAttribute('style');
								});
							}, 300);

							for (let i = 0; i < tooltips.length; i++) {
								const tooltip = tooltips[i];

								// Make temporarily visible to get rect
								tooltip.style.display = 'block';
								const rect = tooltip.getBoundingClientRect();
								if (rect.width && rect.width > windowWidth) {
									// Ignore if element is bigger than window
									tooltip.removeAttribute('style');
									continue;
								} else if (rect.left < 0) {
									// Hanging out of window to left
									tooltip.removeAttribute('style');
									tooltip.classList.add('MP081__tooltip--leftAlign');
								} else if (rect.right > windowWidth) {
									// Hanging out of window to right
									tooltip.removeAttribute('style');
									tooltip.classList.add('MP081__tooltip--rightAlign');
								}
							}
						}
					}, 2000);
				};

				// Nonessential - Fire on DOMReady to reduce resources on inital load
				if (document.readyState !== "loading") {
					realignTooltips();
				} else {
					document.addEventListener('DOMContentLoaded', realignTooltips, false);
				}

				return component;
			}
		},
		
		ImageCarousel: {
			/**
			 * @param {HTMLElement} element - Element to run slick slider on
			 */
			_slick: function(element) {
				window.jQuery(element).slick({
					arrows: true,
					dots: true,
					prevArrow: '<button type="button" data-role="none" class="slick-prev slick-arrow btn mobileCarousel_btn mobileCarousel_btn-prev js-prev" aria-label="Previous" role="button"><i class="ico ico-chevronLeft"></i></button>',
					nextArrow: '<button type="button" data-role="none" class="slick-next slick-arrow btn mobileCarousel_btn mobileCarousel_btn-next js-next" aria-label="Next" role="button"><i class="ico ico-chevronRight"></i></button>',
					slidesToShow: 1,
					lazyLoad: Experiment.globals.isMobile ? 'progressive' : false,
					customPaging : function(slider, i) {
						const thumb = $(slider.$slides[i]).attr('src');
						return `<a class="MP081_thumb" style="background-image:url(${thumb})"></a>`;
					},
				});

				return element;
			},

			/**
			 * @description Removes all existing images from slick slider
			 * @param {HTMLElement} element - Element to run slick slider on
			 */
			removeAllImages: function(element) {
				window.jQuery(element).slick('removeSlide', null, null, true);
			},

			/**
			 * @description Adds array of images to slick slider
			 * @param {array} images - Array of images to be added
			 * @param {HTMLElement} element Element containing slick slider
			 */
			addImages: function(images, element) {
				if (Experiment.globals.isMobile) {
					for (let i = 0; i < images.length; i++) {
						const srcType = i === 0 ? 'src' : 'data-lazy';
						window.jQuery(element).slick('slickAdd', `<img ${srcType}="${images[i]}"/>`);
					}
				} else {
					for (let i = 0; i < images.length; i++) {
						window.jQuery(element).slick('slickAdd', `<img src="${images[i]}"/>`);
					}
				}
			},

			/**
			 * @description Removes all existing images from slick slider
			 * then adds the array of images provided
			 * @param {array} images - Array of images to be added
			 */
			updateImages: function(images) {
				const API = this;
				const element = API._cache.element;
				
				/* For graceful switching of images, set container min-height to equal the current
				height. This avoids a "jumping" effect when the images are removed as the container
				would normally reset to 0 height
				*/
				const container = Experiment.cache.elements.productImages;
				const containerHeight = container.clientHeight;
				const sliderHeight = container.querySelector('.slick-track').clientHeight;
				if (containerHeight && sliderHeight > 0) {
					container.style.minHeight = `${sliderHeight}px`;
				}
				API.removeAllImages(element);
				API.addImages(images, element);
			},

			/**
			 * @description Turns an element into a carousel with slick slider plugin
			 * @param {HTMLElement} element Element to turn into a carousel
			 * @returns {object} Returns an API allowing images to be added and removed without rebuilding slick
			 */
			init: function(element) {
				const API = this;

				// Remove blank unused elements rather than hide so they are not used in the slider when slicked
				const elements = Experiment.cache.elements;
				const productImages = elements.productImages;
				const elementsToRemove = [
					productImages.querySelector('.anchor'),
					productImages.querySelector('.d-flex.justify-content-center.mt-3')
				];
				for (let i = 0; i < elementsToRemove.length; i++) {
					const element = elementsToRemove[i];
					if (element) {
						element.parentNode.removeChild(element);
					}
				}

				// Init plugin
				API._slick(element);

				// If mobile, use lazy load
				if (Experiment.globals.isMobile) {
					window.jQuery(element).on('reInit', function(_event , slick) {
						slick.progressiveLazyLoad();
					});
				}

				// Public API
				const removeAllImages = API.removeAllImages;
				const addImages = API.addImages;
				const updateImages = API.updateImages;

				return {
					_cache: {
						element
					},
					removeAllImages,
					addImages,
					updateImages
				};
			}
		},

		FindInStoreBtn: {
			/**
			 * @returns {HTMLElement} Component
			 */
			_create: function() {
				const globals = Experiment.globals;
				const temp = document.createElement('div');
				temp.innerHTML = `<button class="pickupInStoreBtn btn btn-default w-100 store-btn" id="product_${globals.bundleData.sku}" data-toggle="modal" data-target="#modalFindStore" type="submit" data-productavailable="true" data-productname="${globals.bundleData.h1}" data-cartpage="false" data-entrynumber="0" data-actionurl="/en-gb/store-pickup/${globals.bundleData.sku}/pointOfServices" data-value="1">FIND IN STORE</button>`;
				const button = temp.childNodes[0];
        return button;
			},

			_bindEvents: function() {
				window.ACC.pickupinstore.bindAll();
			},

			/**
			 * @param {HTMLElement} component Instance of component
			 */
			_render: function(component) {
				const findInStoreContainer = Experiment.cache.elements.findInStoreContainer;
				findInStoreContainer.insertBefore(component, findInStoreContainer.firstChild);
			},

			init: function() {
				const component = this._create();
				this._render(component);
				this._bindEvents();
				Experiment.cache.elements.findInStoreBtn = component;
			},
		},
	},

	cache: {
		elements: {},
		productInfo: {},
	},
};
