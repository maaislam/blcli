import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import VelvetiserSteps from './components/stepMarkup';
import MainImageCarousel from './components/imageCarousel';
import { addYTapi, klarnaAdditon, reviewSmoothScroll, runYoutube } from './helpers';
import options from './components/options';
import pageChanges from './components/pageChanges';
import uspCircles from './components/uspCircles';
import ProductTabs from './components/productTabs';
import stepLogic from './stepLogic';
import { pollerLite } from '../../../../../lib/utils';
import addedToBag from './components/addedToBag';

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


  // Helpers
  addYTapi();
  klarnaAdditon();

  // New content
  new VelvetiserSteps();
  new MainImageCarousel();
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


  // After add to bag
  if(window.location.href.indexOf('?addtobasket=true') > -1 && sessionStorage.getItem(`${ID}-productsAdded`)) {
    addedToBag();
  }
  

};
