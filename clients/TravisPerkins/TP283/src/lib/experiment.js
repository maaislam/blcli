/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { getCookie } from '../../../../../lib/utils';
import priceBanner from './components/priceBanner';
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 1000;

const isPlp = () => window.location.href.includes('/c/');
const isPdp = () => window.location.href.includes('/p/');

const isLoggedIn = () => !!getCookie('access_token');

const init = () => {
  // Experiment Code...
  const bannerFooter = `<div class=" jCCoN"><span color="text-succes-default" data-test-id="save-with-trade-account-badge" class="sc-aXZVg sc-cwHptR ihDtdT dhrJrU">Save with a Trade account</span></div>`;
  if ((!isPlp() && !isPdp()) || isLoggedIn()) {
    document.documentElement.classList.remove(`${ID}`);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);
    return;
  }

  pollerLite(
    [
      () =>
        document.querySelector('[data-test-id="pdp-wrapper"] [data-test-id="pdp-trade-price-block"]') ||
        document.querySelector('[data-test-id="plp-wrapper"] [data-test-id="product"]'),
    ],
    () => {
      setup();
      newEvents.initiate = true;
      newEvents.methods = ['ga4'];
      newEvents.property = 'G-6EM3847CY9';

      fireEvent('Conditions Met');

      // -----------------------------
      // Add events that apply to both variant and control
      // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
      // -----------------------------
      // ...

      // -----------------------------
      // If control, bail out from here
      // -----------------------------
      if (VARIATION == 'control') {
        return;
      }

      // -----------------------------
      // Write experiment code here
      // -----------------------------
      // ...
      if (isPdp()) {
        //console.log('I am in PDP');

        if (document.querySelector(`.${ID}__prices-banner`)) {
          //console.log('Already added');
          return;
        }

        const normalPriceElement = document.querySelector('[data-test-id="best-price"] > div:first-child');
        const tradePriceElement = document.querySelector('[data-test-id="trade-price-value"]');
        //clone normal price element
        const normalPriceClone = normalPriceElement.cloneNode(true);
        //add a class name
        normalPriceClone.classList.add(`${ID}__trade-price`);

        const tradePrice = tradePriceElement ? tradePriceElement.textContent : 'Available';

        const vatTextElem = tradePriceElement
          ? tradePriceElement.parentElement.querySelector('[class*="TradePriceBox__BadgeTextCustom"]')
          : '';

        const vatText = vatTextElem ? vatTextElem.textContent : '';
        //console.log('🚀 ~ prodCards.forEach ~ vatText:', vatText);

        const banner = priceBanner(ID, tradePrice, vatText);

        const attachPoint = document.querySelector('[data-test-id="trade-price-discount-block"]');
        //hide attachpoint
        attachPoint.style.display = 'none';
        normalPriceElement.insertAdjacentHTML('afterend', banner);

        //insert cloned element
        //hide original
        normalPriceElement.style.display = 'none';
        const bannerElement = document.querySelector(`.${ID}__prices-banner`);
        bannerElement.insertAdjacentElement('afterbegin', normalPriceClone);
        bannerElement.nextElementSibling.style.display = 'none';

        bannerElement.insertAdjacentHTML('afterend', bannerFooter);
      }

      if (isPlp()) {
        //console.log('I am in PLP');
        const prodCards = document.querySelectorAll('[data-test-id="product"]');
        prodCards.forEach((card) => {
          if (card.querySelector(`.${ID}__prices-banner`)) {
            //console.log('Already added');
            return;
          }

          const normalPriceElement = card.querySelector('[data-test-id="best-price"] > div:first-child');
          const tradePriceElement = card.querySelector('[data-test-id="trade-price-value"]');
          //clone normal price element
          const normalPriceClone = normalPriceElement.cloneNode(true);
          //add a class name
          normalPriceClone.classList.add(`${ID}__trade-price`);

          const tradePrice = tradePriceElement ? tradePriceElement.textContent : 'Available';

          const vatTextElem = tradePriceElement
            ? tradePriceElement.parentElement.querySelector('[class*="TradePriceBox__BadgeTextCustom"]')
            : '';

          const vatText = vatTextElem ? vatTextElem.textContent : '';
          //console.log('🚀 ~ prodCards.forEach ~ vatText:', vatText);

          const banner = priceBanner(ID, tradePrice, vatText);

          const attachPoint = card.querySelector('[data-test-id="product-card-trade-price"]');
          attachPoint.insertAdjacentHTML('beforebegin', banner);

          //insert cloned element
          //hide original
          normalPriceElement.style.display = 'none';
          const bannerElement = card.querySelector(`.${ID}__prices-banner`);
          bannerElement.insertAdjacentElement('afterbegin', normalPriceClone);
          bannerElement.nextElementSibling.style.display = 'none';
          bannerElement.insertAdjacentHTML('afterend', bannerFooter);
        });
      }

      //render modal
      const modal = document.createElement('div');
      modal.id = `${ID}__modal`;
      modal.classList.add(`${ID}__hidden`);

      modal.innerHTML = `
      <div id="${ID}__overlay" class="${ID}__overlay"></div>
      <div id="${ID}__modalinner" class="${ID}__modalinner">
        <div class="${ID}__formclose">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M6.43963 7.5L0.219919 1.28179C0.150196 1.21206 0.0948892 1.12929 0.0571553 1.03819C0.0194214 0.947094 7.34652e-10 0.849456 0 0.750853C-7.34652e-10 0.652249 0.0194214 0.554611 0.0571553 0.463514C0.0948892 0.372416 0.150196 0.289643 0.219919 0.219919C0.289643 0.150196 0.372416 0.0948892 0.463514 0.0571553C0.554611 0.0194214 0.652249 -7.34652e-10 0.750853 0C0.849456 7.34652e-10 0.947094 0.0194214 1.03819 0.0571553C1.12929 0.0948892 1.21206 0.150196 1.28179 0.219919L7.5 6.43963L13.7182 0.219919C13.859 0.0791073 14.05 0 14.2491 0C14.4483 0 14.6393 0.0791073 14.7801 0.219919C14.9209 0.360732 15 0.551714 15 0.750853C15 0.949991 14.9209 1.14097 14.7801 1.28179L8.56037 7.5L14.7801 13.7182C14.9209 13.859 15 14.05 15 14.2491C15 14.4483 14.9209 14.6393 14.7801 14.7801C14.6393 14.9209 14.4483 15 14.2491 15C14.05 15 13.859 14.9209 13.7182 14.7801L7.5 8.56037L1.28179 14.7801C1.14097 14.9209 0.949991 15 0.750853 15C0.551714 15 0.360732 14.9209 0.219919 14.7801C0.0791073 14.6393 0 14.4483 0 14.2491C0 14.05 0.0791073 13.859 0.219919 13.7182L6.43963 7.5Z" fill="#6A7685"/>
          </svg>
        </div>
        <div id="${ID}__loginform" class="${ID}__loginform"></div>
        <a href="/content/create-account" class="${ID}__signupbtn">I don’t have an account</a> 
      </div>`;

      //check if already exists
      if (!document.getElementById(`${ID}__modal`)) {
        document.body.appendChild(modal);
        if (window.TP && typeof window.TP.renderLoginForm === 'function') {
          window.TP.renderLoginForm(`${ID}__loginform`);
        }
      }
    }
  );
};

