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

  if(shared.VARIATION === '1') { 
   const t = document.querySelector('.yruler-popup');
    t.parentNode.removeChild(t);
    window.tangiblee = null;
    const s = document.createElement('script');
    document.body.appendChild(s);
    s.src = 'https://cdn.tangiblee.com/integration/3.1/managed/www.ernestjones.co.uk/revision_1/variation_original/tangiblee-bundle.min.js';
  
    const tangibleeButton = document.querySelector('.tangiblee-button');
    tangibleeButton.addEventListener('click', () => {
      events.send(`${shared.ID} v${shared.VARIATION}`, 'click', 'clicked tangiblee');
    });
  }
};
