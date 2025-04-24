import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.existingCustomer .loginContainer .field.SignLogIn2 input#dnn_ctr88149_Launch_registerLogin_txtExistingCustomerEmailAddress',
  '.newCustomer .innerBorder .loginContainer input#txtGuestCustomerEmailAddress',
  '#dnn_ctr88149_Launch_registerLogin_divLoginErrorMessage',
  // '.FL015-account-options',
], activate);
