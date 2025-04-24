import activate from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#pa_size option',
  () => !!window.localStorage,
], () => {
  // Don't run if 3 products have already been viewed in this experiment
  const storage = window.localStorage.ME176 ? JSON.parse(window.localStorage.ME176) : null;
  if (storage && Object.keys(storage).length >= 3) {
    return false;
  }
  activate();
});
