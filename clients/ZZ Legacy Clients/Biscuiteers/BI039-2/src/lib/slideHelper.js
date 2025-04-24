import settings from './settings';
import { poller } from '../../../../../lib/uc-lib';
import deliveryBuyNowButton from './components/deliverySlide/deliveryBuyNowButton';
import { moveOccasionToTab, moveOccasionBackToPage, calanderTextUpdate } from './calendarMove';
import { addPoller } from './winstack';

const { ID } = settings;

const pageHTML = document.querySelector('html');

export default () => {
  const addToBagButton = document.querySelector('local-add-to-basket .button');


  const newBuyNowButton = document.querySelector('.BI039-2-ctaButtons .BI039-2-button.BI039-2-buyButton');
  const deliveryButton = document.querySelector('.BI039-2-ctaButtons .BI039-2-button.BI039-2-delivery');

  const deliverySlideTab = document.getElementById('BI039-2-deliveryTab');
  const buySlideTab = document.getElementById('BI039-2-buyNow');


  // on buy now button click
  const buyButtonClick = () => {

    const errorMessage = document.querySelector('local-add-to-basket result');

    // if the button is not disabled click the add to bag
    if (!addToBagButton.classList.contains('is-disabled')) {
      addToBagButton.click();
      // check if any error messages are being shown
      poller([
        () => errorMessage.classList.contains('error'),
      ], () => {
      }, {
        timeout: 500, // it will only poll for 3 seconds max,
        timeoutCallback: () => {
          buySlideTab.classList.add(`${ID}-tab_active`);
          document.body.classList.add('BI039-2-no_scroll');
          pageHTML.style = 'overflow-y: hidden';
        },
      });
    }
    if (deliverySlideTab.classList.contains(`${ID}-tab_active`)) {
      setTimeout(() => {
        deliverySlideTab.classList.remove(`${ID}-tab_active`);
      }, 3000);
    }
  };

  newBuyNowButton.addEventListener('click', () => {
    buyButtonClick();
  });

  const deliveryButtonClick = () => {
    // if personalised error message
    if (document.querySelector(`.${ID}_custom_error`)) {
      // if not active box is selected show "Choose type"
      if (!document.querySelector('.BI039-2-active_box')) {
        document.querySelector(`.${ID}_custom_error`).style.display = 'block';
        pageHTML.style = 'overflow-y: scroll';

      } else if (document.querySelector('.input-wrap-1 select').value === '?' || document.querySelector('.input-wrap-1 select').value === '') {
        document.querySelector('.input-wrap-1 select').classList.add('BI039-2-error');
      } else {
        document.querySelector('.input-wrap-1 select').classList.remove('BI039-2-error');
        document.querySelector(`.${ID}_custom_error`).style.display = 'none';
        deliveryBuyNowButton();
        deliverySlideTab.classList.add(`${ID}-tab_active`);
      }
    } else {
      document.body.classList.add('BI039-2-no_scroll');
      deliverySlideTab.classList.add(`${ID}-tab_active`);
      deliveryBuyNowButton();
    }
  };

  // close the delivery tab
  const closeDelivery = () => {
    const tabClose = document.querySelector(`#${ID}-deliveryTab .${ID}-slideClose`);
    tabClose.addEventListener('click', () => {
      deliverySlideTab.classList.remove(`${ID}-tab_active`);
      moveOccasionBackToPage();
      document.body.classList.remove('BI039-2-no_scroll');
      pageHTML.style = 'overflow-y: auto';
      document.querySelector('.BI039-2-deliver_text').remove();
    });
  };

  deliveryButton.addEventListener('click', () => {
    pageHTML.style = 'overflow-y: hidden';
    deliveryButtonClick();
    closeDelivery();

    moveOccasionToTab();

    addPoller(['.BI039-2-occasion_content product-when-your-occasion'], () => {
      calanderTextUpdate();
    });
  });
};
