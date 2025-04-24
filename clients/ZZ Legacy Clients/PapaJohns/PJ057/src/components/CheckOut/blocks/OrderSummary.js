import settings from '../../../lib/settings';
import formData from '../../../data/data';

const { ID } = settings;

function orderSummary(opts) {
  const { isLoggedIn, isConfirmation, variation } = opts;
  const basket = JSON.parse(localStorage.getItem('basketList'));
  const totals = basket.slice(-1);
  const discount = totals[0].discount;
  const total = totals[0].total;
  let basketList;
  const orderData = document.querySelector('.m-ordering-for p').children;
  const orderType = orderData[0].textContent;
  const orderFrom = orderData[1].textContent;
  for (let i = 0; i < basket.length - 1; i += 1) {
    basketList += `
      <li class="${ID}_orderSummary__listItem">
        <div class="${ID}_orderSummary__listItem__content">
          <span class="${ID}_orderSummary__listItem__contentFoodType">${basket[i].quantity}x ${basket[i].name}</span>
          <span class="${ID}_orderSummary__listItem__contentPrice">${basket[i].price}</span>
        </div>
      </li>
      <!--end item-->
    `;
  }
  if (isConfirmation) {
    return `
      <div class="${ID}_orderSummaryWrap confirmation${variation === '2' ? ' green' : ''}">
        <div class="${ID}_orderSummary">
          <div class="${ID}_orderSummary__header">
            <img src="http://i64.tinypic.com/9aajxk.png">
            <div class="${ID}_orderSummary__headerContent">
              <img src="http://i63.tinypic.com/s4s36s.png">
              <span class="${ID}_orderSummary__headerText">Thanks, you order is on its way to <strong>${orderFrom}</strong></span>
            </div>
          </div>
          <!--end header-->
          <div class="${ID}_orderSummary__footer">
            <span class="${ID}_orderSummary__footerDiscount">order n° #749249879</span>
          </div>
          <!--end footer-->
        </div>
      </div>
    `;
  }
  return `
    <div class="${ID}_orderSummaryWrap${variation === '2' ? ' green' : ''}">
      <div class="${ID}_orderSummary">
        <div class="${ID}_orderSummary__header">
          <img src="http://oi65.tinypic.com/5d86sp.jpg">
          <div class="${ID}_orderSummary__headerContent">
            <img src="${variation === '2' ? 'http://oi66.tinypic.com/wlyk8y.jpg' : 'http://i63.tinypic.com/s4s36s.jpg'}">
            <span class="${ID}_orderSummary__headerText">${formData.orderSummary.subHeading} <strong>${orderType}</strong> to <strong>${orderFrom}</strong></span>
          </div>
        </div>
        <!--end header-->
        <div class="${ID}_orderSummary__body">
          <ul class="${ID}_orderSummary__list">
            ${basketList}
          </ul>
          ${isLoggedIn ? `
            <div class="${ID}_orderSummary__rewards">
              <img src="${variation === '2' ? 'http://i66.tinypic.com/fp8fx4.png' : 'http://i67.tinypic.com/70hsh1.png'}">
              <div class="${ID}_orderSummary__rewards__content">
                <div class="${ID}_orderSummary__rewards__points">
                  <img src="${variation === '2' ? 'http://i68.tinypic.com/k1a1aa.png' : 'http://i66.tinypic.com/35hforl.png'}">
                </div>
                <span class="${ID}_orderSummary__rewards__notice"></span>
              </div>
            </div>
          ` : ''}
        </div>
        <!--end body-->
        <div class="${ID}_orderSummary__footer">
            ${discount !== undefined ? `<span class="${ID}_orderSummary__footerDiscount">Total Discount ${discount}</span>` : ''}
            <span class="${ID}_orderSummary__footerTotal">Total ${total}</span>
        </div>
        <!--end footer-->
      </div>
    </div>
  `;
}

export default orderSummary;
