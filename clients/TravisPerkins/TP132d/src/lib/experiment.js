/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup, addTracking, addBlurPoints, addImageZoom } from './services';
import settings from './settings';
import { cacheDom } from './../../../../../lib/cache-dom';

const activate = () => {

  const plpItems = cacheDom.getAll('#products .row .prod');

  setup();
  for (let i = 0; plpItems.length > i; i += 1) {
    addBlurPoints(plpItems[i]);
  }
  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'TP132d Variation 2', 'Variation 2 is active');
    addImageZoom();
  }
  addTracking();
};

export default activate;


