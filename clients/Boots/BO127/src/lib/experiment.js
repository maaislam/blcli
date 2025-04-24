/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */


 import { h, render } from 'preact';
import DesktopNav from './components/desktopNav';
import MobileSlidingNav from './components/mobileNav';
import { getData } from './navData';
import { cookieOpt, fireEvent, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  if(VARIATION !== 'control') {

    /*  ----------------
      Experiment code 
      ------------------ */
    const navContainer = document.createElement('div');
    navContainer.classList.add(`${ID}-navigation`);

    if(window.innerWidth >= 1024) {
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
      };
      

      const mobile = window.innerWidth <= 767;

      if(mobile) {
        render(( 
          <MobileSlidingNav data={getData(window.userObj.isLoggedIn)}></MobileSlidingNav>
        ), navigation);

        document.querySelector(`.${ID}-navToggle`).addEventListener('click', () => {
          openMobile();
        });
      
      } else {
        render(( 
          <DesktopNav data={getData(window.userObj.isLoggedIn)}></DesktopNav>
        ), navigation);      
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
    }
  } 
};
