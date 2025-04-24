/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events, pollerLite } from '../../../../../lib/utils';
import shared from './shared';
import PageMarkup from './markup';
import buySection from './buySection';
import carousel from './carousel';
import specifications from './specifications';
import otherRings from './otherRings';
import ProductReviews from './reviews';
import buyingGuides from './buyingGuides';
import smoothScroll from './smoothScroll';

const { ID, VARIATION } = shared;
 
export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    if (window.hj){

      hj('event', 'SG119_Shown');
      
    }

     // Add booking section
    const bookAppointmentBanner = () => {
      const adviceBanner = document.createElement('div');
      adviceBanner.classList.add(`${ID}-liveChatBanner`);     
      adviceBanner.innerHTML = `
      <div class="${ID}-mobileImage" style="background-image: url(https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/70416AE464F3F66FA4E7E0170282C490A6E001726D2DDC6C1B08E1F5C2ECEF38.jpg?meta=/SG101---Live-Advice-Popup-Eng-New/store.jpg)"></div>
      <div class="${ID}-innerText">
        <h3>Talk to our Engagement Ring Experts</h3>
        <p>Have a question about one of our engagement rings? Want to speak with one of our specialist members of staff to discuss your requirements in detail? Book an appointment, at your convenience, today</p>
        <a class="${ID}-button ${ID}-black" href="https://customer.bookingbug.com/?client=ernest_jones&service=48321&company=37397">Book now</a>
      </div>`;

      document.querySelector(`.${ID}-booking`).appendChild(adviceBanner);
    }

    const addStoreTextEternal = () => {
      var shadow_dom = document.querySelector('collect-in-store').shadowRoot;
      var stockTitle = shadow_dom.querySelector('.cis .cis-section-title');

      stockTitle.insertAdjacentHTML('afterend', `      <p style="
    width: 100%;
    /* display: inline-block; */
    align-content: start;
    text-align: left;
    font-size: 13px;
          "><strong>Please Note:</strong> Eternal Diamond is available in limited stores. Contact your local store, or Live Chat to check availability</p>`);
    
    }



    new PageMarkup();
    buySection();
    carousel();
    specifications();
    bookAppointmentBanner();
    buyingGuides();

    if (window.digitalData.product[0].productInfo.masterSku.match(/(1560778|1560891|1561049|1561219|1561340|1558684|1558994|1559370|1559699|1559982|1561472|1561618|1561731|1560220|1560506|1560646|1561863|1562002|1562142|1562274|1562401|1562533|1562932|1563068|1563289|1562665|1562800|1563459|1563661|1563807)/)) {
      addStoreTextEternal();
    }
    if(document.querySelector('.product-customer-rating-summary__text')) {
      new ProductReviews();
    } 
   
    smoothScroll();

    /* Store check styling */
    const stockCheck = () => {
      const storeCheck = document.querySelector('collect-in-store');

      if(storeCheck) {
        const stockContainer = document.createElement('div');
        stockContainer.classList.add(`${ID}-stockCheck`);
        stockContainer.innerHTML = `
            <div class="${ID}-stockToggle">
              <span></span><p>Check store stock</p>
            </div>
            <div class="${ID}-stockBox"></div>`;
    
        stockContainer.querySelector(`.${ID}-stockBox`).appendChild(storeCheck);
    
        document.querySelector('#basketForm').insertAdjacentElement('afterend', stockContainer);
    
        // change styling of shadow root on the stock
        const stockStyle = document.createElement('style');
        stockStyle.innerHTML = `
              .cis { background: #ffffff; } 
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
                font-family: inherit;
              }
              .cis-bottom-wrapper__title {
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
                font-family: inherit;
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

          } else {
            stockContainer.classList.add(`${ID}-stockShow`);
          }
        });
      }
    }

    stockCheck();


   // pollerLite(['#similar_items-syte-slider-mw'], () => {
    // otherRings();
   // });
    
    

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
