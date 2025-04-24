/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const ClickViewBox = () => {

      return new Promise((resolve, reject) => {
         // force click on the dropdown box
        function simulateMouseClick(targetNode) {
          function triggerMouseEvent(targetNode, eventType) {
              var clickEvent = document.createEvent('MouseEvents');
              clickEvent.initEvent(eventType, true, true);
              targetNode.dispatchEvent(clickEvent);
          }
          ["mouseover", "mousedown", "click"].forEach(function(eventType) { 
              triggerMouseEvent(targetNode, eventType);
          });
        }


        simulateMouseClick(document.querySelector(".sorting_controls .dijit.dijitReset.pageSize.dijitSelect.dijitSearchResultSelectSize"));

        pollerLite(['#dijit_MenuItem_1', '#dijit_MenuItem_1_text', ], () => {
          document.querySelector('.dijitPopup.dijitMenuPopup .dijit.dijitMenu').style = 'display: none';
          const input = document.querySelector(".selectWrapper .dijitSelect");
          input.addEventListener("focus", function () {
            this.style.backgroundColor = "white";  
          });
        
          setTimeout(() => {
            document.querySelector('.dijitPopup.dijitMenuPopup .dijit.dijitMenu').removeAttribute('style');
            const input = document.querySelector(".selectWrapper .dijitSelect");
            input.addEventListener("focus", function () {
              this.style.backgroundColor = "initial";  
            });
          }, 5000); 
          resolve();
        });
         
      });
  }

  ClickViewBox().then(function() {

    if(VARIATION === 'control') {
      if(document.querySelector('#dijit_MenuItem_1_text') && document.querySelector('#dijit_MenuItem_1_text').textContent.indexOf('96') > -1) {
        fireEvent('96 Products - True');
      }
    }

    if(VARIATION === '1') {
      if(document.querySelector('#dijit_MenuItem_1_text') && document.querySelector('#dijit_MenuItem_1_text').textContent.indexOf('96') > -1) {
        document.querySelector('#dijit_MenuItem_1_text').click();
        fireEvent('96 Products - True');
      }
    }
  });
};
