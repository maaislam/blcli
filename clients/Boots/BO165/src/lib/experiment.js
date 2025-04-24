/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */


import { h, render } from 'preact';
import { pollerLite } from '../../../../../lib/utils';
import runTest from './components/BO104Nav/runTest';
import DesktopNav from './components/desktopNav';
import MobileSlidingNav from './components/mobileNav';
import { DesktopData } from './desktopData';
import { MobileData } from './navData';
import { cookieOpt, fireEvent, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;


  // TO DO: V5.

  setup();
  // cookieOpt();
  fireEvent('Conditions Met')

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  if(VARIATION !== 'control') {

    /*  ----------------
      Experiment code 
      ------------------ */

      if(VARIATION !== '5') {
        const navContainer = document.createElement('div');
        navContainer.classList.add(`${ID}-navigation`);

        if(window.innerWidth >= 767) {
          document.querySelector('#header').insertAdjacentElement('afterend',navContainer);
        } else {
          // add new nav toggle
          document.querySelector('#header_link_container').insertAdjacentHTML('afterbegin', `<li class="${ID}-navToggle" data-icon='a'></li>` );
          document.body.appendChild(navContainer);
        }

        const navigation = document.querySelector(`.${ID}-navigation`);
        if(navigation) {
          navigation.innerHTML = '';

          const openMobile = () => {
            const burger = document.querySelector(`.${ID}-navToggle`);
            if(burger) {
              navContainer.classList.add(`${ID}-open`);
              document.documentElement.classList.add(`${ID}-noScroll`);
            }


            if(VARIATION === '4') {

              // // move search
              const searchBox = document.querySelector('#search_container');
              document.querySelector('.MobileSlidingNav .wrapper').insertAdjacentElement('beforebegin', searchBox);

              // close search if nav clicked
              if(document.querySelector('#mobileLink_search.mobileOnly.active')){
                document.querySelector('#mobileLink_search a').click(); 
              }

            }
          };
          

          const mobile = window.innerWidth <= 767;

          if(mobile) {
            render(( 
              <MobileSlidingNav data={MobileData(window.userObj.isLoggedIn)}></MobileSlidingNav>
            ), navigation);

            document.querySelector(`.${ID}-navToggle`).addEventListener('click', () => {
              openMobile();
            });

            // put currency selector in nav
            const currencyLi = document.querySelector(`.MobileSlidingNav__listing .currency a`);
            const currentCurrency = document.querySelector('#shipToMessage');

            currencyLi.appendChild(currentCurrency);
          
          } else {
            render(( 
              <DesktopNav data={DesktopData(window.userObj.isLoggedIn)}></DesktopNav>
            ), navigation);  
          
          }
        }
      } else {

        // BO104

        runTest();
      }


      // Tracking
      [].forEach.call(document.querySelectorAll('.MobileSlidingNav a'), l => {
        l.addEventListener('click', (e) => {
          if(e.currentTarget.classList.contains('MobileSlidingNav__level--active')) {
            fireEvent('Clicked Mobile Nav Link ' + e.currentTarget.innerText.trim());
          }
          if(!e.currentTarget.parentNode.querySelector('ul')) {
            fireEvent('Clicked Mobile Nav Link ' + e.currentTarget.innerText.trim());
          }
        });
      });


      [].forEach.call(document.querySelectorAll('.DesktopNav a'), l => {
        l.addEventListener('click', (e) => {
          if(e.currentTarget.classList.contains('DesktopNav__level--active')) {
            fireEvent('Clicked Desktop Nav Link ' + e.currentTarget.innerText.trim());
          }
          if(!e.currentTarget.parentNode.querySelector('ul')) {
            fireEvent('Clicked Desktop Nav Link ' + e.currentTarget.innerText.trim());
          }
        });
      });
  } else {
    // control 

    //links
    const tracking = () => {
      const allLinks = document.querySelectorAll('#estore_header_bottom_row .departmentMenu a[href^="https"]');
      for (let index = 0; index < allLinks.length; index += 1) {
        const element = allLinks[index];
        
        element.addEventListener('click', () => {
          
          
          console.log(element.parentNode.parentNode.classList);
          if(!element.parentNode.parentNode.classList.contains('subcategoryList')) {
            const linkName = element.textContent.trim();
            fireEvent('Clicked Nav Link ' + linkName,);
          }
        });
      }
    }
    tracking();

    const thirdLevelTracking = () => {

      let sendOnce = false;

      const thirdLevel = document.querySelectorAll('.subcategoryList a[href^="https"]');
      for (let index = 0; index < thirdLevel.length; index += 1) {
        const element = thirdLevel[index];
      
        element.addEventListener('click', (e) => {
      
          sendOnce = true;
          const linkName = e.currentTarget.textContent.trim();

          if(sendOnce === true) {
            fireEvent('Clicked Nav Link ' + linkName);
          }
        });
      }
    }
    

    // on hover of all second links
    const secondLinks = document.querySelectorAll('.categoryMenuListItem');
    for (let index = 0; index < secondLinks.length; index++) {
      const element = secondLinks[index];
      if(element.querySelector('.subcategoryMenu')) {
        element.addEventListener('mouseenter', () => {
         
          thirdLevelTracking();
          thirdLevelTrackingCats();
        });
      }
    }

    //cats

    const trackingCats = () => {
      const allLinks = document.querySelectorAll('#estore_header_bottom_row .departmentMenu a:not([href^="https"])');;
      for (let index = 0; index < allLinks.length; index += 1) {
        const element = allLinks[index];
        
        element.addEventListener('click', () => {
          
          
          console.log(element.parentNode.parentNode.classList);
          if(!element.parentNode.parentNode.classList.contains('subcategoryList')) {
            const linkName = element.textContent.trim();
            fireEvent('Clicked Nav Category ' + linkName,);
          }
        });
      }
    }
    trackingCats();

    const thirdLevelTrackingCats = () => {

      let sendOnce = false;

      const thirdLevel = document.querySelectorAll('.subcategoryList a:not[href^="https"]');
      for (let index = 0; index < thirdLevel.length; index += 1) {
        const element = thirdLevel[index];
      
        element.addEventListener('click', (e) => {
      
          sendOnce = true;
          const linkName = e.currentTarget.textContent.trim();

          if(sendOnce === true) {
            fireEvent('Clicked Nav Category ' + linkName);
          }
        });
      }
    }
    
    [].forEach.call(document.querySelectorAll('#topLevelMenu > li > a'), l => {
      l.addEventListener('click', (e) => {
        const elName = e.currentTarget.textContent;
        fireEvent('Clicked Nav Category' + elName);
      });
    });
    
    // //3rd level
    // const allNavLinks = document.querySelectorAll('.subcategoryMenu .subcategoryList .globalNavLiSingleLineHeight');
    // for (let index = 0; index < allNavLinks.length; index++) {
    //   const element = allNavLinks[index];
    //   console.log(element.textContent)
    //   element.querySelector('a').addEventListener('click', () => {
    //     console.log('click 3rd')
    //   });
    // }

    // [].forEach.call(document.querySelectorAll('.subcategoryMenu .subcategoryList a'), i => {
    //   console.log(i.textContent)
    //   i.addEventListener('click', (e) => {
    //     console.log('click 3rd')
    //     const elName = e.currentTarget.textContent;
    //     console.log(elName)
    //     fireEvent('Clicked 3rd Nav Link' + elName);
    //   });
    // });
  }


  
};
