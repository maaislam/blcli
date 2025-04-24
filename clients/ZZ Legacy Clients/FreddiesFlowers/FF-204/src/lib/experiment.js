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

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const fireAndLogEvent = (event) => {
  logMessage(event);
  fireEvent(event, true);
}



const addTracking = () => {
  
  setTimeout(() => {

    if(document.getElementById('cookieBanner')) {

      let cookieButtonPrimary = document.querySelector('.cookie-btn--primary');

      cookieButtonPrimary.addEventListener('click', () => {
        fireAndLogEvent('Click - user has agreed to cookie terms');
      });

      let primaryCTA = document.querySelector('.sticky-button button');

      primaryCTA.addEventListener('click', () => {
        fireAndLogEvent('Click - user has clicked on the start sending me free flowers button');
      })

    }
    
  }, 250);


}

const startExperiment = () => {

  setTimeout(() => {

    if(document.getElementById('cookieBanner')) {
      // cookie banner here
      
      document.documentElement.classList.add(`${ID}-cookie-amends`);

      pollerLite(['.header', '.navigation'], () => {
        document.querySelector('.header').id = `${ID}-header`;
        document.querySelector('.navigation').id = `${ID}-navigation`;
        document.getElementById(`${ID}-header`).insertBefore(document.getElementById('cookieBanner'), document.getElementById(`${ID}-navigation`));
        let button = document.querySelector('#cookieBanner .cookie-btn--primary');
        button.innerText = "Agree";

        fireAndLogEvent('Visible - amends made to move cookie banner');
  
        button.addEventListener('click', () => {
          document.documentElement.classList.remove(`${ID}-cookie-amends`);

          
        });


  
      })

    }
    
  }, 250);
  
  

}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  addTracking();
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
