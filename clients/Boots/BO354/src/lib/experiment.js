/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { pollerLite, throttle } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import elementTypes from './elementTypes';
import TestReporting from '../boots_tracking/TestReporting';

import filterSearchElem from './components/filterSearch';
import filterSearchHandler from './handlers/filterSearchHandlers';
import { applySelectedClass, onUrlChange, safeToFireEvent } from './helpers/utils';

const { ID, VARIATION } = shared;

const testID = `${ID}|Searchable filters`; // same as triggers.js
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const testIDAndVariant = `${testID}|${testVariant}`;

let expLoaded = false;

const isMobile = window.innerWidth < 768;

const init = () => {
  const attachElem = document.querySelector('.oct-listers-facets__item--inStock');

  attachElem.insertAdjacentHTML('beforebegin', filterSearchElem(ID));

  if (!expLoaded && safeToFireEvent()) {
    fireBootsEvent(
      `User ${VARIATION === 'control' ? 'would have' : ''} viewed new filter search`,
      true,
      eventTypes.experience_render,
      {
        render_element: elementTypes.Filters,
        render_detail: `User ${VARIATION === 'control' ? 'would have' : ''} viewed new filter search`,
      }
    );
  }

  expLoaded = true;

  const throttledSearch = throttle(filterSearchHandler, 500);

  document.querySelector('.search-input').addEventListener('input', throttledSearch);
  sessionStorage.setItem('previousPathname', window.location.pathname);

  if (sessionStorage.getItem('lastFilterSearch')) {
    document.querySelector('.search-input').value = sessionStorage.getItem('lastFilterSearch');

    //trigger change
    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    document.querySelector('.search-input').dispatchEvent(event);
    sessionStorage.removeItem('lastFilterSearch');
  }
};

export default () => {
  setup();

  bootsEvents.initiate = true;
  bootsEvents.methods = ['datalayer'];
  bootsEvents.property = 'G-C3KVJJE2RH';
  bootsEvents.testID = testIDAndVariant;
  if (safeToFireEvent()) {
    const reporting = new TestReporting(testID, testVariant);
    reporting.register();
  }

  // fireBootsEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  document.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('.oct-listers__filter-trigger')) {
      pollerLite(['.oct-listers-facets__item--inStock'], () => {
        setTimeout(init, 500);
      });
    } else if (target.closest('.oct-listers__goBack')) {
      pollerLite(['.oct-listers-facets__item--inStock'], () => {
        setTimeout(init, 500);
      });
    } else if (target.closest('.oct-listers-facets__item')) {
      const filterName = target.closest('.oct-listers-facets__item').getAttribute('data-filter-name');

      if (filterName) {
        fireBootsEvent(`${filterName} -Normal Filter Clicked`, true, eventTypes.experience_action, {
          action: actionTypes.click_cta,
          action_detail: `${filterName} -Normal Filter Clicked`,
        });
      }
    }
  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  if (isMobile) {
    return;
  }
  init();

  onUrlChange(() => {
    applySelectedClass();
  });
};
