/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage, pollerLite } from '../../../../../lib/utils';
 import navData from './navData';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

const processImages = (link, parent, level) => {
  let relatedData;
  if(level == "first-tier") {
    
    relatedData = navData.filter((navItem) => {
          
      let textsWithoutSpaces = {
            text: navItem.text.replace(/\s/g, '').toLowerCase(),
            menuItemText: link.querySelector('a').innerText.replace(/\s/g, '').toLowerCase()
        };
        // Compare strings with spaces taken out.
        return textsWithoutSpaces.text == textsWithoutSpaces.menuItemText;
    })[0];



  } else if(level == "second-tier") {
    
    let parentData = navData.filter((navItem) => {
      return navItem.identifier == parent;
    });

    relatedData = parentData[0].children.filter((navItem) => {
      if(navItem.text == link.querySelector('a').innerText) {
        return navItem;
      } else {
        return false;
      }
    })[0];

  } else {

    let parentData = navData.filter((navItem) => {
      return navItem.identifier == parent;
    });

    let secondTierData = parentData[0].children.filter((navItem) => {

      let textsWithoutSpaces = {
        text: navItem.text.replace(/\s/g, '').toLowerCase(),
        menuItemText: link.closest(`.${ID}-second-tier`).querySelector('a').innerText.replace(/\s/g, '').toLowerCase()
      };
      // Compare strings with spaces taken out.
      if(textsWithoutSpaces.text == textsWithoutSpaces.menuItemText) {
        return navItem;
      } else {
        return false;
      }
      
    })[0];

    relatedData = secondTierData.children.filter((navItem) => {

      let textsWithoutSpaces = {
        text: navItem.text.replace(/\s/g, '').toLowerCase(),
        menuItemText: link.querySelector('a').innerText.replace(/\s/g, '').toLowerCase()
      };
      // Compare strings with spaces taken out.
      if(textsWithoutSpaces.text == textsWithoutSpaces.menuItemText) {
        return navItem;
      } else {
        return false;
      }

    })[0];
    
  }


  if (relatedData) {
    link.classList.add(`${ID}-link`);
    link.classList.add(`${ID}-${level}`);
    if(relatedData.text == "Footwear" && level == "second-tier" && link.closest('.root').id == "mob-outlet") {
      link.querySelector('a').innerText = "Shop by Size - Footwear";
    }
    link.querySelector('a').insertAdjacentHTML('afterbegin', `<img class="${ID}-media ${ID}-link__media" src="https://www.sportsdirect.com/images/marketing/${ID}-${relatedData.imageString}.png">`);
    
  }
}



const handleSecondLevelImages = (tlMenuItem, parentItem) => {
  pollerLite([
    () => {
      return tlMenuItem.closest('li').querySelector('.mp-level.show-level');
    }
  ], () => {
    let allSecondLevelDropdownChildren = tlMenuItem.closest('li').querySelectorAll('.mp-level.show-level > ul > .has-dropdown');
    let level = "second-tier";
    [].slice.call(allSecondLevelDropdownChildren).forEach((childItem) => {
      processImages(childItem, parentItem, level);
    });

    

    })

  

}

const handleFirstLevelImages = () => {
  
  

  const menu = document.querySelector('#mp-menu');
  const menuItems = menu.querySelectorAll('.mmHasChild.has-dropdown');
  const menuInner = menu.querySelector('.mobMenuGroup');
    

  const elements = { menu, menuItems, menuInner };

  [].slice.call(elements.menuItems).forEach((item) => {
    let level = "first-tier";
    processImages(item, null, level);

  })

  let visibleMessage = "Visible - images have been altered";
  logMessage(visibleMessage);
  fireEvent(visibleMessage);

  let allTLLinks = document.querySelectorAll(`.${ID}-first-tier`);
  [].slice.call(allTLLinks).forEach((link) => {

    link.addEventListener('click', (e) => {
      let parent = e.currentTarget.closest('li').id;
      handleSecondLevelImages(e.currentTarget, parent);
    })

  })

}

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  handleFirstLevelImages();
};
