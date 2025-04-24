/**
 * TP144 - Price per metre squared on paving PDPs
 * Devices: Desktop, Tablet, Mobile
 * @author User Conversion
 */
import { setup } from './services';
import { getClosest, events } from '../../../../../lib/utils';
import PricePerSqm from './components/PricePerSqm/PricePerSqm';
import settings from './settings';

const activate = () => {
  setup();
  const { ID } = settings;

  // Create component
  const pricePerSqm = new PricePerSqm();
  events.send(ID, 'Seen', 'Price Per Sq M Seen');

  // Hide existing price per sq metre if it exists
  const priceLabelEls = document.querySelectorAll('.price_info_holder .price_UOM');
  const perSqmLabel = [].filter.call(priceLabelEls, el => el.innerText.replace(/\s/g, ' ') === 'per square metre')[0];
  if (perSqmLabel) {
    const container = getClosest(perSqmLabel, '.productEQPrice');
    container.style.display = 'none';
  }
};

export default activate;
