/**
 * HH050 - Contact Form Redesign
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, contactUsPage, sendMessagePage, requestCallBackPage, bookHomeVisitPage } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  const mainContainer = document.querySelector('#main');
  if (window.location.pathname === "/about-us/contact-us/") {
    contactUsPage(mainContainer);
  } else if (window.location.pathname === "/about-us/contact-us/send-a-message/") {
    sendMessagePage(mainContainer);
  } else if (window.location.pathname === "/about-us/contact-us/request-a-callback/") {
    requestCallBackPage(mainContainer);
  } else if (window.location.pathname === "/about-us/contact-us/book-a-home-visit/") {
    bookHomeVisitPage(mainContainer);
  } 
};

export default activate;