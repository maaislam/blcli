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
  let contentToFilter;

  if(VARIATION === '1' || VARIATION === '2') {
    positionNumber = 14;
    gridItemNo = 13;
  } else if(VARIATION === '3') {
    positionNumber = 7;
    gridItemNo = 6;
  }

  if(VARIATION === '1' || VARIATION === '3') {
    contentToFilter = 'price';
  } else if(VARIATION === '2') {
    contentToFilter = 'rating';
  }


  /**
   * Get the position and number of products
   */
  const inGridContent = () => {
    const amountShowing = document.querySelector('.showing_products_total').textContent.trim();
    const numberAmount = amountShowing.match(/(\d*\.?\d+|\d{1,3}(?:,\d{3})*(?:\.\d+)?)(?!\S)/)[0];
    title = `You've viewed <h3>${positionNumber} of ${numberAmount}</h3> products`;
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
      <p>Why not filter to refine your selection by ${contentToFilter}?</p>
      <div class="${ID}-dropdown">
        <select>
        <option>Select a ${contentToFilter}</option>
        </select>
      </div>
    </div>`;
    

    const fourteenth = document.querySelectorAll('.grid_mode.grid li')[gridItemNo];
    if(fourteenth) {
      if(!document.querySelector(`.BO095-inGridBlock`)) {
        fourteenth.insertAdjacentElement('afterend', inGrid);
      }  
    }
  }

  const dropdownOptions = () => {
    let options;
    if(VARIATION === '1' || VARIATION === '3') {
      options = document.querySelectorAll(`#productsFacets #price .facetSelect li[id^="facet_"]`);
    } else if(VARIATION === '2'){
      options = document.querySelectorAll(`#productsFacets #rating .facetSelect li[id^="facet_"]`);
    }

    for (let index = 0; index < options.length; index += 1) {
      const element = options[index];
      let elementName;

      const matchingFilter = element.querySelector('a').getAttribute('id');
      if(matchingFilter) {
        if(VARIATION === '1' || VARIATION === '3') {
          elementName = element.querySelector('.outline span');
        } else if(VARIATION === '2'){
          elementName = element.querySelector('.facet_rating').getAttribute('alt');
        }
    
        const selectOption = document.createElement('option');
        selectOption.classList.add(`${ID}-filterOption`);
        selectOption.setAttribute('value', matchingFilter);
        if(VARIATION === '1' || VARIATION === '3') {
          selectOption.innerHTML = elementName.textContent
        } else {
          selectOption.innerHTML =  `${elementName} & up`;
        }
        document.querySelector(`.${ID}-dropdown select`).appendChild(selectOption);
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

  createInGridBlock();
  dropdownOptions();
  applyFilter();

  

 

};
