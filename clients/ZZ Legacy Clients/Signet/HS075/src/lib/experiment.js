/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

const { ID } = shared;

export default () => {
  setup();

  const changeLogo = () => {
    const logo = document.querySelector('.header__logo .logo__link .logo__img');

    if(logo) {
      logo.setAttribute('src', 'https://service.maxymiser.net/cm/images-us/1/1/2/8F81CD8CEA9F31CB2EDBBEA05391B89D7C1E8FCEFB864BC6DF6A4E8D9BB062AD/hsamuel-co-uk/HS075---Header-Styling/territorial-logo.svg');
    }
  }

  const rightIcons = () => {

    const basketCount = document.querySelector('.shopping-bag').getAttribute('data-basket-count');
    const signedIn = window.digitalData.user[0].profile[0].profileInfo.profileID;

    const newLinkMarkup = document.createElement('div');
    newLinkMarkup.classList.add(`${ID}-rightIcons`);
    newLinkMarkup.innerHTML = 
    `<div class="${ID}__icon ${ID}__stores">
      <a href="https://www.hsamuel.co.uk/webstore/secure/storeLocator.sdo">
        <div class="${ID}-iconImage"></div>
        <p>Stores</p>
      </a>
    </div>
    <div class="${ID}__icon ${ID}__account">
    ${signedIn === 'loggedOut' ? 
    `<a href="https://www.hsamuel.co.uk/webstore/secure/authenticated/account/checkSignedIn.sdo">
      <div class="${ID}-iconImage"></div>
      <p>Sign in</p>
    </a>` : 
    `<div class="${ID}-iconImage"></div>
    <div class="${ID}_accountLinks">
      <a href="https://www.hsamuel.co.uk/webstore/secure/authenticated/account/checkSignedIn.sdo">
        <p>Account</p>
      </a> /
      <a class="${ID}-signOut">
        <p>Sign out</p>
      </a>
      </div>`}
    </div>
    <div class="${ID}__icon ${ID}__basket">
      <a href="/webstore/showbasket.sdo">
        <div class="${ID}-iconImage"><span class="${ID}-basket-count">${basketCount ? `${basketCount}` : ''}</span></div>
        <p>Basket</p>
      </a>
    </div>`;

    const rightSide = document.querySelector('.right__container');
    if(rightSide) {
      rightSide.insertAdjacentElement('afterbegin', newLinkMarkup);
    }

    const signOut = document.querySelector(`.${ID}-signOut`);
    if(signOut) {
      signOut.addEventListener('click', () => {
        console.log('click');
        document.querySelector('#logoutButton').click();
        events.send(`${ID} V1`, 'click', 'sign out');
      });
    }
  }

  const stickyNav = () => {

     // Get the header
    const nav = document.querySelector('#js-main-nav');

     // Get the offset position of the navbar
    const sticky = nav.offsetTop;

    const stickNav = () => {
      if (window.pageYOffset > sticky) {
        nav.classList.add(`${ID}_sticky`);
      } else {
        nav.classList.remove(`${ID}_sticky`);
        document.querySelector(`#js-header`).classList.remove(`${ID}-headerFixed`);
      }
    }

    window.onscroll = function(e) { 
      stickNav(); 

      if(this.oldScroll > this.scrollY) {
        document.querySelector(`#js-header`).classList.add(`${ID}-headerFixed`);
        nav.classList.remove(`${ID}_sticky`);
      } else {
        document.querySelector(`#js-header`).classList.remove(`${ID}-headerFixed`);
      }

      if(this.scrollY === 0) {
        document.querySelector(`#js-header`).classList.remove(`${ID}-headerFixed`);
      }
      this.oldScroll = this.scrollY;      
    };

  }

   const navDelay = () => {
    const mainNav = document.querySelector('.main-nav');
    mainNav.classList.add(`${ID}-mainNav`);

    let overTimeout = null;
    mainNav.addEventListener('mouseenter', () => {
      clearTimeout(overTimeout);
      overTimeout = setTimeout( () => {
        mainNav.classList.remove(`${ID}-mainNav`);
      }, 500);
    });  

    mainNav.addEventListener('mouseleave', () => {
      setTimeout( () => {
        mainNav.classList.add(`${ID}-mainNav`);
      }, 500);
    }); 
   }

   if(shared.VARIATION === '1') {
    changeLogo();

    if(window.innerWidth >= 1280) {
      rightIcons();
      stickyNav();
      navDelay();

      /**
       * Desktop events
       */
      // none sticky nav link event
      const allMainNavLinks = document.querySelectorAll(`.main-nav a`);
      for (let index = 0; index < allMainNavLinks.length; index += 1) {
        const element = allMainNavLinks[index];
        element.addEventListener('click', () => {
          
          if(document.querySelector('.main-nav').classList.contains(`${ID}_sticky`)) {
            events.send(`${ID} V1`, 'click', 'sticky nav link desktop');
          } else {
            events.send(`${ID} V1`, 'click', 'none sticky nav link desktop');
          }
        });
      }

      const search = document.querySelector('#js-search-submit');
      if(search) {
        search.addEventListener('click', () => {
          events.send(`${ID} V1`, 'click', `search`);
        });
      }

      const icons = document.querySelectorAll(`.${ID}__icon`);
      for (let index = 0; index < icons.length; index += 1) {
        const element = icons[index];
        const elName = element.querySelector('p').textContent;

        element.addEventListener('click', () => {
          events.send(`${ID} V1`, 'click', `${elName}`);
        });
      }
    }

    // mobile events
    if(window.innerWidth < 1280) {
      const allMainNavLinks = document.querySelectorAll(`.main-nav .main-nav__sub-nav.main-nav__third-level a`);
      for (let index = 0; index < allMainNavLinks.length; index += 1) {
        const element = allMainNavLinks[index];
        element.addEventListener('click', () => {
          events.send(`${ID} V1`, 'click', 'nav link mobile');
        });
      }

      const navMenu = document.querySelector('#js-main-nav-toggle');
      if(navMenu) {
        navMenu.addEventListener('click', () => {
          events.send(`${ID} V1`, 'click', 'open nav mobile/tablet', {sendOnce:true});
        });
      }

      const storeLink = document.querySelector('.store-locator-link');
      if(storeLink) {
        storeLink.addEventListener('click', () => {
          events.send(`${ID} V1`, 'click', 'store link mobile/tablet', {sendOnce:true});
        });
      }

      const shoppingBag = document.querySelector('.shopping-bag');
      if(shoppingBag) {
        shoppingBag.addEventListener('click', () => {
          events.send(`${ID} V1`, 'click', 'shopping bag mobile/tablet', {sendOnce:true});
        });
      }
    }
  }
};
