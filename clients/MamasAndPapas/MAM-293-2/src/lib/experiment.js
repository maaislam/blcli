/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  let resultsShownMessage = "Pushchair Quiz - results shown";
  logMessage(resultsShownMessage);
  fireEvent(resultsShownMessage, true);

  pollerLite(['.pushchairresults .card_container .prod_link'], () => {

    setTimeout(() => {

      let allResults = document.querySelectorAll('.pushchairresults .card_container .prod_link');

      [].slice.call(allResults).forEach((result) => {

        result.addEventListener('click', (e) => {

          let href = e.target.href;

          let clickMessage = "Pushchair Quiz - Click - User clicked on: "+href+" from the results page";
          logMessage(clickMessage);
          fireEvent(clickMessage, true);

        });

      });

    }, 1000);

  })

  
  
};
