/**
 * PJ058 - Reducing password errors in the checkout
 * @author User Conversion
 */
import { setup } from './services';
import PJ024 from './lib/PJ024';
import { cacheDom } from '../../../../../lib/cache-dom';

const activate = (exp) => {
  setup();

  // Experiment code
  PJ024.init(exp);
};

export default activate;
