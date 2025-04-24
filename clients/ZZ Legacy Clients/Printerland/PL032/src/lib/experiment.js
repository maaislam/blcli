/**
 * PL032 -  Similiar Printers Content
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.printerland.co.uk/product/xerox-versalink-c600n/139739
 */
import { setup, generateLightbox } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import PL030 from './PL030';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();
  if (shared.VARIATION == 'control') {
    // -- CONTROL - PL030
    pollerLite([`.content__wrapper.product_main__body .row.limited-row .column._50`,
    `.container.product-page__quick-links`,
    '.product__items.bundle_items',
    () => {
      let poller = false;
      if (document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_lblLowStock.lowstock') === null) {
        poller = true;
      }
      return poller;
    },], PL030);
  } else {
    pollerLite([`.content__wrapper.product_main__body .row.limited-row .column._50`,
    `.container.product-page__quick-links`,
    '.product__items.bundle_items',
    () => {
      let poller = false;
      if (document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_lblLowStock.lowstock') === null) {
        poller = true;
      }
      return poller;
    },], PL030);

    // -- Hide original Similar Printers section
    document.querySelector('section#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_pnlCrossSell').classList.add(`${shared.ID}-hidden`);
    
    // Write experiment code here
    generateLightbox(shared.VARIATION);

    

    // --- Similar Products CTA
    const cartridgeLinkEl = document.querySelector('div#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_pnlRelatedLink');
    const similarProductsBtnContainer = `<div id="${shared.ID}-similarProductsLink" class="row">		
      <div class="column">
          <div class="btn similarPrinters__link"><i class="pl-icon"></i>Compare to Similar Printers</div>
      </div>
    </div>`;
    cartridgeLinkEl.insertAdjacentHTML('beforebegin', similarProductsBtnContainer);
    

    const similarPrintersCTA = document.querySelector(`#${shared.ID}-similarProductsLink`);
    similarPrintersCTA.addEventListener('click', () => {
      if (document.querySelector('li span.is-active')) {
        // alert('remove active class');
        document.querySelector('li span.is-active').classList.remove('is-active'); 
      }
      // alert('add active class');
      similarPrintersEl.querySelector('span').classList.add('is-active');
      document.querySelector(`.${shared.ID}-lightbox__content`).classList.remove('hide');
      document.querySelector(`.${shared.ID}-lightbox__header .btn`).innerText = 'Hide';
      
      document.querySelector(`#${shared.ID}-scrollToPrinters`).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });

    const similarPrintersAnchorItem = `<li id="${shared.ID}-similarPrinter" class="scroller__item">
      <span data-anchor-id="9" class="">Similar Printers</span>
    </li>`;
    const overViewAnchorItem = document.querySelector('li#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_liOverView');
    const keyFeaturesAnchorItem = document.querySelector('li.scroller__item');
    if (shared.VARIATION == '1') {
      overViewAnchorItem.insertAdjacentHTML('afterend', similarPrintersAnchorItem);
    } else if (shared.VARIATION == '2') {
      keyFeaturesAnchorItem.insertAdjacentHTML('beforebegin', similarPrintersAnchorItem);
      pollerLite([`.${shared.ID}-lightbox__wrapper .${shared.ID}-lightbox__close`,
      `.${shared.ID}-lightbox__content`], () => {
        const closeIcon = document.querySelector(`.${shared.ID}-lightbox__wrapper .${shared.ID}-lightbox__close`);
        const mainContent = document.querySelector(`.${shared.ID}-lightbox__content`);
        mainContent.classList.add('hide');
        closeIcon.querySelector('.btn').innerText = 'Show Savings';
      });
      
    }
    

    const similarPrintersEl = document.querySelector('#PL032-similarPrinter');
    similarPrintersEl.addEventListener('click', () => {
      if (document.querySelector('li span.is-active')) {
        document.querySelector('li span.is-active').classList.remove('is-active'); 
      }
      similarPrintersEl.querySelector('span').classList.add('is-active');
      document.querySelector(`.${shared.ID}-lightbox__content`).classList.remove('hide');
      document.querySelector(`.${shared.ID}-lightbox__header .btn`).innerText = 'Hide';

      document.querySelector(`#${shared.ID}-scrollToPrinters`).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });
  }
  
};


export default activate;