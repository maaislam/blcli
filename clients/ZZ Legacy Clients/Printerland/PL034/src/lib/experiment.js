/**
 * PL034 -  Similar Printers Inpage Content  - Brand Differentiation (PL032 Iteration)
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * high profit: https://www.printerland.co.uk/product/xerox-versalink-c600n/139739
 * 
 * low profit: https://www.printerland.co.uk/product/canon-i-sensys-mf742cdw/145587
 */
import { setup, generateLightbox } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import PL030 from './PL030';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  document.querySelector('section#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_pnlCrossSell').classList.add('hidden');
  if (shared.VARIATION == 'control'
  || shared.VARIATION == '1') {
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

    /**
     * @desc PL034 - Check if printer is LOW profit printer
     * [PL034 addition]
     */
    const lowProfitBrands = ['lexmark', 'brother', 'canon', 'ricoh', 'tally', 'samsung'];

    const breadcrumbs = document.querySelectorAll('section.breadcrumbs ul li');
    let lowProfit = false;
    if (breadcrumbs.length > 2) {
      const productBrand = breadcrumbs[2].querySelector('a span[itemprop="name"]').innerText.trim().toLowerCase();
      for (let i = 0; i < lowProfitBrands.length; i += 1) {
        const brand = lowProfitBrands[i];
        if (productBrand.indexOf(`${brand}`) > -1) {
          lowProfit = true;
          break;
        }
      }
    }

    generateLightbox(shared.VARIATION, lowProfit);


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
      // --- similarPrintersEl.querySelector('span').classList.add('is-active');
      document.querySelector(`.${shared.ID}-lightbox__content`).classList.remove('hide');
      document.querySelector(`.${shared.ID}-lightbox__header .btn`).innerText = 'Hide';
      
      document.querySelector(`#${shared.ID}-scrollToPrinters`).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });

    const similarPrintersAnchorItem = `<li id="${shared.ID}-similarPrinter" class="scroller__item">
      <span data-anchor-id="9" class="">Similar Printers</span>
    </li>`;
    const overViewAnchorItem = document.querySelector('li#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_liOverView');
    const keyFeaturesAnchorItem = document.querySelector('li.scroller__item');
    // --- PL034 Changes ---
    if (shared.VARIATION == 'control') {
      overViewAnchorItem.insertAdjacentHTML('afterend', similarPrintersAnchorItem);
    } else if (shared.VARIATION == '1') {
      if (!lowProfit) {
        overViewAnchorItem.insertAdjacentHTML('afterend', similarPrintersAnchorItem);
      } else {
        keyFeaturesAnchorItem.insertAdjacentHTML('beforebegin', similarPrintersAnchorItem);
      }
    }
    

    const similarPrintersEl = document.querySelector(`#${shared.ID}-similarPrinter`);
    similarPrintersEl.addEventListener('click', () => {
      if (document.querySelector('li span.is-active')) {
        document.querySelector('li span.is-active').classList.remove('is-active'); 
      }
      similarPrintersEl.querySelector('span').classList.add('is-active');
      document.querySelector(`.${shared.ID}-lightbox__content`).classList.remove('hide');
      document.querySelector(`.${shared.ID}-lightbox__header .btn`).innerText = 'Hide';

      document.querySelector(`#${shared.ID}-scrollToPrinters`).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });
    
    setTimeout(() => {
      const prodScrollerWrapper = document.querySelector('.prod-scroller__wrapper');
      if(prodScrollerWrapper) {
        const height = prodScrollerWrapper.offsetHeight;

        if(height > 0) {
          document.body.insertAdjacentHTML('beforeend', `
            <style>
              .${shared.ID} .prod-scroller__wrapper {
                height: ${height}px !important;
              }
            </style>
          `);
        }
      }
    }, 1500);

    // observer.connect(document.querySelector('.product-menu__scroller.js-prod-scroller'), () => {
    //   console.log('SOMETHING HAS CHANGED-------');
    //   const left = document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_pnlQuickLinks');
    //   const right = document.querySelector('.PL030-container.container.product-container');
    //   if (document.querySelector('.product-menu__scroller.js-prod-scroller').classList.contains('fixed')) {
    //     left.style.display = 'none';
    //     right.style.display = 'none';
    //   } else {
    //     left.style.display = 'block';
    //     right.style.display = 'block';
    //   }
      
    // }, {
    //   throttle: 200,
    //   config: {
    //     attributes: true,
    //     childList: false,
    //     // subtree: true,
    //   },
    // });
    
  }
};


export default activate;
