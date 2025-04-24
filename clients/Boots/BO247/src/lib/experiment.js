/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

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
  if(VARIATION === '1') {
    if(window.location.href.indexOf('wcs/stores/servlet/BootsLogonForm') > -1) {
      const loginBox = `
      <div class="${ID}-root">
        <div class="${ID}-benefits">
          <h3>Join Boots Parenting Club</h3>
          <ul>
            <li>Enjoy an array of expert parenting advice</li>
            <li>Earn parenting club points to spend on selected items</li>
            <li>Parenting Club offers via the Boots app</li>
            <li>Free gifts at key stages of your baby's development</li>
          </ul>
        </div>
        <div class="${ID}-accountCheck">
          <div class="${ID}-check">
            <h4>Do you have a Boots.com account?</h4>
            <div class="${ID}-radios">
              <p>
                <input type="radio" id="yes" name="radio-group" value="yes">
                <label for="yes">Yes</label>
              </p>
              <p>
                <input type="radio" id="no" name="radio-group" value="no">
                <label for="no">No</label>
              </p>
            </div>
          </div>
          <div class="${ID}-login"></div>
        </div>
      </div>`;

      document.querySelector('.sign_in_registration').insertAdjacentHTML('afterbegin', loginBox);

      document.querySelector(`.${ID}-login`).appendChild(document.querySelector('#gigyaLoginDiv_content'));


      const radios = document.querySelectorAll(`.${ID}-radios input[name="radio-group"]`);

      for (let i = 0; i < radios.length; i+= 1) {
        radios[i].addEventListener("change", function() {
          const val = this.value; 
          if(val === 'yes') {
            fireEvent('Clicked has account');
            document.querySelector(`.${ID}-root`).classList.add('hasAccount');
          } else {
            fireEvent('Clicked no account');
            document.querySelector(`.${ID}-root`).classList.remove('hasAccount');
            window.location.href = 'https://www.boots.com/UserRegistrationForm?myAcctMain=&new=Y&catalogId=28501&langId=-1&storeId=11352';
          }
        });
      }
    } 
  }

  if(VARIATION === '2') {
    if(window.location.href.includes('parenting-club') > -1) {

      const popUp = `<div class="${ID}-overlay"></div>
      <div class="${ID}-popup">
        <div class="${ID}-close"></div>
        <div class="${ID}-inner">
          <h3>Join Boots Parenting Club</h3>
          <p>Sign in to your Boots.com account to join Parenting club or sign up for a Boots.com account</p>
          <div class="${ID}-ctas">
            <a href="https://www.boots.com/webapp/wcs/stores/servlet/BootsLogonForm?myAcctMain=1&catalogId=28501&storeId=11352&langId=-1&krypto=HvfDKJnIYJf7oWQjqKZU92D%2FFoS1K2RuUt1qsOVv2VaHEdxmQI%2BsHGan8WVayzB5Ewd%2Fk%2B6UumzKCH1qK2p8ueqAS1l5BVd2VkqEknpHX8QS7a9N8va8%2FH3rHuEglngl" class="${ID}-btn primary">Sign in</a>
            <a href="https://www.boots.com/UserRegistrationForm?myAcctMain=&new=Y&catalogId=28501&langId=-1&storeId=11352" class="${ID}-btn secondary">Sign up</a>
          </div>
        </div>
      </div>`;

      document.body.insertAdjacentHTML('beforeend', popUp);


      const showPopUp = () => {
        fireEvent('Saw pop up');
        document.documentElement.classList.add(`${ID}-noScroll`)
        document.querySelector(`.${ID}-overlay`).classList.add('show');
        document.querySelector(`.${ID}-popup`).classList.add('show');
      }

      const hidePopUp = () => {
        document.documentElement.classList.remove(`${ID}-noScroll`)
        document.querySelector(`.${ID}-overlay`).classList.remove('show');
        document.querySelector(`.${ID}-popup`).classList.remove('show');
      }

      const allSignUps = document.querySelectorAll('a[href="https://www.boots.com/JoinClub?club=parentingclub&storeId=11352"]');
      for (let index = 0; index < allSignUps.length; index += 1) {
        const element = allSignUps[index];
        element.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();

          showPopUp();
        });
      }
      const allSignUp = document.querySelectorAll('a[href^="https://www.boots.com/webapp/wcs/stores/servlet/BootsLogonForm?"]');
      for (let index = 0; index < allSignUp.length; index += 1) {
        const element = allSignUp[index];
        element.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();

          showPopUp();
        });
      }

      document.querySelector(`.${ID}-close`).addEventListener('click', () => {
        hidePopUp();
      });
      document.querySelector(`.${ID}-overlay`).addEventListener('click', () => {
        hidePopUp();
      }); 

      document.querySelector(`.${ID}-ctas .${ID}-btn.primary`).addEventListener('click', (e) => {
        fireEvent('Clicked sign in');
      });
      document.querySelector(`.${ID}-ctas .${ID}-btn.secondary`).addEventListener('click', (e) => {
        fireEvent('Clicked sign up');
      });
    }
  }
};
