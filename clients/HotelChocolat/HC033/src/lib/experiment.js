/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { pollerLite } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  const addOOSBanner = () => {
    const OOSBanner = document.createElement('div');
    OOSBanner.classList.add(`${ID}-bannerMain`);
    OOSBanner.innerHTML = `
    <h2>All our Velvetisers are sold out!</h2>
    <p>We're sorry, but all our Velvetisers have now sold out. We're not expecting stock until <b>01/01/2021.</b></p>
      <div class="${ID}-bottom">
          <div class="${ID}-giftCardText">
              <p>If you were buying a Velvetiser as a gift, you can still buy a Velvetiser gift card</p>
              <div class="${ID}-giftCardAdd">
                <div class="${ID}-product">
                <div class="${ID}-image"></div>
                  <div class="${ID}-productText">
                    <h3>Velvetiser gift card</h3>
                    <b>£99.95</b>
                  </div>
                  <div class="${ID}-button">Add to bag</div>
                </div>
              </div>
            </div>
            <div class="${ID}-email">
              <div class="${ID}-stockSuccess">
                <h3>Thank You!</h3>
                <p>We will notify you when these products become available.</p>
              </div>
              <div class="${ID}-emailInner">
                <p>Alternatively, add your email address below to be notified when the Velvetiser comes back in stock</p>
                <span class="${ID}-error">Please enter a valid email address</span>
                <div class="${ID}-emailForm"></div>
              </div>
            </div>
        </div>`;

    document.querySelector('#main').insertAdjacentElement('afterbegin', OOSBanner);
  }

 

  const getForm = () => {
    const productID = document.querySelector('.pdpForm #pid').value;
    const request = new XMLHttpRequest();
      request.open('GET', `https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Product-BackInStockDialog?pid=${productID}`, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement('html');
          temp.innerHTML = request.responseText;
          const form = temp.querySelector('#back-in-stock');
          document.querySelector(`.${ID}-emailForm`).appendChild(form);
        }
      };
      request.send();
  }
 

  const addVoucher = () => {
    const addButton = document.querySelector(`.${ID}-giftCardAdd .${ID}-button`);
    addButton.addEventListener('click', () => {
      addButton.classList.add(`${ID}-addingToBag`);
      addButton.textContent = 'Adding...';

      window.jQuery.ajax({
        url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
        type: 'post',
        data: 'dwfrm_giftcert_purchase_amount=99.95&Quantity=1&cartAction=add&pid=356665'
      });
      window.location.reload();
    });
  }


  const submitEmail = () => {
    const email = document.querySelector('#back-in-stock .input-text.required');
    const productID = document.querySelector('.pdpForm #pid').value;
    const errorMSG = document.querySelector(`.${ID}-bannerMain .${ID}-error`);
    const successMsg = document.querySelector(`.${ID}-bannerMain .${ID}-stockSuccess`);
    const emailInner = document.querySelector(`.${ID}-bannerMain .${ID}-emailInner`);
    const cancelButton = document.querySelector(`.${ID}-emailForm #back-in-stock-cancel`);



    const submitButton = document.querySelector(`.${ID}-emailForm #back-in-stock-submit`);
    submitButton.addEventListener('click', () => {

      function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
      }
      
      if(validateEmail(email.value) === false) {
        errorMSG.style.display = 'block';
      } else {
        errorMSG.style.display = 'none';

        if(email.value !== '') {
          errorMSG.style.display = 'none';
          window.jQuery.ajax({
            url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Product-SubmitEmail?format=ajax',
            type: 'post',
            data: `email=${email.value}&productID=${productID}`,
            success:function() {
              successMsg.style.display = 'block';
              emailInner.style.display = 'none';
            }
          });
        } else {
          errorMSG.style.display = 'block';
        }
      }
    });

    cancelButton.addEventListener('click', () => {
      document.querySelector('#back-in-stock .input-text.required').value = '';
    });
  }

  addOOSBanner();
  getForm();
  addVoucher();
  pollerLite(['#back-in-stock .input-text.required', `.${ID}-error`], () => {
    submitEmail();
  });

};
