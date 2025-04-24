import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

const { ID } = shared;

export const scrollToElement = (element) => {
  window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.getBoundingClientRect().top + window.scrollY - 150,
  });
}

export const financeInfo = () => {
  const message = document.createElement("div");
  message.innerHTML = `
  <p>
    <span class="ifc"></span>
    <span class="clearpay"></span>
  </p>`;

  document.querySelector(`.${ID}-finance`).appendChild(message);

  pollerLite(["finance-options"], () => {
    const financePrice = document
      .querySelector("finance-options")
      .shadowRoot.querySelector(".finance-options")
      .textContent.match(/[\$\£\€](\d+(?:\.\d{1,2})?)/)[0];
      message.querySelector(".ifc").innerHTML = `0% finance available from ${financePrice}`;

      const ifcButton =  document.querySelector('finance-options').shadowRoot.querySelector('.finance-options__button');
      message.addEventListener('click', () => {
        ifcButton.click();
      });

      document.querySelector("finance-options").shadowRoot.querySelector(".finance-options").style = "background-color: none; padding: 0px;";
      if (document.querySelector("finance-options").shadowRoot.querySelector(".finance-options > p")) {
        document.querySelector("finance-options").shadowRoot.querySelector(".finance-options > p").style = "display: none";
      }
      document.querySelector("finance-options").shadowRoot.querySelector(".finance-options__button").style = "display: none";
  });

  pollerLite([".product-clearpay"], () => {
    const clearpayPrice = document.querySelector(".product-clearpay").textContent.match(/\d+(?:\.\d+)?/g)[1];
    message.querySelector(".clearpay").innerHTML = `or 4 payments of £${clearpayPrice} with <span></span>`;
  });
  
};

export const ringSize = () => {};

export const stockSlider = () => {
  const stockTab = document.createElement("div");
  stockTab.classList.add(`${ID}-stockSlideOut`);
  stockTab.innerHTML = `
  <div class="${ID}-close"></div>
  <div class="${ID}-inner stock">
    <h2 class="alternate">Stock checker</h2>
    <div class="${ID}-content"></div>
  </div>`;

  document.body.appendChild(stockTab);

  document.querySelector(`.${ID}-stockSlideOut .${ID}-close`).addEventListener("click", () => {
    const elToHide = document.querySelector(`.${ID}-stockSlideOut .${ID}-inner.active`);
    closeSlideTab(document.querySelector(`.${ID}-stockSlideOut`), elToHide);
  });
  document.querySelector(`.${ID}-overlay`).addEventListener("click", () => {
    const elToHide = document.querySelector(`.${ID}-stockSlideOut .${ID}-inner.active`);
    closeSlideTab(document.querySelector(`.${ID}-stockSlideOut`), elToHide);
  });

  // Move stock check to slide out
  pollerLite(["collect-in-store"], () => {
    const stockCheck = document.querySelector("collect-in-store");
    document.querySelector(`.${ID}-stockSlideOut .${ID}-content`).appendChild(stockCheck);
    stockRestyle();
  });
};

// Image carousel
export const productImage = () => {
  const currentSliderImages = document.querySelectorAll(".product-gallery__image-container img");
  const carouselContainer = document.querySelector(`.${ID}-mainProductSlider .swiper-wrapper`);

  for (let index = 0; index < currentSliderImages.length; index += 1) {
    const elementImage = currentSliderImages[index];

    if (elementImage) {
      const sliderImage = document.createElement("div");
      sliderImage.classList.add(`${ID}__slide`);
      sliderImage.classList.add("swiper-slide");
      sliderImage.innerHTML = `<div class="image" style="background-image: url(${elementImage.getAttribute("src")})"></div>`;

      carouselContainer.appendChild(sliderImage);
    }
  }

  // // make into a carousel
  if (window.innerWidth <= 767) {
    const mySwiper = new Swiper(`.${ID}-mainProductSlider .swiper-container`, {
      direction: "horizontal",
      loop: true,
      observer: true,
      //observeParents: true,
      pagination: {
        el: `.${ID}-mainProductSlider .${ID}-swiperPagination`,
        clickable: true,
      },
    });
  }
};

