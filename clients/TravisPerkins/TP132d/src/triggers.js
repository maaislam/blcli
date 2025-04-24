import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '#products .row .prod', '.feature-design #products .row .prod .prod_img img',
], activate);
