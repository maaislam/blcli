import { fullStory } from '../../../../lib/utils';

const Experiment = {
  /**
  * @desc Variation settings. Useful for when multiple variations are developed
  * in a single project so you can just toggle the variation number in production
  */
  settings: {
    ID: 'MP099',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);
    components.paymentOptionsChanges();
    components.defaultDelivery();
    components.cvcImage();
    components.addSecureCheckout();
    components.paypalButton();
  },
  services: {
    /**
    * @desc Inits all page level tracking
    */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
    * @desc Inits all page level tracking
    */
    paymentOptionsChanges: function paymentOptionsChanges() {
      const paymentOptionTitle = document.createElement('div');
      paymentOptionTitle.classList.add('MP099-title');
      paymentOptionTitle.innerHTML = 'What would you like to pay with?';
      const paymentPageTitle = document.querySelector('.Payment-page .d-flex.justify-content-around');
      paymentPageTitle.insertBefore(paymentOptionTitle, paymentPageTitle.firstChild);

      // add class to gift card button
      const giftCardButton = document.querySelector('.checkout_payTypeToggle-giftcard');
      giftCardButton.parentNode.parentNode.parentNode.classList.add('MP099-giftCard_wrap');
      // add or in between 2 options
      const paymentButtons = document.querySelectorAll('.Payment-page .px-2.px-md-5 .btn');
      [].forEach.call(paymentButtons, (element) => {
        const orText = document.createElement('span');
        orText.classList.add('MP099-or');
        orText.innerHTML = 'Or';
        element.insertAdjacentElement('afterend', orText);
      });

      const giftCardWrapper = document.querySelector('.MP099-giftCard_wrap');
      const paymentButtonsWrap = document.querySelector('.bg-white.px-2.px-md-5.pt-4 .justify-content-around');
      paymentButtonsWrap.appendChild(giftCardWrapper);

      const giftBoxes = giftCardWrapper.querySelector('#gift');
      paymentButtonsWrap.insertBefore(giftBoxes, giftCardWrapper.nextElementSibling);
    },
    /**
    * @desc Select delivery address as default
    */
    defaultDelivery: function defaultDelivery() {
      const addressWrap = document.querySelector('#cybersourceSAForm .delivery-address');
      const payPalAddress = document.querySelector('#paypalForm .delivery-address');
      const giftAddress = document.querySelector('#giftCardFormId .delivery-address');

      const payPalForm = document.querySelector('#paypalForm');
      const deliveryCheckbox = document.querySelectorAll('.Payment-page .checkbox_toggle');
      for (let i = 0; i < deliveryCheckbox.length; i += 1) {
        const element = deliveryCheckbox[i];
        const inputBox = element.parentNode.querySelector('.checkbox_input');
        inputBox.checked = true;
        if (inputBox.checked === true) {
          addressWrap.classList.add('MP099-delivery_default-showing');
          payPalAddress.classList.add('MP099-delivery_default-showing');
          giftAddress.classList.add('MP099-delivery_default-showing');

          // class to his paypal billing address when selected
          payPalForm.classList.add('MP099-hide_billing');
        } else {
          addressWrap.classList.remove('MP099-delivery_default-showing');
          payPalAddress.classList.remove('MP099-delivery_default-showing');
          giftAddress.classList.remove('MP099-delivery_default-showing');
          payPalForm.classList.remove('MP099-hide_billing');
        }
        element.addEventListener('click', () => {
          if (inputBox.checked !== true) {
            addressWrap.classList.add('MP099-delivery_default-showing');
            payPalAddress.classList.add('MP099-delivery_default-showing');
            giftAddress.classList.add('MP099-delivery_default-showing');
          } else {
            addressWrap.classList.remove('MP099-delivery_default-showing');
            payPalAddress.classList.remove('MP099-delivery_default-showing');
            giftAddress.classList.remove('MP099-delivery_default-showing');
          }
        });
      }
    },
    /**
    * @desc Select delivery address as default
    */
    cvcImage: function cvcImage() {
      const cvcInput = document.querySelector('.controls.cvv-text');
      const cvcIcon = document.createElement('div');
      cvcIcon.classList.add('MP099-cvc_icon');
      cvcInput.parentNode.appendChild(cvcIcon);
    },
    /**
    * @desc add the secure checkout logo and icon
    */
    addSecureCheckout: function secureCheckoutLogo() {
      const payment = document.querySelector('.Payment-page');
      const secureCheckout = document.createElement('div');
      secureCheckout.classList.add('MP099-secure_checkout');
      secureCheckout.innerHTML = '<span></span><p>Secure Checkout</p>';
      payment.querySelector('h1').appendChild(secureCheckout);
    },
    /**
    * @desc Change paypal CTA
    */
    paypalButton: function paypalButton() {
      // const paypalTab = document.querySelector('.checkout_payTypeToggle-paypal');
      const paymentCTA = document.querySelector('#aliasPayBtn');
      const tabs = document.querySelectorAll('.d-flex .btn_toggle');
      for (let i = 0; i < tabs.length; i += 1) {
        const element = tabs[i];
        element.addEventListener('click', () => {
          if (element.classList.contains('checkout_payTypeToggle-paypal')) {
            paymentCTA.textContent = 'Proceed with PayPal';
          } else {
            paymentCTA.textContent = 'Complete Payment';
          }
        });
      }
    },
  },
};

export default Experiment;
