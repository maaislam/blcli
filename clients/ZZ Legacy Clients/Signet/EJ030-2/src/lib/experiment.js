/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite, events } from '../../../../../lib/utils';

export default () => {
  setup();

  events.send(`EJ030 Tangiblee Off`, 'fired');

  (function (d) {
    var s = d.createElement('script'), t = d.getElementsByTagName('body').item(0); s.async = true; s.id = 'tangiblee-integration';
    s.src = "//cdn.tangiblee.com/integration/3.1/managed/www.ernestjones.co.uk/revision_1/variation_off/tangiblee-bundle.min.js";
    t.appendChild(s);
}(document));
  
    const tangibleeButton = document.querySelector('.tangiblee-button');
    tangibleeButton.addEventListener('click', () => {
      events.send(`${shared.ID} v${shared.VARIATION}`, 'click', 'clicked tangiblee');
    });
};
