/**
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';
import pubSub from './PublishSubscribe';

/**
 * Helper add URL to menu
 */
const addAllLinkToMenu = () => {
  const navCats = document.querySelectorAll('.nav_category');

  let babyClothingCat = null;
  for(let i = 0; i < navCats.length; i++) {
    if(navCats[i].dataset.category && navCats[i].dataset.category.match(/8801350517820/i)) {
      babyClothingCat = navCats[i];
    }
  }

  if(babyClothingCat) {
    const navGroup = babyClothingCat.querySelector('.nav_group');
    if(navGroup) {
      const link = settings.VARIATION === 'control' ? '/c/clothing' : '/style-selector';

      navGroup.insertAdjacentHTML('beforeend', `
        <li class="nav_groupLink">
          <a class="d-block font-weight-light py-3 ${settings.ID}-addedlink" href="${link}">All Baby Clothing</a>
        </li>
      `);

      pubSub.publish('did-add-link-to-main-slide-nav-menu');

      const addedLink = document.querySelector(`.${settings.ID}-addedlink`);
      if(addedLink) {
        addedLink.addEventListener('click', () => pubSub.publish('did-click-added-link'));
      }
    }
  }
};

/**
 * Modify all links whose href matches /c/clothing
 */
const clothingLinkHrefsToStyleSelector = (container) => {
  const links = container.querySelectorAll('a');
  [].forEach.call(links, (link) => {
    const path = link.pathname;

    if(/c\/clothing$/i.test(path)) {
      if(settings.VARIATION != 'control') {
        link.setAttribute('href', '/style-selector');
        pubSub.publish('did-change-link-in-existing-nav-menu-item');
      }

      link.addEventListener('click', () => pubSub.publish('did-click-mp140-link'));
    }
  });
};

/**
 * Entry point for experiment
 */
const activate = () => {
  setup();

  // -----------------------------------------
  // Modify Nav (both control and variations)
  // -----------------------------------------
  pollerLite([
    '.nav.slide-panel-left-nav',
  ], () => {
    addAllLinkToMenu();
  });
  
  // -----------------------------------------
  // If variation and when MP140 nav exists
  // -----------------------------------------
  pollerLite([
    '.MP140_desktop_Navigation',
    '.header_nav',
  ], () => {
    const nav = document.querySelector('.header_nav');

    clothingLinkHrefsToStyleSelector(nav);
  });

  // MP140 V1 devved by Qubit
  pollerLite([
    '.menu-contain',
    '.header_nav',
  ], () => {
    const nav = document.querySelector('.menu-contain');

    clothingLinkHrefsToStyleSelector(nav);
  });
};

export default activate;
