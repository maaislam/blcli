import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', () => window.DY.section], () => {
  activate();
});
