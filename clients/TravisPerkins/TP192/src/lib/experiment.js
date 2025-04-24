/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/uc-lib';
import shared from '../lib/shared';
import { observer } from '../../../../../lib/utils';

const runDesktopChanges = () => {
  const totalsWrap = document.querySelector('[class^="DesktopBasket__TotalsWrap"]');
  if (totalsWrap) {

    const savingsText = document.querySelector('[class^="TradeCustomerSavings__SavingsAmount"]');
    const saving = savingsText.innerText.replace('(Inc. VAT)', '');


    const markup = `
      <div class="${shared.ID}__wrap">
        <div class="${shared.ID}__box">
          <img class="${shared.ID}__box__img" src="http://sb.monetate.net/img/1/581/3414085.png" />
          <p class="${shared.ID}__box__text">You're saving <span class="${shared.ID}__value">${saving}</span> by logging in</p>
        </div>
      </div>
    `;

    totalsWrap.insertAdjacentHTML('afterbegin', markup);

      observer.connect(document.querySelector('[data-test-id="entries-list-wrapper"]'), (d) => {
          setTimeout( () => {
            const newSavingsText = document.querySelector('[class^="TradeCustomerSavings__SavingsAmount"]');
            const newSaving = newSavingsText.innerText.replace('(Inc. VAT)', '').replace('(Ex. VAT)', '');
            const oldSaving = document.querySelector(`.${shared.ID}__value`);
            oldSaving.innerText = newSaving;
          }, 5000)
        }, {
          attributes: false,
          childList: true,
          subtree: true
        });

        observer.connect(document.querySelector('[data-test-id="sub-header-total-price"]'), (d) => {
          setTimeout( () => {
            console.log('firing second observer');
            const newSavingsText = document.querySelector('[class^="TradeCustomerSavings__SavingsAmount"]');
            const newSaving = newSavingsText.innerText.replace('(Inc. VAT)', '').replace('(Ex. VAT)', '');
            const oldSaving = document.querySelector(`.${shared.ID}__value`);
            oldSaving.innerText = newSaving;
          }, 3000)
        }, {
          attributes: true,
          childList: true,
          subtree: true,
          characterData: true
        });


    const observer2 = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        const newSavingsText = document.querySelector('[class^="TradeCustomerSavings__SavingsAmount"]');
        const newSaving = newSavingsText.innerText.replace('(Inc. VAT)', '').replace('(Ex. VAT)', '');
        const oldSaving = document.querySelector(`.${shared.ID}__value`);
        oldSaving.innerText = newSaving;
      });
    });
    var elm = document.querySelector('[data-test-id="sub-header-total-price"]');
    var config = {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    };
    observer2.observe(elm, config);
  }

  const mobileTotalsWrap = document.querySelector('[class^="MobileBasket__TotalsWrap"]');
  if (mobileTotalsWrap) {

    const savingsText = document.querySelector('[class^="TradeCustomerSavings__SavingsAmount"]');
    const saving = savingsText.innerText.replace('(Inc. VAT)', '');

    const markup = `
      <div class="${shared.ID}__wrap">
        <div class="${shared.ID}__box">
          <img class="${shared.ID}__box__img" src="http://sb.monetate.net/img/1/581/3414085.png" />
          <p class="${shared.ID}__box__text">You're saving <span class="${shared.ID}__value">${saving}</span> by logging in</p>
        </div>
      </div>
    `;

    const markupLower = `
    <div class="${shared.ID}__wrap ${shared.ID}__lower">
      <div class="${shared.ID}__box">
        <img class="${shared.ID}__box__img" src="http://sb.monetate.net/img/1/581/3414085.png" />
        <p class="${shared.ID}__box__text">You're saving <span class="${shared.ID}__value--lower">${saving}</span> by logging in</p>
      </div>
    </div>
  `;

    const mobileBasketInfo = document.querySelector('[class^="MobileBasket__BasketInfo"]');
    if(mobileBasketInfo) {
      mobileBasketInfo.insertAdjacentHTML('afterend', markup);
    }
    const mobileBasketInfoSection = document.querySelector('[class^="MobileBasket__BasketInfoSection"]');
    if (mobileBasketInfoSection) {
      mobileBasketInfoSection.insertAdjacentHTML('afterend', markupLower);
    }

    pollerLite([
      '[class^="basketProductLayout__ProductCard"]',
    ], () => {
      const deleteButtons = document.querySelectorAll('[data-test-id="delete-button"]');
      [].forEach.call(deleteButtons, (btn) => {
        btn.addEventListener('click', () => {
          setTimeout( () => {
            const newSavingsText = document.querySelector('[class^="TradeCustomerSavings__SavingsAmount"]');
            const newSaving = newSavingsText.innerText.replace('(Inc. VAT)', '').replace('(Ex. VAT)', '');
            const oldSaving = document.querySelector(`.${shared.ID}__value`);
            oldSaving.innerText = newSaving;
            const oldSavingLower = document.querySelector(`.${shared.ID}__value--lower`);
            oldSavingLower.innerText = newSaving;
          }, 5000)
        })
      })
    })

    const observer2 = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        const newSavingsText = document.querySelector('[class^="TradeCustomerSavings__SavingsAmount"]');
        const newSaving = newSavingsText.innerText.replace('(Inc. VAT)', '').replace('(Ex. VAT)', '');
        const oldSaving = document.querySelector(`.${shared.ID}__value`);
        oldSaving.innerText = newSaving;
        const oldSavingLower = document.querySelector(`.${shared.ID}__value--lower`);
        oldSavingLower.innerText = newSaving;
      });
    });
    var elm = document.querySelector('[data-test-id="miniBasket-total-price"]');
    var config = {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    };
    observer2.observe(elm, config);
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
    '[class^="TradeCustomerSavings__SavedText"]',
  ], () => {
    runDesktopChanges();
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

    observer.observe(appContainer, config);
  });
};
