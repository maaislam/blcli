/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import ProductTabs from './components/tabs';
import infoContent from './components/infoContent';
import InformationBanner from './components/whyMerchoid';

export default () => {
  setup();
  
  const tabs = new ProductTabs();
  infoContent();

  const informationBanner = new InformationBanner();
};
