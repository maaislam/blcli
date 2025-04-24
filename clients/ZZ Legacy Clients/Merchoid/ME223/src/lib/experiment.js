/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import lowStockMessage from './components/lowStockMessage';
import ScarcityBanner from './components/banner';
export default () => {
  setup();
  //lowStockMessage();
  const banner = new ScarcityBanner();
};
