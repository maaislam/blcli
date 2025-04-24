/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import MiniBasket from './components/miniBasketMarkup';
import shared from './shared';
import { pollerLite } from '../../../../../lib/utils';
import scrollToElement from './components/scrollToEl';

export default () => {
  setup();

  const { ID } = shared;


  // check if product has been added
  const isAdded = () => {
    const url = window.location.href;
    if(url.indexOf('?didadd=1') > -1) {
      return true;
    }
  }

  const isProductPage = () => {
    if(document.body.classList.contains('catalog-product-view')) {
      return true;
    }
  }


  /*---------- Before product add  -----------*/

  if(isProductPage()) {
    const preventCartRedirect = () => {
      if(document.querySelector('#product_addtocart_form')) {
        const url = window.location.href;
        const returnHTML = `<input type="hidden" name="return_url" value="${url}?didadd=1">`;

        document.querySelector('#product_addtocart_form').insertAdjacentHTML('afterbegin', returnHTML);
      }
    }

    pollerLite(['.catalog-product-view', '#product_addtocart_form'], () => { 
      preventCartRedirect();
    });
    
  }

   /*---------- Check url has product added / show basket -----------*/

  // make basket redirect to cart 
  const miniBasketRedirect = () => {
    const basketSymbol = document.querySelector('.minicart-container .action.showcart');
    basketSymbol.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'https://www.merchoid.com/uk/checkout/cart/';
    });
  }

  const removeDidAddURL = () => {
       // remove the ?did add
    const query = window.location.search.substring(1)

    if(query.length) {
      if(window.history != undefined && window.history.pushState != undefined) {
          window.history.pushState({}, document.title, window.location.pathname);
      }
    }
  }

   /*-------
   // Basket show/hide functions
   --------*/

  // Move basket from mini cart to the new one
  const getBasket = () => {
    const miniCart = document.querySelector('.minicart-container .ui-dialog.ui-widget.ui-widget-content');
    document.querySelector(`.${ID}_miniBasketContainer .${ID}_basket-items_wrapper`).insertAdjacentElement('afterbegin', miniCart);
  }

  // Trigger the mini basket
  const showBasket = () => {
    const slideBasket = document.querySelector(`.${ID}_miniBasketContainer`);
    const overlay = document.querySelector(`.${ID}_overlay`);

    slideBasket.classList.add(`${ID}_basket-show`);
    overlay.classList.add(`${ID}_overlay-show`);

    document.body.classList.add(`${ID}__noScroll`);

    removeDidAddURL();
  }


  const hideAddedMessage = () => {
    const addedMessage = document.querySelector(`.${ID}_addedMessage`);
    if(addedMessage) {
      setTimeout(() => {
        addedMessage.style.display = 'none';
      }, 5000);
    }
  }

  // click events for close
  const closeBasketEvents = () => {
    const slideBasket = document.querySelector(`.${ID}_miniBasketContainer`);
    const overlay = document.querySelector(`.${ID}_overlay`);

    slideBasket.classList.remove(`${ID}_basket-show`);
    overlay.classList.remove(`${ID}_overlay-show`);

    document.body.classList.remove(`${ID}__noScroll`);

  }

   // Close the basket events
   const triggerClose = () => {
    const overlay = document.querySelector(`.${ID}_overlay`);
    const closeBasket = document.querySelector(`.${ID}_miniBasketContainer .${ID}_basket-close`);
    const continueShopping = document.querySelector(`.${ID}_miniBasketContainer .${ID}_link`);

    overlay.addEventListener('click', () => {
      closeBasketEvents();
    });

    closeBasket.addEventListener('click', () => {
      closeBasketEvents();
    });

    continueShopping.addEventListener('click', () => {
      closeBasketEvents();
    });

  }

  /*-------
   // Basket content changes
   --------*/

  // move products and add event listeners to CTAs
  const innerBasketChanges = () => {
    const slideOutBasket = document.querySelector(`.${ID}_miniBasketContainer`);
    const products = slideOutBasket.querySelector(`.ui-dialog.ui-widget.ui-widget-content .minicart-items`);
    slideOutBasket.querySelector(`.${ID}-products`).appendChild(products);

    // add total
    const productItemAmount = slideOutBasket.querySelector('.items-total .count');
    if(productItemAmount) {
      slideOutBasket.querySelector(`.${ID}_basketAmount span`).textContent = productItemAmount.textContent;
    }

    // add price
    const basketTotal = slideOutBasket.querySelector('.amount.price-container');
    if(basketTotal) {
      slideOutBasket.querySelector(`.${ID}-price`).textContent = basketTotal.textContent;
    }

    // button events
    
    const paypal = document.querySelector('.paypal.checkout');
    slideOutBasket.querySelector(`.${ID}_button.${ID}_paypal`).appendChild(paypal);
    paypal.querySelector('input').setAttribute('src', '//cdn.optimizely.com/img/6087172626/5c15d2469827474cb3faf552a3ff33a3.png');
    paypal.querySelector('input').removeAttribute('alt');
    /*slideOutBasket.querySelector(`.${ID}_button.${ID}_paypal`).addEventListener('click', () => {
      const paypalCheckout = slideOutBasket.querySelector('.paypal.checkout.paypal-logo input');
      paypalCheckout.click();
    });*/
  }

  const basketProductChanges = () => {
    setTimeout(() => {
      const basketProducts = document.querySelectorAll(`.${ID}_miniBasketContainer .item`);
      for (let index = 0; index < basketProducts.length; index += 1) {
        const element = basketProducts[index];
        
        // add remove button
        element.insertAdjacentHTML('afterbegin', `<div class="${ID}_remove"></div>`);
  
        const productQTY = element.querySelector('.details-qty.qty input');
        if(productQTY) {
          // recreate qty
          const newQty = document.createElement('div');
          newQty.classList.add(`${ID}_productActions`);
          newQty.innerHTML = `<div class="${ID}-qty">Qty: ${productQTY.value}</div><a href="/checkout/cart/">Edit</a>`;
          element.querySelector('.product-item-pricing').insertAdjacentElement('afterbegin', newQty);
        }
  
        // add removed product to storage so it can be removed on basket page
        element.querySelector(`.${ID}_remove`).addEventListener('click', () =>{
          const elName = element.querySelector('.product-item-name a').textContent;
          sessionStorage.setItem(`${ID}_product`, elName);
          console.log('clicked remove');
         // removeDidAddURL();
          window.location.href = 'https://www.merchoid.com/uk/checkout/cart/';
        });
      }
    }, 800);
  }


  const addScarcity = () => {
    const firstProduct = document.querySelector(`.${ID}-products .minicart-items .item`);

      pollerLite([`.${ID}-products .minicart-items .item`], () => {
        firstProduct.insertAdjacentHTML('beforeend', `<div class="${ID}-scarcity"><span>Less than 3 available!</span>2 people have this in their basket</div>`);
      });
  }

  // add name to storage, direct to basket, remove matching
  const removeItemOnBasket = () => {
    
    const removingProduct = sessionStorage.getItem(`${ID}_product`);

    // loop through the items and find the matching one
    const basketItems = document.querySelectorAll('.cart.table-wrapper .cart.item');
    for (let index = 0; index < basketItems.length; index +=1) {
      const element = basketItems[index];
      const elName = element.querySelector('.product-item-name a');

      // click remove on the matching product
      if(elName) {
        if(elName.textContent === removingProduct) {
          setTimeout(() => {
            element.querySelector('.action.action-delete').click();
            sessionStorage.removeItem(`${ID}_product`);
          }, 1000);
          return;
        }
      }
    }
  }

  /*-------
   // Run on adding of product
   --------*/

  if(isAdded()) {
    pollerLite([
      '.price-container.amount .price-wrapper',
      '.paypal.checkout',
      '.minicart-container .ui-dialog.ui-widget.ui-widget-content', 
      '.minicart-items .item',
      '.minicart-items .product-image-container',
      '.price-container > .price-wrapper > .price-including-tax > .minicart-price > .price',
      '.minicart-container .amount.price-container',
      '.details-qty.qty input',
      '.counter.qty .counter-number',
      '.action.viewcart',
      () => {
        const img = document.querySelector('.minicart-items .product-image-photo');
        return img && img.src;
      }
    ], () => {

       // build and add mini basket wrapper
      const basket = new MiniBasket();
      getBasket();
      miniBasketRedirect();
      // remove session storage
      if(sessionStorage.getItem(`${ID}_product`)) {
        sessionStorage.removeItem(`${ID}_product`);
      }

      pollerLite([
        `.${ID}_miniBasketContainer .item`,
        `.${ID}_miniBasketContainer .item .details-qty.qty input`,
         `.${ID}_miniBasketContainer .product-item-name`,
         `.${ID}_miniBasketContainer .product-item-pricing`,
         `.${ID}_miniBasketContainer .paypal.checkout.paypal-logo input`,
       ], () => {
         showBasket();
         triggerClose();
         innerBasketChanges();
         basketProductChanges();
         addScarcity();
         hideAddedMessage();
       });
    });
  }


  /*-------
   // Basket page 
   --------*/

  if(window.location.href.indexOf('/checkout/cart/') > -1) {
    // if remove has been clicked
    if(sessionStorage.getItem(`${ID}_product`)) {
      // loop through the items and find the matching one
      pollerLite([
        '.price-container.amount .price-wrapper',
        '.price-container > .price-wrapper > .price-including-tax > .minicart-price > .price',
        '.cart.table-wrapper .cart.item .action.action-delete', 
        '.product-item-name a',
        '#form-validate',
        '.lazy.product-image-photo',
        '.totals.sub',
      ], () => {
        removeItemOnBasket();
      });
    }

     // if url has add voucher code, smooth scroll to it
    if(window.location.href.indexOf('?voucherAdd=1') > -1) {
      scrollToElement(document.querySelector('#block-discount'));
      setTimeout(() => {
        document.querySelector('#block-discount .title').click();
      }, 800);
      removeDidAddURL();
    }
  }
};
