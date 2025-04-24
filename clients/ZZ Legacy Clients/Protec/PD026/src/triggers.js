import { Run, AutoFill } from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#nav_secondary',
  '.pd5-uspwrapper',
  () => {
    let trigger = false;
    if (window.jQuery && !document.querySelector('#forgottenPwdForm input')) {
      trigger = true;
    }
    return trigger;
  },
], Run);

poller([
  '#forgottenPwdForm input',
], AutoFill);

