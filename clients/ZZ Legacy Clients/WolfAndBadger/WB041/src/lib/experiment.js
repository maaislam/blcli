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

/* eslint-disable import/prefer-default-export */
export const waitUntilElementExists = (selector, callback) => {
  const el = document.querySelector(selector);
  if (el) {
    return callback(el);
  }
  setTimeout(() => waitUntilElementExists(selector, callback), 500);
};

const runChanges = () => {
  waitUntilElementExists('[data-testid="mini-bag-slide"]', () => {
    const getMiniBagButtons = document
      .querySelector('[data-testid="mini-bag-slide"]')
      .querySelectorAll('a');
    const viewShoppingBagButton = [...getMiniBagButtons].filter(a => a.textContent.match('View shopping bag'));
    viewShoppingBagButton[0].style.border = '1px solid #000000';
    viewShoppingBagButton[0].addEventListener('click', () => fireEvent('User Clicked View Shopping Bag'));
  });
  waitUntilElementExists('[data-testid="mini-bag-slide"]', () => {
    const getMiniBagButtons = document
      .querySelector('[data-testid="mini-bag-slide"]')
      .querySelectorAll('a');
    const viewShoppingBagButton = [...getMiniBagButtons].filter(a => a.textContent.match('Checkout Securely'));
    viewShoppingBagButton[0].addEventListener('click', () => fireEvent('User Clicked View Shopping Bag'));
  });
};

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
  if (shared.VARIATION === 'control') {
    // Tracking
    document
      .querySelector('[data-testid="add-to-bag"]')
      .addEventListener('click', () => fireEvent('User added product to bag'));
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  runChanges();

  // Tracking
  document.querySelector('[data-testid="add-to-bag"]').addEventListener('click', () => fireEvent('User added product to bag'));
  /**
   * Fire Toggle Js
   * After content is added to page, to grab elements
   */
  init();
};
