/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { cookieOpt, fireEvent, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
 
  let title;
  let positionNumber;
  let gridItemNo;

  if(VARIATION === '1') {
    positionNumber = 8;
    gridItemNo = 7;
  } else if(VARIATION === '2') {
    positionNumber = 14;
    gridItemNo = 13;
  }



  /**
   * Get the position and number of products
   */
  const inGridContent = () => {
    const amountShowing = document.querySelector('.showing_products_total').textContent.trim();
    const numberAmount = amountShowing.match(/(\d*\.?\d+|\d{1,3}(?:,\d{3})*(?:\.\d+)?)(?!\S)/)[0];
    title = `You've viewed ${positionNumber} of ${numberAmount} products`;
    return title;
  }

  

  /**
   * Create in grid block
   */
  const createInGridBlock = () => {
    const inGrid = document.createElement('li');
    inGrid.className = `${ID}-inGridBlock`;
    inGrid.innerHTML = `
    <div class="${ID}-inGridContent estore_product_container">
      <span class="${ID}-icon"></span>
      <div class="${ID}-title">${inGridContent()}</div>
      <p>Why not filter to refine your selection by brand?</p>
      <div class="${ID}-dropdown">
        <select>
        <option>Select a brand</option>
        </select>
      </div>
    </div>`;
    

    const fourteenth = document.querySelectorAll('.grid_mode.grid li')[gridItemNo];
    if(fourteenth) {
      if(!document.querySelector(`.BO098-inGridBlock`)) {
        fourteenth.insertAdjacentElement('afterend', inGrid);
      }  
    }
  }

  const dropdownOptions = () => {
    const options = document.querySelectorAll(`#productsFacets #brand .facetSelect li[id^="facet_"]`);
    

    for (let index = 0; index < options.length; index += 1) {
      const element = options[index];
      let elementName;

      const matchingFilter = element.querySelector('a').getAttribute('id');
      if(matchingFilter) {
        elementName = element.querySelector('.outline span');
         
    
        const selectOption = document.createElement('option');
        selectOption.classList.add(`${ID}-filterOption`);
        selectOption.setAttribute('value', matchingFilter);
        selectOption.innerHTML = elementName.textContent
        
        if(document.querySelector(`.${ID}-dropdown select`)) {
          document.querySelector(`.${ID}-dropdown select`).appendChild(selectOption);
        }
      }
    } 

  }

   // on change of dropdown, click the matching selected filter
  const applyFilter = () => {
    const selectDropdown = document.querySelector(`.${ID}-dropdown select`);

    selectDropdown.addEventListener('change', (event) => {
      const chosenOption = event.target.value;
      fireEvent('Clicked In-Grid Filter Dropdown');
      document.querySelector(`#${chosenOption}`).click();
    });
  }

  if(VARIATION !== 'control') {
    createInGridBlock();
    dropdownOptions();
    applyFilter();
  }
  

 



};
