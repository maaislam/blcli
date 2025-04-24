/**
 * ME290 - PDP Recommendations
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, addNewTabHeaders, generateNewSection, getBrandLink, getBrand, loadProductImages, newTabsEvents } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { getUrlParameter } from '../../../../../lib/utils';
import shared from './shared';
import initiateSlick from './initiateSlick';


export default () => {
  const { ID, VARIATION } = shared;
  
  setup();

  // Write experiment code here
  const regexClothing = /shirt|wear|Trousers|Dressing|Hoodies|Scarves|Gloves|Top|Slippers|Bags|Jewellery|Sweater|Hats|Necklaces|Caps|Wallets|Purses|Accessories|Cosplay|Earrings/gm;
  const regexHomeOffice = /Home|Office|Stationery|Cup|Coaster|Mug|Throw|Blanket|Kitchen|Light|Computer|Tablet|Mobile|Poster|Wall|Decoration|Boxes/gm;
  const regexGadgets = /Badges|Games|Props|Figures|Plushies|Models|Keyring/gm;

  const url = window.location.href;

  /**
   * @desc Page is PDP - Experiment running on PDP
   */
  if (url.indexOf('/brand') == -1) {
    pollerLite([
      '#related-brand-products .section-title',
      '.brand-section-content .section-title',
      '.section-content .products.wrapper .products li.item img',
      '.section-content .products.wrapper .products li.item .product.details.product-item-details',
      '.slick-initialized',
      
      () => { if(typeof window.jQuery.fn.slick !== 'undefined'){ return true }},
      () => {
        let run = false; 
        if (window.jQuery || window.$) {
        run = true;
        }
        return run;
    },], () => {
      const allCatTabs = document.querySelectorAll('#related-brand-products .section-title .product-title');
      let clothingArr = [];
      let homeOfficeArr = [];
      let gadgetsArr = [];
      for (let i = 0; i < allCatTabs.length; i += 1) {
        let tabPosition = null;
        const tab = allCatTabs[i];
        const tabTitle = tab.innerText.trim();

        let tabId = tabTitle.replace(/\,|and| |-|&|'/g, "");
        if (tabTitle.match(regexHomeOffice) !== null) {
          // --- Home & Office
          tabPosition = i;
          const section = document.querySelector(`.section-content .products.wrapper[data-id-products="${i}"]`);

          tab.setAttribute('id', tabId);
          section.setAttribute('data-id', tabId);
          section.classList.add(`${ID}-homeOffice`);

          let sectionProds = section.querySelectorAll('.products li.item');
          if (sectionProds.length > 2) {
            for (let i = 0; i < 2; i += 1) {
              let prod = sectionProds[i];
              homeOfficeArr.push(prod);
            }
          } else {
            let firstProduct = section.querySelector('.products li.item').outerHTML;
            homeOfficeArr.push(firstProduct);
          }

        } else if (tabTitle.match(regexClothing) !== null) {
          // --- Clothes
          tabPosition = i;
          const section = document.querySelector(`.section-content .products.wrapper[data-id-products="${i}"]`);

          tab.setAttribute('id', tabId);
          section.setAttribute('data-id', tabId);
          section.classList.add(`${ID}-clothing`);

          let sectionProds = section.querySelectorAll('.products li.item');
          if (sectionProds.length > 2) {
            for (let i = 0; i < 2; i += 1) {
              let prod = sectionProds[i];
              clothingArr.push(prod);
            }
          } else {
            let firstProduct = section.querySelector('.products li.item').outerHTML;
            clothingArr.push(firstProduct);
          }
          
        } else if (tabTitle.match(regexGadgets) !== null) {
          // --- Gadgets & Toys
          tabPosition = i;
          const section = document.querySelector(`.section-content .products.wrapper[data-id-products="${i}"]`);

          tab.setAttribute('id', tabId);
          section.setAttribute('data-id', tabId);
          section.classList.add(`${ID}-gadgetsToys`);


          let sectionProds = section.querySelectorAll('.products li.item');
          if (sectionProds.length > 2) {
            for (let i = 0; i < 2; i += 1) {
              let prod = sectionProds[i];
              gadgetsArr.push(prod);
            }
          } else {
            let firstProduct = section.querySelector('.products li.item').outerHTML;
            gadgetsArr.push(firstProduct);
          }

        } 

      }

      /**
       * @desc Add New Tab Headers
       */
      addNewTabHeaders();


      /**
       * @desc Generate and Populate new tabs content
       */
      generateNewSection('clothing', clothingArr);
      generateNewSection('homeOffice', homeOfficeArr);
      generateNewSection('gadgetsToys', gadgetsArr);
      

      /**
       * @desc New Event Listeners
       */
      newTabsEvents();


      // --- Load Images to avoid blank lazy load
      loadProductImages();


      pollerLite([`.${ID}-section-content ol.products.list.items.product-items`], () => {
        initiateSlick('clothing');
        initiateSlick('homeOffice');
        initiateSlick('gadgetsToys');
      });
      
      /** 
       * @desc Creates New CTA container if Brand CTA doesn't exist
       */
      if (!document.querySelector('.action-more.brand.initial')) {
        const newMoreFromBrandCta = `<div id="${ID}-more-brand-viewBrand" class="${ID}-more-brand-btn-wrapper more-brand-btn-wrapper initial" data-was-processed="true">
          <span>
            <a class="action subscribe primary" href="${getBrandLink()}/">Shop all ${getBrand()}</a>
          </span>
        </div>
        <div id="${ID}-brand-category" class="more-brand-btn-wrapper initial" data-was-processed="true">
          <span>
            <a class="action subscribe primary" data-url="${getBrandLink()}/" href="${getBrandLink()}/?type=clothing">Shop all Clothing</a>
          </span>
        </div>`;

        if (!document.querySelector(`${ID}-action-more.brand`)) {
          const newCtaContainer = `<div class="${ID}-action-more action-more brand initial" data-was-processed="true">
            ${newMoreFromBrandCta}
          </div>`;

          document.querySelector(`#related-brand-products`).insertAdjacentHTML('afterend', newCtaContainer);
        }
      }

      /**
       * @desc Polls for the Brand CTA button
       * If it exists, removes the fallback CTA and adds Category CTA
       */
      pollerLite(['.action-more.brand.initial', '#more-brand-viewBrand a.action'], () => {
        const moreFromBrand = document.querySelector('#more-brand-viewBrand');
        const brandUrl = moreFromBrand.querySelector('a.action').getAttribute('href');

        // -- Remove fallback CTA
        if (document.querySelector(`#${ID}-more-brand-viewBrand`)) {
          document.querySelector(`.${ID}-action-more`).parentNode.removeChild(document.querySelector(`.${ID}-action-more`));
        }
        
        if (!document.querySelector(`#${ID}-brand-category`)) {
          const newCta = `<div id="${ID}-brand-category" class="more-brand-btn-wrapper initial" data-was-processed="true">
            <span>
              <a class="action subscribe primary" data-url="${brandUrl}" href="${brandUrl}?type=clothing">Shop all Clothing</a>
            </span>
          </div>`;

          moreFromBrand.insertAdjacentHTML('afterend', newCta);
        }
        
      });

      
    });


  /**
   * @desc Page is Brand PLP - Experiment running on Brand PLP
   */  
  } else if (url.indexOf('/brand') > -1
  && url.indexOf('/?type=') > -1) {
    pollerLite(['.content-brand.brand-list-wrapper.initial', '.content-brand.brand-list-wrapper .products.wrapper.grid.products-grid'], () => {
      const type = getUrlParameter('type', url);
      // --- Load Images to avoid blank lazy load
      loadProductImages();

      const allCategories = document.querySelectorAll('.content-brand.brand-list-wrapper .products.wrapper.grid.products-grid');
      for (let i = 0; i < allCategories.length; i += 1) {
        let cat = allCategories[i];
        let header = cat.querySelector('h3').innerText.trim();

        if (type == 'homeOffice' && header.match(regexHomeOffice) !== null) {
          // --- Home & Office
          cat.setAttribute('style', 'background-color: #f3f3f3; padding: 1.2rem;');
          //cat.classList.add(`${ID}-section-homeOffice`);
          // break;
        } else if (type == 'clothing' && header.match(regexClothing) !== null) {
          // --- Clothing
          cat.setAttribute('style', 'background-color: #f3f3f3; padding: 1.2rem;');
         // cat.classList.add(`${ID}-section-clothing`);
          // break;
        } else if (type == 'gadgetsToys' && header.match(regexGadgets) !== null) {
          // --- Gadgets
          cat.setAttribute('style', 'background-color: #f3f3f3; padding: 1.2rem;');
         // cat.classList.add(`${ID}-section-gadgetsToys`);
          // break;
        } else {
          document.querySelector('.content-brand.brand-list-wrapper.initial').insertAdjacentElement('beforeend', cat);
        }
      }
    });
    

  }
  
  
};
