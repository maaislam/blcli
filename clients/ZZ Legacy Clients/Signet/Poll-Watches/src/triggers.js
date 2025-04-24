import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  () => document && document.body,
  () => window.digitalData && window.digitalData.page && window.digitalData.page.pageInfo && document && document.body
], activate);
