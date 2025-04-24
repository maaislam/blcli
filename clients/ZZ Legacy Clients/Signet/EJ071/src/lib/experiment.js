/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  if(shared.VARIATION === '1') {
    const ifcContainer = document.querySelector('.basket__ifc-container');
    const bottomButtons = document.querySelector('#lower-button-group');
    const summaryBox = document.querySelector('.order-summary__container');
    const bottomMessages = document.querySelector('.order-summary__container .basket__messages-container');

    summaryBox.appendChild(bottomButtons);
    
    if(window.innerWidth < 767) {   
      document.querySelector('#lower-button-group').appendChild(bottomMessages);
      document.querySelector('#lower-button-group .basket__messages-container').classList.add(`${shared.ID}-bottomMessages`);
    } else {
      summaryBox.insertAdjacentElement('afterend', bottomMessages);
      document.querySelector('.order-summary__container').nextElementSibling.classList.add(`${shared.ID}-bottomMessages`);
    }

    if(window.innerWidth >= 1024) {
      if(ifcContainer) {
        summaryBox.insertAdjacentElement('beforeend', ifcContainer);
        const ifcBody = ifcContainer.querySelector('tbody');

        ifcContainer.querySelector('thead').insertAdjacentElement('afterend', ifcBody);
        ifcContainer.querySelector('tfoot').insertAdjacentElement('afterend', ifcContainer.querySelector('.editRemoveIFC'));
        
        // loop through the ifc footer, if any th are empty, hide them
        const ifcFooter = ifcContainer.querySelectorAll('tfoot td');
        for (let index = 0; index < ifcFooter.length; index += 1) {
          const element = ifcFooter[index];
          if(element.textContent === '') {
            element.style.display = 'none';
          }
        }
      }
    }

  }
};
