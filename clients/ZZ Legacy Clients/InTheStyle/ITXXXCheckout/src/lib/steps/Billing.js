import AbstractStep from './AbstractStep';
import { cacheDom } from '../../../../../../lib/cache-dom';
import { poller } from '../../../../../../lib/uc-lib';
import { userIsLoggedIn } from '../helpers';
import { events } from '../../../../../../lib/utils';
import { shippingStep } from './Shipping';

/**
 * @desc Billing 
 */
class Billing extends AbstractStep {
  /**
   * @desc Initialise step
   */
  init() {
    this.isValid = false;

    this.useFauxPostcode = false;

    this.isCreateAccount = false;

    // Init methods
    this.setTitle();
    this.hideFields();

    if(!userIsLoggedIn()) {
      this.buildFauxPostcode();
      this.buildCreateAccount();
    }

    this.additionalUi();

    this.handleCountryChange();

    this.populateFieldMessages();

    return this;
  }

  /**
   * Against fields add relevant messages we can use later
   */
  populateFieldMessages() {
    const messages = {
      '#billing\\:firstname': 'Please enter your first name',
      '#billing\\:lastname': 'Please enter your last name',
      '#billing\\:street1': 'Please enter the first line of your address',
      '#billing\\:postcode': 'Please enter your postcode',
      '#billing\\:city': 'Please enter your city',
      '#billing\\:confirm_password': 'Ensure your passwords match and are 6 or more characters long',
      '#billing\\:telephone': 'Please enter your telephone'
    };

    for(const f in messages) {
      const field = cacheDom.get(f, true);
      if(field) {
        field.dataset['itx9error'] = messages[f];
      }
    }
  }

  /**
   * Handle country change
   *
   * Changes to country impacts which delivery methods can show
   */
  handleCountryChange() {
    const countrySelect = cacheDom.get('#billing\\:country_id', true);
    countrySelect.addEventListener('change', () => {
      if(this.getIsValid()) {
        this.saveStep();
      }
    });
  }

  /**
   * @desc Save step
   */
  saveStep() {
    window.billing.save();
  }

  /**
   * Helper build extra UI features
   */
  additionalUi() {
    const phoneField = cacheDom.get('#billing\\:telephone');
    phoneField.insertAdjacentHTML('afterend', `
        <div class="itx9-field-desc">
          Only used in case we can't find you! We won't sign you up to anything...
        </div>
    `);
  }

  /**
   * @desc Register a validation listener, notify callbacks on valid / invalid
   * The shipping steps can't be initialised unless these fields are valid
   * so we have to show / hide the shipping based on the validation of this step
   *
   * @param {Function} success
   * @param {Function} error
   */
  registerValidator(success, error) {
    /**
     * @desc Validation rules
     * Default string implies required
     * Functions return boolean to pass
     */
    const validationRules = [
      () => {
        let ret = true;
        if(this.useFauxPostcode && !userIsLoggedIn()) {
          const fauxPostcode = cacheDom.get('.itx9-faux-postcode__input', true);

          ret = !!fauxPostcode;
        }
        return ret;
      },
      '#billing\\:firstname',
      '#billing\\:lastname',
      '#billing\\:street1',
      '#billing\\:postcode',
      '#billing\\:city',
      '#billing\\:telephone',
      () => {
        const registerCustomerPassword = cacheDom.get('#register-customer-password');

        if(!registerCustomerPassword) {
          return true;
        }

        if(this.getIsCreateAccount()) {
          const passwordField = cacheDom.get('#billing\\:customer_password');
          const passwordConfirmField = cacheDom.get('#billing\\:confirm_password');
          if(passwordField.value.trim().length >= 6 && passwordConfirmField.value == passwordField.value) {

            this.markFieldValid(passwordField);
            this.markFieldValid(passwordConfirmField);

            return true;
          } else {
            this.markFieldInvalid(passwordField);
            this.markFieldInvalid(passwordConfirmField);

            return false;
          }
        }

        return true;
      }
    ];

    this.recursiveValidator(validationRules, success, error);
  }

