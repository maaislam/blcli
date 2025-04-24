/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import { events } from '../../../../../lib/utils';
import settings from './shared';
import nav from './nav';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  const bod = document.body;
  const navHTML = nav();
  const navRef = document.querySelector('#header > .wrap > :not(.flex-top) > .flex');
  if (!bod.classList.contains('BI053')) {
    bod.classList.add('BI053');
  }
  setTimeout(() => {
    if (!bod.classList.contains('BI053')) {
      bod.classList.add('BI053');
    }
  }, 500);
  // Check nav doesn't exist first
  if (!bod.querySelector('.BI-test')) {
    navRef.insertAdjacentHTML('afterend', navHTML);

    events.send(ID, `${ID} Active`, `${ID} New navigation added`);

    // Track clicks within the nav
    const navLinks = document.querySelectorAll('.BI-test a');
    if (navLinks.length) {
      Array.from(navLinks).map((link) => link.addEventListener('click', () => events.send(ID, `${ID} Click`, `${ID} User interacted with nav`)));
    }
  }

  if (!bod) {
    console.log('error no body...');
    return false;
  }
  addObserver(bod, () => {
    // Ensure Nav exists on page
    if (!bod.querySelector('.BI-test')) {
      navRef.insertAdjacentHTML('afterend', navHTML);
    }

    if (!bod.classList.contains('BI053')) {
      bod.classList.add('BI053');
    }

    // Re run on a timeout to ensure the class is added
    setTimeout(() => {
      if (!bod.classList.contains('BI053')) {
        bod.classList.add('BI053');
      }
    }, 500);
    
  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: true
    }
  })
};
