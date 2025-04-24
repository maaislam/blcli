/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { clickHandler } from './clickHandler';
import brandLogo from './components/brandLogo';
import howDoesItWork from './components/howDoesItWork';
import popularBrands from './components/popularBrands';
import seeFullRangeBtn from './components/seeFullRangeBtn';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');
  //console.log('Conditions Met');

  document.body.addEventListener('click', ({ target }) => {
    clickHandler(target, ID, VARIATION)
  });

  


  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  document.querySelector(".sib-text-single-column").insertAdjacentHTML("afterend", howDoesItWork(`${ID}`));
  const anchor = document.querySelector('.sib-products');
  anchor.insertAdjacentHTML('afterend', popularBrands(`${ID}`));
  const brandTabsWrapper = document.querySelector(`.${ID}__brand_tabs_wrapper`);
  brandTabsWrapper.insertAdjacentHTML('afterend', brandLogo(`${ID}`, document.querySelector(`.${ID}__brand_tab.active`)));
  document.querySelectorAll(`.${ID}__brand_tab`).forEach((item) => {
    item.addEventListener('click', () => {
      document.querySelectorAll(`.${ID}__brand_tab.active`).length > 0 &&
        document.querySelectorAll(`.${ID}__brand_tab.active`).forEach((item) => {
          item.classList.remove('active');
        });
      brandTabsWrapper.dataset.activebrand = item.getAttribute('data-brand');
      item.classList.add('active');
      document.querySelector(`.${ID}__brand_list_container`) ? document.querySelector(`.${ID}__brand_list_container`).remove() : null;
      document.querySelector(`.${ID}__brand_tabs_wrapper`).insertAdjacentHTML('afterend', brandLogo(`${ID}`, item));
    });
  });

  document.querySelector(".flickity-page-dots").insertAdjacentHTML('beforebegin', seeFullRangeBtn(`${ID}`));
  const carouselNextBtn = document.querySelector(".flickity-button.flickity-prev-next-button.next svg");
  carouselNextBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>`;

  const carouselPrevBtn = document.querySelector(".flickity-button.flickity-prev-next-button.previous svg");
  carouselPrevBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>`;

  document.querySelectorAll(".carousel-cell").forEach((item) => {
    item.querySelector(".product-price").textContent === "£15" ? item.querySelector(".product-details").insertAdjacentHTML("afterend", `<div class="${ID}__price_tag">Glasses from £15</div>`) : null;
  })

  document.querySelectorAll(".fa.fa-plus").forEach((item)=>{
    item.classList.remove("fa-plus");
    item.classList.add("fa-angle-down");
  })

  let isShown = false;
  if(document.querySelector(`.${ID}__popular_brand_list_container`).getClientRects()[0].top < 190 && isShown === false){
    fireEvent('container is in view');
    //console.log("container is in view");
    isShown = true;
 }
  document.addEventListener("scroll",()=>{
    if(document.querySelector(`.${ID}__popular_brand_list_container`).getClientRects()[0].top < 190 && isShown === false){
       fireEvent('Container is in view');
       //console.log("container is in view");
       isShown = true;
    }
  })
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
};
