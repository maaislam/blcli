/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { pollerLite } from '../../../../../lib/utils';
import { cookieOpt, fireEvent, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
  const runTest = () => {
    const radioButtons = document.querySelector('[class*="styles-module__radioGroup"]');

    const signedFor = radioButtons.querySelector('[class*="styles-module__optionContainer"]');
    const letterBoxDel = radioButtons.querySelectorAll('[class*="styles-module__optionContainer"]')[1];

    // change the text
    letterBoxDel.querySelector('label').textContent = 'Letterbox';
    letterBoxDel.querySelector('p').textContent = 'You agree no children, pets or unauthorised person(s) could access your medication';

    signedFor.querySelector('p').textContent = 'Signature from someone 18 or over. Recommended for many or large items';

  

    // if letterbox already clicked 
    pollerLite(['[class*="styles-module__displayConsent"] [class*="styles-module__checkBoxGroup"] input', '[class*="styles-module__radioGroup"] [class*="styles-module__optionContainer"]'], () => {
      setTimeout(() => {
        if (document.querySelectorAll('[class*="styles-module__optionContainer"]')[1].querySelector('input').value === 'checked') {
          fireEvent('Letterbox selected');
          if (!document.querySelectorAll('[class*="styles-module__displayConsent"] [class*="styles-module__checkBoxGroup"] input')[0].checked) {
            document.querySelectorAll('[class*="styles-module__displayConsent"] [class*="styles-module__checkBoxGroup"] input')[0].click();
            document.querySelectorAll('[class*="styles-module__displayConsent"] [class*="styles-module__checkBoxGroup"] input')[1].click();
          }
        } 
      }, 1000)
   
      // click events
      const allRadios = document.querySelectorAll('[class*="styles-module__radioGroup"] [class*="styles-module__optionContainer"]');
      allRadios.forEach(radio => {
        radio.addEventListener('click', () => {
          if (radio.querySelector('#delivery_signed_for') && radio.querySelector('#delivery_signed_for').checked === true) {
          
            fireEvent('Clicked Signed For')
          } else {
            
            setTimeout(() => {
              if (document.querySelectorAll('[class*="styles-module__optionContainer"]')[1].querySelector('input').value === 'checked') {
                fireEvent('Clicked Letterbox');
                  
                  setTimeout(() => {
                    if (!(document.querySelectorAll('[class*="styles-module__displayConsent"] [class*="styles-module__checkBoxGroup"] input')[0] || {}).checked) {
                      document.querySelectorAll('[class*="styles-module__displayConsent"] [class*="styles-module__checkBoxGroup"] input')[0].click();
                      document.querySelectorAll('[class*="styles-module__displayConsent"] [class*="styles-module__checkBoxGroup"] input')[1].click();
                    }
                  }, 800);
              }
            }, 1000); 
          }
        });
<<<<<<< HEAD
      });

    });

    pollerLite(['#delivery_signed_for', '[class*="styles-module__optionContainer"]'], () => {

      document.querySelector('#blueButtonAgreeandcontinue').addEventListener('click', () => {
        if (document.querySelectorAll('[class*="styles-module__optionContainer"]')[0].querySelector('input').value === 'checked') {
          fireEvent('Signed for selected');
        }
        if (document.querySelectorAll('[class*="styles-module__optionContainer"]')[1].querySelector('input').value === 'checked') {
          fireEvent('Letterbox selected');
        }
      });
=======
        
>>>>>>> 58cda5d503bf5d04c24ff34b5b3d277f8a9539e9
    });




   
  }

  if(VARIATION === 'control') {
    const allRadios = document.querySelectorAll('[class*="styles-module__radioGroup"] [class*="styles-module__optionContainer"]');

    allRadios.forEach(radio => {
      radio.querySelector('input').addEventListener('click', () => {
        if (radio.querySelector('#delivery_signed_for') && radio.querySelector('#delivery_signed_for').checked === true) {
          fireEvent('Clicked Signed For');
        } else {
          fireEvent('Clicked Letterbox');
        }
      });
    });

    pollerLite(['#delivery_signed_for', '[class*="styles-module__optionContainer"]'], () => {

      document.querySelector('#blueButtonAgreeandcontinue').addEventListener('click', () => {
        if (document.querySelectorAll('[class*="styles-module__optionContainer"]')[0].querySelector('input').value === 'checked') {
          fireEvent('Signed for selected');
        }
        if (document.querySelectorAll('[class*="styles-module__optionContainer"]')[1].querySelector('input').value === 'checked') {
          fireEvent('Letterbox selected');
        }
      });
    });

  }

  if(VARIATION === '1') {
   runTest();
  }


};
