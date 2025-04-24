/**
 * KM002 - Payment Popup
 * @author Lewis Needham - User Conversion
 */
import { setup } from './services';
import settings from './settings';
import Lightbox from '../../../../lib/components/Lightbox/Lightbox';
import { events } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';

const activate = () => {
  setup();

  const orderTotal = document.querySelector('.total-value.value').innerText.trim();

  // Create lightbox
  let content;
  switch (settings.VARIATION) {
    case '1':
      content = `
        <div class="KM002_paymentMsg">
          <p>We are now taking you to our secure payment page.</p>
          <div class="KM002_paymentMsg__loader">
            <img src="https://www.karenmillen.com/on/demandware.static/Sites-KarenMillen-UK-Site/-/en_GB/v1539578497674/images/loader.gif" />
          </div>
          <p>Order total including delivery: <em class="KM002_bold">${orderTotal}</em></p>
          <div class="KM002_paymentMsg__logos">
            <img src="https://www.karenmillen.com/on/demandware.static/-/Library-Sites-KarenMillenSharedLibrary/default/dw2b45bf78/images/Cart/image-5-05.png"/>
          </div>
          <p class="KM002_paymentMsg__small">Please <em>do not</em> click back on the payment page, otherwise you will restart the checkout journey.</p>
        </div>
      `;
      break;

    case '2':
      content = `
        <div class="KM002_paymentMsg">
          <p>We are now taking you to our secure payment page, hosted by Adyen.</p>
          <p>Order total including delivery: <em class="KM002_bold">${orderTotal}</em></p>
          <div class="KM002_paymentMsg__logos">
            <img src="https://www.karenmillen.com/on/demandware.static/-/Library-Sites-KarenMillenSharedLibrary/default/dw2b45bf78/images/Cart/image-5-05.png"/>
          </div>
          <p class="KM002_paymentMsg__small">Please <em>do not</em> click back on the payment page, otherwise you will restart the checkout journey.</p>
          <div class="KM002_paymentMsg__logos KM002_paymentMsg__logos--adyen">
            <img src="https://dp8v87cz8a7qa.cloudfront.net/43042/5bc5c2bb959431539687099.png"/>
          </div>
        </div>
      `;
      break;

    case '3':
      content = `
        <div class="KM002_paymentMsg">
          <p>We are now taking you to our secure payment page.</p>
          <p class="KM002_paymentMsg__small">Please <em>do not</em> click back on the payment page, otherwise you will restart the checkout journey.</p>
          <div class="KM002_paymentMsg__loader">
            <img src="https://www.karenmillen.com/on/demandware.static/Sites-KarenMillen-UK-Site/-/en_GB/v1539578497674/images/loader.gif" />
          </div>
          <p>Order total including delivery: <em class="KM002_bold">${orderTotal}</em></p>
          <div class="KM002_paymentMsg__logos">
            <img src="https://www.karenmillen.com/on/demandware.static/-/Library-Sites-KarenMillenSharedLibrary/default/dw2b45bf78/images/Cart/image-5-05.png"/>
          </div>
        </div>
      `;
      break;

    default:
      break;
  }

  const lightbox = new Lightbox(settings.ID, {
    content,
    closeOnClick: false,
  });

  // Make changes to DOM
  const run = () => {
    const form = document.querySelector('#CheckoutBillingForm');
    const toPaymentCTA = form.querySelector('#toPayment');

    /*
     * On click of false CTA check if the form has passed validation before showing the lightbox
     * and redirecting to the payment page
     */
    const addNewCTA = () => {
      // Create false CTA to trigger lightbox without submitting the form
      toPaymentCTA.insertAdjacentHTML('afterend', `
        <div class="button_primary" id="KM002_CTA">
          <span>To Payment</span>
        </div>
      `);

      const newCTA = document.querySelector('#KM002_CTA');
      newCTA.addEventListener('click', () => {
        const formValid = window.jQuery(form).validate().form();
        const countrySelected = document.querySelector('#dwfrm_billing_billingAddress_addressFields_country').value !== '';
        if (formValid && countrySelected) {
          lightbox.open();
          setTimeout(() => {
            lightbox.close();
            events.send(settings.ID, 'Action', 'Redirecting to payment');
            toPaymentCTA.click();
          }, 6000);
        } else {
          toPaymentCTA.click();
        }
      });
    };
    addNewCTA();

    /*
     * Set CTA display value to same as original
     * The default state changes depending on which parts of the
     * form are auto-filled
     */
    const checkVisibility = () => {
      // If new CTA has been removed, re-add it
      if (!document.querySelector('#KM002_CTA')) {
        addNewCTA();
      }

      const newCTA = document.querySelector('#KM002_CTA');

      if (toPaymentCTA.style.display === 'none') {
        newCTA.style.display = 'none';
      } else {
        newCTA.style.display = 'inline-block';
      }
    };

    /*
     * Watch for changes on original CTA display value to check
     * the status again
     */
    observer.connect(toPaymentCTA, (el, mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        // Style was modified
        checkVisibility();
      }
    }, {
      config: { childList: false, subtree: false, attributes: true },
    });

    // Initial call
    checkVisibility();

    // Hide original CTA
    form.querySelector('.billing-btn-bar').classList.add('KM002_form--modified');
  };

  // Watch for changes on container and re-run part of experiment if form is rebuilt
  const main = document.querySelector('#primary');
  observer.connect(main, (el, mutation) => {
    if (mutation.type === 'childList' && !document.querySelector('.KM002_form--modified')) {
      run();
    }
  }, {
    config: { childList: true, subtree: true, attributes: false },
  });

  run(); // Init
};

export default activate;
