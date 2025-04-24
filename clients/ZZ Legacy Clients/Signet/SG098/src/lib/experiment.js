/**
 * SG098 - Promo Banner
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * EJ:
 * https://www.ernestjones.co.uk/webstore/d/5186420/tolkowsky+18ct+white+gold+0.52ct+diamond+solitaire+ring/
 * HS:
 * https://www.hsamuel.co.uk/webstore/d/5863759/18ct+white+gold+1ct+forever+diamond+halo+ring/
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;
/**
 * @desc Change value of voucher 
 * and list of Products SKUs here: -----------------------
 */
const voucherValue = 'SAVE100';
const voucherMessage = 'Save £100 when you spend over £1000. Use Code:';
const ejProductSkus = ['5186420'];
const hsProductSkus = ['5863759'];
/** 
 * Please DO NOT change anything below this line ---------
 */

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    let pageType = '';
    if (window.location.pathname.indexOf('/webstore/d/') > -1) {
      pageType = 'pdp';
    } else if (window.location.pathname.indexOf('/webstore/showbasket') > -1) {
      pageType = 'basket';
    }
    setup();
    const voucher = `<div class="${ID}-voucher hidden">
        <div class="${ID}-text__section">${voucherMessage}</div>
        <div class="${ID}-copy__section">
          <input type="text" readonly value="${voucherValue}"/>
          <div class="${ID}-copyButton">Copy code</div>
          <div class="${ID}-speechBubble__success">Code copied!</div>
        </div>
    </div>`;
    document.querySelector('header').insertAdjacentHTML('beforeend', voucher);

    const copyTextButton = document.querySelector(`.${ID}-copyButton`);
    const textToCopy = document.querySelector(`.${ID}-voucher input`);
    copyTextButton.addEventListener('click', () => {
        textToCopy.select();
        textToCopy.setSelectionRange(0, 99999);
        document.execCommand("copy");

        document.querySelector(`.${ID}-speechBubble__success`).classList.add('show');

        setTimeout(() => {
          document.querySelector(`.${ID}-speechBubble__success`).classList.remove('show');
        }, 3000);
    });
    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
      if (pageType == 'pdp') {
        for (let i = 0; i <= ejProductSkus.length - 1; i += 1) {
          const sku = ejProductSkus[i];
          const currentSku = window.digitalData.product[0].productInfo.masterSku;
          if (currentSku == sku) {
            document.querySelector(`.${ID}-voucher`).classList.remove('hidden');
            break;
          }
        };
        

      } else if (pageType == 'basket') {
        const basketContentData =  window.digitalData.cart.item;

        for (let i = 0; i <= Object.keys(basketContentData).length - 1; i += 1) {
          const item = basketContentData[i];
          const pSku = item.productInfo.masterSku;
          if (ejProductSkus.includes(`${pSku}`)) {
            document.querySelector(`.${ID}-voucher`).classList.remove('hidden');
            document.querySelector(`.${ID}-voucher`).classList.add('basket');
            break;
          }
        }
      }
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
      if (pageType == 'pdp') {
        for (let i = 0; i <= hsProductSkus.length - 1; i += 1) {
          const sku = hsProductSkus[i];
          const currentSku = window.digitalData.product[0].productInfo.masterSku;
          if (currentSku == sku) {
            document.querySelector(`.${ID}-voucher`).classList.remove('hidden');
            break;
          }
        };
        

      } else if (pageType == 'basket') {
        const basketContentData =  window.digitalData.cart.item;

        for (let i = 0; i <= Object.keys(basketContentData).length - 1; i += 1) {
          const item = basketContentData[i];
          const pSku = item.productInfo.masterSku;
          if (hsProductSkus.includes(`${pSku}`)) {
            document.querySelector(`.${ID}-voucher`).classList.remove('hidden');
            document.querySelector(`.${ID}-voucher`).classList.add('basket');
            break;
          }
        }
      }
    }
  }
};
