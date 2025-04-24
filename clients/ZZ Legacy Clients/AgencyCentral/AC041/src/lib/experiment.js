/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup, tracking } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import AC022m from './AC022m';

const activate = () => {
  // if (!window.location.href.match(/search.htm?/g)) {
  //   return false;
  // }
  // Experiment code
  if (!document.querySelector('.AC022_match_wrap')) {
    AC022m();
  }

  setup();
  tracking();
};

export default activate;
