/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, share} from './services';
import shared from './shared';
import {markup, markupV2} from './component.js/markup';

export default () => {
  setup();

  if(shared.VARIATION === '1') {
    const navMarkup = markup;

    // insert after offers
    document.querySelector('#topLevelLink_2357689').parentNode.insertAdjacentHTML('afterend', navMarkup);
  }

  if(shared.VARIATION === '2') {
    const navLink = markupV2;
    document.querySelector('#topLevelLink_2357689').parentNode.insertAdjacentHTML('afterend', navLink);
  }
};
