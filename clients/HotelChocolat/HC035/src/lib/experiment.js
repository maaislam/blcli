/**
 * HC035 - Out of Stock Product Iteration
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  // console.log(`${ID} is running >>>`);
// --- OUT OF STOCK PAGES
  if (!document.querySelector('#primary input[name="errorID"][value="404"]')) {
    const heading = document.querySelector('#page_heading');
    const prodName = heading.querySelector('h1').innerText.trim();
    // alert(prodName);
    const primaryImg = document.querySelector('img.primary-image').src;

    let desktopImg = '';
    desktopImg = `style="background-image: url('${primaryImg}');"`;
    // if (window.innerWidth > 460) {
    //   desktopImg = `style="background-image: url('${primaryImg}');"`;
    // }

    const outOfStockMsg = `<div class="${ID}-outOfStockMsg__wrapper">
      <div class="${ID}-top__wrapper" ${desktopImg} id="${ID}-out-of-stock">
        <p><span class="${ID}-bold">We’re sorry!</span></br></br>It looks like we’ve sold out of our <strong>${prodName}</strong>.</br>Still looking to get a chocolate fix now?</p>
      </div>
      <div class="${ID}-cta__wrapper">
        <a href="/uk/shop/gift-ideas/shop-by-occasion/best-chocolate/">
          <button id="${ID}-shopGifts"><span>Shop Best Selling Gifts</span><img src="https://editor-assets.abtasty.com/48343/5fc6490b7dfb51606830347.png"></button>
        </a>
        <a href="/uk/shop/collections/products/all-products/">
          <button id="${ID}-shopAll"><span>Shop All Chocolate</span><img src="https://editor-assets.abtasty.com/48343/5fc648ca087c11606830282.png"></button>
        </a>
      </div>
    </div>`;

    heading.insertAdjacentHTML('beforebegin', outOfStockMsg);
// --- 404 ERROR PAGES
  } else {
    const outOfStockMsg = `<div class="${ID}-outOfStockMsg__wrapper">
      <div class="${ID}-top__wrapper" id="${ID}-error">
        <p><span class="${ID}-bold">Oops!</span></br></br>We can’t find the page that you’re looking for.</br>Still looking to get a chocolate fix now?</p>
      </div>
      <div class="${ID}-cta__wrapper error-page">
        <a href="/uk/shop/collections/products/all-products/">
          <button id="${ID}-shopGifts"><span>Shop Best Selling Gifts</span><img src="https://editor-assets.abtasty.com/48343/5fc6490b7dfb51606830347.png"></button>
        </a>
        <a href="/uk/shop/gift-ideas/shop-by-occasion/best-chocolate/">
          <button id="${ID}-shopAll"><span>Shop All Chocolate</span><img src="https://editor-assets.abtasty.com/48343/5fc648ca087c11606830282.png"></button>
        </a>
      </div>
    </div>`;

    document.querySelector('#primary').insertAdjacentHTML('beforebegin', outOfStockMsg);
  }

  // --- CTA Click Events
  const shopGiftsCta = document.querySelector(`#${ID}-shopGifts`);
  const shopChocolateCta = document.querySelector(`#${ID}-shopAll`);
  if (shopGiftsCta && shopChocolateCta) {
    shopGiftsCta.addEventListener('click', (e) => {
      events.send(`${ID} variation:${VARIATION}`, 'Click', 'Clicked Best Selling');
    });
    shopChocolateCta.addEventListener('click', (e) => {
      events.send(`${ID} variation:${VARIATION}`, 'Click', 'Clicked All Chocolate');
    });
  }
  
  // At end of code, reset window.einstein expect type array
  window.einstein.loaded = [];
};
