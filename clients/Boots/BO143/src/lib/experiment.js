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
import filterLogic from './filterLogic';

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
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  const mobileBar = () => {
    const sortAndFilterBar = document.createElement('div');
    sortAndFilterBar.classList.add(`${ID}-sortFilter`);
    sortAndFilterBar.innerHTML = `<div class="${ID}-container"></div>`;

    document.querySelector('.controls.pagination_present').insertAdjacentElement('beforebegin', sortAndFilterBar);

  
    const sortEl = document.querySelector('.orderByDropdown.selectWrapper');
    const filterBar = document.querySelector('.mobile_facet_controls.select_filter').parentNode;
    filterBar.classList.add(`${ID}-filterButton`);

    sortAndFilterBar.querySelector(`.${ID}-container`).insertAdjacentElement('afterbegin', sortEl);
    sortAndFilterBar.querySelector(`.${ID}-container`).insertAdjacentElement('beforeend', filterBar);

    // move showing amount
    const showingAmount = document.querySelector('.showing_products');
    document.querySelector('.sorting_controls').insertAdjacentElement('afterend', showingAmount);
    
  }

  const desktopFilters = () => {
    const filters = document.createElement('div');
    filters.classList.add(`${ID}-filterBar`);
    filters.innerHTML = `
    <div class="${ID}-container">
    </div>
    <div class="${ID}-more">
      <div class="${ID}-moreText">View More Filters</div>
      <div class="${ID}-clearFilters">Clear Filters</div>
    </div>`;
    document.querySelector('#estore_category_heading').insertAdjacentElement('afterend', filters);


    // if there's a banner, move it
    const banner = document.querySelector('.cm-placement-slot5');
    if(banner) {
      document.querySelector('#estore_category_heading').insertAdjacentElement('afterend',banner);
    }
  }

  const stickyHeader = () => {
    
    window.onscroll = function() {stickBar()};

    let bar;

    let dropdownBox = '';

    pollerLite(['[aria-label*=orderBy]'], () => {
      dropdownBox = document.querySelector('[aria-label*=orderBy]');
    })
    

    if(window.innerWidth <= 767) {
      bar = document.querySelector(`.${ID}-sortFilter`);
    } else {
      bar = document.querySelector(`.${ID}-filterBar`);
    }

    const sticky = bar.offsetTop;


    function stickBar() {
      if (window.pageYOffset > sticky) {
        bar.classList.add("filter-fixed");
        if(dropdownBox !== '') {
          dropdownBox.classList.add('menu-fixed');
        }

      } else {
        bar.classList.remove("filter-fixed");
        if(dropdownBox !== '') {
          dropdownBox.classList.remove('menu-fixed');
        }
       
      }
    }
  }

  const stickyOnScrollUp = () => {
    var lastKnownScrollY = 0;
    var currentScrollY = 0;
    var eleHeader = null;


    let dropdownBox = '';

    pollerLite(['[aria-label*=orderBy]'], () => {
      dropdownBox = document.querySelector('[aria-label*=orderBy]');
    });

    if(window.innerWidth <= 767) {
      eleHeader = document.querySelector(`.${ID}-sortFilter`);
    } else {
      eleHeader = document.querySelector(`.${ID}-filterBar`);
    }

    var headerPos = eleHeader.offsetTop;

    const classes = {
      pinned: "filter-fixed",
      unpinned: "not-fixed",
    }
    function onScroll() {
      currentScrollY = window.pageYOffset

      if (window.pageYOffset <= headerPos) {
        unpin()
      } else if (currentScrollY < lastKnownScrollY) {
        pin()
      } else if (currentScrollY > lastKnownScrollY) {
        unpin()
      }
      lastKnownScrollY = currentScrollY
    }
    function pin() {
      if (eleHeader.classList.contains(classes.unpinned)) {
        eleHeader.classList.remove(classes.unpinned)
        eleHeader.classList.add(classes.pinned)
        if(dropdownBox !== '') {
          dropdownBox.classList.add('menu-fixed');
        }
      }
    }
    function unpin() {
      if (
        eleHeader.classList.contains(classes.pinned) ||
        !eleHeader.classList.contains(classes.unpinned)
      ) {
        eleHeader.classList.remove(classes.pinned)
        eleHeader.classList.add(classes.unpinned)

        if(dropdownBox !== '') {
          dropdownBox.classList.remove('menu-fixed');
        }
      }
    }
    window.onload = function() {
      
  
      document.addEventListener("scroll", onScroll, false)
    }
  }


  if(window.innerWidth <= 767) {
    mobileBar();
  } else {
    desktopFilters();
    filterLogic();
  }

  if(VARIATION === '2') {
    stickyHeader();
  }
  if(VARIATION === '3') {
    stickyOnScrollUp();
  }
};
