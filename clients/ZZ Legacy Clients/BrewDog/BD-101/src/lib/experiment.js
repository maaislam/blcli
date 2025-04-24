/**
 * BD011 - Mobile Navigation
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { observer, events } from '../../../../../lib/utils';
import markup from './markup';

const activate = () => {
  setup()

  const {ID, VARIATION} = settings;

  const runBuild = () => {
    if(document.querySelector(`.${ID}-nav`)) {
      return;
    }

    const mobileMenu = document.querySelector('#brewdog_mobile_menu');
    mobileMenu.innerHTML = markup();

    const accordionLinks = document.querySelectorAll(`.${ID}-has-kids`);
    [].forEach.call(accordionLinks, (l) => {
      l.addEventListener('click', () => {
        if(l.classList.contains('xopen')) {
          l.classList.remove('xopen');
        } else {
          l.classList.add('xopen');
        }
      });
    });

    // --------------
    // --- Events ---
    // --------------
    const menu = document.querySelector('.header-mobile__actions__action');
    if(menu) {
      menu.addEventListener('click', () => {
        events.send(`${ID}-${VARIATION}`, `${ID}-Click`, 'Menu Opener');
      });
    }

    [].forEach.call(document.querySelectorAll(`.${ID}-has-kids > a`), (k) => {
      k.addEventListener('click', () => {
        let label = 'Level1|';

        const title = k.querySelector(`.${ID}-nav__link-title`);
        if(title) {
          label += title.innerText.trim() + '|';
        }
        label += k.parentNode.classList.contains('xopen') ? 'was-open' : 'was-closed';

        events.send(`${ID}-${VARIATION}`, `${ID}-Click`, label);
      });
    });

    [].forEach.call(document.querySelectorAll(`.${ID}-submenu a`), (k) => {
      k.addEventListener('click', () => {
        let label = 'Level 2';

        const title = k.querySelector(`.${ID}-nav__link-title`);
        if(title) {
          label += '|' + title.innerText.trim();
        }

        events.send(`${ID}-${VARIATION}`, `${ID}-Click`, label);
      });
    });

    [].forEach.call(document.querySelectorAll(`.${ID}-nav__block:not(.${ID}-nav__main) li a`), (k) => {
      k.addEventListener('click', () => {
        let label = 'Level 1';

        const title = k.querySelector(`[class*=title]`);
        if(title) {
          label += '|' + title.innerText.trim();
        }

        events.send(`${ID}-${VARIATION}`, `${ID}-Click`, label);
      });
    });
  };

  runBuild();

  const header = document.querySelector('.header');
  
  observer.connect(header, () => {
    runBuild();
  }, {
      config: {
          attributes: true,
          subtree: true,
          childList: true,
      }
  });

};

/**
 * @desc In case of runtime errors --- Client Addition
 */
try {
  activate();
} catch(e){ console.log('UC Mobile Menu'); console.log(e);}

export default activate;
