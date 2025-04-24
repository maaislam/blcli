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
  events.send(`${shared.ID}-${shared.VARIATION}`, 'did-meet-conditions');
  if(shared.VARIATION == 'control') {
    return;
  };
  setup();

  // Write experiment code here
  const newMarkup = `
    <div class="${shared.ID}-corona-message col-md-12 col-sm-6 col-xs-12">
    <div class="${shared.ID}-corona-message-inner">
    <h2>Care during the Coronavirus outbreak</h2>
    <p>We are still providing quality care to our customers and we can also support new customers if you or a loved one needs help at home.</p>
    <p>Our carers can help with:</p>
    <ul>
    <li>Shopping</li>
    <li>Collecting medication</li>
    <li>Household duties</li>
    <li>Personal care</li>
    </ul>
    <p>We've also put together a webpage for our coronavirus response and frequently asked questions.</p>
    <p class="${shared.ID}-buttons-wrap">
    <a href="/about-us/contact-us/request-a-callback/" class="btn btn-standard" role="button">  Request a Callback </a>
    <a href="/coronavirus-information/frequently-asked-questions-about-coronavirus/" class="btn btn-standard" role="button">  Frequently Asked Questions </a>
    </p>
    </div>
    </div>
  `;
  const introElement = document.querySelector('#intro');
  if (introElement) {
    introElement.insertAdjacentHTML('beforebegin', newMarkup);
  }
};
