import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';
// import flicker from './flickerprevention';


// flicker();
pollerLite([
  '#prescription-login-form', // Login form - ensures user is logged out
  '#prescription-tab-header-add', // enter new prescription button
  '#prescription-tab-add > .form-heading', // Enter new prescription form header
  '#prescription-tab-header-later', // Send prescription later button
  '#prescription-tab-header-saved', // Saved prescrpition button
  '.btn-back', // Back button
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
  // Keep this variation on 1st prescription
  () => {
    let checkPrescription1 = false;
    if (window.location.pathname.indexOf('/personalise/1/prescription/') > 1) {
      checkPrescription1 = true;
    }
    return checkPrescription1;
  },
], run);
