/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import christmasNavData from './data/data';
import navWrapper from './components/navWrapper';
const { ID, VARIATION } = shared;

const insertClass = () => {
  const allItems = document.querySelectorAll(`.${ID}__topLevelMenuListItem .topLevelMenu ul >  .departmentMenuListItem`);
  allItems.forEach((item) => {
    const textElement = item.querySelector('.menuItemLabel');
    if (textElement.offsetHeight > 20 && textElement.offsetHeight <= 40) {
      item.classList.remove('globalNavLiSingleLineHeight');
      item.classList.add('globalNavLiDoubleLineHeight');
    } else if (textElement.offsetHeight > 40) {
      item.classList.remove('globalNavLiSingleLineHeight');
      item.classList.add('globalNavLiTripleLineHeight');
    }
  });
};

const init = () => {
  const windowWidth = window.innerWidth;
  const menuWrapper = document.querySelector('#topLevelMenu');
  if (!document.querySelector(`.${ID}__topLevelMenuListItem`)) {
    if (windowWidth > 600) {
      menuWrapper.insertAdjacentHTML('beforeend', navWrapper(ID, christmasNavData));
    }
    if (windowWidth <= 600) {
      pollerLite([() => menuWrapper.querySelector('#shipToMessage')], () => {
        menuWrapper.querySelector('#shipToMessage').insertAdjacentHTML('beforebegin', navWrapper(ID, christmasNavData));
      });
    }
  }
};

