/**
 * SD074 - Mobile PDP
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.salonsdirect.com/glitterbels-loose-glitter-15g
 * 
 * https://www.salonsdirect.com/shrine-drop-it-hair-drops-20ml-purple
 * 
 * https://www.salonsdirect.com/schwarzkopf-igora-royal-absolutes-60ml-5-80-light-brown-red-natural
 */
import { setup, getProductsFromCategory } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { eventFire } from './../../../../../lib/utils';
import shared from './shared';
import plpPages from './plp-pages';
// import skuPages from './sku-pages';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  // console.log(`>>>>${ID} is running`);
  const page = window.location.pathname;
  
  setTimeout(() => {
    let prodSku = document.querySelector('.product-info-main .product.attribute.sku');
    let checkSkuVisible = prodSku.getAttribute('style');
  // --- PLP ----------
    let skuPage = sessionStorage.getItem(`${ID}-product`);
    let skuImg = sessionStorage.getItem(`${ID}-product-img`);
    if (checkSkuVisible == "display: none;") {
      if (skuPage) {
        pollerLite(['img.fotorama__img'], () => {
          document.querySelector('.catalog-product-view .fotorama__stage').style.border = 'border: none !important;';
          document.querySelector('img.fotorama__img').setAttribute('src', skuImg);
        });
        /**
         * @desc Changes the VARIANT OPTION 
         * to a pre-selected option based on SKU variant
         */
        // pollerLite(['select.super-attribute-select'], () => {
        //   const skuSelect = document.querySelector('select.super-attribute-select');
        //   const skuSelection = skuPages[`${skuPage}`].selection;
        //   for (let i = 0; i < skuSelect.length; i += 1) {
        //     let opt = skuSelect.options[i];
        //     if (opt.innerText.trim().indexOf(`${skuSelection}`) > -1) {
        //       if (opt.getAttribute('disabled') == "") {
        //         opt.removeAttribute('disabled');
        //         skuSelect.classList.add(`${ID}-out-of-stock`);
        //         // opt.innerText = "Choose an option";
        //       }
        //       opt.selected = true;
        //       opt.selected = 'selected';
        //       break;
        //     }
        //   }
        //   eventFire(skuSelect, 'change');
        //   sessionStorage.removeItem(`${ID}-product`);
        //   sessionStorage.removeItem(`${ID}-product-img`);
        // });
        /***********************************************************************************************/
      }
      
      // // --- UPDATE PRODUCT TITLE

      // // --- MOVE WISHLIST CTA & OFFER TEXT

      // //// if (skuPages[`${page}`])

      // // --- OUT OF STOCK

    } 
    /**
     * @desc Functionality for SKU products
     * When landing on a SKU product, it gets the variant option
     * and redirects to the parent product where it pre-selects the variant option,
     * e.g. if SKU https://www.salonsdirect.com/glitterbels-loose-glitter-15g-ocean
     * it gets "ocean" and pre-selects it on https://www.salonsdirect.com/glitterbels-loose-glitter-15g
     */
  //   else {
  // // --- Product SKU available / SKU Page
  //     if (skuPages[`${page}`]){
  //       pollerLite(['a.more-options', 'img.fotorama__img'], () => {
  //         document.querySelector('body').insertAdjacentHTML('afterbegin', `<div class="${ID}-overlay"></div>`);
  //         document.querySelector('#maincontent').setAttribute('style', 'visibility: hidden;');
  //         const prodImg = document.querySelector('img.fotorama__img').getAttribute('src');
  //         const moreOptionsCta = document.querySelector('a.more-options');
  //         sessionStorage.setItem(`${ID}-product`, `${page}`);
  //         sessionStorage.setItem(`${ID}-product-img`, `${prodImg}`);
  //         moreOptionsCta.click();
  //       });
  //     }
  //     //////////
      // --- UPDATE PRODUCT TITLE
      const prodTitle = document.querySelector('h1.page-title span.base');
      if (plpPages[`${page}`]) {
        const brand = plpPages[`${page}`].brand;
        const name = plpPages[`${page}`].prodName;
        const category = plpPages[`${page}`].prodCat;
        const newTitle = `<div class="${ID}-brand-name">${brand}</div>
        <div class="${ID}-product-name">${name}</div>
        <div class="${ID}-category">${category}</div>`;
        prodTitle.innerHTML = newTitle;
      }

      // --- MOVE WISHLIST CTA & OFFER TEXT
      setTimeout(() => {
        // alert('move 2');
        const wishlist = document.querySelector('.product-addto-links')
        document.querySelector('.product.media').insertAdjacentElement('beforebegin', wishlist);
        wishlist.classList.add(`${ID}-wishlist`);
    
        const offerEl = document.querySelector('.product.attribute.offer-heading-two');
        const prodSkuEl = document.querySelector('.product-info-main .product.attribute.sku');
        offerEl.insertAdjacentElement('afterend', prodSkuEl);
      }, 3000);

      // --- OUT OF STOCK
      if (document.querySelector(`.product-info-stock-sku .stock.unavailable`)) {
        document.querySelector(`.product-info-stock-sku`).insertAdjacentHTML('afterend', `<div class="${ID}-outOfStock__msg"><span>Out of stock</span></div>`);
        document.querySelector('.product-info-stock-sku').setAttribute('style', 'display: none');
      }

  //     /////////
      
  //   }
  /********************************************************************************************/
  }, 500);

  // document.querySelector('head').insertAdjacentHTML('beforeend', `<script src="jquery-3.5.1.min.js"></script>`);

  /**
   * @desc Re-styles RECOMMENDED PRODUCTS list
   * to look like a carousel
   */
  // pollerLite(['.block-emarsys ol.products.list.items.product-items'], () => {
  //   const allCarousels = document.querySelectorAll('.block-emarsys ol.products.list.items.product-items');
  //   [].forEach.call(allCarousels, (carousel) => {
  //     const items = carousel.querySelectorAll('li.product-item');
  //     const customWidth = items.length * 165;
  //     carousel.setAttribute('style', `width: ${customWidth}px;`);

  //     const moveCarousel = carousel.closest('.block-emarsys');

  //     pollerLite([`.${ID}-outOfStock__msg`], () => {
  //       if (document.querySelector(`.${ID}-outOfStock__msg`)) {
  //         document.querySelector('.product.info.detailed').insertAdjacentElement('beforebegin', moveCarousel);
  //       }
  //     });
      
      
  //   });

  // });
  /**
   * @desc Re-styles RECENTLY VIEWED list
   * to look like a carousel
   */
  pollerLite(['.block.widget.block-viewed-products-grid'], () => {
    const recentlyViewedBlock = document.querySelector('.block.widget.block-viewed-products-grid');
    const items = recentlyViewedBlock.querySelectorAll('li.product-item');
    if (items.length > 2) {
      const customWidth = items.length * 165;
      recentlyViewedBlock.querySelector('ol.product-items').setAttribute('style', `width: ${customWidth}px;`);
    }
  });
  /********************************************************************************************/

  // Call for Brand Products
  if (plpPages[`${page}`].brandCat !== '') {
    const brandCategory = `https://www.salonsdirect.com${plpPages[`${page}`].brandCat}`;
    getProductsFromCategory(brandCategory, page, 'brand', (productsData) => {
      document.querySelector('.product.info.detailed').insertAdjacentHTML('beforeend', productsData);
    });
  }
  // Call for Category Products
  if (plpPages[`${page}`].mainCat !== '') {
    const brandCategory = `https://www.salonsdirect.com${plpPages[`${page}`].mainCat}`;
    getProductsFromCategory(brandCategory, page, 'main', (productsData) => {
      document.querySelector('.product.info.detailed').insertAdjacentHTML('beforeend', productsData);
    });
  }
  
  
};


export default activate;