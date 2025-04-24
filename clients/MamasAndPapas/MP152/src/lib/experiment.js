/**
 * MP152 - Personal Shopping at PDP
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';

const activate = () => {
  setup();
  console.log('MP152 is running ----');
  // Experiment code
  const personalShoppingContainer = `<div class="MP152-personalShopping__container">
    <div class="MP152-personalShopping__content">
      <div class="MP152-pesonalShopping__image">
        <div class="MP152-img"></div>
      </div>
      <div class="MP152-pesonalShopping__text">
        <p class="top">Need some advice?</p>
        <div class="line"></div>
        <p class="text">Book a personal shop online for a one to one shopping experience in a store closest to you. 
  We offer impartial expert advice on products tailored to you &amp; your baby.</p>
        <p class="link"><a href="">Find out more</a></p>
      </div>
    </div>
  </div>`;

  const rightContainer = document.querySelector('.productDetail.py-4');
  rightContainer.insertAdjacentHTML('beforeend', personalShoppingContainer);
};

export default activate;
