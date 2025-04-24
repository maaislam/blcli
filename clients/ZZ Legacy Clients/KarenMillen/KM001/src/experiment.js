/**
 * KM001 - Billing Address
 * @author Lewis Needham - User Conversion
 */

import { setup } from './services';
import { cacheDom } from '../../../../lib/cache-dom';
import settings from './settings';
import { events } from '../../../../lib/utils';

const activate = () => {
  setup();
  const { VARIATION } = settings;

  /**
   * Automatically select match shipping address
   */
  const matchShippingAddress = () => {
    const useShippingAddressInput = cacheDom.get('#use_shipping');
    if (!useShippingAddressInput.checked) {
      // Add temporary class to body to prevent page from auto scrolling
      document.body.classList.add('KM001_block-scroll');
      setTimeout(() => {
        document.body.classList.remove('KM001_block-scroll');
      }, 1200);

      useShippingAddressInput.click();
    }
  };

  /**
   * Hide the billing address form fields when the checkbox is selected
   */
  const hideFormFields = () => {
    const useShippingAddressInput = cacheDom.get('#use_shipping');

    const toggleVisibility = () => {
      const billingFormFields = cacheDom.get('.billing-form-fields');
      if (useShippingAddressInput.checked) {
        // Is checked, hide form fields
        billingFormFields.classList.add('KM001_hide-form-fields');
      } else {
        // Not checked, show form fields
        billingFormFields.classList.remove('KM001_hide-form-fields');
      }
    };

    toggleVisibility();
    useShippingAddressInput.addEventListener('change', toggleVisibility);
  };

  /**
   * Add tracking
   */
  const tracking = () => {
    const useShippingAddressInput = cacheDom.get('#use_shipping');
    useShippingAddressInput.addEventListener('change', () => {
      const status = useShippingAddressInput.checked ? 'Selected' : 'Deselected';
      events.send(settings.ID, status, 'Billing address same as checkout');
    });

    const submitButton = cacheDom.get('#toPayment');
    submitButton.addEventListener('click', () => {
      const password = cacheDom.get('#dwfrm_billing_checkoutLogin_profile_password');
      const confirm = cacheDom.get('#dwfrm_billing_checkoutLogin_profile_passwordconfirm');
      if (password.value && confirm.value && password.value.length > 5 && password.value === confirm.value) {
        events.send(settings.ID, 'Entered', 'Password', { sendOnce: true });
      }
    });
  };

  // Init
  matchShippingAddress();
  tracking();

  if (VARIATION === '2') {
    hideFormFields();
  }
};

export default activate;
