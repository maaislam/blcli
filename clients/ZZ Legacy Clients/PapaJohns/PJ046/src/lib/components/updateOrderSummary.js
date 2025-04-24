import { events } from '../../../../../../lib/utils';
import { pollerLite } from '../../../../../../lib/uc-lib';
import makeFirstLetterUppercase from './makeFirstLetterUppercase';
import state from '../state';
import { updateBottomBar } from './bottomBar';

export const updateBaseInSummary = (value) => {
  const span = document.querySelector('.PJ046-base-span');
  if(span) {
    span.innerHTML = value;
  }
}

export const updateSizeInSummary = (value) => {
  const span = document.querySelector('.PJ046-size-span');
  if(span) {
    span.innerHTML = value;
  }
}

export default () => {
  // CYO Details
  const customisePizza = document.querySelector('.customisePizza');
  customisePizza.classList.add('PJ046-topOrderSummary');
  const customiseBox = customisePizza.querySelector('.customiseBox');
  let totalPrice = '£0.00 ';
  if (state.baseChosen && state.sizeChosen) {
    totalPrice = document.querySelector('h1.price').innerText.trim();
  }

  const detailsContainer = `<div class='PJ046-cyo__details-wrapper'>
    <div class='PJ046-cyo__details-title'>Create Your Own Pizza</div>
    <div class='PJ046-cyo__details-price'>Total: <span>${totalPrice}</span></div>
  </div>`;
  customiseBox.querySelector('input').insertAdjacentHTML('afterend', detailsContainer);

  customiseBox.querySelector('.addToFavsCont a.greenButton span.centerB').innerHTML = 'Add To Basket';

  // CYO Add To Basket CTA
  const newCtaBtn = `<div class='PJ046-addToBasket greenButton'>
    <span class='leftB'></span>
    <span class='centerB'>Add To Basket</span>
    <span class='rightB'></span>
  </div>`;
  customiseBox.querySelector('input.quantity').insertAdjacentHTML('afterend', newCtaBtn);

  // Input - / +
  const inputQuantityHTML = customiseBox.querySelector('input.quantity').outerHTML;
  customiseBox.querySelector('input.quantity').outerHTML = `<div class='PJ046-quantity__input'>
    <span class='PJ046-minus'></span>
    ${inputQuantityHTML}
    <span class='PJ046-plus'></span>
  </div>`;

  /* Input Event Listener */
  pollerLite(['#ctl00_cphBody__objCustomise_txtQuantity.quantity'], () => {
    const plus = document.querySelector('.PJ046-plus');
    const minus = document.querySelector('.PJ046-minus');

    plus.addEventListener('click', () => {
      const numberOfPizzas = parseInt(document.querySelector('#ctl00_cphBody__objCustomise_txtQuantity.quantity').value);
      document.querySelector('#ctl00_cphBody__objCustomise_txtQuantity.quantity').value =	numberOfPizzas + 1;

      events.send('PJ046', 'did-click-plus-qty');
    });

    minus.addEventListener('click', () => {
      const numberOfPizzas = parseInt(document.querySelector('#ctl00_cphBody__objCustomise_txtQuantity.quantity').value);
      if (numberOfPizzas > 1) {
        document.querySelector('#ctl00_cphBody__objCustomise_txtQuantity.quantity').value =	numberOfPizzas - 1;
      }

      events.send('PJ046', 'did-click-minus-qty');
    });
  });

  // --------------------------------------
  // CYO Details List
  // If user hasn't selected base yet, then show "Select" on the Base
  // Check Base Chosen
  // --------------------------------------
  let baseChosen = 'Select';
  if (state.baseChosen) {
    baseChosen = document.querySelector('.PJ046-base_section .PJ046-bases .PJ046-base_active > .PJ046-base_name').innerText;
    baseChosen = makeFirstLetterUppercase(baseChosen);
  }

  // Check Size Chosen
  let sizeChosen = 'Select';
  if (state.sizeChosen) {
    sizeChosen = document.querySelector('.PJ046-size_section .PJ046-sizes .PJ046-size_active > .PJ046-size_name').innerText;
    if (sizeChosen !== 'XXL') {
      sizeChosen = makeFirstLetterUppercase(sizeChosen);
    }
  }

  // --------------------------------------
  // Check Toppings Chosen
  // --------------------------------------
  let toppingsSelectedArray = [];
  let toppingsSelected = 'Select';
  const ingredientsList = document.querySelector('#ctl00_cphBody__objCustomise_upCustomise .ingredients');
  if (ingredientsList && ingredientsList.children.length > 0) {
    for (let i = 0; i < ingredientsList.childElementCount; i += 1) {
      toppingsSelectedArray.push(ingredientsList.children[i].innerText.trim().replace(' Delete', ''));
    }
  }
  if (toppingsSelectedArray.length !== 0) {
    toppingsSelected = '';
    for (let i = 0; i < toppingsSelectedArray.length; i += 1) {
      if (i !== toppingsSelectedArray.length - 1) {
        toppingsSelected += ` ${toppingsSelectedArray[i].trim()},`;
      } else {
        toppingsSelected += ` ${toppingsSelectedArray[i]}`;
      }
      
    }
  }
  const characteristsContainer = customiseBox.querySelector('.characteristics');
  const orderDetails = `<div class='PJ046-characteristics__wrapper'>
    <ul>
      <li>Base: <span class="PJ046-base-span">${baseChosen}</span></li>
      <li>Size: <span class="PJ046-size-span">${sizeChosen}</span></li>
      <li>Toppings: <span>${toppingsSelected}</span></li>
      <div id="PJ046-removeAllCheese__msg" class="errorMessage removeCheeseCustomise" style='display: none;'>
        <p>All cheese will be removed from your pizza.</p>                  
      </div>
      <div id="PJ046-removeAllCheese__error" class="errorMessage" style='display: none;'>
        <p>You must have at least one topping selected</p>
      </div>
    </ul>
  </div>`;
  characteristsContainer.insertAdjacentHTML('afterbegin', orderDetails);

  // Validation
  const validationRules = [
    {
      message: 'Please go back and choose a size',
      condition: () => document.querySelectorAll('.PJ046-size_active').length > 0
    }
  ];

  /* New 'Add to card' CTA Button Event Listener */
  pollerLite(['#ctl00_cphBody__objCustomise_divLabelAdd a.greenButton', 'div.PJ046-addToBasket.greenButton'], () => {
    const addToCardHiddenCta = document.querySelector('#ctl00_cphBody__objCustomise_divLabelAdd a.greenButton');
    const addToCardNewCta = document.querySelector('div.PJ046-addToBasket.greenButton');
    addToCardNewCta.addEventListener('click', () => {
      // Validation
      let errorMessage = '';
      validationRules.forEach((rule) => {
        if(!rule.condition()) {
          errorMessage += (rule.message + '. ');
        }
      });

      if(errorMessage !== '') {
        // Validation message
        events.send('PJ046', 'user-saw-validation-error');
        //alert(errorMessage);
        return;
      }

      window.__doPostBack(addToCardHiddenCta.id.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');

      events.send('PJ046', 'add-to-cart-main-clicked');
    });
  });

  /* If there is Error Message for Remove All Cheese, then show */
  pollerLite(['#ctl00_cphBody__objCustomise_pnlTooFewToppingError.errorMessage'], () => {
    const newNoCheeseError = document.querySelector('#PJ046-removeAllCheese__error');
    if (newNoCheeseError) {
      newNoCheeseError.style.display = 'block';
    }
  });

  /* If Remove All Cheese is selected, then show message in Order Summary */
  pollerLite(['#ctl00_cphBody__objCustomise_pnlCheeseRemove.errorMessage.removeCheeseCustomise', '.PJ046-cheese_section .noCheese .PJ046-cheeseBtn .removeBtn'], () => {
    const newNoCheeseMessage = document.querySelector('#PJ046-removeAllCheese__msg');
    if (newNoCheeseMessage) {
      newNoCheeseMessage.style.display = 'block';
      const removeCheeseBtn = document.querySelector('.PJ046-cheese_section .noCheese .PJ046-cheeseBtn .removeBtn');
      removeCheeseBtn.classList.remove('active');
      removeCheeseBtn.innerText = 'I want cheese';
      document.querySelector('.noCheese').classList.add('PJ046-cheese_active');
    }
  });

  // Create bottom bar
  const price = document.querySelector('.PJ046-cyo__details-price');
  if(price) {
    updateBottomBar(price ? price.innerText.trim() : null);
  }
};
