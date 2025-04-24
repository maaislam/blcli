/**
 * PJ101 - How many are you feeding today?
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const activate = () => {
  if (sessionStorage.getItem(`${shared.ID}-questionnaire`) == null) {
    setup();
    // Write experiment code here
    // console.log(`${shared.ID} is RUNNING`);
    const mainContent = document.querySelector('.main');
    // mainContent.setAttribute('style', 'margin-top: 125px;');
    const newContent = `<div class="${shared.ID}-banner__wrapper nearestStore" style="padding: 25px 0 20px 0;">	
      <div class="${shared.ID}-banner__content">
        <h2>How many people are you feeding today?</h2>
        <ul class="${shared.ID}-button__wrapper">
          <li class="${shared.ID}-btn" data-value="one-person">
            <span class="${shared.ID}-icon"></span>
            <span class="${shared.ID}-text">1 Person</span>
          </li>
          <li class="${shared.ID}-btn" data-value="two-people">
            <span class="${shared.ID}-icon"></span>
            <span class="${shared.ID}-icon"></span>
            <span class="${shared.ID}-text">2 People</span>
          </li>
          <li class="${shared.ID}-btn" data-value="three-people">
            <span class="${shared.ID}-icon"></span>
            <span class="${shared.ID}-icon"></span>
            <span class="${shared.ID}-icon"></span>
            <span class="${shared.ID}-text">3 People</span>
          </li>
          <li class="${shared.ID}-btn" data-value="four-people">
            <span class="${shared.ID}-icon"></span>
            <span class="${shared.ID}-icon"></span>
            <span class="${shared.ID}-icon"></span>
            <span class="${shared.ID}-icon"></span>
            <span class="${shared.ID}-text">4 People</span>
          </li>
          <li class="${shared.ID}-btn" data-value="five-or-more">
            <span class="${shared.ID}-icon hidden"></span>
            <span class="${shared.ID}-text" style="margin-left: -10px;">5 People or More</span>
          </li>
        </ul>
        
      </div>
      <div class="${shared.ID}-greenButton greenButton">
        <span class="leftB"></span>
        <span class="centerB">Continue</span>
        <span class="rightB"></span>
      </div>
      <div class="clearFix"></div>
    </div>`;

    mainContent.insertAdjacentHTML('afterbegin', newContent);


    // --- Buttons Event Listener
    const ctaButtons = document.querySelectorAll(`li.${shared.ID}-btn`);
    [].forEach.call(ctaButtons, (btn) => {
      btn.addEventListener('click', (e) => {
        if (document.querySelector(`.${shared.ID}-btn.active`)) {
          document.querySelector(`.${shared.ID}-btn.active`).classList.remove('active');
        }

        btn.classList.add('active');
      });
    });

    const submitCta = document.querySelector(`.${shared.ID}-greenButton`);
    submitCta.addEventListener('click', (e) => {
      if (document.querySelector(`.${shared.ID}-btn.active`)) {
        const value = document.querySelector(`.${shared.ID}-btn.active`).getAttribute('data-value');

        document.querySelector(`.${shared.ID}-banner__content`).innerHTML = `<h2 class="${shared.ID}-thank-you-msg">Thanks</h2>
        <span class="${shared.ID}-check"></span>
        </br><p style="margin-top: 20px;">Enjoy!</p>`;

        submitCta.setAttribute('style', 'display: none;');
        events.send(`${shared.ID}`, `user selection`, `${value}`, { sendOnce: true });

        sessionStorage.setItem(`${shared.ID}-questionnaire`, 'shown');
      }
    });
  }
};


export default activate;
