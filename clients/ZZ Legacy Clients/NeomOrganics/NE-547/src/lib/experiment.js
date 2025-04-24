/**
 * NE-547 - V-day PLP in-grid sentiments
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/utils';
import { checkIntersection } from '../../../../../evelyn/scrolling';

const { ID, VARIATION } = shared;

/**
 * Entry point for experiment
 */
export default () => {
  // -----------------------
  // Data - run against pages shown
  // -----------------------

    setup();

    fireEvent('Conditions Met');

    // -----------------------
    // Create target container divs
    // -----------------------
    const cols = document.querySelectorAll('#MainContent .columns .column');
    if(cols.length) {

      // Indices for Target Elements
      const colPosPod = 1;
      let podPos = 1;
      let podEl = null;

      [].forEach.call(cols, (col, idx) => {
        podEl = `
          <div class="${shared.ID}-pod pod-${podPos} ${shared.VARIATION != 'control' ? 
            `column is-3-desktop is-4-tablet is-6-mobile` : ''}" id="V-day-block-${podPos}">
              <a href="/"></a>
            </div>
        `;

        // --- DESKTOP
        if (window.innerWidth > 1087) {

          console.log(idx);

          if(idx == 2) {
            col.insertAdjacentHTML('afterend', podEl);
  
            podPos += 1;
          }
          if(idx == 3) {
            col.insertAdjacentHTML('beforebegin', podEl);
  
            podPos += 1;
          }
          if(idx == 8) {
            col.insertAdjacentHTML('afterend', podEl);
  
            podPos += 1;
          }

        } 
        
        // --- TABLET
        if (window.innerWidth <= 1087 && window.innerWidth >= 769) {
          if(idx == 1) {
            col.insertAdjacentHTML('afterend', podEl);
  
            podPos += 1;
          }
          if(idx == 2) {
            col.insertAdjacentHTML('beforebegin', podEl);
  
            podPos += 1;
          }
          if(idx == 5) {
            col.insertAdjacentHTML('afterend', podEl);
  
            podPos += 1;
          }

        } 
        
        // --- MOBILE
        if (window.innerWidth <= 768) {
          if(idx == 0) {
            col.insertAdjacentHTML('afterend', podEl);
  
            podPos += 1;
          }
          if(idx == 3) {
            col.insertAdjacentHTML('beforebegin', podEl);
  
            podPos += 1;
          }
          if(idx == 6) {
            col.insertAdjacentHTML('afterend', podEl);
  
            podPos += 1;
          }

        }
        
      });
    }

    // -----------------------
    // Control and Variation Tracking
    // -----------------------
    const pod = document.querySelector(`.${shared.ID}-pod`);
    if(pod) {

      const allPods = document.querySelectorAll(`.${shared.ID}-pod`);
      [].forEach.call(allPods, (pod) => {
        checkIntersection(pod).then(() => {
          fireEvent(`Visible - Ad Block - ${pod.getAttribute('id')}`);
        });

        const podId = pod.getAttribute('id');
        switch(podId) {
          case 'V-day-block-1':
            pod.querySelector('a').setAttribute('href', '/collections/limited-edition-scented-candles');
            break;
          case 'V-day-block-2':
            pod.querySelector('a').setAttribute('href', '/pages/build-a-wellbeing-gift');
            break;
          case 'V-day-block-3':
            pod.querySelector('a').setAttribute('href', '/pages/the-wellbeing-pod-family');
            break;

        }
      });
      
    }

    // -----------------------
    // Variant specific code
    // -----------------------
    if(shared.VARIATION != 'control') {
      if(pod) {

        // Events
        const allPods = document.querySelectorAll(`.${shared.ID}-pod`);
        [].forEach.call(allPods, (pod) => {
          pod.addEventListener('click', e => {
            // console.log(`Click -  Ad Block - ${pod.getAttribute('id')}`);
            fireEvent(`Click - Ad Block - ${pod.getAttribute('id')}`);
          });
        });
        
      }
    }
  // }
};
