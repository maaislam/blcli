import run from './experiment';
import { poller } from '../../../../lib/uc-lib';

// poller([
//   '#dnn_ctr88149_Launch_registerLogin_Header > h1',
//   '#dnn_ctr88149_Launch_registerLogin_loginButton > .InputLabelGroup > .field',
//   '#dnn_ctr88149_Launch_registerLogin_loginButton > .ForgotPass',
//   '.existingCustomer .loginContainer .InputLabelGroup .field.SignLogIn2:last-child',
//   '#txtGuestCustomerEmailAddress',
//   '#dnn_ctr88149_Launch_registerLogin_txtExistingCustomerEmailAddress',
//   '#dnn_ctr88149_Launch_rfvEmailAddress',
//   '#dnn_ctr88149_Launch_registerLogin_divLoginErrorMessage',
//   '#dnn_ctr88149_Launch_registerLogin_btnRegisteredCustomer',
//   '#dnn_ctr88149_Launch_btnGuestCustomer',
//   '#dnn_ctr88149_Launch_registerLogin_lblLoginErrorMessage', () => {
//     let checkjQuery = false;
//     if (window.jQuery) {
//       checkjQuery = true;
//     }
//     return checkjQuery;
//   },
// ], run);

poller([
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
