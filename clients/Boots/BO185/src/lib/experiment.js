/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import {
  insertAfterElement,
  insertBeforeElement,
  pollerLite,
  sendHttpRequest,
} from "../../../../../lib/utils";

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");

  document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem(`${ID}`) !== "Fired") {
      window.cmCreateManualLinkClickTag(
        `/${ID}?cm_sp=AdobeTarget${ID}-_-${ID} V${VARIATION}-_-fired`
      );

      sessionStorage.setItem(`${ID}`, "Fired");
    }
  });

  if (window.usabilla_live) {
    window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
  }

  if (VARIATION == "control") {
    return;
  }

  const mainContainer = document.querySelector(
    "#estore_productpage_template_container"
  );
  const entryElement = mainContainer.querySelectorAll(".row")[1];

  const rootElement = document.createElement("div");
  rootElement.classList.add(`${ID}-root`);
  rootElement.innerHTML = /* HTML */ `
    <details>
      <summary>
        <span class="${ID}-icon">
          <img
            src="https://blcro.fra1.digitaloceanspaces.com/BO185/Description.png"
            alt=""
          />
        </span>
        Product details
        <div class="${ID}-cross"></div>
      </summary>
      <div class="${ID}-content" data-details-content></div>
      <div class="${ID}-content-close" data-content-close>
        <button>Close tab</button>
      </div>
    </details>
    <details>
      <summary>
        <span class="${ID}-icon">
          <img
            src="https://blcro.fra1.digitaloceanspaces.com/BO185/Van.png"
            alt=""
          />
        </span>
        Delivery options
        <div class="${ID}-cross"></div>
      </summary>
      <div class="${ID}-content" data-delivery-content></div>
      <div class="${ID}-content-close" data-content-close>
        <button>Close tab</button>
      </div>
    </details>
    <details>
      <summary>
        <span class="${ID}-icon">
          <img
            src="https://blcro.fra1.digitaloceanspaces.com/BO185/Star.png"
            alt=""
          />
        </span>
        Reviews
        <div class="${ID}-cross"></div>
      </summary>
      <div class="${ID}-content" data-reviews-content></div>
      <div class="${ID}-content-close" data-content-close>
        <button>Close tab</button>
      </div>
    </details>
    <h2>Related Items</h2>
    <ul class="${ID}-item-list" data-item-list>
      <div class="${ID}-loader"></div>
    </ul>
    <button class="${ID}-load-more" data-load-more>Load more products</button>
  `;

  insertAfterElement(entryElement, rootElement);

  class Accordion {
    constructor(el) {
      this.el = el;
      this.summary = el.querySelector("summary");
      this.close = el.querySelector(`.${ID}-content-close button`);
      this.content = el.querySelector(`.${ID}-content`);

      this.animation = null;
      this.isClosing = false;
      this.isExpanding = false;
      this.summary.addEventListener("click", (e) => this.onClick(e));
      this.close.addEventListener("click", (e) => {
        this.onClick(e);
        this.el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    onClick(e) {
      e.preventDefault();

      this.el.style.overflow = "hidden";
      if (this.isClosing || !this.el.open) {
        this.open();
      } else if (this.isExpanding || this.el.open) {
        this.shrink();
      }
    }

    shrink() {
      this.isClosing = true;

      const startHeight = `${this.el.offsetHeight}px`;
      const endHeight = `${this.summary.offsetHeight}px`;

      if (this.animation) {
        this.animation.cancel();
      }

      this.animation = this.el.animate(
        {
          height: [startHeight, endHeight],
        },
        {
          duration: 400,
          easing: "ease",
        }
      );

      this.animation.onfinish = () => this.onAnimationFinish(false);
      this.animation.oncancel = () => (this.isClosing = false);
    }

    open() {
      this.el.style.height = `${this.el.offsetHeight}px`;
      this.el.open = true;
      window.requestAnimationFrame(() => this.expand());
    }

    expand() {
      this.isExpanding = true;
      const startHeight = `${this.el.offsetHeight}px`;
      const endHeight = `${
        this.summary.offsetHeight +
        this.content.offsetHeight +
        this.close.offsetHeight
      }px`;

      if (this.animation) {
        this.animation.cancel();
      }

      this.animation = this.el.animate(
        {
          height: [startHeight, endHeight],
        },
        {
          duration: 400,
          easing: "ease",
        }
      );
      this.animation.onfinish = () => this.onAnimationFinish(true);
      this.animation.oncancel = () => (this.isExpanding = false);
    }

    onAnimationFinish(open) {
      this.el.open = open;
      this.animation = null;
      this.isClosing = false;
      this.isExpanding = false;
      this.el.style.height = this.el.style.overflow = "";
    }
  }

  document.querySelectorAll(`.${ID}-root details`).forEach((el) => {
    new Accordion(el);
  });

  const productDetails = mainContainer.querySelector("#estore_pdp_blcol");
  const deliveryDetails = mainContainer.querySelector(
    "#estore_pdp_brcol .contentRecommendationWidget"
  );
  const productReviews = mainContainer.querySelector("#BVRRContainer");

  const productDetailsAccordion = document.querySelector(
    `.${ID}-root [data-details-content]`
  );
  const deliveryDetailsAccordion = document.querySelector(
    `.${ID}-root [data-delivery-content]`
  );
  const productReviewsAccordion = document.querySelector(
    `.${ID}-root [data-reviews-content]`
  );

  productDetailsAccordion.appendChild(productDetails);
  deliveryDetailsAccordion.appendChild(deliveryDetails);

  if (productReviews) {
    productReviewsAccordion.appendChild(productReviews);
  } else {
    productReviewsAccordion.parentElement.remove();
  }

  const pageSpacer = document.querySelector(".row.template_row_spacer");
  insertBeforeElement(rootElement, pageSpacer);
  pageSpacer.innerHTML = "";

  pollerLite(["a.bv-rating-stars-container"], () => {
    const ratingsButton = document.querySelector("a.bv-rating-stars-container");

    ratingsButton.addEventListener("click", () => {
      if (!productReviewsAccordion.parentElement.open) {
        productReviewsAccordion.previousElementSibling.click();
      }
    });
  });

  const itemsList = rootElement.querySelector("[data-item-list]");

  const fetchItems = (url) => {
    sendHttpRequest("GET", url)
      .then((res) => {
        const temp = document.createElement("html");
        temp.innerHTML = res;
        const items = temp.querySelectorAll(".estore_product_container");

        items.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.appendChild(item);
          itemsList.appendChild(listItem);
        });

        document.querySelector(`.${ID}-loader`).remove();

        const newItems = document.querySelectorAll(`.${ID}-item-list li`);
        const loadMoreButton = document.querySelector("[data-load-more]");
        const totalItems = newItems.length;
        const loadAmount = 4;
        let currentItems = 4;

        if (window.screen.width < 601) {
        if (totalItems > 4) {
          loadMoreButton.classList.add("visible");
          newItems.forEach((item, idx) => {
            if (idx > currentItems - 1) {
              item.classList.add(`${ID}-mobile-hide`);
            }
          });

          loadMoreButton.addEventListener("click", () => {
            newItems.forEach((item, idx) => {
              if (idx > currentItems - 1 && idx < currentItems + loadAmount) {
                item.classList.remove(`${ID}-mobile-hide`);
              }
            });

            currentItems += loadAmount;

            if (currentItems >= totalItems) {
              loadMoreButton.remove();
            }
          });
        } 
        } else {
          loadMoreButton.remove();
        }

        // Tracking
        const loadedProducts = itemsList.querySelectorAll("li");
        loadedProducts.forEach((product) => {
          product.addEventListener("click", () => {
            fireEvent("Item Clicked");
          });
        });

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) fireEvent("Did see products");
          });
        });

        observer.observe(itemsList);
        // End Tracking
      })
      .catch(() => {
        itemsList.remove();
        document.querySelector(`.${ID}-load-more`).remove();
        document.querySelector(`.${ID}-root > h2`).remove();
      });
  };

  const currentUrl = window.location.pathname;

  switch (currentUrl) {
    case "/revlon-pro-collection-one-step-dryer-volumiser-10235019":
      fetchItems(
        "https://www.boots.com/electrical/hair-styling-tools/hot-brushes-air-stylers"
      );
      break;
    case "/lumie-sunrise-alarm-10256821":
      fetchItems(
        "https://www.boots.com/electrical/electrical-health-diagnostics/light-therapy"
      );
      break;
    case "/cerave-sa-smoothing-cleanser-236ml-10272454":
      fetchItems(
        "https://www.boots.com/beauty/skincare/expert-skincare-"
      );
      break;
    case "/ole-henriksen-strength-trainer-peptide-boost-moisturizer-50ml-10303664":
      fetchItems(
        "https://www.boots.com/ole-henriksen-/ole-henriksen-moisturisers"
      );
      break;
    case "/waterpik-cordless-plus-water-flosser-wp-450uk-10090171":
      fetchItems(
        "https://www.boots.com/electrical/electrical-dental/all-electrical-dental-"
      );
      break;
    case "/bondi-boost-intensive-growth-spray-125ml-10267267":
      fetchItems("https://www.boots.com/bondi-boost--1/bondi-boost-shop-all");
      break;
    case "/boots-finger-pulse-oximeter-10293867":
      fetchItems(
        "https://www.boots.com/electrical/electrical-health-diagnostics/healthyheart"
      );
      break;
    case "/soap-and-glory-a-printly-glorious-selection-10298228":
      fetchItems("https://www.boots.com/soap-and-glory/soap-and-glory-gifts");
      break;
    case "/ambre-solaire-sensitive-hydrating-face-sun-cream-mist-spf50-75ml-10225139--":
      fetchItems("https://www.boots.com/holidays/suncare/face-sun-protection");
      break;
    case "/slimfast-7-day-starter-kit-10229887":
      fetchItems("https://www.boots.com/slimfast/all-slimfast-products");
      break;
    case "/boots-essentials-curl-creme-250ml-10088417":
      fetchItems(
        "https://www.boots.com/beauty/hair/shop-all-black-afro-and-texured-hair#facet:&productBeginIndex:0&orderBy:7&pageView:grid&minPrice:&maxPrice:&pageSize:&"
      );
      break;
    case "/woodwards-gripe-water-150ml-10006777":
      fetchItems(
        "https://www.boots.com/baby-child/bathing-changing/changing-bag-essentials"
      );
      break;
    case "/cur%C3%A9l-deep-moisture-spray-150ml-for-dry-sensitive-skin-10302564":
      fetchItems("https://www.boots.com/curel/curel-moisturisers");
      break;
    case "/ariana-grande-cloud-eau-de-parfum-50ml-10259502":
      fetchItems("https://www.boots.com/fragrance/perfume/all-perfume");
      break;
    case "/night-nurse-liquid-160-ml-10032867":
      fetchItems(
        "https://www.boots.com/health-pharmacy/medicines-treatments/cold-flu-medication"
      );
      break;
    case "/boots-sleapeaze-tablets-50-mg---20-tablets-10263964":
      fetchItems(
        "https://www.boots.com/health-pharmacy/medicines-treatments/sleep"
      );
      break;
    case "/nyx-professional-makeup-jumbo-eye-pencil-12g-10207815":
      fetchItems(
        "https://www.boots.com/beauty/makeup/eyes/eyebrows"
      );
      break;
    case "/aveeno-dermexa-emollient-cream-200ml-10246696":
      fetchItems("https://www.boots.com/aveeno/aveeno-all-products");
      break;
    default:
      return;
  }
};
