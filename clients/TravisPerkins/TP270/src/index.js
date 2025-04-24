import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body'], () => {
  //swiper();
  setTimeout(activate, 2000);
});
