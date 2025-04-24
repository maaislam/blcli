/**
 * IDXXX - Description
 */
import { setup } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import CustomiseBoxes from './components/personalisedBox/personalisedBox';
import AboutDelivery from './components/aboutDelivery/aboutDelivery';
import DeliverySlide from './components/deliverySlide/deliverySlide';
import BuySlide from './components/buySlide/buySlide';
import { moveOccasionToTab, moveOccasionBackToPage, calanderTextUpdate } from './calendarMove';
import { shouldShowCountdown } from './deliveryLogic';
import { countdown } from '../../../../../lib/uc-lib';
import settings from './settings';

const { ID } = settings;

/**
 * Did add item to basket
 */
const onSuccessfulAddToBasket = () => {
  const buySlideTab = document.querySelector(`#${ID}-buyNow`);

  buySlideTab.classList.add(`${ID}-tab_active`);
  document.body.classList.add(`${ID}-no_scroll`);
  document.documentElement.style = 'overflow-y: hidden';
};

/**
 * Did click add to basket button
 * Hide delivery tab
 */
const onClickAddToCart = () => {
  const errorMessage = document.querySelector('product-preview local-add-to-basket result');
  const deliverySlideTab = document.getElementById(`${ID}-deliveryTab`);
  const buySlideTab = document.getElementById(`local-add-to-basket action`);

  // When the number of items in the basket changes, we know we've got a 
  // successful add to basket, so then show the on-added overlay i.e. run
  // the function onSuccessfulAddToBasket
  const headerBasket = document.querySelector('.header-basket');
  if(headerBasket) {
    const itemsInBasketInitially = parseInt(headerBasket.innerText.trim(), 10);

    addPoller([
      () => {
        const headerBasket = document.querySelector('.header-basket');
        const currentItemsInBasket = parseInt(headerBasket.innerText.trim(), 10);

        return itemsInBasketInitially != currentItemsInBasket;
      }
    ], () => {
      onSuccessfulAddToBasket();
    }, {
      multiplier: 1,
      wait: 40,
      timeout: 2000,
    });

    if (deliverySlideTab.classList.contains(`${ID}-tab_active`)) {
      setTimeout(() => {
        deliverySlideTab.classList.remove(`${ID}-tab_active`);
      }, 3000);
    }
  }
};

/**
 * Entry point for running experiment
 */
const activate = () => {
  setup();

  // ------
  // Create Delivery slide
  // ------
  const deliverySlide = new DeliverySlide({
    didCloseDeliverySlide() {
      moveOccasionBackToPage();
    },
    didOpenDeliverySlide() {
      moveOccasionToTab();

      const aboutDelivery = document.querySelector(`.${ID}_aboutDelivery`);
      if(aboutDelivery && !aboutDelivery.classList.contains(`${ID}_aboutDelivery--active`)) {
        if(shouldShowCountdown()) {
          countdown({
            element: `.${ID}_aboutDelivery__countdown-timer`,
            cutoff: settings.cutoffDate,
            zeroPrefixHours: false,
            zeroPrefixMinutes: true,
            labels: {
              d: '',
              h: '',
              m: '',
              s: ''
            },
          });
        } else {
          const target = document.querySelector(`.${ID}_aboutDelivery__countdown`);
          target.innerHTML = `<p class="${ID}_aboutDelivery__genericmsg">perfectly-timed gifts with delivery 7 days a week <img src="https://cdn-sitegainer.com/9embi7xz7i28d9h.png" width="36" height="18"></p>`;
        }

        aboutDelivery.classList.add(`${ID}_aboutDelivery--active`);
      }

      addPoller([`.${ID}-occasion_content product-when-your-occasion`], () => {
        calanderTextUpdate();
      });
    }
  });

  addPoller(['local-product-custom-options .pos-relative.m-b .select option'], () => {
    // ------
    // Create custom personalised / non-personalised boxes
    // ------
    new CustomiseBoxes();
  });

  addPoller(['local-product-view ng-include[src*="reminder"]'], () => {
    // ------
    // Create About Delivery component
    // ------
    const onBlockClick = () => {
      // The callback function for when the block is clicked
      // Trigger functionality from BI039-2
      deliverySlide.tryToOpen();
    };

    new AboutDelivery(onBlockClick);
    
    addPoller(['local-product-view ng-include[src*="reminder"]', 'local-product-view related-products'], () => {
      // ------
      // Move the upsell products 'you may also like' up
      // ------
      const reminderBox = document.querySelector('local-product-view ng-include[src*="reminder"]');
      const relatedProducts = document.querySelector('local-product-view related-products');

      if(reminderBox && relatedProducts) {
        reminderBox.insertAdjacentElement('beforebegin', relatedProducts);
      }
    });
  });

  const productPageAdd = document.querySelector('local-add-to-basket .button');
  addEventListener(productPageAdd, 'click', onClickAddToCart);

  // Init buy slide
  const buySlider = new BuySlide();

  // move price
  let price = document.querySelector('.w-8.w-12-m.w-12-s.m-t-6-m.m-t-6-s price');
  if(!price) {
    price = document.querySelector('.p-l-2-x.p-l-2-l price');
  }
  const productImage = document.querySelector('.w-8.w-12-m.w-12-s.m-t-6-m.m-t-6-s .pos-relative');
  if (price && productImage) {
    productImage.insertAdjacentElement('afterend', price);
  }

};

export default activate;
