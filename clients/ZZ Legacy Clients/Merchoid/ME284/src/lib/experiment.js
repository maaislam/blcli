/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events, pollerLite } from '../../../../../lib/utils';
import products from './productData';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();


  const { ID, VARIATION } = shared;

  const popUpBox = () => {
    const overlay = `<div class="${ID}-overlay"></div>`;
    
    const popUp = document.createElement('div');
    popUp.classList.add(`${ID}-notification`);
    popUp.innerHTML = `
    <div class="${ID}-close"></div>
    <h3>We're really sorry!</h3>
    <p>This feature is currently under maintenance, so we're not able to add this to your order at this time. We apologise for any inconvenience caused.</p>
    <div class="${ID}-closeCTA">Close</div>`;
    
    document.body.insertAdjacentHTML('beforeend', overlay);
    document.body.append(popUp);

    const overlayBlock = document.querySelector(`.${ID}-overlay`);

    const showNotifaction = () => {
      popUp.classList.add(`${ID}-modalShow`);
      document.body.classList.add(`${ID}-noScroll`);
      overlayBlock.classList.add(`${ID}-overlayShow`);
    }

    const closeNotifcation = () => {
      popUp.classList.remove(`${ID}-modalShow`);
      document.body.classList.remove(`${ID}-noScroll`);
      overlayBlock.classList.remove(`${ID}-overlayShow`);
    }

    popUp.querySelector(`.${ID}-close`).addEventListener('click', () => {
      closeNotifcation();
    });
    popUp.querySelector(`.${ID}-closeCTA`).addEventListener('click', () => {
      closeNotifcation();
    });
    overlayBlock.addEventListener('click', () => {
      closeNotifcation();
    });


    const allProductCTAs = document.querySelectorAll(`.${ID}-products .${ID}-CTA`);
    for (let index = 0; index < allProductCTAs.length; index += 1) {
      const element = allProductCTAs[index];
      element.addEventListener('click', () => {
        events.send(`${ID} V${VARIATION}`, 'click', 'Add to order');
        showNotifaction();
      });
    }
  }

  const upsellWrapper = () => {
    const upsellContent = document.createElement('div');
    upsellContent.classList.add(`${ID}-upsellWrapper`);
    upsellContent.innerHTML = `
    <div class="${ID}-container">
      <h3>Special one time offer</h3>
      <p class="${ID}-textBlock">Get one of our mystery products at a discount for a limited time only</p>
      <div class="${ID}-productWrapper">
        <div class="${ID}-products"></div>
      </div>
    </div>`;

    document.querySelector('#maincontent').insertAdjacentElement('beforebegin', upsellContent);


    // add products
    Object.keys(products).forEach((i) => {
      const data = products[i];
      const productBlock = document.createElement('div');
      productBlock.classList.add(`${ID}-product`);
      productBlock.innerHTML = `
      <div class="${ID}-image" style="background-image: url(${data.image})"></div>
      <div class="${ID}-productDetails">
        <span class="${ID}-brand">Merchoid</span>
        <p>${[i][0]}</p>
        <div class="${ID}-price">
          <p>${data.nowPrice}</p>
          ${data.wasPrice ? `<span class="${ID}-wasPrice">${data.wasPrice}</span>` : ''}
        </div>
      </div>
      <div class="${ID}-CTA">Add to order</div>`;

      document.querySelector(`.${ID}-products`).appendChild(productBlock);
    });
  }

  upsellWrapper();

  const slickProducts = () => {
    pollerLite([`.${ID}-products`], () => {
      requirejs(['jquery', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js'], function($, slick) {       
          jQuery(`.${ID}-products`).slick({
              slidesToShow: 1,
              mobileFirst: true,
              arrows: true,
              responsive: [
                {
                   breakpoint: 767,
                   settings: "unslick"
                }
             ]
          });
      }); 
    });
      
  
  }
  slickProducts();
  popUpBox();
};
