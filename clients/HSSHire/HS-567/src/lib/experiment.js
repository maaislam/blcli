/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  // console.log('Experiment started');

  pollerLite(['#main #search_result .search_result_head'], () => {

    const categories = document.querySelectorAll(`#main #search_result .filterContent .filterBox-category ul li`);
    console.log(categories)
    const applyFilterButtonDesk = document.querySelector(`#main #search_result .filterContent .flowers-wrap #deskSearchFilerSubmitButton`);

    // let categoryName = 'Access Towers & Platforms';

    const targetContainer = document.querySelector('#main #search_result .Withoutsort');

    const searchCategoryHTML = `
    <h3 class="${ID}-refine-search-title">Refine by category</h3>
    <div class="${ID}-refine-search-container">
    </div>`

    targetContainer.insertAdjacentHTML('afterend', searchCategoryHTML);

    const container = document.querySelector(`.${ID}-refine-search-container`);

    const uniqueCatSet = new Set();

    categories.forEach((category, index) => {
      if(index < 5){
        const categoryName = category.querySelector('label').innerText.split("(")[0].trim();
        if(uniqueCatSet.has(categoryName)) return;

        const categoryHTML = `
        <div class="${ID}-refine-search-category">
          <p class="${ID}-refine-search-category-title">${categoryName}</p>
        </div>
        `;

        container.insertAdjacentHTML('beforeend', categoryHTML);
        uniqueCatSet.add(categoryName);
      }
    });

    const categoryButtons = document.querySelectorAll(`.${ID}-refine-search-category`);

    const applyStyle = () => {
      categories.forEach((category, index) => {
        if(category.querySelector('input[type="checkbox"]').checked && index < 5){
          Array.from(categoryButtons)[index].classList.add(`${ID}-clicked`);
        }
      });
    }

    // setTimeout(() => {
      if(localStorage.getItem(`selectedCategory`)){
        applyStyle();
      }
    // }, 1000);
  
    const clickFilter = (e, index) => {
      if(e.target.closest(`.${ID}-refine-search-category`).classList.contains(`${ID}-clicked`)){
        categories[index].querySelector('label').click();
        // localStorage.removeItem(`selectedCategory`);
        applyFilterButtonDesk.click();
      }

      if(!e.target.closest(`.${ID}-refine-search-category`).classList.contains(`${ID}-clicked`)){
        categories.forEach((category, index) => {
          category.querySelector('input[type="checkbox"]').checked = false;
        });
        categories[index].querySelector('label').click();
        localStorage.setItem(`selectedCategory`, 'true');
        applyFilterButtonDesk.click();
      }
    }

    categoryButtons.forEach((button, index) => {
      button.addEventListener('click', (e) => clickFilter(e, index));
    });
        
  });

}

const addTracking = () => {
  document.body.addEventListener('click', (e) => {
    if(e.target.closest('a.productMainLink') || e.target.closest('a.hire-CTA')){
      fireEvent('Click - Clicks a PDP')
    }

    if(e.target.closest('button#addToBasket') || e.target.closest('button#bookOnline')){
      fireEvent('Click - Clicks to Add to Bag on PDP')
    }

    // refine category control
    if(e.target.closest('label.hss-check-box')){
      fireEvent('Click - Clicks to refine category control')
    }
  });
}

const variationTracking = () => {
  document.body.addEventListener('click', (e) => {
    if(e.target.closest(`${ID}-refine-search-category`)){
      fireEvent('Click - Clicks to refine category variation')
    }
  });
}

export default () => {

  newEvents.initiate = true;
  newEvents.methods = ["ga4"];
  newEvents.property = "G-69ML6JH4G6";

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  addTracking();
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
  variationTracking();
};
