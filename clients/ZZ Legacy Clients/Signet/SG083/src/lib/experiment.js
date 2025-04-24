/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events, pollerLite } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
  setup();
  
  const tangibleeButton = document.querySelector('.tangiblee-button');

  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');

    pollerLite(['.tangiblee-modal-overlay'], () => {
      events.send(`${ID} - Variation - control`, 'Click', 'Tangiblee button');
    }, {
      wait: 200,
      multiplier: 1
    });
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    const addTangibleeScript = () => {
      var s = document.createElement('script'), t = document.getElementsByTagName('body').item(0); 
      s.async = true; 
      s.id = 'tangiblee-integration';

      if(getSiteFromHostname() == 'ernestjones') {
        s.src = "//cdn.tangiblee.com/integration/3.1/managed/www.ernestjones.co.uk/revision_2/variation_ar_ux/tangiblee-bundle.min.js";
      } else if(getSiteFromHostname() == 'hsamuel') {
        s.src = "//cdn.tangiblee.com/integration/3.1/managed/www.hsamuel.co.uk/revision_2/variation_ar_ux/tangiblee-bundle.min.js";
      }
   
      t.appendChild(s);
    }

    addTangibleeScript();

    pollerLite(['.tangiblee-modal-overlay'], () => {
      events.send(`${ID} - Variation: ${VARIATION}`, 'Click', 'Tangiblee button');
    }, {
      wait: 200,
      multiplier: 1
    });
  }
};
