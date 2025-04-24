/**
 * HSS010 - A to Z Mobile Navigation
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, makeSticky } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import dataObj from './dropdownData';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const activate = () => {
  if(shared.VARIATION == 'control') {
    // events.send(`${shared.ID}-control`, 'activated');
    events.send(`${shared.ID}-control`, 'activated', '', { sendOnce: true });
  } else {
    // rest of experiment code
    // events.send(`${shared.ID}-v1`, 'activated');
    events.send(`${shared.ID}-v1`, 'activated', '', { sendOnce: true });
    setup();

    pollerLite(['#menu .main_nav ul#nav li.all_menu'], () => {
      // --- Menu Nav
      const menuNavFirstItem = document.querySelector('#menu .main_nav ul#nav li.all_menu');

      const dropdownList = menuNavFirstItem.querySelector('.sub_menu.hire_mega_menu.drop_show div.categories ul');
      dropdownList.classList.add(`${shared.ID}-categoriesList`);
      const newList = `<ul class="HSS010-list__wrapper">
        <li class="firstlevel" id="${shared.ID}-category">
          <a href="javascript:void(0);">Search by category</a>
        </li>
        <li class="firstlevel" style="/* visibility: hidden; */" id="${shared.ID}-alphabetical">
          <a href="javascript:void(0);">Search by A - Z</a>
        </li>
      </ul>`;
      dropdownList.insertAdjacentHTML('beforebegin', newList);

      dropdownList.insertAdjacentHTML('beforeend', `<li class="firstlevel cta" style="/* visibility: hidden; */" id="HSS010-alphabetical-inside">
        <a href="javascript:void(0);">Search by A - Z</a>
      </li>`);

      let alphabetList = '';
      for (let i = 0; i < 26; i++) {
        let letter = '';
        let status = '';
        let link = '';
        letter = (i+10).toString(36);
        letter = letter.toUpperCase();
        // if (!document.querySelector(`#${shared.ID}-${letter}`)) {
        //   status = 'inactive';
        // } else {
        //   link = `#${shared.ID}-${letter}`;
        // }
        //class="${shared.ID}-${letter}"
        alphabetList += `<li class="${status}" data-letter="${letter}">
          <p data-letter="${letter}">${letter}</p>
        </li>`;
      }

      const alphabeticalList = `<ul class="${shared.ID}-alphabeticalList__wrapper hide">
        <div class="${shared.ID}-searchByLetter__wrapper">
          <ul class="${shared.ID}-searchByLetter">
            ${alphabetList}
            <li class="${status}" data-letter="misc">
              <p data-letter="misc">#</p>
            </li>
          </ul>
        </div>
      </ul>`;

      dropdownList.insertAdjacentHTML('beforebegin', alphabeticalList);

      // --- Create Alphabetical list and populate content
      for (const key in dataObj) {
        let content = '';
        let label = '';
        let listItems = '';
        if (dataObj.hasOwnProperty(key)) {
          const obj = dataObj[key];
          // let listItems = '';
          const objSize = Object.keys(obj).length;
          if (key === '#') {
            label = `<label id="${shared.ID}-misc">#</label>`;
          } else {
            label = `<label id="${shared.ID}-${key}">${key}</label>`;
          }
          
          for (const k in obj) {
            if (obj.hasOwnProperty(k) && Object.keys(obj).length !== null) {
              if (obj[k].indexOf("https://www.hss.com/hire") > -1) {
                // content = `<div class="${shared.ID}-title" id="${shared.ID}-${key}">${key}</div>`;
                // label = `<label id="${shared.ID}-${key}">${key}</label>`;
                listItems += `<a href="${obj[k]}">${k}</a>`;
              }
            } else if (Object.keys(obj).length === null) {
              content = '';
              listItems = '';
            }

          }

        }

        // if (content !== '') {
          content = `<li class="firstlevel">
            ${label}
            ${listItems}
          </li>`;
          document.querySelector(`.${shared.ID}-alphabeticalList__wrapper`).insertAdjacentHTML('beforeend', content);
        // }
        
      }

      

      const alphabeticalListEl = document.querySelector(`ul.${shared.ID}-alphabeticalList__wrapper`);

      // --- Search By - Event listeners
      const searchByCatCTA = document.querySelector(`#${shared.ID}-category`);
      const searchByAlphabeticalCTA = document.querySelector(`#${shared.ID}-alphabetical`);
      const searchByAlphabeticalInsideCTA = document.querySelector(`#${shared.ID}-alphabetical-inside`);

      // -- Search By Category
      searchByCatCTA.addEventListener('click', () => {
        dropdownList.classList.toggle('show');
        // dropdownList.classList.toggle('active');
        searchByCatCTA.classList.toggle('open');

        if (dropdownList.classList.contains('show')) {
          searchByAlphabeticalCTA.classList.add('hide');
          searchByAlphabeticalCTA.classList.remove('open');
          alphabeticalListEl.classList.add('hide');
        } else {
          searchByAlphabeticalCTA.classList.remove('hide');
          // alphabeticalListEl.classList.remove('hide');
        }
      });
      // -- Search Alphabetically
      searchByAlphabeticalCTA.addEventListener('click', () => {
        searchByAlphabeticalCTA.classList.toggle('open');
        alphabeticalListEl.classList.toggle('hide');

        if (!alphabeticalListEl.classList.contains('hide')) {
          dropdownList.classList.add('hide');
        } else {
          dropdownList.classList.remove('hide');
        }
      });
      // - Inside Dropdown
      searchByAlphabeticalInsideCTA.addEventListener('click', () => {
        alphabeticalListEl.classList.remove('hide');
        alphabeticalListEl.classList.add('open');
        
        searchByAlphabeticalCTA.classList.add('open');
        searchByAlphabeticalCTA.classList.remove('hide');
        dropdownList.classList.remove('show');
        searchByCatCTA.classList.remove('open');

        window.scroll({
          top: 0,
          behavior: 'smooth'
        });

        if (!alphabeticalListEl.classList.contains('hide')) {
          dropdownList.classList.add('hide');
        } else {
          dropdownList.classList.remove('hide');
        }
      });


      // ---- Click - Scroll to Letter
      const alphabetLetters = document.querySelectorAll(`ul.${shared.ID}-searchByLetter li`);
      let searchByLetterContainer = document.querySelector(`.${shared.ID}-searchByLetter__wrapper`);
      [].forEach.call(alphabetLetters, (letter) => {
        if (!letter.classList.contains('inactive')) {
          letter.addEventListener('click', () => {
            const l = letter.getAttribute('data-letter');
            if (l) {
              // const el = document.querySelector(`.${shared.ID}-alphabeticalList__wrapper`);
              // jQuery(el).scrollTop(jQuery(`#${shared.ID}-${l}`).position().top - 20 + el.scrollTop);
              // document.querySelector(`#${shared.ID}-${l}`).scrollIntoView({
              //   behavior: 'smooth'
              // });
              let additionalTopDistance = 0;
              
              if (window.innerWidth > 320) {
                if (searchByLetterContainer.getBoundingClientRect().top <= 248 && searchByLetterContainer.getBoundingClientRect().top >= 148) {
                  additionalTopDistance = searchByLetterContainer.offsetHeight + 100;
                } else {
                  additionalTopDistance = searchByLetterContainer.offsetHeight;
                }
                
              } else {
                additionalTopDistance = document.querySelector(`.${shared.ID}-searchByLetter__wrapper`).offsetHeight;
                if (searchByLetterContainer.getBoundingClientRect().top <= 248 && searchByLetterContainer.getBoundingClientRect().top >= 148) {
                  additionalTopDistance = searchByLetterContainer.offsetHeight + 145;
                } else {
                  additionalTopDistance = searchByLetterContainer.offsetHeight;
                }
              }
              const y = document.querySelector(`#${shared.ID}-${l}`).getBoundingClientRect().top + window.scrollY - additionalTopDistance;
              // console.log('scroll y:');
              // console.log(y);
              window.scroll({
                top: y,
                behavior: 'smooth'
              });
            }
          });
        }
      });


      // --- Make sticky
      const header = document.querySelector('#HSS010-A');
      makeSticky(header);
      
      // observer.connect(menuNavFirstItem, () => {
      //   console.log('SOMETHING   HAS  CHANGED  !');
      //   if (menuNavFirstItem.classList.contains('open')) {
      //     // const dropdownList = menuNavFirstItem.querySelector('.sub_menu.hire_mega_menu.drop_show div.categories ul');
      //     // dropdownList.classList.add(`${shared.ID}-categoriesList`);
      //     // const newList = `<ul class="HSS010-list__wrapper">
      //     //   <li class="firstlevel">
      //     //     <a href="javascript:void(0);">Search By Category</a>
      //     //   </li>
      //     //   <li class="firstlevel" style="/* visibility: hidden; */">
      //     //     <a href="javascript:void(0);">Search A to Z</a>
      //     //   </li>
      //     // </ul>`;
      //     // dropdownList.insertAdjacentHTML('beforebegin', newList);
      //   }
        
      // }, {
      //   throttle: 200,
      //   config: {
      //     attributes: true,
      //     childList: false,
      //     // subtree: true,
      //   },
      // });
    });







    
  }
};

export default activate;
