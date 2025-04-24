/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

if(!getCookie('Synthetic_Testing') && getCookie('OptanonAlertBoxClosed')) {


  pollerLite([
    'body','#loggedIn_name',
  () => {
    if(document.querySelector('#loggedIn_name') && document.querySelector('#loggedIn_name').textContent.trim() === "") {
      return true;
    }
  },
  () => {
    return !!window.OnetrustActiveGroups;
  },
  () => {
    if(window.OnetrustActiveGroups && window.OnetrustActiveGroups.indexOf(',2,') > -1) {
      return true;
    }
  },
  () => {
      return !!window.Optanon
  },
  () => {
    return !!window.jQuery
},
  () => {
    if(!localStorage.getItem(`BO074-emailClosed`)) {
      return true;
    }
  }
  ], activate);
}
