/*
* General DOM Manipulation
*/

import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

export default () => {

    const { ID } = shared;

    const prodSku = window.digitalData.product[0].productInfo.productID;
    const reviewNo = window.digitalData.product[0].productInfo.ratingCount;

    const productSlider = document.querySelector('.product-gallery__main');
   
    // add review stars and item number to the top
    const topBar = `
    <div class="${ID}-topRow">
        <div class="reviewStars"></div>
        <div class="prodItem">Item #${prodSku}</div>
    </div>`;

    productSlider.insertAdjacentHTML('beforebegin', topBar);

    const reviewStars = document.querySelector('.detail-page__right-column .product-customer-rating-summary');
    if(reviewStars) {
        document.querySelector('.reviewStars').appendChild(reviewStars);
        document.querySelector('.product-customer-rating-summary__text').textContent = `(${reviewNo})`;
    }

    // see similiar and try it on features
    const productPageFeatures = () => {
         // add more like this
        if(document.querySelector('.product-gallery__syte')) {
            const moreLikeThis = `<div class="${ID}-tryRow"><div class="${ID}-more">View more like this</div></div>`;
            document.querySelector('.product-gallery__main-container').insertAdjacentHTML('afterbegin', moreLikeThis);
            
            document.querySelector(`.${ID}-more`).addEventListener('click', () => {
                document.querySelector('.syte-discovery').click();
            });
        }

        // try it on
        pollerLite(['.tangiblee-button'], () => {
          document.querySelector(`.${ID}-tryRow`).insertAdjacentHTML('beforeend', `<div class="${ID}-tangiblee">See it on!</div>`);

          document.querySelector(`.${ID}-tangiblee`).addEventListener('click', () => {
              document.querySelector('.tangiblee-button').click();
          });
        });
    }

    // add out of stock button
    const OOSButton = () => {
      const oosButton = `<div class="${ID}-outOfStock">Out of stock</div>`;

      if(window.digitalData.product[0].productInfo.stock === 'no') {
        document.querySelector('.product-stock').insertAdjacentHTML('afterend', oosButton);
      }
    }
   
    /* Store check styling */
    const stockCheck = () => {
         const storeCheck = document.querySelector('collect-in-store');

        if(storeCheck) {
          const stockContainer = document.createElement('div');
          stockContainer.classList.add(`${ID}-stockCheck`);
          stockContainer.innerHTML = `
              <div class="${ID}-stockToggle">
                <span></span><p>Store availability</p>
              </div>
              <div class="${ID}-stockBox"></div>`;
      
          stockContainer.querySelector(`.${ID}-stockBox`).appendChild(storeCheck);
      
          document.querySelector('#basketForm').insertAdjacentElement('afterend', stockContainer);
      
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

    /* Finance styling */
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

              // change styling of IFC
                ifc.shadowRoot.querySelector('.finance-options').style = "background: transparent; padding:0px;";
                ifc.shadowRoot.querySelector('p small').style = "display: inline; font-size: 13px; font-weight: 500;";
                ifc.shadowRoot.querySelector('p').style = "display: inline-block; font-size: 13px; font-weight: 500;";
                ifc.shadowRoot.querySelector('br').style = "display: none";

                ifc.shadowRoot.querySelector('.finance-options__button').style = "margin-top: 0px;";

                const allBold = ifc.shadowRoot.querySelectorAll('strong');
                for (let index = 0; index < allBold.length; index += 1) {
                  const element = allBold[index];
                  element.style = "font-weight: 500";
                }
               

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

    const addCarouselTitle = () => {
      
      const addTitle = (content, el) => {
        const title = `<h3>${content}</h3>`;
        el.insertAdjacentHTML('afterbegin', title);

      }

      pollerLite(['.product-recommendation-tabs__tab-content[tabindex="0"]'], () => {
        addTitle('View more like this', document.querySelector('.product-recommendation-tabs__tab-content[tabindex="0"]'));
      });

      pollerLite(['.product-recommendation-tabs__tab-content[tabindex="-1"]'], () => {
        addTitle('Recently Viewed', document.querySelector('.product-recommendation-tabs__tab-content[tabindex="-1"]'));
      });
    }

    /* Fixed carousel */
    const fixedCarousel = () => {
      function offset(elt) {
        var rect = elt.getBoundingClientRect(), bodyElt = document.body;
        return {
          top: rect.top + bodyElt .scrollTop,
          left: rect.left + bodyElt .scrollLeft
        }
      }


      const sidebar = document.querySelector(".product-gallery__main");
      const footer = document.querySelector(".detail-page__product-accordion-container");
      const top = offset(sidebar).top;
      const footTop = offset(footer).top;
      const maxY = footTop - sidebar.offsetHeight

      window.addEventListener("scroll", function(){
        let y = document.scrollingElement.scrollTop;
        if (y > top) {
          if (y < maxY) {
            sidebar.classList.add("stick")
            sidebar.removeAttribute('style');
          } else {
            sidebar.classList.remove("stick")
            //sidebar.setAttribute('style', 'position: absolute; top: '+(maxY - top)+'px');
          }
        } else {
          sidebar.classList.remove("stick")
        }
      })

    }

    stockCheck();
    financeChanges();
    productPageFeatures();
    OOSButton();
    addCarouselTitle();

    // if(window.innerWidth >= 1280) {
    //   fixedCarousel();
    // }
    
}