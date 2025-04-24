import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import VelvetiserSteps from './components/stepMarkup';
import MainImageCarousel from './components/imageCarousel';
import { addYTapi, elementInViewport, klarnaAdditon, makeActiveColour, reviewSmoothScroll, runYoutube } from './helpers';
import options from './components/options';
import pageChanges from './components/pageChanges';
import uspCircles from './components/uspCircles';
import ProductTabs from './components/productTabs';
import stepLogic from './stepLogic';
import { pollerLite } from '../../../../../lib/utils';
import addedToBag from './components/addedToBag';
import basketPage from './components/basketPage';
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

  if(window.location.href.indexOf('.html') > -1) {

    document.documentElement.classList.add(`${ID}-velvetiser`)
    // Helpers
    addYTapi();
    klarnaAdditon();

    // New content
    new VelvetiserSteps();
    new MainImageCarousel();
    bottomContent();
    options();
    pageChanges();

    pollerLite(['.recommendations'], () => {
      uspCircles();
    });
    

    if(window.innerWidth > 767) {
      new ProductTabs();
    }
    
    // Logic
    stepLogic();
    runYoutube();
    reviewSmoothScroll();

    // Once everything is loaded, preselect the colour
    // once colours loaded, select matching one
    const idOfCurrent = document.querySelector('#pid').value;
    makeActiveColour(idOfCurrent);


    // show add to bag on mobile once in view
    
    window.addEventListener('scroll', () => {
      const starterKits = document.querySelector(`.${ID}-kits`);
      if(elementInViewport(starterKits)) {
        document.querySelector(`.${ID}-addToBagMobile`).classList.add('show');
      }
    });
  

    // After add to bag
    if(window.location.href.indexOf('?addtobasket=true') > -1 && sessionStorage.getItem(`${ID}-productsAdded`)) {
      addedToBag();
    }
  } else {

    // Basket page
    basketPage();
    
  }
  

};
