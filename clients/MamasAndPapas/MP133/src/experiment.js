/**
 * MP133 - Price filter
 * @author Sarah Doghri - User Conversion
 */
import { events } from '../../../../lib/utils';
import { setup } from './services';
import { clickPriceRangeFilterBtn, movedPriceSlider } from './bindExperimentEvents';
import { pollerLite } from '../../../../lib/uc-lib';
import settings from './settings';
import rangeSlider from './lib/nouislider';

const activate = () => {
  setup();
  rangeSlider();
  // Experiment code
  const sliderContainer = `<div class='MP133-rangeSlider__wrapper'>
    <div class="MP133-filterLabel">Filter by price:</div>
    <div id='skipstep'></div>
    <div class='MP133-sliderValues'>
      <span class='example-val' id='skip-value-lower'></span>
      <span class='example-val' id='skip-value-upper'></span>
    </div>
    <div class='MP133-rangeSlider__button'>
      <div class='MP133-ctaBtn'>Apply Filter</div>
    </div>
  </div>`;
  document.querySelector('.productFilter.js-toggle').insertAdjacentHTML('afterbegin', sliderContainer);

  // Check if price filter was previously selected
  const storageItem = sessionStorage.getItem('MP133_filtered-by-price-range');
  /*eslint-disable */
  let min = 100;
  let max = 1500;
  if (storageItem) {
    const minMax = JSON.parse(storageItem);
    min = minMax.min;
    max = minMax.max;
  }
  
  let skipSlider = document.getElementById('skipstep');

  noUiSlider.create(skipSlider, {
    range: {
      'min': 100,
      '10%': 200,
      '20%': 300,
      '30%': 400,
      '40%': 500,
      '50%': 600,
      '60%': 700,
      // Skip 800 and 900
      '90%': 1000,
      'max': 1500
    },
    snap: true,
    start: [min, max]
  });
  let skipValues = [
    document.getElementById('skip-value-lower'),
    document.getElementById('skip-value-upper')
  ];
  skipSlider.noUiSlider.on('update', function (values, handle) {
    if (values[handle] === '1500.00') {
      skipValues[handle].innerHTML = `£1000+`;
    } else {
      skipValues[handle].innerHTML = `£${values[handle].replace('.00', '')}`;
    }
  });
  /* eslint-enable */
  pollerLite(['.noUi-handle', '.MP133-ctaBtn'], () => {
    movedPriceSlider();
    clickPriceRangeFilterBtn();
  });
};

export default activate;
