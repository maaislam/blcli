/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  // Write experiment code here
  const newMarkup = `
    <div id="${shared.ID}-corona" class="${shared.ID}-corona-popup col-md-12 col-sm-6 col-xs-12">
    <div class="${shared.ID}-corona-popup-inner">
    <span class="${shared.ID}-corona-popup-header">
    <h2 class="${shared.ID}-corona-popup-header__title">Care during the Coronavirus outbreak</h2>
    <p class="${shared.ID}-corona-popup-header__close-btn">&times;</p>
    </span>
    <p>During the coronavirus outbreak, we are still providing quality care to our customers, and we are also able to support new customers if you or a loved one needs help at home.</p>
    <p>We want you to be safe in the knowledge that you're being looked after properly. With that in mind, we have created a webpage for our coronavirus response and frequently asked questions.</p>
    <p class="${shared.ID}-corona-popup-btn-wrap">
    <a href="/coronavirus-information/" class="btn btn-standard btn-block" role="button">  More Information </a>
    <a href="/coronavirus-information/frequently-asked-questions-about-coronavirus/" class="btn btn-standard btn-block" role="button">  Frequently Asked Questions </a>
    </p>
    </div>
    </div>
  `;
  const introElement = document.querySelector('#main');
  if (introElement) {
    introElement.insertAdjacentHTML('beforebegin', newMarkup);
    sessionStorage.setItem(`${shared.ID}-did-see-popup`, 1);
    events.send(`${shared.ID}-${shared.VARIATION}`, 'did-show-popup');
  }

  var popup = document.getElementById(`${shared.ID}-corona`);
  var btn = document.querySelector(`.${shared.ID}-corona-popup-header__close-btn`);

  if (btn) {
    btn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  };

  window.addEventListener("click", () => {
    if(event.target == popup) {
      popup.style.display = "none";
    }
  });

};
