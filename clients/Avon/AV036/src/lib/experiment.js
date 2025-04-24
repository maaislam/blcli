/**
 * AV036 - Specific Days of Delivery in Checkout
 * This experiment is designed to run on top of AG010 or AG025
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { countdown } from '../../../../../lib/uc-lib';
import shared from './shared';
import { angularCompile, getTemplate, replaceTemplate } from '../../../../../lib/utils/avon';

export default () => {
  const { ID } = shared;
  const isMobile = window.innerWidth < 768;
  setup();

  /**
   * Keep track of when the UK timezone shifts from GMT to BST as this will
   * affect when the order cutoff time is
   *
   * Express delivery cutoff time is 1PM in the UK so UTC+0 in GMT and UTC+1 in BST
   * Standard delivery cutoff is midnight
   */
  const BST_DATES = {
    2020: {
      start: new Date('March 29, 2020 1:00:00 GMT+0:00'),
      end: new Date('October 25, 2020 2:00:00 GMT+1:00'),
    },
    2021: {
      start: new Date('March 28, 2021 1:00:00 GMT+0:00'),
      end: new Date('October 31, 2021 2:00:00 GMT+1:00'),
    },
  };

  /**
   * @return {boolean}
   */
  function isBST() {
    const date = new Date();
    const period = BST_DATES[date.getUTCFullYear()];

    return date > period.start && date < period.end;
  }

  /**
   * Return the estimated delivery date by passing a number of days it takes
   * to arrive. This uses the countdown component which already accounts for
   * cutoff times and non-working days
   * @param {number} days
   * @param {boolean} isExpress
   * @returns {string}
   */
  function getDeliveryDate(days, isExpress) {
    // Create cutoff date and convert to ms since epoch with getTime
    let cutoff = new Date();
    const bst = isBST();

    /**
     * If express set to 1PM Avon server time (UK timezone)
     * or if standard set to end of day
     */
    if (isExpress) {
      cutoff.setUTCHours(bst ? 12 : 13, 0, 0);
    } else {
      cutoff.setUTCHours(bst ? 22 : 23, 59, 59);
    }

    cutoff = cutoff.getTime();

    const countdownComponent = countdown({
      cutoff,
      delivery: {
        deliveryDays: days, // How long an item takes to arrive
        excludeDays: ['Saturday', 'Sunday'], // Non-working days
        showFullDate: true,
        dayLabelStyle: isMobile ? 'short' : 'long',
        monthLabelStyle: 'short',
      },
    });

    return countdownComponent.deliveryDay;
  }

  /**
   * Inject delivery dates into delivery section markup
   * This is preferable to modifying the DOM directly as when the components are
   * re-compiled the dates will still be there
   * @param {object.<string>} deliveryDates Object containing delivery date strings
   *  where keys match the shippingOption delivery time frame and values are the
   *  delivery dates.
   */
  function injectDeliveryDates(deliveryDates) {
    const template = getTemplate('deliverySelection.html');
    const $template = $('<div>').html(template);
    const $options = $template.find('[ng-repeat="shippingOption in shippingOptions"]');

    $options.each((i, element) => {
      const $option = $(element);

      // Inject timeframe markup
      const $title = $option.find('.title');
      $title.after(`
        <p class="title ${ID}_title">{{shippingOption.FormattedDescription.toLowerCase()}}</p>
        <div class="${ID}_deliveryDates">
          ${Object.keys(deliveryDates).map(key => `
            <p ng-if="shippingOption.FormattedTimeFrame === '${key}'">
              ${deliveryDates[key]}
            </p>
          `).join('')}
        </div>
      `);
    });

    replaceTemplate('deliverySelection.html', $template.html(), () => {
      // Re-compile directive
      const $section = $('mvp-delivery-selection');
      $section.empty();
      angularCompile($section, $, $section.scope());
    });
  }

  const dates = {
    '1-2 Working Days': `Get it on ${getDeliveryDate(1, true)}`,
    '3-5 Working Days': `Get it by ${getDeliveryDate(5, false)}`,
    'Up To 5 Working Days': `Get it by ${getDeliveryDate(5, false)}`,
    'Up To 7 Working Days': `Get it by ${getDeliveryDate(7, false)}`,
  };

  injectDeliveryDates(dates);
};
