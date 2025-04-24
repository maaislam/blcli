import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import TestReporting from '../boots_tracking/TestReporting';
import { elementIsInView } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const toggleStatusHTML = `<span class="${ID}__toggleStatusText"></span>`;

const init = () => {
  const filterByElem = document.querySelector('.oct-listers__filter-by');
  const toggleContainer = document.querySelector('.toggle-facet_container');
  const toggleText = toggleContainer.querySelector('.toggle-facet_container_text');
  const toggleLabel = toggleContainer.querySelector('.oct-toggle');
  const toggleElem = toggleContainer.querySelector('.oct-toggle__slider');

  filterByElem?.parentElement.classList.add(`${ID}__filterByContainer`);

  toggleContainer.classList.add(`${ID}__toggleContainer`);
  toggleText.classList.add(`${ID}__toggleText`);
  toggleElem.classList.add(`${ID}__toggle`);
  toggleLabel.classList.add(`${ID}__toggleLabel`);

  if (VARIATION === '1') {
    toggleText.textContent = 'Only show items in stock';
  } else if (VARIATION === '2') {
    toggleElem.insertAdjacentHTML('beforeend', toggleStatusHTML);
  } else if (VARIATION === '3') {
    toggleText.textContent = 'Only show items in stock';
    toggleElem.insertAdjacentHTML('beforeend', toggleStatusHTML);
  }
};

export default () => {
  const testID = `${ID}|OOS Toggle Messaging`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;
  const reporting = new TestReporting(testID, testVariant); // sends experience id event to datalayer

  bootsEvents.initiate = true;
  bootsEvents.methods = ["datalayer"];
  bootsEvents.property = "G-C3KVJJE2RH";
  bootsEvents.testID = testIDAndVariant;

  setup();

  reporting.register(); // sends experience load event to datalayer
  // fireBootsEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  const toggleElement = document.querySelector('.toggle-facet_container_text');
  if (elementIsInView(toggleElement)) {
    const plpViewEventLabel = `User ${VARIATION === 'control' ? 'would have' : 'has'} seen`;
    fireBootsEvent(`${plpViewEventLabel}`, true, eventTypes.experience_render, {
      action: actionTypes.view,
      action_detail: `${plpViewEventLabel}`,
    });
  }

  // toggle event
  const toggleInputElem = document.querySelector(".oct-toggle__checkbox");
  toggleInputElem.addEventListener("change", (e) => {
    const toggleState = e.target.checked ? "on" : "off";
    const eventLabel = `User interacts with toggle - ${toggleState}`;

    // console.log(`toggleInputElem change event - ${eventLabel}`);

    fireBootsEvent(eventLabel, true, eventTypes.experience_action, {
      action: actionTypes.click_cta,
      action_detail: eventLabel,
    });
  });

  if (VARIATION == 'control') {
    return;
  }

  init();
};
