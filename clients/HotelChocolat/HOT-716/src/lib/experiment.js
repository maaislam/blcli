import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import billingAddress from './components/billingAddress';
import extras from './components/extras';
import handleRadioChange from './handlers/handleRadioChange';
import getTotalProductQuantity from './helpers/getTotalProductQuantity';
import storeFormattedAddress from './helpers/storeFormattedAddress';
import { loadInitialState, observeDOM, setupInitialAddresses } from './helpers/utils';

const { ID, VARIATION } = shared;

const getWrapperIndex = (wrapper) => {
  const allWrappers = document.querySelectorAll('.shipment-gifting-container');
  return Array.from(allWrappers).indexOf(wrapper);
}

const saveSelection = (wrapperIndex, selectedOption, isOptionChecked) => {
  let storedSelections = JSON.parse(localStorage.getItem('giftSelections')) || {};
  storedSelections[wrapperIndex] = !isOptionChecked ? selectedOption : null; //isOptionChecked is negative here cause it's not updated yet, so the logic is reversed
  localStorage.setItem('giftSelections', JSON.stringify(storedSelections));
}

const applyStoredSelections = () => {
  let storedSelections = JSON.parse(localStorage.getItem('giftSelections')) || {};
  const allWrappers = document.querySelectorAll('.shipment-gifting-container');

  allWrappers.forEach((wrapper, index) => {
    if (storedSelections[index]) {
      const giftboxOptionElem = wrapper.querySelector('label[for*="HAMPER"]');
      const giftbagOptionElem = wrapper.querySelector('label[for*="GIFTBAG"]');

      const optionToSelect = storedSelections[index] === "giftbag"
        ? wrapper.querySelector(`#${ID}-giftbag`)
        : wrapper.querySelector(`#${ID}-giftbox`);

      const controlOptionToSelect = storedSelections[index] === "giftbag"
        ? giftbagOptionElem : giftboxOptionElem;

      const contentAssetElem = controlOptionToSelect.closest('.content-asset');
      const isControlOptionSelected = contentAssetElem.classList.contains('selected');

      if (optionToSelect) {
        optionToSelect.click(); // Trigger click to apply selection

        !isControlOptionSelected && controlOptionToSelect.click(); // Trigger click to apply selection
      }
    }
  });
}

