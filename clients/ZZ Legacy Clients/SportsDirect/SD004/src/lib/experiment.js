/**
 * SD004 - Provide Delivery Context (2)
 * Dev: JT
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';
import { FL060 } from './FL060/index';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();

  const { VARIATION, ID } = settings;

  // Control = V2
  if (VARIATION == '2') {
    events.send(ID, 'Control');
    return false;
  } else {
    events.send(ID, `Variation ${VARIATION}`);
  }

  // Run FL060
  FL060();

};

export default activate;
