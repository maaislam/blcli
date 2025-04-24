/**
 * SG125 - PLP Layout
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.ernestjones.co.uk/webstore/l/ladies-watches/?icid=ej-tn-watches-coll-her
 * https://www.hsamuel.co.uk/webstore/l/watches/recipient%7Chim/?icid=hs-nv-watches-him
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
    setup();
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();
    
    if (sessionStorage.getItem(`${ID}-plpLayoutChange`) == null) {
      // --- Blur page content while awaiting for view change
      document.querySelector('#js-list').classList.add('blur');

      if (VARIATION == '1') {
        /*** @desc LIST VIEW ***/
        document.querySelector('#js-list-display-buttons.list-display-buttons button#list-mode').click();
        // --- Show page content
        document.querySelector('#js-list').classList.add('show');
      } else if (VARIATION == '2') {
        /*** @desc TWO COLUMNS VIEW ***/
        document.querySelector('#js-list-display-buttons.list-display-buttons button#two-column-mode').click();
        document.querySelector('#js-list').classList.add('show');
      } else if (VARIATION == '3') {
        /*** @desc ENLARGED GRID VIEW ***/
        document.querySelector('#js-list-display-buttons.list-display-buttons button#one-column-mode').click();
        document.querySelector('#js-list').classList.add('show');
      }
      const getActiveView = document.querySelector('#js-list-display-buttons button.list-display-buttons__button--active').getAttribute('id');

      /**
       * @desc Observe for any Mobile/Tablet view changes
       */
      observer.connect(document.querySelector('#js-list-display-buttons.list-display-buttons button'), () => {
        let getCurrentActive = document.querySelector('#js-list-display-buttons button.list-display-buttons__button--active').getAttribute('id');
        let selectedGridView = '';
        if (getActiveView !== getCurrentActive) {
          switch(getCurrentActive) {
            case 'list-mode':
              selectedGridView = 'List Mode';
              break;
            case 'two-column-mode':
              selectedGridView = 'Two Column Mode';
              break;
            case 'one-column-mode':
              selectedGridView = 'One Column Mode';
              break;
          } 
          // --- Send GA Event
          events.send(`${ID} - Variation ${VARIATION}`, 'Clicked - Change Grid View', `${selectedGridView}`, { sendOnce: true });
          sessionStorage.setItem(`${ID}-plpLayoutChange`, true);
        }

      }, {
        throttle: 200,
        config: {
          attributes: true,
          childList: false,
          // subtree: true,
        },
      });

    }

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
