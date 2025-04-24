import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";
import { closeSlideTab, openSlideTab, productCarousel, scrollToElement, stockRestyle } from "./helpers";

const { ID } = shared;

export default class Markup {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const elName = document.querySelector(".product-name").textContent;
    const firstSentence = /^.*?[\.!\?](?:\s|$)/;
    const introDescription = document.querySelector(".product-description p:not(.product-description__long)").textContent.match(firstSentence)[0];
    const deliveryDate = document.querySelector("#js-update-delivery");
    const currentPrice = window.digitalData.product[0].price.currentPrice;
    const wasPrice = document.querySelector(".product-price--history s");

    const element = document.createElement("div");
    element.className = `${ID}-PDP`;
    element.innerHTML = `
      <section class="${ID}-top">
          <div class="${ID}__row">
          <div class="${ID}__col-left ${ID}-mainProductSlider">
              <div class="swiper-container">
                  <div class="swiper-wrapper"></div>
              </div>
              <div class="${ID}-swiperNext swiper-button-next"></div>
              <div class="${ID}-swiperPrev swiper-button-prev"></div>
              <div class="${ID}-swiperPagination swiper-pagination"></div>
          </div>
          <div class="${ID}__col-right ${ID}__mainProductInfo">
              <div class="${ID}-product">
                  <h2 class="${ID}-productname">${elName}</h2>
              </div>
              <div class="${ID}-reviews">
              </div>
              <div class="${ID}-productPrice">
                  <div class="${ID}-price">
                    ${
                      document.querySelector(".product-price-history")
                        ? `<span class="${ID}-nowPrice">Now £${currentPrice}</span>
                    <span class="${ID}-wasPrice">Was ${wasPrice.textContent}</span>`
                        : `<span class="${ID}-normalPrice">£${currentPrice}</span>`
                    }
                  </div>
                  <div class="${ID}-financeBox">
                      <span>0% APR finance available</span>
                      <div class="${ID}-textLink">Learn More</div>
                  </div>
              </div>
              <div class="${ID}-small-description">
               <p>${introDescription}</p>
               <a class="${ID}-textLink">View full details</a>
              </div>
              <div class="${ID}-addSection"></div>
              <div class="${ID}__button secondary ${ID}-stockCTA">Check store stock</div>
              <div class="${ID}-uspDetails">
                  <div class="${ID}-usp ${ID}-returns" usp-attr="delivery">
                    <span></span>
                      <p class="${ID}-bodyText">Free <a class="${ID}-textLink">delivery</a> & <a class="${ID}-textLink">returns.</a></p>
                  </div>
                  <div class="${ID}-usp ${ID}-pricePromise">
                      <span></span>
                       <p class="${ID}-bodyText">Price match promise.</p>
                        <a class="${ID}-textLink" target=_blank href="https://www.hsamuel.co.uk/webstore/price-promise/?icid=hs-hp-pricematch">Learn more</a>
                    </div>
                  <div class="${ID}-usp ${ID}-warranty"><span></span><p class="${ID}-bodyText">1 year guarantee. </p></div>
              </div>
          </div>
      </div>
      </section>
      <section class="${ID}-productDetails">
        <div class="${ID}__sectionContainer">
          <div class="${ID}-accordion">
            <div class="${ID}-accordionSection ${ID}-open" accordion-attr="details">
              <div class="${ID}-accordion-heading"><h3>Product details</h3></div>
              <div class="${ID}-accordion-content">
                    <div class="${ID}-inner"></div>
              </div>
            </div>
            <div class="${ID}-accordionSection" accordion-attr="features">
              <div class="${ID}-accordion-heading"><h3>Key features</h3></div>
              <div class="${ID}-accordion-content">
                <div class="${ID}-inner"></div>
              </div>
            </div>
            <div class="${ID}-accordionSection" accordion-attr="delivery">
              <div class="${ID}-accordion-heading"><h3>Delivery and returns</h3></div>
              <div class="${ID}-accordion-content">
                <div class="${ID}-inner">
                    <div class="${ID}-content">
                      <h3>Delivery</h3>
                      <p class="${ID}-bodyText">Get it as soon as <span>${deliveryDate.innerText}</span></p>
                      <div class="${ID}-deliveryCharges">
                          <p class="${ID}-bodyText">Free Standard delivery - we aim to deliver within 2-5 working days, Monday to Saturday.</p>
                          <p class="${ID}-bodyText">Express delivery - Free on orders over £40 or £4.95 Order by 6pm Monday - Friday for delivery the following day.</p>
                      </div>
                    </div>
                    <div class="${ID}-content">
                      <h3>Returns</h3>
                      <p class="${ID}-bodyText">If you’ve changed your mind about keeping your purchase, please return it in its original condition we’ll exchange or refund it.</p>
                      <p class="${ID}-bodyText">You can return items to us by post free of charge within 30 days via Royal Mail or you can return to a UK store and you will be refunded to the payment method you used to place the order.</p>
                    </div>
                    <div class="${ID}-content">
                      <h3>Click & collect</h3>
                      <p class="${ID}-bodyText">We offer free same day click & collect in most H.Samuel stores. Place your order online up until 3pm for same day collections. After 3pm the order will not be available for collection until the following day. When the order is ready for collection in the store, we will contact you by email.</p>
                    </div>
                    <a href="#" class="${ID}__button secondary">More information</a> 
                  </div> 
              </div>
            </div>
            <div class="${ID}-accordionSection" accordion-attr="giftwrap">
              <div class="${ID}-accordion-heading"><h3>Gift wrap and packaging</h3></div>
              <div class="${ID}-accordion-content">
                <div class="${ID}-inner">
                  <p class="${ID}-bodyText">Opening a beautifully wrapped gift is all the more special, that's why we offer a special gift wrapping service at H.Samuel.</p>
                  <p class="${ID}-bodyText">For <b>£3.50</b>, you can have your gift sent in a stylish box*. We'll also include a greetings card, personalised with your own message.</p>
                  <p class="${ID}-bodyText">If you would like us to package your gift, select "Gift wrap and personal message" on the Gift Options page before you continue to checkout.</p>
                  <p class="${ID}-bodyText">Gift packaging is charged once per order, regardless of how many items are in that order. Where possible, we'll wrap all your items together in one gift box.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="${ID}-appointment">
        <div class="${ID}__sectionContainer">
          <div class="${ID}__row">
            <div class="${ID}-image"></div>
              <div class="${ID}-textBlock">
                <div class="inner">
                    <h2>Talk to one of our experts</h2>
                    <p class="${ID}-bodyText">Our fantastic team of experts are on hand take the time to get to know you and understand your needs, so that they can help you find the perfect piece of jewellery.</p>
                    <div class="${ID}-ctas">
                        <a href="https://www.hsamuel.co.uk/webstore/content/appointment-booking/" class="${ID}__button primary">Book now</a>
                        <a href="https://www.hsamuel.co.uk/webstore/content/live-chat/" class="${ID}__button secondary">Talk to an expert</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
      </section>
      <section class="${ID}-recommendations">
          <div class="${ID}__sectionContainer">
              <div class="${ID}-recTop">
                <h3>More like this</h3>
                <div class="arrows">
                  <div class="${ID}-swiperNext swiper-button-next"></div>
                  <div class="${ID}-swiperPrev swiper-button-prev"></div>
                </div>
              </div>
              <div class="${ID}-recProducts ${ID}-swiper swiper">
                  <div class="swiper-wrapper"></div>
                  <div class="${ID}-swiperScroll swiper-scrollbar"></div>
              </div>
          </div>
      </section>
      <section class="${ID}-reviewSection">
      </section>
      <div class="${ID}-overlay"></div>
      <div class="${ID}-slideOutTab">
          <div class="${ID}-close"></div>
          <div class="${ID}-inner">
            <h2 class="alternate">Store checker</h2>
            <div class="${ID}-content">
              <p class="${ID}-bodyText">Check stock in your local store. We offer free click and collect as well as free delivery to your nearest store.</p>
              <div class="stock-check"></div>        
            </div>
          </div>
      </div>
    `;

