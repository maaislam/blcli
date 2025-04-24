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

const { ID, VARIATION } = shared;

// Popup functions

const insertPopup = () => {
	let newPopupHTML = `

    <div class="${ID}-popup-outer">

      <div class="${ID}-popup ${ID}-step1">
        
        <h2>Next, is your last eye test still valid? </h2>

        <p class="${ID}-text"> You may have received an appointment reminder. An eye test is typically valid for up to two years, but there are exceptions. Check your prescription card or contact your last optician if you're not sure. </p>

        <div class="${ID}-popup--buttons">
          <button id="${ID}-popup--yesstep1">Yes</button>
          <button id="${ID}-popup--nostep1">No</button>
        </div>

        <div class="${ID}-popup--previous">
          <svg width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="15.5 5 8.5 12 15.5 19" fill="none" stroke="#26815E" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/></svg>
          <a href="#" class="${ID}-prevlink" id="${ID}-prevlink">Previous</a>
        </div>
      
      </div>

      <div class="${ID}-popup ${ID}-step2">
        
        <h2>A valid eye test is required for a contact lens trial. </h2>

        <p class="${ID}-text"> Do you want to book an eye test prior to booking a contact lens consultation trial? </p>

        <div class="${ID}-popup--buttons">
          <button id="${ID}-popup--yesstep2">Yes</button>
          <button id="${ID}-popup--nostep2">No</button>
        </div>

        <div class="${ID}-popup--previous">
          <svg width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="15.5 5 8.5 12 15.5 19" fill="none" stroke="#26815E" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/></svg>
          <a href="#" class="${ID}-prevlink" id="${ID}-prevlink--step2">Previous</a>
        </div>
      
      </div>

      <div class="${ID}-popup ${ID}-step3">
        
        <h2> Unfortunately you will need a valid eye test to in order to book an contact lens consultation appointment. </h2>

        <p class="${ID}-text"> Please contact your store if you require any further assistance. </p>

        <div class="${ID}-popup--previous">
          <svg width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="15.5 5 8.5 12 15.5 19" fill="none" stroke="#26815E" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/></svg>
          <a href="#" class="${ID}-prevlink" id="${ID}-prevlink--step3">Previous</a>
        </div>
      
      </div>

      

    </div>


  `;

	let mainElement = document.body;
	mainElement.insertAdjacentHTML('afterbegin', newPopupHTML);

	document.getElementById(`${ID}-popup--yesstep1`).addEventListener('click', () => {
		closePopup();
    fireEvent('Click - user has clicked YES they do have a valid eye test', true);
		// adds a class to hide the journey until the date-and-time page is loaded
		document.documentElement.classList.add(`${ID}-invisibilitycloak`);
    setTimeout(() => {
      document.documentElement.classList.remove(`${ID}-invisibilitycloak`);
    }, 1300);
		document.getElementById('journey-page-footer_continue-button').click();

		// clicks through all yes until it reaches the date-and-time page
		let interval = setInterval(() => {
			if (document.getElementById('appointment-type-triage-container_question_cta-1')) {
				document.getElementById('appointment-type-triage-container_question_cta-1').click();
			}
			if (document.querySelector('.appointment-card__cta')) {
				document.querySelector('.appointment-card__cta').click();
				clearInterval(interval);
			}
		}, 1);
	});

	document.getElementById(`${ID}-popup--nostep1`).addEventListener('click', () => {
    document.querySelector(`.${ID}-popup-outer`).classList.add(`${ID}-step1complete`);
    fireEvent('Click - user has clicked NO they don\'t have a valid eye test to be taken to the next screen', true);
	});

  document.getElementById(`${ID}-popup--yesstep2`).addEventListener('click', () => {
    closePopup();
    localStorage.setItem(`${ID}-booked-eyetest`, `true`);
    document.getElementById('specs-appointment-type-adult_eye_test_triage').click();
    document.getElementById('journey-page-footer_continue-button').click();
    fireEvent('Click - user has clicked YES they want to book an eye appointment during step 2', true);

  });

  document.getElementById(`${ID}-popup--nostep2`).addEventListener('click', () => {

    document.querySelector(`.${ID}-popup-outer`).classList.add(`${ID}-step2complete`);
    fireEvent('Click - user has clicked NO they don\'t want to book an eye appointment during step 2', true);

  });

	document.documentElement.addEventListener('click', (e) => {
		if (e.target.classList.contains(`${ID}-noscroll`)) {
			closePopup();
			fireEvent('Click - user has clicked outside the modal to close the popup', true);
		}
    
    if(e.target.classList.contains(`${ID}-prevlink`) || e.target.closest(`.${ID}-prevlink`)) {
      e.preventDefault();
      fireEvent(`Click - user has clicked the previous link to ${e.target.id == `${ID}-prevlink` ? `close the popup` : `go back a step`}`);
      if(e.target.id == `${ID}-prevlink`) {
        closePopup();
      } else if(e.target.id == `${ID}-prevlink--step2`) {
        document.querySelector(`.${ID}-popup-outer`).classList.remove(`${ID}-step1complete`);
      } else if(e.target.id == `${ID}-prevlink--step3`) {
        document.querySelector(`.${ID}-popup-outer`).classList.remove(`${ID}-step2complete`);
      }


    }
	});
};

