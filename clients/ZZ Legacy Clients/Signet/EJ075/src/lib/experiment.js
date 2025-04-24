/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { getData, getDataFromNav } from './getData';
import navMarkup from './navMarkup';

export default () => {
  setup();

  // loop through object, create nav elements, add images to the watch nav, add events to open/close nav

  navMarkup();
};