export const tabAccordion = () => {
  const deliveryDate = document.querySelector(".product-delivery__text .product-delivery__text-span");

  const details = document.createElement("div");
  details.className = `${ID}-productDetails ${ID}-slideOutTab`;
  details.innerHTML = `
 
    <div class="${ID}-close"></div>
    <div class="${ID}-detailSection ${ID}-open" detail-attr="details">
      <div class="${ID}-detail-heading"><h4 class="alternate">Product details</h4></div>
      <div class="${ID}-detail-content">
          <div class="${ID}-inner details">
            <h2 class="alternate">Product details</h2>
            <div class="${ID}-content"></div>
        </div>
      </div>
    </div>
    <div class="${ID}-detailSection" detail-attr="features">
      <div class="${ID}-detail-heading"><h4 class="alternate">Key features</h4></div>
        <div class="${ID}-detail-content">
          <div class="${ID}-inner features">
            <h2 class="alternate">Key features</h2>
            <div class="${ID}-content"></div>
          </div>
        </div>
    </div>
    <div class="${ID}-detailSection" detail-attr="returns">
      <div class="${ID}-detail-heading"><h4 class="alternate">Delivery and returns</h4></div>
      <div class="${ID}-detail-content">
        <div class="${ID}-inner returns">
          <h2 class="alternate">Delivery & Returns</h2>
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
    </div>`;

  if (window.innerWidth > 767) {
    document.body.appendChild(details);
  } else {
    document.querySelector(`.${ID}-top`).insertAdjacentElement("afterend", details);
  }

  // Move details to tabs
  const productDetails = document.querySelector(".product-description");
  document.querySelector(`.${ID}-detailSection[detail-attr="details"] .${ID}-detail-content .${ID}-inner .${ID}-content`).innerHTML = productDetails.innerHTML;

  // move specs
  const prodSpecs = document.querySelector(".product-specification");
  document.querySelector(`.${ID}-detailSection[detail-attr="features"] .${ID}-detail-content .${ID}-inner .${ID}-content`).innerHTML = prodSpecs.outerHTML;

  if (document.querySelector(`.${ID}-productDetails`)) {
    if (window.innerWidth >= 767) {
      document.querySelector(`.${ID}-productDetails`).classList.add(`desktop`);
      document.querySelector(`.${ID}-productDetails`).classList.remove(`mobile`);
    } else {
      document.querySelector(`.${ID}-productDetails`).classList.add(`mobile`);
      document.querySelector(`.${ID}-productDetails`).classList.remove(`desktop`);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 767) {
        document.querySelector(`.${ID}-productDetails`).classList.add(`desktop`);
        document.querySelector(`.${ID}-productDetails`).classList.remove(`mobile`);
      } else {
        document.querySelector(`.${ID}-productDetails`).classList.add(`mobile`);
        document.querySelector(`.${ID}-productDetails`).classList.remove(`desktop`);
      }
    });
  }

  if (window.innerWidth > 767) {
    document.querySelector(`.${ID}-slideOutTab .${ID}-close`).addEventListener("click", () => {
      const elToHide = document.querySelector(`.${ID}-slideOutTab .${ID}-inner.active`);
      closeSlideTab(document.querySelector(`.${ID}-slideOutTab`), elToHide);
    });

    document.querySelector(`.${ID}-overlay`).addEventListener("click", () => {
      const elToHide = document.querySelector(`.${ID}-slideOutTab .${ID}-inner.active`);
      closeSlideTab(document.querySelector(`.${ID}-slideOutTab`), elToHide);
    });
  }

  // Accordion
  const accItem = document.querySelectorAll(`.${ID}-detailSection`);
  const accHeading = document.querySelectorAll(`.${ID}-detail-heading`);

  for (let index = 0; index < accHeading.length; index += 1) {
    const el = accHeading[index];
    el.addEventListener("click", toggleItem, false);
  }

  function toggleItem() {
    const itemClass = this.parentNode.className;
    for (let i = 0; i < accItem.length; i += 1) {
      const accEl = accItem[i];
      accEl.className = `${ID}-detailSection`;
    }

    if (itemClass == `${ID}-detailSection`) {
      this.parentNode.className = `${ID}-detailSection ${ID}-open`;
      setTimeout(() => {
        document.documentElement.scrollTop += this.getBoundingClientRect().top;
      }, 310);
    }
  }
};

// Slide out info
export const openSlideTab = (tab, content) => {
  const tabEl = tab;
  const overlay = document.querySelector(`.${ID}-overlay`);

  overlay.classList.add("active");
  document.documentElement.classList.add("noScroll");
  tabEl.classList.add("active");
  tabEl.classList.remove("closed");
  content.classList.add("active");
  //fireEvent('Clicked link ' + content);
};

export const closeSlideTab = (tab, content) => {
  const tabEl = tab;
  const overlay = document.querySelector(`.${ID}-overlay`);

  overlay.classList.remove("active");
  tabEl.classList.remove("active");
  tabEl.classList.add("closed");
  content.classList.remove("active");
  document.documentElement.classList.remove("noScroll");
};

