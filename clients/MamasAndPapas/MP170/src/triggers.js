import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.guest-checkout .userLogin',
  '.checkout__ordersummary',
  '.checkout__heading__button',
  '#globalMessages',
  '#loginForm .checkout__login',
  '.formGuestCheckout .checkout__footer button',
  '.checkout__guest__footer .form_field_error-message.forget-password.mb-0 + p',
  'h3.form_field_error-message.forget-password a',
  'input#j_password',
], activate);
