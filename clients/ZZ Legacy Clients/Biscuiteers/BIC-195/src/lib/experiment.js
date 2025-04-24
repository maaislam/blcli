/**
 * BIC-195 - PDP Personalisation Options - mobile only
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver, destroyIntervals, destroyPollers, killAllEventListeners, killObservers } from './winstack';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const addFilterTracking = () => {

  addPoller(['.icon-checkbox'], () => {
    setTimeout(() => {
      let allCheckBoxes = document.querySelectorAll('label.checkbox');

      [].slice.call(allCheckBoxes).forEach((checkbox) => {

        checkbox.classList.add(`${ID}-option`); 

        addEventListener(checkbox, 'click', (e) => {
          let filterName = e.currentTarget.querySelector('span[ng-bind="::option.label"]').innerText;
          let filterParent = e.currentTarget.closest('filter-attribute-option').querySelector('span[ng-bind="::vm.filter.attribute.data.label"]').innerText;
          let addedRemoved = e.currentTarget.querySelector('i').classList.contains('icon-checkbox-checked') ? 'added' : 'removed';
          let filterUsedMessage = `The filter: [${filterName}] was clicked from the list: [${filterParent}] and the filter was [${addedRemoved}]`;
          logMessage(filterUsedMessage);
          fireEvent(filterUsedMessage);

        });

      });

    }, 500);

    

  });

  addPoller(['action[ng-click="vm.listing.resetFilters()"]'], () => {

    let clearButton = document.querySelector('action[ng-click="vm.listing.resetFilters()"]');
    addEventListener(clearButton, 'click', (e) => {

      let clearButtonMessage = `The filters were cleared`;
      logMessage(clearButtonMessage);
      fireEvent(clearButtonMessage);

    });

  })

  

}

export default () => {
  

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');  

  addFilterTracking();

  let firstRun = true;

  let currHrefPartial = window.location.href.substring(0, window.location.href.indexOf('#'));

  const wrap = document.body;
  addObserver(wrap, () => {
    logMessage(`${ID} observer event triggered`);
    let obsWindowPartial = window.location.href.substring(0, window.location.href.indexOf('#'));

    if(currHrefPartial !== obsWindowPartial && document.querySelector('local-category-view') && firstRun == false) {

      destroyPollers();
      destroyIntervals();
      killAllEventListeners();
      killObservers();
      addFilterTracking();
      firstRun = false;
    } 
  }, {
    config: {
    attributes: true,
    childList: true,
    subtree: false,
    }
  })

  

  
};
