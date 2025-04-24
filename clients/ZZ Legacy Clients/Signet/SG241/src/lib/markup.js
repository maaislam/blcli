import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";
import { productData } from "./data";
import { closeCarousel, getWarranty, openCarousel, SwitchTab } from "./helpers";

const { ID, VARIATION } = shared;

export default class Markup {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    //const product = window.digitalData.product[0];
    const sku = document.querySelector(".js-product-variant-code").value;
    const prodData = productData[sku];
    const brand = prodData.brand;
    const productName = document.querySelector(".product-detail__name").innerText;

    

    const element = document.createElement("div");
    element.classList.add(`${ID}-pdp`);
    element.innerHTML = `
            <div class="${ID}-offer-banner"><p><b>Complimentary gift</b> - receive a free watch winder with this watch.</p><a class="${ID}__textLink" href="#" target="_blank">Learn more</a></div>
            <section class="${ID}-top">
                <div class="${ID}__row">
                <div class="${ID}__col-left ${ID}-mainProductSlider">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                        </div>
                    </div>
                    <div class="${ID}-swiperNext swiper-button-next"></div>
                    <div class="${ID}-swiperPrev swiper-button-prev"></div>
                    <div class="${ID}-pagination swiper-pagination"></div>

                <div class="${ID}-productActions"></div>
                </div>
                <div class="${ID}__col-right ${ID}__mainProductInfo">
                    <div class="${ID}-product-name">
                        <h4 class="alternate">${brand}</h4>
                        <h4>${productName.replace(/(Omega|Breitling|Tag\sHeuer)/g, "")}</h4>
                    </div>
                    <div class="${ID}-reviews">
                        <div class="${ID}-usp" usp-attr="reviews"></a></div>
                    </div>
                    <div class="${ID}-small-description">
                        <p>${prodData.introCopy}</p>
                    </div>
                    <div class="${ID}-productPrice">
                        <div class="${ID}-finance"></div>
                    </div>
                    <div class="${ID}-stockCheck">
                        <div class="${ID}-stockToggle">
                            <span></span><div class="${ID}__textLink">Check stock in your local store</div>
                        </div>
                    </div>
                    <div class="${ID}-uspDetails">
                        <div class="${ID}-usp ${ID}-returns" usp-attr="returns"><span></span><p>Free returns & exchanges.</p><div class="${ID}__textLink">Learn more</div></div>
                        <div class="${ID}-usp ${ID}-warranty"><span></span><p>${getWarranty()} year warranty.</p></div>
                        <div class="${ID}-usp ${ID}-delivery" usp-attr="delivery"><span></span><p>Free express delivery.</p><div class="${ID}__textLink">Delivery info</div></div>
                        <div class="${ID}-usp ${ID}-clickCollect" usp-attr="clickcollect"><span></span><p>Free click & collect.</p><div class="${ID}__textLink">Learn more</div></div>
                    </div>
                </div>
            </div>
            </section>
            <section class="${ID}-features">
                <div class="${ID}__sectionContainer">
                    <div class="${ID}-circles">
                        <div class="${ID}-circle" slide-target="1">
                            <div class="${ID}-icon" style="background-image:url(${prodData.featureOneImg})">
                                <div class="${ID}-loader">
                                    <svg viewbox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40"/>
                                    </svg>
                                </div>
                            </div>
                            <p>${prodData.featureOneTitle}</p>
                        </div>
                        <div class="${ID}-circle" slide-target="2">
                            <div class="${ID}-icon" style="background-image:url(${prodData.featureTwoImg})">
                                <div class="${ID}-loader">
                                    <svg viewbox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40"/>
                                    </svg>
                                </div>
                            </div>
                            <p>${prodData.featureTwoTitle}</p>
                        </div>
                        <div class="${ID}-circle" slide-target="3">
                            <div class="${ID}-icon" style="background-image:url(${prodData.featureThreeImg})">
                                <div class="${ID}-loader">
                                    <svg viewbox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40"/>
                                    </svg>
                                </div>
                            </div>
                            <p>${prodData.featureThreeTitle}</p>
                        </div>
                        ${
                          prodData.featureFourTitle
                            ? `
                        <div class="${ID}-circle" slide-target="4">
                            <div class="${ID}-icon" style="background-image:url(${prodData.featureFourImg})">
                                <div class="${ID}-loader">
                                    <svg viewbox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40"/>
                                    </svg>
                                </div>
                            </div>
                            <p>${prodData.featureFourTitle}</p>
                        </div>`
                            : ""
                        }
                    </div>
                    <div class="${ID}-carouselModal">
                        <div class="${ID}-close"></div>
                        <div class="${ID}-modalInner ${ID}-swiper">
                            <div class="${ID}-topBar">
                                <div class="${ID}-progessPagination swiper-pagination"></div>
                                <div class="${ID}-socialTitle"></div>
                            </div>
                            <div class="swiper-wrapper">
                                <div class="${ID}-slide swiper-slide" slide-no="1">
                                    <div class="${ID}-textBlock">
                                        <h2>${prodData.featureOneTitle}</h2>
                                        <p>${prodData.featureOneContent}</p>
                                    </div>
                                    <div class="${ID}-image">
                                    <div class="${ID}-imgbg" style="background-image:url(${prodData.featureOneImg})"></div>
                                    </div>
                                </div>
                                <div class="${ID}-slide swiper-slide" slide-no="2">
                                    <div class="${ID}-textBlock">
                                        <h2>${prodData.featureTwoTitle}</h2>
                                        <p>${prodData.featureTwoContent}</p>
                                    </div>
                                    <div class="${ID}-image">
                                        <div class="${ID}-imgbg" style="background-image:url(${prodData.featureTwoImg})"></div>
                                    </div>
                                </div>
                                <div class="${ID}-slide swiper-slide" slide-no="3">
                                    <div class="${ID}-textBlock">
                                        <h2>${prodData.featureThreeTitle}</h2>
                                        <p>${prodData.featureThreeContent}</p>
                                    </div>
                                    <div class="${ID}-image">
                                    <div class="${ID}-imgbg" style="background-image:url(${prodData.featureThreeImg})"></div>
                                    </div>
                                </div>
                                ${
                                  prodData.featureFourTitle
                                    ? `
                                <div class="${ID}-slide swiper-slide" slide-no="4">
                                    <div class="${ID}-textBlock">
                                        <h2>${prodData.featureFourTitle}</h2>
                                        <p>${prodData.featureFourContent}</p>
                                    </div>
                                    <div class="${ID}-image">
                                        <div class="${ID}-imgbg" style="background-image:url(${prodData.featureFourImg})"></div>
                                    </div>
                                </div>
                                `
                                    : ""
                                }
                            </div>
                            <div class="${ID}-swiperNext swiper-button-next"></div>
                            <div class="${ID}-swiperPrev swiper-button-prev"></div>
                        </div>
                    </div>
                </div>
            
            </section>

            ${
              VARIATION === "1"
                ? `
            <section class="${ID}-detail-blocks">
                <div class="${ID}__row">
                    <div class="${ID}-block">
                        <div class="${ID}-image" style="background-image:url(${prodData.detailsImg})"></div>
                        <div class="${ID}-textBlock">
                            <div class="inner">
                                <h2>Product details</h2>
                                <p>Product number: ${Object.keys(productData)[0]}</p>
                                <p>${prodData.detailsContent}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="${ID}__row">
                    <div class="${ID}-block">
                        <div class="${ID}-image" style="background-image:url(${prodData.brandImg})"></div>
                        <div class="${ID}-textBlock">
                            <div class="inner">
                                <h2>${brand}</h2>
                                <p>${prodData.brandContent}</p>
                            </div>
                        </div>
                    </div>
                </div>                          
            </section>`
                : ""
            }
            <section class="${ID}-specifications ${prodData.isHorizontal === "n" ? "vertical" : "horizontal"}">
                <div class="${ID}__sectionContainer">
                    <div class="${ID}__headingText">
                        <h2>Watch specifications</h2>
                        <p>${prodData.specsContent}</p>
                    </div>
                    
                    <div class="${ID}__row">
                        <div class="${ID}-specImage" style="background-image:url(${prodData.specsImg})">
                            <div class="${ID}-specBadge" tab-target="movement">Movement</div>
                            <div class="${ID}-specBadge" tab-target="dial">Dial</div> 
                            <div class="${ID}-specBadge" tab-target="strap">Strap</div> 
                        </div>
                        <div class="${ID}-specs">
                            <div class="${ID}-tabs">
                                <div class="${ID}-tab active" tab-target="model"><span>Model</span></div>
                                <div class="${ID}-tab" tab-target="movement"><span>Movement</span></div>
                                <div class="${ID}-tab" tab-target="dial"><span>Dial</span></div>
                                <div class="${ID}-tab" tab-target="strap"><span>Strap</span></div>
                            </div>
                            <div class="${ID}-tabContents">
                                <div class="${ID}-tabContent active" data="model"></div>
                                <div class="${ID}-tabContent" data="movement"></div>
                                <div class="${ID}-tabContent" data="dial"></div>
                                <div class="${ID}-tabContent" data="strap"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="${ID}-concierge">
                <div class="${ID}__sectionContainer">
                    <div class="${ID}__row">
                        <div class="${ID}-image"></div>
                        <div class="${ID}-textBlock">
                            <div class="inner">
                                <h2>Concierge service</h2>
                                <p>From finding the right watch for your wrist size to selecting the perfect gift for a special occasion, our concierges are here to provide expert advice and outstanding customer service. Whether you're looking for information on the latest watch trends or need help choosing the right watch for your lifestyle, our concierge service is here to help.</p>
                                <div class="${ID}-ctas">
                                    <a href="/bookAppointment" class="${ID}__button primary">Book now</a>
                                    <a href="/live-chat" class="${ID}__button secondary">Talk to an expert</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="${ID}-fullwidth-banner" style="background-image:url(${prodData.fullWidthBanner})">
            </section>
            ${prodData.packageImg
                ? `
            <section class="${ID}-packaging">
                <div class="${ID}__sectionContainer">
                    <div class="${ID}__row">
                        <div class="${ID}-image"style="background-image:url(${prodData.packageImg})"></div>
                        <div class="${ID}-textBlock">
                            <div class="inner">
                                <h2>Bespoke packaging</h2>
                                <p>${prodData.packageContent}</p>
                                <a href="${prodData.link}" class="${ID}__button secondary">Learn more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`
                : ""
            }
            ${
              VARIATION === "1"
                ? `
            <section class="${ID}-adjustment">
                <div class="${ID}__sectionContainer">
                    <div class="${ID}__row">
                        <div class="${ID}-image"></div>
                        <div class="${ID}-textBlock">
                             <div class="inner">
                                <h2>Complementary adjustment</h2>
                                <p>At Ernest Jones, we appreciate that a watch is more than just a timepiece, it is an extension of your personal style. That's why we provide a complementary adjustment service on all of our watches.</p>
                                <a href="/bookAppointment" class="${ID}__button secondary">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`
                : ""
            }
            <section class="${ID}-recommendations">
                <div class="${ID}__sectionContainer">
                    <div class="${ID}-recProducts"></div>
                </div>
            </section>
            <div class="${ID}-overlay"></div>
            <div class="${ID}-slideOutTab">
                <div class="${ID}-close"></div>
                <div class="${ID}-inner delivery">
                    <h2 class="alternate">Delivery</h2>
                    <div class="${ID}-content">
                        <h4 class="alternate">Delivery</h4>
                        <p class="date"></p>
                        <div class="${ID}-deliveryCharges">
                            <p>Free Standard delivery - we aim to deliver within 2-5 working days, Monday to Saturday.</p>
                            <p>Express delivery - Free on orders over £100 or £5. Order by 7pm Monday - Friday for delivery the following day.</p>
                        </div>
                    </div>
                    <a href="/delivery" class="${ID}__button secondary">More information</a>
                </div>
                <div class="${ID}-inner returns">
                <h2 class="alternate">Returns</h2>
                <div class="${ID}-content">
                    <h4 class="alternate">Returning online purchases</h4>
                    <p>If you've changed your mind about keeping your purchase, please return it in its original condition we'll exchange or refund it.</p>
                    <p>You can return items to us by post free of charge within 30 days via Royal Mail and you will be refunded to the payment method you used to place the order.</p>
                </div>
                <div class="${ID}-content">
                    <h4 class="alternate">Variation to refund policy for items purchased with clearpay</h4>
                    <p>We are unable to issue refunds in store where Clearpay was used as payment online. If you have changed your mind, you can return your Clearpay purchase free of charge by post for a refund via <a class="${ID}__textLink" href="https://www.royalmail.com/track-my-return#/details/1806" target="_blank">Royal Mail Website<a/></p>
                </div>
                <div class="${ID}-content">
                    <h4 class="alternate">Return to a UK store</h4>
                    <p>This is the quickest way to return items. You can also exchange any unwanted items at your local store.</p>
                </div>
                <a href="/refunds" class="${ID}__button secondary">More information</a>
            </div>
                <div class="${ID}-inner clickcollect">
                    <h2 class="alternate">Click & collect</h2>
                    <div class="${ID}-content">
                        <h4 class="alternate">Free Click & collect</h4>
                        <p>We offer free click & collect to stores across the UK (excludes stores in Eire or the Channel Islands). Delivery times vary depending on the store you select.</p>
                        <p>You will be provided with estimated delivery dates for stores near you when you select your delivery option in checkout. In general, your order will be ready for collection between 4 and 8 working days. We will email you when your order has been processed and again when your order has been despatched ready for collection.</p>
                    </div>
                    <a href="/delivery" class="${ID}__button secondary">More information</a>
                </div>
                <div class="${ID}-inner reviews">
                    <h2 class="alternate">Reviews</h2>
                    <div class="${ID}-content"></div>
                </div>
            </div>

      `;
    this.component = element;

