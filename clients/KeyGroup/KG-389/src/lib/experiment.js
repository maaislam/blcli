/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {

  pollerLite(['.top-bar'], () => {

    if(VARIATION !== "control") {
      document.documentElement.classList.add(`${ID}-topbarhidden`);
    }
    
    fireEvent(`Interaction - top bar ${VARIATION == "control" ? "would have been hidden" : "hidden"} to users`, true);

  });


}

export default () => {

  newEvents.initiate = true;
  newEvents.methods = ["ga4"];
  newEvents.property = "G-LNFZ1KRLB8";

  setup();

  fireEvent('Conditions Met');

  // Needed for attribution to Adobe Dynamics - do not remove
  document.documentElement.classList.add(`experimentation-${VARIATION == "control" ? `control` : `variant-${VARIATION}`}`);
  
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();
  
};