  /**
   * @desc Helper build country identifier
   */
  buildCreateAccount() {
    // Toggler
    const regPasswordField = cacheDom.get('#register-customer-password');
    regPasswordField.insertAdjacentHTML('beforebegin', `
      <li class="itx9-create-account">
        <h3>Create an Account</h3>
        <p>Save your deets so you can checkout quicker next time, honey!</p>
        <div class="itx9-toggler">
          <span class="itx9-toggler__label itx9-toggler__label--no itx9-toggler__label--active">No thanks</span>
          <span class="itx9-toggler__toggle">
            <span class="itx9-toggler__track">
              <span class="itx9-toggler__handle"></span>
            </span>
          </span>
          <span class="itx9-toggler__label itx9-toggler__label--yes">YAS QUEEN</span>
        </div>
      </li>
    `);

    // Events for toggler
    const togglerWrap = cacheDom.get('.itx9-toggler');
    const togglerTrack = cacheDom.get('.itx9-toggler__track');
    const togglerLabels = cacheDom.getAll('.itx9-toggler__label');
    const togglerHandle = cacheDom.get('.itx9-toggler__handle');
    const loginGuest = cacheDom.get('#login\\:guest');
    const loginRegister = cacheDom.get('#login\\:register');

    togglerTrack.addEventListener('click', () => {
      if(togglerHandle.classList.contains('itx9-toggler__handle--activated')) {
        hideCreateAccount();
      } else {
        showCreateAccount();
      }
    });

    [].forEach.call(togglerLabels, (item) => {
      item.addEventListener('click', () => {
        if(togglerHandle.classList.contains('itx9-toggler__handle--activated')) {
          hideCreateAccount();
        } else {
          showCreateAccount();
        }
      });
    });

    // Add autocomplete off on register password
    const password = cacheDom.get('#billing\\:customer_password');
    const confirmPassword = cacheDom.get('#billing\\:confirm_password');
    if(password && confirmPassword) {
      password.setAttribute('autocomplete', 'off');
      confirmPassword.setAttribute('autocomplete', 'off');
    }

    // On touch swipe on toggler
		(function() {
      var threshold = 20;
      var xDown = null;
      var yDown = null;

      /**
       * On touch start set screen pos
       */
      const handleTouchStart = (evt) => {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
      };

      /**
       * Toggler diff
       */
      const handleTouchMove = (evt) => {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) { // More movement in x than y
          if (xDiff > 0) {
            // Did swipe left
            if(togglerHandle.classList.contains('itx9-toggler__handle--activated')) {
              togglerHandle.style.left = (50 - Math.min(Math.abs(xDiff), 50)) + 'px';
            }
          } else {
            // Did swipe right
            if(!togglerHandle.classList.contains('itx9-toggler__handle--activated')) {
              togglerHandle.style.left = Math.min(Math.abs(xDiff), 50) + 'px';
            }
          }
        }
      };

      /**
       * Show / hide account on done
       */
      const handleTouchEnd = (evt) => {
        if(togglerHandle.classList.contains('itx9-toggler__handle--activated')) {
          if(Math.abs(parseInt(togglerHandle.style.left, 10)) < 50 - threshold) { 
            hideCreateAccount();
          } else {
            togglerHandle.style.left = 50 + 'px';
          }
        } else {
          if(Math.abs(parseInt(togglerHandle.style.left, 10)) > threshold) { 
            showCreateAccount();
          } else {
            togglerHandle.style.left = 0 + 'px';
          }
        }
      };

      // Bind touch event handlers
      togglerHandle.addEventListener('touchstart', handleTouchStart, false);
      togglerHandle.addEventListener('touchmove', handleTouchMove, false);
      togglerHandle.addEventListener('touchend', handleTouchEnd, false);

    })();