    this.component = element;


    const reviewContainer = document.querySelector('.product-reviews');
    element.querySelector(`.${ID}-reviewSection`).appendChild(reviewContainer);

    if(window.digitalData.product[0].productInfo.ratingCount === '0') {
      reviewContainer.classList.add('no-reviews');
    }


    // add paypal credit usp
    pollerLite([".product-paypal-credit"], () => {
      const ppUSP = `
      <div class="${ID}-usp ${ID}-paypal">
        <span></span>
        <p class="${ID}-bodyText">Spread the cost with PayPal credit.  <a class="${ID}-textLink" target=_blank href="https://www.hsamuel.co.uk/webstore/static/customerservice/paypal-credit-faqs.cdo">Learn more</a></p>
      </div>`;

      element.querySelector(`.${ID}-usp.${ID}-returns`).insertAdjacentHTML('beforebegin', ppUSP);
    });


    // move add section
    const addSection = document.querySelector('.detail-page__payment-wrapper');
    element.querySelector(`.${ID}-addSection`).appendChild(addSection);

    pollerLite(["collect-in-store"], () => {
      const stockCheck = document.querySelector("collect-in-store");
      element.querySelector(`.${ID}-slideOutTab .stock-check`).appendChild(stockCheck);
      stockRestyle();
    });

