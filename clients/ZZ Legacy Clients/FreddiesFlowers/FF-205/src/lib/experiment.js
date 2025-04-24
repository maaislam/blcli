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

const fireAndLogEvent = (event) => {
  logMessage(event);
  fireEvent(event, true);
}

const startExperiment = () => {

  origURL = window.location.href;
  let currHref = window.location.href;

  if(currHref.indexOf('dashboard') > -1) {

    pollerLite(['.iconBox > a[href="/account/free-flowers"]'], () => {

      if(document.getElementById(`${ID}-freevaseimage`)) {
        document.getElementById(`${ID}-freevaseimage`).remove();
      }
      if(VARIATION == 2) {
        let changeIconBox = document.querySelector('.iconBox > a[href="/account/free-flowers"]');
        changeIconBox.classList.add(`${ID}-flowerbox`);  
        changeIconBox.querySelector('.iconBox__icon img').src = "https://editor-assets.abtasty.com/46836/616ea008197701634639880.png";
        changeIconBox.querySelector('.iconBox__label').innerText = "Send free flowers and get a £25 voucher";
        fireAndLogEvent(`Visible - changes made to dashboard page`);
      }
      
    }, {
      timeout: 2000
    });
  
  } 
  
  if(currHref.indexOf('free-flowers') > -1) {

    pollerLite(['h2.pb-6'], () => {
      
      let ffPageHeader = document.querySelector('h2.pb-6');
      if(!ffPageHeader.classList.contains(`${ID}-transformed`)) {
        let numFreeBoxes = ffPageHeader.innerText.substring(0, 1);
        if(ffPageHeader.innerText !== "No more boxes left this month.") {
          ffPageHeader.innerText = "Get a £25 Freddie's Shop voucher when you send a free box to a friend";
        }
        

        ffPageHeader.classList.add(`${ID}-transformed`);
        ffPageHeader.classList.add(`${ID}-updated-header`);

        let nextAlongDiv = ffPageHeader.closest('div').nextElementSibling;
        nextAlongDiv.classList.add(`${ID}-hidden`);
        nextAlongDiv.insertAdjacentHTML('beforebegin', `<p>You have ${numFreeBoxes} free boxes to send this month. You’ll receive a £25 voucher when they sign up.</p>`)

        let mainOuterDiv = ffPageHeader.closest('.w-full.max-w-xs.mx-auto');
        mainOuterDiv.classList.add(`${ID}-outer-holder`);

        if(!document.getElementById(`${ID}-freevaseimage`)) {
          logMessage("Free Vase Image Added");
          mainOuterDiv.insertAdjacentHTML('beforeend', `<img id="${ID}-freevaseimage" src="https://editor-assets.abtasty.com/46836/616e9fb74772e1634639799.jpg" alt="refer a friend and get a free vase" class="${ID}-vase-image" />`)
        }
        
        let howWorkHeader = document.querySelector('.background--paper.divider--container h2');

        let howWorkHolder = howWorkHeader.closest('.text-center.py-10');
        howWorkHolder.classList.add(`${ID}-text-holder`);

        let friendCode = howWorkHolder.querySelector('h3.text-center').innerText;

        howWorkHolder.innerHTML = "";
        let newInnerHTML = `

          <h2> Our Referral Offer </h2>
          <p> Each month you get four free boxes of fresh flowers to send to your friends. </p>
          <p> If your friend signs up you will receive a £25 voucher to spend in our shop as a thank you, as well as 50% off your next box.</p>
          <p> All you need to do is fill in their email so we can send them an invite. </p>

          <h2 class="${ID}-friendcode-header"> Your friend code </h2>

          <p class="text-center">If you prefer, your friends can simply sign up using your personal friend code:</p>

          <h3 class="text-center">${friendCode}</h3>
        
        `;
        howWorkHolder.insertAdjacentHTML('afterbegin', newInnerHTML);

        fireAndLogEvent(`Visible - changes made to free flowers page`);



      }
      


    }, {
      timeout: 2000
    });

  }

  


}

const addTrackingEvents = () => {

  origURL = window.location.href;
  let currHref = window.location.href;

  if(currHref.indexOf('dashboard') > -1) {

    pollerLite(['.iconBox > a[href="/account/free-flowers"]'], () => {
      
      let changeIconBox = document.querySelector('.iconBox > a[href="/account/free-flowers"]');
      if(!changeIconBox.classList.contains(`${ID}-events-added`)) {
        changeIconBox.addEventListener('click', (e) => {
          fireAndLogEvent(`Click - user has clicked to go to the free flowers page`);
        })
      }
  
    }, {
      timeout: 2000
    });
  
  } else if(currHref.indexOf('free-flowers') > -1) {

    pollerLite(['.input'], () => {

      let mainOuterDiv = document.querySelector('.w-full.max-w-xs.mx-auto');

      if(!mainOuterDiv.classList.contains(`${ID}-events-added`)) {

        let bothInputs = document.querySelectorAll('.input input');
        [].slice.call(bothInputs).forEach((input) => {

          input.addEventListener('focus', (e) => {
            let inputLabel = e.currentTarget.closest('.input').querySelector('.input__label').innerText;
            fireAndLogEvent(`Interaction - user has focussed the ${inputLabel} field`);
          });

        })

        let submitButton = document.querySelector('button[type="submit"]');

        submitButton.addEventListener('click', (e) => {
          var userId = JSON.parse(localStorage.getItem('freddiesflowers'));
          fireAndLogEvent(`Click - user has clicked the 'Send Invite' button and their customerID is: ${userId.account.user.data.id ? userId.account.user.data.id : 'not-found'}`);
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
