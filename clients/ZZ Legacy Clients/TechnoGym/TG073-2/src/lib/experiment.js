/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import checkUserType from './components/checkUserType';
import showNav from './components/showNav';

const activate = () => {
  setup();
  checkUserType();
  showNav();

  // Experiment code
};

export default activate;
