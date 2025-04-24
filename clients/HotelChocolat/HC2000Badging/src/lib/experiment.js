import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

const { ID ,VARIATION } = shared;

const startExperiment = () => {

  
  let trendingHTML = `
       <div class="${ID}-newondemand">Trending</div>
      `;
  let popularHTML = `
      <div class="${ID}-newondemand">Popular</div>
     `;
  let newHTML = `
     <div class="${ID}-newondemand">New</div>
    `;
  
  

    pollerLite(['#desktop-navigation .hlp-centered-wrapper .main-navigation .top-level .content-asset .sub-level .sub-level-item .sub-level-content .split-columns'], () => {
  
      
      let insertionPoint = document.querySelector('#desktop-navigation .top-level:nth-child(1) .split-columns:nth-child(1) li:nth-child(6)');
  
      insertionPoint.insertAdjacentHTML('beforeend', trendingHTML);

      let insertionPoint1 = document.querySelector('#desktop-navigation .top-level:nth-child(1) .split-columns:nth-child(1) li:nth-child(11)');
  
      insertionPoint1.insertAdjacentHTML('beforeend', trendingHTML);      
      
      let insertionPoint2 = document.querySelector('#desktop-navigation .top-level:nth-child(1) .sub-level-item:nth-child(2) .split-columns:nth-child(1) li:nth-child(3)');
  
      insertionPoint2.insertAdjacentHTML('beforeend', popularHTML);

      let insertionPoint3 = document.querySelector('#desktop-navigation .top-level:nth-child(2) .sub-level-item:nth-child(1) .split-columns:nth-child(1) li:nth-child(2)');
  
      insertionPoint3.insertAdjacentHTML('beforeend', newHTML);

      let insertionPoint4 = document.querySelector('#desktop-navigation .top-level:nth-child(2) .sub-level-item:nth-child(1) .split-columns:nth-child(2) li:nth-child(9)');
  
      insertionPoint4.insertAdjacentHTML('beforeend', trendingHTML);

      let insertionPoint5 = document.querySelector('#desktop-navigation .top-level:nth-child(2) .sub-level-item:nth-child(2) .split-columns:nth-child(1) li:nth-child(1)');
  
      insertionPoint5.insertAdjacentHTML('beforeend', popularHTML);

      let mobinsertionPoint = document.querySelector('#main-header .top-level:nth-child(1) .split-columns:nth-child(1) li:nth-child(6)');
  
      mobinsertionPoint.insertAdjacentHTML('beforeend', trendingHTML);

      let mobinsertionPoint1 = document.querySelector('#main-header .top-level:nth-child(1) .split-columns:nth-child(1) li:nth-child(11)');
  
      mobinsertionPoint1.insertAdjacentHTML('beforeend', trendingHTML);      
      
      let mobinsertionPoint2 = document.querySelector('#main-header .top-level:nth-child(1) .sub-level-item:nth-child(2) .split-columns:nth-child(1) li:nth-child(3)');
  
      mobinsertionPoint2.insertAdjacentHTML('beforeend', popularHTML);

      let mobinsertionPoint3 = document.querySelector('#main-header .top-level:nth-child(2) .sub-level-item:nth-child(1) .split-columns:nth-child(1) li:nth-child(2)');
  
      mobinsertionPoint3.insertAdjacentHTML('beforeend', newHTML);

      let mobinsertionPoint4 = document.querySelector('#main-header .top-level:nth-child(2) .sub-level-item:nth-child(1) .split-columns:nth-child(2) li:nth-child(9)');
  
      mobinsertionPoint4.insertAdjacentHTML('beforeend', trendingHTML);

      let mobinsertionPoint5 = document.querySelector('#main-header .top-level:nth-child(2) .sub-level-item:nth-child(2) .split-columns:nth-child(1) li:nth-child(1)');
  
      mobinsertionPoint5.insertAdjacentHTML('beforeend', popularHTML);
  
      fireEvent(`Interaction - element added to page`, true);
  
    });

    
  
  }

export default () => {
  

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

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
  startExperiment();
};
