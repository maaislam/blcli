/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { Fragment, h, render } from 'preact';
import shared from '../../../../../core-files/shared';
import { setup, fireEvent } from '../../../../../core-files/services';
import { events } from '../../../../../lib/utils';

// Components
import { DropDownMenu } from './components/NavBar/navBar';
import { DeliveryBar } from './components/Delivery/deliveryBar';

// Utils
// Data
import { links } from './components/NavBar/data';

const runChanges = () => {
  /** ******************************
   ***** App Start *****
   ****************************** */
  let loggedIn;

  if (sessionStorage.getItem('SessionContext_DE')) {
    loggedIn = JSON.parse(
      sessionStorage.getItem('SessionContext_DE'),
    ).IsCustomerLoggedIn;
  }

  const runExtraChanges = () => {
    const loginButton = document.querySelectorAll('#LoginMenu a')[1];

    if (loginButton) {
      loginButton.querySelector('span').remove();
      loginButton.innerHTML = 'Login für Berater * innen';
    }

    if (document.querySelector('#ShoppingWithHeaderMenu .ShoppingWith span')) {
      document.querySelector('#RepMenu').remove();
    }

    if (document.querySelector('#ShoppingWithHeaderMenu .ShoppingWith span')) {
      if (document.querySelector('#BecomeARepLink')) {
        document.querySelector('#BecomeARepLink').remove();
      }
      document.querySelector(
        '#ShoppingWithHeaderMenu .ShoppingWith span',
      ).innerHTML = 'ONLINE SHOP VON';
    }
  };

  const loggedInFunction = () => {
    if (document.querySelector('#BecomeARepLink')) {
      document.querySelector('#BecomeARepLink').remove();
    }
    document
      .querySelector('#WelcomeMenu')
      .insertAdjacentHTML(
        'afterbegin',
        '<a id="BecomeARepLink" style="color:inherit;font-weight: normal;" ng-if="(!Session.Customer.IsAttachedForBar || !ShopContext.HideBarPrimaryNavigationLinkForAttachedCustomer) &amp;&amp; !Session.IsRepresentativeLoggedIn" ng-click="BecomeARepClick($event)" prevent-click="" href="https://www.avon-karriere.de/werde-beraterin/" target="_blank" class="ng-scope ng-click-active"><span>Avon Berater*in werden</span></a>',
      );
  };

  const notLoggedInFunction = () => {
    if (document.querySelector('#BecomeARepLink')) {
      document.querySelector('#BecomeARepLink').remove();
    }
    document
      .querySelector('#LoginMenu')
      .insertAdjacentHTML(
        'afterbegin',
        '<a id="BecomeARepLink" ng-if="(!Session.Customer.IsAttachedForBar || !ShopContext.HideBarPrimaryNavigationLinkForAttachedCustomer) &amp;&amp; !Session.IsRepresentativeLoggedIn" ng-click="BecomeARepClick($event)" prevent-click="" href="https://www.avon-karriere.de/werde-beraterin/" target="_blank" class="ng-scope ng-click-active"><span>Avon Berater*in werden</span></a>',
      );
  };
  if (loggedIn) {
    loggedInFunction();
  }

  if (!loggedIn) {
    runExtraChanges();
    notLoggedInFunction();
  }

  const appContainer = document.querySelector('#RepLoginBar');
  const observer = new MutationObserver(((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((child) => {
        if (child.id === 'WelcomeMenu') {
          loggedInFunction();
        }
        if (child.id === 'LoginMenu') {
          notLoggedInFunction();
        }
      });
    });
  }));

  const config = {
    childList: true,
    subtree: true,
  };

  observer.observe(appContainer, config);


  const App = () => (
    <Fragment>
      <DropDownMenu data={links} />
      <DeliveryBar />
    </Fragment>
  );

  /** ******************************
   ***** App End *****
   ****************************** */

  /** ******************************
   ***** Placement On Page Start *****
   ****************************** */

  const idOrNameOfPlacementOnPage = 'header';
  const header1 = document.querySelector('#HeaderMenu');
  const header2 = document.querySelector('#HeaderSubmenus');
  header1.remove();
  header2.remove();
  const placementonPage = document.querySelector(idOrNameOfPlacementOnPage);
  placementonPage.insertAdjacentHTML('beforeend', "<div id='root'></div>");
  document.querySelector('#Basket div svg-icon').innerHTML = '';
  document.querySelector('#Basket div svg-icon').insertAdjacentHTML(
    'afterbegin',
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M16 10H8.00004H4.19704L5.68533 18.1789C5.76458 18.6148 6.11916 18.9415 6.54997 18.9929L6.6692 19H17.3309C17.8142 19 18.2283 18.6544 18.3148 18.1789L19.802 10H16ZM16.3022 5.41165L16.8198 8H21C21.6239 8 22.0955 8.56504 21.9839 9.17889L20.2825 18.5367C20.0231 19.9631 18.7808 21 17.3309 21H6.6692C5.21934 21 3.97695 19.9631 3.71759 18.5367L2.01617 9.17889C1.90457 8.56504 2.37614 8 3.00004 8H7.18046L7.69899 5.41088C7.97976 4.00897 9.21084 3 10.6406 3H13.3604C14.7905 3 16.0217 4.00938 16.3022 5.41165ZM9.22004 8H14.779L14.341 5.80388C14.2475 5.33646 13.8371 5 13.3604 5H10.6406L10.523 5.00689C10.0978 5.05696 9.74584 5.37527 9.66005 5.80363L9.22004 8Z" fill="#181818"/>
  </svg>`,
  );
  document.querySelector('#ProductSearchForm input').placeholder = 'WONACH SUCHST DU?';

  /** ******************************
   ***** Placement On Page End *****
   ****************************** */

  /** ******************************
   ***** Render App Start *****
   ****************************** */

  render(<App />, document.getElementById('root'));

  /** ******************************
   ***** Render App End *****
   ****************************** */
};

export default () => {
  setup();
  debugger;
  // events.setPropertyId('UA-142145223-1');

  fireEvent('Conditions Met');

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    // ...
  };

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION === 'control') {
    // -----------------------------
    // Tracking
    // -----------------------------
    document
      .querySelector('#SearchBar')
      .addEventListener('click', fireEvent('Clicked Search Bar'));
    document
      .querySelector('#SearchButton')
      .addEventListener('click', fireEvent('Clicked to Search'));
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  runChanges();
  /**
   * Fire Functions after experiment has loaded
   */
  const element = document.querySelector('.menuButton');
  element.style.color = '#7f28c4';
  document.querySelectorAll('.best-sellers')[0].style.display = 'none';

  // -----------------------------
  // Tracking
  // -----------------------------
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      document
        .querySelector('#ProductSearchForm')
        .addEventListener('click', () => {
          fireEvent('Clicked Search Bar');
        });
      document
        .querySelector('#SearchButton')
        .addEventListener('click', () => fireEvent('Clicked to Search'));
    }
    const getMenuContainers = document.querySelectorAll('.menuButton a');

    [...getMenuContainers].forEach((container) => {
      container.addEventListener('click', () => { fireEvent('Clicked Top Level Item'); });
    });

    const getItems = document.querySelectorAll('.sub-items');

    [...getItems].forEach((item) => {
      item.addEventListener('click', () => { fireEvent('Clicked Sub-menu item'); });
    });

    const getViewAll = document.querySelectorAll('.best-sellers a');

    [...getViewAll].forEach((item) => {
      item.addEventListener('click', () => { fireEvent('Clicked View All'); });
    });
  };
  init();
};
