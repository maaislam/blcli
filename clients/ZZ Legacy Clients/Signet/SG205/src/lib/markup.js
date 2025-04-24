import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";
import { openSlideTab } from "./helpers";

const { ID } = shared;

export default class Markup {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const brandName = window.digitalData.product[0].productInfo.brand;

    // Remove brand name from product name
    const brandNamesToReplace = [
      "Arctic Light",
      "Olivia Burton",
      "Gucci",
      "Closer Together",
      "BOSS",
      "Emporio Armani",
      "CARAT*",
      "Chopard",
      "Marco Bicego",
      "Lauren Ralph Lauren",
      "Michael Kors",
      "Le Vian",
      "Montblanc",
      "Lucy Quartermaine",
      "Neil Lane",
      "Simon Carter",
      "Serena Williams",
      "Swarovski",
      "Shy Creation",
      "Sif Jakobs",
      "Thomas Sabo",
      "Vera Wang",
      "WOLF",
      "Yoko London",
    ];
    const names = window.digitalData.product[0].productInfo.productName;
    const productName = names.replace(new RegExp(brandNamesToReplace.join("|"), "g"), "");
    const currentPrice = window.digitalData.product[0].price.currentPrice;
    const wasPrice = document.querySelector(".product-price--history s");
    const introDescription = document.querySelector(".s-product-description-markdown").textContent.match(/^(.*?)[.?!]\s/)[0];
    const reviewScore = window.digitalData.product[0].productInfo.rating;
    const reviewAmount = window.digitalData.product[0].productInfo.ratingCount;
    const productDescription = document.querySelector('.product-description');

    const element = document.createElement("div");
    element.className = `${ID}-pdp`;
    element.innerHTML = `
    <section class="${ID}-top">
      <div class="${ID}__row">
        <div class="${ID}__col-left ${ID}-mainProductSlider">
          <div class="swiper-container">
            <div class="swiper-wrapper"></div>
            <div class="${ID}-swiperPagination swiper-pagination"></div>
          </div>
        </div>
        <div class="${ID}__col-right ${ID}__mainProductInfo">
            <div class="${ID}-productSticky">
              <h4 class="alternate">${brandName}</h4>
              <h4>${productName.trim()}</h4>
              <div class="${ID}-reviews"></div>
              <div class="${ID}-pricing">
                  <div class="${ID}-price">
                  ${
                    document.querySelector(".product-price-history")
                      ? `<span class="${ID}-nowPrice">£${currentPrice}</span>
                        <span class="${ID}-wasPrice">${wasPrice.textContent}</span>`
                      : `<span class="${ID}-normalPrice">£${currentPrice}</span>`
                  }
                </div>
              </div>
              <div class="${ID}-finance"></div>
              <div class="${ID}-productIntro ${ID}-usp" usp-attr="details"><p>${introDescription}</p><a class="${ID}__textLink">View full details</a><a class="${ID}__textLink specs">View product specifications</a></div>
              <div class="${ID}-addSection"></div>
              <div class="${ID}-stockCheck"><a class="${ID}__textLink" detail-attr="stock">Check stock in your local store</a></div>
              <div class="${ID}-usps">
                  <h4 class="alternate">Shop with confidence</h4>
                  <div class="${ID}-usp ${ID}-returns" usp-attr="returns">
                    <span></span>
                    <p class="${ID}-bodyText">Free <a class="${ID}__textLink">delivery</a> & <a class="${ID}__textLink">returns.</a></p>
                  </div>
                  <div class="${ID}-usp ${ID}-features" usp-attr="features">
                    <span></span>
                    <p class="${ID}-bodyText"><a class="${ID}__textLink">View product specifications</a></p>
                  </div>
                  <div class="${ID}-usp ${ID}-clickcollect" usp-attr="returns">
                    <span></span>
                    <p class="${ID}-bodyText">Free <a class="${ID}__textLink">click and collect</a></p>
                  </div>
                  <div class="${ID}-usp ${ID}-tangiblee">
                    <span></span>
                    <p class="${ID}-bodyText">How will it look? <a class="${ID}__textLink">Try it on</a></p>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </section>

    
    <section class="${ID}-brandInfo">
        <div class="${ID}__sectionContainer">
            <div class="${ID}__row">
                <div class="${ID}-textBlock">
                    <div class="inner">
                        <h2>The details</h2>
                        <p>${productDescription.innerHTML}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="${ID}-appointment">
        <div class="${ID}__sectionContainer">
            <div class="${ID}__row">
                <div class="${ID}-textBlock">
                    <div class="inner">
                        <h2>Book an in-store appointment</h2>
                        <p>When you book an in-store appointment at Ernest jones, you can be sure that you'll receive a personalised shopping experience. Our fantastic team of experts will take the time to get to know you and understand your needs, so that they can help you find the perfect piece of jewellery.</p>
                        <div class="${ID}-ctas">
                            <a href="https://www.ernestjones.co.uk/webstore/in-store-appointment.cdo?icid=ej-fn-appointment" class="${ID}__button secondary">Book now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </section>
  <section class="${ID}-allReviewsBlock">
    <div class="${ID}__sectionContainer">
      <h2>Reviews</h2>
      <div class="${ID}-reviewSummary">
      ${window.digitalData.product[0].productInfo.rating !== '0' ? `
          <div class="${ID}-reviewCount">
            <div class="${ID}-amount"><span></span><h2>${reviewScore}</h2></div>
            <p>Based on ${reviewAmount} reviews</p>
          </div>
        ` : ''} 
          <a href="#" class="${ID}__button secondary">Write a review</a>
      </div>
      <div class="${ID}-allReviews"></div>
    </div>
  </div>
    `;
    this.component = element;

