import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '.BrandsHead', '#dnn_Search_dvSearch',
], activate);
