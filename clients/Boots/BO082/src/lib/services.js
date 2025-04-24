import { fullStory } from '../../../../../lib/utils';
import { events, pollerLite } from '../../../../../lib/utils';
import shared from './shared';


const { ID, VARIATION, CLIENT, LIVECODE } = shared;

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
  // set up events
  events.setDefaultCategory('Experimentation');
  events.setDefaultAction(CLIENT + " - "+ID);

  if(LIVECODE == "true") {
    events.sendEvents = false;
  } else {
    events.sendEvents = true;
  }

  // adds document body classlist 
  document.documentElement.classList.add(ID);
  document.documentElement.classList.add(`${ID}-${VARIATION}`);
};

export const fireEvent = (label) => {

  events.sendAuto(VARIATION, label);

}

/*  ----------------
  Cookie opt in check
  ------------------ */
  export const cookieOpt = () => {
    const { ID, VARIATION } = shared;
    if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
      events.send(`${ID} V${VARIATION}`, 'fired', `test fired`);
    }
    pollerLite([
      '.optanon-alert-box-wrapper',
      '.optanon-toggle-display.cookie-settings-button',
      '.optanon-allow-all.accept-cookies-button',
      ], () => {
        const cookieAllowAll = document.querySelector('.optanon-button-wrapper.optanon-allow-all-button');
        cookieAllowAll.addEventListener('click', () => {
            if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
              events.send(`${ID} V${VARIATION}`, 'fired', `test fired`);
            }
        });
      });
    
      pollerLite(['.optanon-button-wrapper.optanon-save-settings-button'], () => {
        // on click of the buttons in settings
        const cookieAllowAll = document.querySelector('.optanon-button-wrapper.optanon-allow-all-button');
        cookieAllowAll.addEventListener('click', () => {
          if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
           events.send(`${ID} V${VARIATION}`, 'fired', `test fired`);
          }
        });
      
        const saveSettings = document.querySelector('.optanon-button-wrapper.optanon-save-settings-button');
        saveSettings.addEventListener('click', () => {
          if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
           events.send(`${ID} V${VARIATION}`, 'fired', `test fired`);
          }
        });
      });
  }
  
