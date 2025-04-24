import { fullStory } from '../../../../../lib/utils';
import { events, pollerLite } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};


/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);
};

/*  ----------------
  Cookie opt in check
  ------------------ */
  export const cookieOpt = () => {
    const { ID, VARIATION } = shared;
    if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
      events.send(`Experimentation: ${ID} V${VARIATION}`, 'fired', `test fired`);
    }
    pollerLite([
      '.optanon-alert-box-wrapper',
      '.optanon-toggle-display.cookie-settings-button',
      '.optanon-allow-all.accept-cookies-button',
      ], () => {
        const cookieAllowAll = document.querySelector('.optanon-button-wrapper.optanon-allow-all-button');
        cookieAllowAll.addEventListener('click', () => {
            if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
              events.send(`Experimentation: ${ID} V${VARIATION}`, 'fired', `test fired with cookies accepted`);
            }
        });
      });
    
      pollerLite(['.optanon-button-wrapper.optanon-save-settings-button'], () => {
        // on click of the buttons in settings
        const cookieAllowAll = document.querySelector('.optanon-button-wrapper.optanon-allow-all-button');
        cookieAllowAll.addEventListener('click', () => {
          if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
            events.send(`Experimentation: ${ID} V${VARIATION}`, 'fired', `test fired after cookie accepted`);
          }
        });
      
        const saveSettings = document.querySelector('.optanon-button-wrapper.optanon-save-settings-button');
        saveSettings.addEventListener('click', () => {
          if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
            events.send(`Experimentation: ${ID} V${VARIATION}`, 'fired',  `test fired after cookie accepted`);
          }
        });
      });
  }
  
