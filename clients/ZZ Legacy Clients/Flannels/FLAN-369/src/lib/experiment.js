/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import settings from './shared';
import { events, pollerLite, logMessage, observer } from '../../../../../lib/utils';


events.analyticsReference = '_gaUAT';

const { ID, VARIATION } = settings;

const makeDesktopAmends = () => {

  let desktopMenu = document.getElementById('topMenu');

  let allNavLinks = [].slice.call(desktopMenu.querySelectorAll('.SubMenuWrapper .mmHasChild a'));

    // handle amending top level items to say 'outlet'
    allNavLinks.map((link) => {

      if(link.innerHTML == "Sale") {
        link.innerHTML = "Outlet";
        link.classList.add('FLAN-369-outlet-link');
      }

    });

    let allAmendedLinks = desktopMenu.querySelectorAll('.FLAN-369-outlet-link');

    [].slice.call(allAmendedLinks).forEach((link) => {

      link.addEventListener('mouseenter', (e) => {  

        setTimeout(() => {
          let linkElement = e.target;
          let viewAll = linkElement.closest('.mmHasChild').querySelector('.sdmColViewAll > a');
          if(viewAll) {
            viewAll.innerHTML = "View All Outlet";
          }

          let postTitles = [].slice.call(desktopMenu.querySelectorAll('.postTitle'));

          postTitles.map((title) => {
            let html = title.innerHTML;
            html = html.replace('Sale', 'Outlet');
            title.innerHTML = html;
          });

        }, 500);
        
        
      });

    });

}

const makeMobileAmends = () => {

  let mobileMenu = document.getElementById('mp-menu');

  let activeMenu = mobileMenu.querySelector('.activeMobileMenu');

  let allNavLinks = [].slice.call(mobileMenu.querySelectorAll('.mobMenGroup a'));

  // handle amending top level items to say 'outlet'
  allNavLinks.map((link) => {

    if(link.innerHTML.trim() == "Sale") {
      link.innerHTML = "Outlet";
      link.classList.add('FLAN-369-outlet-link');
    }

  });

  let viewAll = activeMenu.querySelector('.sdmColViewAll > a');
  if(viewAll) {
    viewAll.innerHTML = "View All Outlet";
  }

}

export default () => {
  setup();

  logMessage(ID + " Variation "+VARIATION);

  if(window.outerWidth > 1021) {

    makeDesktopAmends();

  } else {

    makeMobileAmends();

    let allTLNavLinks = document.querySelectorAll('#ulTopLevelMobileMenu > li > a');

    [].slice.call(allTLNavLinks).forEach((link) => {

      link.addEventListener('click', (e) => {  
        setTimeout(() => {
          makeMobileAmends();
        }, 500);
        
        
      });

    });
  }
  
};

