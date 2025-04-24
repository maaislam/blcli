/**
 * PL288 - Key Features Detailed Spec Menu
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

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
  const keyFeaturesSection = document.querySelector('.page__section .modal-section__body .product__key_features');
  const detailedSpecsAnchorBtn = document.querySelector('.scroller__bottom .prod-menu-container ul.scroller__list li.scroller__item span[data-anchor-id="4"]');
  if (VARIATION == '1') {
    const viewFullSpecification = `<div class="${ID}-specifications v${VARIATION}">
      <button id="view-all-specs"><div>View Full Specification</div></button>
    </div>`
    keyFeaturesSection.insertAdjacentHTML('afterend', viewFullSpecification);

    // --- Click "View All Specs" - Anchor Down
    document.querySelector(`.${ID}-specifications button#view-all-specs`).addEventListener('click', (e) => {
      detailedSpecsAnchorBtn.click();

      fireEvent('Click - View Full Specification CTA');
    });
    
  } else if (VARIATION == '2') {
    const mostPopularSpecs = ['Physical/Dimensions', 'Media Handling', 'Compatibility', 'Interfaces', 'Cartridges Included **', 'In the Box **'];

    // --- Create Most Popular Specs Buttons
    let allSpecButtonsEl = '';
    for (let i = 0; i < mostPopularSpecs.length; i += 1) {
      let specTitle = mostPopularSpecs[i];
      if (specTitle == "Cartridges Included **") {
        specTitle = "Cartridges"
      } else if (specTitle == "In the Box **") {
        specTitle = "In the Box";
      }
      const specID = `${ID}-${specTitle.replace('/', '-').replace(' ', '-').replace(' ', '-').toLowerCase()}`;
      allSpecButtonsEl += `<button class="${ID}-spec__btn" data-id="${specID}"><div>${specTitle}</div></button>`;
    }
    const mostPopularSpecsWrap = `<div class="${ID}-specifications v${VARIATION}">
      <b>View Detailed Specification</b>
      <ul id="most-popular-specs"></ul>
    </div>`;
    keyFeaturesSection.insertAdjacentHTML('afterend', mostPopularSpecsWrap);

    // --- Add Buttons
    document.querySelector(`ul#most-popular-specs`).insertAdjacentHTML('afterbegin', allSpecButtonsEl);

    // --- Loop through all specs and add IDs
    const allSpecs = document.querySelectorAll('.spec-chart-container.js-spec-chart .spec-chart');
    [].forEach.call(allSpecs, (spec) => {
      let specTitle = null;
      if (spec.querySelector('.spec-chart__title .title__inner')) {
        specTitle = spec.querySelector('.spec-chart__title .title__inner').innerText.trim();
        
        if (mostPopularSpecs.indexOf(specTitle) > -1) {
          if (specTitle == "Cartridges Included **") {
            specTitle = "Cartridges"
          } else if (specTitle == "In the Box **") {
            specTitle = "In the Box";
          }
          let specID = `${ID}-${specTitle.replace('/', '-').replace(' ', '-').replace(' ', '-').toLowerCase()}`;
          
          spec.setAttribute('id', specID);
        } else {
          if (specTitle == "Cartridges Included **") {
            specTitle = "Cartridges"
          } else if (specTitle == "In the Box **") {
            specTitle = "In the Box";
          }
          let specID = `${ID}-${specTitle.replace('/', '-').replace(' ', '-').replace(' ', '-').toLowerCase()}`;

          if (document.querySelector(`button[data-id='${specID}']`)) {
            document.querySelector(`button[data-id='${specID}']`).setAttribute('style', 'display: none;');
          }
        }
      }
    });


    // --- All Spec Buttons Event Listeners
    const allSpecButtons = document.querySelectorAll(`.${ID}-spec__btn`);
    [].forEach.call(allSpecButtons, (btn) => {
      let btnID = btn.getAttribute('data-id');

      // --- If spec is NOT available on the page, then hide relevant button
      if (!document.querySelector(`#${btnID}`)) {
        btn.setAttribute('style', 'display: none;');
      }
      btn.addEventListener('click', (e) => {
        fireEvent(`Click - Option Selected - ${btn.innerText.trim()}`);
        // --- Get Active (open) Spec
        if (document.querySelector('.spec-chart.active')) {
          document.querySelector('.spec-chart.active a').click();
        }

        detailedSpecsAnchorBtn.click();
        
        if (document.querySelector(`#${btnID}`)) {
          setTimeout(() => {
            document.querySelector(`#${btnID} a`).click();
            setTimeout(() => {
              const y = document.querySelector(`#${btnID}`).getBoundingClientRect().top + window.scrollY - 150;
              window.scroll({
                top: y,
                behavior: 'smooth'
              });
            }, 250);
          }, 300); 
        }
      }); 

    });

  }
  
};
