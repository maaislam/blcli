import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.col-xs-12.ExitLinks',
  () => {
    let trigger = false;
    if (window.jQuery) trigger = true;
    return trigger;
  },
], Run);
