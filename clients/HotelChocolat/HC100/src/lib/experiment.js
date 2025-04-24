import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { addYTapi, elementInViewport, klarnaAdditon, reviewSmoothScroll, runYoutube } from './helpers';

import options from './components/options';
import pageChanges from './components/pageChanges';
import MainImageCarousel from './components/imageCarousel';
import uspCircles from './components/uspCircles';
import ProductTabs from './components/productTabs';
import addedToBag from './components/addedToBag';

import stepLogic from './aboveFold/accordionStyle/stepLogic';
import VelvetiserStyleSteps from './aboveFold/accordionStyle/stepMarkup';
import RadioStyleSteps from './aboveFold/radioStyle/radioStyleMarkup';
import radioStepLogic from './aboveFold/radioStyle/radioStepLogic';
import ExtrasBox from './aboveFold/radioStyle/extras';
import bottomContent from './components/bottomContent';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  
  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

 
  // for both
   // Helpers
   addYTapi(); // <-- adds youtube api to the page
   klarnaAdditon(); // <-- readds the klarna message

  if(VARIATION === '1') {

     document.documentElement.classList.add(`${ID}-podster`);
      // New content
      new VelvetiserStyleSteps(); // <-- this is the new markup, might not need for your test
      new MainImageCarousel(); // <-- this recreates the main image carousel
      bottomContent(); // <-- All the bottom content is in here, if it's the same you can just copy it (HC088 has the velvetiser one)
      options(); // <-- This is just a function that adds each product to each step and you just assign it values
      pageChanges(); // <-- this is just generic changes like moving elements

      pollerLite(['.recommendations'], () => {
        uspCircles(); // <-- this is the 3 circles at the bottom of the page, just copy if needed
      });
     

      if(window.innerWidth > 767) {
        new ProductTabs(); // <-- adds tabs for desktop
      }
      
      // Logic
      stepLogic(); // <-- This is the main logic for the configurator being in "steps" some of it might be useful, some of it not.
      runYoutube(); // <-- adds the youtube video
      reviewSmoothScroll(); // <-- This is what makes the "read reviews" scroll smoothly to the reviews

      // show add to bag on mobile once in view
      window.addEventListener('scroll', () => {
        const bundles = document.querySelector(`.${ID}-podBundles`);
        if(elementInViewport(bundles)) {
          document.querySelector(`.${ID}-addToBagMobile`).classList.add('show');
        }
      });
    

      // After add to bag
      if(window.location.href.indexOf('?addtobasket=true') > -1 && sessionStorage.getItem(`${ID}-productsAdded`)) {
        addedToBag(); // <-- this is the added to bag message that appears after all products have been added
      }
  }  

  if(VARIATION === '2') {
    new RadioStyleSteps(); // <-- this is the radio style markup, might not need for your test
    new MainImageCarousel(); 
    new ExtrasBox();

    pollerLite(['.recommendations'], () => {
      uspCircles();
    });
    
    

    if(window.innerWidth > 767) {
      new ProductTabs();
    }
    
    bottomContent();
    pageChanges();
    options();
    radioStepLogic();
    runYoutube();
    reviewSmoothScroll();

    // After add to bag
    if(window.location.href.indexOf('?addtobasket=true') > -1 && sessionStorage.getItem(`${ID}-productsAdded`)) {
      addedToBag();
    }
    
    
  }
};