    /**
     * Helper toggle create account
     */
    const showCreateAccount = () => {
      cacheDom.get('.itx9-toggler__label--no').classList.remove('itx9-toggler__label--active');
      togglerHandle.classList.add('itx9-toggler__handle--activated');
      cacheDom.get('.itx9-toggler__label--yes').classList.add('itx9-toggler__label--active');

      togglerHandle.style.left = 50 + 'px';

      this.isCreateAccount = true;

      cacheDom.get('.itx9-vip-slider').style.display = 'none';
      cacheDom.get('#register-customer-password').classList.add('itx9-visible');

      loginRegister.click();
      loginRegister.checked = true;
      checkout.setMethod();

      events.send(null, 'did-click-create-account', 'yes');
    };

    /**
     * Helper toggle create account
     */
    const hideCreateAccount = () => {
      cacheDom.get('.itx9-toggler__label--yes').classList.remove('itx9-toggler__label--active');
      togglerHandle.classList.remove('itx9-toggler__handle--activated');
      cacheDom.get('.itx9-toggler__label--no').classList.add('itx9-toggler__label--active');

      togglerHandle.style.left = 0;

      this.isCreateAccount = false;

      cacheDom.get('.itx9-vip-slider').style.display = 'block';
      cacheDom.get('#register-customer-password').classList.remove('itx9-visible');

      loginGuest.click();
      loginGuest.checked = true;
      checkout.setMethod();
      
      events.send(null, 'did-click-create-account', 'no');
    };
        
    // Why VIP carousel
    cacheDom.get('.itx9-create-account').insertAdjacentHTML('beforeend', `
        <div class="itx9-vip-slider">
          <div class="itx9-vip-slider__inner">
            <h4>What's in it for you?</h4>
            <p><img class="itx9-vip-slider__img" src="data:image/png;base64,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" /></p>

            <div class="itx9-vip-slider__slide">
              <p class="itx9-vip-slider__desc">You'll be the first to hear about all that new new as soon as it hits the site, babe!</p>
              <p class="itx9-vip-slider__desc">We'll send you killer deals first, so you can look hella fash for less cash</p>
              <p class="itx9-vip-slider__desc">Be a boss ass babe and get the 411 on all our collabs before anyone else!</p>
            </div>

          </div>
        </div>
    `);

    const x = 'jQuery';

