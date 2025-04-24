/**
 * HC020 - PDP imagery
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, generateNewPageContent, moveElementsOnPage, createDeliveryGiftingLightbox } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import data from './data';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  // console.log(`${ID} is RUNNING >>>`);
  // --- GET PAGE ID
  const pathname = window.location.pathname;
  const pageID = pathname.replace('/uk/', '').replace('.html', '');
  // --- GET ALL IMAGES
  const allImages = document.querySelectorAll('#thumbnails .thumb a');
  let productImages = [];
  for (let i = 0; i < allImages.length; i += 1) {
    const img = allImages[i];
    if (productImages.indexOf(`${img.href}`) == -1) {
      productImages.push(`${img.href}`);
    }
    
  }

  // --- GENERATE NEW PAGE CONTENT
  generateNewPageContent(productImages,data, pageID);
  
  // --- MOVE ELEMENTS ON PAGE
  moveElementsOnPage();

  // --- CREATE DELIVERY/GIFTING LIGHTBOX
  createDeliveryGiftingLightbox();
  
  // At end of code, reset window.einstein expect type array
  window.einstein.loaded = [];
};
