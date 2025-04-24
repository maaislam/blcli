import shared from "../../../../../core-files/shared"
import { pollerLite } from "../../../../../lib/utils";



const { ID, VARIATION } = shared;


export default class Markup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

    // Remove brand name from product name
    const brandNamesToReplace = [
      "Arctic Light",
      "Alpina",
      "Baume & Mercier",
      "Bell & Ross",
      "Breitling",
      "Bremont",
      "Bulova",
      "Olivia Burton",
      "Gucci",
      "Closer Together",
      "DKNY",
      "Ebel",
      "Eternal Diamond",
      "Emporio Armani",
      "CARAT*",
      "Cartier",
      "Casio",
      "Certina",
      "Chanel",
      "Citizen",
      "Coach",
      "Cross",
      "Chopard",
      "Marco Bicego",
      "Lauren Ralph Lauren",
      "Michael Kors",
      "Le Vian",
      "Fossil",
      "Frederique Constant",
      "Garmin",
      "Gc",
      "Glashütte Origina",
      "Gucci",
      "Hamilton",
      "Hugo Boss",
      "Jean Pierre",
      "Maurice Lacroix",
      "Movado",
      "MVMT",
      "Montblanc",
      "Longines",
      "Omega",
      "Rado",
      "Raymond Weil",
      "Rebecca Minkoff",
      "Rotary",
      "Royal Selangor",
      "Lucy Quartermaine",
      "Neil Lane",
      "Seiko",
      "Skagen",
      "TAG Heuer",
      "Ted Baker",
      "The Diamond Story",
      "Timex",
      "Tissot",
      "Tolkowsky",
      "Tudor",
      "TW Steel",
      "Simon Carter",
      "Serena Williams",
      "Swarovski",
      "Shy Creation",
      "Sif Jakobs",
      "TAG Heuer",
      "Thomas Sabo",
      'Versace',
      'Vivienne Westwood',
      'Widdop & Bingham',
      'Zenith',
      "Vera Wang",
      "WOLF",
      "Yoko London",
    ];
    const names = window.digitalData.product[0].productInfo.productName;
    const productName = names.replace(new RegExp(brandNamesToReplace.join("|"), "g"), "");

    const product = window.digitalData.product[0];
    const brand = product.productInfo.brand;
    const currentPrice = window.digitalData.product[0].price.currentPrice;
    const wasPrice = document.querySelector(".product-price--history s");
    const introDescription = document.querySelector(".s-product-description-markdown").textContent.match(/^(.*?)[.?!]\s/)[0];
    const reviewAmount = window.digitalData.product[0].productInfo.ratingCount;
   
      const element = document.createElement('div');
      element.classList.add(`${ID}-landing-pdp`);
      element.innerHTML = `
      <section class="${ID}-top">
      <div class="${ID}-row">
         <div class="${ID}-col-left">
            <div class="${ID}-mainProductSlider">
               <div class="swiper-container">
                  <div class="swiper-wrapper">
                  </div>
                  <div class="${ID}-swiperPagination swiper-pagination"></div>
               </div>
               <div class="${ID}-swiperNext swiper-button-next"></div>
               <div class="${ID}-swiperPrev swiper-button-prev"></div>
            </div>
         </div>
      
        <div class="${ID}-col-right">
          <div class="${ID}-mainProductInfo">
          <div class="${ID}-product-name">
              <h4 class="alternate">${brand}</h4>
              <h4>${productName.replace(/(Omega|Breitling|Tag\sHeuer)/g, "")}</h4>
          </div>
          <div class="${ID}-reviews">
              <div class="${ID}-usp" usp-attr="reviews">
                <div class="${ID}-reviewCount"></div>
              </div>
            </div>
              <div class="${ID}-small-description">
                <p>${introDescription}</p>
              </div>
              <div class="${ID}-productPricing">
                <div class="${ID}-price">
                  ${
                    document.querySelector(".product-price-history")
                    ? `<span class="${ID}-nowPrice">£${currentPrice}</span>
                      <span class="${ID}-wasPrice">${wasPrice.textContent}</span>`
                    : `<span class="${ID}-normalPrice">£${currentPrice}</span>`
                  }
                </div>
                <div class="${ID}-finance"></div>
              </div>
              <div class="${ID}-addSection"></div>
          </div>
  
        </div>
      </div>
   </section>`;
      this.component = element;

      
      element.querySelector(`.${ID}-addSection`).insertAdjacentElement("afterbegin", document.querySelector("#basketForm"));

      if (document.querySelector(".product-customer-rating-summary")) {
        element.querySelector(`.${ID}-top .${ID}-reviews`).appendChild(document.querySelector(".product-customer-rating-summary"));
        element.querySelector(".product-customer-rating-summary__text").textContent = `(${reviewAmount})`;
      }

      pollerLite([".product-gallery__syte.js-syte-functionality"], () => {
        element.querySelector(`.${ID}-mainProductSlider`).appendChild(document.querySelector(".product-gallery__syte.js-syte-functionality"));
      });
    }
  
    bindEvents() {
      const { component } = this;

      pollerLite(['.tangiblee-button'], () => {
        component.querySelector(`.${ID}-mainProductSlider`).appendChild(document.querySelector('.tangiblee-button'));
        document.querySelector('.tangiblee-button').removeAttribute('style');
        document.querySelector('.tangiblee-button span').removeAttribute('style');
      });


    }
  
    render() {
      const { component } = this;
      document.querySelector('#access-content').insertAdjacentElement('beforebegin', component);


      if(document.querySelector('.product-step-up-down')) {
        document.querySelector('#basketForm').insertAdjacentElement('afterbegin', document.querySelector('.product-step-up-down'));
      }
    }
  }