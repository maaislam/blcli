/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage, pollerLite } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID } = shared;

const processVerticalGallery = (variant) => {
  console.log("processing vert gallery");
  document.documentElement.classList.add(`${ID}-vertical-gallery`);
  pollerLite((['#productImageContainer']), () => {
    let productImageContainer = document.getElementById(`productImageContainer`);
    
    productImageContainer.classList.add(`${ID}-disabled`);

    let productImages = productImageContainer.querySelectorAll(`.swiper-slide img`);

    console.log(productImages);

    let newImageHolderHTML = `
    
      <div class="${ID}-image-holder">

        ${productImages.map((image) => {
          
          return `<img src="${image.src}" alt="${image.alt}" />`          
        
        }).join('')}

      </div>
      
    `;

    productImageContainer.insertAdjacentHTML('beforebegin', newImageHolderHTML);

    // NOTHING FURTHER WORKED ON

  });
  





}

const processSizeColour = (variant) => {

}

const processStickyCTA = (variant) => {

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
    if(variant == "verticalgallery") {
      processVerticalGallery(variants.variant);
    } else if(variant == "sizecolour") {
      processSizeColour(variants.variant);
    } else if(variant == "stickycta") {
      processStickyCTA(variants.variant);
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

      { 'variant': 'sv1', 'included': 'verticalgallery' },
      { 'variant': 'sv2', 'included': 'sizecolour' },
      { 'variant': 'sv3', 'included': 'stickycta' },
      { 'variant': 'sv1', 'included': 'verticalgallery|sizecolour' },
      { 'variant': 'sv2', 'included': 'verticalgallery|stickycta' },
      { 'variant': 'sv3', 'included': 'sizecolour|stickycta' },
      { 'variant': 'sv1', 'included': 'verticalgallery|sizecolour|stickycta' },

    ];

    let currVariant = variants[variants.length * Math.random() | 0];

    localStorage.setItem(`${ID}-experiment-variations`, JSON.stringify(currVariant));

    processVariations(currVariant);

  } else {

    processVariations(JSON.parse(localStorage.getItem(`${ID}-experiment-variations`)));

  }




};
