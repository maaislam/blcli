/**
 * V1 = dropdown filter, desktop only
 * V2 = new category selector, all devices
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { observer } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

// Flag whether listener should adhere to changes
let shouldUpdate = true;

/**
 * Helper add dropdown filter to search box
 */
const createDropdownFilter = () => {
  const searchForm = document.querySelector('.header-top-container .ais-SearchBox-form');
  if(searchForm) {
    searchForm.insertAdjacentHTML('beforeend', `
      <div class="${shared.ID}-dropdown">
        <div class="${shared.ID}-dropdown__init">
          All Categories
        </div>

        <div class="${shared.ID}-dropdown__options">
          <div class="${shared.ID}-dropdown__option ${shared.ID}-dropdown__option--active" data-value="All Categories" data-target="">All categories</div>
          <div class="${shared.ID}-dropdown__option" data-value="Printers" data-target="PRINTER">Laser & Inkjet Printers</div>
          <div class="${shared.ID}-dropdown__option" data-value="Ink & Toner" data-target="CONSUMABLE">Ink & Toner Cartridges</div>
          <div class="${shared.ID}-dropdown__option" data-value="Warranty" data-target="WARRANTY">Warranty</div>
          <div class="${shared.ID}-dropdown__option" data-value="Accessories" data-target="ACCESSORY">Accessories</div>
        </div>
      </div>
    `);

    const dropdown = document.querySelector(`.${shared.ID}-dropdown`);
    const dropdownInit = document.querySelector(`.${shared.ID}-dropdown__init`);
    const opts = document.querySelectorAll(`.${shared.ID}-dropdown__option`);
    
    // Handle options click
    [].forEach.call(opts, opt => {
      opt.addEventListener('click', e => {
        [].forEach.call(opts, o => o.classList.remove(`${shared.ID}-dropdown__option--active`));

        e.currentTarget.classList.add(`${shared.ID}-dropdown__option--active`);

        shouldUpdate = true;

        const val = e.currentTarget.dataset.value;
        dropdownInit.innerHTML = val;

        dropdown.classList.remove(`${shared.ID}-dropdown--active`);

        if(e.currentTarget.dataset.target == '') {
          const reset = document.querySelector('#clearRefinement button');
          if(reset) {
            reset.click();

            const searchBox = document.querySelector('.ais-SearchBox-input');
            if(searchBox) {
              searchBox.focus();
            }
          }
        }
      });
    });

    // Handle Init
    dropdownInit.addEventListener('click', e => {
      e.currentTarget.parentNode.classList.toggle(`${shared.ID}-dropdown--active`);
    });

    // Handle close
    document.addEventListener('click', e => {
      if(!e.target.closest(`.${shared.ID}-dropdown`)) {
        dropdown.classList.remove(`${shared.ID}-dropdown--active`);
      }
    });
  }
};

/**
 * Helper, replaces categories_container
 */
const createCategorySelector = () => {
  const catContainer = document.querySelector('.searchresults > .categories_container');
  if(catContainer) {
    // catContainer.innerHTML = `
    //   <div class="${shared.ID}-cats">
    //     <h3 class="${shared.ID}-cats__title">Refine by category</h3>
    //     <div class="${shared.ID}-cats__inner">
    //       <div class="${shared.ID}-cats__cat" data-target="PRINTER">
    //         <img src="https://blcro.fra1.digitaloceanspaces.com/pl048-v2-printers.jpg">
    //         <span>Laser & Inkjet Printers</span>
    //       </div>
    //       <div class="${shared.ID}-cats__cat" data-target="CONSUMABLE">
    //         <img src="https://www.printerland.co.uk/images/site_images/cmyk-circle-multipack.svg">
    //         <span>Ink & Toner Cartridges</span>
    //       </div>
    //     </div>
    //   </div>
    // `;
    const newFilterCategories = `
    <div class="${shared.ID}-cats">
      <h3 class="${shared.ID}-cats__title">Refine by category</h3>
      <div class="${shared.ID}-cats__inner">
        <div class="${shared.ID}-cats__cat" data-target="PRINTER">
          <img src="https://blcro.fra1.digitaloceanspaces.com/pl048-v2-printers.jpg">
          <span>Laser & Inkjet Printers</span>
        </div>
        <div class="${shared.ID}-cats__cat" data-target="CONSUMABLE">
          <img src="https://www.printerland.co.uk/images/site_images/cmyk-circle-multipack.svg">
          <span>Ink & Toner Cartridges</span>
        </div>
      </div>
    </div>
  `;

    catContainer.insertAdjacentHTML('beforeend', newFilterCategories);

    [].forEach.call(document.querySelectorAll(`.${shared.ID}-cats__cat`), c => {
      c.addEventListener('click', e => {
        [].forEach.call(document.querySelectorAll(`.${shared.ID}-cats__cat`), d => {
          d.classList.remove('xactive');
        });

        c.classList.add('xactive');

        shouldUpdate = true;
      });
    });
  }
};

