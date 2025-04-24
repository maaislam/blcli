/**
 * HSS001 - Navigation - A to Z Listing (Usability)
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import dataObj from './dropdownData';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const activate = () => {
  if(shared.VARIATION == 'control') {
    events.send('HSS001-control', 'activated');
  } else {
    // rest of experiment code
    events.send('HSS001-v1', 'activated');

    setup();

    // Write experiment code here
    pollerLite(['nav.main_nav ul'], () => {
      const mainNav = document.querySelector('nav.main_nav ul');
      if (mainNav) {
        const navItems = mainNav.querySelectorAll('li');
        const firstNavItem = navItems[0];
        firstNavItem.querySelector('a').innerText = 'Search by Category';

        const newNavItem = `<li class="La ${shared.ID}-menuItem auto">
          <a href="#" title="Search by A to Z">Search by A to Z</a>
            <div class="sub_menu hire_mega_menu drop_show" style="display: none;">
              <div class="categories">
                <div class="title">Browser over 141 categories</div>
                <div class="${shared.ID}-content"></div>
                <div class="${shared.ID}-alphabeticalOrder">
                  <ul style="width: 20px !important; text-align: center; padding-top: 10px !important;"></ul>
                </div>
                <!-- HSS-824 HSS Ireland branches and link mobile start -->
                <div class="county_selection_mobile">
                  <a href="#" class="county_uk"><img alt="UK Flag" title="" src="/_ui/desktop/theme-hire/images/uk-logo.jpg"><span>UK</span></a>
                  <div class="county_ie">
                    <a href="http://www.hss.ie/"><img alt="IE Flag" title="" src="/_ui/desktop/theme-hire/images/ie-logo.jpg"><span>IE</span></a>
                  </div>
                </div>
              <!-- HSS-824 HSS Ireland branches and link mobile end -->
            </div>
          </div>
        </li>`;
        document.querySelectorAll('nav.main_nav ul li')[0].insertAdjacentHTML('afterend', newNavItem);
      
        const greyBackground = document.querySelector('#menu-greyout');


        // ---- Show / Hide new dropdown
        const searchAlphabeticallyItem = document.querySelector(`.${shared.ID}-menuItem`);
        const newSubMenu = searchAlphabeticallyItem.querySelector(`.sub_menu`);
        searchAlphabeticallyItem.addEventListener('mouseover', () => {
          greyBackground.style.display = 'block';
          newSubMenu.classList.add('openednow');
          newSubMenu.style.display = 'block';

          const dropdownContainer = searchAlphabeticallyItem.querySelector('.sub_menu.hire_mega_menu.drop_show');
          searchAlphabeticallyItem.addEventListener('mouseleave', () => {
            newSubMenu.classList.remove('openednow');
            newSubMenu.style.display = 'none';
          });
        });

        // searchAlphabeticallyItem.addEventListener('mousemove', () => {
        //   greyBackground.style.display = 'block';
        //   newSubMenu.classList.add('openednow');
        //   newSubMenu.style.display = 'block';

        //   const dropdownContainer = searchAlphabeticallyItem.querySelector('.sub_menu.hire_mega_menu.drop_show');
        //   searchAlphabeticallyItem.addEventListener('mouseleave', () => {
        //     newSubMenu.classList.remove('openednow');
        //     newSubMenu.style.display = 'none';
        //   });
        // });

        searchAlphabeticallyItem.addEventListener('click', () => {
          greyBackground.style.display = 'block';
          newSubMenu.classList.add('openednow');
          newSubMenu.style.display = 'block';

          const dropdownContainer = searchAlphabeticallyItem.querySelector('.sub_menu.hire_mega_menu.drop_show');
          searchAlphabeticallyItem.addEventListener('mouseleave', () => {
            newSubMenu.classList.remove('openednow');
            newSubMenu.style.display = 'none';
          });
        });
        
      }
    });

    // --- Build - Populate dropdown content
    const dropdownList = document.querySelector(`.${shared.ID}-menuItem .categories .${shared.ID}-content`);
    
    for (const key in dataObj) {
      let content = '';
      if (dataObj.hasOwnProperty(key)) {
        const obj = dataObj[key];
        let listItems = '';
        // ---- Check Object size - Check how many categories a Letter has
        // --- If letter only has one, then show column on left
        const objSize = Object.keys(obj).length
        for (const k in obj) {
          if (obj.hasOwnProperty(k) && Object.keys(obj).length !== null) {
            if (obj[k].indexOf("https://www.hss.com/hire") > -1) {
              content = `<div class="${shared.ID}-title" id="${shared.ID}-${key}">${key}</div>`;
              listItems += `<li class="${shared.ID}-category">
                <a href="${obj[k]}">${k}</a>
              </li>`;
            }
          } else if (Object.keys(obj).length === null) {
            content = '';
            listItems = '';
          }
        }

        if (content !== '' && objSize > 1) {
          const item = `${content}
          <ul class="firstlevel" style="width: 90% !important;">  
            ${listItems}
          </ul>`

          dropdownList.insertAdjacentHTML('beforeend', item);
        } else if (content !== '' && objSize === 1) {
          const item = `${content}
          <ul class="firstlevel" style="width: 90% !important; column-count: 1 !important;">  
            ${listItems}
          </ul>`

          dropdownList.insertAdjacentHTML('beforeend', item);
        }
      }
    }

    let alphabetList = '';
    for (let i = 0; i < 26; i++) {
      let letter = '';
      let status = '';
      let link = '';
      letter = (i+10).toString(36);
      letter = letter.toUpperCase();
      if (!document.querySelector(`#${shared.ID}-${letter}`)) {
        status = 'inactive';
      } else {
        link = `#${shared.ID}-${letter}`;
      }
      //class="${shared.ID}-${letter}"
      alphabetList += `<li class="${status}" data-letter="${letter}" style="width: 20px !important; padding: 0px !important">
        <p data-letter="${letter}" style="border: none !important; padding: 1.5px 0 !important;">${letter}</p>
      </li>`;
    }
    document.querySelector(`.${shared.ID}-alphabeticalOrder ul`).insertAdjacentHTML('beforeend', alphabetList);

    // ---- Click - Scroll to Letter
    const alphabetLetters = document.querySelectorAll(`.${shared.ID}-alphabeticalOrder ul li`);
    [].forEach.call(alphabetLetters, (letter) => {
      if (!letter.classList.contains('inactive')) {
        letter.addEventListener('click', () => {
          const l = letter.getAttribute('data-letter');
          if (l) {
            const el = document.querySelector(`.${shared.ID}-menuItem .categories`);
            jQuery(el).scrollTop(jQuery(`#${shared.ID}-${l}`).position().top - 20 + el.scrollTop);
          }
        });
      }
    });
  }

  // --- Menu Nav
  const menuNav = document.querySelector('#menu.scroller-nav');
  observer.connect(menuNav, () => {
    if (menuNav.classList.contains('fixed')) {
      const searchAlphabeticallyItem = document.querySelector(`.${shared.ID}-menuItem`);
      const newSubMenu = searchAlphabeticallyItem.querySelector(`.sub_menu`);
      newSubMenu.classList.remove('openednow');
      newSubMenu.style.display = 'none';
    }
    
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
      // subtree: true,
    },
  });
};

export default activate;
