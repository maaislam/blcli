/**
 * BO077 - Tabbed Carousel - PDP
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { events } from '../../../../../lib/utils';
import { cookieOpt, setup, resizeCarousels, observeWindowWidthAndReload } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  if (VARIATION === "control"){

  cookieOpt();
  var rrEl = document.querySelectorAll('.rrItemContainer');
  for (let index = 0; index < rrEl.length; index++) {
    const element = rrEl[index];
    element.addEventListener('click', () => {
      events.send(`Experimentation`, `Boots - ${ID} V${VARIATION}`, `Clicked Product`);
    })
  }

  }
  
  else {
  
  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
  // --- Default Active Tab
  document.getElementById('item_page.rec1').classList.add('active');
  document.getElementById('item_page.rec1').setAttribute('style', 'display: block !important;');

  /**
   * @desc Create carousel tabs
   */
  const carouselsWrapper = document.querySelector('#richRelevanceContainer');
  const tabsContainer = `<div class="${ID}-tabs__wrapper">
    <ul class="${ID}-tabs__container">
      <li class="${ID}-tab active" data-id="item_page.rec1"><p>Trending</p></li>
      <li class="${ID}-tab" data-id="item_page.rec2"><p>Associated</p></li>
      <li class="${ID}-tab" data-id="item_page.rec3"><p>Popular</p></li>
      <div class="${ID}-sliderBar"></div>
      <div class="${ID}-splitLine"></div>
    </ul>
  </div>`;
  if (!document.querySelector(`.${ID}-tabs__wrapper`)) {
    carouselsWrapper.insertAdjacentHTML('beforebegin', tabsContainer);
  }

  /**
   * @desc Tab click event listeners
   */
  const allTabs = document.querySelectorAll(`.${ID}-tab`);
  [].forEach.call(allTabs, (tab) => {
    tab.addEventListener('click', (e) => {
      // --- Remove previous selection and select new active tab
      document.querySelector(`.${ID}-tab.active`).classList.remove('active');
      tab.classList.add('active');

      // --- Show selected tab
      const tabId = tab.getAttribute('data-id');
      const selectedTab = document.getElementById(`${tabId}`);
      document.querySelector('.rrPlacements.active').classList.remove('active');
      selectedTab.classList.add('active');

      if (tabId !== 'item_page.rec1') {
        // document.getElementById(`item_page.rec1`).setAttribute('style', 'display: block; visibility: hidden;');
        // document.getElementById(`item_page.rec1`).setAttribute('style', 'display: none;');
        document.getElementById(`item_page.rec1`).setAttribute('style', 'visibility: hidden;');
      } else {
        // document.getElementById(`item_page.rec1`).setAttribute('style', 'display: block; visibility: visible;');
        // document.getElementById(`item_page.rec1`).setAttribute('style', 'display: block;');
        document.getElementById(`item_page.rec1`).setAttribute('style', 'visibility: visible;');
      }
    });
  });

  var tabEl = document.querySelectorAll('.BO077-tab');
  for (let index = 0; index < tabEl.length; index++) {
    const element = tabEl[index];
    element.addEventListener('click', () => {
      events.send(`Experimentation`, `Boots - ${ID} V${VARIATION}`, `Clicked Tab`);
    })
  }
  
  var rrEl = document.querySelectorAll('.rrItemContainer');
  for (let index = 0; index < rrEl.length; index++) {
    const element = rrEl[index];
    element.addEventListener('click', () => {
      events.send(`Experimentation`, `Boots - ${ID} V${VARIATION}`, `Clicked Product`);
    })
  }

  /**
   * @desc Loop through all products and add new 'SHOP NOW' CTA button
   */
  let allCarouselProducts = document.querySelectorAll('.rrItemContainer');
  [].forEach.call(allCarouselProducts, (prod) => {
    const prodUrl = prod.querySelector('.rrImageContainer a').getAttribute('href');

    // // -- Product Title
    // const productTitleEl = prod.querySelector('.rrItemTitle');
    // let productTitle = productTitleEl.innerText.trim();
    // if (productTitle.length > 50) {
    //   const length = 50;
    //   const trimmedString = productTitle.substring(0, length);
    //   productTitle = `${trimmedString}...`;

    //   productTitleEl.innerText = productTitle;
    // }

    // // -- Promo Message
    // const firstLine = prod.querySelector('.rrPriceContainer p');
    // if (!firstLine.classList.contains('product_price')
    // && !firstLine.classList.contains('product_ppu')) {
    //   // let lineStyle = firstLine.getAttribute('style');
    //   // lineStyle = `${lineStyle} position: absolute; top: -20px;`;
    //   // firstLine.setAttribute('style', lineStyle);
    // }

    const shopCtaBtn = `<a href="${prodUrl}" role="button" class="${ID}-shopCta button primary primary_redesign" title="Shop Now">
      <div class="left_border"></div>
      <div class="button_text">
        Shop Now
      </div>
      <div class="right_border"></div>
    </a>`;

    // --- Replace product image
    const imageEl = prod.querySelector('.rrImageContainer img');
    let imageUrl = imageEl.getAttribute('src');
    imageUrl = imageUrl.replace('135', '435');
    imageUrl = imageUrl.replace('171', '471');
    imageEl.setAttribute('src', imageUrl);

    // --- Add Shop Button
    prod.insertAdjacentHTML('beforeend', shopCtaBtn);
  });

  // --- Re-run functions after 5 seconds
  // setTimeout(() => {
  //   allCarouselProducts = document.querySelectorAll('.rrItemContainer');
  //   [].forEach.call(allCarouselProducts, (prod) => {
  //     // -- Product Title
  //     const productTitleEl = prod.querySelector('.rrItemTitle');
  //     let productTitle = productTitleEl.innerText.trim();
  //     if (productTitle.length > 50) {
  //       const length = 50;
  //       const trimmedString = productTitle.substring(0, length);
  //       productTitle = `${trimmedString}...`;

  //       productTitleEl.innerText = productTitle;
  //     }
  //   });
  // }, 5000);

  setTimeout(() => {
    [].forEach.call(allCarouselProducts, (prod) => {
      // --- Replace product image
      const imageEl = prod.querySelector('.rrImageContainer img');
      let imageUrl = imageEl.getAttribute('src');
      imageUrl = imageUrl.replace('135', '435');
      imageUrl = imageUrl.replace('171', '471');
      imageEl.setAttribute('src', imageUrl);
    });  
  }, 5000);


  // observeWindowWidthAndReload();
  // resizeCarousels();
}
};
