/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import ctaBox from './components/ctaBox';

const activate = () => {
  setup();

  // Experiment code
  ctaBox();
};

export default activate;
