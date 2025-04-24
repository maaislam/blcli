import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  () => !!window.prm,
  () => (window.location.pathname.match(/\/stores\/(.*)\/pizzas\.aspx/g) ||
    window.location.pathname.match(/\/stores\/(.*)\/customise\.aspx/g)),
], activate);
