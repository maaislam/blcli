/**
 * SD005 - Delivery Address Redesign
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();

  const { VARIATION, ID } = settings;
  // Control = V2
  if (VARIATION == '2') {
    events.send(ID, 'Control');
    return false;
  }

  events.send(ID, `Variation ${VARIATION}`);

  // Variation 1:
  // Only show the automatic address option. Re word 'What's your Post Code?'

  // Variation 2:
  // Only show the manual address input.

};

export default activate;
