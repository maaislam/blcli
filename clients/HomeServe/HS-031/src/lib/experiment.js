import { fireEvent, newEvents, setup } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import myHomeServe from './components/myHomeServe';
import navRightItem from './components/navRightItem';
import navbar from './components/navbar';
import search from './components/search';
import contactUs from './pages/contactUs';
import heatingPage from './pages/heatingPage';
import plumbingCoverPage from './pages/plumbingCoverPage';

const { ID, VARIATION } = shared;
const isTab = window.innerWidth < 992 && window.innerWidth > 480;
const isMobile = window.innerWidth <= 480;

const extractInitials = (text) => {
  // Extract the part of the string after the comma
  const fullName = text.split(',')[1].trim();

  // Split the full name into words
  const nameParts = fullName.split(' ');

  // Check if we have at least two parts (first and last name)
  if (nameParts.length >= 2) {
    const firstNameInitial = nameParts[0][0]; // First letter of the first name
    const lastNameInitial = nameParts[1][0]; // First letter of the last name
    return firstNameInitial + lastNameInitial;
  } else {
    return 'Not enough name parts';
  }
};

const init = () => {
  const { pathname } = window.location;
  const isContactUsPage = pathname.includes('contact-us');
  const isHeatingPage = pathname === '/heating/';
  const isPlumbingCoverPage = pathname.includes('/insurance') && !pathname.includes('landlords');
  const fallback = () => {
    document.body.classList.add(`${ID}_hideNav`);
    const navBarHeader = document.querySelector('.navbar-header');
    const navBarControl = document.querySelector('.navbar #navbar-collapse');
    const navToggleControl = document.querySelector('.navbar-header .navbar-toggle');
    const headerNavItem =
      document.querySelector('.navbar-header .header-nav-item') ||
      document.querySelector('.hs-header__buttons') ||
      document.querySelector('[class*="header-module--headerLogo"] .brandLogo > div:nth-child(2) > div:nth-child(1)');

    if (!document.querySelector(`.${ID}_navbar-container`) && navBarControl) {
      navBarControl.insertAdjacentHTML('beforebegin', navbar(ID));
    }

    if (!document.querySelector(`.${ID}_nav-toggle`) && isTab) {
      const navRightItemHtml = navRightItem(ID, true, false);
      navToggleControl.insertAdjacentHTML('beforebegin', navRightItemHtml);
    }

    if (!document.querySelector(`.${ID}_nav-toggle`) && isMobile) {
      const navRightItemHtml = navRightItem(ID, false, true);
      navToggleControl.insertAdjacentHTML('beforebegin', navRightItemHtml);
      navBarHeader.closest('.container').classList.add(`${ID}_container`);
      navBarHeader.insertAdjacentHTML('afterend', search(ID));
    }

    //if login, push myhomeserve
    if (!document.querySelector(`.${ID}_myHomeServe`)) {
      headerNavItem.insertAdjacentHTML('afterbegin', myHomeServe(ID));
    }
  };

  if (isContactUsPage) {
    contactUs(ID, isTab, isMobile);
  } else if (isHeatingPage) {
    heatingPage(ID, isTab, isMobile);
  } else if (isPlumbingCoverPage) {
    plumbingCoverPage(ID, isTab, isMobile);
  }
  if (!document.querySelector(`.${ID}_navbar-container`)) {
    fallback();
  }

  // fallback();
};

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}_form-control .clear-input`)) {
      document.querySelector(`.${ID}_search-input`).value = '';
    } else if (target.closest(`.${ID}_nav-toggle`)) {
      document.querySelector(`.${ID}_navbar-container`).classList.toggle('open');
      document.querySelector(`.${ID}_navbar-container`).classList.toggle('drawerClosed');
      document.querySelector(`#content-block`)?.classList.toggle('position-fixed');
    } else if (target.closest(`.${ID}_navlink.has-dropdown`) && (isTab || isMobile)) {
      const dropdownItem = target.closest(`.${ID}_navlink.has-dropdown`);
      dropdownItem.classList.toggle(`${ID}_navlink-open`);
      const dropdown = dropdownItem.querySelector(`.${ID}_dropdown-list`);
      dropdown.classList.toggle(`${ID}_dropdown-list-open`);

      if (target.closest(`a.${ID}_subLink`)) {
        const url = target.closest(`a.${ID}_subLink`).href;
        if (target.closest('body').classList.contains(`${ID}_contactPage`)) {
          fireEvent(`User interacts with the navigation from the contact us page - link (${url})`);
        } else {
          fireEvent(`User interacts with the navigation - link (${url})`);
        }
      }
    } else if (target.closest(`.${ID}__overlay`) && (isTab || isMobile)) {
      document.querySelector(`.${ID}_navbar-container`).classList.remove('open');
      document.querySelector(`#content-block`).classList.remove('position-fixed');
    } else if (target.closest(`.${ID}_search-btn`) && isMobile) {
      const searchContainer = document.querySelector(`.${ID}_search-container`);
      searchContainer?.classList.toggle(`${ID}__show`);
    } else if (target.closest(`.${ID}_myHomeServe-content`)) {
      const hsDropdown = target.closest(`.${ID}_myHomeServe`);
      hsDropdown.classList.toggle(`${ID}_myHomeServe-active`);
    } else if (target.closest(`a.${ID}_subLink`)) {
      const url = target.closest(`a.${ID}_subLink`).href;
      if (target.closest('body').classList.contains(`${ID}_contactPage`)) {
        fireEvent(`User interacts with the navigation from the contact us page - link (${url})`);
      } else {
        fireEvent(`User interacts with the navigation - link (${url})`);
      }
    } else if (target.closest(`li.${ID}_navlink > a`)) {
      const url = target.closest(`li.${ID}_navlink > a`).href;
      if (target.closest('body').classList.contains(`${ID}_contactPage`)) {
        fireEvent(`User interacts with the navigation from the contact us page - link (${url})`);
      } else {
        fireEvent(`User interacts with the navigation - link (${url})`);
      }
    } else if (target.closest(`body:not(.${ID}_contactPage) #make_a_claim_button`)) {
      fireEvent('User interacts with make a claim cta');
    } else if (target.closest(`body:not(.${ID}_contactPage) #login_button`)) {
      fireEvent('User interacts with login cta');
    } else if (target.closest(`body:not(.${ID}_contactPage) #homeserve-logo`)) {
      fireEvent('User interacts with logo');
    } else if (target.closest(`body:not(.${ID}_contactPage) .${ID}_myHomeServe-item`)) {
      fireEvent('User interact with MyHomeServe dropdown');
    } else if (target.closest('[href*="/uk/account/b2c-logout"]')) {
      fireEvent('User interact with log out cta');
    } else if (target.closest('[class*="header-module--btnClaim"]') || target.closest('#make_a_claim_button')) {
      //contact page
      fireEvent('User interacts with make a claim cta on contact us page');
    } else if (target.closest('[class*="header-module--btnLogin"]') || target.closest('#login_button')) {
      fireEvent('User interacts with login cta on contact us page');
    } else if (target.closest(`body.${ID}_contactPage .${ID}_myHomeServe-item`)) {
      fireEvent('User interact with MyHomeServe dropdown');
    } else if (
      target.closest(`body.${ID}_contactPage .brandLogo`) ||
      target.closest(`body.${ID}_contactPage .navbar-brand`) ||
      target.closest(`body:not(.${ID}_contactPage) .navbar-brand`)
    ) {
      fireEvent('User interacts with logo on contact us page');
    } else if (target.closest('.header-nav-item .dropdown-toggle')) {
      //control
      fireEvent('User interacts with country drop down');
    } else if (target.closest(`${ID}_loginBtn`)) {
      fireEvent('User interacts with login cta');
    } else if (target.closest(`${ID}_makeAClaimBtn`)) {
      fireEvent('User interacts with make a claim cta');
    } else if (target.closest(`.${ID}-control a[href="/uk/LoggedIn/claims-proxy"]`)) {
      fireEvent('User interacts with make a claim cta');
    } else if (target.closest(`.${ID}-control a[href="/uk/LoggedIn/my-homeserve"]`)) {
      fireEvent('User interacts with login cta');
    } else if (target.closest('a[class*="header-module--colorBlack"]')) {
      const url = target.closest('a[class*="header-module--colorBlack"]').href;
      if (url.includes('loggedin/claims-proxy')) {
        fireEvent('User interacts with make a claim cta on contact us page');
      } else if (url.includes('loggedin/my-homeserve')) {
        fireEvent('User interacts with login cta on contact us page');
      }
    }
  });

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  init();

  const appContainer = document.querySelector('body');
  let oldHref = document.location.href;
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        document.body.classList.remove(`${shared.ID}`);

        setTimeout(() => {
          const newNav = document.querySelector(`.${ID}_navbar-container`);
          document.querySelector(`.${ID}_myHomeServe`)?.remove();
          newNav?.remove();
          init();
        }, 1000);
      }
    });
  });

  const config = {
    childList: true,
    subtree: true,
  };

  observer.observe(appContainer, config);

  fetch('/uk/loggedin/my-homeserve')
    .then((response) => {
      //console.log('🚀 ~ .then ~ response:', response);
      if (response.status === 200) {
        window.isLoggedIn = true;
        const html = response.text();
        return html;
      }
    })
    .then((html) => {
      // Parse the HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Find the element with ID 'hub-header'
      const element = doc.querySelector('#hub-header');
      if (element) {
        //console.log('Element found:', element);
        const userInitials = extractInitials(element.textContent);
        window.userInitials = userInitials;
      } else {
        console.log('Element with ID #hub-header not found.');
      }
    })
    .catch(() => {
      window.isLoggedIn = false;
    })
    .finally(() => {
      const newNav = document.querySelector(`.${ID}_navbar-container`);
      document.querySelector(`.${ID}_myHomeServe`)?.remove();
      const headerNavItem =
        document.querySelector('.navbar-header .header-nav-item') ||
        document.querySelector('.hs-header__buttons') ||
        document.querySelector('[class*="header-module--headerLogo"] .brandLogo > div:nth-child(2) > div:nth-child(1)');
      headerNavItem.insertAdjacentHTML('afterbegin', myHomeServe(ID));
      if (!newNav) {
        init();
      }
    });
};
