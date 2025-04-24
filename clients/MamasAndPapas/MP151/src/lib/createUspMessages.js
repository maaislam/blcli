import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';
import uspMessages from './uspMessagesList';
import initiateSlick from './initiateSlick';
import addStickyBanner from './addStickyBanner';

export default (screen) => {
  let uspContainer = '';
  if (screen > 500) {
    // Desktop USPs
    uspContainer = `<span class="MP151-usp__wrapper">
      <ul class="MP151-usp">
        <li class="MP151-usp__item" name='Guarantee' data-index='1'>
          <span class="MP151-usp__img"><div class="MP151-image guarantee"></div></span>
          <span class="MP151-usp__text"><a href='https://www.mamasandpapas.com/en-gb/terms-and-conditions#t12'>2 YEAR GUARANTEE - On all our brand pushchairs &amp; furniture collections</a></span>
          <span class="MP151-usp__hide"><div class="MP151-image__hide"></div></span>
        </li>
        <li class="MP151-usp__item" name='Delivery' data-index='2'>
          <span class="MP151-usp__img"><div class="MP151-image delivery"></div></span>
          <span class="MP151-usp__text"><a href='https://www.mamasandpapas.com/en-gb/delivery-collections-and-returns-information'>FREE DELIVERY - On orders over £50 (excludes certains larger items)</a></span>
          <span class="MP151-usp__hide"><div class="MP151-image__hide"></div></span>
        </li>
        <li class="MP151-usp__item" name='PayPal' data-index='3'>
          <span class="MP151-usp__img"><div class="MP151-image paypal"></div></span>
          <span class="MP151-usp__text"><a href='https://www.mamasandpapas.com/en-gb/paypal-credit'>0% INTEREST FOR 4 MONTHS - For orders over £150 &amp; use PayPal credit</a></span>
          <span class="MP151-usp__hide"><div class="MP151-image__hide"></div></span>
        </li>
      </ul>
    </span>`;
  } else {
    // Mobile USPs
    uspContainer = `<span class="MP151-usp__wrapper">
      <ul class="MP151-usp">
        <li class="MP151-usp__item" name='Guarantee' data-index='1'>
          <span class="MP151-usp__img"><div class="MP151-image guarantee"></div></span>
          <span class="MP151-usp__text"><a href='https://www.mamasandpapas.com/en-gb/terms-and-conditions#t12'>2 YEAR GUARANTEE*</a></span>
          <span class="MP151-usp__hide"><div class="MP151-image__hide"></div></span>
        </li>
        <li class="MP151-usp__item" name='Delivery' data-index='2'>
          <span class="MP151-usp__img"><div class="MP151-image delivery"></div></span>
          <span class="MP151-usp__text"><a href='https://www.mamasandpapas.com/en-gb/delivery-collections-and-returns-information'>FREE DELIVERY ON ORDERS OVER £50*</a></span>
          <span class="MP151-usp__hide"><div class="MP151-image__hide"></div></span>
        </li>
        <li class="MP151-usp__item" name='PayPal' data-index='3'>
          <span class="MP151-usp__img"><div class="MP151-image paypal"></div></span>
          <span class="MP151-usp__text"><a href='https://www.mamasandpapas.com/en-gb/paypal-credit'>0% INTEREST FOR 4 MONTHS*</a></span>
          <span class="MP151-usp__hide"><div class="MP151-image__hide"></div></span>
        </li>
      </ul>
    </span>`;
  }

  const globalMessagesContainer = document.querySelector('#globalMessages');
  if (globalMessagesContainer) {
    globalMessagesContainer.insertAdjacentHTML('afterend', uspContainer);

    if (settings.VARIATION === '2') {
      const hideIcons = document.querySelectorAll('.MP151-usp__hide');
      [].forEach.call(hideIcons, (icon) => {
        icon.classList.add('hidden');
      });
    }

    initiateSlick();

    // Sticky Banner
    addStickyBanner();
  }
};