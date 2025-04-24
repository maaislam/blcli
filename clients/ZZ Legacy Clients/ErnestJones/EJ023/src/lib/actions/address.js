import settings from '../settings';
import pubSub from '../PublishSubscribe';
import cache from '../cache';
import { getTextNodesRecursive } from '../dom';
import { linkElementsClicked } from '../linkage';


/**
 * Build new address fields
 */
export const buildAddress = () => {
  // ---------------------------------------------------------------
  // We use 'alt' address, bring into flow of our new document
  // ---------------------------------------------------------------
  const altAddressFields = cache.get('address-options-container').querySelector('.paddingWrap');
  altAddressFields.classList.add(`${settings.ID}-alt-address`);

  cache.get('billing-address-container').insertAdjacentElement('beforebegin', altAddressFields);

  // ---------------------------------------------------------------
  // Title for address
  // ---------------------------------------------------------------
  altAddressFields.insertAdjacentHTML(
    'beforebegin', `<h2 class="${settings.ID}-section-title ${settings.ID}-section-title--delivery-address">Delivery Address</h2>`
  );
  
  // ---------------------------------------------------------------
  // Title for billing address
  // ---------------------------------------------------------------
  cache.get('billing-address-container').insertAdjacentHTML(
    'afterbegin', `<h2 class="${settings.ID}-section-title ${settings.ID}-section-title--billing-address">Please enter your billing address</h2>`
  );

};

/**
 * Modify gift recipient fields
 */
export const handleGiftRecipient = () => {
  cache.get('gift-recipient-container').classList.add(`${settings.ID}-gift-recipient-container`);

  // ---------------------------------------------------------------
  // Move gift recipient
  // ---------------------------------------------------------------
  cache.get('billing-address-container').insertAdjacentElement(
    'beforebegin', 
    cache.get('gift-recipient-container')
  );

  // ---------------------------------------------------------------
  // Modify text of gift recipien tlabel
  // ---------------------------------------------------------------
  const label = cache.get('gift-recipient-container').querySelector('.inlineLabel');
  label.innerHTML = `
    <span>Gift Recipient</span>
    <span class="${settings.ID}-sublabel">Check this box if the delivery name is different to your name above</span>
  `;

  label.addEventListener('click', () => {
    pubSub.publish('did-click-gift-recipient');
  });
};

/**
 * Modify billing address
 */
export const handleBillingAddress = () => {
  cache.get('billing-address-container').classList.add(`${settings.ID}-bill-address`);

  // ---------------------------------------------------------------
  // Build label checkbox
  // ---------------------------------------------------------------
  const container = document.createElement('div');
  container.classList.add(`${settings.ID}-billing-same-as`);
  container.classList.add('checkboxContainer');

  const label = document.createElement('label');
  label.classList.add('inlineLabel');
  label.classList.add(`${settings.ID}-active`);
  label.innerHTML = 'Billing Address same as Delivery Address';

  container.appendChild(label);

  cache.get('billing-address-container').insertAdjacentHTML(
    'beforebegin', `<h2 class="${settings.ID}-section-title">Payment Information</h2>`
  );
  cache.get('billing-address-container').insertAdjacentElement('beforebegin', container);

  // ---------------------------------------------------------------
  // Toggle billing container
  // ---------------------------------------------------------------
  label.addEventListener('click', () => {
    if(cache.get('billing-address-container').classList.contains(`${settings.ID}-bill-address--active`)) {
      cache.get('billing-address-container').classList.remove(`${settings.ID}-bill-address--active`);

      label.classList.add(`${settings.ID}-active`);
    } else {
      cache.get('billing-address-container').classList.add(`${settings.ID}-bill-address--active`);

      label.classList.remove(`${settings.ID}-active`);
    }
  });
};

/**
 * Handle delivery address lookup
 */
