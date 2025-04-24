/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import GiftFinder from './components/finderMarkup';
import finderFunctionality from './components/finderFunctionality';

export default () => {
  setup();

  if(shared.VARIATION === '1') {
    new GiftFinder();
    finderFunctionality();

    window.xreinit = () => {
      $('.BO006_giftFinder-wrapper').remove();
      new GiftFinder();
      finderFunctionality();
    };

    // TO DO:
    /**
     * Change the titles when each is clicked
     * Add back button (look at BO001), take most from there
     * style it
     * create price slider
     * hide each one when next one is clicked
     * do the "completed finder" section
     */
  }

};
