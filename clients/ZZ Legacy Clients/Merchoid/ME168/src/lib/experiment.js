/**
 * ME168 - Size Guide
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import sizeGuide from './sizeGuide';
import buildModule from './module';
import { events } from '../../../../../lib/utils';

const activate = () => {
  if (document.getElementById('pa_size').querySelector('option[value="l"]').textContent.indexOf('39-40"') > -1 || document.getElementById('pa_size').querySelector('option[value="l"]').textContent.indexOf('40-42"') > -1) {
    setup();
    // Experiment code
    buildModule.render.addHTML();
    // Add controls
    buildModule.toggle.addEvents();
    // Open size guide
    buildModule.toggle.openGuide();
    // Set gender if previously chosen
    buildModule.toggle.setGender();
    events.send('ME168', 'View', 'ME168 activated - Variation');
  }
};

export default activate;
