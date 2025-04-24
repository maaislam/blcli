/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';

import { getCustomerDetails } from '../../../Utils/Apis';
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 1000;
const tradeBtnText = 'Trade Counter';

const newTradeicon = (
  lineColor = '#E9B351'
) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 22 22" fill="none">
<path d="M0.522389 19.9835L1.89989 21.4511C2.65793 22.2407 3.52101 22.1755 4.28824 21.2745L13.4143 10.685C13.7889 10.9638 14.1372 10.9545 14.5646 10.8617L15.4971 10.6574L16.1162 11.3171L16.0723 11.8091C16.0116 12.3199 16.1509 12.7102 16.5955 13.1839L17.3276 13.9548C17.7721 14.4379 18.3648 14.4655 18.7917 14.0105L21.6945 10.9174C22.1214 10.462 22.0955 9.83971 21.6506 9.35661L20.9185 8.57642C20.4743 8.10268 20.0993 7.93541 19.6284 8.0099L19.158 8.06523L18.5653 7.43401L18.8269 6.34693C18.9487 5.8085 18.8181 5.3718 18.2689 4.79591L16.1162 2.51066C12.9518 -0.842507 8.89921 -0.740354 6.12744 2.24123C5.74362 2.64985 5.70888 3.20743 5.9529 3.61604C6.1534 3.96932 6.58035 4.18257 7.16426 4.02465C8.5154 3.66286 9.86653 3.77395 11.1913 4.73079L10.6334 6.23584C10.4241 6.793 10.4417 7.248 10.6509 7.66598L0.688136 17.4386C-0.148588 18.2643 -0.244441 19.1654 0.522788 19.9831M7.51332 2.61282C9.89289 0.717453 12.8564 1.02391 15.0007 3.30916L17.3451 5.78935C17.5544 6.01238 17.5808 6.18859 17.5197 6.46739L17.1886 7.95371L18.5916 9.4494L19.4463 9.36555C19.6987 9.33788 19.777 9.35619 19.9863 9.56986L20.5355 10.1645L18.0864 12.7838L17.5284 12.1897C17.328 11.976 17.3104 11.8921 17.3367 11.6227L17.415 10.7033L16.0207 9.217L14.5738 9.5141C14.3209 9.56986 14.1903 9.56986 13.9723 9.33788L12.0368 7.26673C11.8275 7.0437 11.8012 6.91345 11.9146 6.61636L12.7693 4.44263C11.3395 2.9844 9.44797 2.17611 7.62635 2.79882C7.54807 2.82649 7.49575 2.80776 7.46939 2.77073C7.44343 2.72433 7.44343 2.67794 7.51332 2.61324M1.65586 19.3144C1.21134 18.8407 1.3683 18.5525 1.66425 18.2643L11.4529 8.64069L12.5425 9.81119L3.48587 20.207C3.21548 20.5228 2.8756 20.6156 2.50936 20.2346L1.65586 19.3144Z" fill="${lineColor}"/>
</svg>`;

const clickHandler = (e) => {
  const { target } = e;
  if (target.closest('[data-test-id="call-out-block-link"][href="/tc/buy-again-list"]')) {
    fireEvent('buy again cicked');
  } else if (target.closest('[data-test-id="call-out-block-link"][href="/accountDashboard"]')) {
    fireEvent('user clicked account dashboard');
  } else if (target.closest('[data-test-id="call-out-block-link"][href="/accountDashboard/sharedAccess"]')) {
    fireEvent('user clicked shared access');
  } else if (target.closest('[data-test-id="account-menu-item"]') && target.closest('[data-test-id="account-menu-wrapper"]')) {
    const linkElem = target.closest('[data-test-id="account-menu-item"]');
    const linkText = linkElem.querySelector('a').innerText;
    fireEvent(`dropdown menu item clicked - ${linkText}`);
  } else if (target.closest('[data-test-id="my-products-button-menu-item"]')) {
    fireEvent('burger menu "buy again" clicked');
  } else if (target.closest('[data-test-id="trade-counter-button-menu-item"]')) {
    fireEvent('burger menu "trade counter" clicked');
  }
};

const init = () => {
  if (window.location.pathname !== '/') return;
  getCustomerDetails().then((res) => {
    if (!res.customer || res.customer.customerType !== 'TCC') return;

    // Experiment Code...
    setup();

    fireEvent('Conditions Met');

    // -----------------------------
    // Add events that apply to both variant and control
    // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
    // -----------------------------
    // ...

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (VARIATION == 'control') {
      return;
    }

    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...

    const isMobile = !!document.querySelector('[data-test-id="animated-header-menu-button"]');
    //console.log('🚀 ~ init ~ isMobile:', isMobile);

    const attachPoint =
      document.querySelector('[data-test-id="my-products-button"]') ||
      document.querySelector('[data-test-id="header-account-button"]');

    if (!attachPoint) return;

    const newTradeBtnDesktop = `<div data-test-id="${ID}-trades-button" class="ControlsBarDesktopstyled__LinkWrapper-sc-172vyz7-10 kvluYx"><a data-test-id="link" class="sc-gXmSlM gDrGoq" href="/tc"><span color="text-default" class="sc-bczRLJ sc-iBkjds bgIXvN gBWIkr"><span class="ControlsBarDesktopstyled__LinkInner-sc-172vyz7-12 imnlDT"><span class="ControlsBarDesktopstyled__LinkIcon-sc-172vyz7-13 jifFJU">${newTradeicon()}</span><span class="ControlsBarDesktopstyled__LinkInnerText-sc-172vyz7-9 kODdSI noibu-blocked" data-cs-mask="true" data-test-id="link-title"><span color="text-on-primary" class="sc-bczRLJ sc-evZas jjMIhN jYvxJQ">${tradeBtnText}</span></span></span></span></a></div>`;
    const newTradeIconMobile = `<a href="/tc" data-test-id="${ID}-trades-button" class="TopBarMobilestyled__AccountIcon-sc-mnxbxp-7 eUkcMw">${newTradeicon(
      '#fff'
    )}</a>`;

    const btnHtml = isMobile ? newTradeIconMobile : newTradeBtnDesktop;
    const attachPosition = isMobile ? 'beforebegin' : 'afterend';

    if (!document.querySelector(`[data-test-id="${ID}-trades-button"]`)) {
      attachPoint.insertAdjacentHTML(attachPosition, btnHtml);
    }

    if (isMobile) return;
    attachPoint.style.display = 'none';
  });
};

export default () => {
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);
  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(
      [
        () =>
          document.querySelector('[data-test-id="my-products-button"]') ||
          document.querySelector('[data-test-id="header-account-button"]'),
      ],
      () => {
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