const init = () => {
  pollerLite(['.shipment-container'], () => {
    document.body.classList.add(`${ID}__shippingAddress`);
    const shippingContainers = document.querySelectorAll('.shipment-container');
    const sendToMultipleAddElem = document.querySelector('.formactions [name="send-to-addresses"]');

    //adding billing address toggle design
    shippingContainers.forEach((shippingContainer, index) => {
      const shippingBlock = shippingContainer.querySelector('.shiptoaddress-block');
      const selectAddressOptionElem = shippingContainer.querySelector('.shiptoaddress-block .mask-wrapper .selector span');
      const shipmentElem = shippingContainer.querySelector('.shipment-item-s');

      //adding shipping delivery to text
      const deliveryToText = selectAddressOptionElem.textContent;

      const deliveryToHTML = `<div class="${ID}__deliveryToText">Delivery to <span>${deliveryToText}</span></div>`;
      if (!shippingContainer.querySelector(`.${ID}__deliveryToText`) && VARIATION === '1') {
        // only for variation 1
        shipmentElem.insertAdjacentHTML('afterbegin', deliveryToHTML);
      }

      shippingBlock.classList.add(`${ID}__hide`); //hide default shipping address select dropdown
      if (!shippingContainer.querySelector(`.${ID}__billingContainer`)) {
        shippingBlock.insertAdjacentHTML('beforebegin', billingAddress(ID, deliveryToText, index));
      }

      //change tab text content..
      const deliveryTabElem = shippingContainer.querySelector('[data-delivery-type="home"] a');
      const collectTabElem = shippingContainer.querySelector('[data-delivery-type="clickandcollect"] a');
      // const giftTabElem = shippingContainer.querySelector('[data-delivery-type="sms"] a');

      if (deliveryTabElem) deliveryTabElem.textContent = 'Delivery';
      if (collectTabElem) collectTabElem.textContent = 'Click & Collect';
      // if (giftTabElem) giftTabElem.textContent = 'Gift By Text';

      if (VARIATION === '2') {
        // change delivery text position...
        const deliveryTextElems = document.querySelectorAll('.delivery-qty-details');
        const deliveryTextElem = deliveryTextElems[index];
        shipmentElem.insertAdjacentElement('afterbegin', deliveryTextElem);
      }
    });

    if (sendToMultipleAddElem) sendToMultipleAddElem.classList.add(`${ID}__multipleBtn`);
  });

  pollerLite(['.shipment-gifting-container'], () => {
    document.body.classList.add(`${ID}__deliveryOptions`);
    // const deliverToElem = document.querySelector('.deliver-to');
    // const prefix = deliverToElem.querySelector('.prefix');

    // deliverToElem.classList.add(`${ID}__deliverTo`);
    // const prefixText = 'Delivery to';
    // prefix.textContent = prefixText;

    const giftWrappers = document.querySelectorAll('.shipment-gifting-container');
    giftWrappers.forEach((giftWrapper, index) => {
      const giftMessageElem = giftWrapper.querySelector('.shipment-item-details .content-asset p');
      const giftMessageImage = giftWrapper.querySelector('.gifting-options .gifting-icon');
      const giftOptionsElem = giftWrapper.querySelector('.gifting-options .gifting-options-column:not(.gifts-wrapper)');
      const giftTextAreaElem = giftWrapper.querySelector('.gift-message-text .input-textarea');
      const characterCountElem = giftWrapper.querySelector('.gift-message-text .char-count');
      const productItems = giftWrapper.querySelectorAll('.shipment-products .shipment-item-details');
      const basketDataElem = document.querySelector('input[name="basketData"]');

      //Add new header text for gift options section
      const giftOptionsHeader = `<div class="${ID}__giftOptionsHeader">Add Gifting Options</div>`;
      if (giftOptionsElem) giftOptionsElem.insertAdjacentHTML('beforebegin', giftOptionsHeader);

      //change gift message text
      if (giftMessageElem) giftMessageElem.textContent = 'Gift Message';
      if (giftMessageElem) giftMessageElem.classList.add(`${ID}__giftMessageText`);
      //change gift message image
      if (giftMessageImage)
        giftMessageImage.setAttribute(
          'src',
          'https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/gift-message-1.png'
        );

      //new gift message text and price
      const newGiftMessageHTML = `<div class="${ID}__giftMessageWrapper">
        <p class="${ID}__titleText">All Hotel Chocolat order comes with a greeting card. Add a personal note or left it blank.</p>
        <p class="${ID}__priceText">Free</p>
      </div>`;
      if (giftMessageElem) giftMessageElem.insertAdjacentHTML('afterend', newGiftMessageHTML);

      //adding extras section
      const giftBagInputWrapper = giftWrapper.querySelector('.gifting-options-column.gifts-wrapper');
      if (giftBagInputWrapper) {
        giftBagInputWrapper.classList.add(`${ID}__hide`);
        giftWrapper.insertAdjacentHTML('beforeend', extras(ID, index));
      }

      //change gift text area placeholder
      if (giftTextAreaElem) giftTextAreaElem.setAttribute('placeholder', 'Write your personal note here');

      //change character count text
      if (characterCountElem) {
        characterCountElem.innerHTML = `<span class="char-remain-count ${ID}__charCount">200</span> characters left`;
      }

      // add product items price
      const basketData = JSON.parse(basketDataElem.value);
      window.cartData = basketData;
      productItems.forEach((item) => {
        let basketProductObj = {};
        const detailsColumn = item.querySelector('.details-column');
        const columnWrapper = detailsColumn.closest('tr');
        // const productImageElem = detailsColumn.querySelector('img');
        // const productsImageSrc = productImageElem.src;
        // const basketProductObj = basketData.product.filter((cartItem) => productsImageSrc.includes(cartItem.product_ID));
        // const basketProductObj = basketData.product[index];
        const cardProductIdElement = item.querySelector('[data-og-product]');

        if (cardProductIdElement) {
          const cardProductId = cardProductIdElement.dataset.ogProduct || '';
          basketProductObj = basketData.product.filter((cartItem) => cardProductId === cartItem.product_ID);
        } else {
          const productNameElem = item.querySelector('.details-column .name');
          const productName = productNameElem.textContent.toLowerCase().trim();
          basketProductObj = basketData.product.filter((cartItem) => productName === cartItem.product_name.toLowerCase().trim());
        }

        if (basketProductObj) {
          const basketProductPrice = basketProductObj[0].product_price;
          const priceColumn = `<td class="${ID}__priceColumn">£${basketProductPrice}</td>`;
          columnWrapper.insertAdjacentHTML('beforeend', priceColumn);
        }
      });
    });

    //collect from store address change
    const addressTitlePrefixElems = document.querySelectorAll('.deliver-to .prefix');
    addressTitlePrefixElems.forEach((prefixElem) => {
      if (prefixElem.textContent.trim().includes('Collect from:')) {
        prefixElem.textContent = 'Click & collect from';
      }
    });

    //change delivery instruction text
    const deliveryInstructionElems = document.querySelectorAll('.do-not-open-wrapp .delivery-list-title');
    deliveryInstructionElems.forEach((deliveryInstructionElem) => {
      deliveryInstructionElem.textContent = 'Add Delivery Instructions';
      deliveryInstructionElem.classList.add(`${ID}__deliveryInstructionText`);
    });

    applyStoredSelections();
  });

  if (window.location.href.includes('dwcont') || window.location.href.includes('checkout/gift-options')) {
    pollerLite(['.order-totals-table tbody'], () => {
      const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
      const orderSummaryTableElem = document.querySelector('.checkout-right .order-totals-table tbody');
      orderSummaryTableElem.classList.add(`${ID}__orderSummaryTable`);

      // const qty = document.querySelectorAll('.qtycolumn')?.length;
      const qtyCount = getTotalProductQuantity(window.cartData);
      const orderSummaryRow = `<tr class="${ID}__orderSummaryRow"> 
        <td>ORDER SUMMARY (${qtyCount} ITEMS)</td> 
      </tr>`;
      if (!document.querySelector(`.${ID}__orderSummaryRow`)) {
        orderSummaryTableElem.insertAdjacentHTML('afterbegin', orderSummaryRow);
      }

      //table other rows content change
      const orderSubTotalElem = orderSummaryTableElem.querySelector('tr.order-subtotal td');
      orderSubTotalElem.textContent = 'Subtotal';

      const orderDeliveryElem = orderSummaryTableElem.querySelector('tr.order-shipping td');
      orderDeliveryElem.textContent = 'Delivery';

      const orderTotalElem = orderSummaryTableElem.querySelector('tr.order-total td');
      orderTotalElem.textContent = 'Total';

      const orderDeliveryPriceElem = orderSummaryTableElem.querySelector('tr.order-shipping td:last-child');
      orderDeliveryPriceElem.classList.add(`${ID}__orderDeliveryPrice`);
      const deliveryPrice = orderDeliveryPriceElem.textContent;
      if (!deliveryPrice.includes('From')) {
        orderDeliveryPriceElem.innerHTML = `From ${deliveryPrice}`;
      }

      //collect from store address change
      const addressTitlePrefixElems = document.querySelectorAll('.deliver-to .prefix');
      addressTitlePrefixElems.forEach((prefixElem) => {
        if (prefixElem.textContent.trim().includes('Collect from:')) {
          prefixElem.textContent = 'Click & collect from';
        }
      });

      //take address from delivery-to span
      const deliveryToElems = document.querySelectorAll('.deliver-to');
      const deliveryQtyDetailElems = document.querySelectorAll('.delivery-qty-details');

      deliveryQtyDetailElems.forEach((deliveryQtyDetailElem, index) => {
        const deliveryToElem = deliveryToElems[index];
        const deliveryQtyDetailText = deliveryQtyDetailElem.textContent.trim();
        const deliveryToAddress = deliveryToElem.querySelector('.prefix + span');
        let newDeliveryAddress = '';

        //if mobile then show only first and last line of address else show full address
        if (isMobile()) {
          const addressLines = deliveryToAddress.textContent.trim().split('\n').filter(line => line.trim() !== '');

          const name = addressLines[0];
          let secondPart = '';

          const possiblePostcode = addressLines.find(line => /\b([A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}|BFPO \d{1,4})\b/.test(line)); // Find UK postcode including BFPO
          if (possiblePostcode) {
            secondPart = possiblePostcode;
          } else if (addressLines[1]) {
            secondPart = addressLines[1];
          }

          secondPart = secondPart.includes(',') ? secondPart.split(',')[0] : secondPart; //remove comma from second part

          const truncatedText = `${name} ..., ${secondPart}`;
          newDeliveryAddress = `${deliveryQtyDetailText} - ${truncatedText}`
        } else {
          newDeliveryAddress = `${deliveryQtyDetailText} - ${deliveryToAddress.outerHTML}`;
        }

        deliveryQtyDetailElem.innerHTML = newDeliveryAddress;
      });
    });
  }
};

