/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import { poller } from '../../../../lib/uc-lib';
import { fullStory, events, addEvent } from '../../../../lib/utils';
import colours from './lib/colours';

// IT038
const IT038 = (() => {

	const experiment = {
		cacheDOM: function() {
			const elements = {};
			elements.body = document.body;
			elements.relatedProducts = document.querySelectorAll('.block-related .products-grid .item');
			elements.sizeGuide = document.querySelector('.product-size-guide');
			elements.description = document.querySelector('#pd-0');
			this.cacheDOM = elements;

			return elements;
		},

		data: {
			relatedProducts: [],
		},

		activate: function() {
			// Setup
			const cacheDOM = this.cacheDOM($);
			const data = this.data;
			cacheDOM.body.classList.add('IT038');
			
			/*
			 * Returns the colour from a product name by cross-referencing colours.js
			 * @param {string} productName - The product name to extract the colour from
			 */
			const extractColour = (productName) => {
				const matchingColours = [];
				const lcProductName = productName.toLowerCase();

				// Find all matching colour strings
				for (let i = 0; i < colours.length; i++) {
					const colour = colours[i];
					const colourName = colour.name;
          const lcColourName = colourName.toLowerCase();
          

					if (lcProductName.indexOf(lcColourName) > -1) {
						matchingColours.push(colourName);
					}
        }
        // console.log(matchingColours);

				/*
				 * If there is more than one match, the correct colour is the 
				 * string with the most words
				 */
				let matchingColour;
				for (let i = 0; i < matchingColours.length; i++) {
					const words = matchingColours[i].split(' ');
					if (!matchingColour || words.length > matchingColour.length) {
            matchingColour = words;
					}
        }
        // console.log(matchingColour);
        // console.log(matchingColour);

				return matchingColour ? matchingColour.join(' ') : undefined;
			};

			/*
			 * Returns the product name with the colour removed
			 * @param {string} productName - The product name to remove the colour from
			 * @param {string} colour - The colour to remove from the product name
			 */
			const removeColour = (productName, colour) => {
        console.log(productName);
				const regex = new RegExp(colour + '(\s)?', 'i');
				return productName.replace(regex, '');
			};

			// Populate this.data with product data
			this.data.product = (() => {
				const data = {};			
				data.name = window.productDetail.name.trim();
				data.colour = extractColour(data.name);
				data.nameNoColour = removeColour(data.name, data.colour);
				return data;
			})();
      
			// Populate this.data with related product data
			this.data.relatedProducts = (() => {
        const data = [];
				const relatedProducts = cacheDOM.relatedProducts;
				for (let i = 0; i < relatedProducts.length; i++) {
          const link = relatedProducts[i].querySelector('.product-name > a');					
					const url = link.href;
					const name = link.innerText.trim();
          const colour = extractColour(name);
          const nameNoColour = removeColour(name, colour);
          console.log(nameNoColour);

					data.push({
            name,
						colour,
						url,
						nameNoColour
					});
				}
        // console.log(data);
				return data;
			})();

			// Build colour selector
			const colourVariationComponent = (() => {
				let rendered = false;
				const element = document.createElement('div');
				const ul = document.createElement('ul');
				const dl = document.createElement('dl');
				const dt = document.createElement('dt');
				const dd = document.createElement('dd');
				const label = document.createElement('label');

				element.classList.add('IT038_colours');
				label.innerText = 'Colour:';

				element.appendChild(ul);
				dt.appendChild(label);
				dd.appendChild(element);
				dl.appendChild(dt);
				dl.appendChild(dd);
			
				/*
				 * Adds a new colour variation to the main product
				 * @param {object} product - required properties: colour, url
				 */
				const add = (product, active) => {
					// Find HEX code from colours array
					const hex = (() => {
						for (let i = 0; i < colours.length; i++) {
							const colour = colours[i];
							if (colour.name === product.colour) {
								return colour.colour;
							}
						}
					})();
					const li = document.createElement('li');
					const a = document.createElement('a');
					const label = document.createElement('label');
					li.classList.add('IT038_colour');
					li.style.backgroundColor = hex;
					label.innerText = product.colour;

					if (active) {
						li.classList.add('IT038_colour--active');
						a.href = 'javascript:void(0)';
						const selected = document.createElement('span');
						selected.classList.add('IT038_colour__selected');
						selected.innerText = 'selected';
						label.appendChild(selected);
					} else {
						a.href = product.url;
						addEvent(a, 'click', function() {
							events.send('IT038', 'Click', 'Clicked colour swatch', {sendOnce: true});
						});
					}
					
					a.appendChild(label);
					li.appendChild(a);
					ul.appendChild(li);
				};

				const render = () => {
					if (!rendered) {
						cacheDOM.sizeGuide.insertAdjacentElement('afterend', dl);
						events.send('IT038', 'View', 'Colour variations exist');
						rendered = true;
					}
				};

				const isRendered = () => rendered;

				// Add currently selected colour
				add(this.data.product, true);

				return {
					add,
					render,
					isRendered,
				};
			})();

      /**
       * Product name match
       *
       * Checks equalty on product names (with colours stripped)
       * but gives some flexibility for some terms that we can 
       * omit from the comparison (e.g. nude snake skin shoes
       * should match white faux suede shoes)
       *
       * E.g.
       * SARAH ASHCROFT NUDE  STUDDED SOLE ANKLE BOOTS
       * SARAH ASHCROFT  FAUX SUEDE STUDDED SOLE ANKLE BOOTS
       *
       * @param {string} term1
       * @param {string} term2
       */
      const productNameMatch = (term1, term2) => {
        const removableWords = ['faux', 'suede'];

        const coloursFlat = [];
        colours.forEach((colour) => {
          coloursFlat.push(colour.name.toLowerCase().trim());
        });

        // Trim double strings between words and normalise case
        term1 = term1.replace(/\s\s+/g, ' ').toLowerCase();
        term2 = term2.replace(/\s\s+/g, ' ').toLowerCase();

        //  Split into arrays
        const term1Array = term1.split(' ');
        const term2Array = term2.split(' ');

        // Remove additional words from terms
        const buildCompareString = (arr) => {
          let compareString = '';
          arr.forEach((item, idx) => {
            if(coloursFlat.indexOf(item) === -1 && removableWords.indexOf(item) === -1) {
              compareString += item;
            }
          });

          return compareString;
        }

        const comp1 = buildCompareString(term1Array);
        const comp2 = buildCompareString(term2Array);

        return comp1 && comp2 && comp1 === comp2;
      };

			// Adds text to description
			const addTextNodeToDesc = () => {
				const description = cacheDOM.description;
				const element = document.createElement('p');
				element.classList.add('IT038_sizeNote');
				element.innerText = 'Please note: not all colours for this item may be here, there may be a few hidden gems on the previous page';
				description.insertBefore(element, description.childNodes[0]);
			};
      
			// Find matching products in related products
			const matchingProducts = (() => {
				const productName = this.data.product.nameNoColour;
				const relatedProducts = this.data.relatedProducts;

				for (let i = 0; i < relatedProducts.length; i++) {
					const relatedProduct = relatedProducts[i];
          const relatedProductName = relatedProduct.nameNoColour;

					if (productNameMatch(productName, relatedProductName)) {
						// This product is a colour variation of the main product
						if (!colourVariationComponent.isRendered()) {
							colourVariationComponent.render();
							addTextNodeToDesc();
						}
						colourVariationComponent.add(relatedProduct);
					}
				}
			})();

		},

		triggers: function() {
			var self = this;
			fullStory('IT038', 'Variation 1');
			poller([
				'.block-related .products-grid .item',
				'.product-size-guide',
				'#pd-0',
			], () => self.activate.call(self));
		} 
	};

	experiment.triggers();

})();
