/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, pollerLite } from '../../../../../lib/utils';
import { newRadioButtons } from './Files/newRadioButtons';

const { ID, VARIATION } = shared;

let activeStep = 0;

const checkCheckoutSteps = () => {

  if (
    VARIATION == '1' &&
    document.querySelector('.deliverySection .sectionGroup h1')
  ) {
    document.querySelector('.deliverySection .sectionGroup h1').textContent = "Delivery Type";
  }

  if (
    document.querySelector(".sectionWrap .welcomeSection.activeSection") &&
    activeStep != 1
  ) {

    activeStep = 1;
    fireEvent("User reached to My Details Step of checkout");
  } else if (
    document.querySelector(".sectionWrap .deliverySection.activeSection")
  ) {
    //console.log('bl check 00');
    if (activeStep != 2) {
      activeStep = 2;
      fireEvent("User reached to Delivery Step of checkout");
    }

    if (
      !document.querySelector(`.${ID}__radioToggleContainer`) &&
      VARIATION === '1' &&
      document.querySelectorAll(
        '.radioOptionsGroup:not(.forStoresList , .FinalOptions) > ul li'
      ).length === 2
    ) {
      //console.log('bl check 01');

      //insert html
      document.querySelector(
        '.radioOptionsGroup:not(.forStoresList , .FinalOptions) > ul'
      )?.insertAdjacentHTML("beforebegin", newRadioButtons(ID));
      document.querySelector('.radioOptionsGroup:not(.forStoresList , .FinalOptions)')?.classList.add('radio-active');
      document.querySelector('.radioOptionsGroup:not(.forStoresList , .FinalOptions)')?.classList.remove('show-radio');

      // Update delivery price based on control.
      setTimeout(() => {

        if (
          document.querySelector('.radioOptionsGroup:not(.forStoresList , .FinalOptions) > ul li.selectedRadioGroup') &&
          document.querySelector('.SD-1047__radioToggleContainer ul li.selectedRadioGroup')
        ) {
          document.querySelector('.deliverPrice').textContent = document.querySelector(
            '.radioOptionsGroup:not(.forStoresList , .FinalOptions) > ul li:first-child .deliveryPriceActual'
          )?.textContent;

          document.querySelector('.collectPrice').textContent = document.querySelector(
            '.radioOptionsGroup:not(.forStoresList , .FinalOptions) > ul li:last-child .deliveryPriceActual'
          )?.textContent;
        }

      }, 500);

      // Pre-select delivery option based on control
      if (
        document.querySelector(
          '.radioOptionsGroup:not(.forStoresList , .FinalOptions) > ul li.selectedRadioGroup'
        ) &&
        !document.querySelector('.SD-1047__radioToggleContainer ul li.selectedRadioGroup')
      ) {
        if (
          document.querySelector(
            '.radioOptionsGroup:not(.forStoresList , .FinalOptions) > ul li.selectedRadioGroup h3'
          ) &&
          document.querySelector(
            '.radioOptionsGroup:not(.forStoresList , .FinalOptions) > ul li.selectedRadioGroup h3'
          )?.textContent?.indexOf('Collect') >= 0 &&
          document.querySelector('li.newRadio.collectRadio')
        ) {
          document.querySelector('li.newRadio.collectRadio').click();
        }

        if (
          document.querySelector(
            '.radioOptionsGroup:not(.forStoresList , .FinalOptions) > ul li.selectedRadioGroup h3'
          ) &&
          document.querySelector(
            '.radioOptionsGroup:not(.forStoresList , .FinalOptions) > ul li.selectedRadioGroup h3'
          )?.textContent?.indexOf('Home') >= 0 &&
          document.querySelector('li.newRadio.deliveryRadio')
        ) {
          document.querySelector('li.newRadio.deliveryRadio').click();
        }
      }

    }

    if (
      document.querySelector(`.${ID}__radioToggleContainer`) &&
      VARIATION === '1' &&
      document.querySelectorAll(
        '.radioOptionsGroup:not(.forStoresList , .FinalOptions) > ul li'
      ).length !== 2
    ) {

      //console.log('bl check 02');
      document.querySelector(`.${ID}__radioToggleContainer`).remove();
      document.querySelector('.radioOptionsGroup:not(.forStoresList , .FinalOptions)')
        .classList.add('show-radio');

    }

  } else if (
    document.querySelector(".sectionWrap .paymentSection.activeSection") &&
    activeStep != 3
  ) {

    activeStep = 3;
    fireEvent("User reached to Payment Step of checkout");

    setTimeout(() => {

      const selectedDeliveryOptions = document.querySelectorAll('.deliverySection.completedSection .progressContainer');
      let selectedDeliveryOptionsText = {};
      if (selectedDeliveryOptions.length > 0) {

        selectedDeliveryOptions.forEach((option) => {

          let title = option.querySelector('.progressTitle .progressTitleTop').innerText.trim();
          if (title.toLowerCase() !== 'delivery address') {

            let value = option.querySelector('.progressTitle .progressTitleSub') ? option.querySelector('.progressTitle .progressTitleSub').innerText.trim() : option.querySelector('.progressTitle .progressTitleSubundefined').childNodes[0].nodeValue.trim();
            selectedDeliveryOptionsText[`${title}`] = `${value}`;
          }
        });
      }
      fireEvent(`User completed Delivery step of checkout with Options: ${JSON.stringify(selectedDeliveryOptionsText)}`, true);

    }, 1500);

  } else if (
    document.querySelector(".sectionWrap .confirmationSection.activeSection") &&
    activeStep != 4
  ) {

    activeStep = 4;
    fireEvent("User reached to Order Confirmation Step of checkout");
  }
};

