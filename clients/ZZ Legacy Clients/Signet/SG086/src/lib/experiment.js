/**
 * SG086 - Watch PLP Brand quicklinks
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.ernestjones.co.uk/webstore/l/mens-watches
 */
import { setup, getSiteFromHostname, checkPageToRunExperiment, getMostPopularBrandFilters, generateFiltersContainer } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    let runExperiment = checkPageToRunExperiment();
    
    const brandFilterOptions = document.querySelectorAll('fieldset#refinement-brand .styled-checkbox.filters-panel__refinement-selector a');
    let availableFilters = [];
    let preSelectedFilters = [];
    getMostPopularBrandFilters(brandFilterOptions, availableFilters, preSelectedFilters);
    // const swiperScript = `<script type="module" class="SG086-test">
    // import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'</script>`;
    // document.querySelector('head').insertAdjacentHTML('beforeend', swiperScript);

    if (availableFilters.length > 0 && runExperiment) {
      generateFiltersContainer(availableFilters, preSelectedFilters);
      var array = document.querySelectorAll('.SG086-brandOptions li');
      if (array){
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        element.addEventListener('click', ()=>{
          events.send('SG086', 'Clicked Brand Bar', 'Clicked: ' + index + '');
        })
        
      }
    }
    }
    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
