/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, viewabilityTracker } from "../../../../../lib/utils";
import shared from "./shared";

const runChanges = () => {
  const conditionsMet = false;

  const addCTA = () => {
    const markup = `
        <div class="${shared.ID}__add-to-bag">
          ADD TO BAG
        </div>
      `;
    const body = document.querySelector('body');
    body.insertAdjacentHTML('afterbegin', markup);
  }

  // Check for regular sizing variant boxes:
  const variantRow = document.querySelector('.variant-row');
  const colorsRow = document.querySelector('.alt-colors');
  const altVariant = document.querySelector('#id-variants');
  console.log(altVariant);

  if (altVariant) {
    const selected = altVariant.querySelector('[selected="selected"]');
    if(selected) {
      addCTA();
    }
  } else if (variantRow && colorsRow) {
    const selected = variantRow.querySelector('.selected');
    const colorSelected = colorsRow.querySelector('.selected');
    if (selected && colorSelected) {
      addCTA();
    }
  } else if (variantRow) {
    const selected = variantRow.querySelector('.selected');
    if (selected) {
      addCTA();
    }
  } else {
    addCTA();
  }

  pollerLite([
    '.add-to-bag-or-wishlist'
  ], () => {
    const addToBagOrWishlist = document.querySelector('.add-to-bag-or-wishlist');
    const addToBag = addToBagOrWishlist.querySelector('.ajax-submit');
    const newCTA = document.querySelector(`.${shared.ID}__add-to-bag`);
    if (newCTA) {
      viewabilityTracker(addToBag, function() {
        newCTA.classList.add(`${shared.ID}__hidden`);
      }, {
        allElementHasToBeInView: true
      }, () => {
        newCTA.classList.remove(`${shared.ID}__hidden`);
      });
  
      newCTA.addEventListener('click', () => {
        addToBag.click();
      })
    }
  })

}

export default () => {

  const init = () => {
    runChanges();
    setup();
  }

  init();

  // Write experiment code here
};
