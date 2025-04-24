/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import extrasJS from './extras';
const { ID, VARIATION } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  if(VARIATION == 1) {

    // variation 1 code + events

    if(window.location.href.indexOf('/extras?') > -1) {

      document.documentElement.classList.add(`${ID}-extras`);

      extrasJS();
      fireEvent('Visible - experiment loaded, extras page rearranged', true);
      document.body.addEventListener('click', function(e) {

        if(e.target.closest('.btnSubmit') || e.target.classList.contains('btnSubmit')) {

          let allAddedPanels = document.querySelectorAll('.panel-heading.added');
          let selectedPanels = ``;
          [].slice.call(allAddedPanels).forEach((panel, index) => {
            let panelID = panel.querySelector('.priceCorner').id.replace('priceCorner-', '');
            
            if(panelID == "breakfast") {

              let panelHTML = panel.innerHTML;

              if(panelHTML.indexOf('breakfast to go') > -1) {

                panelID = "breakfast-to-go";

              } else {

                panelID = "unlimited-breakfast";

              }

            }
            
            selectedPanels += `${panelID}${index == allAddedPanels.length -1 ? `` : `|`}`;
            
          });

          fireEvent(`Click - ${e.target.classList.contains('btnSaveExtraSummary') ? `Bottom Book Now Button Clicked` : `Top Book Now Button Clicked`}`, true);
          fireEvent(`Interaction - panels selected: [${selectedPanels}]`, true);
        }

        if (e.target.closest('.ccx-add-extra') || e.target.classList.contains('ccx-add-extra')) {

          fireEvent(`Click - Add Extra - ${e.target.closest('.ccx-add-extra').innerText}`, true);
        }

        if (e.target.closest('.ccx-modify-button') || e.target.classList.contains('ccx-modify-button')) {

          fireEvent(`Click - Modify Extra - ${e.target.closest('.priceCorner').id}`, true);
        }

        if (e.target.tagName.toLowerCase() === 'a') {

          fireEvent(`Click - Link - ${e.target.href}`, true);
        }

      });

    } else if(window.location.href.indexOf('basket') > -1) {

      document.documentElement.classList.add(`${ID}-basket`);

    }

  } else {

    // control events
    fireEvent('Visible - control, no changes made', true);
    document.body.addEventListener('click', function (e) {

      if (e.target.closest('.btnSubmit') || e.target.classList.contains('btnSubmit')) {

        let allAddedPanels = document.querySelectorAll('.panel-heading.added');
        let selectedPanels = ``;
        [].slice.call(allAddedPanels).forEach((panel, index) => {
          let panelID = panel.querySelector('.priceCorner').id.replace('priceCorner-', '');

          if (panelID == "breakfast") {

            let panelHTML = panel.closest('.panel').innerHTML;

            if (panelHTML.indexOf('Breakfast To Go') > -1) {

              panelID = "breakfast-to-go";

            } else {

              panelID = "unlimited-breakfast";

            }

          }

          selectedPanels += `${panelID}${index == allAddedPanels.length - 1 ? `` : `|`}`;

        });

        fireEvent(`Click - ${e.target.classList.contains('btnSaveExtraSummary') ? `Bottom Book Now Button Clicked` : `Top Book Now Button Clicked`}`, true);
        fireEvent(`Interaction - panels selected: [${selectedPanels}]`, true);
      }



      if (e.target.tagName.toLowerCase() === 'a') {

        fireEvent(`Click - Link - ${e.target.href}`, true);
      }

    });


  }
  
};
