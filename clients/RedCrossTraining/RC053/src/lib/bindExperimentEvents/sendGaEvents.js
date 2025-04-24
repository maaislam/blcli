import { pollerLite, observer } from '../../../../../../lib/uc-lib';
import { events } from '../../../../../../lib/utils';
import settings from '../settings';

export default () => {
  let expID = '';
  if (settings.VARIATION === '1') {
    expID = 'RC053';
  } else if (settings.VARIATION) {
    expID = 'RC026';
  }

  pollerLite(['.RC022_courseType_wrapper.row span.RC022_workplace_option'], () => {
    const workplaceOption = document.querySelector('.RC022_courseType_wrapper.row span.RC022_workplace_option');
    workplaceOption.addEventListener('click', () => {
      events.send(settings.ID, `Variation ${settings.VARIATION}`, `${expID} - Workplace course selected`, { sendOnce: true });
    });
    const publicOption = document.querySelector('.RC022_courseType_wrapper.row span.RC022_public_option');
    publicOption.addEventListener('click', () => {
      events.send(settings.ID, `Variation ${settings.VARIATION}`, `${expID} - Public course selected`, { sendOnce: true });
    });
  });
};