/**
 * HH030 - HH003 Validation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();
  const { ID } = settings;

  // ------------------------------------------------
  // Change links so they redirect to the new form
  // ------------------------------------------------
  const links = document.querySelectorAll('a');

  /**
   * Change href to direct to new form and store a cookie
   * @param {HTMLElement} link
   * @param {string} cookieName Name of the cookie
   */
  const updateLink = (link, cookieName) => {
    // Update URL
    link.href = 'https://www.helpinghandshomecare.co.uk/about-us/contact-us/contact-form/';

    // Store a value in sessionStorage on click so we know which tab to default to on the new form
    link.addEventListener('click', () => {
      window.sessionStorage.setItem(ID, cookieName);
    });
  };

  for (let i = 0; i < links.length; i += 1) {
    const link = links[i];
    if (link && link.href) {
      switch (true) {
        case /about-us\/contact-us\/request-a-callback/.test(link.href):
          updateLink(link, 'callback');
          break;

        case /about-us\/contact-us\/free-home-care-consultation/.test(link.href):
          updateLink(link, 'consultation');
          break;

        case /about-us\/contact-us\/send-a-message/.test(link.href):
          updateLink(link, 'message');
          break;

        case /about-us\/contact-us\/request-a-brochure/.test(link.href):
          updateLink(link, 'brochure');
          break;

        default:
          break;
      }
    }
  }

  const isFormPage = /https?:\/\/www\.helpinghandshomecare\.co\.uk\/about-us\/contact-us\/contact-form\/?(\?.*)?(#.*)?$/.test(window.location.href);
  if (isFormPage) {
    // Automatically switch to relevant tab if cached value is available
    const value = sessionStorage.getItem(ID);
    if (value) {
      pollerLite(['.nav-tabs-uc a'], () => {
        const tabs = document.querySelectorAll('.nav-tabs-uc a');
        const tabTextMap = {
          callback: 'Request a callback',
          consultation: 'Book a free consultation',
          message: 'Send us a message',
          brochure: 'Download a brochure',
        };
        const thisTab = [].filter.call(tabs, tab => tab.innerText.trim().toLowerCase() === tabTextMap[value].toLowerCase());
        if (thisTab.length) {
          thisTab[0].click();
          events.send(ID, 'redirect', value);
        }

        // Remove cookie
        sessionStorage.removeItem(ID);
      });
    }
  }
};

export default activate;
