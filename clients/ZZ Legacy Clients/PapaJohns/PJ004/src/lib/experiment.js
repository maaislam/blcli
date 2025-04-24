import * as UC from '../../../../../lib/uc-lib';
import * as utils from '../../../../../lib/utils';

/**
 * Match the items in the basket to items currently displayed on the page.
 * Identifies a page item with a class and number of items in basket
 */
export const matchBasketItemsToPageItemsMobile = () => {
	const $form = document.querySelector('#aspnetForm');
	const $mobileBasket = $form.querySelector('#ctl00__objHeader_upHeaderBasketMobile');

  //loop through all the basket items 
  const basketRows = $mobileBasket.querySelectorAll('.intBasket tr');

  for (let index = 0; index < basketRows.length; index++) {
    const element = basketRows[index];

    const productBasketName = element.querySelector('.pizzaName .pizza-title-b');
    //if product quantity exists
    if(element.querySelector('.quantity .aspNetDisabled.txtField')){
      const quantity = element.querySelector('.quantity .aspNetDisabled.txtField').value;

      if (productBasketName) {
        const productPageNames = document.querySelectorAll('.menuList .titleWithIcon span');
        //loop through all the product names on the product listing page
        for (let j = 0; j < productPageNames.length; j++) {
          const name = productPageNames[j];

          const productNameText = name.textContent.trim();
          const basketItemText = productBasketName.textContent.trim();

          //if the basket product name match any of the products on the page
          if (basketItemText.indexOf(productNameText) > -1) {
            const productWrapper = name.parentNode.closest('.menuList');
            productWrapper.classList.add('PJ4-inbasket');
            if(quantity) {
              if(productWrapper.getAttribute('pj4-amount')) {
                productWrapper.setAttribute(
                  'pj4-amount', 
                  parseInt(quantity) + parseInt(productWrapper.getAttribute('pj4-amount'))
                );
              } else {
                productWrapper.setAttribute('pj4-amount', quantity);
              }
            }
          }
        }
      }
    }
  }
};	

/**
 * Adds a label to a page item product
 */
export const addLabel = () => {
  const inBasketLabelPoller = UC.poller(['.PJ4-inbasket'], () => {
    utils.events.send('PJ004','Message shown','PJ004 message has been shown',{sendOnce:true});

    const productInBasket = document.querySelectorAll('.PJ4-inbasket');
    for (let l = 0; l < productInBasket.length; l++) {
      const productListing = productInBasket[l];
      const productQuantity = productListing.getAttribute('pj4-amount');
      if(productQuantity){
        const inBasketLabel = document.createElement('div');
        inBasketLabel.classList.add('PJ4-inBasket_label');
        inBasketLabel.innerHTML = `<span class="PJ4-text"><span>${productQuantity}</span> in your basket</span>`;
        productListing.insertBefore(inBasketLabel,productListing.firstChild);
      }
    }
  });

  window.UC.experiments['PJ004'].pollers.push(inBasketLabelPoller);
};

/**
 * This identifies matching products in basket and product page
 * items but that information can only be inferred after __doPostBack is called
 * and a quick open-close of the header has been performed
 */
export const matchBasketItemsToPageItemsDesktop = () => {
  /**
   * Close the header
   */
  function toggleCloseHeader() {
    const closeBasketPoll = UC.poller(['#ctl00__objHeader_lbCloseOnmibar4'], () => {
      __doPostBack('ctl00$_objHeader$lbCloseOnmibar4','');
      document.querySelector('.omnibar').classList.remove('PJXXX_forceHide');
    });
    window.UC.experiments['PJ004'].pollers.push(closeBasketPoll);
  }	

  /**
   * Load the header
   */
  function toggleLoadHeader() {
    __doPostBack('ctl00$_objHeader$lbBasketItem','');

    const basketPoll = UC.poller(['#ctl00__objHeader_divBasket'], () => {
      // -----------------------------------------------------
      // Once the basket exists and is on the page... add the
      // -----------------------------------------------------
      const closeBasket = document.getElementById('ctl00__objHeader_lbCloseOnmibar4');
      closeBasket.addEventListener('click', () => {
        utils.events.send('PJ004', 'basket close', 'PJ004 basket dropdown closed', {sendOnce: true});
      });

      // -----------------------------------------------------
      // Remove classes that make the basket look open
      // -----------------------------------------------------
      const mainPoll = UC.poller(['.main.fadeAway'], () => {
        document.querySelector('.omnibar').classList.add('PJXXX_forceHide');
        document.querySelector('.main.fadeAway').classList.remove('fadeAway');
        document.querySelector('.basket.active').classList.remove('active');
        document.querySelector('.basket .arrow.arrowUp').classList.remove('arrowUp');
        document.querySelector('.basket .arrow').classList.add('arrowDown');
      });

      window.UC.experiments['PJ004'].pollers.push(mainPoll);

      // -----------------------------------------------------
      // Once the basket exists and is on the page... add the
      // classes to the corresponding basket and page items
      // -----------------------------------------------------
      const $desktopBasket = document.getElementById('ctl00__objHeader_divBasket');
      const basketItems = $desktopBasket.querySelectorAll('.itemCont');

      for (let x = 0; x < basketItems.length; x++) {
        const desktopBasketitem = basketItems[x];
        const productBasketName = desktopBasketitem.querySelector('.item');
        
        //if product quantity exists
        if (desktopBasketitem.querySelector('.aspNetDisabled.txtField')) {
          const basketQuantity = desktopBasketitem.querySelector('.aspNetDisabled.txtField').value;

          if (productBasketName) {
            const productPageNames = document.querySelectorAll('.menuList .titleWithIcon span');
            //loop through all the product names on the product listing page
            for (let j = 0; j < productPageNames.length; j++) {
              const name = productPageNames[j];
              
              const productNameText = name.textContent.trim();
              const basketItemText = productBasketName.textContent.trim().replace(/ *\([^)]*\) */g, "");

              //if the basket product name match any of the products on the page
              if (basketItemText === productNameText) {
                const productWrapper = name.parentNode.closest('.menuList');
                productWrapper.classList.add('PJ4-inbasket');
                if(basketQuantity){
                  if(productWrapper.getAttribute('pj4-amount')) {
                    productWrapper.setAttribute(
                      'pj4-amount', 
                      parseInt(basketQuantity) + parseInt(productWrapper.getAttribute('pj4-amount'))
                    );
                  } else {
                    productWrapper.setAttribute('pj4-amount', basketQuantity);
                  }
                }
              }
            }
          }
        }
      }
    });
    
    window.UC.experiments['PJ004'].pollers.push(basketPoll);

    toggleCloseHeader();				
  }

  toggleLoadHeader();
}
