/**
 * PL026 - Printer Finder - Version 2
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  if (window.location.pathname === '/') {
    pollerLite(['#pnlFilterType #ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_lnkLaserInkjet'], () => {
      const printerCta = document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_lnkLaserInkjet');
  
      printerCta.addEventListener('click', (event) => {
        window.event.preventDefault();
        event.stopPropagation();
        window.location.href = 'https://www.printerland.co.uk/printerfinder.aspx';
      });
    });
  } else if (window.location.pathname === '/printerfinder.aspx') {
    const zoovuTitle = `<div class="${shared.ID}-zoovu-header">
      <div class="${shared.ID}-zoovu-title">Let us help find your perfect printer…</div>
    </div>`;

    if (!document.querySelector(`.${shared.ID}-zoovu-header`)) {
      document.querySelector('#zoovu-assistant').insertAdjacentHTML('beforebegin', zoovuTitle);
    }
    const productFinderTab = document.querySelector('#ctl00_ctl00_pnlUpdateFilter');
    if (productFinderTab) {
      productFinderTab.setAttribute('style', 'display: none !important;');
    }
  } else {
    const productFinder = `<div id="ctl00_ctl00_pnlUpdateFilter">             
      <div id="ctl00_ctl00_pnlFilterWrapper" class="finderwrap">
        <a id="ctl00_ctl00_lnkFinder" class="init" href="https://www.printerland.co.uk/printerfinder.aspx">
          <span id="ctl00_ctl00_lblFinderTitle" class="title">
            <span>Product Finder</span>
          </span>
        </a>
      </div>
    </div>`;

    document.querySelector('form').insertAdjacentHTML('afterbegin', productFinder);
    const productFinderTab = document.querySelector('#ctl00_ctl00_pnlUpdateFilter');
    if (productFinderTab) {
      productFinderTab.setAttribute('style', 'display: block !important;');
    }
  }
  
  /**
   * @desc When content is reloaded, then re-run the experiment
   */
  pollerLite(['#ctl00_ctl00_pnlUpdatestaticWrapper'], () => {
    observer.connect(document.querySelector('#ctl00_ctl00_pnlUpdatestaticWrapper'), () => {
      activate();
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
