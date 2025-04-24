/**
 * PL025 - Printer finder | Desktop
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, bindButtonsEventListeners, closeZoovu, generateNewBox } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();
  
  if (sessionStorage.getItem(`${shared.ID}-zoovuOpen`) && sessionStorage.getItem(`${shared.ID}-zoovuOpen`) === 'true') {
    // --- Hide banner content
    document.querySelector('.page-home .filter-container .svg_home').setAttribute('style', 'animation: none !important; background: none !important; background-color: #FFF !important;');
    document.querySelector('.mainbody-container .left').setAttribute('style', 'display: none !important;');
    document.querySelector('.mainbody-container .right').setAttribute('style', 'display: none !important;');
    
    const zoovuContainer = `<div id="zoovu-assistant"></div>`;
    const mainBannerSection = document.querySelector('.filter-container.search');
    if (!document.querySelector('#zoovu-assistant')) {
      mainBannerSection.insertAdjacentHTML('beforeend', zoovuContainer);
    }
    // *** Run Zoovu Script ***
    const newScript = document.createElement("script");
    newScript.setAttribute('id', `zoovuScript`);
    newScript.src = "https://api-tiger.zoovu.com/api/v1/advisors/xLl9JnFl/js-loader?locale=en-GB";
    if (!document.querySelector('#zoovuScript')) {
      document.head.appendChild(newScript);
      // --- Add second Zoovu Script on Head tag
      if (!document.querySelector('#zoovuScript-2')) {
        document.head.insertAdjacentHTML('beforeend', `<script id="zoovuScript-2" type="text/javascript" src="//api-tiger.zoovu.com/api/v1/integrations/zBPMZl/zoovu-tracking"></script>`);
      }

      const zoovuTitle = `<div class="${shared.ID}-zoovu-header">
        <div class="${shared.ID}-zoovu-title">Let us help find your perfect printer…</div>
        <div class="${shared.ID}-zoovu-close" id="${shared.ID}-closeZoovu"></div>
      </div>`;

      if (!document.querySelector(`.${shared.ID}-zoovu-header`)) {
        document.querySelector('#zoovu-assistant').insertAdjacentHTML('beforebegin', zoovuTitle);
      }
      closeZoovu();
    }
    document.querySelector('#zoovu-assistant').setAttribute('style', 'display: block !important;');
    sessionStorage.setItem(`${shared.ID}-zoovuOpen`, true);
  }
  // Write experiment code here
  generateNewBox();

  const mainBanner = document.querySelector('.page-home .filter-container .svg_home');

  bindButtonsEventListeners();
  
  pollerLite(['#zoovu-assistant div.using-mouse'], () => {
    const zoovuTitle = `<div class="${shared.ID}-zoovu-header">
      <div class="${shared.ID}-zoovu-title">Let us help find your perfect printer…</div>
      <div class="${shared.ID}-zoovu-close" id="${shared.ID}-closeZoovu"></div>
    </div>`;

    if (!document.querySelector(`.${shared.ID}-zoovu-header`)) {
      document.querySelector('#zoovu-assistant').insertAdjacentHTML('beforebegin', zoovuTitle);
    }
    
    setTimeout(function(){ 
      document.querySelector(`.${shared.ID}-zoovu-title`).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }, 500);


    // Close Zoovu
    closeZoovu();
  });

  /**
   * @desc When content is reloaded, then re-run the experiment
   */
  setTimeout(function(){ 
    window.location.reload();
  }, 600000);
  pollerLite(['#ctl00_ctl00_pnlUpdatestaticWrapper'], () => {
    observer.connect(document.querySelector('#ctl00_ctl00_pnlUpdatestaticWrapper'), () => {
      if (sessionStorage.getItem(`${shared.ID}-zoovuOpen`) && sessionStorage.getItem(`${shared.ID}-zoovuOpen`) === 'true') {
        // --- Hide banner content
        document.querySelector('.page-home .filter-container .svg_home').setAttribute('style', 'animation: none !important; background: none !important; background-color: #FFF !important;');
        document.querySelector('.mainbody-container .left').setAttribute('style', 'display: none !important;');
        document.querySelector('.mainbody-container .right').setAttribute('style', 'display: none !important;');
        document.querySelector('#zoovu-assistant').setAttribute('style', 'display: block !important;');
        sessionStorage.setItem(`${shared.ID}-zoovuOpen`, true);

        closeZoovu();
      } else {
        generateNewBox();
        bindButtonsEventListeners();
      }
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        // subtree: true,
      },
    });
  });
};

export default activate;
