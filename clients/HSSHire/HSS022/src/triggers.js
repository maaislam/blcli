/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'#content',
() => {
  let poller = false;
  /**
   * @desc Run Experiment if user has selected DIY or user is Signed In under a DIY account
   * * * logged in user - document.getElementsByClassName("logged_in drop_trigger").length > 0
   * * * TRADE (logged in) user - document.getElementsByClassName("company_name").length > 0
   */
  const userIsOnHomepage = window.location.pathname === "/hire" || window.location.pathname === "/hire/trade";
  const loggedIn = !!document.getElementsByClassName("logged_in drop_trigger") && document.getElementsByClassName("logged_in drop_trigger").length > 0;
  const coName = !!document.getElementsByClassName("company_name") && !(document.getElementsByClassName("company_name").length > 0);
  if (getCookie('homepagePreference') === "DIY" && !loggedIn
  || getCookie('homepagePreference') === "DIY" && loggedIn && coName
  || loggedIn && coName
  && userIsOnHomepage) {
    poller = true;
  }

  return poller;
},
], activate);
