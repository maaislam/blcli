import activate from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.email-sign-up-overlay',
  '.email-sign-up-popup__submit.button',
  '#js-emailSignUpEmail',
  '.page-overlay',
  '#js-cancel',
], activate);
