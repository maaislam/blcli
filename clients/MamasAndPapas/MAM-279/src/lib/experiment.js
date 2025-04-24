/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import {
  isCollectionPageUrl,
  isHomePageUrl,
  handleCollectionPage,
  handleHomePage,
} from './helpers';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  /**
   * Collection page functionality handled before control variation check. We want to store
   * information about recently viewed categories to be able to display them later.
   */
  if (isCollectionPageUrl()) handleCollectionPage();

  /**
   * Homepage functionality goes here - links replacement when more than 2 saved.
   */
  const isControl = VARIATION === 'control';

  if (isHomePageUrl()) handleHomePage(isControl);

  /**
   * Add event listeners to link clicks
   */
  [].forEach.call(document.querySelectorAll('.csc-button-linkblock .btn'), btn => {
    btn.addEventListener('click', () => fireEvent(`Click Link - ${btn.innerText.trim()}`));
  });
};
