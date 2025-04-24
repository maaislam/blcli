import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';

const { ID, VARIATION } = shared;

export const getMenuItems = () => {
  let menuData = {};
  let menuItems = [];
  const allMenuItems = document.querySelectorAll('ul#main-navigation>li.top-level');
  let menuContent = '';
  [].forEach.call(allMenuItems, (item) => {
    let title = item.querySelector('a').innerText.trim().toLowerCase();
    if (VARIATION == '1') {
      menuContent += `<li class="${ID}-top-level ${title.replace(' ', '-')}" data-item="${title.replace(' ', '-')}">${item.innerHTML}</li>`;
    } else if (VARIATION == '2') {
      menuData[`${title.replace(' ', '-')}`] = `<li class="${ID}-top-level ${title.replace(' ', '-')}" data-item="${title.replace(' ', '-')}">${item.innerHTML}</li>`;
      menuItems.push(`${title.replace(' ', '-')}`);
    }
  });

  if (VARIATION == '2') {
    orderAlphabetically(menuItems);
    
    for (let i = 0; i < menuItems.length; i += 1) {
      let item = menuItems[i];
      let itemContent = menuData[`${item}`];
      menuContent += menuData[`${item}`];
    }
  }
  
  return menuContent;
}

export const orderAlphabetically = (menuItems) => {
  menuItems.sort(function(a, b) {
    var textA = a.toLowerCase();
    var textB = b.toLowerCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
}

export const generateNewMenu = () => {
  const newMenu = `<div class="${ID}-menu__wrapper show">
    <div class="${ID}-overlay"></div>
    <div class="${ID}-menu-header__wrapper">
      <div class="${ID}-menu-header">
        <a href="/uk/my-account" class="${ID}-button account-btn"><span class="${ID}-icon account"></span>My Account</a>
        <a href="/uk/chocolate-shops" class="${ID}-button locations-btn"><span class="${ID}-icon locations"></span>Locations</a>
        <a href="javascript:void(0)" class="close-menu"><span class="${ID}-closeIcon"></span></a>
      </div>
      <div class="${ID}-menu-content">
        <div class="${ID}-menu-section ${ID}-shop">
          <div class="${ID}-section-title visible" id="${ID}-shop">Shop</div>
        </div>
        <div class="${ID}-menu-section ${ID}-info">
          <div class="${ID}-section-title visible" id="${ID}-info">Information &amp; Help</div>
          <ul class="${ID}-menu ${ID}-info__content visible">
            <li class="HC063-top-level customer-services"><a href="/uk/help/contact-us">Customer services</a></li>
            <li class="HC063-top-level delivery"><a href="/uk/help/delivery.html">Delivery</a></li>
            <li class="HC063-top-level returns"><a href="/uk/help/FAQs.html">Returns &amp; refunds</a></li>
            <li class="HC063-top-level vip"><a href="/uk/about-rewards.html">VIP.ME</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>`;

  document.querySelector('body').insertAdjacentHTML('afterbegin', newMenu);
  
  generateMenuContent();
  toggleMenuSection();

  // --- TOP LEVEL MENU

  // --- SUBMENUS
  toggleSubMenus();

  // --- HIDE MENU
  hideMenu();
}

export const generateMenuContent = () => {
  const newMenu = `<div class="${ID}-menu__container">
    <ul class="${ID}-menu ${ID}-shop__content visible">${getMenuItems()}</ul>
  </div>`;

  document.querySelector(`.${ID}-menu-section.${ID}-shop`).insertAdjacentHTML('beforeend', newMenu);

  updateMenuContent();
}

export const updateMenuContent = () => {
  const allMenuItems = document.querySelectorAll(`.${ID}-top-level`);
  [].forEach.call(allMenuItems, (item) => {
    if (item.querySelector('ul.sub-level')) {
      const mainCatBlock = item.querySelector('a.has-sub-menu');
      const catUrl = mainCatBlock.getAttribute('href');
      mainCatBlock.setAttribute('href', 'javascript:void(0)');
      const mainCat = mainCatBlock.innerText.trim();

      item.querySelector('ul.sub-level').insertAdjacentHTML('afterbegin', `<li class="sub-level-item"><a href="${catUrl}">All ${mainCat}</a></li>`);

      mainCatBlock.addEventListener('click', (e) => {
        item.querySelector('svg.icon.arrow-right').classList.toggle('show');
        item.querySelector('ul.sub-level').classList.toggle('show');

        fireEvent(`Click - Arrow submenu for ${item.getAttribute('data-item')}`);
      });
    }
    
  });
}

export const toggleMenuSection = () => {
  const allMenuSections = document.querySelectorAll(`.${ID}-menu-content .${ID}-menu-section`);
  [].forEach.call(allMenuSections, (section) => {
    const sectionCTA = section.querySelector(`.${ID}-section-title`);
    const sectionID = sectionCTA.getAttribute('id');

    sectionCTA.addEventListener('click', (e) => {
      document.querySelector(`.${ID}-menu.${sectionID}__content`).classList.toggle('visible');
      document.querySelector(`.${ID}-section-title#${sectionID}`).classList.toggle('visible');
    });
    
  });
}

export const toggleSubMenus = () => {
  const allSubMenuItems = document.querySelectorAll(`.${ID}-top-level ul.sub-level`);
  [].forEach.call(allSubMenuItems, (item) => {
    let parentMenu = item.closest(`.${ID}-top-level`);
    let menuID = parentMenu.getAttribute('data-item');
    // --- Add ID to submenu
    item.setAttribute('id', `${ID}-${menuID}`);

    if (parentMenu.querySelector('a.has-sub-menu')) {
      let menuLink = parentMenu.querySelector('a.has-sub-menu');

      let menuArrow = menuLink.querySelector(`svg.icon.arrow-right`);


      /**
       * @desc If 3rd level sub menu exists, then add event listenters
       */
      if (parentMenu.querySelector('.has-sub-menu-level-2')) {
        toggleSubMenusLevelTwo(parentMenu);
      }
    }
  });
}

export const toggleSubMenusLevelTwo = (parentMenu) => {
  const allSubMenus = parentMenu.querySelectorAll(`ul.sub-level li.sub-level-item`);
  [].forEach.call(allSubMenus, (item) => {
    if (item.querySelector('.has-sub-menu-level-2')) {
      const menuLink = item.querySelector('.has-sub-menu-level-2');
      menuLink.setAttribute('data-url', menuLink.getAttribute('href'));
      menuLink.setAttribute('href', 'javascript:void(0)');

      menuLink.addEventListener('click', (e) => {
        // setTimeout(() => {
        //   menuLink.setAttribute('href', menuLink.getAttribute('data-url'));
        // }, 1000);
        if (item.classList.contains('show')) {
          item.querySelector('.sub-level-content').setAttribute('style', 'display: none;');
          item.querySelector('svg.icon.plus').setAttribute('style', 'display: block !important;');
          item.querySelector('svg.icon.minus').setAttribute('style', 'display: none !important;');

          item.classList.remove('show');
        } else {
          item.querySelector('.sub-level-content').setAttribute('style', 'display: block;');
          item.querySelector('svg.icon.plus').setAttribute('style', 'display: none !important;');
          item.querySelector('svg.icon.minus').setAttribute('style', 'display: block !important;');

          item.classList.add('show');
        }
        
        
      });
    }
  });
}

export const hideMenu = () => {
  const newMenu = document.querySelector(`.${ID}-menu__wrapper`);
  const menuCTA = document.querySelector('#navigation #hamburger-menu');
  let jQuery = null;
  jQuery = window.jQuery || window.$;

  const closeIcon = document.querySelector(`.${ID}-closeIcon`);

  closeIcon.addEventListener('click', (e) => {
    document.querySelector(`.${ID}-menu__wrapper`).classList.remove('show');
    document.querySelector('body').classList.remove(`${ID}-noScroll`);

    fireEvent(`Click - Close Mobile Menu`);

    
    newMenu.parentElement.removeChild(newMenu);
    menuCTA.classList.remove(`${ID}-newMenu`);
    // // Remove Control menu overlay
    // document.querySelector('.uiLayerIndicator').parentElement.removeChild(document.querySelector('.uiLayerIndicator'));
  });

  const overlay = document.querySelector(`.${ID}-overlay`);

  overlay.addEventListener('click', (e) => {
    document.querySelector(`.${ID}-menu__wrapper`).classList.remove('show');
    document.querySelector('body').classList.remove(`${ID}-noScroll`);

    fireEvent(`Click - Lightbox Overlay`);

    newMenu.parentElement.removeChild(newMenu);
    menuCTA.classList.remove(`${ID}-newMenu`);

    // document.querySelector('.uiLayerIndicator').parentElement.removeChild(document.querySelector('.uiLayerIndicator'));
  });

  
}