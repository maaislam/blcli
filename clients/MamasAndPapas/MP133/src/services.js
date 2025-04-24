import { fullStory, events } from '../../../../lib/utils';
import settings from './settings';
import priceRanges from './lib/price_ranges';

/**
 * setup
 * @desc Performs standard experiment setup (FullStory tagging, GA event and body class)
 */
function setup() {
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
  events.send(settings.ID, 'Activated', `Variation ${settings.VARIATION}`);
  document.body.classList.add(settings.ID);
  if (settings.VARIATION > 1) {
    document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
  }
}
/*eslint-disable */
function buildFilterUrl(min, max) {
  let priceFilterUrl = 'https://www.mamasandpapas.com/en-gb/c/pushchairs-prams?q=%3AtopRated';

  const available = priceRanges;
  let v1;
  let v2;
  if (min !== '£1000+' && max !== '£1000+') {
    v1 = parseInt(min.replace('£', ''));
    v2 = parseInt(max.replace('£', ''));
  } else {
    if (min === '£1000+') {
      v1 = 1500;
      v2 = parseInt(max.replace('£', ''));
    } else if (max === '£1000+') {
      v1 = parseInt(min.replace('£', ''));
      v2 = 1500;
    }
  }

  const itemsToUse = available.filter((item) => {
    if(item.min === v1 || item.max === v2 || (item.min < v2 && item.max < v2 && item.min > v1 && item.max > v1)) {
      priceFilterUrl += item.component;
      return true;
    }
  });
  const minMax = {min: v1, max: v2};
  sessionStorage.setItem('MP133_filtered-by-price-range', JSON.stringify(minMax));
  window.location.href = priceFilterUrl;
}
/* eslint-enable */

export { setup, buildFilterUrl }; // eslint-disable-line
