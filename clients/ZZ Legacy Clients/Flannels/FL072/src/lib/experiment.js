/**
 * FL072 - Hide pick up locations
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { events } from '../../../../../lib/utils';
import { cacheDom } from '../../../../../lib/cache-dom';

events.analyticsReference = '_gaUAT';

const activate = () => {
  const { ID, VARIATION } = settings;
  setup();

  if (VARIATION == 2) {
    events.send(ID, 'FL072 Control', 'FL072 Control is active');
    return false;
  } else {
    events.send(ID, 'FL072 V1', 'FL072 Variation is active');
  }
  
  
};

export default activate;
