import { fullStory } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import settings from './settings';
import stepsData from './steps_data';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function addTopPaddingToProgressBar() {
  const progressSteps = document.querySelector('.PJ071-navSteps__wrapper');
  if (progressSteps) {
    progressSteps.setAttribute('style', 'padding-top: 20px;');
  }
}

function bindOrderMethodClickEvent() {
  const buttons = document.querySelector('.splitButtons.wider-buttons-mobile .butContainer');
  const headerButtons = document.querySelector('#ctl00__objHeader_upStoreSectionMobile');
  if (buttons) {
    pollerLite(['#ctl00_cphBody_lbDeliveryMobile', 
    '#ctl00_cphBody_lbCollectionMobile',], () => {
      const deliveryCTA = buttons.querySelector('#ctl00_cphBody_lbDeliveryMobile');
      const collectionCTA = buttons.querySelector('#ctl00_cphBody_lbCollectionMobile');

      clickCtaBtn(deliveryCTA);
      clickCtaBtn(collectionCTA);
    });
    pollerLite(['#ctl00__objHeader_lbDeliveryMobile', 
    '#ctl00__objHeader_lbCollectionMobile',], () => {
      const headerDeliveryCTA = headerButtons.querySelector('#ctl00__objHeader_lbDeliveryMobile');
      const headerCollectionCTA = headerButtons.querySelector('#ctl00__objHeader_lbCollectionMobile');

      clickCtaBtn(headerDeliveryCTA);
      clickCtaBtn(headerCollectionCTA);
    });
  } else if (headerButtons) {
    const headerDeliveryCTA = headerButtons.querySelector('#ctl00__objHeader_lbDeliveryMobile');
    const headerCollectionCTA = headerButtons.querySelector('#ctl00__objHeader_lbCollectionMobile');

    clickCtaBtn(headerDeliveryCTA);
    clickCtaBtn(headerCollectionCTA);
  }  
}

function clickCtaBtn(cta) {
  cta.addEventListener('click', () => {
    let id = cta.getAttribute('id');
    if (id.indexOf('ctl00_cphBody_lb') > -1) {
      id = id.replace('ctl00_cphBody_lb', '');
    } else if (id.indexOf('ctl00__objHeader_lb') > -1) {
      id = id.replace('ctl00__objHeader_lb', '');
    }
    sessionStorage.setItem("PJ071-orderMethod", `${id}`);
  });
}

function generateNavStepsProgress() {
  if (!document.querySelector('.PJ071-navSteps__wrapper')) {
    let steps = '';
    let stepsProgress = '';
    for (var key in stepsData) {
      // skip loop if the property is from prototype
      if (!stepsData.hasOwnProperty(key)) continue;

      let obj = stepsData[key];
      steps += `<li class="PJ071-step PJ071-step__${obj.value}">
        <span class="PJ071-icon PJ071-icon__${obj.value}"></span>
        <span class="PJ071-text">${obj.text}</span>
      </li>`;
      stepsProgress += `<li class="PJ071-step PJ071-step__${obj.value}"></li>`;
  }
    const navStepsContainer = `<div class="PJ071-navSteps__wrapper">
      <div class="PJ071-navSteps__container">
        <ul class="PJ071-navSteps">
          ${steps}
        </ul>
        <ul class="PJ071-navStepsProgress">
          ${stepsProgress}
        </ul>
      </div>
    </div>`;

    const mainMobileContainer = document.querySelector('div.main.mainMobileInside');
    if (mainMobileContainer) {
      mainMobileContainer.insertAdjacentHTML('afterbegin', navStepsContainer);
    } else if (window.location.pathname.indexOf('/basket-confirmation.aspx') > -1) {
      pollerLite(['#ctl00_cphBody_upUpsell', '.upsell-mobile .inlineProducts .product .productinfo .m-checkout-buttons' ], () => {
        document.querySelector('.main').insertAdjacentHTML('afterbegin', navStepsContainer);
        const progressBarEl = document.querySelector('.PJ071-navSteps__wrapper');
        progressBarEl.setAttribute('style', 'display: none;');
        // document.querySelector('#ctl00_cphBody_upUpsell').insertAdjacentHTML('beforebegin', navStepsContainer);
      });
    } else {
      document.querySelector('.main').insertAdjacentHTML('afterbegin', navStepsContainer);
    }

    // --- If user has selected Order Method already
    // change Store to Delivery or Collection
    if (sessionStorage.getItem('PJ071-orderMethod')) {
      const storeLabelContainer = document.querySelector('li.PJ071-step__store');
      const storeLabel = storeLabelContainer.querySelector('.PJ071-text');
      
      storeLabelContainer.classList.add('orderMethodSelected');
      switch(sessionStorage.getItem('PJ071-orderMethod')) {
        case 'DeliveryMobile':
          storeLabel.innerText = 'Delivery';
          break;
        case 'CollectionMobile':
          storeLabel.innerText = 'Collection';
          break;
      }
    }
  }
}

function removeSessionStorageItems() {
  const basketTotal = document.querySelector('td.basket .menuContent span.menuEntry');
  if (basketTotal) {
    const basketTotalText = basketTotal.innerText;
    if (basketTotalText === '£0.00') {
      sessionStorage.removeItem('PJ071-offerSelected');
      sessionStorage.removeItem('PJ071-orderMethod');
    }
  }
}

export { setup, addTopPaddingToProgressBar, bindOrderMethodClickEvent, generateNavStepsProgress, removeSessionStorageItems, clickCtaBtn }; // eslint-disable-line
