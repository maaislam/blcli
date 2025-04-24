/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import shared from '../../../../../core-files/shared';
import { setup, fireEvent } from '../../../../../core-files/services';

// Components
import { Variation1 } from './components/Variation 1';

// Utils
import { observerMutation } from '../../../../../lib/utils/observer';

// Data

const checkPostCodeAgainstDarkStores = () => {
  let dontShowChanges = false;
  const enteredPostCode = document
    .querySelector('[data-test-id="address-description"]')
    .innerHTML.split(',')[0]
    .split(' ')[0];
  const darkStorePostCodes = [
    'B63',
    'B64',
    'B65',
    'B69',
    'DY1',
    'DY2',
    'DY3',
    'DY4',
    'DY5',
    'DY6',
    'DY7',
    'DY8',
    'WV14',
    'WV2',
    'WV3',
    'WV4',
    'WV5',
  ];
  darkStorePostCodes.forEach((postcode) => {
    if (enteredPostCode === postcode) {
      dontShowChanges = true;
    }
  });
  return dontShowChanges;
};

const runChanges = () => {
  if (document.querySelector('[data-test-id="no-branch-selected"]')) {
    Variation1();
  }
  if (document.querySelector('[data-test-id="address-description"]')) {
    const showChanges = checkPostCodeAgainstDarkStores();

    if (!showChanges) {
      Variation1();
    }
  }
  // // -----------------------------
  // // Tracking
  // // -----------------------------

  const viewProductButtons = document.querySelectorAll('#viewProductButton');
  viewProductButtons.forEach((button) => {
    button.addEventListener('click', () => {
      fireEvent('View Product button clicked');
    });
  });
};

/* /**
 * Fire twice, because it's always checking, so it'll run "runChanges", once finished variation1, it'd run again, then fail because attributes are already changed
 */
const stepOne = () => {
  debugger;
  if (
    document.querySelector(
      '[data-test-id="collection-availability-message"] span',
    )?.innerHTML === 'Loading...'
  ) {
    observerMutation(
      '[data-test-id="collection-availability-message"]',
      runChanges,
      undefined,
      undefined,
      {
        attributes: false,
        childList: true,
        characterData: true,
        subtree: true,
      },
    );
  } else {
    runChanges();
  }
};

const stepTwo = () => {
  debugger;
  const appContainer = document.querySelector('#app-container');
  let oldHref = document.location.href;
  const observer = new MutationObserver((mutations) => {
    // Causes a run on stepOne because it's checking for all mutations and when the product lists update with the new message it causes a mutation
    mutations.forEach((mutation) => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href;

        document.body.classList.remove(`${shared.ID}`);

        setTimeout(() => {
          stepOne();
        }, 2000);
      }
    });
  });
  const config = {
    childList: true,
    subtree: true,
  };

  observer.observe(appContainer, config);
};

const stepThree = () => {
  if (document.querySelector('[data-test-id="no-branch-selected"]')) {
    observerMutation(
      '[data-test-id="description-wrapper"]',
      stepOne(),
      undefined,
      undefined,
      {
        subtree: true,
        childList: true,
        characterData: true,
      },
    );
  }
};

const stepThree2 = () => {
  debugger;
  let postCode = false;
  if (window.localStorage.getItem('preselectedDeliveryAddress')) {
    postCode = !!JSON.parse(
      window.localStorage.getItem('preselectedDeliveryAddress'),
    ).postalCode;
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      debugger;
      if (
        mutation.removedNodes[0]
        !== '<div data-test-id="no-branch-selected" class="DeliveryAndBranchSelectorsBlock__NoBranchSelected-sc-1xzkp8t-7 jnzIKw">Please enter your delivery postcode...</div>'
      ) {
        if (postCode) {
          stepOne();
        }
      }
    });
  });

  observer.observe(
    document.querySelector('[data-test-id="branch-selector-wr"]'),
    {
      characterDataOldValue: true,
      subtree: true,
      childList: true,
      characterData: true,
    },
  );
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION === 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------

  // Step One, load code on page when delivery messages are available
  stepOne();
  // Step Two, listens for page change and reloads function
  stepTwo();
  // Step Three, listens for postcode and reloads function
  stepThree2();
};
