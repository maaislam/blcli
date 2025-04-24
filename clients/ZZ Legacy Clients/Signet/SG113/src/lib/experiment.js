/**
 * SG113 - Tangiblee / Syte
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    const ctaButtonsContainer = document.querySelector('.product-gallery__syte.js-syte-functionality');

    // --- SHOP SIMILAR cta
    const shopSimilarCTA = ctaButtonsContainer.querySelector('button.syte-discovery');
    shopSimilarCTA.classList.add(`v${VARIATION}`);
    // --- VIRTUAL cta
    const hiddenTangibleeCTA = document.querySelector('.tangiblee-button');
    let newVirtualButtonEl = '';

    if(getSiteFromHostname() == 'ernestjones') {
      newVirtualButtonEl = `<button data-image-src="https://d15k2d11r6t6rl.cloudfront.net/public/_thumbs/Integrators/ae52a6e2-ca6a-4d8e-8944-532f952aae85/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/SG%20-%20virtual%20try%20on.png_thumb.png?hash=1611258824054" class="${ID}-tangiblee-button syte-button product-gallery__syte-button v${VARIATION}">
        <img src="https://d15k2d11r6t6rl.cloudfront.net/public/_thumbs/Integrators/ae52a6e2-ca6a-4d8e-8944-532f952aae85/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/SG%20-%20virtual%20try%20on.png_thumb.png?hash=1611258824054" class="${ID}-tangiblee-icon syte-button__icon product-gallery__syte-icon" aria-hidden="true" alt="Syte logo"> 
        <span class="${ID}-tangiblee-label syte-button__label product-gallery__syte-label">Virtual try-on</span>
      </button>`;
    } else if(getSiteFromHostname() == 'hsamuel') {
      newVirtualButtonEl = `<button data-image-src="https://d15k2d11r6t6rl.cloudfront.net/public/_thumbs/Integrators/ae52a6e2-ca6a-4d8e-8944-532f952aae85/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/HS%20-%20virtual%20icon.png_thumb.png?hash=1611258824054" class="${ID}-tangiblee-button syte-button product-gallery__syte-button v${VARIATION}">
        <img src="https://d15k2d11r6t6rl.cloudfront.net/public/_thumbs/Integrators/ae52a6e2-ca6a-4d8e-8944-532f952aae85/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/HS%20-%20virtual%20icon.png_thumb.png?hash=1611258824054" class="${ID}-tangiblee-icon syte-button__icon product-gallery__syte-icon" aria-hidden="true" alt="Syte logo"> 
        <span class="${ID}-tangiblee-label syte-button__label product-gallery__syte-label">Virtual try-on</span>
      </button>`;

      shopSimilarCTA.querySelector('img').setAttribute('src', 'https://d15k2d11r6t6rl.cloudfront.net/public/_thumbs/Integrators/ae52a6e2-ca6a-4d8e-8944-532f952aae85/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/HS%20icon%20new.png_thumb.png?hash=1611258824054');

      ctaButtonsContainer.insertAdjacentHTML('beforebegin', `<div class="${ID}-line"></div>`)
    }

    
    ctaButtonsContainer.insertAdjacentHTML('afterbegin', newVirtualButtonEl);

    const virtualButtonCTA = document.querySelector(`.${ID}-tangiblee-button`);
    virtualButtonCTA.addEventListener('click', () => {
      hiddenTangibleeCTA.click();
    });

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
