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

// Components
import { WelcomeKits } from './components/WelcomeKits/index';
import { HeroBanner } from './components/HeroBanner/index';
import { FAQ } from './components/FAQ/index';
import { WhySellAvon } from './components/WhySellAvon/index';
import { GettingStarted } from './components/GettingStarted';
import { RepTestomonials } from './components/RepTestomonials';
import { RolesAndSupport } from './components/RolesAndSupport';
import { BeautyBoss } from './components/BeautyBoss';

// Utils
import { accordionToggle } from './utils/accordionTrigger';

// Data
import { data } from './data';
import { ModalComponent, Modal, ModalComponentExtra } from './utils/Modal';
import obsIntersection from './observeIntersection';

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
  if (shared.VARIATION === 'control') {
    fireEvent('Conditions Met');
    if (location.pathname == '/pages/become-an-avon-rep') {
    }
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  runChanges();
  /**
   * Fire Toggle Js
   * After content is added to page, to grab elements
   */
  accordionToggle();
  init();
  fireEvent('Conditions Met');

  const target1 = document.querySelector('#hero-banner .CTA');
  const target2 = document.querySelector('#modal-react');

  const intersectionCallback1 = (entry) => {
    const floatingDiv = document.querySelector('.AV093__sticky');
    if (!entry.isIntersecting && floatingDiv) {
      floatingDiv.style.display = 'flex';
    } else {
      floatingDiv.style.display = 'none';
    }
  };
  const intersectionCallback2 = (entry) => {
    const floatingDiv = document.querySelector('.AV093__sticky');
    if (!entry.isIntersecting && floatingDiv) {
      floatingDiv.style.display = 'flex';
    } else {
      floatingDiv.style.display = 'none';
    }
  };

  obsIntersection(target1, 0.3, intersectionCallback1);
  obsIntersection(target2, 0.1, intersectionCallback2);
};
