import { events } from '../../../../lib/utils';
import settings from './settings';
import { buildFilterUrl } from './services';
import { observer } from '../../../../lib/uc-lib';

/**
 * setup
 * @desc Performs standard experiment setup (FullStory tagging, GA event and body class)
 */
function clickPriceRangeFilterBtn() {
  const filterBtn = document.querySelector('.MP133-ctaBtn');
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      const minPrice = document.querySelector('#skip-value-lower').innerText;
      const maxPrice = document.querySelector('#skip-value-upper').innerText;
      // GA Event
      events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - See options: ${minPrice} - ${maxPrice}`, { sendOnce: true });
      buildFilterUrl(minPrice, maxPrice);
    });
  }
}

function movedPriceSlider() {
  observer.connect([document.querySelector('.noUi-handle.noUi-handle-lower'), document.querySelector('.noUi-handle.noUi-handle-upper')], () => {
    // GA Event
    events.send(settings.ID, `Variation ${settings.VARIATION}`, 'Moved - Price Slider', { sendOnce: true });
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
    },
  });
}

export { clickPriceRangeFilterBtn, movedPriceSlider }; // eslint-disable-line
