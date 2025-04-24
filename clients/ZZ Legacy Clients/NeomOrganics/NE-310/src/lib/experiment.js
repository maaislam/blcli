/**
 * NE-310 - New User email capture incentivisation
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { checkboxClickEvents } from './helpers';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  const successPageRegex = /\bcheckouts\b.*\bthank_you\b/;

  if (window.location.href.indexOf('/checkouts/') > -1 && !successPageRegex.test(window.location.href)) {
    setTimeout(() => {
      const emailCheckbox = document.querySelector('input#checkout_buyer_accepts_marketing');
      // --- Get Default Checkbox Value
      let hiddenCheckbox = document.querySelector('input[name="checkout[buyer_accepts_marketing]"]');
      if (hiddenCheckbox.value == '0') { 
        localStorage.setItem(`NE-310-opt-in`, 'No');
      } else {
        localStorage.setItem(`NE-310-opt-in`, 'Yes'); 
      }

      if(VARIATION == 'control') {
        
        emailCheckbox.addEventListener('click', (e) => {
          setTimeout(() => {
            hiddenCheckbox = document.querySelector('input[name="checkout[buyer_accepts_marketing]"]');
            if (hiddenCheckbox.value == '0') {
              // --- Opt Out - User has checked box 
              fireEvent('Click - Checkbox select (opt out) - Email');
              localStorage.setItem(`NE-310-opt-in`, 'No');
            } else {
              fireEvent('Click - Checkbox deselect (opt in) - Email');
              localStorage.setItem(`NE-310-opt-in`, 'Yes'); 
            }
          }, 500);
        });
    
        checkboxClickEvents();
    
        return;
      }
    
      // -----------------------------
      // Write experiment code here
      // -----------------------------
      // ...
      
      const emailBox = `<div class="${ID}-email-msg__wrapper v${VARIATION}">
        <div class="${ID}-email-msg__container"></div>
      </div>`;
    
      emailCheckbox.closest('.section__content').insertAdjacentHTML('beforeend', emailBox);
      let boxMessage = '';
      if (VARIATION == '1') {
        // boxMessage = `<h2>Are you sure you want to opt out?</h2>
        // <div>Get lashings of inspiration, wellbeing support and amazing offers by opting in to our email newsletter - copy to be provided by client.</div>`;
        boxMessage = `<h2>Don’t want to be part of our wellbeing communtiy?</h2>
        <div>You sure? Subscribe and receive the latest wellbeing news and exclusive offers - you really don’t want to miss out!</div>`;
      } else if (VARIATION == '2') {
        boxMessage = `<h2>Are you sure you want to opt out?</h2>
        <ul>
          <li>Amazing access to exclusive offers</li>
          <li>Wellbeing support and lashings of inspiration</li>
          <li>Unsubscribe at any time</li>
        </ul>`;
      }
    
      document.querySelector(`.${ID}-email-msg__container`).innerHTML = boxMessage;
      
      // let hiddenCheckbox = null;
      emailCheckbox.addEventListener('click', (e) => {
        setTimeout(() => {
          hiddenCheckbox = document.querySelector('input[name="checkout[buyer_accepts_marketing]"]');
          if (hiddenCheckbox.value == '0') {
            // --- Opt Out - User has checked box 
            document.querySelector(`.${ID}-email-msg__wrapper`).classList.add('show');
            
            document.querySelector(`.${ID}-email-msg__wrapper`).classList.add('scale-in-tl');
            document.querySelector(`.${ID}-email-msg__wrapper`).classList.remove('scale-out-tl');
            fireEvent(`Visible - Email message shown`);
            fireEvent('Click - Checkbox select (opt out) - Email');
            localStorage.setItem(`NE-310-opt-in`, 'No');
          } else {
            fireEvent('Click - Checkbox deselect (opt in) - Email');
            localStorage.setItem(`NE-310-opt-in`, 'Yes'); 
            
            document.querySelector(`.${ID}-email-msg__wrapper`).classList.add('scale-out-tl');
            document.querySelector(`.${ID}-email-msg__wrapper`).classList.remove('scale-in-tl');
            setTimeout(() => {
              document.querySelector(`.${ID}-email-msg__wrapper`).classList.remove('show');
            }, 440);
            
          }
        }, 500);
        
      });
    
      /**
       * @desc Checkbox click events
       */
      checkboxClickEvents();

      // document.querySelector('button#continue_button').addEventListener('click', (e) => {
      //   hiddenCheckbox = document.querySelector('input[name="checkout[buyer_accepts_marketing]"]');
      //   if (hiddenCheckbox.value == '0') {
      //     // --- Opt Out - User has checked box 
      //     localStorage.setItem(`NE-310-opt-in`, 'No');
      //   } else {
      //     localStorage.setItem(`NE-310-opt-in`, 'Yes');   
      //   }
      // });
    }, 1000);
  } else if (successPageRegex.test(window.location.href)) {
    let userSelection = localStorage.getItem(`NE-310-opt-in`);

    // if(VARIATION == 'control') {
    //   fireEvent(`Conditions Met - Opt-in - ${userSelection}`);

    //   localStorage.removeItem(`NE-310-opt-in`);
    //   return;
    // }
    
    

    fireEvent(`Conditions Met - Opt-in - ${userSelection}`);

    localStorage.removeItem(`NE-310-opt-in`);
  }

  

  
};
