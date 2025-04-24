/**
 * MP153 - Clothing Size Filters (MP071 Iteration)
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events, getUrlParameter } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import settings from './settings';
import MP071 from './MP071-content/MP071';

const activate = () => {
  setup();

  // Experiment code
  MP071.init();

  pollerLite(['select.MP071-size_filter'], () => {
    const sizeLabelText = `<div class="MP153-label">
      <p>Filter by size to see what we have in stock that's perfect for your little one!</p>
    </div>`;

    document.querySelector('.MP071-filters').insertAdjacentHTML('beforebegin', sizeLabelText);

    const sizeSelect = document.querySelector('select.MP071-size_filter');
    /**
     * @desc Checks if user has selected size and auto-selects it in the select option
     */
    console.log(getUrlParameter('q'));
    if (sessionStorage.getItem('MP153-sizeSelected') !== null && getUrlParameter('q') !== null && getUrlParameter('q').indexOf('size')){
      const sizeIndex = sessionStorage.getItem('MP153-sizeSelected');
      sizeSelect.selectedIndex = sizeIndex;
      sessionStorage.removeItem('MP153-sizeSelected');
    }
    sizeSelect.addEventListener('change', (e) => {
      const select = e.currentTarget;
      const sizeOptions = select.options;
      const selectedIndex = select.selectedIndex;
      sessionStorage.setItem('MP153-sizeSelected', selectedIndex);
      // GA Event
      events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Size filter option`, { sendOnce: true });
    });
  }); 
};

export default activate;
