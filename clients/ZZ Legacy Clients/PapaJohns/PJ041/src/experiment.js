import { fullStory, events } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';
import PJ029 from './components/PJ029basket';

/**
 * {{PJ041}} - {{Basket confirmation redesign - Mobile}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ041',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const stepsContainer = `<div class='PJ041-progressBar__wrapper'>
      <div class='PJ041-progressBar__container'>
        <ul class='PJ041-progressBar__steps'>
          <li class='progressBar__step' id='PJ041-step-1'>
            <div class='step__icon'><span>1</span></div>
            <div class='step'><span>Special offers</span></div>
          </li>
          <li class='progressBar__dash'>
            <div class='step__dash'>&mdash;</div>
          </li>
          <li class='progressBar__step' id='PJ041-step-2'>
            <div class='step__icon'><span>2</span></div>
            <div class='step'><span>Order Summary</span></div>
          </li>
          <li class='progressBar__dash'>
            <div class='step__dash'>&mdash;</div>
          </li>
          <li class='progressBar__step' id='PJ041-step-3'>
            <div class='step__icon'><span>3</span></div>
            <div class='step'><span>Your details</span></div>
          </li>
          <li class='progressBar__dash'>
            <div class='step__dash'>&mdash;</div>
          </li>
          <li class='progressBar__step' id='PJ041-step-4'>
            <div class='step__icon'><span>4</span></div>
            <div class='step'><span>Payment details</span></div>
          </li>
          <li class='progressBar__dash'>
            <div class='step__dash'>&mdash;</div>
          </li>
          <li class='progressBar__step' id='PJ041-step-5'>
            <div class='step__icon'><span>5</span></div>
            <div class='step'><span>Place order</span></div>
          </li>
        </ul>
      </div>
    </div>`;

    document.querySelector('.main').insertAdjacentHTML('beforebegin', stepsContainer);

    if (document.querySelector('.upsell-mobile')) {
      components.assignActiveStep('#PJ041-step-1');
    } else if (document.querySelector('.m-order-summary')) {
      components.assignActiveStep('#PJ041-step-2');
    } else if (document.querySelector('.contactDetailsCont')) {
      components.assignActiveStep('#PJ041-step-3');
    } else if (document.querySelector('.m-payment-methods')) {
      components.assignActiveStep('#PJ041-step-4');
    } else if (document.querySelector('#ctl00_cphBody_pnlPlaceOrder') || document.querySelector('#ctl00_cphBody_pnlCreditCard')) {
      components.assignActiveStep('#PJ041-step-5');
    }

    // Inactive Buttons
    components.createInactiveButtons();
    components.upsellMessage();
    components.freeDipSection();
    // run PJ029
    PJ029();

    // Checkout Pages
    if (document.querySelector('#ctl00_cphBody__checkoutUpdatePanel')) {
      observer.connect([document.querySelector('#ctl00_cphBody__checkoutUpdatePanel')], () => {
        setTimeout(() => {
          if (!document.querySelector('.PJ041-progressBar__wrapper')) {
            Experiment.init();
          }
        }, 1000);
      }, {
        throttle: 200,
        config: {
          attributes: true,
          childList: true,
        },
      });
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc Assigns active class to active step
     */
    assignActiveStep(stepId) {
      const step = document.querySelector(`${stepId}`);
      step.querySelector('.step__icon').classList.add('active');
      step.querySelector('.step').classList.add('active');
    },
    /**
     * @desc Amend Promo Code Container
     */
    changePromoCode(promoCodeContainer) {
      const promoText = promoCodeContainer.querySelector('a.enterPromoArrow');
      if (promoText && promoText.querySelector('h2')) {
        promoText.querySelector('h2').insertAdjacentHTML('beforeend', '<span class="promoCode__instructions">Enter it here</span>');
      }
      const promoCodeCta = promoCodeContainer.querySelector('.enterPromoMobile .actionButton');
      if (promoCodeCta) {
        promoCodeCta.innerHTML = 'Apply Code';
      }
    },
    /**
     * @desc Creates Inactive Buttons if there are free items to choose
     */
    createInactiveButtons() {
      const errorMessage = document.querySelector('#ctl00_cphBody_upBasket .leftColumn > .errorMessage');
      if (errorMessage) {
        const inactiveCtaBtns = `<div id="ctl00_cphBody_pnlButtonsMobile" class="checkoutButtonsMobile inactiveCtaBtns">         
          <div class="m-checkout-buttons">
            <div id="ctl00_cphBody_lbProceedMobile" class="actionButton" href="">Proceed to checkout</div>                         
          </div>
          <div class="clearFix"></div>    
          <div class="clearFix"></div>
          <div id="visa-checkout">
            <div class="or-decoration"><span>OR</span></div>
            <div class="v-checkout-wrapper">
              <img alt="Visa Checkout" class="v-button" role="button" style="height: 47px; min-height: 47px; cursor: pointer; transition-property: filter; transition-duration: 0.25s;" src="https://secure.checkout.visa.com/wallet-services-web/xo/button.png?height=47&amp;width=367&amp;cobrand=false" tabindex="0">
              <div class="visa-checkout-more">
                <a class="v-learn" aria-label="Learn more about Visa Checkout">Tell Me More</a>
              </div>
            </div>
            <div class="visa-checkout-ErrorMessage" style="display:none;"></div> 
          </div>
        </div>`;

        errorMessage.insertAdjacentHTML('afterend', inactiveCtaBtns);
      }
    },

    upsellMessage() {
      const upsellHeader = document.querySelector('.upsell-mobile .redText');
      upsellHeader.outerHTML = '<h2>You know you\'re tempted...<span>Don\'t miss out on these discounts. Up to 50% off!</span></h2>';
    },

    freeDipSection() {
      const main = document.querySelector('.main');
      const freeDipContent = document.querySelector('.missingItemsMobileCont');
      if (freeDipContent) {
        main.insertBefore(freeDipContent, main.firstChild);

        freeDipContent.querySelector('h2').innerHTML = 'Your order includes FREE dip/s! <span>Add your favourite to continue</span>';

        const freeDipItems = document.querySelectorAll('.missingItemsMobileCont .freeItem');
        for (let index = 0; index < freeDipItems.length; index += 1) {
          const element = freeDipItems[index];
          const freeDipAdd = element.querySelector('.greenToggle');
          freeDipAdd.textContent = 'Add free dip';

          const freeItemsLink = element.querySelector('.otherItems a');
          if (freeItemsLink) {
            freeDipAdd.style.display = 'none';
          } else {
            freeDipAdd.style.display = 'block';
          }
        }
      }
    },
  },
};

export default Experiment;
