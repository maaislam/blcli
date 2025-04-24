import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers, addEventListener } from './lib/winstack';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  destroyPollers();
  killAllEventListeners();
  killObservers();
  destroyIntervals();
};

addPoller([
  'body',
  '.c-page .c-container__main',
  () => window?.bvHelpers?.dataObject?.bag?.items,
  () => document.readyState == 'complete',
], () => {
  activate();
});
