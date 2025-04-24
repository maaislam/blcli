/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import voucherBox from './components/voucherBox';
import Lightbox from './components/loaderLightbox';
import settings from './settings';
import tenOffBox from './components/tenOffBox';
import { events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  const URL = window.location.href;

  // if homepage
  pollerLite(['.hero-banner'], () => {
    // regexs
    const voucherRegex = /.*(cm_mmc=RLS-_-Affiliate).*(vouchercloud).*/i;
    const emailAbandonRegex = /.*(cm_mmc=RLS-_-Affiliate).*(salecycle).*/i;
    const tenOffRegex = /.*(cm_mmc=RLS-_-Affiliate).*(dailyMail).*/i;

    if (URL.match(tenOffRegex) && URL.match(tenOffRegex)[0]) { // if 10% popup code in url
      tenOffBox();
    } else if (URL.match(emailAbandonRegex) && URL.match(emailAbandonRegex)[0]) {
      const emailLightbox = new Lightbox(settings.ID, {
        content: `
        <div class="${settings.ID}-loaderContent">
          <div class="${settings.ID}-loader">
            <span></span>
            <p>Please Wait</p>
          </div>
        </div>
        <p class="${settings.ID}-lightboxText">We're taking you to your basket now</p>`, // CHANGE THIS - put an if statement here based on what the url is
      });

      setTimeout(() => {
        window.location.href = '/webstore/showbasket.sdo';
      }, 2000);
    } else if (URL.match(voucherRegex) && URL.match(voucherRegex)[0]) { // only for users with voucher in URL
      // pull in the form, check if voucher code doesn't exist
      const request = new XMLHttpRequest();
      request.open('GET', 'https://www.ernestjones.co.uk/webstore/secure/showbasket.sdo', true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement('div');
          temp.innerHTML = request.responseText;
          if (!temp.querySelector('.promo-code-input__remove-button')) {
            const voucherForm = temp.querySelector('#promo-code-content');
            document.body.appendChild(voucherForm);
          }
        }
      };

      request.send();
      pollerLite(['#promo-code-content .promo-code-input__button'], () => {
        voucherBox();
        const voucherLightbox = new Lightbox(settings.ID, {
          content: `
          <div class="${settings.ID}-loaderContent">
            <div class="${settings.ID}-loader">
              <span></span>
              <p>Please Wait</p>
            </div>
          </div>
          <p class="${settings.ID}-lightboxText">We're just adding your voucher to your order now. We'll take you to the basket once complete</p>`,
        });
      });
    }
  });
  if (URL.indexOf('/webstore/showbasket.sdo') > -1) {
    const errorMessage = document.querySelector('.basket__messages-container .error-strip');
    if (errorMessage) {
      events.send(`${settings.ID} v${settings.VARIATION}`, 'voucher error', 'Voucher code not applied');
    } else {
      events.send(`${settings.ID} v${settings.VARIATION}`, 'voucher applied', 'Voucher code applied');
    }
  }
};

export default activate;
