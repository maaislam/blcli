/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { events } from '../../../../../lib/utils';
import formSubmit from '../formSubmit';
import { cookieOpt, setup } from './services';
import shared from './shared';
import lastViewedURLScraper from './storeURLS';

export default () => {
  const { ID, VARIATION } = shared;

  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  if(VARIATION === 'control') {
    setup();
    const form = document.querySelector(`#cu_newsletter_signup form`);
      form.addEventListener('submit', () => {
        events.send(`Experimentation: ${ID} v${VARIATION}`, 'submit', 'newsletter sign up');
      });

  } else {
    setup();
    /*  ----------------
      Experiment code 
      ------------------ */

      document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-emailoverlay"></div>`);

      const createEmailBox = () => {
        const emailBox = document.createElement('div');
        emailBox.classList.add(`${ID}-emailSignUp`);
        emailBox.innerHTML = 
        `<div class="${ID}-emailContent container">
          <div class="${ID}-close"></div>
            <div class="spinnerContainer">
              <img src="https://www.boots.com/wcsstore/eBootsStorefrontAssetStore/images/boots/boots_loader_spinner.gif" alt="">
            </div>
            <div class="${ID}-signUpform">
            </div>
          </div>`;

          document.body.appendChild(emailBox);

          if(VARIATION === '1' || VARIATION === '2') {
            const signUp = document.querySelector('#cu_newsletter_signup');
            emailBox.querySelector(`.${ID}-signUpform`).appendChild(signUp);
            document.querySelectorAll('.BO074-signUpform p')[1].innerText = 'Receive the latest guidance from our healthcare professionals, updates on our delivery services & store opening times, & information on the latest products by email and digital communications';
          }
      }

      if(VARIATION === '1' || VARIATION === '2') {
        createEmailBox();
      }

      const pullInForm = () => {
        // pull in form
        return new Promise((resolve, reject) => {
          const emailEl = document.querySelector(`.${ID}-emailSignUp`);
            const request = new XMLHttpRequest();
                request.open('GET','https://www.boots.com/', true);
                request.onload = () => {
                  if (request.status >= 200 && request.status < 400) {
                    const temp = document.createElement('html');
                    temp.innerHTML = request.responseText;
                    const items = temp.querySelector('#cu_newsletter_signup');
                    emailEl.querySelector(`.${ID}-signUpform`).appendChild(items);
                    resolve();

                  }
                };
                request.send();
          
        });
      }

      const boxEvents = () => {
        const emailBox = document.querySelector(`.${ID}-emailSignUp`);
        const overlay = document.querySelector(`.${ID}-emailoverlay`);

        const closeBox = () => {
          emailBox.classList.remove(`${ID}-emailShow`);
          overlay.classList.remove(`${ID}-overlayShow`);
          localStorage.setItem(`${ID}-emailClosed`, 1);
        }

        const openBox = () => {
          emailBox.classList.add(`${ID}-emailShow`);
          overlay.classList.add(`${ID}-overlayShow`);
        }

        const closeIcon = document.querySelector(`.${ID}-emailSignUp .${ID}-close`);

        closeIcon.addEventListener('click', () => {
          closeBox();
          events.send(`Experimentation: ${ID} v${VARIATION}`, 'click', ' close newsletter sign up');
        });

        overlay.addEventListener('click', () => {
          closeBox();
          events.send(`Experimentation: ${ID} v${VARIATION}`, 'click', ' close newsletter sign up');
        });

        // form submit
        const form = document.querySelector(`.${ID}-emailSignUp form`);
        form.addEventListener('submit', () => {
          setTimeout(() => {
            events.send(`Experimentation: ${ID} v${VARIATION}`, 'submit', 'newsletter sign up');
            closeBox();
          }, 2000);
        });

        openBox();
      }

      if(VARIATION === '1' || VARIATION === '2') {
        boxEvents();
      }

      if(VARIATION === '3' || VARIATION === '4') {
        const prevURLS = window.sessionStorage.BOUrls;

        if(!prevURLS || JSON.parse(prevURLS).length <= 3) {
          lastViewedURLScraper();
        }

        if(prevURLS) {
          const allURLs = JSON.parse(prevURLS);

          if(VARIATION === '3') {
            if(allURLs[0] && !allURLs[1] && !allURLs[2]) {
              createEmailBox();
              pullInForm().then(() => {
                document.querySelectorAll('.BO074-signUpform p')[1].innerText = 'Receive the latest guidance from our healthcare professionals, updates on our delivery services & store opening times, & information on the latest products by email and digital communications';
                boxEvents();
                formSubmit();
              });
            }
          }

          if(VARIATION === '4') {
            if(allURLs[0] && allURLs[1] && !allURLs[2] && !allURLs[3]) {
              createEmailBox();
              pullInForm().then(() => {
                document.querySelectorAll('.BO074-signUpform p')[1].innerText = 'Receive the latest guidance from our healthcare professionals, updates on our delivery services & store opening times, & information on the latest products by email and digital communications';
                boxEvents();
                formSubmit();
              });
            }
          }
        }
      }
    } 

};
