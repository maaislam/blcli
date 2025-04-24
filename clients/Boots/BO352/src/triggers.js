import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

if (!getCookie('Synthetic_Testing')) {
  pollerLite([
    '.toggle-facet_container_text', '.oct-listers__filter-by'
  ], activate);
}
