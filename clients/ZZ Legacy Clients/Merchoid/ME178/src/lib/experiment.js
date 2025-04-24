/**
 * @author Rebecca Wallwork - User Conversion
 */
import { setup } from './services';
import brandHeaders from './components/brandHeaders';
import inGridContent from './components/ingridContent';
import emailBox from './components/emailBox';
import settings from './settings';
import genderCategories from './components/genderCategories';
import stickyFilter from './components/stickyFilter';
// import { cacheDom } from './../../../../../lib/cache-dom';

const activate = () => {
  setup();

  brandHeaders();
  inGridContent();
  emailBox();
  stickyFilter();

  if (settings.VARIATION === '3') {
    genderCategories();
  }
  // Experiment code
};

export default activate;
