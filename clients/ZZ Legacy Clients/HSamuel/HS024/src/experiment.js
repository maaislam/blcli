/**
 * HS024
 */
import { setup } from './services';
import orderSummary from './components/orderSummary';
import pageLayout from './components/pageLayout';
import steps from './components/steps';

const activate = () => {
  setup();
  orderSummary();
  pageLayout();
  steps();
};

export default activate;
