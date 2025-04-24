import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

// LOCAL TRIGGERS
// Comment out for production
const prescriptionPageRegex = /https?:\/\/www\.glassesdirect\.co\.uk\/basket\/personalise\/\d{1}\/prescription\/?(\?.*)?(\#.*)?$/;
if (prescriptionPageRegex.test(window.location.href) && document.cookie.indexOf('GD043-seen=1') === -1) {
  // Activate test when 'Enter New Prescription' is clicked
  pollerLite(['#prescription-tab-header-add'], () => {
    const addPrescriptionCta = document.querySelector('#prescription-tab-header-add');

    // Handler
    const addPrescriptionCtaHandler = () => {
      activate();
      addPrescriptionCta.removeEventListener('click', addPrescriptionCtaHandler);
    };

    // Bind event
    addPrescriptionCta.addEventListener('click', addPrescriptionCtaHandler);
  });
}


// QUBIT TRIGGERS
// Uncomment for production
/*
const prescriptionPageRegex = /https?:\/\/www\.glassesdirect\.co\.uk\/basket\/personalise\/\d{1}\/prescription\/?(\?.*)?(\#.*)?$/;
if (prescriptionPageRegex.test(window.location.href) && document.cookie.indexOf('GD043-seen=1') === -1) {
  // Activate test when 'Enter New Prescription' is clicked
  options.poll(['#prescription-tab-header-add']).then(() => {
    const addPrescriptionCta = document.querySelector('#prescription-tab-header-add');

    // Handler
    const addPrescriptionCtaHandler = () => {
      cb(true);
      addPrescriptionCta.removeEventListener('click', addPrescriptionCtaHandler);
    };

    // Bind event
    addPrescriptionCta.addEventListener('click', addPrescriptionCtaHandler);
  });
}
*/
