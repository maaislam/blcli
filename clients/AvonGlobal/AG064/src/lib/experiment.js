/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup } from './services';
 import shared from './shared';
 import { pollerLite, observePageChange } from '../../../../../lib/utils';
 
 const runChanges = () => {
  pollerLite([
    '.savings',
  ], () => {
    const savingsElem = document.querySelector('.savings');
    if (shared.VARIATION == 1) {
      const percentageSpan = savingsElem.querySelectorAll('span')[2];
      percentageSpan.style.display = "none";
    }
    if (shared.VARIATION == 2) {
      const percentageSpan = savingsElem.querySelectorAll('span')[3];
      savingsElem.innerText = percentageSpan.innerText + ' OFF';
      savingsElem.classList.add(`${shared.ID}__percent`);
    }
  })
 }
 
 export default () => {
   setup();
   // const { rootScope, ID } = shared;
 
   /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
   const init = () => {
     runChanges();
 
 
     // const observer = new MutationObserver(function(mutations) {
     //   mutations.forEach(function(mutation) {
     //    runChanges();
     //   });
     // });
     // var elm = document.querySelector('.v7__plp__list_wrapper');
     // var config = {
     //   childList: true,
     //   subtree: true,
     //   attributes: true,
     //   characterData: true
     // };
     // observer.observe(elm, config);
 
   };
 
   // // Make device specific changes when layout changes
   // rootScope.$on('App_LayoutChanged', () => {
   //   setTimeout(init, 500);
   // });
 
   init();
 
   observePageChange(document.body, (p) => {
     init();
   });
 };
 
