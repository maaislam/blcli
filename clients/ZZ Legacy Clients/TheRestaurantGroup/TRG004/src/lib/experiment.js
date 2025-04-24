/**
 * TRG004 - C & C Sticky Discount Banner
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, activateStickyNav } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';

const { ID, VARIATION } = shared;

export default () => {
  setup();
  console.log('TRG004    IS RUNNING');
  // Write experiment code here
  let header = '';
  pollerLite([`section.menu-page div[data-component="secondary-header"] h2`], () => {
    if (document.querySelector(`section.menu-page div[data-component="secondary-header"] h2`).parentNode) {
      header = document.querySelector(`section.menu-page div[data-component="secondary-header"] h2`).parentNode;
      
      header.classList.add(`${shared.ID}-menu-page-banner`);
      activateStickyNav(header);
    }
  });

  pollerLite(['.discount-banner p.heading'], () => {
    if (document.querySelector('.discount-banner p.heading').parentNode) {
      header = document.querySelector('.discount-banner p.heading').parentNode;

      activateStickyNav(header);
    }
  });

  // const header = document.querySelector(`section.menu-page div[data-component="secondary-header"] h2`).parentNode;

  // document.querySelector('.discount-banner p.heading');

  // // Get the offset position of the navbar
  // const sticky = header.offsetTop;

  // window.addEventListener('scroll', () => {
  //   if (window.pageYOffset > sticky) {
  //     header.classList.add(`${shared.ID}-sticky`);
  //   } else {
  //     header.classList.remove(`${shared.ID}-sticky`);
  //   }
  // });

  // // ---- Detects scroll up or down
  // let lastScrollTop = 0;
  
  // window.addEventListener("scroll", function(){ 
  //   let st = window.pageYOffset || document.documentElement.scrollTop;
  //   if (st > lastScrollTop){
  //       // downscroll code
  //       if (window.pageYOffset > sticky) {
  //         header.classList.remove(`${shared.ID}-sticky__up`);
  //         header.classList.add(`${shared.ID}-sticky`);
  //       } else {
  //         header.classList.remove(`${shared.ID}-sticky`);
  //       }
  //   } else {
  //       // upscroll code
  //       if (window.pageYOffset > sticky) {
  //         header.classList.add(`${shared.ID}-sticky__up`);
  //       } else {
  //         header.classList.remove(`${shared.ID}-sticky`);
  //         header.classList.remove(`${shared.ID}-sticky__up`);
  //       }
  //   }
  //   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  // }, false);
};
