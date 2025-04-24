import settings from '../settings';
import pubSub from '../PublishSubscribe';
import cache from '../cache';
import { getTextNodesRecursive } from '../dom';
import { observer } from '../../../../../../lib/uc-lib';
import { linkElementsClicked } from '../linkage';
import { doAddressesMatch, setAlternativeAddressAsChosen, setBillingAddressAsChosen, setDeliverToStore } from './address';

/**
 * Helper get existing delivery methods
 *
 * @access private
 */
const getExistingDeliveryMethods = () => {
  const methods = cache.get('delivery-method-container').querySelectorAll('.deliveryOptionLabel');

  const result = [];
  methods.forEach((method) => {
    const methodTexts = getTextNodesRecursive(method);
    result.push({
      node: method,
      checked: method.previousElementSibling.checked,
      text: methodTexts
    });
  });

  return result;
};

/**
 * Helper create a method element label with radio wrapper
 *
 * @access private
 */
const createMethodElement = (contentHtml, id) => {
  const container = document.createElement('div');
  container.classList.add('radioButton');

  container.id = id;

  const label = document.createElement('label');
  label.classList.add('inlineLabel');
  label.innerHTML = contentHtml;

  container.appendChild(label);

  return container;
};

/**
 * Mark method active on click
 * Mark other methods inactive
 */
const elementOnClickMakeActive = (method) => {
  method.addEventListener('click', () => {
    [].forEach.call(
      document.querySelectorAll(`.${settings.ID}-new-delivery-options .${settings.ID}--active`), 
      (item) => {
        item.classList.remove(`${settings.ID}--active`);
      }
    );
    method.classList.add(`${settings.ID}--active`);

    // ---------------------------------------------------------------
    // When choosing delivery to store, we have to enable the billing
    // address again and force them to enter it
    // ---------------------------------------------------------------
    toggleBillingAddressIntoStoreDelivery();
  });
};

/**
 * Take billing address when store delivery chosen, or reset otherwise
 *
 * @todo
 */
const toggleBillingAddressIntoStoreDelivery = () => {
  const deliverToStore = document.querySelector(`.${settings.ID}-new-delivery-options #${settings.ID}-option-deliver-to-store.${settings.ID}--active`);

  if(deliverToStore) {
    deliverToStore.insertAdjacentElement('afterend', cache.get('billing-address-container'));

    // Trigger change on billing field
    const billingPostcode = document.querySelector('#billingPostcode');
    if(billingPostcode.value) {
      billingPostcode.dispatchEvent(new Event('change'));
    }

  } else {
    const billingSameAs = document.querySelector(`.${settings.ID}-billing-same-as`);
    if(billingSameAs) {
      billingSameAs.insertAdjacentElement('afterend', cache.get('billing-address-container'));
    }
  }
};

/**
 * Helper build custom delivery methods
 */
