import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

window.addEventListener('load', () => {
  pollerLite([
    '.registrationForm__form___1UO-_',
    '.registrationForm__countrySelect___1ALbG',
    '#form-area',
    '#social-registration',
    '.registrationForm__zipInput___3N-AB',
  ], Experiment.init);
});
