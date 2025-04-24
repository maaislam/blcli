/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, observer, pollerLite, getCookie, setCookie } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;


const startExperiment = () => {
  pollerLite(['#main', 'form.formSearchWidget'], () => {
    let newElementHTML = `

      

      <div class="${ID}-new-header">

        <div class="${ID}-new-header--inner">
          <h2>Over 1 million rooms for £38 or less!</h2>
          <h3>Stay more, see more, do more</h3>
        <div>

      </div>

    `;

    document.getElementById('main').insertAdjacentHTML('beforebegin', newElementHTML);
    document.getElementById('main').classList.add(`${ID}-main`);
    document.getElementById('main').querySelector('form.formSearchWidget').classList.add(`${ID}-form`);

    if(window.outerWidth < 600) {
      document.getElementById('modalSearch').querySelector('.formSearchWidget').classList.add(`${ID}-mobile-form`);
      document.getElementById('modalSearch').querySelector('.fieldLocation > label').classList.remove(`sr-only`);

      pollerLite(['.c-subscription-form', '.c-subscription-form__dismiss'], () => {

        let notificationForm = document.querySelector('.c-subscription-form');
        let notificationFormDismiss = document.querySelector('.c-subscription-form__dismiss');
        

        notificationFormDismiss.addEventListener('click', () => {

          setCookie(`${ID}-form-dismissed`, `true`);
          document.documentElement.classList.add(`${ID}-notificationshidden`);
          fireEvent(`Click - user has clicked on the close X to dismiss the popups`, true);

        });

        if (getCookie(`${ID}-form-dismissed`) == 'true') {
          document.documentElement.classList.add(`${ID}-notificationshidden`);
          fireEvent(`Interaction - the cookie is set to true so both popups are hidden`, true);
        }

        document.body.addEventListener('click', (e) => {

          if (e.target.closest('input[name="location"]') && e.target.closest(`.${ID}-form`)) {
            setCookie(`${ID}-form-dismissed`, `true`);
            document.documentElement.classList.add(`${ID}-notificationshidden`);
            fireEvent(`Click - user has clicked on the destination field - the notification/newsletter field are now hidden`, true);
          }

        });

      });

      

      

    }

    // replacing icons

    pollerLite(['.labelIconRoom', '.iPerson', '#mRoom', '#mGuest'], () => {
      document.querySelector('.labelIconRoom').innerHTML = `<svg width="25" height="17" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 12.2037V17.3344H27.4713V12.2037C27.4713 12.2037 25.6227 8.05591 14.2357 8.05591C9.10781 8.05591 5.9147 8.89607 3.95128 9.82188C1.55746 10.9516 1 12.2037 1 12.2037V12.2037Z" stroke="#464646" stroke-width="1.54616" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.76953 9.81782V5.01747C3.76953 5.01747 6.23303 1.36725 14.2343 1.1103C20.391 0.914539 24.0842 5.01747 24.0842 5.01747V9.63429" stroke="#464646" stroke-width="1.54616" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.79102 8.61051C7.79102 8.61051 10.9554 2.45611 14.1896 8.064" stroke="#464646" stroke-width="1.54616" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.3932 8.61051C20.3932 8.61051 17.4255 2.45611 14.1914 8.064" stroke="#464646" stroke-width="1.54616" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.875 17.3793V19.7774L7.04337 17.3303" stroke="#464646" stroke-width="1.54616" stroke-linecap="round" stroke-linejoin="round"/><path d="M24.307 17.3793V19.7774L22.1387 17.3303" stroke="#464646" stroke-width="1.54616" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      document.querySelector('.iPerson').insertAdjacentHTML('beforebegin', `<svg width="17" height="17" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5996 10.2722C15.1204 9.19548 16.0262 7.31938 15.686 5.25568C15.354 3.22461 13.7513 1.53612 11.7264 1.11604C8.40211 0.422704 5.47132 2.93096 5.47132 6.11624C5.47132 7.83327 6.32391 9.35046 7.63149 10.2763C7.98811 10.5291 7.87744 11.0716 7.46754 11.2225C3.96699 12.499 1.4707 15.8393 1.4707 19.7628H19.7563C19.7563 15.8393 17.26 12.495 13.7595 11.2225C13.3496 11.0716 13.243 10.5291 13.5996 10.2763V10.2722Z" stroke="#464646" stroke-width="1.54616" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
      document.querySelector('.iPerson').remove();
      let numRooms = document.getElementById('mRoom').value;
      let numGuests = document.getElementById('mGuest').value;
      document.getElementById('mRoom').insertAdjacentHTML('afterend', `<span class="${ID}-roomtext">room${numRooms > 1 ? `s` : ``}</span>`);
      document.getElementById('mGuest').insertAdjacentHTML('afterend', `<span class="${ID}-guesttext">guest${numGuests > 1 ? `s` : ``}</span>`);
      document.querySelector('input[name="location"]').setAttribute('placeholder', 'Place, postcode or hotel name...');

      let interval;
      let roomGuestWrapNode = document.querySelector('.roomGuestWrap');
      observer.connect(roomGuestWrapNode, () => {

        if(roomGuestWrapNode.classList.contains('active')) {
          interval = setInterval(() => {
            let newNumRooms = document.getElementById('mRoom').value;
            let newNumGuests = document.getElementById('mGuest').value;
            if ((numRooms !== newNumRooms) || (numGuests !== newNumGuests)) {

              document.querySelector(`.${ID}-roomtext`).innerHTML = `room${newNumRooms > 1 ? `s` : ``}`;
              document.querySelector(`.${ID}-guesttext`).innerHTML = `guest${newNumGuests > 1 ? `s` : ``}`;
            }


          }, 1);
        } else {
          clearInterval(interval)
        }
        


      });


    });

    if (VARIATION == 2) {
      let uspHTML = `

        <div class="${ID}-uspbar">

          <div class="${ID}-usp">

            <div class="${ID}-usp--icon"></div>
            <div class="${ID}-usp--text">
              <p>${window.outerWidth < 600 ? `<span>595 hotels</span> in great locations` : `<span>595 hotels</span> in great locations in all major cities, and near to air, ferry, rail and road hubs.`}</p>
            </div>

          </div>

          <div class="${ID}-usp">

            <div class="${ID}-usp--icon"></div>
            <div class="${ID}-usp--text">
              <p>${window.outerWidth < 600 ? `Flexible rate with <span>free cancellation</span>` : `Saver rate or flexible rate with <span>free cancellation.</span>`}</p>
            </div> 

          </div>            

          <div class="${ID}-usp">

            <div class="${ID}-usp--icon"></div>
            <div class="${ID}-usp--text">
              <p>${window.outerWidth < 600 ? `<span>Unlimited breakfast</span> from £8.99` : `Next-generation rooms with a <span>new contemporary look</span>, comfy king size Dreamer&trade; bed`}</p>
            </div>     

          </div>

          
        

        </div>  
      
      `;

      pollerLite([`.${ID}-form`], () => {

        document.querySelector(`.${ID}-form`).insertAdjacentHTML('afterend', uspHTML);

      })
    }

    fireEvent(`Visible - test shown on page`, true);


  });

}

