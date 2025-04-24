import {
  fullStory, events
} from '../../../../../lib/utils';
import settings from './settings';

const {
  ID,
  VARIATION
} = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
  events.send(`${ID} v${VARIATION}`, 'fired', `${ID} v${VARIATION} fired`);
}

function updateCartValue(addedQty) {
  [].forEach.call(document.querySelectorAll('header .basket-icon__counter'), (elm) => {
    const curTotal = elm.textContent;

    if (curTotal && (parseInt(curTotal, 10) + parseInt(addedQty, 10)) <= 9 ) {
      elm.textContent = parseInt(curTotal, 10) + parseInt(addedQty, 10);
    } else {
      // @TODO more than 9 items
      elm.textContent = '9+';
    }
  });
}

function addToCartRequest(cb) {
  var encoded = $("#basketForm").serialize(); 
  $.ajax({
    type: "POST",
    contentType: 'application/x-www-form-urlencoded',
    url: '/webstore/handleBasketActions.sdo',
    data: encoded + '&addToBasket=Buy', 
    success: function (data) {
      cb();
      document.querySelector(`.${ID}-loader-container`).classList.remove(`${ID}-loader_show`);
    }
  });
}

function generateNotification(quantity, productName) {
  const element = document.createElement('div');
  element.classList.add(`${ID}_notificationWrap`);
  element.innerHTML = `
    <div class="${ID}_notification">
      <div class="${ID}_notification__content">
        <h3 class="${ID}_notification__text">${quantity}<small> x</small> ${productName}, <strong>Successfully Added to Cart.</strong></h3>
        <div class="${ID}_notification__buttonWrap">
          <div class="${ID}_notification__button">
            <a href="/webstore/showbasket.sdo">
            View Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  if (!document.querySelector(`.${ID}_notificationWrap`)) {
    document.querySelector('.main-site-header').insertAdjacentElement('beforeend', element);

    setTimeout(function () {
      document.querySelector(`.${ID}_notification`).classList.add('visible');
      setTimeout(function () {
        document.querySelector(`.${ID}_notification`).classList.remove('visible');
      }, 10000);
    }, 250);

    document.querySelector(`.${ID}_notification__button`).addEventListener('click', function () {
      if (document.querySelector('.quality .quality__input').value > 9) {
        document.querySelector('.quality .quality__input').value = 9;
      }
    });
  }

  jQuery('html, body').animate({
    scrollTop: jQuery('.promo-message').offset().top
  }, 1000);
}

export {
  setup,
  generateNotification,
  updateCartValue,
  addToCartRequest,
}; // eslint-disable-line
