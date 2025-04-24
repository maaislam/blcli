
 /* ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { pollerLite } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  const url = window.location.href;

  let jumperText;
  if(url.indexOf('/uk/') > -1){
    jumperText = 'jumper';
  } else {
    jumperText = 'sweater';
  }
 

  const addPriceFraming = () => {
    const currentPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=finalPrice]');
    const oldPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=oldPrice]');
    let markup;

    if(VARIATION === '1') {
      markup = 
      `<div class="${ID}-priceWrapper">
        <p>Only <b>${currentPrice.textContent}</b></p>
        ${oldPrice ? `<span>${oldPrice.textContent}</span>` : ''}
      </div>
      <div class="${ID}-contentBottom">We expect demand to be really high this year due to COVID-19. Avoid disappointment and get your ${jumperText} now.</div>`;
      
      
     } else if (VARIATION === '2') {

      let brand;
      if(document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/)) {
        if(document.querySelector('meta[property="og:brand"]').content.indexOf('Warhammer') > -1) {
          brand = 'Warhammer 40,000';
        } else {
          brand = document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/);
        }
      }

      markup = 
      `<div class="${ID}-contentBottom">We all need a bit of Christmas cheer this year. Treat yourself to an <b>officially licensed ${brand !== '' ? `<span>${brand}</span>` : '' } ${jumperText}</b></div>
      <div class="${ID}-priceWrapper">
        <p>Only <b>${currentPrice.textContent}</b></p>
        ${oldPrice ? `<span>${oldPrice.textContent}</span>` : ''}
      </div>`;
    } 

    // create new price box
    const priceBox = document.createElement('div');
    priceBox.classList.add(`${ID}-priceContainer`);
    priceBox.innerHTML = markup;

    document.querySelector('.product-info-main .product-info-price').insertAdjacentElement('beforebegin', priceBox);
  }

  const genderBlock = () => {
    const genderMarkup = document.createElement('div');
    genderMarkup.classList.add(`${ID}-genderBlock`);
    genderMarkup.innerHTML = 
    `<div class="${ID}-top">
      <h3>Please select a gender</h3>
      <div class="${ID}-sizeGuide">Size Guide</div>
    </div>
    <div class="${ID}-options">
      <div class="${ID}-gender ${ID}-him" data-target="male-option">
        <div class="${ID}-radio"></div>
        <div class="${ID}-icon"></div>
        <p>Male</p>
      </div>
      <div class="${ID}-gender ${ID}-her" data-target="female-option">
        <div class="${ID}-radio"></div>
        <div class="${ID}-icon"></div>
        <p>Female</p>
      </div>
    </div>`;

    document.querySelector('#gender-select-options').insertAdjacentElement('beforebegin', genderMarkup);


    // click events

    const sizeGuide = document.querySelector(`.${ID}-sizeGuide`);
    sizeGuide.addEventListener('click', () => {
      document.querySelector(`.ME230-sizeGuideLink`).click();
    });

    const genders = document.querySelectorAll(`.${ID}-gender`);
    for (let index = 0; index < genders.length; index += 1) {
      const element = genders[index];
      element.addEventListener('click', (e) => {
        const matchingEl = e.currentTarget.getAttribute('data-target');
        document.querySelector(`#gender-select-options .${matchingEl}`).click();

        document.querySelector(`.${ID}-gender.${ID}-active`).classList.remove(`${ID}-active`);
        
        e.currentTarget.classList.add(`${ID}-active`);
      });
      
    }




  }

  addPriceFraming();
  pollerLite(['#gender-select-options .active'], () => {
    genderBlock();

   setTimeout(() => {
    const activeGender = document.querySelector('#gender-select-options .active');
    const activeClassname = activeGender.className.replace('active', '').trim();
    document.querySelector(`.${ID}-gender[data-target="${activeClassname}"]`).classList.add(`${ID}-active`);
   }, 1000);
   
  });
 

};
