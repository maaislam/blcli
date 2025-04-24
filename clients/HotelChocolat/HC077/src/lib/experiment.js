import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  let alreadyInBasket = true;

  const checkBasketData = () => {
    // --- GET BASKET CONTENT DATA
    return new Promise((resolve, reject) => {
      
        let basketData = document.querySelector('input[name="cartData"]').value;
        let basketContent = JSON.parse(basketData);

        let productsInBasket = basketContent.product;
        const prodSku = document.querySelector('#pid').value;

       

        Object.keys(productsInBasket).forEach((i) => {
          const data = productsInBasket[i];


          if (prodSku !== data.product_SKU) {
            alreadyInBasket = false;
            resolve();
            
          } else {
            alreadyInBasket = true;
            reject();
          }
        });

       
    });
  }


  const addToBag = (sku, qty) => {
    window.jQuery.ajax({
      url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
      type: 'post',
      data: `Quantity=${qty}&cartAction=add&pid=${sku}`,
      success:function(){
        window.location.reload();
      }
    });
   
  }

  const MixMatchContainer = () => {
    document.documentElement.classList.add(`${ID}-offersShow`);

    fireEvent('Offers shown');

    const offerText = document.querySelector('.promotion-callout').textContent.trim().replace('MIX & MATCH', '');
    const amount = offerText.match(/[\d]{1}(\s)(for).*[£0-9]{2,4}|[\d]{1}(\s)(Selectors|Little Tipples|Macarons|Batons)(\s)(for)(\s)[£0-9]{2,4}/gm);

    // get qty from both offers
    let secondQTY;

    const firstQty = amount[0].match(/[\d]{1}/);
    if(amount[1]) {
      secondQTY = amount[1].match(/[\d]{1}/);
    }

    const addMultiple = document.createElement('div');
    addMultiple.classList.add(`${ID}-mixAndMatch`);
    addMultiple.innerHTML = `
    <h3>Special Offer</h3>
    <div class="${ID}-offerLinks">
      <div class="${ID}-offer">Buy ${amount[0].replace(/Selectors|Batons/, '')}</div>
      ${amount[1] ? `<div class="${ID}-offer ${ID}-second">Buy ${amount[1]}</div>`: ''}
    </div>
    <a href="https://www.hotelchocolat.com/uk/shop/collections/prices/special-offers/">View all Mix & Match</a>`;

    document.querySelector('#product-content .promotion').insertAdjacentElement('beforebegin', addMultiple);


    // Add products to bag
    const firstOffer = document.querySelector(`.${ID}-offer`);
    const secondOffer = document.querySelector(`.${ID}-offer.${ID}-second`);
    const prodSku = document.querySelector('#pid').value;

    firstOffer.addEventListener('click', (e) => {
      const offerText = e.currentTarget.textContent;
      addToBag(prodSku, firstQty);
      fireEvent('Clicked offer ' + offerText);
    });

    if(secondOffer) {
      secondOffer.addEventListener('click', (e) => {
        const SecondofferText = e.currentTarget.textContent;
        addToBag(prodSku, secondQTY);
        fireEvent('Clicked offer ' + SecondofferText);
      });
    }

    document.querySelector(`.${ID}-mixAndMatch a`).addEventListener('click', () => {
      fireEvent('Clicked view all mix and match'); 
    });

  }

  // if products already in basket, wait for promise
  let basketData = document.querySelector('input[name="cartData"]').value;
  let basketContent = JSON.parse(basketData);
  let productsInBasket = basketContent.product;

  if(productsInBasket && productsInBasket.length !== 0) {
    checkBasketData().then(() => {
      if(alreadyInBasket === false) {
        MixMatchContainer();
      }
    });

  // run test if basket is empty
  } else {
    MixMatchContainer();

  }


};
