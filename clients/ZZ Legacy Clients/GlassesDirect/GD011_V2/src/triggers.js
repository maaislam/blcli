import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';
// import flicker from './flickerprevention';


// flicker();
pollerLite([
  '#prescription-tab-header-saved.personalise-choice.prescription.option-current', // Found only on logged out with saved prescription
  '#prescription-tab-saved > .form-heading', // Saved presriptions heading
  '#prescription-tab-saved .prescription-table', // Make sure at least one saved prescription exists
  '.btn-back', // Back button
  '#prescription-tab-header-later', // Prescription later button
  '#prescription-tab-header-add', // Prescription add button
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
  // Keep this variation on 2nd prescription
  () => {
    let checkPrescription2 = false;
    if (window.location.pathname.indexOf('/personalise/2/prescription/') > 1) {
      checkPrescription2 = true;
    }
    return checkPrescription2;
  },
], run);
