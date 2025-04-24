/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver } from './winstack';
import { events } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';
import menuConfig from './menu-config';
import { menuGenerator } from './menu-generator';

/**
 * Entry point for experiment
 */
export default () => {
  setup();

  const canvasMenuWrap = document.querySelector('off-canvas-menu.off-canvas');

  // ---------------------------------------------------------
  // Render experiment
  // ---------------------------------------------------------
  // Level 1
  let menuHtml = `<div class="${shared.ID}-navwrap">`;
  menuHtml += menuGenerator(menuConfig, 1);

  // Level 2s
  Object.keys(menuConfig.hierarchical).forEach((k) => {
    if(menuConfig.hierarchical[k].sublevel) {
      menuHtml += menuGenerator(menuConfig.hierarchical[k].sublevel, 2);
    }
  });

  menuHtml += '</div>';

  const navContentElm = document.querySelector('off-canvas-menu [mobilenav-group-name="main"]');
  navContentElm.innerHTML = menuHtml;

  // ---------------------------------------------------------
  // Nav Handling
  // ---------------------------------------------------------
  [].forEach.call(document.querySelectorAll(`.${shared.ID}-menu__nav-item-link[data-target]`), (item) => {
    addEventListener(item, 'click', (e) => {
      const target = e.currentTarget.dataset.target;

      if(target) {
        const corresponding = document.querySelector(`.${shared.ID}-menu[data-target="${target}"]`);
        if(corresponding) {
          canvasMenuWrap.scrollTo(0,0);

          corresponding.classList.add('slide-in');

          canvasMenuWrap.classList.add('level2');
        }
      }
    });
  });

  [].forEach.call(document.querySelectorAll(`.${shared.ID}-menu__nav-back`), (item) => {
    console.log('c');
    addEventListener(item, 'click', (e) => {
      canvasMenuWrap.classList.remove('level2');
      [].forEach.call(document.querySelectorAll(`.${shared.ID}-menu--level-2`), (level2) => {
        level2.classList.remove('slide-in');
      });
    });
  });
  
  // ---------------------------------------------------------
  // placeholder in search
  // ---------------------------------------------------------
  const search = document.querySelector('search-off-canvas input[type=text]');
  if(search) {
    search.setAttribute('placeholder', 'search over 600 biscuits');
  }
};
