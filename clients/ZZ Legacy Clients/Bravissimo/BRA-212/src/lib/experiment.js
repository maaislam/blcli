/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { addPoller, addEventListener, destroyPollers } from './winstack';
import { events } from './../../../../../lib/utils';

const showNewSuccessMessage = () => {
  const page = document.querySelector('.c-page');
  const title = document.querySelector('.c-product-details__title h1');
  const img = document.querySelector('div[itemprop="model"] span[itemprop="image"]');
  const upsells = document.querySelector('#accessories');

  const existing = document.querySelector(`.${shared.ID}-wrap`);
  if(existing) {
    existing.parentNode.removeChild(existing);
  }

  let href = window.location.href;
  let checkoutUrl = "/checkout/";
  let bagUrl = "/bag/";
  if(href.indexOf('bravissimo.com/us/') > -1) {
    checkoutUrl = "/us/checkout";
    bagUrl = "/us/bag";
  }

  if(page && title && img && upsells) {
    page.insertAdjacentHTML('afterbegin', `
      <div class="${shared.ID}-wrap">
        <div class="${shared.ID}-inner">
          <img src="${img.innerText.trim()}">

          <div class="${shared.ID}-titlewrap">
            <div class="${shared.ID}-imgwrap">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#f4436d" viewBox="22 22 56 56" version="1.1" x="0px" y="0px"><title>Tick 9.3</title><desc>Created with Sketch.</desc><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill-rule="nonzero" fill="#f4436d"><path d="M50,78 C34.536027,78 22,65.463973 22,50 C22,34.536027 34.536027,22 50,22 C65.463973,22 78,34.536027 78,50 C78,65.463973 65.463973,78 50,78 Z M39.5259117,51.4056942 C38.9215433,50.8390988 37.9722896,50.8697199 37.4056942,51.4740883 C36.8390988,52.0784567 36.8697199,53.0277104 37.4740883,53.5943058 L45.4740883,61.0943058 C46.1182055,61.6981657 47.1419727,61.6178396 47.6840283,60.9209109 L61.6840283,42.9209109 C62.1926334,42.2669901 62.0748317,41.3245767 61.4209109,40.8159717 C60.7669901,40.3073666 59.8245767,40.4251683 59.3159717,41.0790891 L46.325867,57.7806523 L39.5259117,51.4056942 Z"/></g></g></svg>
            </div>
            <p>${title.innerText.trim()} was added to your bag</p>
          </div>

          <div class="${shared.ID}-actions">
            <a class="${shared.ID}-actions__link ${shared.ID}-actions__link--view c-button-link c-button-link--checkout c-button-link--minor" 
              href="${bagUrl}">View Bag</a>
            <a class="${shared.ID}-actions__link ${shared.ID}-actions__link--checkout c-button-link c-button-link--checkout c-button-link--primary"  
              href="${checkoutUrl}">Checkout</a>
          </div>
        </div>

        <div class="${shared.ID}-upsells">
        </div>

        <div class="${shared.ID}-actions ${shared.ID}-actions--bottom">
          <a class="${shared.ID}-actions__link ${shared.ID}-actions__link--view c-button-link c-button-link--checkout c-button-link--minor" 
            href="${bagUrl}">View Bag</a>
          <a class="${shared.ID}-actions__link ${shared.ID}-actions__link--checkout c-button-link c-button-link--checkout c-button-link--primary"  
            href="${checkoutUrl}">Checkout</a>
        </div>
      </div>
    `);

    const upsellsContainer = document.querySelector(`.${shared.ID}-upsells`);
    if(upsellsContainer) {
      upsellsContainer.insertAdjacentElement('afterbegin', upsells);

      if(upsellsContainer.querySelectorAll('.c-product-summary').length < 2) {
        upsellsContainer.classList.add('xbv-1-prod');
      }
      if(upsellsContainer.querySelectorAll('.c-product-summary').length < 4) {
        upsellsContainer.classList.add('xbv-n4-prod');
      }
    }

    [].forEach.call(document.querySelectorAll(`.${shared.ID}-actions__link`), (l) => {
      l.addEventListener('click', () => {
        if(l.classList.contains(`${shared.ID}-actions__link--view`)) {
          events.send(shared.ID + '-' + shared.VARIATION, `click-view-button`);
        } else if(l.classList.contains(`${shared.ID}-actions__link--checkout`)) {
          events.send(shared.ID + '-' + shared.VARIATION, `click-checkout-button`);
        }
      });
    });
  }
}

const checkBagVisible = () => {
  if(window.innerWidth < 961) {
    // Mobile
    const draw = document.querySelector('.c-drawer--bag');
    if(draw) {
      addPoller([
        () => {
          return draw.getAttribute('data-drawer-visible') == 'bag';
        }
      ], () => {
        showNewSuccessMessage();

        document.documentElement.classList.add('xbag-hide');

        const dismiss = draw.querySelector('.c-action--dismiss');
        dismiss.click();

        setTimeout(() => {
          document.documentElement.classList.remove('xbag-hide');
        }, 1500);
      }, {
        multiplier: 1,
        wait: 20
      });
    }
  } else {
    // Desktop
    const bag = document.querySelector('.c-header .dropdown-menu');
    if(bag) {
      addPoller([
        () => {
          return !!bag.querySelector('.c-popover');
        }
      ], () => {
        showNewSuccessMessage();

        document.documentElement.classList.add('xbag-hide');

        const dismiss = bag.querySelector('.c-action--dismiss');
        dismiss.click();

        setTimeout(() => {
          document.documentElement.classList.remove('xbag-hide');
        }, 1500);
      }, {
        multiplier: 1,
        wait: 20
      });
    }
  }
};

export default () => {
  setup();

  destroyPollers();

  const upsells = document.querySelector('#accessories');

  // Write experiment code here
  const btn = document.querySelector('.c-product-details .c-product-details__add-to-bag .c-button');
  if(btn && upsells) {
    btn.addEventListener('click', (e) => {
      events.send(shared.ID + '-' + shared.VARIATION, `add-product-to-bag`);

      if(shared.VARIATION != 'control') {
        checkBagVisible(upsells);
      }

    });
  
    // Matching styles button
    [].forEach.call(document.querySelectorAll('.c-accessories__main .c-button--add-to-bag'), (b) => {
      b.addEventListener('click', () => {
        document.documentElement.classList.remove('xbag-hide');

        if(!b.classList.contains('c-button--disabled')) {
          events.send(shared.ID + '-' + shared.VARIATION, `add-matching-style-to-bag`);
        }
      });
    });
  }

};
