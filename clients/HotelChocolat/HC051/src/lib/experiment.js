/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import PageMarkup from './markup';
import Summary from './summaryBox';
import { addColours, addFlakes, updateQTY } from './optionsData';
import stepLogic from './stepLogic';
import video from './video';
import addedToBasketBox from './addedToBasketBox';

export default () => {
  const { ID, VARIATION } = shared;


  // put all markup to the left and put fixed tab on the right, make it scroll when you reach the top
  //wrap whole thing in one div then add price box after it and use flex to put it in two two columns

  setup();
  new PageMarkup();

  window.KlarnaOnsiteService = window.KlarnaOnsiteService || []  
  window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' })

  //add overlay
  document.body.insertAdjacentHTML('beforeend',`<div class="${ID}-summaryOverlay"></div>`);


  addColours();
  addFlakes();
  new Summary();
  stepLogic();
  updateQTY();
  video();

  if(window.location.href.indexOf('?addtobasket=true') > -1 && sessionStorage.getItem(`${ID}-productsAdded`)) {
    addedToBasketBox();
  }

};
