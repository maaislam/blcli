/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import stockFilter from './components/stockFilter';
import { observeDOM } from './helpers/utils';
import elementTypes from './elementTypes';
import TestReporting from '../boots_tracking/TestReporting';

const { ID, VARIATION } = shared;

const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

const toggleStatusHTML = `<span class="${ID}__toggleStatusText"></span>`;

const extractNumber = (str) => {
  const match = str.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
};
const totalItemsUpdate = () => {
  if (window.location.pathname === '/sitesearch') {
    const totalItemsElement = document.querySelector('.oct-listers-hits__top h1');
    const totalCount = totalItemsElement ? extractNumber(totalItemsElement.textContent) : '';
    const stockItemsElement = document.querySelector(`.${ID}__totalItems`);

    if (totalCount && stockItemsElement) {
      stockItemsElement.textContent = `${totalCount} results`;
    }
  }
};

const controlToggleHandler = (event) => {
  if (event.target.checked) {
    fireBootsEvent(`User turned on the toggle`, true, eventTypes.experience_action, {
      action: actionTypes.open,
      action_detail: `User turned on the toggle`,
    });
  } else {
    fireBootsEvent(`User turned off the toggle`, true, eventTypes.experience_action, {
      action: actionTypes.close,
      action_detail: `User turned off the toggle`,
    });
  }
};

const changeHandler = (event) => {
  if (event.target.checked) {
    // console.log('show only in stock items', event.target.checked);
    fireBootsEvent(`User turned on the toggle`, true, eventTypes.experience_action, {
      action: actionTypes.open,
      action_detail: `User turned on the toggle`,
    });
  } else {
    // console.log('show all items', event.target.checked);
    fireBootsEvent(`User turned off the toggle`, true, eventTypes.experience_action, {
      action: actionTypes.close,
      action_detail: `User turned off the toggle`,
    });
  }
  document.body.classList.add(`${ID}__stocksItem`);
  const mainWrapper = document.querySelector('.oct-listers-facet-sticky-ribbon.show');
  const filterElement = mainWrapper.querySelector('.oct-listers-facet-burger-menu [data-testid="button"]');
  if (filterElement) {
    filterElement.click();
  }
  pollerLite(
    ['.oct-listers-facet-sticky-ribbon.show.menu-open .oct-listers-facet-menu__backdrop', '.oct-listers-facets__item--inStock'],
    () => {
      const backDropElement = document.querySelector(
        '.oct-listers-facet-sticky-ribbon.show.menu-open .oct-listers-facet-menu__backdrop'
      );
      const inStockElement = mainWrapper.querySelector('.oct-listers-facets__item--inStock label');
      if (inStockElement) inStockElement.click();
      if (backDropElement) backDropElement.click();
      document.body.classList.remove(`${ID}__stocksItem`);
    }
  );
};

const applyToggleEvent = () => {
  pollerLite(['.oct-toggle__checkbox[name="inStock"]'], () => {
    const controlToggleElem = document.querySelector('.oct-toggle__checkbox[name="inStock"]');

    controlToggleElem.removeEventListener('change', controlToggleHandler);
    controlToggleElem.addEventListener('change', controlToggleHandler);
  });
};

const init = () => {
  //check the toggle status from url search param
  const toggleLabel = document.querySelector('.oct-listers-facets__item--inStock .toggle-facet_container_text');
  const toggleElem = document.querySelector('.toggle-facet_container .oct-toggle__slider');

  fireBootsEvent(`User${VARIATION === 'control' ? ' would have' : ''} viewed stock toggle`, true, eventTypes.experience_render, {
    render_element: elementTypes.Filters,
    render_detail: `User${VARIATION === 'control' ? ' would have' : ''} viewed stock toggle`,
  });

  //desktop
  if (!isMobile() && toggleLabel && VARIATION === '2') {
    toggleLabel.textContent = 'Only show items in stock';
    toggleElem.insertAdjacentHTML('beforeend', toggleStatusHTML)

    return;
  }

  //re render checkbox - mobile
  const targetPoint = document.querySelector('#octListers .oct-listers-facet-sticky-ribbon');
  const totalItemsElement = document.querySelector('.oct-listers-hits__top h1');
  const totalCount = totalItemsElement ? extractNumber(totalItemsElement.textContent) : '';
  if (!document.querySelector(`.${ID}__toggle-facet_container`)) {
    targetPoint.insertAdjacentHTML('beforebegin', stockFilter(ID, totalCount, VARIATION));
  }

  const checkbox = document.querySelector(`.${ID}__oct-toggle__checkbox`);

  checkbox.removeEventListener('change', changeHandler);
  checkbox.addEventListener('change', changeHandler);
};

export default () => {
  const testID = `${ID}|Toggle Iteration`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;

  const reporting = new TestReporting(testID, testVariant); // sends experience id event to datalayer
  reporting.register();

  bootsEvents.initiate = true;
  bootsEvents.methods = ['datalayer'];
  bootsEvents.property = 'G-C3KVJJE2RH';
  bootsEvents.testID = testIDAndVariant;

  setup();

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  if (VARIATION === 'control') {
    if (isMobile()) {
      document.body.addEventListener('click', (e) => {
        const { target } = e;
        if (target.closest('.oct-listers__filter-trigger')) {
          applyToggleEvent();

          fireBootsEvent(
            `User${VARIATION === 'control' ? ' would have' : ''} viewed stock toggle`,
            true,
            eventTypes.experience_render,
            {
              render_element: elementTypes.Filters,
              render_detail: `User${VARIATION === 'control' ? ' would have' : ''} viewed stock toggle`,
            }
          );
        }
      });
    } else {
      applyToggleEvent();

      fireBootsEvent(
        `User${VARIATION === 'control' ? ' would have' : ''} viewed stock toggle`,
        true,
        eventTypes.experience_render,
        {
          render_element: elementTypes.Filters,
          render_detail: `User${VARIATION === 'control' ? ' would have' : ''} viewed stock toggle`,
        }
      );
    }

    return;
  }

  init();
  observeDOM('.oct-listers-hits__top h1', totalItemsUpdate);
};
