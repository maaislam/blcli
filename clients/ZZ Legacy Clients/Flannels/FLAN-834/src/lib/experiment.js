/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, pollerLite } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

const startExperiment = () => {



  let saleIsOn = false;
  pollerLite(['.mobMenuGroup li', '#main-content'], () => {


    // revisit how this works
    let newHTML = `
    
      <div class="${ID}-linkslist">
        
        ${saleIsOn === false ? `<a href="${VARIATION == 1 ? `https://www.flannels.com/clearancehome` : `https://www.flannels.com/clearancehome`}" class="${ID}-linkslist--outlet">Outlet</a>` : ``}
        ${saleIsOn === true ? `<a href="${VARIATION == 1 ? `https://www.flannels.com/clearancehome` : `https://www.flannels.com/clearancehome`}" class="${ID}-linkslist--sale">Sale</a>` : ``}
        <a href="${VARIATION == 1 ? `https://www.flannels.com/men/` : `https://www.flannels.com/men/clothing`}">Men</a>
        <a href="${VARIATION == 1 ? `https://www.flannels.com/women/` : `https://www.flannels.com/women/clothing`}">Women</a>
        <a href="${VARIATION == 1 ? `https://www.flannels.com/kids/` : `https://www.flannels.com/kids`}">Junior</a>
        <a href="${VARIATION == 1 ? `https://www.flannels.com/beauty/` : `https://www.flannels.com/beauty/`}">Beauty</a>
        
        
      
      </div>
    
    `;
  
    
    let insertionPoint = document.getElementById(`main-content`);
  
    insertionPoint.insertAdjacentHTML('afterbegin', newHTML);
  
    fireEvent(`Visible - links have been displayed to the user`);
  
    let allLinks = document.querySelectorAll(`.${ID}-linkslist a`);
    [].slice.call(allLinks).forEach((link) => {
      link.addEventListener('click', (e) => {
  
        fireEvent(`Click - user has clicked on ${e.currentTarget.innerText} button taking them to ${e.currentTarget.href}`);
  
      });
    });
  });

}


export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  startExperiment();
};
