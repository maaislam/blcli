/**
 * SG085 - Jewellery PLP Metal quicklinks
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.ernestjones.co.uk/webstore/l/engagement-rings/?icid=ej-tn-engagement-all
 * https://www.ernestjones.co.uk/webstore/l/engagement-rings/
 */
import { setup, checkPageToRunExperiment, getSiteFromHostname, getMostPopularMetalFilters, generateFiltersContainer } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();
    const metalFilterOptions = document.querySelectorAll('fieldset#refinement-material .styled-checkbox.filters-panel__refinement-selector a');
    let availableFilters = [];
    let preSelectedFilters = [];
    getMostPopularMetalFilters(metalFilterOptions, availableFilters, preSelectedFilters);

    let runExperiment = checkPageToRunExperiment();

    if (availableFilters.length > 0 && runExperiment) {
      generateFiltersContainer(availableFilters, preSelectedFilters);

      var array = document.querySelectorAll('.SG085-metalOptions li');
      if (array){
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        element.addEventListener('click', () => {
          events.send('SG085', 'Clicked Link', 'Clicked: ' + index + '')
        })  
      }
    }
    }

    /**
     * @desc When URL changes, e.g. filter applied,
     * re-run experiment
     */
    var oldHref = document.location.href;
    var bodyList = document.querySelector("body");
    var observerUrl = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                      activate();
                      // window.location.reload();
                  }
            });
        });
    var config = {
            childList: true,
            subtree: true
        };
    observerUrl.observe(bodyList, config);

  }
};

export default activate;