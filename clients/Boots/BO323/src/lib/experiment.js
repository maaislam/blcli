/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { pollerLite, setCookie, getCookie, logMessage, deleteCookie } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import elementTypes from './elementTypes';

const { ID, VARIATION } = shared;
const testID = `${ID}|New Customer Offer: Sign Up and Save`;
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const testIDAndVariant = `${testID}|${testVariant}`;

const startExperiment = () => {

  

    let defaultPageView = window.dataLayer.find((item) => item.event == "defaultPageView");
    let pageType = defaultPageView.page.templateID;
    let pageID = defaultPageView.page.id;

    let currentTimestamp = new Date().getTime();

    let persObj = JSON.parse(localStorage.getItem('ATPersObj'));
    let sessionStamps = persObj.sessionStamps;
    let sessionStampsLength = sessionStamps.length;

    // if the user has no ad card and is new user then set a variable then do this stuff on each page

    let user = defaultPageView.user;
    let adCardFlag = user.advantageCardFlag;
    let customerType = user.type;

    if(adCardFlag == "false" && customerType == "New") {

      

      let oldHomepageTimestampFlag = false;
      let oldAccountPageTimestampFlag = false;

      if (getCookie(`${ID}-closed-homepage-modal`) && (parseInt(getCookie(`${ID}-closed-homepage-modal`)) > sessionStamps[sessionStampsLength - 1])) {
        oldHomepageTimestampFlag = true;
      }

      if (getCookie(`${ID}-closed-acctpage-modal`) && (parseInt(getCookie(`${ID}-closed-acctpage-modal`)) > sessionStamps[sessionStampsLength - 1])) {
        oldAccountPageTimestampFlag = true;
      }

      if (pageType == "HomePage" && pageID == "Beauty | Health | Pharmacy and Prescriptions - Boots" && oldHomepageTimestampFlag == false) {


        // fireEvent(`Conditions Met - user is new and has no ad card - ${VARIATION == "control" ? `would have` : ``} seen modal on homepage`, true);

        if (VARIATION == "control") {
          return;
        }

        let newHomepageHTML = `
      
          <div class="${ID}-modal">

            
            <button class="${ID}-modal--close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 11.2812L3.7188 3L3 3.7188L11.2812 12L3 20.2812L3.7188 21L12 12.7188L20.2812 21L21 20.2812L12.7188 12L21 3.7188L20.2812 3L12 11.2812Z" fill="#333333"/></svg></button>
            
          
            <div class="${ID}-modal--content">
            
              <h2>Sign up & Earn 200 Advantage Card Points</h2>

              <p> New here? Get <span class="${ID}-bold">200 Advantage Card Points</span> on your first order when you create an account on boots.com and sign up to Advantage Card!</p>

              <p> <a href="/information/terms-conditions">T&CS apply.</a></p>

              <div class="${ID}-modal--cta">
                <button class="${ID}-modal--cta--button" id="${ID}-modal--cta--button">Continue</button>
              </div>

            </div>
          
          </div>
        
        `;

        let insertionPoint = document.body;

        insertionPoint.insertAdjacentHTML('afterbegin', newHomepageHTML);
        fireBootsEvent('Pop up modal shown', true, eventTypes.experience_render, {
          render_element: elementTypes.Pop_up,
          render_detail: 'Homepage modal shown'
        });
        
        document.documentElement.classList.add(`${ID}-noscroll`);

        document.body.addEventListener('click', (e) => {

          if (e.target.classList.contains(`${ID}-modal--close`) || e.target.closest(`.${ID}-modal--close`)) {
            document.querySelector(`.${ID}-modal`).remove();
            document.documentElement.classList.remove(`${ID}-noscroll`);
            setCookie(`${ID}-closed-homepage-modal`, currentTimestamp, 1);
            // fireEvent(`Click - user closed modal on homepage`, true);
            fireBootsEvent('Pop up modal closed', true, eventTypes.experience_action, {
              action: actionTypes.close,
              action_detail: 'Homepage modal closed'
            });
          }

          if (e.target.id == `${ID}-modal--cta--button`) {
            document.querySelector(`.${ID}-modal`).remove();
            document.documentElement.classList.remove(`${ID}-noscroll`);
            // fireEvent(`Click - user clicked Continue CTA on homepage modal`, true);
            fireBootsEvent('Pop up modal CTA clicked', true, eventTypes.experience_action, {
              action: actionTypes.click_cta,
              action_detail: 'Homepage modal CTA clicked'
            });
            setCookie(`${ID}-closed-homepage-modal`, currentTimestamp, 1);
            setCookie(`${ID}-inadcardjourney`, 'true', 1);
            window.location.href = "/AdvantageCardApply";
          }

        });

        document.documentElement.addEventListener('click', (e) => {
          if(!e.target.closest(`.${ID}-modal`) && document.documentElement.classList.contains(`${ID}-noscroll`)) {
            document.querySelector(`.${ID}-modal`).remove();
            document.documentElement.classList.remove(`${ID}-noscroll`);
            // fireEvent(`Click - user clicked outside modal on homepage`, true);
            fireBootsEvent('Pop up modal closed', true, eventTypes.experience_action, {
              action: actionTypes.close,
              action_detail: 'Homepage modal closed - clicked outside of modal'
            });
          }
        });

      } else if ((window.location.href.indexOf("AdvantageCardApply") > -1 || window.location.href.indexOf('ApplyAdvantageCardCheck')) && getCookie(`${ID}-inadcardjourney`) == 'true' && oldAccountPageTimestampFlag == false) {

        // fireEvent(`Conditions Met - user is new and has no ad card - ${VARIATION == "control" ? `would have` : ``} seen message on advantage card apply page`, true);

        if (VARIATION == "control") {
          return;
        }

        let newAccountPageHTML = `

          <div class="${ID}-message">

            <button class="${ID}-message--close"><svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 7.2752L3.2248 2L2.5 2.7248L7.7752 8L2.5 13.2752L3.2248 14L8.5 8.7248L13.7752 14L14.5 13.2752L9.2248 8L14.5 2.7248L13.7752 2L8.5 7.2752Z" fill="#333333"/></svg></button>

            <div class="${ID}-message--icon">
              <svg width="17" height="16" viewBx="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="2.Atoms/Icons/Navigation&#38;Action/Info"><g id="Information"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 8C15.5 4.13401 12.366 1 8.5 1C4.63401 1 1.5 4.13401 1.5 8C1.5 11.866 4.63401 15 8.5 15C12.366 15 15.5 11.866 15.5 8ZM2.5 8C2.5 4.68629 5.18629 2 8.5 2C11.8137 2 14.5 4.68629 14.5 8C14.5 11.3137 11.8137 14 8.5 14C5.18629 14 2.5 11.3137 2.5 8Z" fill="#0067B2"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.308 4.28394C9.308 4.75194 8.96 5.08794 8.504 5.08794C8.048 5.08794 7.7 4.75194 7.7 4.28394C7.7 3.83994 8.048 3.49194 8.504 3.49194C8.96 3.49194 9.308 3.83994 9.308 4.28394ZM7.928 11.9999V6.29994H9.08V11.9999H7.928Z" fill="#0067B2"/></g></g></svg>
            </div>
            <div class="${ID}-message--content">
              <h2>Sign up &amp; earn 200 Advantage Card Points</h2>
              <p>Continue and create an account to get 200 points. Valid on baskets over £30.</p>
            </div>
            

          </div>

        `;

        if(window.location.href.indexOf('AdvantageCardApply') > -1) {
          pollerLite([`.heroContentTop`], () => {

            let insertionPoint = document.querySelector('.heroContentTop');
            insertionPoint.classList.add(`${ID}-heroct`);
            insertionPoint.insertAdjacentHTML('afterbegin', newAccountPageHTML);
            fireBootsEvent('Pop up message shown', true, eventTypes.experience_render, {
              render_element: elementTypes.Pop_up,
              render_detail: 'Account page message shown'
            });



          })


        } else if(window.location.href.indexOf('ApplyAdvantageCardCheck') > -1) {
          pollerLite([`#eStore_registration_form`], () => {

            let insertionPoint = document.getElementById('eStore_registration_form');
            insertionPoint.classList.add(`${ID}-heroct`);
            insertionPoint.insertAdjacentHTML('afterbegin', newAccountPageHTML);
            fireBootsEvent('Pop up message shown', true, eventTypes.experience_render, {
              render_element: elementTypes.Pop_up,
              render_detail: 'Account page message shown'
            });


          })
        }
        

        document.body.addEventListener('click', (e) => {

          if (e.target.classList.contains(`${ID}-message--close`) || e.target.closest(`.${ID}-message--close`)) {
            document.querySelector(`.${ID}-message`).remove();
            setCookie(`${ID}-closed-acctpage-modal`, currentTimestamp, 1);
            // fireEvent(`Click - user closed message on account page`, true);
            fireBootsEvent('Pop up message closed', true, eventTypes.experience_action, {
              action: actionTypes.close,
              action_detail: 'Account page message closed'
            });
          }

        });



      }



    } else if(customerType == "New" && adCardFlag == "true") {

      

      if ((getCookie(`${ID}-inadcardjourney`) == 'true')) {
        
        // fireEvent(`Conditions Met - user is new and has signed up for an ad card account - ${VARIATION == "control" ? `would have` : ``} seen message on completion page`);

        if (VARIATION == "control") {
          return;
        }

        let finalPageHTML = `
        
          <div class="${ID}-modal">

            
            <button class="${ID}-modal--close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 11.2812L3.7188 3L3 3.7188L11.2812 12L3 20.2812L3.7188 21L12 12.7188L20.2812 21L21 20.2812L12.7188 12L21 3.7188L20.2812 3L12 11.2812Z" fill="#333333"/></svg></button>
            
          
            <div class="${ID}-modal--content">
            
              <h2>You have successfully signed up to an account. </h2>

              <p> We have added 200 Advantage Card points to your account which will be auto-applied when you go to your basket. </p>

              <div class="${ID}-modal--cta">
                <button class="${ID}-modal--cta--button" id="${ID}-modal--cta--button">Close</button>
              </div>

            </div>
          
          </div>`
        ;

        let insertionPoint = document.body;

        insertionPoint.insertAdjacentHTML('afterbegin', finalPageHTML);
        fireBootsEvent('Pop up modal shown', true, eventTypes.experience_render, {
          render_element: elementTypes.Pop_up,
          render_detail: 'Successful sign up modal shown'
        });
        document.documentElement.classList.add(`${ID}-noscroll`);

        deleteCookie(`${ID}-homepage-modal-closed`);
        deleteCookie(`${ID}-acctpage-modal-closed`);
        deleteCookie(`${ID}-inadcardjourney`);

        //write a fetch function to query an API
        fetch('https://api.uniqodo.com/code/396ef7df2b40d3a7a0b9b8645a8d994d67a7dfb2/25844', {
          method: 'GET',
        })
          .then(response => response.json())
          .then(returnedData => {
            
            logMessage('API Response: ', returnedData);
            let offerCode = returnedData.data.code;

            setCookie('_uqd_param', offerCode);
            setCookie(`${ID}-offer-code-applied`, 'true', 1);
            
          })
          .catch((error) => {
            console.error(error);
          });

        

        document.body.addEventListener('click', (e) => {

          if (e.target.classList.contains(`${ID}-modal--close`) || e.target.closest(`.${ID}-modal--close`)) {
            document.querySelector(`.${ID}-modal`).remove();
            document.documentElement.classList.remove(`${ID}-noscroll`);
            setCookie(`${ID}-closed-adcard-journey`, currentTimestamp, 1);
            // fireEvent(`Click - user closed modal on homepage after signing up to an account, not shown again`, true);
            fireBootsEvent('Click - user closed modal on homepage after signing up to an account, not shown again', true, eventTypes.experience_action, {
              action: actionTypes.close,
              action_detail: 'Homepage modal closed after signing up to an account, not shown again'
            });
          }

          if (e.target.id == `${ID}-modal--cta--button`) {
            document.querySelector(`.${ID}-modal`).remove();
            document.documentElement.classList.remove(`${ID}-noscroll`);
            setCookie(`${ID}-closed-adcard-journey`, currentTimestamp, 1);
            // fireEvent(`Click - user clicked close on Homepage modal CTA after signing up to an account, not shown again`, true);
            fireBootsEvent('Click - user clicked close on Homepage modal CTA after signing up to an account, not shown again', true, eventTypes.experience_action, {
              action: actionTypes.click_cta,
              action_detail: 'Homepage modal CTA clicked after signing up to an account, not shown again'
            });
          }

        });

        document.documentElement.addEventListener('click', (e) => {
          if (!e.target.closest(`.${ID}-modal`) && document.documentElement.classList.contains(`${ID}-noscroll`)) {
            document.querySelector(`.${ID}-modal`).remove();
            document.documentElement.classList.remove(`${ID}-noscroll`);
            setCookie(`${ID}-closed-adcard-journey`, currentTimestamp, 1);
            // fireEvent(`Click - user clicked outside modal on homepage`, true);
            fireBootsEvent('Click - user clicked outside modal on homepage', true, eventTypes.experience_action, {
              action: actionTypes.close,
              action_detail: 'Homepage modal closed - clicked outside of modal'
            });
          }
        });
      }


    }

}

