import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '.tp_prod_listing .tp_prodViewWrapper .tp_prodView li', '#wrapper',
], activate);