const addTracking = () => {

  document.body.addEventListener('click', (e) => {

    if (e.target.closest('input[name="location"]')) {
      fireEvent('Click - Destination input clicked on', true);
    } else if (e.target.closest('.fieldCheckIn')) {
      fireEvent('Click - Check in date input clicked on', true);
    } else if (e.target.closest('.fieldCheckOut')) {
      fireEvent('Click - Check out date input clicked on', true);
    } else if (e.target.closest('.btnSubmitSearch')) {
      fireEvent('Click - Search button clicked on', true);
    } 
  });

  pollerLite(['.roomGuestWrap'], () => {
    observer.connect(document.querySelector('.roomGuestWrap'), () => {
      fireEvent(`Click - Room & guest input clicked on, current selection ${document.getElementById('mRoom').value} rooms ${document.getElementById('mGuest').value} guests`, true);
    },
      {
        config: {
          attibutes: true,
          childList: false,
          subTree: false
        }
      });
  });
  
      

}

export default () => {
	setup();

	logMessage(ID + ' Variation: ' + VARIATION);

	fireEvent('Conditions Met');

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

  if(window.location.href.indexOf('search/results') > -1) {

    fireEvent('Interaction - user has reached the search page', true);

  } else if (window.location.href.indexOf('/hotels/') > -1) {

    fireEvent(`Interaction - user has reached the hotel page ${window.location.href}`,true);

  } else {

    addTracking();
    fireEvent(`Interaction - user has reached the homepage${VARIATION !== "control" ? `, experiment displayed` : ``}`, true);
    if(VARIATION !== "control") {
      startExperiment();
    }
    

  }
	
};

