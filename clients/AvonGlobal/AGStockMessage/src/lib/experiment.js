/**
 * AGNewPDPStockMessage - Adds a stock message to new /productdetail/ pages
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import StockMessage from './components/StockMessage/StockMessage';

export default () => {
  setup();
  const { rootScope } = shared;

  /** Make all changes */
  const init = () => {
    new StockMessage();
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });

  init();
};
