/**
 * SS-203 - PVQ (pre-visit questionnaire) cross-sell v1.0
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * live chat example: https://specsavers.egain.cloud/system/templates/chat/templateE/chat.html?entryPointId=1031&templateName=kiwi&languageCode=en&countryCode=US&ver=v11&offercorrelationid=586820403&interactionid=27301950&aId=EG10316610&sId=C37ac12a3e-2a41-45ca-a81b-bb91da8badc8&uId=A41340d034-8007-44a0-9fb6-384f11e59e6b&eglvrefname=&eglvPriorityChat=false&referer=https%3A%2F%2Fwww.specsavers.co.uk%2Fhelp-and-faqs%2Fask-the-optician&
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from '../../../../../core-files/shared';
import { showLightbox } from './helpers';
import data from './data';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  const dob = sessionStorage.getItem(`${ID}-dob`);
  const discussion = sessionStorage.getItem(`${ID}-hearingDiscussion`);
  const problems = sessionStorage.getItem(`${ID}-problemsWithHearing`);

  if(location.href.indexOf('appointment-triage-questionnaire/thank-you') > -1 && dob && problems != null) {

    let over60 = true;
    if(dob && !isNaN(new Date(dob)) && ((new Date()) - (new Date(dob))) < 1893419690000) {
      over60 = false;
    }

    let simplifiedEvent = [over60 ? 'Over 60' : 'Under 60', `Problems: ${problems == 1 ? 'Yes' : 'No'}`];

    if(discussion == null) {
      simplifiedEvent.push('Discussion: Null');
    } else if(discussion == 1) {
      simplifiedEvent.push('Discussion: Yes');
    } else {
      simplifiedEvent.push('Discussion: No');
    }

    fireEvent(simplifiedEvent.join(' | '));
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  clearInterval(window.ss203dobInterval);
  
  let url = window.location.pathname;
  if (url == '/appointment-triage-questionnaire' || url == '/appointment-triage-questionnaire/') {
    // Capture DOB
    window.ss203dobInterval = setInterval(function() {
      const day = document.querySelector('[name="submitted[date_of_birth][day]"]');
      const month = document.querySelector('[name="submitted[date_of_birth][month]"]');
      const year = document.querySelector('[name="submitted[date_of_birth][year]"]');

      if(day?.value && month?.value && year?.value) {
        sessionStorage.setItem(`${ID}-dob`, `${year.value}-${('0' + month.value).substr(-2)}-${('0' + day.value).substr(-2)}`);
      }
    }, 1000);

    // Questions
    let q1 = 0;
    let q2 = 0;
    let secondHearingQ = document.querySelector('.form-item.webform-component.webform-component-radios.webform-component--would-you-like-to-discuss-your-hearing-with-us.form-group.form-item.form-item-submitted-would-you-like-to-discuss-your-hearing-with-us.form-type-radios.form-group');
    let qStyle = '';
    let discussHearingYes = secondHearingQ.querySelector('input#edit-submitted-would-you-like-to-discuss-your-hearing-with-us-1');
    let discussHearingNo = secondHearingQ.querySelector('input#edit-submitted-would-you-like-to-discuss-your-hearing-with-us-2');
    observer.connect(secondHearingQ, () => {
      qStyle = secondHearingQ.getAttribute('style');
      if (qStyle == 'display: block;') {
        q1 = 1;
        
        if (!discussHearingYes.classList.contains(`${ID}-ga-tracking`)) {
          discussHearingYes.addEventListener('click', (e) => {
            q2 = 1;
            sessionStorage.setItem(`${ID}-hearingDiscussion`, q2);
            fireEvent(`Click - 'Would you like to discuss your hearing with us?' - Yes`);
          });
          discussHearingYes.classList.add(`${ID}-ga-tracking`)
        }

        if (!discussHearingNo.classList.contains(`${ID}-ga-tracking`)) {
          discussHearingNo.addEventListener('click', (e) => {
            q2 = 0;
            sessionStorage.setItem(`${ID}-hearingDiscussion`, q2);
            fireEvent(`Click - 'Would you like to discuss your hearing with us?' - No`);
          });
          discussHearingNo.classList.add(`${ID}-ga-tracking`)
        }

      } else if (qStyle == 'display: none;') {
        q1 = 0;
      }

      sessionStorage.setItem(`${ID}-problemsWithHearing`, q1);
      if (q1 == 1) {
        fireEvent(`Click - 'Have you noticed any problems with your hearing?' - Yes`);
      } else if (q1 == 0) {
        fireEvent(`Click - 'Have you noticed any problems with your hearing?' - No`);
      }
      
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        // subtree: true,
      },
    });
  } else if (url == '/appointment-triage-questionnaire/thank-you' && sessionStorage.getItem(`${ID}-problemsWithHearing`) == 1) {
    const dob = sessionStorage.getItem(`${ID}-dob`);
    if(dob && !isNaN(new Date(dob)) && ((new Date()) - (new Date(dob))) < 1893419690000) {
      // less than 60 years old, return
      return;
    }

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if(VARIATION == 'control') {
      return;
    }
    
    let sectionHeader = '';
    let obj;
    if (sessionStorage.getItem(`${ID}-hearingDiscussion`) == 1) {
      sectionHeader = 'Got some questions about your hearing too?';
      obj = data['yes'];
    } else if (sessionStorage.getItem(`${ID}-hearingDiscussion`) == '0' || !sessionStorage.getItem(`${ID}-hearingDiscussion`)) {
      sectionHeader = 'Find out more about your hearing';
      obj = data['no'];
    }

    let customerOptionsSection = `<section class="${ID}-customer-options">
      <div class="${ID}-section-title">
        <h4>${sectionHeader}</h4>
      </div>
      <ul class="${ID}-options">
      </ul>
    </section>`;

    document.querySelector('#columns').insertAdjacentHTML('afterbegin', customerOptionsSection);

    let customerOptions = '';
    
    for (let i = 0; i < 3; i+=1) {
      customerOptions += `<li class="SS-203-option">
        <div class="sib-icon-and-content-blocks__block-inner">
          <div class="sib-icon-and-content-blocks__block-icon">
            <img class="b-lazy b-loaded" src="${obj[i]['img']}"></div>
            <div class="sib-icon-and-content-blocks__block-content">
              <h5>${obj[i]['header']}</h5>
              <div class="dev-section">
                <p>${obj[i]['desc']}</p>
              </div>
            </div>
          </div>
          ${obj[i]['btn']}
        </div>
      </li>`;
    }

    if (customerOptions !== '') {
      document.querySelector(`.${ID}-customer-options ul.${ID}-options`).insertAdjacentHTML('afterbegin', customerOptions);
    }

    pollerLite([`.${ID}-btn#let-us-know`], () => {
      const lightbox = `<div class="${ID}-lightbox__wrapper hidden">
        <div class="${ID}-overlay"></div>
        <div class="${ID}-lightbox__container">
          <span class="${ID}-closeIcon"></span>
          <h4>Thanks for letting us know</h4>
          <p>We’ll be sure to speak with you about your hearing concerns when you visit for your eye test.</p>
          <div class="${ID}-btn__wrapper"><span class="${ID}-btn" id="${ID}-close-btn">Close &amp; continue</span></div>
        </div>
      </div>`;

      document.querySelector('body').insertAdjacentHTML('afterbegin', lightbox);
    });
    
    // --- GA Tracking Events
    const allButtons = document.querySelectorAll(`.${ID}-btn`);
    if (allButtons.length > 0) {
      [].forEach.call(allButtons, (btn) => {
        let btnID = btn.getAttribute('id');
        btn.addEventListener('click', (e) => {
          fireEvent(`Click - CTA ${btnID}`);

          if (btnID == 'let-us-know') {
            fireEvent(`Conditions Met - Talk to us in store > Let us know`);
            setTimeout(() => {
              showLightbox();
            }, 300);
            
          }

          let liveChat = 'https://specsavers.egain.cloud/system/templates/chat/templateE/chat.html?entryPointId=1031&amp;templateName=kiwi&amp;languageCode=en&amp;countryCode=US&amp;ver=v11&amp;offercorrelationid=586820403&amp;interactionid=27301950&amp;aId=EG10316610&amp;sId=C37ac12a3e-2a41-45ca-a81b-bb91da8badc8&amp;uId=A41340d034-8007-44a0-9fb6-384f11e59e6b&amp;eglvrefname=&amp;eglvPriorityChat=false&amp;referer=https%3A%2F%2Fwww.specsavers.co.uk%2Fhelp-and-faqs%2Fask-the-optician&amp;';
          if (btnID == 'chat-now') {
            window.open(liveChat, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=380,height=600');
          }
          
          
        });
      });
    }
  } else if (url == '/appointment-triage-questionnaire/thank-you' && sessionStorage.getItem(`${ID}-problemsWithHearing`) == 0) {
    const dob = sessionStorage.getItem(`${ID}-dob`);
    if(dob && !isNaN(new Date(dob)) && ((new Date()) - (new Date(dob))) < 1893419690000) {
      // less than 60 years old, return
      return;
    }

    fireEvent(`Conditions Met - 'Have you noticed any problems with your hearing?' - No`);

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if(VARIATION == 'control') {
      return;
    }
  }

  
};


