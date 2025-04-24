/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import checkUserType from './components/checkUserType';
import businessNavMarkup from './components/businessNavMarkup';
import mobileNavMarkup from './components/mobileNavMarkup';


const activate = () => {
  console.log('test fired');
  setup();

  // Experiment code
  const windowSize = window.outerWidth;

  checkUserType();

  // run the nav type
  if (localStorage.getItem('TG073-business')) {
    if (windowSize > 767) {
      businessNavMarkup();
    } else if (windowSize < 767) {
      mobileNavMarkup();
    }
  }
};

export default activate;
