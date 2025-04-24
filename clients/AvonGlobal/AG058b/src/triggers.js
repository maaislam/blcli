/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { share, getPageType } from './lib/services';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  const { ID, VARIATION } = shared;

  // Force set GA reference to 360 account
  // As of March 2020 we noticed the default tracker isn't always
  // this core account
  events.setPropertyId('UA-142145223-1');

  /**
   * Poll for elements the run experiment
   */
  const pollAndFire = () => {
    pollerLite(
      [
        // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
        // Specify polling elements
        // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
        'body',
      '.Layout_Phone',
      () => {
        return ($('#CategoriesSection').length > 0 || $('.SubCategoryList').length > 0);
      }
      ],
      () => {

        // Fire did meet conditions
        events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
        if (VARIATION.toLowerCase() !== 'control') {
          activate();
        }
        else if ($('#CategoriesSection').length > 0) {
          // Check for categories only. In control, subcategories are hidden.
          events.send(`${ID}-${VARIATION}`, 'categories-visible');

          $('#CategoriesSection').find('.CategoryItem').click(function (e) {
            events.send(`${ID}-${VARIATION}`, 'click', $(this).text().trim());
          });
        }
      },
    );
  };

    /**
   * Top-level polling entry point for code execution
   */
  getPageType().then((pageType) => {
    if (pageType === 'PLP') {
      waitForApp().then((data) => {
        share(data);
        pollAndFire();
      });
    }
  });
}
