/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { getCookie, pollerLite } from "../../../../lib/utils";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks) {
  if (!getCookie("Synthetic_Testing")) {
    const pdpregex = /.*(www.boots.com).*(-)[\d]{7,8}(.p)$|.*(www.boots.com).*(-)[\d]{7,8}$|.*(www.boots.com).*(-)[\d]{7,8}(.p)(\?).*|.*(www.boots.com).*(-)[\d]{7,8}(\?).*/;
    if(localStorage.getItem("favourites")) {
      const favourites = JSON.parse(localStorage.getItem("favourites") || '{"items": [], "lists": []}');
      if(favourites.items.length > 0) {
        if (window.location.href.match(pdpregex)) {
          pollerLite(["body","#mobileLink_basket", "#oct-basket-container", "#estore_pdp_trcol #estore_pdp_trcol_1", "#estore_product_title"], activate);

          // Search
        } else if (window.location.href.indexOf("/sitesearch") > -1) {
          pollerLite(["body","#mobileLink_basket", "#oct-basket-container", "#productsFacets", ".product_name_link.product_view_gtm", ".estore_product_container .product_add"], activate);

          pollerLite(["body","#mobileLink_basket", "#oct-basket-container", "#productsFacets", ".product_name_link.product_view_gtm", ".estore_product_container .product_add"], () => {
            const getIds = () =>
              [].slice
                .call(document.querySelectorAll(".estore_product_container"))
                .map((elm) => elm.dataset.productid)
                .join("");

            // for observer
            let oldHref = document.location.href;
            let oldIds = getIds();
            let bodyList = document.querySelector(".product_listing_container");
            let timeout = null;
            const observer = new MutationObserver(function (mutations) {
              clearTimeout(timeout);
              setTimeout(() => {
                mutations.forEach(function (mutation) {
                  if (oldHref != document.location.href || oldIds != getIds()) {
                    oldHref = document.location.href;
                    oldIds = getIds();

                    document.documentElement.classList.remove("BO209");
                    document.documentElement.classList.remove("BO209-1");
                    document.documentElement.classList.remove("BO209-control");

                    const favouriteModal = document.querySelector(".BO209-favourites-wrapper");
                    const favouritesBadge = document.querySelectorAll(".BO209-favouriteProduct");
                    const favouriteToggle = document.querySelector(".BO209-favouritesToggle");
                    const basketName = document.querySelector("#oct-basket-container .basketName");

                    if (basketName) {
                      basketName.remove();
                    }

                    if (favouriteModal) {
                      favouriteModal.remove();
                    }
                    if (favouriteToggle) {
                      favouriteToggle.remove();
                    }

                    if (favouritesBadge) {
                      for (let index = 0; index < favouritesBadge.length; index++) {
                        const element = favouritesBadge[index];
                        element.remove();
                      }
                    }

                    pollerLite(["body", "#mobileLink_basket", "#oct-basket-container", "#productsFacets", ".product_name_link.product_view_gtm", ".estore_product_container .product_add"], () => {
                      setTimeout(() => {
                        activate();
                      }, 800);
                    });
                  }
                });
              }, 600);
            });
            const config = {
              throttle: 500,
              childList: true,
              subtree: true,
            };

            observer.observe(bodyList, config);
          });
        } else if (document.querySelector("#cmCategorypage")) {
          pollerLite(["body","#mobileLink_basket", "#oct-basket-container", "#productsFacets", ".product_name_link.product_view_gtm", ".estore_product_container .product_add"], activate);

          pollerLite(["body","#mobileLink_basket", "#oct-basket-container", "#productsFacets", ".product_name_link.product_view_gtm", ".estore_product_container .product_add"], () => {
            // for observer
            let oldHref = document.location.href;
            let bodyList = document.querySelector("body");
            const observer = new MutationObserver(function (mutations) {
              mutations.forEach(function (mutation) {
                if (oldHref != document.location.href) {
                  oldHref = document.location.href;
                  document.documentElement.classList.remove("BO209");
                  document.documentElement.classList.remove("BO209-1");
                  document.documentElement.classList.remove("BO209-control");

                  const favouriteModal = document.querySelector(".BO209-favourites-wrapper");
                  const favouritesBadge = document.querySelectorAll(".BO209-favouriteProduct");
                  const favouriteToggle = document.querySelector(".BO209-favouritesToggle");
                  const basketName = document.querySelector("#oct-basket-container .basketName");

                  if (basketName) {
                    basketName.remove();
                  }

                  if (favouriteModal) {
                    favouriteModal.remove();
                  }
                  if (favouriteToggle) {
                    favouriteToggle.remove();
                  }

                  if (favouritesBadge) {
                    for (let index = 0; index < favouritesBadge.length; index++) {
                      const element = favouritesBadge[index];
                      element.remove();
                    }
                  }

                  pollerLite(["body","#mobileLink_basket", "#oct-basket-container", "#productsFacets", ".product_name_link.product_view_gtm", ".estore_product_container .product_add"], () => {
                    setTimeout(() => {
                      activate();
                    }, 1000);
                  });
                }
              });
            });
            const config = {
              childList: true,
              subtree: true,
            };

            observer.observe(bodyList, config);
          });
        } else {
          pollerLite(["body", "#mobileLink_basket", "#oct-basket-container"], activate);
        }
      }
    }
  }
}
