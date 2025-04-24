/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
// import { setup } from './services';
// import shared from './shared';
import { h, render, Component } from "preact";
import ReactComponent from './components/ReactComponent';
// import { fireEvent } from './services';
import { events } from '../../../../../lib/utils';

const runChanges = () => {
  // Declare container markup for Component to sit inside
  const markup = `
    <div class="${shared.ID}__component">
    
    </div>
  `;

  // Get element from page where the component will sit
  const elementOnPage = document.querySelector(`[class^="ProductDetailDesktop__OrderButtonsWrapper"]`);
  if(elementOnPage) {
    // Insert wrapper markup
    elementOnPage.insertAdjacentHTML('beforeend', markup);
    // Grab wrapper element
    const reactWrapper = document.querySelector(`.${shared.ID}__component`);
    // Render Component to wrapper
    if(reactWrapper) {
      render(<ReactComponent />, reactWrapper);
    }
  }

  const mobileElement = document.querySelector(`[class^="ProductDetailMobile__OrderButtonsWr"]`);
  if (mobileElement) {
    mobileElement.insertAdjacentHTML('afterend', markup);
    const reactWrapper = document.querySelector(`.${shared.ID}__component`);
    if(reactWrapper) {
      render(<ReactComponent />, reactWrapper);
    }
  }

}

export default () => {
  setup();
  fireEvent('Conditions Met');


  if (shared.VARIATION == 'control') {
    fireEvent('Control running');
    return;
  }

  const doesElementExist = document.querySelector(`.${shared.ID}__calculator`);
  if (doesElementExist) {
    return;
  }

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    runChanges();
  };

  init();
};
