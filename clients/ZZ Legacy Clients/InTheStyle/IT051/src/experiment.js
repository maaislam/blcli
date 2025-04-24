/*eslint-disable */
/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

let VARIATION = null;
if(typeof IT51VARIATION != 'undefined') {
    VARIATION = IT51VARIATION;
} else {
    VARIATION = 1;
} 

// IT051 - Experiment Title
const IT051 = (() => {

	let $ = null;

	// Poll elements required for *all* tests
	const poller = UC.poller([
		() => !!window.jQuery,
		".header-bag" 
	], () => {
		
		$ = window.jQuery;

		triggers();
	});

	// Experiment code
	const activate = () => {
		document.body.classList.add('IT051');

		const updateBag = () => {
			const miniBagCart = document.querySelector('.right-off-canvas-menu');
			const bagChanges = (() => {

				if (miniBagCart) {
					/*
					*	Remove Checkout button from top
					*/
					const topCheckoutBtn = miniBagCart.querySelector('.actions-top button.btn-bag');
					if (topCheckoutBtn) {
						topCheckoutBtn.classList.add('it51-hide');
					}


					/*
					*	"Edit item" changed to "Change size"
					*/
					const editItem = miniBagCart.querySelectorAll('li.item .product-details a.link-edit');
					for (let i = 0; editItem.length > i; i++) {
            editItem[i].textContent = "Change size";            
					}


					/*
					*	Move continue shopping below checkout btn
					*/
					const continueShopping = miniBagCart.querySelector('.actions-top .actions button.right-off-canvas-toggle');
					const checkoutRef = miniBagCart.querySelector('.actions button.btn-bag');
					if (continueShopping && checkoutRef) {
						checkoutRef.insertAdjacentHTML('afterend', continueShopping);
					}
			
				} // End if miniBagCart
				
			})();

			const updateMinibag = () => {
				if (miniBagCart) {
					const bagList = miniBagCart.querySelectorAll('#cart-sidebar li');
					
					// If empty return
					if (bagList < 1) {return}

				}
			}
			updateMinibag();


			// Build up bottom element
			const subCheckout = `
				<div class="it51-subcheckout">
					<div class="it51-row it51-saving-row">
						<div class="it51-float-left">
							<p>Savings</p>
						</div>
						<div class="it51-float-right it51-saving">
							<p></p>
						</div>
					</div>
					<div class="it51-row">
						<div class="it51-float-left">
							<p>Delivery</p>
						</div>
						<div class="it51-float-right it51-delivery">
							<p></p>
							<a href="https://www.inthestyle.com/checkout/cart" class="it51-delivery-link">More delivery options available</a>
						</div>
					</div>
					<div class="it51-row">
						<div class="it51-float-left">
							<p>Discount</p>
						</div>
						<div class="it51-float-right it51-discount">
							<p></p>
						</div>
					</div>
					<div class="it51-row">
						<div class="it51-float-left it51-grandtotal-left">
							<p>Grand Total</p>
						</div>
						<div class="it51-float-right it51-grandtotal">
							<p></p>
						</div>
					</div>
				</div>
			`;
			const bottomRef = document.querySelector('.right-off-canvas-menu .block-cart .summary');
			if (bottomRef) {
				bottomRef.insertAdjacentHTML('afterend', subCheckout);
			}



			// Ajax basket page
			const getBasketData = (() => {

				const promise = new Promise((resolve, reject) => {
					$.ajax({
						url: '/checkout/cart',
						success: function(data) {
							const tempDiv = document.createElement('div');
							tempDiv.innerHTML = data;

							// Loop over elements for product ID's
							const productElements = tempDiv.querySelectorAll('#shopping-cart-table tbody tr');
							for (let i = 0; productElements.length > i; i++) {
								let productID = productElements[i].getAttribute('data-parent-id');
								let productWasprice = productElements[i].querySelector('.product-cart-price .orig-div .old-price .price');
                let productWasPriceText = null;
                
								if (productWasprice) {
									productWasPriceText = productWasprice.textContent;
                }
                // console.log(productWasprice, productWasPriceText);


								// Add a 'Was price' element if required
								let bagItems = document.querySelectorAll('.right-off-canvas-menu #cart-sidebar li.item');
								for (let j = 0; bagItems.length > j; j++) {
									// Bag Item ID
									let bagItemIdEl = bagItems[j].querySelector('.product-name');
									if (bagItemIdEl) {
										let bagItemID = bagItemIdEl.getAttribute('id');
										
										if (bagItemID !== productID) {
											continue
										}

                  }
                  

                  
									// Build "Was price"
									let wasP = `<p class="it51-wasprice">Was <span>${productWasPriceText}</span></p>`;
                  let hasWasPrice = bagItems[j].querySelector('.it51-wasprice');
                  
									if (hasWasPrice) {
										continue
                  }
                  
		
									// Mini basket price reference 
									if (productWasPriceText) {
										let miniPriceRef = document.querySelectorAll('.right-off-canvas-menu [id="'+productID+'"]');
										for (let z = 0; miniPriceRef.length > z; z++) {
											miniPriceRef[z].insertAdjacentHTML('afterend', wasP); 
										}
									}

								} //  End for
							} // end For


							/*
							*	Delivery content
							*/
							let deliveryOptions = tempDiv.querySelector('#shopping-cart-totals-table #shipping-method');
              const deliveryRef = document.querySelector('.it51-delivery p');
              
							if (deliveryOptions) {
								const deliveryOption = deliveryOptions.options[deliveryOptions.selectedIndex].text;

                if (deliveryRef) {
                  const deliveryText = deliveryOption.match(/([^\(]+)(\(.+\)\s+)?(\£[^\s]+)/);
									deliveryRef.innerHTML = deliveryText[1] + '<span>' + deliveryText[3] + '</span>';
								}
              } else { 
                const deliveryInput = tempDiv.querySelector('#basket-shipping-options-form table tr td input[checked="checked"]');
                if (deliveryInput) {
                  const deliveryTitle = deliveryInput.parentElement.nextElementSibling.firstChild; 
                  const deliveryPrice = deliveryInput.parentElement.nextElementSibling.lastElementChild;
                  const deliveryTitleOnly = deliveryTitle.textContent.replace(/\(.+\)/, ' ');
                  if (deliveryRef) {
                    deliveryRef.innerHTML = deliveryTitleOnly + ' ' + deliveryPrice.innerHTML;
                  }
                }
              }

             


							/*
							*	Discounts
							*/
							const discounting = (() => {
								let discountEl = tempDiv.querySelector('#shopping-cart-totals-table tbody tr:nth-of-type(2):not([id="bs:country"]) td.a-right span.price');
								let discountRef = document.querySelector('.right-off-canvas-menu .it51-discount p');
								if (discountEl) {
									let discountText = discountEl.textContent;
									// Get discount and subtotal figures
									let discountInt = discountText.replace('-£', '');
									discountInt = parseFloat(discountInt);

									let subtotalEl = document.querySelector('.right-off-canvas-menu .block-cart .summary .subtotal span.price');
									let subtotalText = subtotalEl.textContent.replace('£', '');
									let subtotalInt = parseFloat(subtotalText);

									// Deduct discount from subtotal
									let newSubtotal = subtotalInt - discountInt;
									newSubtotal = newSubtotal.toFixed(2);
									newSubtotal = '£' + newSubtotal;

									// Append to subtotal								
									subtotalEl.textContent = newSubtotal;

									// Append to mini basket
									discountRef.textContent = discountText;
								} else {
									if (discountRef) {
										discountRef.parentNode.parentNode.classList.add('it51-hide');
									}
								}
							})();


							/*
							*	Grand Total
							*/
							const grandTotal = (() => {
								const gtEl = tempDiv.querySelector('#shopping-cart-totals-table tfoot > tr td.a-right span.price');
								if (gtEl) {
									let gtText = gtEl.textContent;
									let gtRef = document.querySelector('.it51-subcheckout .it51-row .it51-grandtotal p');
									gtRef.textContent = gtText;
								}
							})();


							savings();


							/*
							*	Check if any items with savings
							*	in the mini bag, if not remove
							*	savings row
							*/
							const checkSavings = () => {
								const bagList = document.querySelectorAll('.right-off-canvas-menu #cart-sidebar li.item');
								let hasSavings = false;
								
								let hasSavingEl = document.querySelector('.right-off-canvas-menu li.item .it51-wasprice');
                let savingRow = document.querySelector('.right-off-canvas-menu .it51-row.it51-saving-row');
                

								if (hasSavingEl == null && savingRow) {
									savingRow.classList.add('it51-hide');
								} else if (savingRow) {
									savingRow.classList.remove('it51-hide');
								}

							}
							checkSavings();

						} // End of AJAX
					});
				});

			})();


			// Work out savings
			const savings = () => {
				let totalSavingForAllProducts = 0;
				// Get items from bag
				let bagItems = document.querySelectorAll('.right-off-canvas-menu .block-cart #cart-sidebar li.item');
				for (let i = 0; bagItems.length > i; i++) {
					
					let productSaving = 0;
					let productCost = 0;

					// Get number of products per item
					let itemAmount = bagItems[i].querySelector('.product-details > strong');
					if (itemAmount) {
						itemAmount = itemAmount.textContent;
					}


					// Get saving amount for each product
					let savingEl = bagItems[i].querySelector('.product-details .it51-wasprice > span');
					const savingRef = document.querySelector('.it51-saving p');

					if (savingEl) {
						let savingAmountText = savingEl.textContent;					
						savingAmountText = savingAmountText.replace('£', '');

						let savingInt = parseFloat(savingAmountText);

						// saving total per item
						let totalSavingForThisProduct = savingInt * itemAmount;
						
						productSaving += totalSavingForThisProduct;	
					}
					// console.log('was cost = '+productSaving);	

					// Cost of item
					const productCostItem = bagItems[i].querySelector('.product-details span.price');
					let totalProductCost = 0;
					if (productCostItem) {
						let productCostText = productCostItem.textContent; 
						productCostText = productCostText.replace('£', '');

						let productInt = parseFloat(productCostText);

						totalProductCost = productInt * itemAmount;

						productCost += totalProductCost;
					}
					// console.log('product cost = '+productCost);

					
					if (productSaving !== 0) {
						let savingPerProduct = (productSaving - productCost);
						totalSavingForAllProducts += savingPerProduct;
						
						savingRef.textContent = '-£' + totalSavingForAllProducts.toFixed(2);
						
          } 
          

          const removeLink = bagItems[i].querySelector('li.item .product-details a.link-remove');
          const editLink = bagItems[i].querySelector('li.item .product-details a.link-edit');
          editLink.insertAdjacentElement('afterend', removeLink);


          // If product is only in one size.
          let typeOfSize = bagItems[i].querySelector('li.item .product-details .item-options dd');
          if (typeOfSize) {
            typeOfSize = typeOfSize.textContent.trim();
            
            if (typeOfSize.match('ONE SIZE')) {
              const sizeLabel = bagItems[i].querySelector('li.item .product-details a.link-edit');
              sizeLabel.textContent = 'Edit item';
            }
          }
					
				}
			}

			/*
			*	Bottom CTA's to be changed
			*/
			if (VARIATION == 2) {

				const changeCTA = (() => {
          let checkoutBtn = document.querySelector('.right-off-canvas-menu .block-cart > .actions > button.btn-bag');
					if (checkoutBtn) {
            let checkoutText = checkoutBtn.textContent;
            checkoutBtn.setAttribute("onclick", "setLocation('https://www.inthestyle.com/checkout')");
            
						// Tracking
						checkoutBtn.addEventListener('click', function() {
							utils.events.send('IT051', 'Click', 'User clicked Checkout button V2', {sendOnce: true});
						});
					}

					let continueLink = document.querySelector('.right-off-canvas-menu > .right-off-canvas-toggle span span');
					if (continueLink) {
						continueLink.textContent = 'See full basket';
						continueLink.addEventListener('click', function(e) {
							e.preventDefault;
							// Tracking
							utils.events.send('IT051', 'Click', 'User clicked see full basket link V2', {sendOnce: true});
							window.location.href = 'https://www.inthestyle.com/checkout/cart';
						});
					}
				})();

			}
		}
		updateBag();


		/*
		*	Tracking elements:
		*		Checkout button
		*		Continue shopping link
		*		Checkout button V2
		*		See full basket V2
		*/
		if (VARIATION == 1) {
			const tracking = (() => {
				// V1 Tracking, V2 in code above.
				let checkoutBtn = document.querySelector('.right-off-canvas-menu .block-cart > .actions > button.btn-bag');
				let continueLink = document.querySelector('.right-off-canvas-menu > .right-off-canvas-toggle');
	
				if (checkoutBtn) {
					checkoutBtn.addEventListener('click', function() {
						utils.events.send('IT051', 'Click', 'User clicked checkout button V1', {sendOnce: true});
					});
				}
	
				if (continueLink) {
          const continueText = continueLink.textContent;
          if (continueText !== 'SEE FULL BASKET') {
            continueLink.addEventListener('click', function() {
              utils.events.send('IT051', 'Click', 'User clicked continue shopping link V1', {sendOnce: true});
            });
          }
				}
			})();
		}



		/*
		*	Watch for changes to the mini bag
		*/
		const miniBagList = document.querySelector('.right-off-canvas-menu');
		if (miniBagList) {
			UC.observer.connect(miniBagList, function() {
				updateBag();
				// checkSavings();  
			}, {
				config: {attributes: false, childList: true, subtree: false},
				throttle: 20
			});
		}
		



	};

	// Audience conditions
	const triggers = (options) => {
		// FullStory tagging
		utils.fullStory('IT051', 'Variation 1');

		activate();
	};

})();
