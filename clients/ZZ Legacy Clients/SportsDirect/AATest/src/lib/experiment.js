/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();

  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'AATest Control', 'Control is active');
    return false;
  }

  events.send(settings.ID, 'AATest Active', 'Test is active');
  return false;

  // Experiment code
};

export default activate;
