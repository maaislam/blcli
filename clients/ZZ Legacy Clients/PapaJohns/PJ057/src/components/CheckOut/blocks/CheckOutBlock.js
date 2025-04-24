import settings from '../../../lib/settings';
import formData from '../../../data/data';
import { getDeliveryTime, paymentMethod } from '../../../lib/services';

const { ID } = settings;

function CheckOutBlock(opts) {
  const { blockType, isLoggedIn } = opts;
  switch (blockType) {
    case 'delivery-time':
      return `
        <div class="${ID}_checkOutBlockWrap ${ID}_checkOutBlockWrap--delivery-time">
          <div class="${ID}_checkOutBlock">
            <div class="${ID}_checkOutBlock__header">
              ${formData.orderSummary.deliveryHeading}
            </div>
            <div class="${ID}_checkOutBlock__body">
              <span class="${ID}_checkOutBlock__subHeading">${formData.orderSummary.deliveryText}</span>
              <div class="${ID}_checkOutBlock__form">
                <div class="${ID}_checkOutBlock__formBlock ${ID}_checkOutBlock__formBlock--deliveryTime">
                  ${getDeliveryTime()}
                </div>
                <!--end block-->
              </div>
            </div>
          </div>
        </div>
      `;
    case 'contact-details':
      return `
        <div class="${ID}_checkOutBlockWrap ${ID}_checkOutBlockWrap--contact-details">
          <div class="${ID}_checkOutBlock">
            <div class="${ID}_checkOutBlock__header">
              Contact Details
            </div>
            <div class="${ID}_checkOutBlock__body">
              <div class="${ID}_checkOutBlock__form">
                <div class="${ID}_checkOutBlock__formBlock">
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <label class="${ID}_checkOutBlock__formLabel">First name<span>*</span></label>
                  </div>
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <input class="${ID}_checkOutBlock__formField" type="text" id="ctl00_cphBody_txtGuestFirstName" name="ctl00$cphBody$txtGuestFirstName" required>
                  </div>
                </div>
                <!--end block-->
                <div class="${ID}_checkOutBlock__formBlock">
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <label class="${ID}_checkOutBlock__formLabel">Last name<span>*</span></label>
                  </div>
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <input class="${ID}_checkOutBlock__formField" type="text" id="ctl00_cphBody_txtGuestSurname" name="ctl00$cphBody$txtGuestSurname" required>
                  </div>
                </div>
                <!--end block-->
                <div class="${ID}_checkOutBlock__formBlock">
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <label class="${ID}_checkOutBlock__formLabel">Email<span>*</span></label>
                  </div>
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <input class="${ID}_checkOutBlock__formField" type="email" id="ctl00_cphBody_txtGuestEmail" name="ctl00$cphBody$txtGuestEmail" required>
                    <span class="${ID}_checkOutBlock__formNotice">${formData.contactDetails.emailFieldText}</span>
                  </div>
                </div>
                <!--end block-->
                <div class="${ID}_checkOutBlock__formBlock">
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <label class="${ID}_checkOutBlock__formLabel">Contact Number<span>*</span></label>
                  </div>
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <input class="${ID}_checkOutBlock__formField" type="text" id="ctl00_cphBody_txtGuestContactNumber" name="ctl00$cphBody$txtGuestContactNumber" required>
                    <span class="${ID}_checkOutBlock__formNotice">${formData.contactDetails.numberFieldText}</span>
                  </div>
                </div>
                <!--end block-->
                <div class="${ID}_checkOutBlock__formBlock password">
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <label class="${ID}_checkOutBlock__formLabel">Password<span>*</span></label>
                  </div>
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <input class="${ID}_checkOutBlock__formField passwordField" type="password" id="ctl00_cphBody_txtPassword" name="ctl00$cphBody$txtPassword">
                  </div>
                </div>
                <div class="${ID}_checkOutBlock__formBlock password">
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <label class="${ID}_checkOutBlock__formLabel">Confirm Password<span>*</span></label>
                  </div>
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <input class="${ID}_checkOutBlock__formField passwordField" type="password" id="ctl00_cphBody_txtPassword" name="ctl00$cphBody$txtPassword">
                  </div>
                </div>  
                <!--end block-->
                <div class="${ID}_checkOutBlock__formBlock">
                  <span class="cssCheckbox">
                    <input id="chkLIOptOutEmail" type="checkbox" name="ctl00$cphBody$chkLIOptOutEmail">     
                    <label class="${ID}_checkOutBlock__formLabel" for="chkLIOptOutEmail">
                      <strong>Register for an account and save these details</strong>
                    </label>
                  </span>
                </div>
                <!--end block-->
              </div>
            </div>
          </div>
        </div>
      `;
    case 'delivery-details':
      return `
        <div class="${ID}_checkOutBlockWrap ${ID}_checkOutBlockWrap--delivery-details">
          <div class="${ID}_checkOutBlock">
            <div class="${ID}_checkOutBlock__header">
              Delivery Details
            </div>
            <div class="${ID}_checkOutBlock__body">
              <div class="${ID}_checkOutBlock__form">
                <div class="${ID}_checkOutBlock__formBlock">
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <label class="${ID}_checkOutBlock__formLabel" for="asap">Post Code<span>*</span></label>
                  </div>
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <input class="${ID}_checkOutBlock__formField" type="text" id="" name="" required>
                  </div>
                </div>
                <!--end block-->
                <div class="${ID}_checkOutBlock__formBlock">
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <label class="${ID}_checkOutBlock__formLabel" for="asap">Address<span>*</span></label>             
                  </div>
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <input class="${ID}_checkOutBlock__formField" type="text" id="" name="" required>
                  </div>
                </div>
                <!--end block-->
                <div class="${ID}_checkOutBlock__formBlock">
                  <div class="actionButtonWrap">
                    <label for="panel-3" class="actionButton continueToAddressBut stepTrigger" data-forwardTo="thirdStep">PROCEED TO PAYMENT</label>
                  </div>
                  <span><span class="required">*</span>Required field</span>
                </div>
                <!--end block-->
              </div>
            </div>
          </div>
        </div>
      `;
    case 'charity':
      return `
        <div class="${ID}_checkOutBlockWrap ${ID}_checkOutBlockWrap--charity">
          <div class="${ID}_checkOutBlock">
            <div class="${ID}_checkOutBlock__header">
              ${formData.paymentDetails.charityHeading}
            </div>
            <div class="${ID}_checkOutBlock__body">
              <div class="${ID}_checkOutBlock__bodyItem">
                <div class="${ID}_checkOutBlock__bodyItemWrap">
                  <p><strong>${formData.paymentDetails.charitySubHeading}</strong></p>
                  <p>${formData.paymentDetails.charityText}</p>
                </div>
                <div class="${ID}_checkOutBlock__bodyItemWrap">
                  <img src="https://pennies.org.uk/wp-content/uploads/2016/03/Logo_Strapline_1_RGB_Green.jpg">
                  <img src="http://www.soldierscharity.org/wp-content/uploads/2015/05/ABFTSC_primary_CMYK.png">
                </div>
              </div>
              <div class="actionButtonWrap actionButton--charity">
                <div class="actionButton continueToAddressBut"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    case 'payment':
      return `
        <div class="${ID}_checkOutBlockWrap ${ID}_checkOutBlockWrap--payment-method">
          <div class="${ID}_checkOutBlock">
            <div class="${ID}_checkOutBlock__header">
              Select Payment Method
            </div>
            <div class="${ID}_checkOutBlock__body ${isLoggedIn ? 'logged' : ''}">
              <div class="${ID}_checkOutBlock__form">
                <div class="${ID}_checkOutBlock__formBlock">
                  <input type="radio" name="payment" id="card">
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <label class="${ID}_checkOutBlock__formLabel" for="card">
                      <img src="http://i63.tinypic.com/2m27rt3.png">
                      Debit/Credit Card
                    </label>
                  </div>
                </div>
                <!--end block-->
                <div class="${ID}_checkOutBlock__formBlock">
                  <input type="radio" name="payment" id="visa">
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <label class="${ID}_checkOutBlock__formLabel" for="visa">
                      <img src="http://i64.tinypic.com/106boco.png">
                      Visa Checkout
                    </label>
                  </div>
                </div>
                <!--end block-->
                <div class="${ID}_checkOutBlock__formBlock">
                  <input type="radio" name="payment" id="cash">
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <label class="${ID}_checkOutBlock__formLabel" for="cash">
                      <img src="http://i66.tinypic.com/2958htf.png">
                      Cash
                    </label>
                  </div>
                </div>
                <!--end block-->
                <!--end <div class="${ID}_checkOutBlock__formBlock">
                  <input type="radio" name="payment" id="amazon">
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <label class="${ID}_checkOutBlock__formLabel" for="amazon">
                      <img src="http://i64.tinypic.com/hsjskn.png">
                      Amazon Pay
                    </label>
                  </div>
                </div>
                block-->
                <div class="${ID}_checkOutBlock__formBlock">
                  <input type="radio" name="payment" id="paypal">
                  <div class="${ID}_checkOutBlock__formBlockWrap">
                    <label class="${ID}_checkOutBlock__formLabel" for="paypal">
                      <img src="http://i68.tinypic.com/j5gg49.png">
                      Paypal
                    </label>
                  </div>
                </div>
                <!--end block-->
              </div>
            </div>
          </div>
          <div class="actionButtonWrap">
            <a href="#" class="actionButton continueToAddressBut ${ID}_actionButton disabled">CHOOSE A CHECKOUT METHOD</a>
          </div>
        </div>
      `;
    case 'save-payment':
      return `
        <div class="${ID}_checkOutBlockWrap ${ID}_checkOutBlockWrap--save-payment">
          <div class="${ID}_checkOutBlock">
            <div class="${ID}_checkOutBlock__header">
              Save Payment
            </div>
            <div class="${ID}_checkOutBlock__body">
              <div class="${ID}_checkOutBlock__form">
                <div class="${ID}_checkOutBlock__formHead">
                  <span id="${ID}_paymentType"></span>
                  <label for="${isLoggedIn ? 'panel-2' : 'panel-3'}" class="change-button">Change</label>
                </div>
                <div class="${ID}_checkOutBlock__formBlock saveMethod isHidden">
                  <span class="cssCheckbox">
                    <input id="ctl00_cphBody_chkSaveCard" type="checkbox" name="ctl00$cphBody$chkSaveCard">     
                    <label class="${ID}_checkOutBlock__formLabel" for="ctl00_cphBody_chkSaveCard">
                      Order even faster next time by saving your card
                    </label>
                  </span>
                </div>
                <!--end block-->
              </div>
              <div class="actionButtonWrap">
                <label for="${isLoggedIn ? 'panel-4' : 'panel-5'}" class="actionButton continueToAddressBut orderPlacement">Place Order</label>
              </div>
            </div>
          </div>
        </div>
      `;
    default:
      break;
  }
}

export default CheckOutBlock;
