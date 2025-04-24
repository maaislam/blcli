import settings from './settings';
import pubSub from './PublishSubscribe';
import RC035 from '../../../RC035/src/experiment';

/**
 * Add body classes
 *
 * @access private
 */
const addBodyClasses = () => {
  document.body.classList.add(settings.ID);

  document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
};

/**
 * Set step state
 */
const setStepState = (step) => {
  const mainContainer = document.querySelector('main .main-content');

  mainContainer.className = mainContainer.className.replace(
    new RegExp(`${settings.ID}-state-\\d+`, 'g'),
    ''
  );

  mainContainer.classList.add(`${settings.ID}-state-${step}`);
};

/**
 * Init basket toggle
 */
const initBasketToggle = (contents) => {
  const basketTitle = document.querySelector('.RC035-basket_title h3');
  if(basketTitle) {
    basketTitle.insertAdjacentHTML('beforeend', `
      <div class="${settings.ID}-toggler">
        View Items <i class="fa fa-chevron-down"></i>
      </div>
    `);

    const toggler = document.querySelector(`.${settings.ID}-toggler`);
    if(toggler) {
      toggler.addEventListener('click', () => {
        if(toggler.classList.contains(`${settings.ID}-toggler--active`)) {
          toggler.classList.remove(`${settings.ID}-toggler--active`);

          window.jQuery(contents).slideUp();

          toggler.innerHTML = 'View Items <i class="fa fa-chevron-down"></i>';

          pubSub.publish('click-event', 'hide-items');
        } else {
          toggler.classList.add(`${settings.ID}-toggler--active`);

          window.jQuery(contents).slideDown();

          toggler.innerHTML = 'Hide Items <i class="fa fa-chevron-up"></i>';

          pubSub.publish('click-event', 'show-items');
        }
      });
    }
  }
};

/**
 * Entry point for running experiment
 *
 * @access public
 */
export default () => {
  // --------------------------------------------
  // Experiment is running
  // --------------------------------------------
  pubSub.publish('experiment-init');

  // --------------------------------------------
  // Add classes to body
  // --------------------------------------------
  addBodyClasses();

  // --------------------------------------------
  // Run RC035
  // --------------------------------------------
  RC035.init();
  
  // --------------------------------------------
  // Set initial state which hides later elms
  // --------------------------------------------
  setStepState(1);

  // -------------------------------------------------------------
  // Build 'continue' button which moves state on to next step
  // -------------------------------------------------------------
  const checkoutHeading = document.querySelector('.checkout-heading');
  checkoutHeading.insertAdjacentHTML('afterend', `
    <p class="${settings.ID}-text-center ${settings.ID}-btn-step1">
      <a class="${settings.ID}-btn ${settings.ID}-btn--continue">Continue to checkout</a>
    </p>
  `);

  const btnContinue = document.querySelector(`.${settings.ID}-btn--continue`);
  if(btnContinue) {
    btnContinue.addEventListener('click', () => {
      setStepState(2);

      pubSub.publish('click-event', 'continue-to-checkout');

      window.jQuery('body,html').animate({
        scrollTop: window.jQuery('.RC035-basket_wrapper').offset().top
      });

      // Hide basket contents
      const contents = document.querySelector('.purchasenav-basket-contents');
      if(contents) {
        contents.style.display = 'none';
      }

      // Toggle
      if(window.innerWidth > 982) {
        initBasketToggle(contents);
      } else {
        contents.classList.remove('RC035-basket_showing');

        const basketWrapper = document.querySelector(`.RC035-basket_wrapper`);
        basketWrapper.classList.remove('RC035-basketTitle_showing');
      }
    });
  }
  
  // -------------------------------------------------------------
  // Force auto-open
  // -------------------------------------------------------------
  if(localStorage.getItem(`${settings.ID}-should-autoopen`)) {
    btnContinue.click();
    localStorage.removeItem(`${settings.ID}-should-autoopen`);
  }

  // -------------------------------------------------------------
  // Step 2 
  // -------------------------------------------------------------
  const closure = document.querySelector('.checkout-startclosure');
  const checkoutLoginPanel = document.querySelector('.checkout-login-panel');

  if(checkoutLoginPanel) {
    closure.classList.add(`${settings.ID}-text-center`);

    checkoutLoginPanel.insertAdjacentHTML('afterend', `
      <div class="${settings.ID}-or-wrapper">
        <p class="${settings.ID}-or">or</p>
        <p class="${settings.ID}-title">New Customer Checkout</p>
      </div>
    `);
  }

  // -------------------------------------------------------------
  // Mobile
  // -------------------------------------------------------------
  if(window.innerWidth <= 982) {
    const basketWrapper = document.querySelector(`.RC035-basket_wrapper`);
    if(basketWrapper) {
      basketWrapper.click();
    }
  }
  
  // -------------------------------------------------------------
  // On form submit, flag auto-collapse
  // -------------------------------------------------------------
  const form = document.querySelector('#MainForm');
  form.addEventListener('submit', () => {
    localStorage.setItem(`${settings.ID}-should-autoopen`, 1);
  });
  
  // -------------------------------------------------------------
  // Requirements for logged in users
  // -------------------------------------------------------------
  if(window.basketContentsJson && !!window.basketContentsJson.Email) {
    document.body.classList.add(`${settings.ID}-user-is-logged-in`);
  }
  
  // -------------------------------------------------------------
  // Edit basket button
  // -------------------------------------------------------------
  const backButton = document.querySelector('.purchasenav-back-button');
  if(backButton) {
    backButton.insertAdjacentHTML('afterend', `
      <a href="/Basket.aspx" class="${settings.ID}-edit-basket-link">Edit Basket</a>
    `);

    const editBasketLink = document.querySelector(`.${settings.ID}-edit-basket-link`);
    if(editBasketLink) {
      editBasketLink.addEventListener('click', () => pubSub.publish('click-event', 'edit-basket-link'));
    }
  }

  // -------------------------------------------------------------
  // EVENT TRACKING...
  // -------------------------------------------------------------
  const elements = document.querySelectorAll(
    '.checkout-form-container input, .checkout-form-container select, .checkout-form-container textarea'
  );
  [].forEach.call(elements, (elm) => {
    elm.addEventListener('focus', () => pubSub.publish('form-interaction'));
  });

  const panelBtn = document.querySelector('.checkout-login-panel-button');
  panelBtn.addEventListener('click', () => pubSub.publish('click-event', 'returning-customers-login'));

};
