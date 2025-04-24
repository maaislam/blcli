/**
 * PC-274 - Two tier navigation (Mobile)
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
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
  const clickBack = (el) => {
    if (el.parentNode.querySelector('a.drop.active span.icon')) {
      el.parentNode.querySelector('a.drop.active span.icon').click();
    }
  }

  // --- Tracking Events
  document.querySelector('button.menu-icon.main-header-menu-trigger').addEventListener('click', (e) => {
    fireEvent('Click - Open Mobile Nav');
  });

  pollerLite(['nav.main-header-menu li'], () => {
    const allCategories = document.querySelectorAll('nav.main-header-menu li');
    [].forEach.call(allCategories, (cat) => {
      let categoryTitle = '';
      let categoryParent = '';
      if (cat.classList.contains('loaded')) {
        categoryTitle = cat.querySelector('span.text').innerText.trim();
      } else if (!cat.querySelector('span.text') && cat.querySelector('a')) {
        categoryTitle = cat.querySelector('a').innerText.trim();

        if (cat.closest('.col_1.loaded') && cat.closest('.col_1.loaded').querySelector('a')) {
          categoryParent = `${cat.closest('.col_1.loaded').querySelector('a').innerText.trim()} - `;
        }
      }

      cat.addEventListener('click', (e) => {
        if (!cat.classList.contains(`${ID}-click-event`)) {
          fireEvent(`Click - Category: ${categoryParent}${categoryTitle}`);
          cat.classList.add(`${ID}-click-event`);
          // if (cat.closest('.loaded') && !cat.closest('.loaded').classList.contains(`${ID}-click-event`)) {

          // }
        }
      });
      
    });
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


  // --- Add Back Button
  const backButton = `<div class="${ID}-back__btn hidden"><span class="icon"></span></div>`;
  pollerLite(['nav.main-header-menu.touchstart-active.active ul'], () => {
    document.querySelector('nav.main-header-menu.touchstart-active.active ul').insertAdjacentHTML('afterbegin', backButton);
  });

  /**
   * @desc Add an observer on each main category
   * and show / hide relevant subcategories
   */
  pollerLite(['.main-header-menu ul li.loaded>a.drop'], () => {
    setTimeout(() => {
  
    const allMenuItems = document.querySelectorAll('.main-header-menu ul li.loaded>a.drop');
    const bottomCategories = document.querySelectorAll('li.main-header-menu__stores');
    
    [].forEach.call(allMenuItems, (item) => {
      // --- Add new category link - "Shop All [in category]" link
      if (!item.parentNode.classList.contains('last-child')) {
        const catLink = item.getAttribute('href');
        const catName = item.querySelector('span.text').innerText.trim();
        item.setAttribute('href', 'javascript:void(0)');
        item.addEventListener('click', (e) => {
          item.querySelector('span.icon').click();
        });
        item.insertAdjacentHTML('afterend', `<a class="${ID}-category__link" href="${catLink}"><div>Shop All ${catName}<span class="icon"></span></div></a>`);
      }

      observer.connect(item, () => {
        if (item.classList.contains('active')) {

          document.querySelector('.main-header-menu__message').classList.add('hidden');
          document.querySelector('.main-header-menu__logged-out').classList.add('hidden');

          document.querySelector(`.${ID}-back__btn`).classList.remove('hidden');

          document.querySelector('nav.main-header-menu.touchstart-active.active ul').classList.add('hidden-logo');

          // --- Hide the rest of categories
          [].forEach.call(allMenuItems, (el) => {
            if (!el.classList.contains('active')) {
              el.parentNode.classList.add('hidden');
            }
            if (el.classList.contains('active')) {
              el.parentNode.querySelector('a.drop.active').classList.add('open');

              document.querySelector(`.${ID}-back__btn`).addEventListener('click', (e) => {
                clickBack(el);
              });
            }
          });

          // --- Hide Store Locator / Cookery School
          [].forEach.call(bottomCategories, (cat) => {
            cat.classList.add('hidden');
          });
        } else {
          document.querySelector('.main-header-menu__message').classList.remove('hidden');
          document.querySelector('.main-header-menu__logged-out').classList.remove('hidden');

          document.querySelector(`.${ID}-back__btn`).classList.add('hidden');

          document.querySelector('nav.main-header-menu.touchstart-active.active ul').classList.remove('hidden-logo');

          // --- Show all categories
          [].forEach.call(allMenuItems, (el) => {
            el.parentNode.classList.remove('hidden');

            if (document.querySelector('a.drop.open')) {
              document.querySelector('a.drop.open').classList.remove('open');
            }
            
            document.querySelector(`.${ID}-back__btn`).removeEventListener('click', clickBack(el));
          });

          // --- Show Store Locator / Cookery School
          [].forEach.call(bottomCategories, (cat) => {
            cat.classList.remove('hidden');
          });
        }
      }, {
        throttle: 200,
        config: {
          attributes: true,
          childList: false,
          // subtree: true,
        },
      });
    });

    }, 700);
  });


  
};
