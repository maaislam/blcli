/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

function Banner() {
  const element = document.createElement('div');
  element.classList.add(`${ID}-banner`, `${ID}-background`);

  element.innerHTML = /* html */ `
	<div class="${ID}-banner-content">
		<h3 class="is-uppercase is-size-4 is-lspaced">The Gift of All Gifts</h3>
		<p>Tailor their gift to their ultimate wellbeing wish (or wishes) and get 20% off when you buy three or more...</p>
		<a class="button is-black is-size-9 is-uppercase is-lspaced has-text-weight-semibold" href="/pages/build-a-wellbeing-gift">Build a gift</a>		
	</div>
	`;

  new IntersectionObserver((intersections) => {
    if (intersections.some((i) => i.isIntersecting)) {
      //run once per session

      fireEvent('Viewed Gift Finder Banner');

      fireEvent('Conditions Met');
    }
  }).observe(element);

  element.addEventListener('click', () => {
    fireEvent('Clicked Gift Finder Banner');
  });

  if (VARIATION === '1') return element;

  const columnContainer = document.createElement('div');
  columnContainer.classList.add('column', 'is-3-desktop', 'is-4-tablet', 'is-6-mobile');

  columnContainer.append(element);
  return columnContainer;
}
export default () => {
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];

  if (window.location.href.indexOf('us.neomorganics.com') > -1) {
    newEvents.property = 'G-KJ9062XWWK';
  } else if (window.location.href.indexOf('neomorganics.eu') > -1) {
    newEvents.property = 'G-9CQMVE6E0J';
  } else {
    newEvents.property = 'G-884D6MBLFG';
  }

  setup();

  if (VARIATION === 'control') {
    fireEvent('Conditions Met');
  }

  const invalidPages = [
    '/the-wellbeing-pod',
    '/bestsellers',
    '/home',
    '/essential-oil-blends',
    '/candles',
    '/the-wellbeing-pod-mini',
    '/body-butter',
    '/bath-body',
  ];

  if (invalidPages.some((page) => window.location.pathname.includes(page)) && window.location.pathname.includes('/collections/'))
    return;

  if (location.pathname.includes('/collections/')) {
    fireEvent('Viewed PLP');

    let entry;

    if (VARIATION === '1') entry = document.querySelector('.collection-section > .container > .columns ');

    if (VARIATION === '2') entry = document.querySelector('.collection-section > .container > .columns > .column:nth-child(3)');
    if (VARIATION !== 'control') {
      entry.after(Banner());
    }
  }

  if (location.pathname === '/pages/build-a-wellbeing-gift') {
    fireEvent('Started Gift Finder');

    pollerLite('.gift-builder__collection').then(() => {
      const builderEndScreen = document.querySelector('.gift-builder__collection');

      new MutationObserver(() => {
        if (builderEndScreen.classList.contains('active')) {
          fireEvent('Completed Gift Builder');

          pollerLite('.product-info-wrapper').then(() => {
            const products = document.querySelectorAll('.product-info-wrapper');

            products.forEach((product) => {
              const addButton = product.querySelector('button[data-cart-add]');

              addButton.addEventListener('click', () => fireEvent('Added Product - Gift Builder'));
            });
          });
        }
      }).observe(builderEndScreen, {
        attributeFilter: ['class'],
      });
    });
  }

  if (location.pathname.includes('/products/')) {
    fireEvent('Viewed PDP');

    pollerLite('button.button.is-black.is-uppercase.is-lspaced.is-fullwidth-mobile.has-text-weight-bold[type="submit"]').then(
      () => {
        const buttons = document.querySelectorAll(
          'button.button.is-black.is-uppercase.is-lspaced.is-fullwidth-mobile.has-text-weight-bold[type="submit"]'
        );

        buttons.forEach((button) => {
          button.addEventListener('click', () => fireEvent('Added Product - PDP'));
        });
      }
    );
  }

  if (location.pathname === '/cart') {
    fireEvent('Viewed Basket');

    const checkoutButtons = document.querySelectorAll('[data-checkout-btn], [data-sticky-checkout-btn]');

    checkoutButtons.forEach((button) => button.addEventListener('click', () => fireEvent('Started Checkout')));
  }
};