    // add to bag button
    element.querySelector(`.${ID}-productPrice`).insertAdjacentElement("afterend", document.querySelector(".product-detail__add-to-cart"));
    element.querySelector(".product-detail__add-to-cart button").removeAttribute("disabled");

    // move price
    element.querySelector(`.${ID}-productPrice`).insertAdjacentElement("afterbegin", document.querySelector(".product-detail__container--right .product-price"));

    // move reviews
    if (document.querySelector(".product-detail__reviews")) {
      element.querySelector(`.${ID}-reviews .${ID}-usp`).insertAdjacentElement("afterbegin", document.querySelector(".product-detail__reviews"));
    }
    // Finance
    pollerLite([".fin-calc-pdp-section", "#ifcPerMonthAmt"], () => {
      const ifc = document.querySelector(".fin-calc-pdp-section");
      element.querySelector(`.${ID}-finance`).appendChild(ifc);
    });

    // Recommended
    pollerLite(['#productRecommendationId'], () => {
        element.querySelector(`.${ID}-recProducts`).appendChild(document.querySelector('#productRecommendationId'));
    });

    // Reviews
    pollerLite(['#pdp-accordion-reviews'], () => {
        element.querySelector(`.${ID}-inner.reviews .${ID}-content`).appendChild(document.querySelector('#pdp-accordion-reviews'));
    });
  }

  bindEvents() {
    const { component } = this;

    // stock
    const stock = component.querySelector(`.${ID}-stockCheck`);
    stock.addEventListener("click", () => {
      document.querySelector(".store-pickup__collapse--cta").click();
    });

    // tangiblee
    pollerLite([".product-gallery__links.js-gallery-links .js-product-tangiblee"], () => {
      const tangiblee = `<div class="${ID}-tangiblee-button"></div>`;
      component.querySelector(`.${ID}-productActions`).insertAdjacentHTML("beforeend", tangiblee);

      component.querySelector(`.${ID}-tangiblee-button`).appendChild(document.querySelector('.product-gallery__links.js-gallery-links'));

      component.querySelector(`.${ID}-tangiblee-button`).addEventListener("click", () => {
        document.querySelector(".js-product-tangiblee").click();
      });
    });

    //Move similar
    pollerLite([".shop-similar-pdp-conatiner"], () => {
      const syte = `<div class="${ID}-syte-button"><span></span>Shop similar</div>`;
      component.querySelector(`.${ID}-productActions`).insertAdjacentHTML("beforeend", syte);

      component.querySelector(`.${ID}-syte-button`).addEventListener("click", () => {
        document.querySelector(".js-gallery-similar").click();
      });
    });

    // on click of each circle
    const allCircles = component.querySelectorAll(`.${ID}-circle`);
    if (allCircles) {
      for (let index = 0; index < allCircles.length; index++) {
        const element = allCircles[index];
        element.addEventListener("click", (e) => {
          const elNo = element.getAttribute("slide-target");
          openCarousel(elNo, e.currentTarget);
        });
      }
    }

    if (component.querySelector(`.${ID}-carouselModal .${ID}-close`)) {
      component.querySelector(`.${ID}-carouselModal .${ID}-close`).addEventListener("click", () => {
        closeCarousel();
      });
    }

    // Tabs
    const tabs = component.querySelectorAll(`.${ID}-tab`);
    if (tabs) {
      for (let index = 0; index < tabs.length; index += 1) {
        const element = tabs[index];

        element.addEventListener("click", (e) => {
          const matchingTab = e.currentTarget.getAttribute("tab-target");
          SwitchTab(e.currentTarget, document.querySelector(`.${ID}-tabContent[data="${matchingTab}"]`));
        });
      }
    }

    // Spec badges
    const specBadges = component.querySelectorAll(`.${ID}-specBadge`);
    if (specBadges) {
      for (let index = 0; index < specBadges.length; index += 1) {
        const element = specBadges[index];

        element.addEventListener("click", (e) => {
          const matchingTab = e.currentTarget.getAttribute("tab-target");
          SwitchTab(e.currentTarget, document.querySelector(`.${ID}-tabContent[data="${matchingTab}"]`));
        });
      }
    }
  }

  render() {
    const { component } = this;
    document.querySelector(".product-detail").insertAdjacentElement("beforebegin", component);
  }
}
