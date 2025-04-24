/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { getUrlParameter } from '../../../../../lib/utils';
import config from './config';

/**
 * Helper which site are we on 
 */
const getSite = () => document.title.indexOf('Ernest') > -1 ? 'Ernest Jones' : 'H.Samuel';

/**
 * Helper translate array of keys into queryable key pairs
 */
const translateArrayObjectsOnGivenKeyValue = (data, keyName) => {
  let result = {};

  data.forEach(item => {
    result[item[keyName]] = item;
  });

  return result;
};

/**
 * Helper is store closed
 */
const getStoreById = (sid, data) => data[sid];

/**
 * Get store site type by sid
 */
const getStoreSiteBySid = (sid) => {
  if(sid.match(/\d+\s\/\s\d+/)) {
    return 'Both';
  }
  return sid.match(/^3/) ? 'Ernest Jones' : 'H.Samuel';
};

/**
 * Helper update stores in listing
 */
const grabPlpDomElementsWithClosedStores = (data) => {
  let results = [];

  [].forEach.call(document.querySelectorAll(getSite() == 'Ernest Jones' ? '.search-results__store' : '.searchResults tr'), (storeElm) => {
    const sidElm = storeElm.querySelector('[data-store-number]');
    if(sidElm) {
      const sid = sidElm.getAttribute('data-store-number');

      const closedStore = getStoreById(sid, data);
      if(closedStore) {
        results.push({
          elm: storeElm,
          store: closedStore
        });
      }
    }
  });

  return results;
};

/**
 * Get sister site url
 */
const getSisterSiteUrl = () => {
  return getSite() !== 'Ernest Jones' ? 'https://www.ernestjones.co.uk/webstore/secure/store/' : 'https://www.hsamuel.co.uk/webstore/secure/viewStoreDetails.sdo?storeLocation=&storeNumber=';
};

/**
 * Get same-site url
 */
const getSameSiteUrl = () => {
  return getSite() === 'Ernest Jones' ? 'https://www.ernestjones.co.uk/webstore/secure/store/' : 'https://www.hsamuel.co.uk/webstore/secure/viewStoreDetails.sdo?storeLocation=&storeNumber=';
};

/**
 * Helper get markup for closed store
 */
const getMarkupForClosedStore = (storeData) => {
  const nearestStore = storeData.NearestStore;
  const customerServiceStore = storeData.CustomerServiceStore;

  const nearestStoreIsSameSite = (getStoreSiteBySid(nearestStore.StoreNumber) === getSite());
  const customerServicesStoreIsSameSite = (
    getStoreSiteBySid(customerServiceStore.StoreNumber) === getSite()
    || 
    getStoreSiteBySid(customerServiceStore.StoreNumber) === 'Both'
  );

  let markup = `
    <div class="${shared.ID}-single-store">
      <p class="${shared.ID}-closed-heading">Store Closed</p>
      <p class="${shared.ID}-general-heading">For all Customer Service Enquiries</p>
  `;

  if(customerServicesStoreIsSameSite) {
    markup += `
      <p>For all customer services your closest store is now in <strong>${customerServiceStore.StoreBrand}</strong>
        at ${customerServiceStore.StoreAddress.replace(/<br\/>/gm, ', ')} 
      </p>
    `;
  } else {
    markup += `
      <p>The next closest customer service store is our sister brand <strong>${customerServiceStore.StoreBrand}</strong>
        at ${customerServiceStore.StoreAddress.replace(/<br\/>/gm, ', ')} 
      </p>
    `;
  }

  markup += `<p class="${shared.ID}-general-heading">Next Closest Store</p>`;

  if(nearestStoreIsSameSite) {
    markup += `
      <p>
        The next closest <a href="${getSameSiteUrl()}${nearestStore.StoreNumber}"><strong>${nearestStore.StoreBrand}</strong></a> store is at 
        <a href="${getSameSiteUrl()}${nearestStore.StoreNumber}">${nearestStore.StoreAddress.replace(/<br\/>/gm, ', ')}</a>
      </p>
    `;
  } else {
    markup += `
      <p>
        The next closest store is our sister brand which may sell the product you're looking for: 
        <a rel="nofollow" href="${getSisterSiteUrl()}${nearestStore.StoreNumber}"><strong>${nearestStore.StoreBrand}</strong></a>
        at 
        <a rel="nofollow" href="${getSisterSiteUrl()}${nearestStore.StoreNumber}">${nearestStore.StoreAddress.replace(/<br\/>/gm, ', ')}</a>
      </p>
    `;
  }

  markup += `<p class="${shared.ID}-extra-margin-top"><a href="/webstore/secure/storeLocator.sdo" class="button ${shared.ID}-search">Search for my nearest store</a></p>`;

  markup += `</div>`;

  return markup;

};

/**
 * Entry point for campaign code...
 */
export default () => {
  setup();

  if(window.location.pathname.indexOf('webstore/secure/showStoreSearchResults.sdo') > -1) {
    // --------------------
    // Get store data in easy to query format
    // --------------------
    const data = translateArrayObjectsOnGivenKeyValue(config.ClosingStores, 'Store');

    // --------------------
    // Modify store listing page for any matching stores
    // --------------------
    const closedStoresElms = grabPlpDomElementsWithClosedStores(data);

    closedStoresElms.forEach((closedStoreData) => {
      const storeElm = closedStoreData.elm;

      storeElm.classList.add(`${shared.ID}-is-closed`);

      const openingTimes = storeElm.querySelector(getSite() == 'Ernest Jones' ? '.store-opening-time' : '.storeOpeningTimes');
      if(openingTimes) {
        openingTimes.innerHTML = `<div class="${shared.ID}-opening-message">Store Closed</div>`;
      }

      const storeLink = storeElm.querySelector(getSite() == 'Ernest Jones' ? '.store-links__link--detail' : '.viewStorDetails span');
      if(storeLink) {
        storeLink.innerHTML = 'View Closed Store Details';
      }
    });
  }
  
  // --------------------
  // Modify individual store page
  // --------------------
  if(window.location.pathname.indexOf('webstore/secure/store') > -1 
      || window.location.pathname.indexOf('webstore/secure/viewStoreDetails.sdo') > -1) 
  {
    // --------------------
    // Get store data in easy to query format
    // --------------------
    const data = translateArrayObjectsOnGivenKeyValue(config.ClosingStores, 'Store');

    if(getSite() == 'Ernest Jones') {
      document.body.classList.add('ernestjones');
    } else {
      document.body.classList.add('hsamuel');
    }

    // --------------------
    // Update page if store is closed
    // --------------------
    let sid = null;

    const storeMatchUrl = window.location.pathname.match(/webstore\/secure\/store\/(\d+)\//i);
    if(storeMatchUrl && storeMatchUrl[0]) {
      sid = storeMatchUrl[1];
    }

    if(!sid) {
      const param = getUrlParameter('storeNumber', window.location.href);
      if(param) {
        sid = param;
      }
    }

    if(sid) {
      const closedStoreData = getStoreById(sid, data);
      if(closedStoreData) {
        document.body.classList.add(`${shared.ID}-store-single-closed`);

        const openingTimes = document.querySelector(getSite() == 'Ernest Jones' ? '.store-page__opening-times' : '.storeOpeningTimes');
        if(openingTimes) {
          const html = getMarkupForClosedStore(closedStoreData);
          openingTimes.innerHTML = html;
        }
      }
    }
  }
};
