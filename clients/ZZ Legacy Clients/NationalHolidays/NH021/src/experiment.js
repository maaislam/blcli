import { fullStory, events } from '../../../../lib/utils';

/**
 * {{NH021}} - {{Desktop Payment Page}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH021',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    events.setTrackerName('tracker2');
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    events.send('NH021', 'Page View', 'NH021 Triggered', { sendOnce: true });
    /*
    * Update strings
    */
    const securityString = document.querySelector('p.NH003_securityText');
    const findOutMoreLink = document.querySelector('p.NH003_securityText a.NH003_findout');
    if (securityString) {
      securityString.innerHTML = 'We take online security seriously - ';
      securityString.appendChild(findOutMoreLink);
    }
    /*
    * Add tick and message
    */
    const tickAndMessage = `
      <div class="nh22-tick-message">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAABvAAAAbwHxotxDAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAE5QTFRF////n9+AquqAqvFxqup1o+Bwm9NwmtVxpex2pup3pOp5pet5ltVtpOt4pex5m9xxpet4ltRspet3pet4pet4pet4ldRspet4nN5xpet41CC3lwAAABh0Uk5TAAgMEhgZKSs2PIensbe4vMPEzc7X2Onz9reEHQAAAEpJREFUGFeVyEcOgDAQBMFZcrbJzP8/ioUs2OUEfasGfpW2mfXMJbfmMb68lUDSiLXnIMroyXAeo97Dmdbb8SjHo3wdY6ByXYHPnTJhBnBxq+rjAAAAAElFTkSuQmCC">
        <p>We protect your personal information</p>
      </div>
    `;
    if (securityString) {
      securityString.insertAdjacentHTML('afterend', tickAndMessage);
    }
    /*
    * Move payment amount
    */
    const movePaymentAmt = () => {
      const element = document.querySelector('.NH010_bottomRow .field-row-wide.NH003_fieldRowLast.NH003_confirmation-block');
      if (element) {
        const ref = document.querySelector('.NH003_topHeaderWrapper');
        ref.insertAdjacentElement('afterend', element);
      }
    };
    movePaymentAmt();
    /*
    * Discount Box (if applicable)
    */
    const discountBox = () => {
      const elementsArr = document.querySelectorAll('.main-content .content .right .box-with-border .side-block:last-of-type p');
      let discountPrice = null;
      // Get discount amount
      elementsArr.forEach((element) => {
        const elementCopy = element.textContent;
        const splitCopy = elementCopy.trim().split(' ');
        if (splitCopy[0].match('Options')) {
          const discountInt = parseFloat(splitCopy[1].replace('£-', ''));
          discountPrice = discountInt;
        }
      });
      if (discountPrice > 0) {
        const discountElement = `
          <div class="nh22-discounts">
            <p>Congratulations! For completing your booking online, you have qualified for a discount of £${discountPrice.toFixed(2)}</p>
          </div>
        `;
        const refElement = document.querySelector('.field-row-wide.NH003_fieldRowLast.NH003_confirmation-block');
        refElement.insertAdjacentHTML('afterend', discountElement);
      }
    };
    discountBox();
    /*
    * Move promo element
    */
    const movePromo = () => {
      const element = document.querySelector('#divPromoCode');
      if (element) {
        const ref = document.querySelector('.NH003_cardsAccepted');
        ref.insertAdjacentElement('afterend', element);
      }
    };
    movePromo();
    /*
    * Amend card title
    */
    const cardTitle = document.querySelector('.right.NH003_cardsAccepted span');
    if (cardTitle) {
      cardTitle.textContent = 'We accept the following methods of payment;';
    }
    /*
    * Amend promo code element for wrong codes
    */
    const promoAmends = () => {
      const wrongCodeEl = document.querySelector('#divPromoCode span#lblApplyCode');
      const promoContainer = document.querySelector('#divPromoCode');
      if (wrongCodeEl) {
        const wrongCodeText = wrongCodeEl.textContent;
        if (wrongCodeText === 'Promotion code is not valid.') {
          promoContainer.classList.add('nh22-show-promo');
        }
      }
    };
    promoAmends();
    /*
    * Add block of text below issue number
    */
    const confirmText = '<p class="nh22-confirm-text">You will have an opportunity to review and confirm your holiday details on the next page, no payment will be taken at this stage</p>';
    const confirmTextRef = document.querySelector('#pnlPayment .box-with-border');
    if (confirmTextRef) {
      confirmTextRef.insertAdjacentHTML('beforeend', confirmText);
    }
    /*
    * Amend help text
    */
    const helpText = () => {
      const el = document.querySelector('p.NH003_textUnderCta');
      if (el) {
        el.textContent = 'If you need any help with your booking, please contact us on 0844 477 9990 between 8am and 8pm, 7 days a week';
      }
    };
    helpText();
    /*
    * Above code is the same as NH022
    * --------------------------------
    * Below code is for mobile (NH021)
    */
    const summaryBanner = () => {
      const location = document.querySelector('.right .box-with-border.white > h3');
      const date = document.querySelector('.right .box-with-border .side-block > p');
      const duration = document.querySelector('.right .box-with-border > .side-days');
      let locationText = null;
      let durationText = null;
      let dateText = null;
      if (location) {
        locationText = location.textContent;
      }
      if (date) {
        if (date.textContent.match(/^\d+/)) {
          dateText = date.textContent;
        }
      }
      if (duration) {
        durationText = duration.textContent;
      }
      const element = `
        <div class="nh21-summary-banner">
          <h3>Summary of Booking</h3>

          <div>
            <p>${locationText}</p>
            <p>${dateText}</p>
            <p>${durationText}</p>
          </div>
        </div>
      `;
      const ref = document.querySelector('.main-content .container');
      ref.insertAdjacentHTML('afterbegin', element);
    };
    summaryBanner();
    /*
    * Move payment amount and discount banner
    */
    const moveElements = () => {
      const elOne = document.querySelector('.field-row-wide.NH003_fieldRowLast.NH003_confirmation-block');
      const elTwo = document.querySelector('.nh22-discounts');
      const ref = document.querySelector('.main-content .container > .inner-content');
      ref.insertAdjacentElement('beforebegin', elOne);
      if (elTwo) {
        ref.insertAdjacentElement('beforebegin', elTwo);
      }
    };
    moveElements();
    /*
    * Clone continue cta button and append above
    */
    const copyContinue = () => {
      const btn = document.querySelector('.NH010_bottomRow .box-with-border.orange input#btnContinue');
      if (btn) {
        const btnCopy = btn.cloneNode(true);
        btnCopy.classList.add('nh21-up-btn');
        const ref = document.querySelector('.main-content .container .content > .right');
        if (ref) {
          ref.insertAdjacentElement('beforebegin', btnCopy);
        }
      }
    };
    copyContinue();
    /*
    * Tracking
    */
    const trackingEls = () => {
      const promoSelect = document.querySelector('#divPromoCode');
      const continueCta = document.querySelector('.NH010_bottomRow .box-with-border.orange input#btnContinue');
      const continueCta1 = document.querySelector('.btn.orange-btn.continue.nh21-up-btn');
      if (promoSelect) {
        promoSelect.addEventListener('click', () => {
          events.send('NH021', 'Click', 'User clicked the promo code element', { sendOnce: true });
        });
      }
      if (continueCta) {
        continueCta.addEventListener('click', () => {
          events.send('NH021', 'Click', 'User clicked on the bottom continue CTA', { sendOnce: true });
        });
      }
      if (continueCta1) {
        continueCta1.addEventListener('click', () => {
          events.send('NH021', 'Click', 'User clicked on the top continue CTA', { sendOnce: true });
        });
      }
    };
    trackingEls();
    /**
     * Amend 'Cardholders name' to 'Cardholder's name'
     */
    const amendTitle = () => {
      const cardholderTitle = document.querySelector('.box-with-border .field-row-wide > label[for="txtNameOnCard"]');
      cardholderTitle.textContent = 'Cardholder\'s name *';
    };
    amendTitle();

    /**
     * Amend Move cardholders name above card number
     */
    services.moveCardholder();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
    moveCardholder() {
      const input = document.querySelector('input#txtNameOnCard');
      const label = document.querySelector('label[for="txtNameOnCard"]');
      const ref = document.querySelector('.box-with-border p:nth-of-type(2)');
      if (input && label && ref) {
        ref.insertAdjacentElement('afterend', input);
        ref.insertAdjacentElement('afterend', label);
      }
    },
  },

  components: {},
};

export default Experiment;
