import {
  setup,
  getProducts,
  paymentMethod,
  addCharity,
  manageSteps,
  calculatePapaPoints,
} from './services';
import CheckOut from '../components/CheckOut/CheckOut';
import { poller, observer } from '../../../../../lib/uc-lib';
import settings from './settings';

const { ID, VARIATION } = settings;

const activate = () => {
  setup();
  /*
  Starts the test only on mobile-checkout page
  */
  if (window.location.href.indexOf('checkout-mobile') > -1) {
    /*
    Changes checkout bar text and icon
    */
    document.querySelector('.omnibarMenu .checkout-title').textContent = 'SECURE CHECKOUT';
    const lock = document.querySelector('.omnibarMenu .lock');
    lock.innerHTML = '';
    const lockImage = document.createElement('img');
    lockImage.src = 'http://i67.tinypic.com/1676hh.png';
    lock.insertAdjacentElement('afterbegin', lockImage);
    /*
    Checks if user is logged in
    */
    let record = window.localStorage.getItem('logged');
    if (record === 'true') {
      record = true;
    } else {
      record = false;
    }
    new CheckOut({ logged: record, variation: VARIATION });
    addCharity();
    paymentMethod(record);
    if (record) {
      calculatePapaPoints();
    }
    /*
    Handles image change of the step and
    switch to the next step
    */
    const triggers = document.querySelectorAll('.stepTrigger');
    Array.from(triggers).map((trigger) => {
      trigger.addEventListener('click', () => {
        const forwardTo = trigger.getAttribute('data-forwardTo');
        manageSteps(forwardTo);
      });
    });
    /*
    Show and hide the password field if the user
    wants to register
    */
    document.querySelector('#chkLIOptOutEmail').addEventListener('click', () => {
      document.querySelectorAll('.password').forEach((passwordItem) => {
        passwordItem.classList.toggle('visible');
      });
      document.querySelectorAll('.passwordField').forEach((passwordField) => {
        const isRequired = passwordField.getAttribute('required');
        if (isRequired) {
          passwordField.setAttribute('required', false);
        } else {
          passwordField.setAttribute('required', true);
        }
      });
    });
    /*
    Removes the old markup to avoid ajax calls triggred by ID or classes
    */
    //document.querySelector('.main.mainMobileInside').remove();
  } else {
    const loggedEl = document.querySelector('#ctl00__objHeader_pnlLoggedInUserTitle');
    const checkRecord = window.localStorage.getItem('logged');
    let isLogging;
    /*
    If can't find a record, create one
    */
    if (!checkRecord) {
      window.localStorage.setItem('logged', false);
    }
    /*
    Listen for the user to log-out or log-in and updates isLogging for a future visit
    */
    const prm = window.prm || Sys.WebForms.PageRequestManager.getInstance();
    prm.add_beginRequest((sender, error) => {
      const target = sender._postBackSettings.asyncTarget;
      if (target === 'ctl00$_objHeader$lbSignInMobile') {
        isLogging = true;
      }
    });
    /*
    Replace ASP button
    Redirect the user to checkOut
    */
    const checkOutURI = document.querySelector('#ctl00__objHeader_aCheckoutMobile').href;
    const checkOutButton = document.createElement('a');
    checkOutButton.classList.add('PJ057_checkOut');
    checkOutButton.textContent = 'Checkout';
    prm.add_beginRequest((sender, error) => {
      const target = sender._postBackSettings.asyncTarget;
      if (target === 'ctl00$_objHeader$lbBasketItem') {
        checkOutButton.addEventListener('click', () => {
          getProducts();
          window.location.href = checkOutURI;
        });
      }
    });
    document.querySelector('#ctl00__objHeader_divMobileBasketButtons .splitButtons .butContainer').insertAdjacentElement('beforeend', checkOutButton);
    /*
    Replace ASP button
    SignOut the user and updates the local storage
    */
    const signOutButton = document.createElement('a');
    signOutButton.classList.add('greenLink');
    signOutButton.classList.add('PJ057-link');
    signOutButton.textContent = 'Not you? Sign out';
    signOutButton.addEventListener('click', () => {
      window.localStorage.setItem('logged', false);
      const host = window.location.origin;
      window.location.href = `${host}/sign-out.aspx`;
    });
    document.querySelector('#ctl00__objHeader_divMobileBasketButtons .splitButtons .butContainer').insertAdjacentElement('beforeend', checkOutButton);
    /*
    Handles changes on body elements made by ASP
    reinsert markup that is going to be removed by ASP
    */
    poller([
      '#ctl00__objHeader_hypSignOutMobile',
    ], () => {
      document.querySelector('#ctl00__objHeader_hypSignOutMobile').insertAdjacentElement('afterend', signOutButton);
      const el = document.querySelector('#ctl00_objBody');
      observer.connect(el, () => {
        if (!document.querySelector(`#ctl00__objHeader_upProfileMobile .${ID}-link`) || !document.querySelector(`#ctl00__objHeader_divMobileBasketButtons .${ID}_checkOut`)) {
          document.querySelector('#ctl00__objHeader_hypSignOutMobile').insertAdjacentElement('afterend', signOutButton);
          document.querySelector('#ctl00__objHeader_divMobileBasketButtons .splitButtons .butContainer').insertAdjacentElement('beforeend', checkOutButton);
          if (document.querySelector('#ctl00__objHeader_trDiscount')) {
            document.querySelector('#ctl00__objHeader_trDiscount').nextElementSibling.id = `${ID}-counponName`;
          }
        }
      }, {
          config: { attributes: true, childList: true, subtree: true },
        });
    });
    /*
    If the user has clicked on the log-in button
    &
    If (loggedEl) doesn't extists on the page
    set the localstorage item to true to show the correct test
    -----------
    "prevents the localstorage to be unexact, due to lack of [loggedEl] on certain pages.
    So if the user land on a page that doesn't have the element, if is willing to continue as GUEST
    the GUEST test will be shown, otherwise if the user has logged in, before being redirected to the
    checkout page, the LOGGED-IN test will be shown."
    */
    if (isLogging && !loggedEl) {
      window.localStorage.setItem('logged', true);
    } else if (loggedEl) {
      window.localStorage.setItem('logged', true);
    }
  }
};

export default activate;
