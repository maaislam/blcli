/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getSiteFromHostname } from './helpers';
import { liveAdviceBox } from './markup';

const { ID, VARIATION } = shared;



/**
 * Activate
 */
export default () => {
  setup();

  fireEvent('Conditions Met');

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }
 
  const checkSession = setInterval(function(){
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if(sessionStorage.getItem('analyticsDataSentFor') && sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname) {
      if(typeof s !== 'undefined'){
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }  
      clearInterval(checkSession);
    }
  }, 1000);
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if(VARIATION !== 'control') {
    // test code here

    const makeActiveFunction = () => {
      const liveChatBox = document.querySelector('.js-live-chat-dialog.live-chat .live-chat__header');
      liveChatBox.insertAdjacentHTML('afterend', liveAdviceBox);


      const selectBox = document.querySelector(`.${ID}-default`);
      const allBoxes = document.querySelectorAll(`.${ID}-box`);
      
      const makeOptionActive = (event) => {
        selectBox.textContent = document.querySelector(`#options li [for="${event.target.id}"]`).textContent;
        
        // loop through and show active ones
        for (let index = 0; index < allBoxes.length; index += 1) {
          const element = allBoxes[index];
          const elTarget = element.getAttribute('opt-target');

          element.classList.remove(`${ID}-boxShow`);

          if(elTarget) {
            if(elTarget.indexOf(event.target.value) > -1) {
              element.classList.add(`${ID}-boxShow`);
              document.querySelector(`#options`).classList.add(`${ID}-closed`);

              fireEvent('Clicked option ' + event.target.value);
            }
          }
        }

      }

      document.querySelectorAll(`.${ID}-select input`).forEach((input) => {
        input.addEventListener('change', makeOptionActive);
      });

      
      document.querySelector(`.${ID}-option`).addEventListener('click', () => {
      if(document.querySelector(`#options`).classList.contains(`${ID}-closed`)) {
        document.querySelector(`#options`).classList.remove(`${ID}-closed`);
        document.querySelector(`#options`).scrollTop = 0;
      } else {
        document.querySelector(`#options`).classList.add(`${ID}-closed`);
        document.querySelector(`#options`).scrollTop = 0;
      }
      });
    }

    makeActiveFunction();
    

    const clickEvents = () => {

      // on close 
      document.querySelector('.live-chat__close-dialog').addEventListener('click', () => {
        document.querySelector(`#options`).classList.add(`${ID}-closed`);
        document.querySelector(`.js-live-chat-dialog`).scrollTop = 0;
      });
      
      // on click of live chat or back
      const backButtons = document.querySelectorAll(`.live-chat__cta.${ID}-back`);

       for (let x = 0; x < backButtons.length; x++) {
        const backCTA = backButtons[x];
        backCTA.addEventListener('click', () => {
          document.querySelector('.live-chat__close-dialog').click();
        });
      }

      const allCTAs = document.querySelectorAll(`.${ID}-box .live-chat__cta`);
      const liveChatButton = document.querySelector('.live-chat__chat-option.js-live-chat-whoson .live-chat__cta');
      const liveCallButton = document.querySelector('.live-chat__chat-option.js-live-chat-gis .live-chat__cta.js-gis-link');
      const bookOnline = document.querySelector('.live-chat__chat-option.js-live-chat-virtual-appointment .live-chat__cta.js-live-chat-virtual-appointment__cta');
      const bookStore = document.querySelector('.live-chat__chat-option.js-live-chat-instore-appointment .live-chat__cta.js-live-chat-instore-appointment__cta');

      for (let index = 0; index < allCTAs.length; index++) {
        const cta = allCTAs[index];
        
        if(cta.classList.contains(`${ID}-liveChatButton`)) {
          if(liveChatButton) {
            cta.addEventListener('click', () => {
              liveChatButton.click();
              fireEvent('Clicked live chat');
            });
          } else {
            cta.classList.add(`${ID}-disabled`);
          }
        } 

        else if(cta.classList.contains(`${ID}-liveCallButton`)) {
          if(liveCallButton) {
            cta.addEventListener('click', () => {
              liveCallButton.click();
              fireEvent('Clicked live call');
            });
          }
        }

        else if(cta.classList.contains(`${ID}-onlineAppt`)) {
          if(bookOnline) {
            cta.addEventListener('click', () => {
              bookOnline.click();
              fireEvent('Clicked book online appointment');
            });
          }
        }

        else if(cta.classList.contains(`${ID}-storeAppt`)) {
          if(bookStore) {
            cta.addEventListener('click', () => {
              bookStore.click();
              fireEvent('Clicked book store appointment');
            });
          }
        }
        
        else {
          cta.addEventListener('click', () => {
            let buttonName;
            if(cta.parentNode.querySelector('span')) {
              buttonName = cta.parentNode.querySelector('span').textContent;
            } else {
              buttonName = cta.textContent
            }
            fireEvent('Clicked button ' + buttonName);
          });
        }

      }
    }
    clickEvents();
  
    
  } else if(VARIATION == 'control'){
    // any control code here

    const allOptions = document.querySelectorAll(`.live-chat__chat-option`);
    for (let index = 0; index < allOptions.length; index += 1) {
      const element = allOptions[index];
      element.querySelector('.live-chat__cta').addEventListener('click', () => {
        const elName = element.querySelector('.live-chat__content h3 span');
        fireEvent('Clicked CTA ' + elName.textContent);
      });
    }

    const liveChatButton = document.querySelector('.live-chat__chat-option.js-live-chat-whoson .live-chat__cta');
    if(liveChatButton) {
      liveChatButton.addEventListener('click', () => {
        fireEvent('Clicked live chat');
      });
    }
  }
};
