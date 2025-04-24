/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { events, pollerLite } from '../../../../../lib/utils';
import {
  cookieOpt,
  setup
} from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
  const getAllInnerLinks = () => {

    const innerLinks = document.querySelectorAll('.oct-decorative-panel__inner__small-layout .oct-navigation__side .oct-navigation__side__container a');
        if(innerLinks) {
          for (let i = 0; i < innerLinks.length; i += 1) {
            const links = innerLinks[i];
            links.addEventListener('click', () => {
              events.send(`${ID} v${VARIATION}`, 'click', 'nav link');
            });
          }
      }

  }

  const clickEvents = () => {
    const heroBanner = document.querySelector('.oct-experience-fragment .oct-link');
    if(heroBanner) {
      heroBanner.addEventListener('click', () => {
        events.send(`${ID} v${VARIATION}`, 'click', 'hero banner');
      });
    }

    const allOuterLinks = () => {
      const outerLinks = document.querySelectorAll(`.oct-decorative-panel__inner__small-layout .oct-navigation__child`);
      for (let index = 0; index < outerLinks.length; index += 1) {
        const element = outerLinks[index];
        if(element) {
          element.addEventListener('click', (e) => {
            events.send(`${ID} v${VARIATION}`, 'click', 'outer nav link');
            if(e.currentTarget.querySelector('span').className === 'oct-navigation__expand oct-navigation__expand--plus') {
              pollerLite(['.oct-navigation__grand-child--child a'], () => {
                getAllInnerLinks();
              });
            }
          });
        }
      }
    }

    allOuterLinks();
  }

  /**
   * Create the new nav container
   */

  const navBlock = () => {
    const category = document.querySelector('.oct-heading .oct-heading__text');
    // create outer nav block
    const smallNav = document.createElement('div');
    smallNav.classList.add(`${ID}-smallNav`);
    smallNav.innerHTML = `
    ${VARIATION === '2' ? `
    <div class="${ID}-close"></div>
      <h3>Shop all ${category.textContent}</h3>` 
    : ''}
    <div class="${ID}-navLinks"></div>
    ${VARIATION === '1' ? `<div class="${ID}-more"><span>Show All</span></div>` : ''}`;

    const currentNav = document.querySelector('.oct-decorative-panel__inner__small-layout .oct-navigation');
      
    
    if(VARIATION !== '3') {
      currentNav.insertAdjacentElement('beforebegin', smallNav);
    } else {
      document.querySelector(`.${ID}-menubutton`).insertAdjacentElement('afterend', smallNav);
    }


    smallNav.querySelector(`.${ID}-navLinks`).appendChild(currentNav);


    // click on show more
    if (VARIATION === '1') {
      smallNav.querySelector(`.${ID}-more`).addEventListener('click', () => {
        toggleLinks();
      });

      // on any of the accordion clicks, open or close full nav
      const accordions = smallNav.querySelectorAll('.oct-navigation__child');
      for (let index = 0; index < accordions.length; index += 1) {
        const element = accordions[index];
        
        if(element.querySelector('span')) {
          element.addEventListener('click', (e) => {

            if(e.currentTarget.querySelector('span').className === 'oct-navigation__expand oct-navigation__expand--plus') {
              smallNav.classList.add(`${ID}-expanded`);
              smallNav.querySelector(`.${ID}-more`).classList.add(`${ID}-showLess`);
              smallNav.querySelector(`.${ID}-more span`).textContent = 'Show Less';
            } else {
              toggleLinks();
              element.querySelector('div').click();
              smallNav.classList.remove(`${ID}-expanded`);
              smallNav.querySelector(`.${ID}-more`).classList.remove(`${ID}-showLess`);
              smallNav.querySelector(`.${ID}-more span`).textContent = 'Show More';
            }
          });
        }
      }
    }

    if (VARIATION === '2') {
      document.querySelector(`.${ID}-button`).addEventListener('click', () => {
        toggleLinks();
      });
      document.querySelector(`.${ID}-smallNav .${ID}-close`).addEventListener('click', () => {
        toggleLinks();
      });

      document.querySelector(`.${ID}-overlay`).addEventListener('click', () => {
        toggleLinks();
      });
    }

    if (VARIATION === '3') {
      document.querySelector(`.${ID}-menubutton`).addEventListener('click', () => {
        toggleLinks();
      });
    }
  }

  /**
   * Menu expand functionality
   */

  const toggleLinks = () => {
    const smallNav = document.querySelector(`.${ID}-smallNav`);
    
    const overlay = document.querySelector(`.${ID}-overlay`);

    // hide 
    if (smallNav.classList.contains(`${ID}-expanded`)) {
      smallNav.classList.remove(`${ID}-expanded`);
       
      if (VARIATION === '1') {
        smallNav.querySelector(`.${ID}-more`).classList.remove(`${ID}-showLess`);
        smallNav.querySelector(`.${ID}-more span`).textContent = 'Show More';

        // if any accordions are open, close them
        const accordions = smallNav.querySelectorAll('.oct-navigation__child');
        for (let index = 0; index < accordions.length; index += 1) {
          const element = accordions[index];
          if(element.querySelector('span')) {
            if(element.querySelector('span').className === 'oct-navigation__expand') {
              element.querySelector('div').click();
            }
          }
        }
      }
      if(VARIATION === '2') {
        smallNav.classList.add(`${ID}-hidden`);
        document.body.classList.remove(`${ID}-noScroll`);
        if(overlay) {
          overlay.classList.remove(`${ID}-overlayShow`);
        }
      }

      if(VARIATION === '3') {
        const menuTrigger = document.querySelector(`.${ID}-menubutton`);
        menuTrigger.classList.remove(`${ID}-menuOpen`);
      }

    } else {

      // show 
      smallNav.classList.add(`${ID}-expanded`);
     
      if (VARIATION === '1') {
        smallNav.querySelector(`.${ID}-more`).classList.add(`${ID}-showLess`);
        smallNav.querySelector(`.${ID}-more span`).textContent = 'Show Less';
      }

      if(VARIATION === '2') {
        document.body.classList.add(`${ID}-noScroll`);
        smallNav.classList.remove(`${ID}-hidden`);
        if(overlay) {
          overlay.classList.add(`${ID}-overlayShow`);
        }
      }
      if(VARIATION === '3') {
        const menuTrigger = document.querySelector(`.${ID}-menubutton`);
        menuTrigger.classList.add(`${ID}-menuOpen`);
      }
    }
  }

  /**
   * Buttons 
   */

  // create show all button & overlay 
  const showAllButton = () => {
    const category = document.querySelector('.oct-heading__text');
    const allButton = document.createElement('div');
    allButton.classList.add(`${ID}-button`);
    allButton.innerHTML = `Shop All ${category.textContent}`;

    const currentNav = document.querySelector('.oct-decorative-panel__inner__small-layout .oct-navigation');
    currentNav.insertAdjacentElement('beforebegin', allButton);

    document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
  }

  const menuButton = () => {
    const category = document.querySelector('.oct-heading__text');
    const menuButton = document.createElement('div');
    menuButton.classList.add(`${ID}-menubutton`);
    menuButton.innerHTML = `${category.textContent} Menu <span></span>`;

    document.querySelector('.oct-heading').parentNode.parentNode.insertAdjacentElement('afterend', menuButton);
  }

  if (VARIATION === 'control') {
    clickEvents();
  }
  if (VARIATION === '1') {
    if(document.querySelectorAll('.oct-navigation__side .oct-navigation__child').length >= 6) {
      document.body.classList.add(`${ID}-morethan5`);
      navBlock();
      clickEvents();
    }
  }

  if (VARIATION === '2') {
    showAllButton();
    navBlock();
    clickEvents();
  }

  if (VARIATION === '3') {
    menuButton();
    navBlock();
    clickEvents();
  }

};
