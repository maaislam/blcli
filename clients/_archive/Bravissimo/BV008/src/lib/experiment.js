import {
  setup,
  getHistory
} from './services';
import settings from './settings';
import {
  addPoller,
  addObserver
} from './winstack';

const {
  ID,
  VARIATION,
} = settings;

const activate = () => {
  setup();
  if (window.location.href.indexOf('orders-and-returns') > -1) {
    addObserver(document.querySelector('.c-field--inline'), () => {
      var code = JSON.parse(localStorage.getItem('styleCode'));
      var references = document.querySelectorAll('.c-sku__code');
      references.forEach(function (reference) {
        if (reference.textContent.trim() === code) {
          const parent = reference.closest('.c-order-summary__main');
          parent.classList.add('pulse');
          setTimeout(function () {
            parent.classList.remove('pulse');
          }, 5000);
          parent.scrollIntoView(true);
          localStorage.removeItem('styleCode');
        }
      });
    }, {
      subtree: true,
      childList: true,
      attributes: true
    });
  } else {
    var isPDP = window.dataLayer[0].pageType;
    if (isPDP === 'product') {
      getHistory('1');
      addObserver(document.querySelector('.c-product-gallery'), () => {
        getHistory('1');
      }, {
        subtree: true,
        childList: true,
        attributes: true
      });
    }
  }
};

export default activate;