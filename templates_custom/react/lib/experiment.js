/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import shared from '../../../../../core-files/shared';
import { h, render, Component } from "preact";
import ReactComponent from './components/ReactComponent';
import { setup, fireEvent } from '../../../../../core-files/services';

const runChanges = () => {
  // Declare container markup for Component to sit inside
  const markup = `
    <div class="${shared.ID}__component">
    
    </div>
  `;

  // Get element from page where the component will sit
  const elementOnPage = document.querySelector('.element_on_page');
  if(elementOnPage) {
    // Insert wrapper markup
    elementOnPage.insertAdjacentHTML('afterbegin', markup);
    // Grab wrapper element
    const reactWrapper = document.querySelector(`.${shared.ID}__component`);
    // Render Component to wrapper
    if(reactWrapper) {
      render(<ReactComponent />, reactWrapper);
    }
  }

}

export default () => {
  setup();

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
  if(shared.VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  init();
};
