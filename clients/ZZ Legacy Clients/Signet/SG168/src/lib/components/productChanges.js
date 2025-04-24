
import shared from "../../../../../../core-files/shared";
import { pollerLite } from "../../../../../../lib/utils";
import { getData } from "../data";


export default () => {
  const { ID } = shared;

  const productSKU = window.digitalData.product[0].productInfo.masterSku;
  const productObj = getData(productSKU);
  const topProductSection = document.querySelector(`.${ID}__mainProductInfo`);

  // add new elements
  const addNewContent = () => {
  
    topProductSection.querySelector('.brand-logo img').setAttribute('src', productObj.brandLogo);
    // add range logo or text
    topProductSection.querySelector('.product-summary').insertAdjacentHTML('afterbegin', `<div class="${ID}__typeText">${productObj.range}</div>`);
   
    topProductSection.querySelector('.product-name').insertAdjacentHTML('afterend', `<div class="${ID}__productNo">Product No: ${productObj.productNo}</div>`)

    // update basket title
    const addToBag = document.querySelector('.product-buy-now');
    if (addToBag) {
      addToBag.querySelector('.product-buy-now__text').textContent = 'Add to basket';
    }

    // if reviews
    const reviews = document.querySelector('.product-summary .product-customer-rating-summary');
    if (reviews) {
      document.querySelector('.product-summary .product-price').insertAdjacentElement('beforebegin', reviews);
    }
  }

  const checkStock = () => {
    const inStock = window.digitalData.product[0].productInfo.stock;

    if (inStock === 'no') {
      document.querySelector(`.${ID}__productNo`).insertAdjacentHTML('afterend', `<div class="${ID}__button ${ID}-noStock">Out of stock</div>`);
    }
  }


  // FROM SG140
  const financeChanges = () => {

    const clearpay = document.querySelector('.product-clearpay');
    if (clearpay) {
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
        if (document.querySelector('finance-options') && document.querySelector('finance-options').shadowRoot && document.querySelector('finance-options').shadowRoot.querySelector('.finance-options')) {
          return true
        }
      }
    ], () => {
      const ifc = document.querySelector('finance-options');
      const clearpay = document.querySelector('.product-clearpay');
      if (clearpay) {
        document.querySelector('.product-price').classList.remove(`${ID}-clearpayOnly`);
        document.querySelector('.product-price').classList.add(`${ID}-ifcWithClearpay`);
        document.querySelector('.product-price').insertAdjacentElement('afterend', clearpay);
      }
      if (ifc) {
        ifc.shadowRoot.querySelector('.finance-options').style = "background: transparent; padding:0px;";
        ifc.shadowRoot.querySelector('.finance-options p').style = "display: none;";
        ifc.shadowRoot.querySelector('.finance-options__button').style = "display: none;";

         // change styling of shadow root on the stock
      const ifcStyle = document.createElement('style');
      ifcStyle.innerHTML = `
      dialog {
        height: 500px;
        overflow-y: scroll;
        z-index: 99999;
      }
      `;

      ifc.shadowRoot.appendChild(ifcStyle);
       

        const financePrice = ifc.shadowRoot.querySelector('.finance-options').textContent.match(/[\$\£\€](\d+(?:\.\d{1,2})?)/);

        const financeBox = document.createElement('div');
        financeBox.classList.add(`${ID}-financeBox`);
        financeBox.innerHTML = `
              <p>0% APR Finance from <span class="${ID}-ifcPrice">${financePrice[0]}</span> p/m</p>`;

        financeBox.addEventListener('click', () => {
          document.querySelector('finance-options').shadowRoot.querySelector('.finance-options__button').click();
          fireEvent('Click IFC finance');
        });

        if (window.innerWidth >= 1024) {
          document.querySelector('.product-price-pricing').insertAdjacentElement('beforeend', financeBox);
        } else {
          ifc.insertAdjacentElement('beforebegin', financeBox);
        }
      }
    });


    const paypal = document.querySelector('.product-paypal-credit');
    if (paypal) {
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
    const topDetails = document.querySelector(`.${ID}__productDetails`);
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
          @media (min-width: 1280px){
            .cis-postcode-search__nearby {
                width: 62%;
            }
            .cis-postcode-search__my-location {
                width: 34%;
            }
        }
        `;

    storeCheck.shadowRoot.appendChild(stockStyle);



    // stock toggle
    stockContainer.querySelector(`.${ID}-stockToggle`).addEventListener('click', () => {
      if (stockContainer.classList.contains(`${ID}-stockShow`)) {
        stockContainer.classList.remove(`${ID}-stockShow`);
        topDetails.classList.remove(`${ID}-expand`);
      } else {
        stockContainer.classList.add(`${ID}-stockShow`);
        topDetails.classList.add(`${ID}-expand`);
        events.send(`${ID} - 'Click check stock`);
      }
    });

  }

  const changeAppointmentBox = () => {
    const bookBox = document.querySelector('.book-appointments-section');
    const bookAppointment = document.createElement('div');
    bookAppointment.classList.add(`${ID}-booking`);
    bookAppointment.innerHTML =
      `<h3>${window.innerWidth > 767 ? 'Need help from one of our experts?' : 'Need help?'}</h3>
        <p>Book a free online virtual appointment with one of our friendly experts.</p>
        <div class="${ID}-bookButtons"></div>`;

    document.querySelector('.detail-page__right-column').appendChild(bookAppointment);

    //bookBox.insertAdjacentElement('beforebegin', bookAppointment);

    if (document.querySelector('.product-book-appointment')) {
      bookAppointment.querySelector(`.${ID}-bookButtons`).appendChild(bookBox.querySelector(`.product-book-appointment`));
    }
    if (document.querySelector('.product-virtual-appointment')) {
      bookAppointment.querySelector(`.${ID}-bookButtons`).appendChild(bookBox.querySelector(`.product-virtual-appointment`));
    }

  }

  // move offer text if exists
  const offertext = document.querySelector('.product-price-offer');
  
  if (offertext) {
    document.querySelector('.product-buy-now').insertAdjacentElement('afterend', offertext);
  }

  // move offer banner
  pollerLite(['.PDP-offer-test'], () => {
    const offerBanner = document.querySelector('.PDP-offer-test');
    document.querySelector('.product-buy-now').insertAdjacentElement('afterend', offerBanner);
  });
  


  addNewContent();
  checkStock();
  
  if(document.querySelector('collect-in-store')) {
    stockCheck();
  }

  financeChanges();
  if (document.querySelector('.product-virtual-appointment') || document.querySelector('.product-book-appointment') ) {
    changeAppointmentBox();
  }
}