export const buildCustomDeliveryMethods = () => {
  // ------------------------------------------------------------------
  // Create the container for delivery methods
  // ------------------------------------------------------------------
  const newContainer = document.createElement('fieldset');
  newContainer.classList.add(`${settings.ID}-new-delivery-options`);
  cache.get('details-container').insertAdjacentElement('afterend', newContainer);
  cache.get('details-container').insertAdjacentHTML(
    'afterend', `<h2 class="${settings.ID}-section-title">Delivery Options</h2>`
  );
  

  // ------------------------------------------------------------------
  // Hold ref to elements for reuse
  // ------------------------------------------------------------------
  const storeSearch = document.querySelector('[data-formname="storeSearch"]');
  const storeList = document.querySelector('#storeList');

  // ------------------------------------------------------------------
  // Ref to any added custom methods
  // ------------------------------------------------------------------
  let customMethods = [];

  // ------------------------------------------------------------------
  // Add existing delivery methods (standard, next day etc.)
  // ------------------------------------------------------------------
  getExistingDeliveryMethods().forEach((method) => {
    let deliveryName = method.text[0].trim();
    if(deliveryName.toLowerCase() != 'delivery') {
      deliveryName = deliveryName + ' Delivery';
    }
    const text1 = `<span class="${settings.ID}-text"><span>${deliveryName}</span> - ${method.text[1]}</span>`;
    let text2 = '';
    if(!/undefined/ig.test(method.text[2]) && !/undefined/ig.test(method.text[3])) {
      text2 = `<span class="${settings.ID}-text ${settings.ID}-text--desc">${method.text[2]} ${method.text[3]}</span>`;
    }

    const newMethod = createMethodElement(text1 + text2, `${settings.ID}${deliveryName.replace(/\s/ig, '').toLowerCase()}`);

    newContainer.appendChild(newMethod);
    customMethods.push(newMethod);

    elementOnClickMakeActive(newMethod);

    if(method.checked) {
      newMethod.classList.add(`${settings.ID}--active`);
    }

    // ---------------------------------------------------------------
    // When faux store button clicked clicked, click on 'real' hidden method label
    // ---------------------------------------------------------------

    newMethod.addEventListener('click', () => {
      // ---------------------------------------------------------------
      // Set address to 'alternative address' in case as the user has
      // chosen an address-viable method
      // ---------------------------------------------------------------
      setAlternativeAddressAsChosen();

      if(storeSearch) {
        storeSearch.style.display = 'none';
      }

      // Link elements clicked
      const forAtt = method.node.getAttribute('for');
      if(forAtt) {
        const nodeRequeried = document.querySelector('[for=' + forAtt + ']');
        if(nodeRequeried) {
          nodeRequeried.click();
        }
      }
      
      // ---------------------------------------------------------------
      // Flag is not store delivery state on form
      // ---------------------------------------------------------------
      cache.get('checkout-form').classList.remove(`${settings.ID}-is-store-delivery`);
    });
  });

  // ------------------------------------------------------------------
  // Add 'deliver to store' method
  // ------------------------------------------------------------------
  let storeText = '';
  switch(settings.ID) {
    case 'HS023': 
      storeText = 'Deliver to H Samuel Store';
      break;
    default:
      storeText = 'Deliver to Ernest Jones Store';
  }

  const storeAddressLabel = cache.get('address-options-container').querySelector('#store-address');
  const storeNewMethod = createMethodElement(
    `<span class="${settings.ID}-text ${settings.ID}-text--single-line">${storeText} - Free</span>`,
    `${settings.ID}-option-deliver-to-store`
  );
  newContainer.appendChild(storeNewMethod);
  customMethods.push(storeNewMethod);

  elementOnClickMakeActive(storeNewMethod);

  if(storeList) {
    newContainer.insertAdjacentElement('beforeend', storeList);
  }

  if(storeSearch) {
    newContainer.insertAdjacentElement('beforeend', storeSearch);
  }

  // ------------------------------------------------------------------
  // Move store search above the store list
  // ------------------------------------------------------------------
  if(storeList && storeSearch) {
    storeList.insertAdjacentElement('beforebegin', storeSearch);
  }

  storeNewMethod.addEventListener('click', (e) => {
    // ---------------------------------------------------------------
    // Show the store address dropdown 
    // ---------------------------------------------------------------
    e.preventDefault();

    storeSearch.style.display = 'block';
    
    // ---------------------------------------------------------------
    // Flag is store delivery state on form
    // ---------------------------------------------------------------
    cache.get('checkout-form').classList.add(`${settings.ID}-is-store-delivery`);
  });

  // ---------------------------------------------------------------
  // When faux store button clicked clicked, click on 'real' hidden store label
  // ---------------------------------------------------------------
  linkElementsClicked(storeNewMethod, storeAddressLabel);
  
  // ---------------------------------------------------------------
  // Store search town or postcode label
  // ---------------------------------------------------------------
  const moreLocation = document.querySelector('label[for=moreLocation]');
  if(moreLocation) {
    moreLocation.innerHTML = 'Search store by town or postcode';
  }
  
  // ---------------------------------------------------------------
  // Return...
  // ---------------------------------------------------------------
  return customMethods;
};