export default () => {
  newEvents.initiate = true;
  newEvents.method = ['ga4'];
  newEvents.property = 'G-B37NQR1RWZ';

  setup();

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__address-option-link`)) {
      const giftOptionLinkElem = target.closest(`.checkout-tabs`);
      const sendingGiftElem = giftOptionLinkElem.querySelector('.edit-address a.add');

      sendingGiftElem.click();
    } else if (target.closest('.tab-nav-home-delivery')) {
      //Home delivery
      const shipmentContainer = target.closest('.shipment-container');
      const deliveryToText = shipmentContainer.querySelector(`.${ID}__deliveryToText`);
      const selectAddressOptionElem = shipmentContainer.querySelector('.shiptoaddress-block .mask-wrapper .selector span');
      const deliveryToTextContent = selectAddressOptionElem.textContent;
      if (VARIATION === '1') deliveryToText.innerHTML = `Delivery to <span>${deliveryToTextContent}</span>`;
    } else if (target.closest(`.${ID}__editGiftAddress`)) {
      const shippingContainer = target.closest('.shipment-container');
      document.querySelectorAll(`.${ID}__activeEdit`).forEach((elem) => {
        elem.classList.remove(`${ID}__activeEdit`);
      });
      shippingContainer.classList.add(`${ID}__activeEdit`);

      const giftOptionLinkElem = target.closest(`.checkout-tabs`);
      const sendingGiftElem = giftOptionLinkElem.querySelector('.edit-address a.add');

      sendingGiftElem.click();
    } else if (target.closest(`.${ID}__edit-link`)) {
      const shippingContainer = target.closest('.shipment-container');
      document.querySelectorAll(`.${ID}__activeEdit`).forEach((elem) => {
        elem.classList.remove(`${ID}__activeEdit`);
      });
      shippingContainer.classList.add(`${ID}__activeEdit`);

      const editLinkElem = shippingContainer.querySelector('.edit-address a');

      editLinkElem.click();
    } else if (target.closest(`.${ID}__extra-option`)) {
      const extraOptionElem = target.closest(`.${ID}__extra-option`);
      const giftWrapperElem = extraOptionElem.closest('.shipment-gifting-container');

      const allExtraOptions = giftWrapperElem.querySelectorAll(`.${ID}__extra-option`);
      const inputElem = extraOptionElem.querySelector('input');

      allExtraOptions.forEach((extraOption) => {
        if (extraOption !== extraOptionElem) {
          extraOption.classList.remove(`${ID}__selected`);
          extraOption.querySelector('input').checked = false;
        }
      });

      extraOptionElem.classList.add(`${ID}__selected`);
      inputElem.checked = !inputElem.checked;
    } else if (target.closest('.edit-address .add')) {
      const shippingContainer = target.closest('.shipment-container');
      document.querySelectorAll(`.${ID}__activeEdit`).forEach((elem) => {
        elem.classList.remove(`${ID}__activeEdit`);
      });
      shippingContainer.classList.add(`${ID}__activeEdit`);
    }
  });

  document.body.addEventListener('pointerup', (e) => {
    const { target } = e;
    let parentContainer = null;
    let selectedOption = null;
    let selectedOptionLabelElem = null;

    if (target.closest(`#${ID}-giftbag`)) {
      const giftbagElem = target.closest(`#${ID}-giftbag`);
      const wrapper = giftbagElem.closest('.shipment-gifting-container');
      const giftbagOptionElem = wrapper.querySelector('label[for*="GIFTBAG"]');

      parentContainer = giftbagElem.closest('.shipment-gifting-container');
      selectedOption = "giftbag";
      selectedOptionLabelElem = target.closest(`#${ID}-giftbag`);

      if (giftbagOptionElem) {
        giftbagOptionElem.click();
        window.ABTastyClickTracking('Clicked Gift Bag');
      }
    } else if (target.closest(`#${ID}-giftbox`)) {
      const giftboxElem = target.closest(`#${ID}-giftbox`);
      const wrapper = giftboxElem.closest('.shipment-gifting-container');
      const giftboxOptionElem = wrapper.querySelector('label[for*="HAMPER"]');

      parentContainer = giftboxElem.closest('.shipment-gifting-container');
      selectedOption = "giftbox";
      selectedOptionLabelElem = target.closest(`#${ID}-giftbox`);

      if (giftboxOptionElem) {
        giftboxOptionElem.click();
        window.ABTastyClickTracking('Clicked Gift Box');
      }
    } else if (target.closest('label[for*="HAMPER"]') && VARIATION === 'control') {
      window.ABTastyClickTracking('Clicked Gift Box');
    } else if (target.closest('label[for*="GIFTBAG"]') && VARIATION === 'control') {
      window.ABTastyClickTracking('Clicked Gift Bag');
    }

    if (selectedOptionLabelElem) {
      const clickedOptionInputElem = selectedOptionLabelElem.querySelector('input[type="checkbox"]');
      if (parentContainer && selectedOption) {
        const wrapperIndex = getWrapperIndex(parentContainer);
        saveSelection(wrapperIndex, selectedOption, clickedOptionInputElem.checked);
      }
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  init();

  const form = document.querySelector('form.checkout-multi-shipping');
  const { href } = window.location;
  observeDOM(form, () => {
    //collect from store address
    const storePickupContainers = document.querySelectorAll('.store-pickup-container');
    if (storePickupContainers.length > 0) {
      storePickupContainers.forEach((container, index) => {
        const shipmentContainer = container.closest('.shipment-container');
        const deliveryToText = shipmentContainer.querySelector(`.${ID}__deliveryToText`);

        //collect from store address change
        const collectStoreTabElem = shipmentContainer.querySelector('.tab-nav-store-delivery');
        if (collectStoreTabElem && deliveryToText && collectStoreTabElem.classList.contains('ui-tabs-active')) {
          const storeNameElem = shipmentContainer.querySelector('.label.selector span');
          const selectedStoreName = storeNameElem.textContent.trim();
          if (!selectedStoreName.includes('Select a Store')) {
            deliveryToText.textContent = `Click & collect from ${selectedStoreName}`;
          }
        }

        //edit address data for billing address and gift address
        const shippingAddressElem = container.closest(`.${ID}__activeEdit`);

        if (shippingAddressElem) {
          const billingContainerElem = shippingAddressElem.querySelector(`.${ID}__billingContainer`);
          const activeRadioElem = billingContainerElem.querySelector(`.${ID}__radio:checked`); //get active radio button
          const activeOption = activeRadioElem.closest(`.${ID}__address-option`); //get active option elem
          const activeOptionValue = activeOption.dataset.option; //get active option value

          const shipToAddressBlockElem = billingContainerElem.nextElementSibling;
          const deliveryToTextElem = shippingAddressElem.querySelector(`.${ID}__deliveryToText`);

          const addressElem = activeOption.querySelector(`.${ID}__formattedAddress`);

          const selectAddressOptionElem = shipToAddressBlockElem.querySelector('.mask-wrapper .selector span');
          const selectAddressElem = shipToAddressBlockElem.querySelector('.mask-wrapper .selector select');
          const deliveryToTextContent = selectAddressOptionElem.textContent;
          //get selected address value e.g. 8aacfb599b56130fd7cb672726
          const selectedOptionValue = selectAddressElem.value;

          if (VARIATION === '1') deliveryToTextElem.innerHTML = `Delivery to <span>${deliveryToTextContent}</span>`;

          const formattedAddress = deliveryToTextContent.replace(/, /g, '<br>');
          addressElem.innerHTML = formattedAddress;
          addressElem.setAttribute('data-value', selectedOptionValue);

          if (activeOptionValue === 'billing') {
            // Store formatted address as billing address
            storeFormattedAddress('selectedAddresses', 'billingAddress', index, 'billing', formattedAddress, selectedOptionValue);
          } else if (activeOptionValue === 'gift') {
            // Store formatted address as gift address
            storeFormattedAddress('selectedAddresses', 'giftAddress', index, 'gift', formattedAddress, selectedOptionValue);
          }
        }
      });
    }

    //order summary page
    if (href.includes('dwcont') || href.includes('checkout/gift-options')) {
      pollerLite(['.order-totals-table tbody'], () => {
        const orderSummaryTableElem = document.querySelector('.checkout-right .order-totals-table tbody');
        orderSummaryTableElem.classList.add(`${ID}__orderSummaryTable`);

        const qtyCount = getTotalProductQuantity(window.cartData);
        const orderSummaryRow = `<tr class="${ID}__orderSummaryRow"> 
          <td>ORDER SUMMARY (${qtyCount} ITEMS)</td> 
        </tr>`;
        if (!document.querySelector(`.${ID}__orderSummaryRow`)) {
          orderSummaryTableElem.insertAdjacentHTML('afterbegin', orderSummaryRow);
        }

        //table other rows content change
        const orderSubTotalElem = orderSummaryTableElem.querySelector('tr.order-subtotal td');
        orderSubTotalElem.textContent = 'Subtotal';

        const orderDeliveryElem = orderSummaryTableElem.querySelector('tr.order-shipping td');
        orderDeliveryElem.textContent = 'Delivery';

        const orderTotalElem = orderSummaryTableElem.querySelector('tr.order-total td');
        orderTotalElem.textContent = 'Total';

        const orderDeliveryPriceElem = orderSummaryTableElem.querySelector('tr.order-shipping td:last-child');
        orderDeliveryPriceElem.classList.add(`${ID}__orderDeliveryPrice`);
        const deliveryPrice = orderDeliveryPriceElem.textContent;
        if (!deliveryPrice.includes('From')) {
          orderDeliveryPriceElem.innerHTML = `From ${deliveryPrice}`;
        }

        //collect from store address change
        const addressTitlePrefixElems = document.querySelectorAll('.deliver-to .prefix');
        addressTitlePrefixElems.forEach((prefixElem) => {
          if (prefixElem.textContent.trim().includes('Collect from:')) {
            prefixElem.textContent = 'Click & collect from';
          }
        });
      });
    }
  });

  //Attach event listeners to all radio buttons

  const allRadioElems = document.querySelectorAll(`.${ID}__radio`);
  if (allRadioElems.length > 0) {
    allRadioElems.forEach((radio) => {
      radio.addEventListener('change', (event) => handleRadioChange(ID, event));
    });
  }

  loadInitialState();
  setupInitialAddresses(ID);
};
