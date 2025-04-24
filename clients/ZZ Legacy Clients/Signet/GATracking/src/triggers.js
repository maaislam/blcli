import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  'meta[property="og:type"]',
  '#BreadcrumbBar',
  '#MainContentWrapper h1',
  () => {
    return window.ga && window.ga.getAll;
  },
], activate);