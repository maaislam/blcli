import { pollerLite } from "../../../../../../lib/uc-lib";
import settings from "../settings";

/**
 * @desc Bring the voucher box form on to the homepage
 * to apply the voucher
 */
export default () => {
  document.body.classList.add(`${settings.ID}-voucher_add`);
  pollerLite(['#promo-code-content input', '#promo-code-content .promo-code-input__button'], () => {
  // get voucher code from url
    const voucherCode = 'EJVCLOUD10';

    // enter the value in the voucher box and click the voucher box in the background
    const voucherBoxHome = document.querySelector('#promo-code-content input');
    const voucherApply = document.querySelector('#promo-code-content .promo-code-input__button .cta--secondary');
    voucherBoxHome.value = voucherCode;
    setTimeout(() => {
      voucherApply.click();
    }, 2000);
  });
};
