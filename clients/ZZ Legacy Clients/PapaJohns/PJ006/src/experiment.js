import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const PJ006 = (() => {
    let $ = null;
    
	const activate = () => {
    document.body.classList.add('PJ006');

    window.UC = window.UC || {};
    window.UC.experiments = window.UC.experiments || [];
    window.UC.experiments['PJ006'] = {};
    window.UC.experiments['PJ006'].pollers = [];
			
		const pizzaPage = () => {
		
			//loop through all items, add the new add to bag button
			const allPizzas = document.querySelectorAll('.menuList');

			for (let i = 0; i < allPizzas.length; i++) {
				const element = allPizzas[i];

				const addToBasketButton = element.querySelector('.greenButton').getAttribute('href');
				
				const newAddTobag = document.createElement('div');
				newAddTobag.classList.add('PJ006-addButton');
				newAddTobag.innerHTML = `<a href="${addToBasketButton}">Add to Cart</a>`;

				element.querySelector('.quantCustomise .buttons').appendChild(newAddTobag);

				//replace the description with just the read more link
				const productDesc = element.querySelector('.description');
				if(productDesc.querySelector('a')){
					const moreInfoLink = productDesc.querySelector('a').getAttribute('href')
				
					const productTitle = element.querySelector('.titleWithIcon');

					productTitle.appendChild(productDesc);
					productDesc.innerHTML = `<a href="${moreInfoLink}">More Info...</a>`;
				}
			}
		}	
		pizzaPage();

		//If the page changes but does not refresh

    let basketHiddenValue = document.getElementById('hdnBasketValue').value;
    const basketVal = setInterval(() => {
      const basketValue = document.getElementById('hdnBasketValue').value;
      if (basketValue !== basketHiddenValue) {
        basketHiddenValue = basketValue;
        utils.destroyPollers('PJ006'); 
        if(!document.querySelector('.PJ006-addButton')){
          pizzaPage();
        }
      }
    }, 200);
	}

	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
			'#ctl00__objHeader_upOmnibar',
			'.menuList',
		], () => {
			utils.fullStory('PJ006', 'Variation 1');
			activate();
		});
	})();

})();