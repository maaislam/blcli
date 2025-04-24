import settings from '../../../lib/settings';

const { ID } = settings;

function Subscribe(variation) {
  return `
    <div class="${ID}_subscribeWrap${variation === '2' ? ' green' : ''}" id="ctl00_cphBody_pnlCheckoutContact">
      <div class="${ID}_subscribe">
        <div class="${ID}_subscribe__header">
          <img src="${variation === '2' ? 'http://i63.tinypic.com/14csl53.png' : 'http://i67.tinypic.com/2i898xz.png'}" class="${ID}_subscribe__img">
          <p class="${ID}_subscribe__headerContent">All the latest products and deal news sent direct to you using the contact details you provide</p>
        </div>
        <div class="${ID}_checkOutBlock__form">
          <div class="${ID}_checkOutBlock__formBlock">
            <div class="${ID}_checkOutBlock__formBlockWrap">
              <span class="cssCheckbox">
                <input id="chkLIOptOutSms" type="checkbox" name="ctl00$cphBody$chkLIOptOutSms">     
                <label class="${ID}_checkOutBlock__formLabel" for="chkLIOptOutSms">
                  Don't send me emails
                </label>
              </span>
            </div>
          </div>
          <div class="${ID}_checkOutBlock__formBlock">
            <div class="${ID}_checkOutBlock__formBlockWrap" for="textSignup">
              <span class="cssCheckbox">
                <input id="chkLIOptOutEmail" type="checkbox" name="ctl00$cphBody$chkLIOptOutEmail">     
                <label class="${ID}_checkOutBlock__formLabel" for="chkLIOptOutEmail">
                  Don't send me SMS
                </label>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export default Subscribe;
