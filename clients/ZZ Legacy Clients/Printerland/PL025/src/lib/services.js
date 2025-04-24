import { fullStory } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

export const bindButtonsEventListeners = () => {
  const { ID, VARIATION } = shared;

  const printersBtn = document.querySelector(`.${shared.ID}-box__printers`);
  printersBtn.addEventListener('click', () => {
    // *** Run Zoovu Script ***
    const newScript = document.createElement("script");
    newScript.setAttribute('id', `zoovuScript`);
    newScript.src = "https://api-tiger.zoovu.com/api/v1/advisors/xLl9JnFl/js-loader?locale=en-GB";
    if (!document.querySelector('#zoovuScript')) {
      document.head.appendChild(newScript);
    }
    // --- Add second Zoovu Script on Head tag
    if (!document.querySelector('#zoovuScript-2')) {
      document.head.insertAdjacentHTML('beforeend', `<script id="zoovuScript-2" type="text/javascript" src="//api-tiger.zoovu.com/api/v1/integrations/zBPMZl/zoovu-tracking"></script>`);
    }

    // --- Hide banner content
    document.querySelector('.page-home .filter-container .svg_home').setAttribute('style', 'animation: none !important; background: none !important; background-color: #FFF !important;');
    document.querySelector('.mainbody-container .left').setAttribute('style', 'display: none !important;');
    document.querySelector('.mainbody-container .right').setAttribute('style', 'display: none !important;');
    document.querySelector('#zoovu-assistant').setAttribute('style', 'display: block !important;');
    sessionStorage.setItem(`${shared.ID}-zoovuOpen`, true);

    if (document.querySelector(`.${shared.ID}-zoovu-header`)) {
      document.querySelector(`.${shared.ID}-zoovu-header`).classList.remove('hide');
    }
  });

  const inkBtn = document.querySelector(`.${shared.ID}-box__ink`);
  inkBtn.addEventListener('click', () => {
    window.location.href = '/consumables/352';
  });
};

export const closeZoovu = () => {
  const { ID, VARIATION } = shared;

  // Close Zoovu
  const closeToolIcon = document.querySelector(`#${shared.ID}-closeZoovu`);
  closeToolIcon.addEventListener('click', () => {
    // ----- Hide Zoovu
    document.querySelector(`.${shared.ID}-zoovu-header`).classList.add('hide');
    document.querySelector(`#zoovu-assistant`).classList.add('hide');
    document.querySelector(`#zoovu-assistant`).setAttribute('style', 'display: none !important;');
    sessionStorage.setItem(`${shared.ID}-zoovuOpen`, false);
    // --- Show banner content
    document.querySelector('.page-home .filter-container .svg_home').setAttribute('style', '');
    document.querySelector('.mainbody-container .left').setAttribute('style', 'display: block !important;');
    document.querySelector('.mainbody-container .right').setAttribute('style', 'display: block !important;');

    if (!document.querySelector(`.${shared.ID}-filter-box`)) {
      const mainBannerSection = document.querySelector('.filter-container.search');
      generateNewBox(mainBannerSection);
      bindButtonsEventListeners();
    }
  });
};

export const generateNewBox = () => {
  const { ID, VARIATION } = shared;

  const zoovuContainer = `<div id="zoovu-assistant"></div>`;
  const mainBannerSection = document.querySelector('.filter-container.search');
  if (!document.querySelector('#zoovu-assistant')) {
    mainBannerSection.insertAdjacentHTML('beforeend', zoovuContainer);
  }

  const newContainer = `<div class="${shared.ID}-filter-box filter-box product_filter">
      <div class="filter-title">What are you looking<br>for today?</div>
      <div class="${shared.ID}-box__title">Let us help you...</div>
      <div class="${shared.ID}-box__text">Use our search wizard to quickly find the right printer or cartridge</div>
      <ul class="${shared.ID}-box__buttons">
        <li class="${shared.ID}-box__btn ${shared.ID}-box__printers">
          <div class="${shared.ID}-image ${shared.ID}-image__printers"></div>
          <div class="${shared.ID}-btn"><span>Printers</span></div>
        </li>
        <li class="${shared.ID}-box__btn ${shared.ID}-box__ink">
          <div class="${shared.ID}-image ${shared.ID}-image__ink"></div>
          <div class="${shared.ID}-btn"><span>Ink &amp; toner Cartridges</span></div>
        </li>
      </ul>
    </div>`;
  const leftSide = mainBannerSection.querySelector('.left');
  if (!document.querySelector(`.${shared.ID}-filter-box`)) {
    leftSide.insertAdjacentHTML('beforeend', newContainer);
  }
};
