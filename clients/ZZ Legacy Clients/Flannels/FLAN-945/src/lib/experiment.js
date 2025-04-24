/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID } = shared;

const processSwatches = (theVariation) => {

  //document.documentElement.classList.add(`${ID}-swatches-hidden`);
  fireEvent(`Interaction - swatches hidden - NO ACTION TAKEN ${theVariation}`);

}

const processImages = (theVariation) => {

  //document.documentElement.classList.add(`${ID}-images-updated`);
  fireEvent(`Interaction - images updated to three in a row - NO ACTION TAKEN ${theVariation}`);

}


const processVariations = (variants) => {

  logMessage("variants to be used");
  logMessage(variants);

  fireEvent(`Conditions Met - variant used: ${variants.variant} changed on page: ${variants.included}`);


  let currVariants = [];
  if(variants.included.includes('|')) {
    currVariants = variants.included.split('|');
  } else {
    currVariants.push(variants.included);
  }

  currVariants.forEach((variant) => {
    if(variant == "swatches") {
      processSwatches(variants.variant);
    } else if(variant == "prodimages") {
      processImages(variants.variant);
    }
  });

}

export default () => {
  setup();


  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    fireEvent('Conditions Met');
    return;
  }

  // Write experiment code here
  // ...

  if(!localStorage.getItem(`${ID}-experiment-variations`) || localStorage.getItem(`${ID}-experiment-variations`) == '') {

    let variants = [

      { 'variant': 'sv1', 'included': 'prodimages' },
      { 'variant': 'sv2', 'included': 'swatches' },
      { 'variant': 'sv3', 'included': 'prodimages|swatches' }

    ];

    let currVariant = variants[variants.length * Math.random() | 0];

    localStorage.setItem(`${ID}-experiment-variations`, JSON.stringify(currVariant));

    processVariations(currVariant);

  } else {

    processVariations(JSON.parse(localStorage.getItem(`${ID}-experiment-variations`)));

  }




};
