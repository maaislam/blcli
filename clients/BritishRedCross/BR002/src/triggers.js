import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    const url = window.location.href;
    const userVisitedDonationAppealPage = sessionStorage.getItem('BR002-userVisited');
    if (url.indexOf('donate.redcross.org.uk/appeal/') > -1) {
      return true;
    } else if (url.indexOf('donate.redcross.org.uk/PersonalDetails/Index?AppealTitle') > -1 && url.indexOf('PaymentFrequency=monthly') === -1 && userVisitedDonationAppealPage) {
      return [
        'section.form-change-amount label',
        'fieldset',
       ].every((selector) => document.querySelector(selector));
    }
  },
], activate);
