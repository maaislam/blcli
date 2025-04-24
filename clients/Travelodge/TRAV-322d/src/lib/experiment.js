/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';
//CRM
import CRM from './components/crm';
import crmHandler from './handlers/crmHandler';


const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  // Add your experiment code here

  //testing on booking page
  pollerLite(['#main .bookingDetails .eachStay .rowRoom .dlTotals', () => typeof window.globalDataLayer === 'object'], () => {
    console.log('booking page found');
    const target = document.querySelector('.main .chForm .no-print');

    const crmHtml = CRM(ID);
    target.insertAdjacentHTML('afterend', crmHtml);
    crmHandler(ID);

  });
};

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  startExperiment();
};
