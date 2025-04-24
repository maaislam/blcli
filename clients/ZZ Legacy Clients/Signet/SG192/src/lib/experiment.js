/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

/**
 * Activate
 */
export default () => {
  setup();

  fireEvent('Conditions Met');

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

 
  const checkSession = setInterval(function(){
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if(sessionStorage.getItem('analyticsDataSentFor') && sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname) {
      if(typeof s !== 'undefined'){
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }  
      clearInterval(checkSession);
    }
  }, 1000);

  var checkCS = setInterval(function () {
    if (window._uxa) {
       window._uxa = window._uxa || [];
       window._uxa.push(["trackDynamicVariable", {key: `${ID}`, value: `Variation ${VARIATION}`} ]);
       clearInterval(checkCS);
    }
  }, 800)
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  const tracking = () => {
    const allProducts = document.querySelectorAll(`.category-box-grid__content-container .category-box-grid__link`);
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];
      element.addEventListener('click', () => {
       fireEvent('Clicked savings product');
      });
    }

    const mainImage = document.querySelector('.home-tile-grid__large-tile .home-tile-grid__image-link');
    mainImage.addEventListener('click', () => {
     fireEvent('Clicked main banner')
    });
  }

  if(VARIATION !== 'control') {
    /* Change banner image */
    const changeBanner = () => {
      const mainImage = document.querySelector('.home-tile-grid__large-tile .home-tile-grid__image-link');

      mainImage.setAttribute('href', 'https://www.hsamuel.co.uk/webstore/occasion/seasonal/MothersDayGifts.cdo');

      mainImage.querySelector('.home-tile-grid__picture').innerHTML = 
      `<source srcset="https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/7442f388-9df5-11ec-bc4f-bab68ffd3bc1" type="image/webp" media="(min-width: 90rem)"> 
      <source srcset="https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/74ca3ba4-9df5-11ec-bfcd-bab68ffd3bc1" type="image/webp" media="(min-width: 1rem)"> 
      <img src="https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/7442f388-9df5-11ec-bc4f-bab68ffd3bc1" type="image/jpg" class="home-tile-grid__picture-image" alt="up to 50% off">`
     
    }

    changeBanner();


    /* Add new products */
    const products = {
      'Silver 0.10ct Total Diamond Kiss & Cluster Pendant': {
        nowPrice: '£99',
        wasPrice: '£199',
        image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/779d0334-9df5-11ec-850f-7695c0272bf1',
        link: 'https://www.hsamuel.co.uk/webstore/d/1698893/Silver+0.10ct+Total+Diamond+Kiss+%26+Cluster+Pendant/',
      },
      'Silver 0.20ct Total Diamond Kiss & Cluster Bracelet': {
        nowPrice: '£199',
        wasPrice: '£399',
        image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/766f3464-9df5-11ec-a996-569d34746310',
        link: 'https://www.hsamuel.co.uk/webstore/d/1698907/Silver+0.20ct+Total+Diamond+Kiss+%26+Cluster+Bracelet/',
      },
      'Silver 0.10ct Total Diamond Kiss & Cluster Stud Earring': {
        nowPrice: '£99',
        wasPrice: '£199',
        image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/78144fd4-9df5-11ec-9b75-5e16d1c07fa4',
        link: 'https://www.hsamuel.co.uk/webstore/d/1698877/Silver+0.10ct+Total+Diamond+Kiss+%26+Cluster+Stud+Earring/',
      },
      'The Forever Diamond 9ct White Gold 0.25ct Total Pendant': {
        nowPrice: '£499',
        wasPrice: '£999',
        image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/75e157ca-9df5-11ec-ae0d-7695c0272bf1',
        link: 'https://www.hsamuel.co.uk/webstore/d/9789626/The+Forever+Diamond+9ct+White+Gold+0.25ct+Total+Pendant/',
      },
      'The Forever Diamond 9ct White Gold 0.25ct Total Earrings': {
        nowPrice: '£499',
        wasPrice: '£999',
        image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/7555c84a-9df5-11ec-b50c-ce15577fde4d',
        link: 'https://www.hsamuel.co.uk/webstore/d/3677974/The+Forever+Diamond+9ct+White+Gold+0.25ct+Total+Earrings/',
      },
      '9ct Yellow Gold Twist Hoop Earrings': {
        nowPrice: '£59.99',
        wasPrice: '£69.99',
        image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/7709effe-9df5-11ec-989b-bab68ffd3bc1',
        link: 'https://www.hsamuel.co.uk/webstore/d/2968878/9ct+Yellow+Gold+Twist+Hoop+Earrings/',
      }
    }

    const createProducts = () => {

      const productBox = document.querySelector('.category-box-grid--6-cards .category-box-grid__content-container');
      productBox.innerHTML = '';

      Object.keys(products).forEach((i) => {
        const data = products[i];

        const productMarkup = document.createElement('a');
        productMarkup.setAttribute('href', data.link);
        productMarkup.className = `${ID}-product category-box category-box__link category-box-grid__link`;
        productMarkup.innerHTML = `
        <img src="${data.image}"/>
        <div class="category-box__caption"> 
          <h2 class="category-box__title">SPRING SAVINGS</h2> 
          <p class="category-box__text">${[i][0]}</p> 
          <span class="category-box__price-saving">
            <span>${data.nowPrice}</span> | <span class="category-box__was-price">was ${data.wasPrice}</span>
          </span> 
        </div>`;

        
        productBox.appendChild(productMarkup);
      });
    }

    createProducts();

    tracking();

    
  } else {
   tracking();
  }
};
