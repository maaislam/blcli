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
import { onUrlChange, mmToInchFraction, mmToGa, inchesToMM, gaugeToMM } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;
const regex = /(\d+(?:ga|mm))\s+x\s+(\d+(?:\/\d+|(?:ga|mm)?))/;

const extractDimensions = (description) => {
  const matches = description.match(regex);

  if (matches) {
    const diameter = matches[1];
    const length = matches[2];
    return { diameter, length };
  }
};

const stickyHeaderTextChange = () => {
  const stickyBanner = document.querySelector('div[data-qaid="pdp_sticky_banner"]');
  if (stickyBanner && !stickyBanner.classList.contains(`${ID}__sticky`) && window.diameter && window.length) {
    const mainText = stickyBanner.querySelector('.vblWL9').childNodes[0];
    mainText.nodeValue = mainText.nodeValue.replace(
      /(\d+(\.\d+)?(?:ga|mm))\s+x\s+(\d+(\.\d+)?(?:\/\d+"|(?:ga|mm)?))/,
      `${window.diameter} x ${window.prodLength}`
    );
    stickyBanner.classList.add(`${ID}__sticky`);

    if (!document.body.classList.contains(`${ID}__seeStickyTitle`)) {
      fireEvent('User scrolls to see the sticky title');
      document.body.classList.add(`${ID}__seeStickyTitle`);
    }
  }
};

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'product page'; //add page check conditions here based on experiment requirement

  if (!pageCondition) {
    //remove DOM element added by the experiment
    const element = document.querySelector('.element');
    if (element) element.remove();

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
  const productMainTitleElement = document.querySelector('[data-qaid="pdp-product-name"] span[itemprop="name"]');
  const productTitle = productMainTitleElement.textContent;
  const prodInfo = extractDimensions(productTitle);

  if (VARIATION === '1') {
    if (prodInfo && prodInfo.diameter.endsWith('ga')) {
      const gaugeValue = prodInfo.diameter.replace('ga', '');
      const mmValue = gaugeToMM(gaugeValue);
      window.diameter = `${mmValue}mm`;
    } else if (prodInfo && prodInfo.diameter.endsWith('mm')) {
      window.diameter = `${prodInfo.diameter}`;
    }

    if (prodInfo && prodInfo.length && prodInfo.length.includes('/')) {
      const mmLength = inchesToMM(prodInfo.length);
      window.prodLength = `${mmLength}mm`;
    } else if (prodInfo && prodInfo.length && prodInfo.length.includes('mm')) {
      window.prodLength = `${prodInfo.length}`;
    }

    if (window.diameter && window.prodLength) {
      productMainTitleElement.textContent = productMainTitleElement.textContent.replace(
        /(\d+(\.\d+)?(?:ga|mm))\s+x\s+(\d+(\.\d+)?(?:\/\d+"|(?:ga|mm)?))/,
        `${window.diameter} x ${window.prodLength}`
      );
    }
  }

  if (VARIATION === '2') {
    if (prodInfo && prodInfo.diameter.endsWith('mm')) {
      const mmValue = prodInfo.diameter.replace('mm', '');
      const gaValue = mmToGa(mmValue);
      window.diameter = `${gaValue}ga`;
    } else if (prodInfo && prodInfo.diameter.endsWith('ga')) {
      window.diameter = `${prodInfo.diameter}`;
    }

    if (prodInfo && prodInfo.length && prodInfo.length.includes('mm')) {
      const mmValue = prodInfo.length.replace('mm', '');
      const inches = mmToInchFraction(mmValue);
      window.prodLength = `${inches}`;
    } else if (prodInfo && prodInfo.length && prodInfo.length.includes('/')) {
      window.prodLength = `${prodInfo.length}"`;
    }

    if (window.diameter && window.prodLength) {
      productMainTitleElement.textContent = productMainTitleElement.textContent.replace(
        /(\d+(\.\d+)?(?:ga|mm))\s+x\s+(\d+(\.\d+)?(?:\/\d+"|(?:ga|mm)?))/,
        `${window.diameter} x ${window.prodLength}`
      );
    }
  }

  if (VARIATION === '3') {
    if (prodInfo && prodInfo.diameter.endsWith('ga')) {
      const gaugeValue = prodInfo.diameter.replace('ga', '');
      const mmValue = gaugeToMM(gaugeValue);
      window.diameter = `${mmValue}mm`;
    } else if (prodInfo && prodInfo.diameter.endsWith('mm')) {
      window.diameter = `${prodInfo.diameter}`;
    }

    if (prodInfo && prodInfo.length && prodInfo.length.includes('mm')) {
      const mmValue = prodInfo.length.replace('mm', '');
      const inches = mmToInchFraction(mmValue);
      window.prodLength = `${inches}`;
    } else if (prodInfo && prodInfo.length && prodInfo.length.includes('/')) {
      window.prodLength = `${prodInfo.length}"`;
    }

    if (window.diameter && window.prodLength) {
      productMainTitleElement.textContent = productMainTitleElement.textContent.replace(
        /(\d+(\.\d+)?(?:ga|mm))\s+x\s+(\d+(\.\d+)?(?:\/\d+"|(?:ga|mm)?))/,
        `${window.diameter} x ${window.prodLength}`
      );
    }
  }

  if (VARIATION === '4') {
    if (prodInfo && prodInfo.diameter.endsWith('mm')) {
      const mmValue = prodInfo.diameter.replace('mm', '');
      const gaValue = mmToGa(mmValue);
      window.diameter = `${gaValue}ga`;
    } else if (prodInfo && prodInfo.diameter.endsWith('ga')) {
      window.diameter = `${prodInfo.diameter}`;
    }

    if (prodInfo && prodInfo.length && prodInfo.length.includes('/')) {
      const mmLength = inchesToMM(prodInfo.length);
      window.prodLength = `${mmLength}mm`;
    } else if (prodInfo && prodInfo.length && prodInfo.length.includes('mm')) {
      window.prodLength = `${prodInfo.length}`;
    }

    if (window.diameter && window.prodLength) {
      productMainTitleElement.textContent = productMainTitleElement.textContent.replace(
        /(\d+(\.\d+)?(?:ga|mm))\s+x\s+(\d+(\.\d+)?(?:\/\d+"|(?:ga|mm)?))/,
        `${window.diameter} x ${window.prodLength}`
      );
    }
  }

  pollerLite(['#tabpanel-2'], () => {
    const tabContent = document.querySelector('#tabpanel-2');
    tabContent.querySelectorAll('tbody tr').forEach((item) => {
      const itemTextElem = item.querySelector('td');
      if (itemTextElem && itemTextElem.innerText.toLocaleLowerCase() === 'screw diameter') {
        const nextElement = itemTextElem.nextElementSibling;
        nextElement.innerText = window.diameter ? window.diameter : nextElement.innerText;
      } else if (itemTextElem && itemTextElem.innerText.toLocaleLowerCase() === 'screw length') {
        const nextElement = itemTextElem.nextElementSibling;
        nextElement.innerText = window.prodLength ? window.prodLength : nextElement.innerText;
      }
    });
  });

  stickyHeaderTextChange();
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
    //check if page is correct
    //if (window.utag.data.basicPageId !== 'lister Page') return;

    const { target } = e;

    console.log('🚀 ~ clickHandler ~ target', target);

    if (target.closest('#tab-2')) {
      fireEvent('User scrolls to see the specifications');
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

  window.removeEventListener('scroll', stickyHeaderTextChange);
  window.addEventListener('scroll', stickyHeaderTextChange);
};
