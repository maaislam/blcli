/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';

const runChanges = () => {
  
  // Move branch finder
  const branchTitle = document.querySelector('.branch-title');
  const branchFinder = document.querySelector('.branch-finder-field');
  if(branchTitle && branchFinder) {
    branchTitle.insertAdjacentElement('afterend', branchFinder);
  }

  // Remove postcode text
  const branchAreasCovered = document.querySelector('.branch-areas-covered');
  if (branchAreasCovered) {
    const areasCovered = branchAreasCovered.querySelectorAll('p')[5];
    if (areasCovered.innerText.includes('Use our postcode checker')) {
      const replacedText = areasCovered.innerHTML.replace('Use our postcode checker to see if we provide care in your local area or call us to discuss your care further.', '');
      areasCovered.innerHTML = replacedText;
    }
  }
}

export default () => {

  const init = () => {
    runChanges();
    setup();
  };

  const branchSearch = localStorage.getItem('branchsearch');
  if (branchSearch) {
    init();
  };
};
