/**
 * SD006 - Change Continue Button
 * Dev: JT
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();

  const { VARIATION, ID } = settings;

  // Control = V2
  if (settings.VARIATION == '2') {
    events.send(ID, 'Control');
    return false;
  } else {
    events.send(ID, `Variation ${VARIATION}`);
  }

  // Change Continue Shopping to 'Back to Site'
  const btn = document.querySelector('.CheckWrap .ExitLinks .ContText a');
  if (btn) {
    btn.textContent = 'Back to Site';
  }

};

export default activate;