export default () => {
  const testID = `${ID}|insert test name`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;

  bootsEvents.initiate = true;
  bootsEvents.methods = ['datalayer'];
  bootsEvents.property = 'G-C3KVJJE2RH';
  bootsEvents.testID = testIDAndVariant;

  setup();

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  if (VARIATION == 'control') {
    return;
  }

  init();

  window.innerWidth > 600 &&
    document.querySelector('#topLevelMenu').addEventListener('mouseover', (e) => {
      const { target } = e;

      if (target.matches(`.${ID}__topLevelMenuListItem > a`)) {
        const targetItem = target.closest(`.${ID}__topLevelMenuListItem > a`);
        const allchristmasMenuConatiner = targetItem.closest('.topLevelMenuListItem');
        const childWrapper = allchristmasMenuConatiner.querySelector('.departmentMenu');
        targetItem.classList.add('ready');
        childWrapper.classList.add('active');

        document.querySelectorAll(`.topLevelMenuListItem:not(.${ID}__topLevelMenuListItem)`).forEach((item) => {
          item.querySelector('a.anchorDataToggle').classList.remove('ready');
          item.querySelector('.departmentMenu').classList.remove('active');
        });

        insertClass();

        const whiteOverlayElement = document.querySelector('#globalNavigationContainer');
        const overlay = document.querySelector('#global_nav_overlay');
        if (whiteOverlayElement) {
          overlay.style.display = 'block';
          overlay.style.opacity = '0.6';
          overlay.style.zIndex = '10';
          whiteOverlayElement.closest('#header').zIndex = '1010';
          whiteOverlayElement.classList.add('globalNavigationContainer');
          whiteOverlayElement.style.height = `${childWrapper.offsetHeight + 100}px`;
        }

        fireBootsEvent('User hover christmas nav', true, eventTypes.experience_action, {
          action: actionTypes.view,
          action_detail: 'User hover christmas nav',
        });
      }
    });

  window.innerWidth > 600 &&
    document.querySelector('#globalNavigationContainer').addEventListener('mouseout', () => {
      const chirstmasNavWrapper = document.querySelector(`.${ID}__topLevelMenuListItem`);
      if (chirstmasNavWrapper.querySelector('a.anchorDataToggle').classList.contains('ready')) {
        const mainWrapper = document.querySelector(`.${ID}__topLevelMenuListItem`);
        const childWrapper = mainWrapper.querySelector('.departmentMenu');
        mainWrapper.querySelector('a.anchorDataToggle').classList.remove('ready');
        childWrapper.classList.remove('active');
        const whiteOverlayElement = document.querySelector('#globalNavigationContainer');
        const overlay = document.querySelector('#global_nav_overlay');
        if (whiteOverlayElement.classList.contains('globalNavigationContainer')) {
          overlay.style.display = 'none';
          overlay.style.opacity = '0.6';
          overlay.style.zIndex = '10';
          whiteOverlayElement.closest('#header').style.removeProperty('zIndex');
          whiteOverlayElement.classList.remove('globalNavigationContainer');
          whiteOverlayElement.style.removeProperty('height');
        }

        const allChildlists = document.querySelectorAll(`.${ID}__hasChild`);
        allChildlists.forEach((child) => {
          child.querySelector('a.anchorDataToggle').classList.remove('selected');
          child.querySelector('a.anchorDataToggle .departmentLinkOutput').classList.remove('ready');
          child.querySelector('.departmentMenu').classList.remove('active');
        });
      }
    });

  pollerLite([() => document.querySelector(`.${ID}__topLevelMenuListItem`) && window.innerWidth > 600], () => {
    document.querySelector(`.${ID}__topLevelMenuListItem`).addEventListener('mouseover', () => {
      const chirstmasNavWrapper = document.querySelector(`.${ID}__topLevelMenuListItem`);
      if (!chirstmasNavWrapper.querySelector('a.anchorDataToggle').classList.contains('ready')) {
        const mainWrapper = document.querySelector(`.${ID}__topLevelMenuListItem`);
        const childWrapper = mainWrapper.querySelector('.departmentMenu');
        mainWrapper.querySelector('a.anchorDataToggle').classList.add('ready');
        childWrapper.classList.add('active');
        const whiteOverlayElement = document.querySelector('#globalNavigationContainer');
        const overlay = document.querySelector('#global_nav_overlay');
        if (!whiteOverlayElement.classList.contains('globalNavigationContainer')) {
          overlay.style.display = 'block';
          overlay.style.opacity = '0.6';
          overlay.style.zIndex = '10';
          whiteOverlayElement.closest('#header').zIndex = '1010';
          whiteOverlayElement.classList.add('globalNavigationContainer');
          whiteOverlayElement.style.height = `${childWrapper.offsetHeight + 100}px`;
        }
      }
    });

    const allChildren = document.querySelectorAll(`.${ID}__departmentMenuListItem`);
    let previousChild = null;

    allChildren.forEach((child) => {
      child.addEventListener('mouseover', () => {
        if (previousChild && previousChild !== child) {
          const prevLinkWrapper = previousChild.querySelector('a.anchorDataToggle');
          const prevList = previousChild.querySelector('.departmentMenu');
          prevLinkWrapper?.classList.remove('selected');
          prevLinkWrapper?.querySelector('.departmentLinkOutput').classList.remove('ready');
          prevList?.classList.remove('active');
        }

        // const allchristmasMenuConatiner = targetItem.closest('.topLevelMenuListItem');

        const linkWrapper = child.querySelector('a.anchorDataToggle');
        const list = child.querySelector('.departmentMenu');
        linkWrapper?.classList.add('selected');
        linkWrapper?.querySelector('.departmentLinkOutput').classList.add('ready');
        list?.classList.add('active');

        if (!child.classList.contains(`${ID}__hasChild`)) {
          fireBootsEvent('User hovers any christmas level 1 in navigation', true, eventTypes.experience_action, {
            action: actionTypes.view,
            action_detail: 'User hovers any christmas level 1 in navigation',
          });
        } else {
          fireBootsEvent('User hovers any christmas level 2 in navigation', true, eventTypes.experience_action, {
            action: actionTypes.view,
            action_detail: 'User hovers any christmas level 2 in navigation',
          });
        }

        const itemsWrapper = document.querySelector(`.${ID}__topLevelMenuListItem .topLevelMenu`);
        const itemsWrapperHeight = itemsWrapper.offsetHeight;
        const listHeight = list?.querySelector('#catergoryList').offsetHeight;
        const whiteOverlayElement = document.querySelector('#globalNavigationContainer');
        //const whiteOverlayHeight = whiteOverlayElement?.offsetHeight;
        if (listHeight > itemsWrapperHeight) {
          whiteOverlayElement.style.height = `${listHeight + 100}px`;
        } else if (listHeight < itemsWrapperHeight) {
          whiteOverlayElement.style.height = `${itemsWrapperHeight + 100}px`;
        }

        previousChild = child;
      });
    });
  });

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    const windowWidth = window.innerWidth;
    if (target.closest(`.${ID}__hasChild`) && target.closest(`.${ID}__hasChild:not(.highlighted)`) && windowWidth <= 600) {
      const clickedItem = target.closest(`.${ID}__hasChild`);
      const anchorItem = clickedItem.querySelector('.anchorDataToggle');
      const parentDepertment = clickedItem.closest('.departmentMenu');
      const depertmentMenu = clickedItem.querySelector('.departmentMenu');
      const closestDepertment = clickedItem.closest('.departmentMenu');
      const mainWrapper = clickedItem.closest('#topLevelMenu');

      const currentlyHighlighted = document.querySelector(`.${ID}__hasChild.highlighted`);
      if (currentlyHighlighted && currentlyHighlighted !== clickedItem) {
        currentlyHighlighted.classList.remove('highlighted');
        currentlyHighlighted.querySelector('.anchorDataToggle').classList.remove('selected');
        currentlyHighlighted.querySelector('.departmentMenu').classList.remove('active');
      }

      mainWrapper.style.left = `-${windowWidth * 2}px`;
      closestDepertment.style.left = `-${windowWidth}px`;

      document.documentElement.style.setProperty('--window-width', `${window.innerWidth}px`);

      clickedItem.classList.add('highlighted');
      anchorItem.classList.add('selected');
      parentDepertment.classList.remove('slide-out-left');
      parentDepertment.classList.add('slide-in-right');
      depertmentMenu.classList.add('active');
      depertmentMenu.classList.add('slide-in-right');
      fireBootsEvent('User clicks any christmas level 2 navigation', true, eventTypes.experience_action, {
        action: actionTypes.view,
        action_detail: 'User clicks any christmas level 2 navigation',
      });
    } else if (
      (target.matches(`.${ID}__topLevelMenuListItem`) ||
        target.matches(`.${ID}__topLevelMenuListItem > a`) ||
        target.matches(`.${ID}__topLevelMenuListItem > span`)) &&
      windowWidth <= 600
    ) {
      const clickedItem = target.closest(`.${ID}__topLevelMenuListItem`);
      const anchorItem = clickedItem.querySelector('.anchorDataToggle');
      const depertmentMenu = clickedItem.querySelector('.departmentMenu');
      const mainWrapper = clickedItem.closest('#topLevelMenu');
      mainWrapper.style.left = `-${windowWidth}px`;
      document.documentElement.style.setProperty('--window-width', `${window.innerWidth}px`);
      anchorItem.classList.add('selected');
      depertmentMenu.classList.add('active');
      depertmentMenu.classList.add('slide-in-right');
      fireBootsEvent('User clicks christmas nav', true, eventTypes.experience_action, {
        action: actionTypes.view,
        action_detail: 'User clicks christmas nav',
      });
    } else if (target.closest('.mobileNavBackButtons') && target.closest(`.${ID}__hasChild`)) {
      const clickedItem = target.closest('.mobileNavBackButtons');
      const hasChildWrapper = clickedItem.closest(`.${ID}__hasChild`);
      const parentDepertment = hasChildWrapper.closest('.departmentMenu');
      const anchorItem = hasChildWrapper.querySelector('.anchorDataToggle');
      const depertmentMenu = hasChildWrapper.querySelector('.departmentMenu');
      const mainWrapper = hasChildWrapper.closest('#topLevelMenu');
      mainWrapper.style.left = `-${windowWidth}px`;
      parentDepertment.style.left = `${windowWidth}px`;

      document.documentElement.style.setProperty('--window-width', `${window.innerWidth}px`);

      hasChildWrapper.classList.remove('highlighted');
      anchorItem.classList.remove('selected');
      depertmentMenu.classList.remove('active');
      depertmentMenu.classList.remove('slide-in-right');
      parentDepertment.classList.remove('slide-in-right');
      parentDepertment.classList.add('slide-out-left');
    } else if (target.closest(`.${ID}__first-back-button`)) {
      const clickedItem = target.closest(`.${ID}__first-back-button`);
      const wrapper = clickedItem.closest(`.${ID}__topLevelMenuListItem`);
      const mainWrapper = wrapper.closest('#topLevelMenu');
      const anchorItem = wrapper.querySelector('.anchorDataToggle');
      const depertmentMenu = wrapper.querySelector('.departmentMenu');
      mainWrapper.style.removeProperty('left');
      anchorItem.classList.remove('selected');
      depertmentMenu.classList.remove('active');
      depertmentMenu.classList.remove('slide-in-right');
      depertmentMenu.classList.remove('slide-out-left');
      depertmentMenu.style.removeProperty('left');
    } else if (target.matches(`.${ID}__topLevelMenuListItem > a`) && windowWidth > 600) {
      const targetItem = target.closest(`.${ID}__topLevelMenuListItem > a`);
      const allchristmasMenuConatiner = targetItem.closest('.topLevelMenuListItem');
      const childWrapper = allchristmasMenuConatiner.querySelector('.departmentMenu');
      targetItem.classList.add('ready');
      childWrapper.classList.add('active');

      document.querySelectorAll(`.topLevelMenuListItem:not(.${ID}__topLevelMenuListItem)`).forEach((item) => {
        item.querySelector('a.anchorDataToggle').classList.remove('ready');
        item.querySelector('.departmentMenu').classList.remove('active');
      });

      insertClass();

      const whiteOverlayElement = document.querySelector('#globalNavigationContainer');
      const overlay = document.querySelector('#global_nav_overlay');
      if (!whiteOverlayElement.classList.contains('globalNavigationContainer')) {
        overlay.style.display = 'block';
        overlay.style.opacity = '0.6';
        overlay.style.zIndex = '10';
        whiteOverlayElement.closest('#header').zIndex = '1010';
        whiteOverlayElement.classList.add('globalNavigationContainer');
        whiteOverlayElement.style.height = `${childWrapper.offsetHeight + 100}px`;
      }
    } else if (target.closest(`.${ID}__departmentMenuListItem:not(.${ID}__hasChild)`)) {
      fireBootsEvent('User clicks any christmas level 1 navigation', true, eventTypes.experience_action, {
        action: actionTypes.view,
        action_detail: 'User clicks any christmas level 1 navigation',
      });
    }
  });
};
