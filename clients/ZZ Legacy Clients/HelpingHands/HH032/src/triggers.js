import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.HH024',
  '#sidebar .branch-details .wpsl-location-address',
  '#hero > .container > .row',
], activate);
