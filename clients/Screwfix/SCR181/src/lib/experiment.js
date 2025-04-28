/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { postCodeForm } from './components/postCodeForm';
import getCoordinates from './helpers/getCoordinates';
import getNearbyStores from './helpers/getNearbyStores';
import setSelectedStore from './helpers/setSelectedStore';
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1000;
const storeSelected = () => {
  const storeSelectElem = document.querySelector('[data-qaid="qa-store-label"]');
  return storeSelectElem.textContent.includes('Select') ? false : true;
};

const init = () => {
  //remove existing dom coming from test

  const newStoreLocatorElems = document.querySelectorAll(`.${ID}__postcode-prompt`);
  newStoreLocatorElems.forEach((storeLocatorElem) => {
    storeLocatorElem.remove();
  });

  //check if page is correct

  const pageCondition = !storeSelected() && sessionStorage.getItem('storeLocator') !== 'true';
  if (!pageCondition) {
    //remove DOM element added by the experiment
    const storeLocatorElem = document.querySelector('[data-qaid="header-store-locator"]');
    storeLocatorElem.classList.remove(`${ID}__storeLocator`);

    const postCodeFormElements = document.querySelectorAll(`.${ID}__postcode-prompt`);
    if (postCodeFormElements) {
      postCodeFormElements.forEach((postCodeFormElement) => postCodeFormElement.remove());
    }

    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  setup();

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  fireEvent('Conditions Met');

  if (VARIATION === 'control') return;

  /*****add experiment specific code here*****/
  const storeLocatorElem = document.querySelector('[data-qaid="header-store-locator"]');
  storeLocatorElem.classList.add(`${ID}__storeLocator`);

  if (!document.querySelector(`.${ID}__postcode-prompt`)) {
    storeLocatorElem.insertAdjacentHTML('beforeend', postCodeForm(ID));
  }

  const form = document.querySelector(`.${ID}__postcodeForm`);

  const submitHandler = (event) => {
    event.preventDefault(); // Prevent page reload

    const input = document.querySelector(`.${ID}__postcodeInput`);
    const formWrapper = event.target.closest(`.${ID}__postcode-prompt`);
    const postcode = input.value.trim();

    if (!postcode) {
      input.focus();
      return;
    }

    formWrapper.setAttribute('data-disable', true);

    getCoordinates(postcode)
      .then((data) => {
        if (data && data.length > 0) {
          getNearbyStores(data[0].lat, data[0].lng)
            .then((storeData) => {
              if (storeData.sortedStores[0]) {
                const { branchCode, name, relativeUrl } = storeData.sortedStores[0].store.basic;
                if (branchCode && name) {
                  setSelectedStore(branchCode, name)
                    .then(() => {
                      const storeLocator = document.querySelector('[data-qaid="header-store-locator"]');
                      const storeLocatorLinkElem = document.querySelector('[data-qaid="header-store-locator"] a');
                      const storeLocatorName = document.querySelector('[data-qaid="qa-store-label"]');
                      const postCodeForm = document.querySelector(`.${ID}__postcode-prompt`);
                      const selectStoreLabel = document.querySelector('[data-qaid="header-store-locator"] span:first-of-type');
                      if (storeLocatorLinkElem && storeLocatorName) {
                        storeLocatorLinkElem.href = relativeUrl;
                        storeLocatorName.textContent = name;
                        selectStoreLabel.textContent = 'Selected Store';
                        postCodeForm.classList.add(`${ID}__success`);
                        postCodeForm.innerHTML = '';
                        postCodeForm.innerHTML = `<h2 class="${ID}__successMsg">We’ve set the store closest to your location.</h2>`;
                        fireEvent('Store Locator Postcode Submitted');
                        setTimeout(() => {
                          postCodeForm.remove();
                          storeLocator.classList.remove(`${ID}__storeLocator`);
                        }, 5000);
                      }
                    })
                    .then((error) => {
                      formWrapper.removeAttribute('data-disable');
                      console.log(error);
                    });
                }
              }
            })
            .catch((error) => {
              formWrapper.removeAttribute('data-disable');
              console.log(error);
            });
        }
      })
      .catch((error) => {
        formWrapper.removeAttribute('data-disable');
        console.log(error);
      });
  };
  form.removeEventListener('submit', submitHandler);
  form.addEventListener('submit', submitHandler);
  //show on load
  const postCodeFormWrapper = document.querySelector(`.${ID}__postcode-prompt`);
  postCodeFormWrapper.classList.add(`${ID}__visible`);
};

export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }
  /*****Request from Screwfix*****/

  const clickHandler = (e) => {
    const pageCondition = !storeSelected();
    if (!pageCondition) return;

    const { target } = e;

    if (target.closest(`.${ID}__storeLocator`) && !target.closest(`.${ID}__no-thanks-btn`)) {
      const postCodeFormWrapper = document.querySelector(`.${ID}__postcode-prompt`);
      postCodeFormWrapper.classList.add(`${ID}__visible`);
    } else if (target.closest(`.${ID}__no-thanks-btn`)) {
      const postCodeFormWrapper = document.querySelector(`.${ID}__postcode-prompt`);
      postCodeFormWrapper.classList.remove(`${ID}__visible`);
      fireEvent('Store Locator No Thanks Clicked');
      sessionStorage.setItem('storeLocator', 'true');
    } else if (target.closest('[data-qaid="button-click-and-collect"]')) {
      fireEvent('User interacts with c&c button PLP');
    } else if (target.closest('[data-qaid="button-deliver"]')) {
      fireEvent('User interacts with delivery button PLP');
    } else if (target.closest('[data-qaid="pdp-button-click-and-collect"]')) {
      if (target.closest('[data-qaid="pdp_sticky_banner"]')) {
        fireEvent('User interacts with c&c on PDP Sticky Banner');
      } else {
        fireEvent('User interacts with c&c button PDP');
      }
    } else if (target.closest('[data-qaid="pdp-button-deliver"]')) {
      if (target.closest('[data-qaid="pdp_sticky_banner"]')) {
        fireEvent('User interacts with delivery button PDP Sticky Banner');
      } else {
        fireEvent('User interacts with delivery button PDP');
      }
    } else if (
      (target.closest('[data-qaid="store-info-block"]') || target.closest('[data-qaid="stock-availability-store"]')) &&
      target.closest('button')
    ) {
      fireEvent('User interacts with store info block');
    }

    if (target.closest([`[data-qaid="header-store-locator"]`])) {
      fireEvent('Store Locator Clicked');
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(
      [
        () => typeof window.tealiumDataLayer === 'object',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
      ],
      () => {
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
