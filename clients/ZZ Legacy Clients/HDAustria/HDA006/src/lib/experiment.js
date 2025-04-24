/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  document.addEventListener('click', (e) => {
    if (e.target.closest('.mm-listview') || (e.target.closest('#main-navigation') && e.target.nodeName.toLowerCase() == 'a')) {
      fireEvent(`Customer clicked ${e.target.innerText} within the navigation`);
    } else if (e.target.classList.contains('lnr-bars') && e.target.closest('a')) {
      fireEvent(`Customer opened mobile navigation`);
    } else if (e.target.closest('.mm-search') && e.target.nodeName.toLowerCase() == 'input') {
      fireEvent(`Customer initiated a search from mobile menu`);
    }
  });

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  var basicStructure = {
    init: function () {
      this.mainJS();
    },
    mainJS: function () {
      //For JS
      document.querySelector('#main-navigation').classList.add(`${ID}__main-navigation`);
      document.querySelector('.header-top').classList.add(`${ID}__header-top`);

      if (document.querySelector('#mobile-navigation')) {
        document.querySelector('.mm-navbar')?.classList.add(`${ID}__mm-navbar`);
        document.querySelector('.mm-navbars-top')?.classList.add(`${ID}__mm-navbars-top`);
      }

      const handlerText = document
        .querySelector('.HDA006__header-top .list-inline')
        .getElementsByTagName('li')[2]
        .querySelector('a');
      handlerText.innerText = 'Händler-Login';

      const activeSatHref = document.querySelector('.HDA006__main-navigation>ul').getElementsByTagName('li')[4];
      activeSatHref.querySelector('a').setAttribute('href', '/hardware-bestellen');

      var desktopNav = [
        {
          name: 'Pakete',
        },
        {
          name: 'activeSatPackets',
          text: 'Du hast schon ein SAT-Empfangsgerät?',
        },
        {
          name: 'orderSatHardware',
        },
        {
          name: 'ActivateTvApp',
          text: 'Mehr über TV-App',
        },
        {
          name: 'learnAboutHardware',
          text: 'Mehr über SAT-Hardware',
        },
      ];

      desktopNav.forEach((element, desktopIndex) => {
        document.querySelectorAll('#main-navigation .list-inline.list-first li').forEach((liElem, index) => {
          if (desktopIndex === index) {
            liElem.classList.add(element.name);
            element.text ? (liElem.querySelector('a').innerText = element.text) : null;
          }
        });
      });

      var mobileNav = [
        {
          name: 'packages',
        },
        {
          name: 'mbActiveSatPackets',
          text: 'Bereits ein SAT paket?',
        },
        {
          name: 'mbOrderSatHardware',
        },
        {
          name: 'ActivateTvApp',
          text: 'Mehr über TV-App',
        },
        {
          name: 'mbLearnAboutHardware',
          text: 'Erfahren Sie über Hardware',
        },
        {
          name: 'streamingPlayer',
        },
        {
          name: 'myHdAustria',
        },
        {
          name: 'dealers',
          text: 'Händler-Login',
        },
        {
          name: 'blog',
        },
        {
          name: 'customerService',
        },
      ];

      mobileNav.forEach((mobileNav, mobileNavIndex) => {
        document.querySelectorAll('#mobile-navigation .list-inline.list-first.mm-listview li').forEach((listItem, listIndex) => {
          if (mobileNavIndex === listIndex) {
            listItem.classList.add(mobileNav.name);
            mobileNav.text ? (listItem.querySelector('a').innerText = mobileNav.text) : null;
          }
        });
      });

      document.querySelectorAll(`.${ID}__main-navigation li>a`).forEach((liItem) => {
        if (window.location.pathname == liItem.pathname) {
          liItem.style.color = '#69bb48';
        }
      });
    },
  };

  basicStructure.init();
};
