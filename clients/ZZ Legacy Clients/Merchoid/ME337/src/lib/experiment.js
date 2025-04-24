/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import jumperData from './data';
import USjumperData from './us_data';
import { scrollToElement } from './helpers';


const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }
  
  document.documentElement.classList.add(`${ID}-details-hidden`);

  /* Top section */
  const newAddSection = () => {

    const priceEl = document.querySelector('.price-box.price-final_price').innerHTML;

    const markup = `
    <div class="${ID}-details">
      <div class="${ID}-price">${priceEl} <span class="delivery"> includes free shipping</span></div>
      <div class="${ID}-addSection"></div>
      <div class="${ID}-xmas-msg"><p>Don't settle for a boring mass market Christmas Jumper this year - be unique and stand out from the crowd</p><span></span></div>
      <a class="${ID}-view-all">View full details</a>
    </div>`;

    document.querySelector('.page-title-wrapper.product').insertAdjacentHTML('afterend', markup);
    document.querySelector(`.${ID}-addSection`).appendChild(document.querySelector('.product-add-form'));

    if(document.querySelector('.product-preorder-date-wrapper')) {
      document.querySelector(`.${ID}-addSection`).insertAdjacentElement('beforebegin', document.querySelector('.product-preorder-date-wrapper'));
    }
  }

  const fullDetails = () => {

    const allLink = document.querySelector(`.${ID}-view-all`);

    allLink.addEventListener('click', () => {
      document.documentElement.classList.remove(`${ID}-details-hidden`);
      allLink.style.display = 'none';
      scrollToElement(document.querySelector(`.product-secondary-tabs-wrapper`));
    });

  }

   /* Similar items */
  const similarItems = () => {
    if (window.location.href.indexOf('/uk/') > -1){
    const similarMarkup = `
    <div class="${ID}-similar-items">
      <div class="${ID}-container">
        <h3>The same...but slightly different</h3>
        <div class="${ID}-products"></div>
        <a href="https://www.merchoid.com/uk/geeks-guide-to-ugly-christmas-sweaterjumpers/" class="${ID}-shop-all">Shop all Christmas Jumpers</a>
      </div>
    </div>`;

    document.querySelector('#related-brand-products').insertAdjacentHTML('beforebegin', similarMarkup);

    

    Object.keys(jumperData).forEach((i) => {
      const data = jumperData[i];
      const jumperEl = document.createElement('li');
      jumperEl.classList.add(`${ID}-similar-product`);
      jumperEl.innerHTML = `
      <a class="all-link" href="${data.prodURL}"></a>
      <div class="${ID}-img">
        <img src="${data.image}"/>
        <a href="${data.brandLink}" class="brandBadge">${data.brand}</a>
      </div>
      <div class="${ID}-info">
        <h4>${[i][0]}</h4>
        <p>${data.price}</p>
      </div>`;
      document.querySelector(`.${ID}-products`).appendChild(jumperEl);
    });
  } else {
    const similarMarkup = `
    <div class="${ID}-similar-items">
      <div class="${ID}-container">
        <h3>The same...but slightly different</h3>
        <div class="${ID}-products"></div>
        <a href="https://www.merchoid.com/geeks-guide-to-ugly-christmas-sweaterjumpers/" class="${ID}-shop-all">Shop all Christmas Jumpers</a>
      </div>
    </div>`;

    document.querySelector('#related-brand-products').insertAdjacentHTML('beforebegin', similarMarkup);

    

    Object.keys(USjumperData).forEach((i) => {
      const data = USjumperData[i];
      const jumperEl = document.createElement('li');
      jumperEl.classList.add(`${ID}-similar-product`);
      jumperEl.innerHTML = `
      <a class="all-link" href="${data.prodURL}"></a>
      <div class="${ID}-img">
        <img src="${data.image}"/>
        <a href="${data.brandLink}" class="brandBadge">${data.brand}</a>
      </div>
      <div class="${ID}-info">
        <h4>${[i][0]}</h4>
        <p>${data.price}</p>
      </div>`;
      document.querySelector(`.${ID}-products`).appendChild(jumperEl);
    });
  }
  }

  newAddSection();
  similarItems();
  fullDetails();
  
};
