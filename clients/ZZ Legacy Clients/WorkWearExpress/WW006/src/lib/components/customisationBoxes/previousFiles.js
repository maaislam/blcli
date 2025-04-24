import settings from '../../settings';
import { events } from '../../../../../../../lib/utils';

export default () => {
  const previousUploadedLogos = document.querySelectorAll('#existing_personalisation label[for^="personalisation_"]:not([for="personalisation_new"])');
  if (previousUploadedLogos) {
    for (let index = 0; index < previousUploadedLogos.length; index += 1) {
      const element = previousUploadedLogos[index];

      element.addEventListener('click', (e) => {
        [].forEach.call(document.querySelectorAll(`.${settings.ID}-existing_logos label`), (item) => {
          item.classList.remove(`${settings.ID}-prev-logo_active`);
        });
        if (element.querySelector('input').checked) {
          e.currentTarget.classList.add(`${settings.ID}-prev-logo_active`);
          events.send('WW006', 'Click', 'Use existing logo', { sendOnce: true });
        } else {
          e.currentTarget.classList.remove(`${settings.ID}-prev-logo_active`);
        }
      });
    }
  }
};
