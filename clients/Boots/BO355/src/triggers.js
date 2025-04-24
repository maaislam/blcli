import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

if (!getCookie('Synthetic_Testing')) {
  pollerLite(
    [() => document.querySelector('.oct-listers-facets') || document.querySelector('.oct-listers__filter-trigger')],
    activate
  );
}
