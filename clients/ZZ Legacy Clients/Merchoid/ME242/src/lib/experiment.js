/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import header from './components/header';
import productPriceBox from './components/productPriceBox';
import ProductAccordion from './components/accordion';
import moreProducts from './components/moreProducts';
import sizeguide from './components/sizeguide';
import shared from './shared';
import desktopProductChanges from './components/desktopProductChanges';

export default () => {
  setup();

  const { ID } = shared;

  header();
  productPriceBox();
  new ProductAccordion();

  moreProducts();

  if(document.querySelector('.product-options-wrapper')) {
    sizeguide();
  }


  // add magnifying icon
  document.querySelector('.gallery-placeholder').insertAdjacentHTML('beforeend',`<div class="${ID}-magnifying"></div>`);
  
  

  // add changes that are just for desktop
  if(window.innerWidth > 767) {
    desktopProductChanges();
  }
};
