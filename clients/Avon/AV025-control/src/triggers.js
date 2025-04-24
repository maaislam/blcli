/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import { waitForApp } from '../../../../lib/utils/avon';
import { events } from '../../../../lib/utils';

/** Poll for elements the run experiment */
const pollAndFire = () => {
  const pathname = window.location.pathname;

  // Check if page is a PLP
  if (/^(\/)(\d{3}).*$/.test(pathname)) {
    events.send('AV025-Control', 'did-meet-conditions');
  }
};

waitForApp().then(() => {
  pollAndFire();
});
