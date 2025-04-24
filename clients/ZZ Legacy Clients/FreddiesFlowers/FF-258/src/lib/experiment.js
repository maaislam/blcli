/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite, observer } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;
let origURL = window.location.href;

const startExperiment = () => {

  origURL = window.location.href;
  let currHref = window.location.href;

  if(currHref.indexOf('instrumententafel') > -1) {

    pollerLite(['.iconBox > a[href="/konto/gratis-blumen"]'], () => {

      if(document.getElementById(`${ID}-freevaseimage`)) {
        document.getElementById(`${ID}-freevaseimage`).remove();
      }
      if(VARIATION == 2) {
        let changeIconBox = document.querySelector('.iconBox > a[href="/konto/gratis-blumen"]');
        changeIconBox.classList.add(`${ID}-flowerbox`);  
        changeIconBox.querySelector('.iconBox__icon img').src = "https://blcro.fra1.digitaloceanspaces.com/FF-258/sendflowers.png";
        changeIconBox.querySelector('.iconBox__label').innerText = "Versende gratis Blumen und erhalte einen 25 € Gutschein";
        fireEvent(`Visible - changes made to dashboard page`);
      }
      
    }, {
      timeout: 2000
    });

  } 
  
  if(currHref.indexOf('gratis-blumen') > -1) {

    pollerLite(['h2.pb-6'], () => {
      
      let ffPageHeader = document.querySelector('h2.pb-6');
      if(!ffPageHeader.classList.contains(`${ID}-transformed`)) {
        let numFreeBoxes = ffPageHeader.innerText.substring(0, 1);
        if(ffPageHeader.innerText !== "No more boxes left this month.") {
          ffPageHeader.innerText = "Erhalte einen Freddie's Shop Gutschein im Wert von 25 €, wenn du eine gratis Box an deine Freunde versendest.";
        }
        

        ffPageHeader.classList.add(`${ID}-transformed`);
        ffPageHeader.classList.add(`${ID}-updated-header`);

        let nextAlongDiv = ffPageHeader.closest('div').nextElementSibling;
        nextAlongDiv.classList.add(`${ID}-hidden`);
        nextAlongDiv.insertAdjacentHTML('beforebegin', `<p>Diesen Monat hast du ${numFreeBoxes} gratis Boxen zum Versenden. Du erhältst einen 25 € Gutschein bei ihrer erfolgreichen Anmeldung.</p>`)

        let mainOuterDiv = ffPageHeader.closest('.w-full.max-w-xs.mx-auto');
        mainOuterDiv.classList.add(`${ID}-outer-holder`);

        if(!document.getElementById(`${ID}-freevaseimage`)) {
          logMessage("Free Vase Image Added");
          mainOuterDiv.insertAdjacentHTML('beforeend', `<img id="${ID}-freevaseimage" src="https://blcro.fra1.digitaloceanspaces.com/FF-258/referfriendgerman.png" alt="refer a friend and get a free vase" class="${ID}-vase-image" />`)
        }
        
        let howWorkHeader = document.querySelector('.background--paper.divider--container h2');

        let howWorkHolder = howWorkHeader.closest('.text-center.py-10');
        howWorkHolder.classList.add(`${ID}-text-holder`);

        let friendCode = howWorkHolder.querySelector('h3.text-center').innerText;

        howWorkHolder.innerHTML = "";
        let newInnerHTML = `

          <h2> Wie funktioniert das Ganze? </h2>
          <p> Jeden Monat hast du vier Gratis-Boxen zur Verfügung, die du an deine Freunde versenden kannst. </p>
          <p> Wenn sich deine Freunde bei uns anmelden, erhältst du als Dankeschön einen 25 € Gutschein, den du in unserem Shop einlösen kannst und zuzüglich bekommst du 50 % Rabatt auf deine nächste Blumenbox.</p>
          <p> Außerdem erhältst du als kleines Dankeschön deine nächste Box zum halben Preis. </p>

          <h2 class="${ID}-friendcode-header"> Dein Freundschaftscode </h2>

          <p class="text-center">Falls dir das lieber ist, können sich deine Freunde auch direkt über deinen persönlichen Freundschaftscode anmelden:</p>

          <h3 class="text-center">${friendCode}</h3>
        
        `;
        howWorkHolder.insertAdjacentHTML('afterbegin', newInnerHTML);

        fireEvent(`Visible - changes made to free flowers page`);



      }
      


    }, {
      timeout: 2000
    });

  }

  


}

const addTrackingEvents = () => {

  origURL = window.location.href;
  let currHref = window.location.href;

  if(currHref.indexOf('instrumententafel') > -1) {

    pollerLite(['.iconBox > a[href="/konto/gratis-blumen"]'], () => {
      
      let changeIconBox = document.querySelector('.iconBox > a[href="/konto/gratis-blumen"]');
      if(!changeIconBox.classList.contains(`${ID}-events-added`)) {
        changeIconBox.addEventListener('click', (e) => {
          fireEvent(`Click - user has clicked to go to the free flowers page`);
        })
      }
  
    }, {
      timeout: 2000
    });
  
  } else if(currHref.indexOf('gratis-blumen') > -1) {

    pollerLite(['.input'], () => {

      let mainOuterDiv = document.querySelector('.w-full.max-w-xs.mx-auto');

      if(!mainOuterDiv.classList.contains(`${ID}-events-added`)) {

        let bothInputs = document.querySelectorAll('.input input');
        [].slice.call(bothInputs).forEach((input) => {

          input.addEventListener('focus', (e) => {
            let inputLabel = e.currentTarget.closest('.input').querySelector('.input__label').innerText;
            fireEvent(`Interaction - user has focussed the ${inputLabel} field`);
          });

        })

        let submitButton = document.querySelector('button[type="submit"]');

        submitButton.addEventListener('click', (e) => {
          var userId = JSON.parse(localStorage.getItem('freddiesflowers'));
          fireEvent(`Click - user has clicked the 'Send Invite' button and their customerID is: ${userId.account.user.data.id ? userId.account.user.data.id : 'not-found'}`);
        });  

        mainOuterDiv.classList.add(`${ID}-events-added`);
      }
      
      


    }, {
      timeout: 2000
    });

  }


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

  addTrackingEvents();

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
