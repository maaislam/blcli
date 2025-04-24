import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';
//CRM
import CRM from './components/crm';
import crmHandler from './handlers/crmHandler';
import { getCookie } from './helpers/utils';


const { ID, VARIATION } = shared;

const startExperiment = () => {
  //testing on manage booking page
  if (getCookie(`${ID}-show`) !== 'true') {
    pollerLite(['.main .leisure-stayerdetails-title', () => typeof window.globalDataLayer === 'object'], () => {
      const target = document.querySelector('.main .leisure-stayerdetails-title');

      const crmHtml = CRM(ID);
      target.insertAdjacentHTML('afterend', crmHtml);
      crmHandler(ID);

    });
  }
};

export default () => {
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-MELVDQ5FNP';

  setup();

  logMessage(ID + " Variation: " + VARIATION);

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  startExperiment();
};