export default () => {

  events.analyticsReference = window.ga ? 'ga' : '_gaUAT';

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------


  // Write experiment code here
  // ...

  if (location.pathname.includes("/checkoutsp")) {

    pollerLite([".sectionWrap .activeSection"], () => {
      // Recall function for variation and event
      checkCheckoutSteps();

      // Handle click on new delivery CTAs.
      document.addEventListener("click", function (event) {
        const { target } = event;

        if (target.closest('.deliveryRadio')) {

          document.querySelector('.collectRadio').classList.remove('selectedRadioGroup');
          document.querySelector('.deliveryRadio').classList.add('selectedRadioGroup');
          document.querySelector(`.${ID}__newSpendVoucher`).classList.remove('showVoucher');

          if (document.querySelectorAll('.radioOptionsGroup:not(.forStoresList , .FinalOptions) > ul li')[0]) {
            document.querySelector('.radioOptionsGroup:not(.forStoresList , .FinalOptions) > ul li:first-child').click();
          }


          // if (document.querySelectorAll('.formCompleteCTA.ctaMarginTop')[0]) {
          //   document.querySelector('.formCompleteCTA.ctaMarginTop button').click();
          // }
        }

        if (target.closest('.collectRadio')) {

          document.querySelector('.deliveryRadio').classList.remove('selectedRadioGroup');
          document.querySelector('.collectRadio').classList.add('selectedRadioGroup');
          document.querySelector(`.${ID}__newSpendVoucher`).classList.add('showVoucher');

          if (document.querySelectorAll('.radioOptionsGroup:not(.forStoresList , .FinalOptions) > ul li')[1]) {
            document.querySelector('.radioOptionsGroup:not(.forStoresList , .FinalOptions) > ul li:last-child').click();
          }


          if (document.querySelector('.formCompleteCTA.ctaMarginTop button')) {
            document.querySelector('.formCompleteCTA.ctaMarginTop button').click();
          }
        }

      });

      // Add mutation
      const target = document.querySelector(".leftMain .sectionWrap");

      const Observer = new MutationObserver((mutationList, observer) => {
        observer.disconnect();
        checkCheckoutSteps();
        observer.observe(target, {
          childList: true,
          subtree: true,
          attributes: true,
        });
      });
      Observer.observe(target, {
        childList: true,
        subtree: true,
        attributes: true,
      });


    });
  }

  if (VARIATION == 'control') {
    return;
  }
};
