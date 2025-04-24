import { fullStory, pollerLite } from '../../../../../lib/utils';
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
 * Get the current device type
 * @returns {string}
 */
export const getDeviceType = () => {
  // TODO: Update to be accurate
  const windowWidth = window.innerWidth;
  if (windowWidth < 768) {
    return 'mobile';
  } else if (windowWidth >= 992) {
    return 'desktop';
  } else if (windowWidth >= 768 && windowWidth < 992) {
    return 'tablet';
  }
};

/**
 * Returns an object of the user profile
 * @returns {object}
 */
export const getUserProfile = () => {
  const { localStorage } = window;
  const deviceType = getDeviceType();
  // n.b. ExisitngUser is inconsistent
  const existingUser = localStorage?.ExistingUser === 'Yes';
  const intentScore = localStorage?.customerIntentScore;
  const researchType = localStorage?.customerResearchType;
  const typeScore = localStorage?.customerTypeScore;
  const location = localStorage?.['Frequent Location'];

  return {
    deviceType,
    existingUser,
    intentScore,
    researchType,
    typeScore,
    location,
  };
};

/**
 * Gets the profile type number based on the user profile object
 * @param {object} userProfile
 * @returns {Array.<Number>}
 */
export const getProfileType = (userProfile) => {
  const {
    deviceType,
    existingUser,
    researchType,
    location,
    typeScore,
  } = userProfile;

  const profileTypes = {
    // Desktop users who return as Jobs
    // (and have a saved research type)
    1:
      deviceType === 'desktop'
      && typeScore === 'Jobs'
      && (researchType && researchType !== 'Undefined'),

    // Desktop users who return as existing customers
    // (and do not have a saved branch or saved research type)
    2:
      deviceType === 'desktop'
      // && existingUser
      && !location
      && (!researchType || researchType === 'Undefined'),

    // Desktop users who return as Passive or Undefined
    // (and a saved branch and research type)
    3:
      deviceType === 'desktop'
      && (researchType === 'Passive Researcher' || researchType === 'Undefined')
      && location,

    // Desktop users who return as Active
    // (and no saved branch)
    4:
      deviceType === 'desktop'
      && researchType === 'Active Researcher'
      && !location,

    // Desktop users who return as High intent
    // (and have a saved branch and a saved research type)
    5:
      deviceType === 'desktop'
      && researchType === 'High Intent'
      && location,

    // Mobile users who return as Jobs
    // (and have a saved research type)
    6:
      deviceType === 'mobile'
      && typeScore === 'Jobs'
      && (researchType && researchType !== 'Undefined'),

    // Mobile users who return as Jobs
    // (and no saved research type)
    7:
      deviceType === 'mobile'
      && typeScore === 'Jobs'
      && (!researchType || researchType === 'Undefined'),

    // Mobile users who return as Passive or Undefined
    8:
      deviceType === 'mobile'
      && (researchType === 'Passive Researcher' || researchType === 'Undefined'),

    // Mobile users who return as Active and High Intent
    // (and no saved branch)
    9:
      deviceType === 'mobile'
      && (researchType === 'Active Researcher' || researchType === 'High Intent')
      && !location,

    // Mobile users who return as Active and High Intent
    // (and saved branch)
    10:
      deviceType === 'mobile'
      && (researchType === 'Active Researcher' || researchType === 'High Intent')
      && location,

    // Mobile users who return as Existing customers
    // (same whether they have a saved branch or saved research type)
    11:
      deviceType === 'mobile'
      // && existingUser
      && !location,

    // Mobile users who return as Existing customers
    // (same whether they have a saved branch or saved research type)
    12:
      deviceType === 'mobile'
      // && existingUser
      && location,
  };

  return Object.keys(profileTypes).filter(key => profileTypes[key])[0];
};

/**
 * If on branch page, update phone numbers in the header to match those for the branch
 * @param {HTMLElement} header Header component, can be either desktop or mobile
 */
export const updateInfinityNumbers = (header) => {
  /**
   * Wait for the Infinity Number API to be available
   * @param {Funciton} cb
   */
  const waitForApi = (cb) => {
    pollerLite([
      () => window?._ictt?.push instanceof Function,
      () => window?._ictt?.hasIntegrationsRun,
      () => {
        const numbers = document.querySelectorAll('.branch-details .InfinityNumber');
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

      const branchNumbers = [].map.call(document.querySelectorAll('.branch-details .InfinityNumber'), el => el.innerText.trim());
      const [careNumber, jobNumber] = branchNumbers;

      const headerCareNumber = header.querySelector('[data-number-type="care"]');
      const headerJobNumber = header.querySelector('[data-number-type="job"]');

      // Replace care number
      if (headerCareNumber) replaceNumber(headerCareNumber, careNumber);
      // Replace job number
      if (headerJobNumber) replaceNumber(headerJobNumber, jobNumber);

      // Replace numbers on static header
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
