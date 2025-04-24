/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, observer, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION+" - update");

  let quizStartedMessage = "Pushchair Quiz - quiz started";
  logMessage(quizStartedMessage);
  fireEvent(quizStartedMessage, true);

  pollerLite(['.dy-stepper-wrapper'], () => {

    // Getting the steps

    let dyWrapper = document.querySelector('.dy-stepper-wrapper').parentElement.parentElement;

    observer.connect(dyWrapper, () => {
    
      setTimeout(() => {
        let completedSteps = document.querySelectorAll('.dy-stepper-item.completed');

        if(completedSteps.length > localStorage.getItem(`${ID}-steps-completed`)) {
          let completedMessage = "Pushchair Quiz - user has completed stage: "+completedSteps.length;
          logMessage(completedMessage);
          fireEvent(completedMessage, true);

          localStorage.setItem(`${ID}-steps-completed`, completedSteps.length)
        }

        if(completedSteps.length == 8) {

          let quizCompleteMessage = "Pushchair Quiz - quiz complete, moving to results page";
          logMessage(quizCompleteMessage);
          fireEvent(quizCompleteMessage, true);

          localStorage.removeItem(`${ID}-steps-completed`)

        }
        

      }, 1000);
      
  
    }, {
      config: {
        attributes: true,
        childList: false,
        subtree: false,
      }
    });

    // Getting the close event

    let modalBackdrop = document.querySelector('.dy-modal-backdrop');

    modalBackdrop.addEventListener('click', (e) => {

      let closeMessage = "Pushchair Quiz - modal closed by clicking outside the modal";
      logMessage(closeMessage);
      fireEvent(closeMessage, true);

      localStorage.removeItem(`${ID}-steps-completed`);

    });

    let closeButton = document.querySelector('.dy-hide-close');

    closeButton.addEventListener('click', (e) => {

      let closeMessage = "Pushchair Quiz - modal closed by clicking the close X";
      logMessage(closeMessage);
      fireEvent(closeMessage, true);

      localStorage.removeItem(`${ID}-steps-completed`);

    });

    let prevButton = document.querySelector('.dy-prev');

    prevButton.addEventListener('click', (e) => {

      let backMessage = "Pushchair Quiz - user navigated backwards using previous button";
      logMessage(backMessage);
      fireEvent(backMessage, true);

    });


  })

};
