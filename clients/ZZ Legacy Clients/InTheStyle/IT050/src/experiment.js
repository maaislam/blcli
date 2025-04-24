/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

let VARIATION = null;
if(typeof IT50VARIATION != 'undefined') {
    VARIATION = IT50VARIATION;
} else {
    VARIATION = 1;
} 

// IT050 - Experiment Title
const IT050 = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('IT050');

		// Product listings page
		const showSavings = () => {
			if (document.querySelector('.category-products')) {
				let productListing = document.querySelectorAll('ul.product-listing li');
				let alteredPriceText, savingNum, savingPerc;

				for (let i = 0; productListing.length > i; i++) {
					if (productListing[i].classList.contains('IT50-added')) {
						continue;
					}
					// Check for products with sale
					let saleProduct = productListing[i].querySelector('.price-box > p.old-price');
					let wasPrice = null;
					if (saleProduct) {
						let saleHTMl = saleProduct.innerHTML;
						alteredPriceText = '<span class="IT-strike">was </span>' + saleHTMl;
						wasPrice = saleProduct.querySelector('.price').innerText;
						wasPrice = wasPrice.substr(1);
						wasPrice = parseFloat(wasPrice);
					}
					
					let newPrice = null;
					if (productListing[i]) {
						const priceEl = productListing[i].querySelector('.price-box .special-price .price');
						if (priceEl) {
							newPrice = priceEl.innerText;
							newPrice = newPrice.substr(1);
							newPrice = parseFloat(newPrice);
						}
						else {
							continue;
						}
					}

					// Saving amount in int
					savingNum = Math.round((wasPrice - newPrice) * 100) / 100;

					// Saving amount in percentage
					savingPerc = Math.round((wasPrice - newPrice) / wasPrice * 100);

					// Either be £ or % dependant on variation
					let saving;
					if (VARIATION == 1) {
						saving = '<span class="IT50-int-saving">save £' + savingNum + '</span>';
					} else if (VARIATION == 2) {
						saving = '<span class="IT50-int-saving">save ' + savingPerc + '%</span>';
					}

					
					// Add 'was' before the old price & append saving figuree
					saleProduct.classList.add('IT50-strike');
					saleProduct.innerHTML = alteredPriceText;
					saleProduct.innerHTML = alteredPriceText + saving
					
					productListing[i].classList.add('IT50-added');
					

				} // end for 
			}
		}
		showSavings();

		// Product single page
		const productSavings = () => {
			if (document.querySelector('.product-shop')) {
				let saleProduct = document.querySelector('.price-box > p.old-price');
				let alteredPriceText, savingNum, savingPerc;
				if (saleProduct) {
					let saleHTMl = saleProduct.innerHTML;
					alteredPriceText = '<span class="IT-strike">was </span>' + saleHTMl;
				}
				
				let wasPrice = null;
				if (saleProduct) {
					wasPrice = saleProduct.querySelector('.price');
				}
				if (wasPrice) {
					wasPrice = wasPrice.innerText;
					wasPrice = wasPrice.substr(1);
					wasPrice = parseFloat(wasPrice);
				}

				let newPrice = document.querySelector('.price-box .special-price .price');
				if (newPrice) {
					newPrice = newPrice.innerText;
					newPrice = newPrice.substr(1);
					newPrice = parseFloat(newPrice);
				}

				// Saving amount in int
				savingNum = Math.round((wasPrice - newPrice) * 100) / 100;

				// Saving amount in percentage
				savingPerc = Math.round((wasPrice - newPrice) / wasPrice * 100);

				// Either be £ or % dependant on variation
				let saving;
				if (VARIATION == 1) {
					saving = '<span class="IT50-int-saving">save £' + savingNum + '</span>';
				} else if (VARIATION == 2) {
					saving = '<span class="IT50-int-saving">save ' + savingPerc + '%</span>';
				}

				
				// Add 'was' before the old price & append saving figuree
				if (saleProduct) {
					saleProduct.classList.add('IT50-strike');
					saleProduct.innerHTML = alteredPriceText;
					saleProduct.innerHTML = alteredPriceText + saving;
				}

				
				// Swap elements order
				let el = document.querySelector('.price-box .special-price');
				let ref = document.querySelector('.price-box .old-price');
				if (ref && el) {
					ref.insertAdjacentElement('beforebegin', el);
				}
			}	
		}
		productSavings();
		
		// UC Observer if on products listing page
		if (document.querySelector('.category-products')) {
			UC.observer.connect(document.querySelector('.category-products'), function() {
				
				showSavings();
			}, {
				config: {
					attributes: false,
					childList: true
				}
			});
		}


		/*
		*	Tracking elements
		*
		*/
		// Adding to bag
		let bagBtn = document.querySelector('.add-to-cart-button button.btn-cart');
		if (bagBtn) {
			bagBtn.addEventListener('click', function() {
				utils.events.send('IT050', 'Click', 'Used Add to bag button', {sendOnce: true});
			});
		}

		// Size buttons
		let sizeBtns = document.querySelectorAll('.product-options .switcher-size label');
		if (sizeBtns.length) {
			for (let z = 0; sizeBtns.length > z; z++) {
				sizeBtns[z].addEventListener('click', function() {
					utils.events.send('IT050', 'Click', 'Selected a size on product', {sendOnce: true});
				});
			} 
		}

		// Track when savings shown
		let savingShown = document.querySelector('span.IT50-int-saving');
		if (savingShown) {
			savingShown = savingShown.textContent.trim();
		}
		let savingPercent = null;
		let savingPound = null;
		if (savingShown) {
			savingPercent = savingShown.match(/%/g);
			savingPound = savingShown.match(/£/g);
		}
		
		if (savingPercent) {
			utils.events.send('IT050', 'Saving show - %', 'IT050 showing savings as a percentage', {sendOnce: true});
		}
		if (savingPound) {
			utils.events.send('IT050', 'Saving show - £', 'IT050 showing savings as a number', {sendOnce: true});
		}
		
	};

	// Poll elements required for *all* tests
	const poller = UC.poller([
		() => !!window.jQuery,
		".price-box" 
	], () => {
		
		// $ = window.jQuery;

		triggers();
	});

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('IT050', 'Variation 1');

		activate();
	});

})();
