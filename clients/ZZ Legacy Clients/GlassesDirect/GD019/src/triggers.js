import activate from './lib/experiment';

// Local
activate();

// Qubit
/*
const poller = require('@qubit/poller');
require('@qubit/remember-preview')();
poller([
  () => window.mobileSite !== undefined,
  'window.universal_variable.page.type',
], () => {
  const isMobile = window.mobileSite;
  const uv = window.universal_variable;
  const pageType = uv && uv.page && uv.page.type && uv.page.type.toLowerCase();

  if (isMobile) {
    // Only run on PDP and hometrial basket with empty products
    if (pageType === 'product') {
      poller(['#action-hometrial'], cb);
    } else if (window.location.pathname.indexOf('/basket/hometrial') > -1) {
      poller(['.hometrial-item.slot-empty a.product-link'], cb);
    }
  } else {
    // Run on all pages with popup
    if (pageType === 'category') {
      poller(['#nav-hometrial .badge-count', '#popover-hometrial .popover-inner'], cb);
    } else if (pageType === 'product') {
      poller(['#action-hometrial', '#nav-hometrial .badge-count', '#popover-hometrial .popover-inner'], cb);
    } else {
      poller(['#nav-hometrial .badge-count', '#popover-hometrial .popover-inner'], cb);
    }
  }
});
*/
