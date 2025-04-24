import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.c-page__main',
  () => window.dataLayer && window.dataLayer[3] && window.dataLayer[3].user
], activate);