const checkAndApplyCode = () => {
  
  pollerLite(['.oct-offer-code__button'], () => {
    setTimeout(() => {
      if(VARIATION !== "control") {
        document.querySelector('.oct-offer-code__button').click();
        setCookie(`${ID}-offer-code-applied`, 'false')
        fireBootsEvent('Interaction - code auto-applied', true, eventTypes.experience_action, {
          action: actionTypes.view,
          action_detail: 'Offer code auto-applied'
        });
      }
      
      // fireEvent(`Interaction - code ${VARIATION == "control" ? `would have been` : `was`} auto-applied`, true);
    }, 500);
  });
  
}

export default () => {

  bootsEvents.initiate = true;
	bootsEvents.methods = ["datalayer"];
	bootsEvents.property = "G-C3KVJJE2RH"; 
	bootsEvents.testID = testIDAndVariant;

  setup();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  pollerLite([
    () => {
      if (window.dataLayer.find((item) => item.event == "defaultPageView")) {
        return true;
      }
    },
    () => {
      if (localStorage.getItem('ATPersObj')) {
        return true;
      }
    }
  ], () => {

    let persObj = JSON.parse(localStorage.getItem('ATPersObj'));
    let sessionStamps = persObj.sessionStamps;
    let sessionTimestampFromToday = false;

    sessionStamps.forEach((stamp) => {
      if (stamp > new Date().setHours(0, 0, 0, 0)) {
        sessionTimestampFromToday = true;
      }
    });

    if(sessionTimestampFromToday) {
      startExperiment();
    }
  });


  if(getCookie(`_uqd_param`) && getCookie(`${ID}-offer-code-applied`) == "true") {
    document.body.addEventListener('click', (e) => {

      if (e.target.classList.contains(`oct-iconButton`) || e.target.closest('.oct-iconButton')) {
        checkAndApplyCode();
      }

      if ((e.target.classList.contains(`.oct-notification__ctas_left`) || e.target.closest('.oct-notification__ctas_left')) && e.target.closest('#oct-notification-container')) {
        checkAndApplyCode();
      }

    });
  }

};