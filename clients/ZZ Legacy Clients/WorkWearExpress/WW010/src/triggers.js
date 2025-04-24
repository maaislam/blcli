import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#site_torso',
  '#product_grid',
  () => {
    return window.dataLayer[0]
  },
  () => {
    return window.dataLayer[0].page.template
  },
], activate);
