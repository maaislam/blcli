/**
 * MP158 - Mobile Mega Nav
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import addLoginRegister from './addLoginRegister';
import getSubCategory from './getSubCategory';
import toggleCategoryShow from './toggleCategoryShow';
import toggleCategoryHide from './toggleCategoryHide';
import scrollCategoryToTop from './scrollCategoryToTop';
import backArrowEvent from './backArrowEvent';
import gaTracking from './gaTracking';
import gaEventParameters from './gaEventParameters';

const activate = () => {
  setup();

  // Experiment code
  // Add Discover link
  const subList = document.querySelector('.pl-3.px-3.my-4.font-weight-light');
  const discoverLink = `<div class="my-3">
  <a href="/en-gb/discover" title="Discover Advice and Guidance">Discover - Advice &amp; Guidance</a></div>`;
  subList.insertAdjacentHTML('afterbegin', discoverLink);

  pollerLite(['.nav_logo.nav_categoryTitle.cursor-pointer.p-3.js-navSwitchCategory'], () => {
    const navContainer = document.querySelector('.nav_category.bg-white.pb-3');
    // Add Back Arrow
    const topContainer = document.querySelector('.nav_logo.nav_categoryTitle.cursor-pointer.p-3.js-navSwitchCategory');
    const logoContainer = topContainer.querySelector('a');

    const backArrowContainer = `<div class="MP158-back"></div>`;
    topContainer.insertAdjacentHTML('beforeend', backArrowContainer);
    observer.connect([document.querySelector('.nav_category.bg-white.pb-3')], () => {
      // Checks if user is NOT on the first step (page) of the nav
      if (!navContainer.classList.contains('nav_category-selected')) {
        logoContainer.style.display = 'none';

        // Add Login Register CTA button to the bottom
        const catSelected = document.querySelector('.nav_category.bg-white.pb-3.nav_category-selected');
        addLoginRegister(catSelected);
        
        const subCategories = catSelected.querySelectorAll('ul.nav_group.list-unstyled.m-0.px-3 li.nav_groupLink.js-navSwitchCategory');
        const activeSubLevel = document.querySelector('ul.MP158-subLevel.current');
        // Hide previously selected sub-categories
        if (activeSubLevel) {
          toggleCategoryHide(document.querySelector('li.nav_groupLink.js-navSwitchCategory.active'), activeSubLevel);
        }
        [].forEach.call(subCategories, (subCat) => {
          /**
           * @desc Prevents on click default functionality
           * Adds related sub-categories to the selected category
           */
          subCat.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            // Check if Category is already selected
            const clickedCategorySubLevel = subCat.querySelector('.MP158-subLevel');
            if (clickedCategorySubLevel && clickedCategorySubLevel.classList.contains('current')) {
              toggleCategoryHide(document.querySelector('li.nav_groupLink.js-navSwitchCategory.active'), clickedCategorySubLevel);
            } else {
              const activeSubLevel = document.querySelector('ul.MP158-subLevel.current');
              // Hide previously selected sub-categories
              if (activeSubLevel) {
                toggleCategoryHide(document.querySelector('li.nav_groupLink.js-navSwitchCategory.active'), activeSubLevel);
              }

              if (subCat.querySelector('.MP158-subLevel')) {
                toggleCategoryShow(subCat, subCat.querySelector('.MP158-subLevel'));
                // scrollCategoryToTop(subCat);
              } else {
                getSubCategory(subCat);
                subCat.classList.add('active');
                // scrollCategoryToTop(subCat);
              }
            }  
          });
        });
      } else {
        logoContainer.style.display = 'block';
      }
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
      },
    });

    // Back Arrow
    backArrowEvent();

    // GA Tracking
    gaTracking();
  });
};

export default activate;