const triggerPopup = () => {
	document.documentElement.classList.add(`${ID}-noscroll`);
	document.querySelector(`.${ID}-popup-outer`).classList.add(`${ID}-active`);
};

const closePopup = () => {
	document.documentElement.classList.remove(`${ID}-noscroll`);
	document.querySelector(`.${ID}-popup-outer`).classList.remove(`${ID}-active`);
  document.querySelector(`.${ID}-popup-outer`).classList.remove(`${ID}-step1complete`)
  document.querySelector(`.${ID}-popup-outer`).classList.remove(`${ID}-step2complete`);
};

const setupClickHandlers = () => {

  let allSpecsCards = document.querySelectorAll('.specs-card');
  [].slice.call(allSpecsCards).forEach((card) => {

    if (card.querySelector('h2')?.innerText.toLowerCase().indexOf('contact lens consultation') > -1) {
      card.addEventListener('click', () => {

        if (VARIATION !== "control") {
          triggerPopup();
        }
        fireEvent(`Click - user has clicked on the contact lens card ${VARIATION == "control" ? `and nothing was changed` : `and the popup was opened`}`, true);
      });
    }

  });


}

// Experiment functions

const startExperiment = () => {

  pollerLite(['#appointment-type_triage', '.specs-card'], () => {
    let numChildElements = document.getElementById('appointment-type_triage').childElementCount;
    if(numChildElements == 4) {
      fireEvent(`Interaction - 4 options present, running experiment`);
      if (!document.querySelector(`.${ID}-popup-outer`) && VARIATION !== "control") {
        console.log(VARIATION);
        insertPopup();
      }

      if (VARIATION !== "control"){
      setupClickHandlers();

      observer.connect(document.getElementById('main'), () => {
        if(document.querySelector('.specs-card')) {
          setupClickHandlers();
        }
        
      }), { childList: true };
    }
    } else {
      fireEvent(`Interaction - Only 3 options present, not running experiment`);
    }
  });
	
  

};

const startConfirmationPageExperiment = () => {
	if (localStorage.getItem(`${ID}-booked-eyetest`) == 'true') {
    fireEvent('Interaction - user has got to confirmation page and will be presented with the rebook section', true);
    let newHref = window.location.href.replace('confirmation', 'appointment-type');
		let newHTML = `
      <div data-v-2919a8bc="" data-v-1d8b7c1b="" id="rebook-appt" class="manage-your-booking-card confirmation-page-template__manage-you-booking-card confirmation-page-template__card">
        <h2 data-v-2919a8bc="" class="manage-your-booking-card__title specs-typography specs-typography--h1 specs-typography--color-text-primary" id="confirmation-page-template_manage-your-booking-card_title">Rebook your contact lens consultation</h2> 
        <h3 data-v-2919a8bc="" class="manage-your-booking-card__section specs-typography specs-typography--h3 specs-typography--color-text-secondary" id="confirmation-page-template_manage-your-booking-card_change-message">Would you like to now rebook for your contact lens consultation and trial? Please note, this trial must be after your eye test booking.</h3>
        <a href="${newHref}" id="${ID}-rebook-button" class="${ID}-rebook-button specs-button specs-labelled-cta-box__cta specs-button--size-small specs-button--contained specs-button--contained-primary specs-button--underline-hover">Rebook Appointment</a>
      </div>`;

    document.getElementById('manage-your-booking-card').insertAdjacentHTML('afterend', newHTML);

    document.getElementById(`${ID}-rebook-button`).addEventListener('click', () => {
      localStorage.setItem(`${ID}-booked-eyetest`, `false`);
      fireEvent('Click - user has clicked to rebook their contact lens appointment',true);
    });

	}
};

export default () => {
	setup();

	logMessage(ID + ' Variation: ' + VARIATION);

	fireEvent('Conditions Met');

	

	if (window.location.href.indexOf('appointment-type') > -1) {
		startExperiment();
	}

  if (window.location.href.indexOf('confirmation') > -1 && VARIATION !== "control") {
    startConfirmationPageExperiment();
  }

	let startURL = window.location.href;

  setInterval(() => {
    if(startURL !== window.location.href) {
      startURL = window.location.href;

      if (startURL.indexOf('appointment-type') > -1) {
        startExperiment();
      } else if (startURL.indexOf('confirmation') > -1 && VARIATION !== "control") {
        startConfirmationPageExperiment();
      }

    }

  }, 500);

};
