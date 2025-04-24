import settings from '../../../lib/settings';
import formData from '../../../data/data';

const { ID } = settings;

function Payment() {
  return `
    <div class="${ID}_payment">
      <div class="${ID}_payment__header">
        <h3 class="${ID}_payment__title">Important Information</h3>
        <p class="${ID}_payment__notice">papa John's will never call and ask for personal details from orders placed online, especially your card details. Please do not provide this information to anyone. For more info on how you can protect yourself from fraud <a href="#" target="_blank">click here</a></p>
      </div>
      <!--end header-->
      <div class="${ID}_checkOutBlock__body">
        <div class="optionsCont isHidden">
          <iframe src="https://pm.ephapay.net/PayPageMT/paypage.jsf?transref=0680d65c-74a1-411c-bb43-eaecbe8c82b4&amp;store=E00001&amp;ent=BCSMARTPAY&amp;org=Merchant-176A51702D6E4E70848152437BA91684" id="ctl00_cphBody_frmShppFrame" width="100%" style="border:0;" height="750px"></iframe>
        </div>
      </div>
    </div>
  `;
}

export default Payment;
