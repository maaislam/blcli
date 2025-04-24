import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const PJ003 = (() => {
	const activate = () => {
		document.body.classList.add('PJ003');

		const basketTest = () => {
			//list of all the pizzas 
			const pizzas = [
				'Premium Hawaiian', 'American Hot', 'Sausage & Pepperoni - The Papa\'s Favourite', 'Chicken Club', 'Papa\'s Double Pepperoni', 'Chicken BBQ', 'BBQ Chicken Classic',
				'The Works™', 'All the Meats™', 'The Mexican', 'The Greek', 'Garden Party', 'Hot Pepper Passion', 'Cheese & Tomato', 'BBQ Cheeseburger', 'BBQ Hog Roast', 'Great British BBQ',
			]

			const basket = document.getElementById('ctl00__objHeader_BasketSection'),
				basketDeal = document.getElementById('ctl00__objHeader_divDiscount'),
				thirtyoff = basketDeal.querySelector('.discountCont .item').textContent;

			if (thirtyoff.indexOf('33% off Pizzas Online') > -1) {
				//-----------------
				//Determines what in the basket is a pizza
				//----------------
				const checkItems = () => {
					const basketItems = basket.querySelectorAll('.itemCont');

					//loop through the pizza names
					for (let x = 0; x < pizzas.length; x++) {
						const pizzaName = pizzas[x];

						//loop through all basket items to check one is a pizza
						for (let i = 0; i < basketItems.length; i++) {
							const item = basketItems[i];
							const itemName = item.querySelector('.item').textContent.trim().replace(/ *\([^)]*\) */g, "");

							//if item matches any in the pizza list add class
							if (pizzaName === itemName) {
								item.classList.add('PJ003-isPizza');
							}
						}
					}
				}
				checkItems();

				//-----------------
				//Add price difference to pizzas
				//----------------	
				const priceDifference = () => {
					UC.poller(['.PJ003-isPizza'], () => {

						const pizzaInBasket = document.querySelectorAll('.PJ003-isPizza');

						//loop through all existing pizzas in basket to get the prices
						for (let index = 0; index < pizzaInBasket.length; index++) {
							const existingPizza = pizzaInBasket[index];

							const pizzaPrices = existingPizza.querySelector('.value');
							pizzaPrices.classList.add('PJ003-wasprice');

							const oldPrice = parseFloat(pizzaPrices.textContent.replace('£', ''));
							const priceSum = (33.00 / 100) * oldPrice;
							const newPrice = oldPrice - priceSum;


							//add the new price next to the old one
							const newPriceWrap = document.createElement('div');
							newPriceWrap.classList.add('PJ003-newprice');
							newPriceWrap.innerHTML = `<span>£${newPrice.toFixed(2)}</span>`;

							const removeLink = existingPizza.querySelector('.redLink');

							existingPizza.insertBefore(newPriceWrap, removeLink.nextSibling);

						}

					});

				}
				priceDifference();
			}

			//checkout in basket event
			const checkoutButton = document.querySelector('.basketItems .greenButton.checkOutOmnibar');
			checkoutButton.addEventListener('click', () =>{
				utils.events.send('PJ003', 'checkout click', 'PJ003 clicked checkout in mini basket', {
					sendOnce: true
				});
			});
		}

		//-----------------
		//Observers
		//----------------		

		//observer within the basket when elements such as quantity are clicked
		/*UC.poller(['#ctl00__objHeader_BasketSection'], () => {
			UC.observer.connect(document.getElementById('ctl00__objHeader_upHeaderBasket'), function () {
        UC.poller(['.discountCont .item','#ctl00__objHeader_divDiscount'], () => {
          basketTest();
        });
			}, {
				config: {
					attributes: true,
					childList: false,
					subtree: false
				},
				throttle: 1000
			});
		});

		//observe when the basket is opened & closed
		UC.observer.connect(document.getElementById('ctl00__objHeader_upOmnibar'), function () {
			UC.poller(['#ctl00__objHeader_BasketSection'], () => {
				//check if the new price is not already added to avoid duplicates
				if (!document.querySelector('.PJ003-newprice')) {
          UC.poller(['.discountCont .item','#ctl00__objHeader_divDiscount'], () => {
            basketTest();
          });
				}
			});
		}, {
			config: {
				attributes: false,
				childList: true,
				subtree: true
			},
			throttle: 1000
		});
    */ 
    window.prm.add_pageLoaded(function (sender, error) {
    try {
        basketTest();
    } catch (e) {}
    
    });


		//events
		const url = window.location.pathname;
		if(url.indexOf('basket-confirmation.aspx') > -1){
			const checkoutPageButton = document.getElementById('ctl00_cphBody_lbProceed');
			checkoutPageButton.addEventListener('click', () =>{
				utils.events.send('PJ003', 'checkout click', 'PJ003 clicked checkout on main basket', {
					sendOnce: true
				});
			});
		}

	}

	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
			'#ctl00__objHeader_upHeaderSummary',
			'#ctl00__objHeader_upOmnibar',
		], () => {
			utils.fullStory('PJ003', 'Variation 1');
			activate();
		});
	})();

})();