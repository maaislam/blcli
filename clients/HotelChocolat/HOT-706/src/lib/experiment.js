import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import billingAddress from './components/billingAddress';
import extras from './components/extras';
import handleRadioChange from './handlers/handleRadioChange';
import storeFormattedAddress from './helpers/storeFormattedAddress';
import { loadInitialState, observeDOM, setupInitialAddresses } from './helpers/utils';

const { ID, VARIATION } = shared;

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

      if (VARIATION === '2') { // change delivery text position...
        const deliveryTextElems = document.querySelectorAll('.delivery-qty-details');
        const deliveryTextElem = deliveryTextElems[index];
        shipmentElem.insertAdjacentElement('afterbegin', deliveryTextElem);
      }
    });

    if (sendToMultipleAddElem) sendToMultipleAddElem.classList.add(`${ID}__multipleBtn`);
  });

  pollerLite(['.shipment-gifting-container'], () => {
    document.body.classList.add(`${ID}__deliveryOptions`);

    const deliverToElem = document.querySelector('.deliver-to');
    const prefix = deliverToElem.querySelector('.prefix');

    deliverToElem.classList.add(`${ID}__deliverTo`);
    const prefixText = 'Delivery to';
    prefix.textContent = prefixText;

    const giftWrappers = document.querySelectorAll('.gifting-fields');
    giftWrappers.forEach((giftWrapper, index) => {
      const giftMessageElem = giftWrapper.querySelector('.shipment-item-details .content-asset p');
      const giftMessageImage = giftWrapper.querySelector('.gifting-options .gifting-icon');

      //change gift message text
      if (giftMessageElem) giftMessageElem.textContent = 'Add a Free Personalised Message';
      if (giftMessageElem) giftMessageElem.classList.add(`${ID}__giftMessageText`);
      //change gift message image
      if (giftMessageImage) giftMessageImage.setAttribute('src', 'https://blcro.fra1.digitaloceanspaces.com/HOT-706/personalised-message-image.png');


      //adding extras section
      const giftBagInputWrapper = giftWrapper.querySelector('.gifting-options-column.gifts-wrapper');
      if (giftBagInputWrapper) {
        giftBagInputWrapper.classList.add(`${ID}__hide`);
        giftWrapper.insertAdjacentHTML('beforeend', extras(ID, index));
      }
    });

    //collect from store address change
    const addressTitlePrefixElems = document.querySelectorAll('.deliver-to .prefix');
    addressTitlePrefixElems.forEach((prefixElem) => {
      if (prefixElem.textContent.trim().includes('Collect from:')) {
        prefixElem.textContent = 'Click & collect from';
      }
    });
  });

};

export default () => {

  setup();

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__address-option-link`)) {
      // console.log('address option link clicked');
      const giftOptionLinkElem = target.closest(`.checkout-tabs`);
      const sendingGiftElem = giftOptionLinkElem.querySelector('.edit-address a.add');

      sendingGiftElem.click();
    } else if (target.closest('.tab-nav-home-delivery')) { //Home delivery
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
      const giftWrapperElem = extraOptionElem.closest('.gifting-fields');

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

    if (target.closest(`#${ID}-giftbag`)) {
      const giftbagOptionElem = document.querySelector('label[for*="GIFTBAG"]');

      if (giftbagOptionElem) giftbagOptionElem.click();
    } else if (target.closest(`#${ID}-giftbox`)) {
      const giftboxOptionElem = document.querySelector('label[for*="HAMPER"]');

      if (giftboxOptionElem) giftboxOptionElem.click();
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  init()

  const form = document.querySelector('form.checkout-multi-shipping');
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

          const formattedAddress = deliveryToTextContent.replace(/, /g, "<br>");
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
    pollerLite(['.order-totals-table tbody'], () => {
      const orderSummaryTableElem = document.querySelector('.checkout-right .order-totals-table tbody');
      orderSummaryTableElem.classList.add(`${ID}__orderSummaryTable`);

      const orderSummaryRow = `<tr class="${ID}__orderSummaryRow"> <td>ORDER SUMMARY</td> </tr>`;
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
  });

  //Attach event listeners to all radio buttons
  document.querySelectorAll(`.${ID}__radio`).forEach(radio => {
    radio.addEventListener('change', (event) => handleRadioChange(ID, event));
  });

  loadInitialState();
  setupInitialAddresses(ID);
};
