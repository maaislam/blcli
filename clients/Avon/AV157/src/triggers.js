import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

pollerLite(['.boost-sd__product-list', () => document.querySelectorAll('.boost-sd__product-item').length > 12], activate);
