import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.content-container.container-fluid',
  '.lazy-load.shortcode-image',
], activate);