    element.querySelector(`.${ID}-addSection`).insertAdjacentElement("afterend", document.querySelector("#basketForm"));

    // Reviews
    if (document.querySelector(".product-customer-rating-summary")) {
      element.querySelector(`.${ID}-top .${ID}-reviews`).appendChild(document.querySelector(".product-customer-rating-summary"));
      element.querySelector(".product-customer-rating-summary__text").textContent = `(${reviewAmount})`;
    }

    element.querySelector(`.${ID}-allReviews`).appendChild(document.querySelector(".product-reviews"));
    const writeReview = document.querySelector(".product-reviews__write-review-anchor");
    element.querySelector(`.${ID}-allReviewsBlock .${ID}__button.secondary`).addEventListener("click", () => {
      writeReview.click();
    });
    

    pollerLite(["finance-options"], () => {
      element.querySelector(`.${ID}-finance`).insertAdjacentElement("afterbegin", document.querySelector("finance-options"));
    });

    pollerLite([".tangiblee-button", ".tangiblee-button span"], () => {
      element.querySelector(`.${ID}-mainProductSlider`).appendChild(document.querySelector(".tangiblee-button"));
      document.querySelector(".tangiblee-button").removeAttribute("style");
      document.querySelector(".tangiblee-button span").removeAttribute("style");
      document.querySelector(".tangiblee-button span").textContent = "Try it on";

      window.addEventListener("resize", () => {
        document.querySelector(".tangiblee-button").removeAttribute("style");
        document.querySelector(".tangiblee-button span").removeAttribute("style");
        document.querySelector(".tangiblee-button span").textContent = "Try it on";
      });
      element.querySelector(`.${ID}-tangiblee .${ID}__textLink`).addEventListener("click", () => {
        document.querySelector(".tangiblee-button").click();
      });
    });

    pollerLite([".product-gallery__syte.js-syte-functionality"], () => {
      element.querySelector(`.${ID}-mainProductSlider`).appendChild(document.querySelector(".product-gallery__syte.js-syte-functionality"));
    });
  }

  bindEvents() {
    const { component } = this;

    component.querySelector(`.${ID}-stockCheck .${ID}__textLink`).addEventListener("click", (e) => {
      const matchingContent = e.currentTarget.getAttribute("detail-attr");
      const matchingInnerContent = document.querySelector(`.${ID}-stockSlideOut .${ID}-inner.${matchingContent}`);
      if (matchingInnerContent) {
        openSlideTab(document.querySelector(`.${ID}-stockSlideOut`), matchingInnerContent);
      }
    });

    // slide out info
    if (window.innerWidth > 767) {
      const allUspLinks = component.querySelectorAll(`.${ID}-usp`);

      for (let index = 0; index < allUspLinks.length; index += 1) {
        const element = allUspLinks[index];

        let elToClick;

        if(element.querySelectorAll(`.${ID}__textLink`)[1]) {
          const allLinks = element.querySelectorAll(`.${ID}__textLink`);
          for (let index = 0; index < allLinks.length; index++) {
            const linkElement = allLinks[index];

            linkElement.addEventListener("click", () => {
              const matchingContent = element.getAttribute("usp-attr");
              const matchingInnerContent = document.querySelector(`.${ID}-slideOutTab .${ID}-inner.${matchingContent}`);
              if (matchingInnerContent) {
                openSlideTab(document.querySelector(`.${ID}-slideOutTab`), matchingInnerContent);
              }
            });
            
          }
        } else {

          if (element.querySelector(`.${ID}__textLink`)) {
            elToClick = element.querySelector(`.${ID}__textLink`);
          } else {
            elToClick = element;
          }

          elToClick.addEventListener("click", () => {
            const matchingContent = element.getAttribute("usp-attr");

            const matchingInnerContent = document.querySelector(`.${ID}-slideOutTab .${ID}-inner.${matchingContent}`);
            if (matchingInnerContent) {
              openSlideTab(document.querySelector(`.${ID}-slideOutTab`), matchingInnerContent);
            }
          });
        }
      }

      const specLink = component.querySelector(`.${ID}-productIntro .specs.${ID}__textLink`);
      specLink.addEventListener('click', () => {
        component.querySelector(`.${ID}-usp.${ID}-features .${ID}__textLink`).click();
      });
    }
  }

  render() {
    const { component } = this;
    document.querySelector("#access-content").insertAdjacentElement("beforebegin", component);
  }
}
