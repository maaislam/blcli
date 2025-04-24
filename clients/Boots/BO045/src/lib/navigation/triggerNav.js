/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import getData from './getData';
import shared from '../shared';

import {
  markupCategory,
  markupSubcategory,
  markupCategoryHeading,
  markupCategoryWrapper,
  markupSubcategoryWrapper,
  markupExpandedListWrapper,
  markupShowMoreButton,
} from './index';

const { ID, VARIATION } = shared;

/**
 * Initialise by cat
 */
const initialiseCatTracking = () => {
  const heading = document.querySelector('#estore_category_heading h1');
  if (heading) {
    const headingtext = heading.innerText.trim();
    if (headingtext === 'beauty & skincare') {
      document.body.classList.add(`${ID}-beauty`);
      window.cmCreateManualLinkClickTag('/BO045?cm_sp=Included-_-beauty-_-Maxymiser');
    } else if (headingtext === 'baby & child') {
      document.body.classList.add(`${ID}-baby`);
      window.cmCreateManualLinkClickTag('/BO045?cm_sp=Included-_-baby-_-Maxymiser');
    } else if (headingtext === 'health & pharmacy') {
      document.body.classList.add(`${ID}-health`);
      window.cmCreateManualLinkClickTag('/BO045?cm_sp=Included-_-health-_-Maxymiser');
    }
  }
};

const addMenuEvents = () => {
  $(document).on('click', `.${ID}-expanded-list-toggle`, function (e) {
      const $parent = $(this).parent();
      $parent.toggleClass(`${ID}-subcategory-open`);

      // Toggle the label inside the toggle button
      const $label = $(this).find(`.${ID}-expanded-list-toggle-label`);
      const currentLabel = $label.text();
      const isOpen = currentLabel.indexOf('more') === -1; // When it's open label is 'Show less'
      $label.text((isOpen ? 'Show more' : 'Show less'));
    });
};

const createMenu = (data) => {
  const catNames = Object.keys(data);
  let markupMenu = '';

  // Loop through categories.
  catNames.forEach((catName) => {
    const cat = data[catName];
    let markupCats = '';

    // Does it have subcategories?
    if (cat.link) {
      // No subcats
      const { link } = cat;

      // Generate markup.
      markupCats += markupCategory(catName, link);
    } else if (cat.innerLinks) {
      // Category heading markup.
        markupCats += markupCategoryHeading(catName, true);
      

      // Subcategories
      const subcats = cat.innerLinks;
      const subcatNames = Object.keys(cat.innerLinks);
      let markupSubcats = '';

      // Generate markup for each subcategory.
      subcatNames.forEach((subcatName) => {
        const subcat = subcats[subcatName];
        const link = subcat.linkSubCat; // or .linkPLP

        // Generate markup.
        markupSubcats += markupSubcategory(subcatName, link);
      });

      // Append subcategories markup to the category markup
      markupCats += markupSubcategoryWrapper(markupSubcats);

        // Expanded list - add toggle button.
        if (subcatNames.length > 7) {
          // Only needed if more than 7 subcategories are shown.
          markupCats += markupShowMoreButton();
        }
    }

    // Generate wrapper markup.
    markupCats = markupCategoryWrapper(markupCats);
    markupMenu += markupCats;
  });

  markupMenu = markupExpandedListWrapper(markupMenu);
  

  // Replace current menu with new markup.
  const menuWrapper = document.getElementById('category-widget');
  menuWrapper.innerHTML = markupMenu;
};

const putOnMobilePage = () => {
  const menu = document.getElementById('category-widget');

  // Create a copy of it
  const menuClone = menu.cloneNode(true);
  menuClone.classList.add(`${ID}-pageCategories`);
  document.querySelectorAll('.cm-placement-main .modWrapper')[2].insertAdjacentElement('afterend', menuClone);
}

const mobileAccordion = () => {
  const accItem = document.querySelectorAll(`#category-widget .${ID}-category-wrapper`);
  const accHeading = document.querySelectorAll(`.${ID}-category-wrapper .${ID}-category-heading`);
    

  for (let index = 0; index < accHeading.length; index += 1) {
      const el = accHeading[index];
      if(el.parentNode.querySelector(`.${ID}-subcategory-wrapper`)) {
        el.addEventListener('click', toggleItem, false);
      }

  }

  function toggleItem() {
      const itemClass = this.parentNode.className;
      for (let i = 0; i < accItem.length; i += 1) {
          const accEl = accItem[i];
          accEl.className = `${ID}-category-wrapper`;
      }

      if (itemClass == `${ID}-category-wrapper`) {
          this.parentNode.className =  `${ID}-category-wrapper ${ID}__open`;
      }
  }
}

export const runNav = () => {


  initialiseCatTracking();
  // -------------------------
  // Get category data for current page
  // -------------------------
  const data = getData();

  // Make new menu.
  createMenu(data);

  // Add event listeners to toggle state of the new menu elements.
  addMenuEvents();

  if(window.innerWidth < 767) {
    putOnMobilePage();
    mobileAccordion();
  }

};
