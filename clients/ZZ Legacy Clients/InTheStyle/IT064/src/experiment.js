// ---------------------------------------------------------
// This test sets / unsets cookies that are picked up
// server side in order to affect free returns
// Set IT64_VARIATION = 'control' or 'v1'
// ---------------------------------------------------------
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import { cacheDom } from '../../../../lib/cache-dom';

/** The Event Sender */
const eventSender = utils.events.setDefaultCategory('IT064-free-returns-testing');

/** The cookie we set name */
const cookieName = 'its_cookied_free_returns';

/**
 * @description Helper regex replace on copy
 * @param {NodeList} elm - Elm containing text to match against
 * @return {Boolean}
 */
const amendRefundCopy = (domElm) => {
  const elm = domElm;
  const elmNodes = [].slice.call(elm.childNodes);
  const textNodes = elmNodes.filter(n => n.nodeType === 3);

  // eslint-disable-next-line
  const matchText = /If you opt for a refund, we will process the full transaction amount \(excluding delivery charge\) minus £2.50 handling charge per order.|If you opt for a refund, we will process the full transaction amount \(excluding delivery charge\) minus £2.50 handling charge./;

  let didMakeChange = false;
  textNodes.forEach((txt) => {
    const elmTextNormalised = txt.textContent.replace('&nbsp;', ' ').trim();
    if (elmTextNormalised.match(matchText)) {
      elm.textContent = elmTextNormalised.replace(matchText, 'If you opt for a refund, we will process the full transaction amount.');

      didMakeChange = true;
    }
  });

  return didMakeChange;
};

/**
 * @description Control code
 */
const runControl = () => {
  utils.deleteCookie(cookieName);
};

/**
 * @description Variation code
 */
const runVariation = () => {
  utils.fullStory('IT064', 'Variation 1');

  // Sets cookie - this can be utilised server side and in other a/b tests
  utils.setCookie(cookieName, '1');

  // Modify refund copy on elements
  UC.poller([
    '.accordion #cms-3 p',
  ], () => {
    [].forEach.call(cacheDom.getAll('.accordion #cms-3 p'), (elm) => {
      const didAmendRefundCopy = amendRefundCopy(elm);

      if (didAmendRefundCopy) {
        eventSender.send(null, 'did-amend-refund-copy');
      }
    });
  });
};

// Determine variation vs control depending on existence of variable
if (window.IT64_VARIATION === 'control') {
  runControl();
} else if (window.IT64_VARIATION === 'v1') {
  runVariation();
} else {
  throw '[IT064] Set window.IT64_VARIATION matching control or valid variation.'; // eslint-disable-line
}
