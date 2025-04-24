/**
 * SDHidePopup 
 * Dev: JT
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { events } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';


export default () => {
  setup();

  const { VARIATION } = settings;
  const ID = 'SD009';

  if (VARIATION == 2) {
    events.send(ID, 'SD009 Control', 'SD009 Control is active');

    const advert = document.getElementById('advertPopup');
    if (advert && advert.classList.contains('in')) {
      events.send(ID, 'SD009 Popup Seen', 'SD009 the homepage popup was seen');
    }
    return false;
  } else {
    events.send(ID, 'SD009 Variation', 'SD009 Variation 1 is active');
  }

};
