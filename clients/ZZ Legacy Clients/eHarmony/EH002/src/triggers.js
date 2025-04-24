import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.user-login',
  '.registrationForm__submit___311-o',
  '.faith',
  '#mobile-hero',
  '#social-registration',
  '#seo',
], Experiment.init);
