/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { pollerLite } from '../../../../../lib/utils';
import BookingPopup from './bookLightbox';
import { setup, getSiteFromHostname, cookieOpt, fireEvent } from './services';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
 setup();
 cookieOpt();


 const appointmentTracking = () => {
    const storeAppt = document.querySelector('a.product-book-appointment__link');
    const virtualAppt = document.querySelector('a.product-virtual-appointment__link');

    storeAppt.addEventListener('click', () => {
      fireEvent('Clicked book store appointment');
    });

    virtualAppt.addEventListener('click', () => {
      fireEvent('Clicked book virtual appointment');
    });
 }

  if(VARIATION !== 'control') {

     // offer message
     const addOfferBadge = () => {
      const offerExBadge = document.querySelector('.product-messages .product-messages__item span');
      
      if(offerExBadge) {
        const badge = document.createElement('div');
        badge.classList.add(`${ID}-badge`);
        badge.innerHTML = `<span>${offerExBadge.textContent.trim()}</span>`;

        document.querySelector('.product-gallery__main').appendChild(badge);
      }
    }

    // move reviews below title
    const moveReviews = () => {
      const productreviews = document.querySelector('.detail-page__right-column .product-customer-rating-summary');
      if(productreviews) {
        const reviewAmount = window.digitalData.product[0].productInfo.ratingCount;
        productreviews.querySelector('.product-customer-rating-summary__text').textContent = `(${reviewAmount})`;
        document.querySelector('.product-price').insertAdjacentElement('beforebegin', productreviews);

        document.querySelector('#js-link-reviews').addEventListener('click', () => {
          events.send(`${ID} - V` + VARIATION, 'click', 'review link');
        });
      }
    }

    // change styling of finance
    const financeChanges = () => {

      const clearpay = document.querySelector('.product-clearpay');
      if(clearpay) {
        const clearpayText = clearpay.innerHTML.replace('with', '');
        clearpay.innerHTML = clearpayText;

        document.querySelector('.product-price').insertAdjacentElement('beforeend', clearpay);   
        document.querySelector('.product-price').classList.add(`${ID}-clearpayOnly`);
        document.querySelector('#js-clearpay-lightbox').addEventListener('click', () => {
          document.querySelector('#js-clearpay-popup').removeAttribute('hidden');
        });
        document.querySelector('#js-clearpay-popup').addEventListener('click', () => {
          document.querySelector('#js-clearpay-popup').addAttribute('hidden');
        });
      }

      pollerLite(['finance-options',
      () => {
        if(document.querySelector('finance-options') && document.querySelector('finance-options').shadowRoot && document.querySelector('finance-options').shadowRoot.querySelector('.finance-options')) {
          return true
        }
      }
      ], () => {
        const ifc = document.querySelector('finance-options');
        const clearpay = document.querySelector('.product-clearpay');
        if(clearpay) {
          document.querySelector('.product-price').classList.remove(`${ID}-clearpayOnly`);
          document.querySelector('.product-price').classList.add(`${ID}-ifcWithClearpay`);
          document.querySelector('.product-price').insertAdjacentElement('afterend', clearpay);
        }
        if(ifc) {
          ifc.shadowRoot.querySelector('.finance-options').style = "background: transparent; padding:0px;";
          ifc.shadowRoot.querySelector('.finance-options p').style = "display: none;";
          ifc.shadowRoot.querySelector('.finance-options__button').style = "display: none;";
        
  
          const financePrice = ifc.shadowRoot.querySelector('.finance-options').textContent.match(/[\$\£\€](\d+(?:\.\d{1,2})?)/);
            
            const financeBox = document.createElement('div');
            financeBox.classList.add(`${ID}-financeBox`);
            financeBox.innerHTML = `
            <p>0% APR Finance from <span class="${ID}-ifcPrice">${financePrice[0]}</span> p/m</p>`;
    
            financeBox.addEventListener('click', () => {
              document.querySelector('finance-options').shadowRoot.querySelector('.finance-options__button').click();
              fireEvent('Click IFC finance');
            });
    
            if(window.innerWidth >= 1024) {
              document.querySelector('.product-price-pricing').insertAdjacentElement('beforeend', financeBox);
            }else {
              ifc.insertAdjacentElement('beforebegin', financeBox);   
            }
        }
      });


      const paypal = document.querySelector('.product-paypal-credit');
      if(paypal) {
        const newPaypal = document.createElement('div');
        newPaypal.classList.add(`${ID}-paypal`);
        newPaypal.innerHTML = `<p>Spread the cost with <span style="background-image:url('https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/4B18CBAB5BA259BCE9323BFD8E4B143BBCC84549CFE72E7EC252CF0EFFABBF13.png?meta=/SG132---CTA-section-tidy-up/paypal.png')"></span></p>`;

        newPaypal.addEventListener('click', () => {
          document.querySelector('.product-paypal-credit__link').click();
        });

        document.querySelector('.product-summary').appendChild(newPaypal);
        
      }

      
    }



    // put stock behind link
    const stockCheck = () => {
      const storeCheck = document.querySelector('collect-in-store');
      const stockContainer = document.createElement('div');
      stockContainer.classList.add(`${ID}-stockCheck`);
      stockContainer.innerHTML = `
      <div class="${ID}-stockToggle">
        <span></span><p>Check stock in your local store</p>
      </div>
      <div class="${ID}-stockBox"></div>`;

      stockContainer.querySelector(`.${ID}-stockBox`).appendChild(storeCheck);

      document.querySelector('.product-buy-now').insertAdjacentElement('beforebegin', stockContainer);

      // change styling of shadow root on the stock
      const stockStyle = document.createElement('style');
      if(getSiteFromHostname() === 'ernestjones') {
        stockStyle.innerHTML = `
        .cis { background: #EFEFEF } 
        .cis-section-title { display: none }
        .cis-postcode-search .cis-postcode-search__nearby button { 
          background-color: #D8D8D8;
          background-image: url('https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/68F1861A2BFA82BCF87BEBD26B67309B041BD18FC196B01D617C5195E69F0C53.png?meta=/SG080---In-Grid-Content-PLP-New/searchDark.png');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 20px;
          width: 50px;
        }

        .cis {
          font-family: Oxygen,Arial,Helvetica,sans-serif;
        }
        .cis-bottom-wrapper__title strong {
          font-weight: 300;

        }
        .cis-bottom-section {
          margin-top: 15px;
        }
        .cis-postcode-search__my-location {
          margin-top: 15px;
        }
        .cis-postcode-search__my-location span svg {
          display: none
        }
        .cis-postcode-search__my-location span {
          background: url(https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5044B38A56E6C441402BB7D8743EC0A7DC46CBD647FF0EDB55C21B72C21B1187.png?meta=/SG080---In-Grid-Content-PLP-New/noun_Location_3639309.png) no-repeat center;
          background-size: contain;
          height: 20px;
          width: 20px;
          display: inline-block;
        }
        .cis-postcode-search__my-location button {
          font-family: Oxygen,Arial,Helvetica,sans-serif;
          margin-left: 0;
        }
        .cis-postcode-search .cis-postcode-search__nearby button {
          opacity: 1;
        }
        .cis-postcode-search .cis-postcode-search__nearby button:disabled {
          opacity: 0.5;
        }
        .cis-postcode-search .cis-postcode-search__nearby button strong {
          display: none;
        }
        .cis-postcode-search__nearby input {
          border: .0625rem solid #e4e4e4;
          border-right: 0px;
        }
        .cis-bottom-wrapper {
          padding-left: 25px;
          position: relative;
        }
        .cis-bottom-wrapper::before {
          content: '';
          height: 25px;
          width: 20px;
          position: absolute;
          left: 5px;
          top: 50%;
          transfrom: translateY(-50%);
          -webkit-transform: translateY(-50%);
          -moz-transform: translateY(-50%);
          -o-transform: translateY(-50%);
        }
        .cis-bottom-section .cis-bottom-wrapper:nth-child(1)::before {
          background: url('https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/53D1DA13C21182822EEB0C9AA5BF10BAC9907D4AE64C3C57FD482BC66BD40884.png?meta=/SG080---In-Grid-Content-PLP-New/noun_Store_3940605.png') no-repeat center;
          background-size: contain;

        }
        .cis-bottom-section .cis-bottom-wrapper:nth-child(2)::before {
          background: url('https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/6FE0ADD3154E27E9C48B45CEB16630EBE7B22D0DB3A15760F27E7A91310397A6.png?meta=/SG080---In-Grid-Content-PLP-New/noun_delivery_1918041.png') no-repeat center;
          background-size: contain;
        }
        .cis-bottom-wrapper svg {
          display: none;
        }
        @media(min-width: 1024px) {
          .cis {
            padding: 15px;
          }
          .cis-postcode-search {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 20px;
          }
          .cis-postcode-search__my-location {
            margin-top: 0;
            order: unset;
            width: 30%;
            text-align: center;
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          .cis-postcode-search__nearby {
            width: 65%;
          }
        }
        `;
      } else {
        stockStyle.innerHTML = `
        .cis { background: #EFEFEF } 
        .cis-section-title { display: none }
        .cis-postcode-search .cis-postcode-search__nearby button { 
          background-color: #D8D8D8;
          background-image: url('https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/68F1861A2BFA82BCF87BEBD26B67309B041BD18FC196B01D617C5195E69F0C53.png?meta=/SG080---In-Grid-Content-PLP-New/searchDark.png');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 20px;
          width: 50px;
        }

        .cis {
          font-family: Montserrat,sans-serif;
        }

        .cis-bottom-wrapper__title{
          font-size: 12px;
        }
        .cis-bottom-wrapper__title strong {
          font-weight: 300;

        }
        .cis-bottom-section {
          margin-top: 15px;
        }
        .cis-postcode-search__my-location {
          margin-top: 15px;
        }
        .cis-postcode-search__my-location span svg {
          display: none
        }
        .cis-postcode-search__my-location span {
          background: url(https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5044B38A56E6C441402BB7D8743EC0A7DC46CBD647FF0EDB55C21B72C21B1187.png?meta=/SG080---In-Grid-Content-PLP-New/noun_Location_3639309.png) no-repeat center;
          background-size: contain;
          height: 20px;
          width: 20px;
          display: inline-block;
        }
        .cis-postcode-search__my-location button {
          font-family: Montserrat,sans-serif;
          margin-left: 0;
          color: #a2202c;
        }
        .cis-postcode-search .cis-postcode-search__nearby button {
          opacity: 1;
        }
        .cis-postcode-search .cis-postcode-search__nearby button:disabled {
          opacity: 0.5;
        }
        .cis-postcode-search .cis-postcode-search__nearby button strong {
          display: none;
        }
        .cis-postcode-search__nearby input {
          border: .0625rem solid #e4e4e4;
          border-right: 0px;
        }
        .cis-bottom-wrapper {
          padding-left: 25px;
          position: relative;
        }
        .cis-bottom-wrapper::before {
          content: '';
          height: 25px;
          width: 20px;
          position: absolute;
          left: 5px;
          top: 50%;
          transfrom: translateY(-50%);
          -webkit-transform: translateY(-50%);
          -moz-transform: translateY(-50%);
          -o-transform: translateY(-50%);
        }
        .cis-bottom-section .cis-bottom-wrapper:nth-child(1)::before {
          background: url('https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/53D1DA13C21182822EEB0C9AA5BF10BAC9907D4AE64C3C57FD482BC66BD40884.png?meta=/SG080---In-Grid-Content-PLP-New/noun_Store_3940605.png') no-repeat center;
          background-size: contain;

        }
        .cis-bottom-section .cis-bottom-wrapper:nth-child(2)::before {
          background: url('https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/6FE0ADD3154E27E9C48B45CEB16630EBE7B22D0DB3A15760F27E7A91310397A6.png?meta=/SG080---In-Grid-Content-PLP-New/noun_delivery_1918041.png') no-repeat center;
          background-size: contain;
        }
        .cis-bottom-wrapper svg {
          display: none;
        }
        .t-red-btn {
          border: 0;
        }
        @media(min-width: 1024px) {
          .cis {
            padding: 15px;
          }
          .cis-bottom-wrapper__title br {
            display: none;
          }
          .cis-postcode-search {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 20px;
          }
          .cis-postcode-search__my-location {
            margin-top: 0;
            order: unset;
            width: 38%;
            text-align: center;
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          .cis-postcode-search__nearby {
            width: 56%;
          }
        }
        `;
      }
      storeCheck.shadowRoot.appendChild(stockStyle);
      


      // stock toggle
      stockContainer.querySelector(`.${ID}-stockToggle`).addEventListener('click', () => {
        if(stockContainer.classList.contains(`${ID}-stockShow`)) {
          stockContainer.classList.remove(`${ID}-stockShow`);
        } else {
          stockContainer.classList.add(`${ID}-stockShow`);
          fireEvent('Click check stock');
        }
      });

    }

    // move qty
    const moveQty = () => {
      const qty = document.querySelector('.product-quantity__container');
      qty.querySelector('#js-quantity').setAttribute('type', 'number');
      document.querySelector('.product-buy-now').insertAdjacentElement('afterbegin', qty);
    }

    // book appointment box
    const changeAppointmentBox = () => {
      const bookBox = document.querySelector('.book-appointments-section');
      const bookAppointment = document.createElement('div');
      bookAppointment.classList.add(`${ID}-booking`);
      bookAppointment.innerHTML = 
      `<h3>${window.innerWidth > 767 ? 'Need help from one of our experts?' : 'Need help?'}</h3>
      <p>Book a free appointment at your local store or an online virtual appointment with one of our friendly experts.</p>
      <div class="${ID}-bookButtons"></div>`;

     bookBox.insertAdjacentElement('beforebegin', bookAppointment);

      bookAppointment.querySelector(`.${ID}-bookButtons`).appendChild(bookBox.querySelector(`.product-book-appointment`))
      bookAppointment.querySelector(`.${ID}-bookButtons`).appendChild(bookBox.querySelector(`.product-virtual-appointment`))
    
    }

    const moveSizeGuide = () => {
      const willItFit = document.querySelector('.product-ring-size__will-it-fit');
      if(willItFit) {
        document.querySelector('.product-ring-size__data').insertAdjacentElement('afterend', willItFit);

        if(!document.querySelector('.product-step-up-down__container')) {
          document.querySelector('.product-ring-size').style= "border-top: 1px solid #E9E9E9; padding-top: 15px;";
        }
      }
    }



    const addBookCTA = () => {
      document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-bookoverlay"></div>`);
      document.querySelector('.product-buy-now').insertAdjacentHTML('afterend', `<div class="${ID}-bookingCTA">Book an appointment</div>`);
    }

    addOfferBadge();
    moveReviews();
    financeChanges();
    stockCheck();
    moveQty();

    if(VARIATION === '1') {
      changeAppointmentBox();
      appointmentTracking();
    }

    // move offer if exist
    const offertext = document.querySelector('.product-price-offer');
    if(offertext) {
     document.querySelector('.product-buy-now').insertAdjacentElement('afterend', offertext);
    }

    if(window.innerWidth >= 1024) {
      moveSizeGuide();
    }

    if(VARIATION === '2') {
      addBookCTA();
      new BookingPopup();
    }
    
  } else {
    appointmentTracking();

    pollerLite(['finance-options',
      () => {
        if(document.querySelector('finance-options') && document.querySelector('finance-options').shadowRoot && document.querySelector('finance-options').shadowRoot.querySelector('.finance-options')) {
          return true
        }
      }
      ], () => {
        const ifc = document.querySelector('finance-options');
        ifc.addEventListener('click', () => {
              fireEvent('Click IFC finance');
        });
    });
  }

  
  pollerLite(['collect-in-store'], () => {
    const storeCheckEl = document.querySelector('collect-in-store');
    storeCheckEl.shadowRoot.querySelector('button').addEventListener('click', () => {
      fireEvent('Clicked check store search');
    });
  });
  
};
