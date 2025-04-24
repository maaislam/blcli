/**
 * AV024 - Foundation Finder PLP
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';

export default () => {
  setup();

  // Remove foundation finder banner
  $('.Umbraco .ContentModule a[href*="/foundation-finder/"]').closest('.DeviceDisplay').remove();
};