const checkOptions = () => {
  setTimeout(() => {
    if(!shouldUpdate) {
      checkOptions();
      return;
    }

    let activeOpt = document.querySelector(`.${shared.ID}-dropdown__option--active`);
    if(!activeOpt) {
      activeOpt = document.querySelector(`.${shared.ID}-cats__cat.xactive`);
    }

    if(activeOpt && activeOpt.dataset.target) {
      const checkbox = document.querySelector(`.ais-RefinementList-checkbox[value="${activeOpt.dataset.target}"]`);
      if(checkbox) {
        //(document.querySelector('.ais-RefinementList-checkbox[value=CONSUMABLE]') || {}).checked = false;
        //(document.querySelector('.ais-RefinementList-checkbox[value=PRINTER]') || {}).checked = false;
        //(document.querySelector('.ais-RefinementList-checkbox[value=WARRANTY]') || {}).checked = false;
        //(document.querySelector('.ais-RefinementList-checkbox[value=ACCESSORY]') || {}).checked = false;

        const reset = document.querySelector('#clearRefinement button');
        if(reset) {
          reset.click();
        }

        setTimeout(() => {
          const checkbox = document.querySelector(`.ais-RefinementList-checkbox[value="${activeOpt.dataset.target}"]`);
          checkbox.parentNode.click();

          const searchBox = document.querySelector('.ais-SearchBox-input');
          if(searchBox) {
            searchBox.focus();
          }
        }, 1000);

        shouldUpdate = false; // Prevent update for customer use choices inside search interface
      }
    }

    checkOptions();
  }, 1000);
};

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  const searchBox = document.querySelector('.ais-SearchBox-input');
  if(searchBox) {
    searchBox.addEventListener('keyup', e => {
      fireEvent('Did Search');
    });
  }

  document.body.addEventListener('click', e => {
    if(e.target.closest('.ais-SearchBox-submit')) {
      fireEvent('Clicked Search Icon');
    }
    
    if(e.target.closest(`.${shared.ID}-cats__cat`)) {
      if (e.target.getAttribute('data-target')) {
        fireEvent('Clicked Category - ' + e.target.getAttribute('data-target'));
      } else {
        fireEvent('Clicked Category - ' + e.target.closest(`.${shared.ID}-cats__cat`).getAttribute('data-target'));
      }
    }

    if(e.target.closest(`.${shared.ID}-dropdown`)) {
      let label = 'pre-search';
      if(searchBox.value) {
        label = 'post-search'
      }

      fireEvent('Dropdown Interaction - ' + label);
    }
    if(e.target.closest(`.${shared.ID}-dropdown__option`)) {
      let label = 'pre-search';
      if(searchBox.value) {
        label = 'post-search'
      }

      const choice = e.target.getAttribute('data-target');

      fireEvent('Dropdown Choice - ' + choice + ' - ' + label);
    }
  });

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
  

  // if(shared.VARIATION == 1) { 
  //   createDropdownFilter();  
  // }

  if(shared.VARIATION == 1) {
    createCategorySelector();  
  }
  
  checkOptions();
};