    poller([
      () => !!window[x] && !!window[x].fn.slick
    ], () => {
        window[x](cacheDom.get('.itx9-vip-slider__slide')).slick({
          arrows: false,
          dots: true,
          slide: '.itx9-vip-slider__desc',
          slidesToShow: 1,
          slidesToScroll: 1
        });
      }
    );
  }

  /**
   * Helper refresh slider
   */
  refreshSlider() {
    const x = 'jQuery';

    window[x.substring(0)](cacheDom.get('.itx9-vip-slider__slide')).slick('refresh');
  }

  /**
   * @desc Helper build country identifier
   */
  buildCountryIdentifier() {
    const fauxPostcodeWrap = cacheDom.get('.itx9-faux-postcode-wrapper');
    const curCurrency = cacheDom.get('.left-off-canvas-content .currency-switcher .currency-current');
    if(curCurrency) {
      let countryText = null;
      if(curCurrency.classList.contains('currency-GBP')) {
        countryText = 'United Kingdom';
      } else if(curCurrency.classList.contains('currency-EUR')) {
        countryText = 'Europe';
      } else if(curCurrency.classList.contains('currency-AUD')) {
        countryText = 'Australia';
      } else if(curCurrency.classList.contains('currency-USD')) {
        countryText = 'United States';
      }

      fauxPostcodeWrap.insertAdjacentHTML('beforebegin', `
        <div class="itx9-country-identifier">
          <p class="itx9-country-identifier__content"  
            >Looks like you are in <span class="itx9-country-identifier__country">${countryText}</span></p>
          <p><a class="itx9-country-identifier__change">change</a></p>
        </div>
      `);

      const countryIdentifierWrap = cacheDom.get('.itx9-country-identifier');
      const countryIdentifier = cacheDom.get('.itx9-country-identifier__country');
      countryIdentifier.className += (' ' + curCurrency.className);

      // Change lightbox
      const countryChange = cacheDom.get('.itx9-country-identifier__change');
      const currencyDropdown = cacheDom.get('.currency-dropdown.f-dropdown');
      const currencyDropdownClone = currencyDropdown.clone(true);

      currencyDropdownClone.id = 'itx9-currency-dropdown';
      currencyDropdownClone.classList.add('itx9-hidden');
      currencyDropdownClone.insertAdjacentHTML('beforeend', `
        <span class="itx9-close">&times;</span>
      `);

      countryIdentifierWrap.insertAdjacentElement('beforeend', currencyDropdownClone);
      
      countryChange.addEventListener('click', () => {
        if(currencyDropdownClone.classList.contains('itx9-hidden')) {
          currencyDropdownClone.classList.remove('itx9-hidden');
        } else {
          currencyDropdownClone.classList.add('itx9-hidden');
        }
      });

      cacheDom.get('.itx9-close').addEventListener('click', () => {
        currencyDropdownClone.classList.add('itx9-hidden');
      });
    }
  }

  /**
   * @desc Helper build faux postcode element which maps to real 'hidden' postcode
   */
  buildFauxPostcode() {
    if(!this.useFauxPostcode) {
      return;
    }

    const nameFields = this.step.querySelector('#billing-new-address-form ul li.fields:nth-child(1)');
    if(nameFields) {
      nameFields.insertAdjacentHTML('afterend', `
        <li class="itx9-faux-postcode-wrapper">
          <div class="itx9-faux-postcode">
            <label class="itx9-faux-postcode__label">Postcode *</label>
            <div class="input-box">
              <input type="email" required class="itx9-faux-postcode__input input-text">
            </div>
          </div>
        </li>
      `);
    }

    const fauxInput = cacheDom.get('.itx9-faux-postcode__input');
    const targetElm = cacheDom.get('#billing\\:postcode');

    fauxInput.addEventListener('keyup', (e) => {
      const thisValue = e.currentTarget.value;
      targetElm.value = thisValue;
    });
  }

  /**
   * @desc Set title
   */
  setTitle() {
    const stepTitle = this.step.querySelector('.step-title');
    stepTitle.innerHTML = '<h3>Billing Address Details</h3>';

    stepTitle.insertAdjacentHTML('afterend', `
        <p class="itx9-step-subtitle itx9-step-subtitle--billing">
          This should be the registered address for your payment method.
        </p>
    `);
  }

  /**
   * @desc Fields to hide
   */
  hideFields() {
    const fields = [
      '.field.name-middlename', // Middle Name Field
      () => {
        if(this.useFauxPostcode) {
          // Hide postcode field for anonymous users (as this is handled by
          // the faux postcode)
          if(!userIsLoggedIn()) {
            const postcodeLabel = cacheDom.get('label[for=billing\\:postcode]');
            if(postcodeLabel) {
              postcodeLabel.parentNode.classList.add('itx9-hide');
            }
          }
        }
      },
      () => {
        const monthLabel = cacheDom.get('label[for=billing\\:month]');
        if(monthLabel) {
          monthLabel.parentNode.classList.add('itx9-hide');
        }
      },
    ];

    if(!userIsLoggedIn()) {
      // Hide the email address when the user is not logged in
      // as this is handled by the faux email address
      fields.push(
        '#billing-new-address-form > fieldset > ul > li.fields:nth-child(2)', // Email Field
      );
    }

    fields.forEach((field) => {
      if(typeof field === 'function') {
        field.call();
      } else {
        const elm = cacheDom.get(field);
        if(elm) {
          elm.classList.add('itx9-hide');
        }
      }
    });
  }

  /**
   * Is creating account?
   */
  getIsCreateAccount() {
    return !!this.isCreateAccount;
  }

}

export let billingStep = new Billing('#opc-billing');
