/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/utils';

const runDesktopChanges = () => {
  const summaryBox = document.querySelector('#summaryBox');
  if (summaryBox) {
    const customerSavings = document.querySelector('.customersavings-value').innerText;
    if (customerSavings) {
      const markup = `
        <div class="${shared.ID}__savings">
          <img class="${shared.ID}__savings__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/6A83DEEB3A12909B4E3D316D4DE3325746B586D54F9A0B7A1560F1F59C43C9A8.png?meta=/AG061a---Checkout-promotion-cards/ag061-icon.png" />
          <p class="${shared.ID}__savings__text">Пересчитать <span class="${shared.ID}__savings__text--b">${customerSavings}</span></p>
        </div>
      `;
      summaryBox.insertAdjacentHTML('afterbegin', markup);
    }
  }
};

const runMobileChanges = () => {
  const mobileCheckout = document.querySelector('.checkoutmobile');
  if (mobileCheckout) {
    const customerSavings = document.querySelector('.customersavings-value').innerText;
    if(customerSavings) {
      const markup = `
        <div class="${shared.ID}__savings">
          <img class="${shared.ID}__savings__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/6A83DEEB3A12909B4E3D316D4DE3325746B586D54F9A0B7A1560F1F59C43C9A8.png?meta=/AG061a---Checkout-promotion-cards/ag061-icon.png" />
          <p class="${shared.ID}__savings__text">Пересчитать <span class="${shared.ID}__savings__text--b">${customerSavings}</span></p>
        </div>
      `;
      mobileCheckout.insertAdjacentHTML('afterbegin', markup);
      mobileCheckout.insertAdjacentHTML('beforeend', markup);

      // pollerLite([
      //   '.AG010-NEW_VI_dummyCta'
      // ], () => {
      //   const AG10Cta = document.querySelector('.AG010-NEW_VI_dummyCta');
      //   if (AG10Cta) {
      //     AG10Cta.insertAdjacentHTML('afterend', markup);
      //   }
      // })
    }
  }
}

const runLoginChanges = () => {
  fetch("/api/Cartapi/Cart").then(response => response.json())
  .then((d) => {
    const savings = d.Data.Campaigns[0].Savings;
    if (savings > 0) {
      // const formHeader = document.querySelector('.AG010-NEW_VI_formHeading');
      // const formHeaderSpan = formHeader.querySelector('span');
      // const isGuest = formHeader.getAttribute('ng-if');
      // console.log(isGuest);
      // if (isGuest === 'showGuest') {
      //   formHeaderSpan.innerHTML =  `Checkout as a guest and save <span class="${shared.ID}__bold">£${savings}</span> today!`;
      // }
      addLoginMarkup(savings);

      const loginTabs = document.querySelectorAll('.AG010-NEW_VI_loginTab');
      [].forEach.call(loginTabs, (loginTab) => {
        loginTab.addEventListener('click', () => {
          addLoginMarkup(savings);
        })
      })
    };
  });
};

const addLoginMarkup = (savings) => {
  const formHeader = document.querySelector('.AG010-NEW_VI_formHeading');
  const formHeaderSpan = formHeader.querySelector('span');
  const isGuest = formHeader.getAttribute('ng-if');
  if (isGuest === 'showGuest') {
    formHeaderSpan.innerHTML =  `Оформите заказ без регистрации, чтобы сэкономить <span class="${shared.ID}__bold">${savings}₽ </span>`;
  } else {
    formHeaderSpan.innerHTML =  `Зарегистрируйтесь, чтобы сэкономить <span class="${shared.ID}__bold">${savings}₽</span>`;
  }
}

export default () => {
  setup();
  const { rootScope, ID } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    pollerLite([
      '.customersavings'
    ], () => {
      if(document.body.classList.contains('desktop')) {
        runDesktopChanges();
      };
      if(document.body.classList.contains('mobile')) {
        runMobileChanges();
      };
    });
    pollerLite([
      '.login'
    ], () => {
      runLoginChanges();
    });
  };

  init();
};