    pollerLite([".tangiblee-button", '.tangiblee-button span'], () => {
      element.querySelector(`.${ID}-mainProductSlider`).appendChild(document.querySelector(".tangiblee-button"));
      document.querySelector(".tangiblee-button").removeAttribute("style");
      document.querySelector(".tangiblee-button span").removeAttribute("style");
      document.querySelector(".tangiblee-button span").textContent = "Try it on";

      window.addEventListener('resize', () => {
        document.querySelector(".tangiblee-button").removeAttribute("style");
        document.querySelector(".tangiblee-button span").removeAttribute("style");
        document.querySelector(".tangiblee-button span").textContent = "Try it on";
      })
    });

    pollerLite(['finance-options'], () => {
      const ifcButton =  document.querySelector('finance-options').shadowRoot.querySelector('.finance-options__button');
    
      if(element.querySelector(`.${ID}-financeBox`)) {
          document.body.appendChild(document.querySelector('finance-options'));
          element.querySelector(`.${ID}-financeBox`).addEventListener('click', () => {
              ifcButton.click();
          });
      }
    });

    // Move details to tabs
    const productDetails = document.querySelector(".product-description");
    element.querySelector(`.${ID}-accordionSection[accordion-attr="details"] .${ID}-accordion-content .${ID}-inner`).innerHTML = productDetails.innerHTML;

    // move specs
    const prodSpecs = document.querySelector(".product-specification");
    element.querySelector(`.${ID}-accordionSection[accordion-attr="features"] .${ID}-accordion-content .${ID}-inner`).innerHTML = prodSpecs.innerHTML;
    
  }

  bindEvents() {
    const { component } = this;

    component.querySelector(`.${ID}-stockCTA`).addEventListener("click", () => {
      openSlideTab();
      fireEvent('Clicked check store stock');
    });

    component.querySelector(`.${ID}-slideOutTab .${ID}-close`).addEventListener("click", () => {
      closeSlideTab();
    });
    component.querySelector(`.${ID}-overlay`).addEventListener("click", () => {
      closeSlideTab();
    });

    // Accordion
    const accItem = component.querySelectorAll(`.${ID}-accordionSection`);
    const accHeading = component.querySelectorAll(`.${ID}-accordion-heading`);

    for (let index = 0; index < accHeading.length; index += 1) {
        const el = accHeading[index];
        el.addEventListener('click', toggleItem, false);
    }

    function toggleItem() {
      
        const itemClass = this.parentNode.className;
        for (let i = 0; i < accItem.length; i += 1) {
            const accEl = accItem[i];
            accEl.className = `${ID}-accordionSection`;
        }

        if (itemClass == `${ID}-accordionSection`) {
            this.parentNode.className =  `${ID}-accordionSection ${ID}-open`;  
            setTimeout(() => {
              document.documentElement.scrollTop +=this.getBoundingClientRect().top
            }, 310)
            //document.documentElement.scrollTop +=this.getBoundingClientRect().top
            //this.scrollIntoView({behavior: 'smooth'});      
        }
    }

    component.querySelector(`.${ID}-usp.${ID}-returns`).addEventListener('click', () => {
      scrollToElement(document.querySelector(`.${ID}-accordionSection[accordion-attr="delivery"]`));
      if(!document.querySelector(`.${ID}-accordionSection[accordion-attr="delivery"]`).classList.contains(`${ID}-open`)) {
        document.querySelector(`.${ID}-accordionSection[accordion-attr="delivery"] .${ID}-accordion-heading`).click();
      }
    });

    component.querySelector(`.${ID}-small-description .${ID}-textLink`).addEventListener('click', () => {
      scrollToElement(document.querySelector(`.${ID}-accordionSection[accordion-attr="details"]`));
      if(!document.querySelector(`.${ID}-accordionSection[accordion-attr="details"]`).classList.contains(`${ID}-open`)) {
        document.querySelector(`.${ID}-accordionSection[accordion-attr="details"] .${ID}-accordion-heading`).click();
      }
    });
   


  }

  render() {
    const { component } = this;
    document.querySelector("#access-content").insertAdjacentElement("beforebegin", component);

    productCarousel();
  }
}