export const initDeliveryAddressLookup = () => {
  const addressLines = document.querySelector('#deliveryAddressLinesDiv');
  if(addressLines) {
    addressLines.classList.add(`${settings.ID}-collapsed`);

    addressLines.insertAdjacentHTML('beforebegin', `
      <p class="${settings.ID}-text-center ${settings.ID}-manual-address-link">
        <a>Enter address manually</a>
      </p>
    `);

    const link = document.querySelector(`.${settings.ID}-manual-address-link a`);
    if(link) {
      cache.add('manual-address-link', link);

      link.addEventListener('click', () => {
        link.remove();

        addressLines.classList.remove(`${settings.ID}-collapsed`);

        pubSub.publish('did-cick-manual-address-link');
      });
    }
  }
};


/**
 * Get billing fields
 */
const getBillingFields = () => {
  const billingFields = [
    document.querySelector(`.${settings.ID}-bill-address #billingAddressLine1`),
    document.querySelector(`.${settings.ID}-bill-address #billingAddressLine2`),
    document.querySelector(`.${settings.ID}-bill-address #billingTown`),
    document.querySelector(`.${settings.ID}-bill-address #billingPostcode`),
  ];

  return billingFields;
}

const getDeliveryFields = () => {
  const deliveryFields = [
    document.querySelector(`.${settings.ID}-alt-address #deliveryAddressLine1`),
    document.querySelector(`.${settings.ID}-alt-address #deliveryAddressLine2`),
    document.querySelector(`.${settings.ID}-alt-address #deliveryTown`),
    document.querySelector(`.${settings.ID}-alt-address #deliveryPostcode`),
  ];

  return deliveryFields;
};

/**
 * When delivery values change, update values in billing address
 * fields (applies when 'billing address same as delivery address' checked
 */
const makeBillingAddressMatchDeliveryAddress = () => {
  const deliveryFields = getDeliveryFields();
  const billingFields = getBillingFields();

  deliveryFields.forEach((item, idx) => {
    const billingItem = billingFields[idx];
    if(item && billingItem) {
      billingItem.value = item.value;
    }
  });
};

/**
 * Do addresses match helper?
 */
export const doAddressesMatch = () => {
  const addressesMatchElm = document.querySelector(`.${settings.ID}-billing-same-as .${settings.ID}-active`);
  return !!addressesMatchElm;
};

/**
 * Match billing address to delivery address on interval if 
 * the user has selected choose same address
 */
export const checkBillingAddressOnInterval = () => {
  setInterval(() => {
    const deliverToStore = document.querySelector(`.${settings.ID}-new-delivery-options #${settings.ID}-option-deliver-to-store.${settings.ID}--active`);
    if(doAddressesMatch() && !deliverToStore) {
      makeBillingAddressMatchDeliveryAddress();
    }

    // Remove 'enter address manually' if an address is filled in
    if(getDeliveryFields().filter((f) => !!f.value.trim()).length) {
      cache.get('manual-address-link').click();
      cache.get('manual-address-link').remove();
    }
  }, 1000);
};

/**
 * Set alternative address as the chosen
 */
export const setAlternativeAddressAsChosen = () => {
  const altAddress = cache.get('address-options-container').querySelector('#alternate-address');

  altAddress.click();
};

/**
 * Set alternative address as the chosen
 */
export const setBillingAddressAsChosen = () => {
  const billAddress = cache.get('address-options-container').querySelector('#billing-address');

  billAddress.click();
};

/**
 * Set deliver to store address as the chosen
 */
export const setDeliverToStore = () => {
  const storeAddress = cache.get('address-options-container').querySelector('#store-address');

  storeAddress.click();
};

/**
 * Move delivery addres fields to after the your details section
 */
export const moveDeliveryAddressAfterDetails = () => {
  const details = cache.get('details-container');

  if(details) {
    const title = document.querySelector(`.${settings.ID}-section-title--delivery-address`);
    const altAddress = document.querySelector(`.${settings.ID}-alt-address`);
    const giftRecipient = cache.get('gift-recipient-container');

    if(giftRecipient) {
      details.insertAdjacentElement('afterend', giftRecipient);
    }

    if(altAddress) {
      details.insertAdjacentElement('afterend', altAddress);
    }

    if(title) {
      details.insertAdjacentElement('afterend', title);
    }
  }
};
