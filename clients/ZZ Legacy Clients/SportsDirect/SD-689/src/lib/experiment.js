/**
 * SD-689 - Sports Quiz
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import debounce from 'lodash/debounce';
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage, pollerLite, observer } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

const addQuizEntryPoint = () => {

  let startPointHTML = `

    <div class="${ID}-quiz-entry loading">

      <div class="loading-spinner">
        <p> Loading... </p>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <circle cx="50" cy="50" fill="none" stroke="#000000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
        </svg>
      </div>
    
      <div class="${ID}-quiz-entry-text-holder">
      
        <p> Need some inspiration? We've got you covered! </p>

        <p class="smaller-text"> Use our Product Finder </p>

        <a href="/product-finder" id="${ID}-start-quiz" class="${ID}-start-quiz">Get Started</a>

      </div>    
    
    </div>
  
  `;

  let insertionPosition = 5;

  let insertionPoint = document.querySelector('#productlistcontainer #navlist li:nth-of-type('+insertionPosition+')');

  if(insertionPoint) {
    insertionPoint.insertAdjacentHTML('beforebegin', startPointHTML);

    fireEvent("Visible - quiz entry point loaded onto plp: "+window.location.href);
  
    pollerLite([`.${ID}-quiz-entry`], () => {
  
      let quizStartCTA = document.getElementById(`${ID}-start-quiz`);
  
      quizStartCTA.addEventListener('click', (e) => {
  
  
        
        fireEvent("Click - user has gone to the quiz from page: "+window.location.href);
  
      })
  
      setTimeout(function() {
        // sets the height of the takeover element to match the ones around it.
        let element = document.querySelector('#productlistcontainer #navlist li:nth-of-type('+insertionPosition+')');
        let prevEleOffsetHeight = element.clientHeight;
        let prevEleFullHeight = prevEleOffsetHeight;
  
        let messageHolderRef = document.querySelector(`.${ID}-quiz-entry`);
        messageHolderRef.style.height = prevEleFullHeight + "px";
        if(messageHolderRef.classList.contains('loading')) {
          messageHolderRef.classList.remove('loading');
        }       
      },500);
      
    });
  }
  

  

}

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  

  // Write experiment code here
  // ...

  // Make the experiment work on a single URL

  pollerLite(['#productlistcontainer #navlist'], () => {
    addQuizEntryPoint();

    pollerLite(['#navlist li'], () => {

      const navlist = document.getElementById('navlist');    
      observer.connect(navlist, () => {
        if(!document.querySelector(`.${ID}-quiz-entry`)) {
          addQuizEntryPoint();
        };
      }, {
        config: {
          attibutes: true,
          childList: true,
          subTree: false,
        },
      });


    });

  })
  
  
  

  


};