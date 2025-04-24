import { poller } from '../../../../lib/uc-lib';
import { runAll, runOnIdentifyingMessageExists, runOnVoucherAdd, runForCancelVoucher } from './lib/experiment';
import { events } from '../../../../lib/utils';

// ------------------------------------------------------
// Event sender
// ------------------------------------------------------
const eventSender = events.setDefaultCategory('IT060---Basket-Design-Iteration');

// ------------------------------------------------------
// Poll to run in all conditions
// ------------------------------------------------------
poller([
  'body.IT028',
  'body.IT034'
], runAll);

// ------------------------------------------------------
// Poll to run if cancel voucher exists
// ------------------------------------------------------
poller([
  'body.IT028',
  'body.IT034',
  'button[title="Cancel Voucher"]'
], runForCancelVoucher);

// ------------------------------------------------------
// Poll to run ident message exists
// ------------------------------------------------------
poller([
  'body.IT028',
  'body.IT034',
  '.IT028_discount-identifying-message'
], runOnIdentifyingMessageExists);

// ------------------------------------------------------
// Poll to run when message has just been shown 
// (after addition of voucher code)
// ------------------------------------------------------
poller([
  'body.IT028',
  'body.IT034',
  '.IT028_discount-identifying-message',
  () => {
    const msg = document.querySelector('.cart > [id^=messages]');
    
    let doesMatch = false;
    if(msg && !!msg.textContent.trim()) {
      doesMatch = true;
    }

    return doesMatch;
  }
], runOnVoucherAdd);

// ------------------------------------------------------
// Assign to window
// ------------------------------------------------------
window.IT060 = {
  runAll,
  runOnVoucherAdd
};
