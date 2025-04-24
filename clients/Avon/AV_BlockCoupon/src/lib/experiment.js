/**
 * Avon - Blocks specific vouchers from being used whilst
 * user is attached to a rep
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';

const activate = () => {
  setup();

  const { ID } = settings;
  const { angular } = window;
  const $ = angular.element;
  const rootScope = window.AppModule.RootScope;

  // List of disabled codes
  const disabledCodes = [
    'associate30',
    'associate50',
    'nhs30',
  ];

  /**
   * Get the current coupon code
   * @returns {string}
   */
  const getCouponCode = () => $('.Cart-NoCoupon #couponcode')[0].value;

  /**
   * Creates and inserts a dummy 'apply' button to replace
   * the original one in the UI. On click the replacement will
   * run a check to prevent a sepecific codes being used whilst
   * attached to a rep
   */
  const createDummyButton = () => {
    const $form = $('.Cart-NoCoupon form');
    const $originalButton = $form.find('.Button[ng-click="ApplyCoupon()"]');
    const $newButton = $(`<a class="Button vi-btn vi-btn--secondary" id="${ID}_newApplyCoupon">Apply</a>`);

    // Event handlers
    $newButton.on('click', () => {
      // Remove all previous error messaging
      const $errors = $form.find(`.${ID}_couponError`);
      $errors.remove();

      const code = getCouponCode();
      const codeIsDisabled = disabledCodes.indexOf(code.toLowerCase().trim()) > -1;
      if (codeIsDisabled) {
        // Hide any existing error messaging
        const $existingErrors = $form.find('#CouponCode');
        if ($existingErrors.length) {
          $existingErrors.hide();
        }

        // Prompt user to detach from rep
        $form.append(`
          <div class="${ID}_couponError">
            <span>
              Sorry! This code can only be used when you are not attached to a rep. Please remove the rep attachment and try again.
            </span>
          </div>
        `);
      } else {
        // Proceed as normal
        $originalButton.click();
      }
    });

    // Render
    $originalButton.before($newButton);
    $originalButton.hide();
  };

  /**
   * Make all changes
   */
  const init = () => {
    // Create button if it doesn't already exist
    const $newButton = $(`#${ID}_newApplyCoupon`);
    if (!$newButton.length) {
      createDummyButton();
    }
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    // Timeout as the DOM changes don't happen instantly on layout change
    setTimeout(init, 1000);
  });

  init();
};

export default activate;
