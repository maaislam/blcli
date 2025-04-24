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
import { pollerLite } from '../../../../../lib/utils';

// // Components
// import { WelcomeKits } from './components/WelcomeKits/index';
// import { HeroBanner } from './components/HeroBanner/index';
// import { FAQ } from './components/FAQ/index';
// import { WhySellAvon } from './components/WhySellAvon/index';
// import { GettingStarted } from './components/GettingStarted';
// import { RepTestomonials } from './components/RepTestomonials';
// import { RolesAndSupport } from './components/RolesAndSupport';
// import { BeautyBoss } from './components/BeautyBoss';

// // Utils
// import { accordionToggle } from './utils/accordionTrigger';

// // Data
// import { data } from './data';
// import { ModalComponent, Modal, ModalComponentExtra } from './utils/Modal';
// import obsIntersection from './observeIntersection';
const { ID, VARIATION } = shared;
const runChanges = () => {
  /** ******************************
   ***** App Start *****
   ****************************** */
  const App = () => (
    <Fragment>
      <HeroBanner />
      <div className='backgroundWhite' />
      <WhySellAvon />
      <div className='backgroundWhite' />
      <RepTestomonials {...data.firstRepBox[0]} />
      <div className='backgroundWhite' />
      <BeautyBoss />
      <div className='backgroundWhite' />
      <GettingStarted />
      <div className='backgroundWhite' />
      <WelcomeKits />
      <div className='backgroundWhite' />
      <RepTestomonials {...data.secondRepBox[0]} />
      <div className='backgroundWhite' />
      <FAQ />
      <div className='backgroundWhite' />
      <RolesAndSupport />
      <div className='backgroundWhite' />
      <RepTestomonials {...data.thirdRepBox[0]} />
      {/* <span className='CTA bottom' style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <ModalComponent />
      </span> */}
      <Modal />
      <ModalComponentExtra />
    </Fragment>
  );

  /** ******************************
   ***** App End *****
   ****************************** */

  /** ******************************
   ***** Placement On Page Start *****
   ****************************** */

  const idOrNameOfPlacementOnPage = '#MainContent .WMN';
  const placementonPage = document.querySelector(idOrNameOfPlacementOnPage);
  placementonPage.innerHTML = '';
  placementonPage.insertAdjacentHTML('afterbegin', "<div id='root'></div>");

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
  if (shared.VARIATION == 'control') {
    if (location.pathname == '/pages/become-an-avon-rep') {
      fireEvent('Conditions Met');
    }
    return;
  }
  if (shared.VARIATION == '1') {
    if (location.pathname == '/pages/become-an-avon-rep') {
      fireEvent('Conditions Met');
      pollerLite(['.newsletter-section', '#site-scroll-top'], () => {
        document.querySelector('.newsletter-section')?.classList.add(`${ID}__hide`);
        const oldscrollTopBtn = document.getElementById('site-scroll-top');
        const oldShareTopBtn = document.getElementById('site-social-share');

        oldShareTopBtn.classList.add(`${ID}__hide`);
        oldscrollTopBtn.classList.add(`${ID}__hide`);
        const newBckToTop = `<button id="${ID}__site-scroll-top" class="btn-plain ">
  <svg aria-hidden="true" class="icon icon-arrow-up" viewBox="0 0 14 16"><path d="m0 6.59 1.074 1.012L6.238 2.74V16h1.524V2.74l5.164 4.862L14 6.591 7 0 0 6.59z"></path></svg>
</button>`;

        document.querySelector(`#${ID}__site-scroll-top`)?.remove();

        //oldscrollTopBtn.insertAdjacentHTML('afterend', newBckToTop);

        const adjustScrollAction = () => {
          const scrollTopBtn = document.getElementById('AV108__site-scroll-top');
          window.scrollY > document.body.offsetHeight / 4
            ? scrollTopBtn?.classList.add('visible')
            : scrollTopBtn?.classList.remove('visible');
        };
        adjustScrollAction();
        window.addEventListener('scroll', adjustScrollAction);
        document.body.addEventListener('click', (e) => {
          // console.log(e.target);
          const target = e.target;
          const targetMatched = (queryString) => target.matches(queryString) || target.closest(queryString);
          if (targetMatched(`#${ID}__site-scroll-top`)) {
            document.getElementById('site-scroll-top').click();
            fireEvent('User clicks back to top button');
          } else if (targetMatched('#site-social-share')) {
            fireEvent('User clicks share button');
          } else if (target.closest('#form114') && target.matches('button[type="submit"]')) {
            const isEmailValid = (email) => {
              const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

              return re.test(String(email).toLowerCase());
            };
            const email = target.closest('form').querySelector('input[type="email"]').value;
            //console.log(isEmailValid(email));
            if (isEmailValid(email)) {
              fireEvent('User clicks newletter sign up');
            }
          }
        });
      });
    }
    //return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  //runChanges();
  /**
   * Fire Toggle Js
   * After content is added to page, to grab elements
   */
  //accordionToggle();
  //init();
  //fireEvent('Conditions Met');

  // const target1 = document.querySelector('#hero-banner .CTA');
  // const target2 = document.querySelector('#modal-react');

  // const intersectionCallback1 = (entry) => {
  //   const floatingDiv = document.querySelector('.AV108__sticky');
  //   if (!entry.isIntersecting && floatingDiv) {
  //     floatingDiv.style.display = 'flex';
  //   } else {
  //     floatingDiv.style.display = 'none';
  //   }
  // };
  // const intersectionCallback2 = (entry) => {
  //   const floatingDiv = document.querySelector('.AV108__sticky');
  //   if (!entry.isIntersecting && floatingDiv) {
  //     floatingDiv.style.display = 'flex';
  //   } else {
  //     floatingDiv.style.display = 'none';
  //   }
  // };

  // //document.body.addEventListener('click', (e) => {});

  // obsIntersection(target1, 0.3, intersectionCallback1);
  // obsIntersection(target2, 0.1, intersectionCallback2);
};
