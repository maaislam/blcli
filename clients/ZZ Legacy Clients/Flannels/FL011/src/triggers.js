import { Run, loginCheck } from './experiment';
import { poller } from '../../../../lib/uc-lib';

const URL = window.location.pathname;

if (URL.indexOf('/checkout/launch') > -1 || URL.indexOf('/Login') > -1) {
  poller([
    '.existingCustomer .dnnPrimaryAction',
    '.newCustomer .dnnPrimaryAction',
  ], loginCheck);
}

poller([
  '.CheckWrap .ExitLinks',
], Run);
