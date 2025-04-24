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

// Utils

// Data

const runChanges = () => {
  const App = () => <Fragment></Fragment>;

  const idOrNameOfPlacementOnPage = '#MainContent .WMN';
  const placementonPage = document.querySelector(idOrNameOfPlacementOnPage);
  placementonPage.innerHTML = '';
  placementonPage.insertAdjacentHTML('afterbegin', "<div id='root'></div>");

  render(<App />, document.getElementById('root'));
};

export default () => {
  setup();

  // Fire event when code is loaded
  fireEvent('Test Code Fired');

  if (shared.VARIATION === 'control') {
    return;
  }

  // Run fireEvent if conditions are met
  if (condition) {
    fireEvent('Conditions Met');
  }

  runChanges();
};