export default () => {
  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init

  onUrlChange(() => {
    pollerLite(['#app-container'], () => {
      setTimeout(init, DOM_RENDER_DELAY);
    });
  });

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('[data-test-id="pag-button"]')) {
      setTimeout(init, DOM_RENDER_DELAY);
    } else if (target.closest(`.${ID}__prices-banner`)) {
      //unhide modal
      const modal = document.getElementById(`${ID}__modal`);
      modal.classList.remove(`${ID}__hidden`);

      const pageType = isPdp() ? 'PDP' : isPlp() ? 'PLP' : 'Other';

      fireEvent(`User triggers the pop up on ${pageType}`);
    } else if (target.closest(`.${ID}__formclose`) || target.closest(`.${ID}__overlay`)) {
      const modal = document.getElementById(`${ID}__modal`);
      modal.classList.add(`${ID}__hidden`);
      const pageType = isPdp() ? 'PDP' : isPlp() ? 'PLP' : 'Other';
      fireEvent(`User closes popup with ${target.closest(`.${ID}__formclose`) ? 'X' : 'overlay'} on ${pageType}`);
    } else if (target.closest(`.${ID}__signupbtn`)) {
      const pageType = isPdp() ? 'PDP' : isPlp() ? 'PLP' : 'Other';
      fireEvent(`User interacts with create an account on ${pageType}`);
    }
  });
};
