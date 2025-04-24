import {
  fullStory
} from '../../../../../lib/utils';
import settings from './settings';
import {
  throttle,
  observer
} from '../../../../../lib/uc-lib';
const {
  ID,
  VARIATION
} = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function rearrangeSummary(state) {
  const summary = document.querySelector('.Cart-Summary');
  let subTotText;
  let subTotPrice;
  if (window.innerWidth <= 768) {
    subTotText = summary.querySelector('.Cart-SubTotalLabel');
    subTotPrice = summary.querySelector('.Cart-SubTotal').textContent.trim().replace('£', '');
    summary.querySelector('.Cart-Saving1 .Cart-RegularPriceLabel span').textContent = 'Sub Total: ';
  } else {
    subTotText = summary.querySelector('.Cart-SubTotal-Wrapper .Cart-SubTotalLabel span');
    subTotPrice = summary.querySelector('.Cart-SubTotal-Wrapper .Cart-SubTotal').textContent.trim().replace('£', '');
  }
  if (parseFloat(subTotPrice) >= 25.00) {
    if (!document.querySelector(`.${ID}_freeDelBlock`)) {
      const freeDel = document.createElement('div');
      freeDel.classList.add(`${ID}_freeDelBlock`);
      freeDel.innerHTML = `
      <div class="Cart-OrderTotalLabel"><span>Delivery:</span></div>
      <div class="Cart-Save">Free!</div>
      `;
      document.querySelector('.Cart-Saving1').insertAdjacentElement('afterend', freeDel);
    }
  }
  const regPrice = summary.querySelector('.Cart-Saving1 .Cart-OrderTotalLabel span');
  const discountApplied = summary.querySelector('.Cart-Saving2 .Cart-SaveLabel');
  subTotText.textContent = 'Grand Total:';
  if (regPrice) {
    regPrice.textContent = 'Sub Total:';
  }
  if (discountApplied) {
    discountApplied.innerHTML = `<span>Discount code applied:</span>`;
    const curSavings = summary.querySelector('.Cart-Saving2 .Cart-Save');
    const curSavingstext = curSavings.textContent.trim();
    curSavings.textContent = '- ' + curSavingstext;
    if(window.innerWidth <= 768){
      if (!document.querySelector(`.${ID}_discountWrap`)) {
        const discountWrap = document.createElement('div');
        discountWrap.classList.add(`${ID}_discountWrap`);
        summary.querySelector('.Cart-Saving1').insertAdjacentElement('afterend', discountWrap);
      }
      const discountRow = summary.querySelector('.Cart-Saving2').outerHTML;
      document.querySelector(`.${ID}_discountWrap`).innerHTML = discountRow;
    }
  }
  if (state === 'couponApplied') {
    observer.disconnect(summary);
  }
}

function watchCartSummary() {
  const summary = document.querySelector('.Cart-Summary');
  const couponButton = document.querySelector('.Cart-NoCoupon .Button');
  couponButton.addEventListener('click', function () {
    const field = document.querySelector('.Cart-NoCoupon .CouponInputBox').value;
    if (field != '') {
      observer.connect(summary, function () {
        rearrangeSummary('couponApplied');
      }, {
        // Options
        config: {
          attributes: true,
          childList: true,
          subtree: true
        },
      });
    }
  });
}

export {
  setup,
  rearrangeSummary,
  watchCartSummary
}; // eslint-disable-line
