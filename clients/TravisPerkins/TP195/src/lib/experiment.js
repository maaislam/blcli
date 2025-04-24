/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import { pollerLite } from '../../../../../lib/utils';
import shared from './shared';

const runMobileChanges = () => {
  const addMarkup = (amount) => {
    const mobileBtnWrapper = document.querySelector('[class^="ProductDetailMobile__QTYWrapper"]');
    const markup = `
      <div class="${shared.ID}__message ${shared.ID}__message--mobile">
        <img class="${shared.ID}__message__img" src="http://sb.monetate.net/img/1/581/3479081.png" />
        <Add class="${shared.ID}__message__text">Add <span class="${shared.ID}__message__bold">${amount} or more</span> for FREE DELIVERY</p>
      </div>
    `;
    mobileBtnWrapper.insertAdjacentHTML('afterend', markup);
    fireEvent('seen-message');
  };

  const mobileHeaderPrice = document.querySelector('[class^="MiniBasket__TotalPrice"]');
  if (mobileHeaderPrice) {
    var mobilePrice = mobileHeaderPrice.innerText;
    mobilePrice = mobilePrice.replace('£', '').replace('INC VAT', '').replace('EX VAT', '').replace('From', '');
    const basketTotal = parseFloat(mobilePrice);
    if (basketTotal < 150) {
      var mainPrice = document.querySelector('[data-test-id="main-price"]').innerText;
        mainPrice = mainPrice.replace('£', '').replace('INC VAT', '').replace('EX VAT', '').replace('From', '');
        mainPrice = parseFloat(mainPrice);
        var difference = 150 - basketTotal;
        var amount = difference / mainPrice;
        amount = Math.ceil(amount);
        addMarkup(amount);
    }
  } else {
    var mainPrice = document.querySelector('[data-test-id="main-price"]').innerText;
        mainPrice = mainPrice.replace('£', '').replace('INC VAT', '').replace('EX VAT', '').replace('From', '');
        mainPrice = parseFloat(mainPrice);
        var amount = 150 / mainPrice;
        amount = Math.ceil(amount);
        addMarkup(amount);
  }
}

const runDesktopChanges = () => {
  const addMarkup = (amount) => {
    const desktopBtnWrapper = document.querySelector('[class^="ProductDetailDesktop__ButtonsWrapper"]');
    const markup = `
      <div class="${shared.ID}__message">
        <img class="${shared.ID}__message__img" src="http://sb.monetate.net/img/1/581/3479081.png" />
        <Add class="${shared.ID}__message__text">Add <span class="${shared.ID}__message__bold">${amount} or more</span> for FREE DELIVERY</p>
      </div>
    `;
    desktopBtnWrapper.insertAdjacentHTML('afterend', markup);
    fireEvent('seen-message');
  };

  const desktopHeaderPrice = document.querySelector('[class^="HeaderControlBar__TotalPriceInSubHeader"]');
  if (desktopHeaderPrice) {
    const headerPrice = document.querySelector('[class^="HeaderControlBar__TotalPriceInSubHeader"]');
    if (headerPrice) {
      const headerPriceSpan = headerPrice.querySelector('span');
      var priceText = headerPriceSpan.innerText;
      priceText = priceText.replace('£', '').replace('(Inc. VAT)', '').replace('(Ex. VAT)', '').replace('From', '');
      const basketTotal = parseFloat(priceText);
      if (basketTotal < 150) {
        // Run function here
        var mainPrice = document.querySelector('[data-test-id="main-price"]').innerText;
        mainPrice = mainPrice.replace('£', '').replace('INC VAT', '').replace('EX VAT', '').replace('From', '');
        mainPrice = parseFloat(mainPrice);
        var difference = 150 - basketTotal;
        var amount = difference / mainPrice;
        amount = Math.ceil(amount);
        addMarkup(amount);
      }
    }
  } else {
    var mainPrice = document.querySelector('[data-test-id="main-price"]').innerText;
        mainPrice = mainPrice.replace('£', '').replace('INC VAT', '').replace('EX VAT', '').replace('From', '');
        mainPrice = parseFloat(mainPrice);
        var amount = 150 / mainPrice;
        amount = Math.ceil(amount);
        addMarkup(amount);
  }
}

const init = () => {
  const componentAlreadyExists = false; 

  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
  setup();
  pollerLite([
    '[class^="PDPDesktop__PDPHeader"]'
  ], () => {
    runDesktopChanges();
  });
  pollerLite([
    '[class^="PageHeaderMobile__HeaderWrapper"]'
  ], () => {
    runMobileChanges();
  })
}

export default () => {
  init();

  // Poll and re-run init
  pollerLite([
    '#app-container',
  ], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          document.body.classList.remove(`${shared.ID}`);

          setTimeout(() => {
            // -----------------------------------
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
            init();
          }, 2000);
        }
      });
    });

    const config = {
        childList: true,
        subtree: true
    };

    // observer.observe(appContainer, config);
  });
};
