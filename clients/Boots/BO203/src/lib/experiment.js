/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import { insertAfterElement, pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";
import tabs from "./components/tabs";
import summary from "./components/accordion/summary";
import loader from "./components/loader";
import { removeLoader, loadPerfectBundle } from "./utils";

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");

  if (window.usabilla_live) {
    window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
  }

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if (VARIATION == "control") {
    return;
  }

  const perfectBundleEl = document.querySelectorAll(".inc_pdp_block")[0];
  const productDetailsEl = document.querySelectorAll(
    "#estore_product_longdesc"
  )[0];
  const deliveryOptionsEl = document.querySelectorAll(
    ".template_row_spacer .contentRecommendationWidget .left_espot"
  )[0];
  const alsoViewedEl = document.querySelectorAll("#richRelevanceContainer")[0];
  const reviewsEl = document.querySelectorAll('[data-bv-show="reviews"]')[0];

  const v1tabData = [
    {
      title: "The perfect bundle",
      id: "perfect-bundle",
      element: perfectBundleEl,
      elRef: ".inc_pdp_block",
      elRefIdx: 0,
    },
    {
      title: "Product details",
      id: "product-details",
      element: productDetailsEl,
      elRef: "#estore_product_longdesc",
      elRefIdx: 0,
    },
    {
      title: "Delivery options",
      id: "delivery-options",
      element: deliveryOptionsEl,
      elRef: ".contentRecommendationWidget",
      elRefIdx: 0,
    },
    {
      title: "Customers also viewed",
      id: "also-viewed",
      element: alsoViewedEl,
      elRef: "#richRelevanceContainer",
      elRefIdx: 0,
    },
    {
      title: "Reviews",
      id: "reviews",
      element: reviewsEl,
      elRef: `[data-bv-show="reviews"]`,
      elRefIdx: 0,
    },
  ];

  const v2tabData = [
    {
      title: "Product details",
      id: "product-details",
      element: productDetailsEl,
      elRef: "#estore_product_longdesc",
      elRefIdx: 0,
    },
    {
      title: "Delivery options",
      id: "delivery-options",
      element: deliveryOptionsEl,
      elRef: ".contentRecommendationWidget",
      elRefIdx: 0,
    },
    {
      title: "Customers also viewed",
      id: "also-viewed",
      element: alsoViewedEl,
      elRef: "#richRelevanceContainer",
      elRefIdx: 0,
    },
    {
      title: "Reviews",
      id: "reviews",
      element: reviewsEl,
      elRef: `[data-bv-show="reviews"]`,
      elRefIdx: 0,
    },
    {
      title: "The perfect bundle",
      id: "perfect-bundle",
      element: perfectBundleEl,
      elRef: ".inc_pdp_block",
      elRefIdx: 0,
    },
  ];

  const entryElement = document.querySelectorAll(".rowContainer > div")[1];

  if (VARIATION == 1) {
    insertAfterElement(entryElement, tabs(v1tabData, "perfect-bundle"));
  }
  if (VARIATION == 2) {
    insertAfterElement(entryElement, tabs(v2tabData, "product-details"));
  }

  const v3accordionData = [
    {
      title: "The perfect bundle",
      id: "perfect-bundle",
      element: perfectBundleEl,
      elRef: ".inc_pdp_block",
      elRefIdx: 0,
    },
    {
      title: "Product details",
      id: "product-details",
      element: productDetailsEl,
      elRef: "#estore_product_longdesc",
      elRefIdx: 0,
    },
    {
      title: "Delivery options",
      id: "delivery-options",
      element: deliveryOptionsEl,
      elRef: ".contentRecommendationWidget",
      elRefIdx: 0,
    },
    {
      title: "Customers also viewed",
      id: "also-viewed",
      element: alsoViewedEl,
      elRef: "#richRelevanceContainer > div",
      elRefIdx: 0,
    },
    {
      title: "All reviews",
      id: "reviews",
      element: reviewsEl,
      elRef: `[data-bv-show="reviews"]`,
      elRefIdx: 0,
    },
  ];

  if (VARIATION == 3 || VARIATION == 4) {
    const accordion = document.createElement("div");
    accordion.classList.add(`${ID}-accordion`);

    insertAfterElement(entryElement, accordion);

    if (VARIATION != 4) {
      const reviewSummary = summary("Review summary");
      reviewSummary.setAttribute("open", "");
      accordion.append(reviewSummary);

      const reviewSummaryContent = reviewSummary.querySelector(
        `.${ID}-content`
      );
      reviewSummaryContent.append(loader());

      pollerLite(["#BVRRContainer", ".bv-section-summary"], () => {
        const reviewsSummary = document
          .querySelector("#BVRRContainer .bv-section-summary")
          .cloneNode(true);

        const reviewsSummaryContainer = document.createElement("div");
        reviewsSummaryContainer.classList.add(
          "bv-cleanslate",
          "bv-cv2-cleanslate"
        );
        reviewsSummaryContainer.append(reviewsSummary);
        reviewsSummaryContainer.firstElementChild.classList.add(
          "bv-core-container-731"
        );
        reviewSummaryContent.append(reviewsSummaryContainer);

        removeLoader(reviewSummaryContent);

        const recentReviewsContainer = document.createElement("div");
        const classesToAdd = document.querySelector(
          'div[class^="bv-shared bv-core-container"]'
        ).classList;
        recentReviewsContainer.classList.add(
          `${ID}-recent-reviews`,
          classesToAdd[0],
          classesToAdd[1]
        );
        reviewSummaryContent.classList.add("bv-cv2-cleanslate");
        reviewSummaryContent.append(recentReviewsContainer);

        const getMostRecentReviews = () => {
          const allRecentReviews = document.querySelectorAll(
            "#BVRRContainer .bv-content-list.bv-content-list-reviews > li"
          );

          const lastThreeReviews = [...allRecentReviews].splice(0, 3);

          const lastThreeClones = lastThreeReviews.map((el) =>
            el.cloneNode(true)
          );

          lastThreeClones.forEach((el) => recentReviewsContainer.append(el));
        };

        getMostRecentReviews();

        const allReviewsButton = document.createElement("button");
        allReviewsButton.classList.add(`${ID}-ghost-button`);
        allReviewsButton.textContent = "See all reviews";
        allReviewsButton.addEventListener("click", () => {
          const allReviews = accordion.querySelector(
            "[data-all-reviews] summary"
          );
          allReviews.click();
          allReviews.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
        reviewSummaryContent.append(allReviewsButton);
      });
    }

    v3accordionData.forEach((item) => {
      const tab = summary(item.title);
      accordion.append(tab);

      if (item.id === "reviews") {
        tab.setAttribute("data-all-reviews", "");

        pollerLite(
          ["button#ratings-summary", "button.bv_button_buttonFull"],
          () => {
            const reviewsTab = document.querySelector(
              "details[data-all-reviews] summary"
            );

            if (reviewsTab) {
              const ratings = document.querySelector("button#ratings-summary");
              const ratingsButton = document.querySelector(
                "button.bv_button_buttonFull"
              );

              ratings.addEventListener("click", () => {
                if (!reviewsTab.parentElement.hasAttribute("open")) {
                  reviewsTab.click();
                }
                reviewsTab.scrollIntoView();
              });

              ratingsButton.addEventListener("click", () => {
                if (!reviewsTab.parentElement.hasAttribute("open")) {
                  reviewsTab.click();
                }
                reviewsTab.scrollIntoView();
              });
            }
          }
        );
      }

      const content = tab.querySelector(`.${ID}-content`);

      content.append(loader());

      const WAIT_TIMEOUT = 8000;

      const pollerOptions = {
        timeout: WAIT_TIMEOUT,
      };

      const removeTab = (el) => {
        el.parentElement.remove();
      };

      const tabTimeout = setTimeout(() => removeTab(content), WAIT_TIMEOUT);

      if (item.element == null) {
        if (item.elRef === ".inc_pdp_block") {
          loadPerfectBundle().then((el) => {
            removeLoader(content);
            content.append(el);
            clearTimeout(tabTimeout);
          });
        } else {
          pollerLite(
            [item.elRef],
            () => {
              removeLoader(content);
              content.append(
                document.querySelectorAll(item.elRef)[item.elRefIdx]
              );
              clearTimeout(tabTimeout);
            },
            pollerOptions
          );
        }
      } else if (item.element) {
        removeLoader(content);
        content.append(item.element);
        clearTimeout(tabTimeout);
      }
    });

    const allAccordionTabs = accordion.querySelectorAll("summary");
    allAccordionTabs.forEach((tab, idx) => {
      if (idx === 0) tab.parentElement.setAttribute("open", "");

      tab.addEventListener("click", (e) => {
        allAccordionTabs.forEach((t) => {
          if (t !== e.target) {
            t.parentElement.removeAttribute("open");
          }
        });
      });
    });
  }

  const v5accordionData = [
    {
      title: "Product details",
      id: "product-details",
      element: productDetailsEl,
      elRef: "#estore_product_longdesc",
      elRefIdx: 0,
    },
    {
      title: "The perfect bundle",
      id: "perfect-bundle",
      element: perfectBundleEl,
      elRef: ".inc_pdp_block",
      elRefIdx: 0,
    },
    {
      title: "Delivery options",
      id: "delivery-options",
      element: deliveryOptionsEl,
      elRef: ".contentRecommendationWidget",
      elRefIdx: 0,
    },
    {
      title: "Customers also viewed",
      id: "also-viewed",
      element: alsoViewedEl,
      elRef: "#richRelevanceContainer > div",
      elRefIdx: 0,
    },
    {
      title: "All reviews",
      id: "reviews",
      element: reviewsEl,
      elRef: '[data-bv-show="reviews"]',
      elRefIdx: 0,
    },
  ];

  if (VARIATION == 5) {
    const accordion = document.createElement("div");
    accordion.classList.add(`${ID}-accordion`);

    insertAfterElement(entryElement, accordion);

    const renderCollapsingContainer = () => {
      const el = document.createElement("div");
      el.classList.add(`${ID}-collapsing-container`);
      el.setAttribute("collapsed", "");
      el.innerHTML = /* html */ `
				<div class="${ID}-collapsing-container__content" data-collapsing-content></div>
				<div class="${ID}-collapsing-container__toggle-wrapper">
					<button class="${ID}-collapsing-container__toggle-button" data-toggle>Read more</button>
				</div>
			`;

      const toggleButton = el.querySelector("[data-toggle]");

      toggleButton.addEventListener("click", () => {
        if (el.hasAttribute("collapsed")) {
          el.removeAttribute("collapsed");
          toggleButton.textContent = "Read less";
        } else {
          el.setAttribute("collapsed", "");
          toggleButton.textContent = "Read more";
        }
      });

      return el;
    };

    v5accordionData.forEach((item) => {
      const tab = summary(item.title);
      accordion.append(tab);

      if (item.id === "product-details") {
        tab.setAttribute("open", "");
      }

      if (item.id === "reviews") {
        tab.setAttribute("data-all-reviews", "");

        pollerLite(
          ["button#ratings-summary", "button.bv_button_buttonFull"],
          () => {
            const reviewsTab = document.querySelector(
              "details[data-all-reviews] summary"
            );

            if (reviewsTab) {
              const ratings = document.querySelector("button#ratings-summary");
              const ratingsButton = document.querySelector(
                "button.bv_button_buttonFull"
              );

              ratings.addEventListener("click", () => {
                if (!reviewsTab.parentElement.hasAttribute("open")) {
                  reviewsTab.click();
                }
                reviewsTab.scrollIntoView();
              });

              ratingsButton.addEventListener("click", () => {
                if (!reviewsTab.parentElement.hasAttribute("open")) {
                  reviewsTab.click();
                }
                reviewsTab.scrollIntoView();
              });
            }
          }
        );
      }

      tab.setAttribute("data-accordion", item.id);

      const content = tab.querySelector(`.${ID}-content`);
      content.append(loader());

      const WAIT_TIMEOUT = 8000;
      const pollerOptions = { timeout: WAIT_TIMEOUT };

      const removeTab = (id) => {
        const itemsToRemove = document.querySelectorAll(
          `[data-accordion="${id}"]`
        );
        itemsToRemove.forEach((item) => item.remove());
      };

      const tabTimeout = setTimeout(() => removeTab(item.id), WAIT_TIMEOUT);

      if (item.element == null) {
        if (item.elRef === ".inc_pdp_block") {
          loadPerfectBundle().then((el) => {
            removeLoader(content);
            content.append(el);
            clearTimeout(tabTimeout);
          });
        } else {
          pollerLite(
            [item.elRef],
            () => {
              removeLoader(content);
              content.append(
                document.querySelectorAll(item.elRef)[item.elRefIdx]
              );
              clearTimeout(tabTimeout);
            },
            pollerOptions
          );
        }
      } else if (item.element.firstElementChild) {
        removeLoader(content);
        clearTimeout(tabTimeout);

        if (item.id === "product-details") {
          content.append(renderCollapsingContainer());

          const collapsingContainerContentContainer = document.querySelector(
            "[data-collapsing-content]"
          );
          collapsingContainerContentContainer.append(item.element);
        } else {
          content.append(item.element);
        }
      }
    });

    const allAccordionTabs = accordion.querySelectorAll("summary");
    allAccordionTabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        allAccordionTabs.forEach((t) => {
          if (t !== e.target) {
            t.parentElement.removeAttribute("open");
          }
        });
      });
    });

    const renderQuickLinks = () => {
      const root = document.createElement("div");
      root.classList.add(`${ID}-quick-links`);
      root.innerHTML = /* html */ `
				<ul>
					<li data-accordion="product-details">
						<button>View product details</button>
					</li>
					<li data-accordion="perfect-bundle">
						<button>Perfect pairing</button>
					</li>
					<li data-accordion="delivery-options">
						<button>View delivery</button>
					</li>
					<li data-accordion="also-viewed">
						<button>Customers also viewed</button>
					</li>
					<li data-accordion="reviews">
						<button>Reviews</button>
					</li>
				</ul>
			`;

      const quickLinks = root.querySelectorAll("button");

      const accordions = [
        ...document.querySelectorAll(`.${ID}-accordion [data-accordion]`),
      ].reduce((prev, item) => {
        const key = item.getAttribute("data-accordion");

        return {
          ...prev,
          [key]: item,
        };
      }, {});

      quickLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          const targetEl = accordions[e.target.parentElement.dataset.accordion];

          if (targetEl.hasAttribute("open")) {
            return targetEl.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
          targetEl.firstElementChild.click();
          targetEl.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      });

      const entryElement = document.getElementById("estore_pdp_trcol");

      entryElement.append(root);
    };

    renderQuickLinks();
  }
};
