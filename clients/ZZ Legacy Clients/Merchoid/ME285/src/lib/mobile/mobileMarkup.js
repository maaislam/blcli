/**
 * Markup for mobile nav with all logic
 */

import shared from "../shared";
import { navLinks } from "../navData";
import scrollToElement from "../scrollToEl";

const { ID } = shared;

export default class MobileNavigation {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

        const links = navLinks;

        const element = document.createElement('div');
        element.classList.add(`${ID}_navigationWrapper`);
        element.innerHTML = `
        <div class="${ID}_navigationContainer">
            <div class="${ID}_navHeader">
                <div class="${ID}_headerInner">
                    <div class="${ID}_logo"><a href="/"></a></div>
                    <div class="${ID}_rightIcons">
                        <div class="${ID}_search"></div>
                        <div class="${ID}_cart"><a href="/checkout/"></a></div>
                    </div>
                    <div class="${ID}_navClose"></div>
                </div>
                <div class="${ID}_searchBox">
                    <div class="${ID}_closeSearch"></div>
                </div>
            </div>
        
            <div class="${ID}_navLinks ${ID}_navLvl1"></div>
        </div>`;

        this.component = element;

        // loop through nav links
        Object.keys(links).forEach((i) => {
            const data = links[i];
            const level1Link = document.createElement('div');
            level1Link.classList.add(`${ID}_navLink`);
            level1Link.innerHTML = `
            <li class="${ID}_linktext">
                <div class="${ID}_icon" style="background-image:url(${data.icon})"></div>
                <span>${[i][0]}</span>
                ${data.navLink ? `<a href="${data.navLink}"></a>` : ''}
            </li>
            
            ${data.secondLevel ? `
            <div class="${ID}_navLvl2">
                <div class="${ID}_backLink"><span></span><h3>${[i][0]}</h3></div>
                <div class="${ID}_lvl2Links">
                </div>
            </div>` : ''}`;

        
            // help and brands are different
            if([i][0] === 'Help') {
                level1Link.classList.add(`${ID}_help`);
            }

            if([i][0] === 'Brands') {
                level1Link.classList.add(`${ID}_brands`);
            }
            if([i][0] === 'Home') {
              level1Link.classList.add(`${ID}_Home`);
          }

            // add second level
            if(data.secondLevel) {
                level1Link.classList.add(`${ID}_category`);
                Object.keys(data.secondLevel).forEach((x) => {
                    const lvl2El = data.secondLevel[x];
                    const level2Link = document.createElement('li');
                    level2Link.classList.add(`${ID}_navLink`);
                    level2Link.innerHTML = `
                        <div class="${ID}_icon" style="background-image:url(${lvl2El.icon})"></div>
                        <span>${[x][0]}</span>
                        <a href="${lvl2El.secondlink}"></a>`;
                        level1Link.querySelector(`.${ID}_lvl2Links`).appendChild(level2Link);
                });

                // add the view all brands link on mobile
                if([i][0] === 'Brands') {
                  level1Link.querySelector(`.${ID}_lvl2Links`).insertAdjacentHTML(`beforeend`, `<a class="${ID}-brandsCTA" href="https://www.merchoid.com/uk/brands/">View A-Z of brands</a>`);
                }
            }

            element.querySelector(`.${ID}_navLinks`).appendChild(level1Link);
        });
    }
  
    bindEvents() {
      const { component } = this;
      const navToggle = document.querySelector('.header.content .action.nav-toggle');

      const removeActive = () => {
        const activeLvl2 = document.querySelectorAll(`.${ID}_secondLevel_active`);
        if(activeLvl2) {
          [...activeLvl2].forEach((el) => {
            el.classList.remove(`${ID}_secondLevel_active`);
            el.classList.remove(`${ID}_lvl2Hide`);
          });
        }
       }

      // trigger nav
      const overlay = document.querySelector(`.${ID}-overlay`);

      navToggle.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        overlay.classList.add(`${ID}_overlayActive`);
        component.classList.add(`${ID}_navActive`);
        component.classList.remove(`${ID}_navHide`);

        document.body.classList.add(`${ID}_noScroll`);
      });

      // close nav
      component.querySelector(`.${ID}_navClose`).addEventListener('click', () => {
        document.querySelector(`.${ID}_navLvl1`).scrollTop = 0;
        component.classList.remove(`${ID}_navActive`);
        component.classList.add(`${ID}_navHide`);
        document.body.classList.remove(`${ID}_noScroll`);
        component.querySelector(`.${ID}_searchBox`).classList.remove(`${ID}_searchActive`);
        overlay.classList.remove(`${ID}_overlayActive`);
        removeActive();
        removeClassToSecondNav();
      });



      // helpers for when search is opened/closed
      const addClassToSecondNav = () => {
        const navLinks = component.querySelectorAll(`.${ID}_category`);
        for (let index = 0; index < navLinks.length; index += 1) {
          const element = navLinks[index];
          element.classList.add(`${ID}-searchOpen`);
        }
      }
      const removeClassToSecondNav = () => {
        const navLinks = component.querySelectorAll(`.${ID}_category`);
        for (let index = 0; index < navLinks.length; index += 1) {
          const element = navLinks[index];
          element.classList.remove(`${ID}-searchOpen`);
        }
      }

      // show search 
      const searchToggle = component.querySelector(`.${ID}_headerInner .${ID}_search`);
      searchToggle.addEventListener('click', () => {
        component.querySelector(`.${ID}_searchBox`).classList.add(`${ID}_searchActive`);
        addClassToSecondNav();
      });

      // hide search
       const searchClose = component.querySelector(`.${ID}_closeSearch`);
       searchClose.addEventListener('click', () => {
         component.querySelector(`.${ID}_searchBox`).classList.remove(`${ID}_searchActive`);
         removeClassToSecondNav();
       });


       // second level toggles 
       const navLinks = component.querySelectorAll(`.${ID}_category`);
       for (let index = 0; index < navLinks.length; index += 1) {
         const element = navLinks[index];
        
         element.querySelector(`.${ID}_linktext`).addEventListener('click', (e) => {
          // remove any that are active
          removeActive();

          e.currentTarget.parentNode.querySelector(`.${ID}_navLvl2`).classList.add(`${ID}_secondLevel_active`);
          e.currentTarget.parentNode.querySelector(`.${ID}_navLvl2`).classList.remove(`${ID}_lvl2Hide`);
         });
       }

       // back button clicks
       const lvl2BackButtons = component.querySelectorAll(`.${ID}_backLink`);
       for (let x = 0; x < lvl2BackButtons.length; x += 1) {
         const back = lvl2BackButtons[x];
         back.addEventListener('click', () => {

           back.parentNode.classList.add(`${ID}_lvl2Hide`);
           back.parentNode.classList.remove(`${ID}_secondLevel_active`);

           document.querySelector(`.${ID}_navLvl1`).scrollTop = 0;
         });
       }


       // overlay click
       overlay.addEventListener('click', () => {
          overlay.classList.remove(`${ID}_overlayActive`);
          component.classList.remove(`${ID}_navActive`);
          component.classList.add(`${ID}_navHide`);
          document.body.classList.remove(`${ID}_noScroll`);
          component.querySelector(`.${ID}_searchBox`).classList.remove(`${ID}_searchActive`);
          removeActive();
          removeClassToSecondNav();
       });


       // search events
       const mobileSearch = document.querySelector('.form.minisearch');
       const navSearch = component.querySelector(`.${ID}_searchBox`);
       navSearch.insertAdjacentElement('afterbegin', mobileSearch);
       
    }
  
    render() {
      const { component } = this;
      document.body.appendChild(component);
     
    }
  }