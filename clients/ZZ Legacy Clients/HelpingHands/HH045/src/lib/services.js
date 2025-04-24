import { pollerLite, fullStory } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

/**
 * Update phone numbers in the header to match infinity numbers on page
 * Add to data-number-type="care" or data-number-type="job" to an element
 * for the number to be updated when infinity number runs
 */
export const updateInfinityNumbers = () => {
  /**
   * Wait for the Infinity Number API to be available
   * @param {Funciton} cb
   */
  const waitForApi = (cb) => {
    pollerLite([
      () => window?._ictt?.push instanceof Function,
      () => window?._ictt?.hasIntegrationsRun,
      () => {
        const numbers = document.querySelectorAll('.InfinityNumber');
        return numbers ? numbers.length >= 2 : false;
      },
    ], cb);
  };

  const callback = () => {
    const { _ictt } = window;

    /* Add a callback which will run when the Infinity Numbers
    have loaded in (or immediately if they already exist) */
    _ictt.push(['_addCallback', () => {
      /**
       * Replace a number element with a new number
       * @param {HTMLElement} element Element containing old number
       * @param {string} number New number
       */
      const replaceNumber = (element, number) => {
        const el = element;
        el.classList.remove('infinityNumber');
        el.href = `tel:${number.replace(/\s/g, '')}`;
        el.innerText = number;
      };

      const branchNumbers = [].map.call(document.querySelectorAll('#mobile-call-block > div > .InfinityNumber'), el => el.innerText.trim());
      const [careNumber, jobNumber] = branchNumbers;

      const careNumbersToReplace = document.querySelectorAll('[data-number-type="care"]');
      const jobNumbersToReplace = document.querySelectorAll('[data-number-type="job"]');

      // Replace care numbers
      [].forEach.call(careNumbersToReplace, (careNumberToReplace) => {
        replaceNumber(careNumberToReplace, careNumber);
      });

      // Replace job number
      [].forEach.call(jobNumbersToReplace, (jobNumberToReplace) => {
        replaceNumber(jobNumberToReplace, jobNumber);
      });

      // Replace numbers on static desktop header
      const staticDesktopHeader = document.querySelector('body > #top-nav');
      if (staticDesktopHeader) {
        const staticHeaderNumbers = staticDesktopHeader.querySelectorAll('a.InfinityNumber');
        const [staticHeaderCareNumber, staticHeaderJobNumber] = staticHeaderNumbers;
        if (staticHeaderCareNumber) replaceNumber(staticHeaderCareNumber, careNumber);
        if (staticHeaderJobNumber) replaceNumber(staticHeaderJobNumber, jobNumber);
      }
    }]);
  };

  waitForApi(callback);
};