export const stockRestyle = () => {
  const storeCheck = document.querySelector("collect-in-store");
  // change styling of shadow root on the stock
  const stockStyle = document.createElement("style");
  stockStyle.innerHTML = `
       .cis { 
        background: white; 
        padding: 0px;
        font-family: Oxygen, Arial, Helvetica, sans-serif;
      } 
       .cis-section-title { display: none }
       .cis-postcode-search__nearby input {
          border: 2px solid #9E9E9E;
          border-right: 0px;
          height: 48px;
          padding: 10px;
          box-sizing: border-box;
       }
       .cis-postcode-search .cis-postcode-search__nearby button { 
          background: #101820;
          border-radius: 0px;
          background-image: url('https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/2ae3ffea-08dd-11ed-841e-4a166223d03e');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 20px;
          width: 50px;
          height: 48px;
          margin-left: -5px;
       }
       .cis-postcode-search .cis-postcode-search__nearby button.t-red-btn {
        border:0px;
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
       .cis-postcode-search .cis-postcode-search__nearby button:disabled {
         background-color: #D9D9D6;
       }
       .cis-postcode-search .cis-postcode-search__nearby button strong {
         display: none;
       }
       .cis-bottom-wrapper {
        display: none;
       }
       .cis-postcode-search__header p {
        font-size: 14px;
        font-family: Oxygen, Arial, Helvetica, sans-serif;
        color: #484849;
       }
       .cis-postcode-search__subheader b {
        font-size: 14px;
        font-weight: 300;
        font-family: Oxygen, Arial, Helvetica, sans-serif;
       }
       .cis-store-view--header svg {
        display: none;
       }
       .cis .cis-store-view--header h2 {
          margin-bottom: 10px;
          margin-left: 0px;
       }
       .cis-postcode {
        background: #f7f6f6;
        padding: 10px;
        margin-top: 10px;
       }
       .cis-postcode button { 
        font-family: Oxygen, Arial, Helvetica, sans-serif;
        font-size: 14px;
        color: #212721;
       }
       .cis-store-view__store-details {
        font-family: Oxygen, Arial, Helvetica, sans-serif;
        font-size: 14px;
        color: #212721;
       }
       .cis-store-view-address p {
        font-family: Oxygen, Arial, Helvetica, sans-serif;
        font-size: 14px;
        color: #484849;
       }
       .cis .cis-store-view {
        background: white;
        margin-bottom: 20px;
        padding: 0px;
       }
       .cis-store-view td {
        background: #F7F6F6;
        padding: 10px;
       }

       .cis-store-view__parent-table {
        border-collapse:separate; 
        border-spacing: 0 1em;
       }
       .cis .cis-store-view__select-store {
        width: auto;
        background: unset;
        border: unset;
        padding: 0px;
        text-align: right;
        display: block;
        margin-right: 0;
        margin-left: auto;
        color: #37A703;
       }
       .cis-store-view-address p:nth-child(3) {
        width: auto;
       }
       .cis-store-view-footer__more-stores {
        height: 50px;
        text-align: center;
        line-height: 26px;
        margin: 0 auto;
        border: 2px solid #101820;
        text-transform: uppercase;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 5px;
        font-weight: 900;
        display: block;
        text-decoration: none;
        max-width: 250px;
        cursor: pointer;
        background: white;
        color: #101820;
       }
       .cis-store-view-footer__more-stores button {
        font-family: Oxygen, Arial, Helvetica, sans-serif;
        font-size: 16px;
        color: #101820;
        text-transform: uppercase;
        text-decoration: none;
        font-weight: 700;
        transition: all 0.3s ease-in-out;
       }

       .cis-store-view-footer__more-stores:hover {
        background-color: #101820;
      }
      .cis-store-view-footer__more-stores:hover button{
        color: white;
      }
      @media(max-width: 1024px) {
        .cis .cis-store-view__inner-table tr td:last-child {
          display: flex;
          flex-direction: column;
          align-items: baseline;
          justify-content: flex-start;
          margin-left: 0;
        }
        .cis-store-view__inner-table tr td:last-child p {
          margin-top: 0px;
        }
      }
     `;

  storeCheck.shadowRoot.appendChild(stockStyle);
};

export const addWarranty = () => {
  const warrantyOptions = document.querySelector("warranty-options");
  document.body.appendChild(warrantyOptions);
  const price = document.querySelector("warranty-options").shadowRoot.querySelector(".c-product-warranty-summary__starting-price").textContent;

  const warrantyHTML = `<section class="${ID}-insurance">
  <div class="${ID}__sectionContainer">
      <div class="${ID}__row">
          <div class="${ID}-image"></div>
          <div class="${ID}-textBlock">
              <div class="inner">
                  <h2>Ernest Jones Platinum Care</h2>
                  <p>Few possessions mean as much to us as a watch or a special piece of jewellery. That’s why peace of mind is so important. With Ernest Jones Platinum Care, you’ll know that your valuable item is protected wherever you are in the world (limits and exclusions apply).</p>
                  <p>Choose a 2,3 or 5 year Platinum Care policy which includes theft & accidental cover from only <b>${price}</b></p>
                  <div class="${ID}-ctas">
                      <a class="${ID}__button secondary">Learn More</a>
                  </div>
              </div>
          </div>
      </div>
  </div>
</section>
`;

  document.querySelector(`.${ID}-appointment`).insertAdjacentHTML("beforebegin", warrantyHTML);

  document.querySelector(`.${ID}-insurance .${ID}__button`).addEventListener("click", () => {
    console.log('click')
    warrantyOptions.shadowRoot.querySelector(".c-product-warranty-summary__button-prompt").click();
  });

  // styling
  warrantyOptions.shadowRoot.querySelector(".c-product-warranty-summary").style = "display: none";
};
