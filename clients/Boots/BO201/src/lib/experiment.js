import Swiper, { Navigation } from "swiper";
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import {
  sendHttpRequest,
  insertAfterElement,
  pollerLite,
} from "../../../../../lib/utils";
import fetchAlgoliaResults from "./algolia";

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

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION === "control") {
    return;
  }

  // localStorage.setItem(
  //   `${ID}-RecentlyViewedItems`,
  //   JSON.stringify([
  //     "https://www.boots.com/bio-oil-natural-skincare-oil-200ml-10299225",
  //     "https://www.boots.com/boots-vitamin-c-moisturising-cream-10271985",
  //     "https://www.boots.com/boots-vitamin-c-brightening-sleeping-mask-10271969",
  //     "https://www.boots.com/boots-vitamin-c-cleansing-gel-10271986",
  //     "https://www.boots.com/femfresh-intimate-hygiene-daily-intimate-wash-250ml-10131120",
  //     "https://www.boots.com/femfresh-ultimate-care-pure-and-fresh-gel-wash-250ml-10144852",
  //     "https://www.boots.com/boots-tea-tree-and-witch-hazel-spot-wand-2x-3-5ml-10125611",
  //     "https://www.boots.com/the-ordinary-niacinamide-10-zinc-1-10267783",
  //     "https://www.boots.com/nivea-q10-anti-wrinkle-night-face-cream--50ml-10256396",
  //     "https://www.boots.com/nivea-q10-power-anti-wrinkle-replenishing-face-serum-pearls-30ml-10294720",
  //     "https://www.boots.com/toiletries/bootsdental/toothpaste/sensodyne-nourish-gently-soothing-toothpaste-75ml-10304710",
  //     "https://www.boots.com/sensodyne-nourish-healthy-white-toothpaste-75ml-10304711",
  //     "https://www.boots.com/toiletries/bootsdental/toothpaste/regenerate-hypersensitive-toothpaste-14ml-10292442",
  //     "https://www.boots.com/toiletries/bootsdental/toothpaste/sensodyne-pronamel-mineral-boost-75ml-10304712",
  //     "https://www.boots.com/toiletries/bootsdental/toothpaste/oral-b-proexpert-advanced-science-deep-clean-toothpaste-75ml-10307863",
  //   ])
  // );

  const getTodaysDate = () => {
    const d = new Date();

    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  const getDayDifference = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = Math.abs(d1.getTime() - d2.getTime());

    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const storedDate = localStorage.getItem(`${ID}-LastVisitedDate`);

  if (!storedDate)
    localStorage.setItem(`${ID}-LastVisitedDate`, getTodaysDate());

  if (storedDate && getDayDifference(storedDate, getTodaysDate()) >= 7) {
    localStorage.setItem(`${ID}-LastVisitedDate`, getTodaysDate());
    localStorage.removeItem(`${ID}-RecentlyViewedItems`);
  }

  let recentlyViewedItems = JSON.parse(
    localStorage.getItem(`${ID}-RecentlyViewedItems`)
  );

  if (!recentlyViewedItems)
    localStorage.setItem(`${ID}-RecentlyViewedItems`, "[]");

  pollerLite(["#estore_productpage_template_container"], () => {
    const isPDP = document.querySelector(
      "#estore_productpage_template_container"
    );

    if (isPDP && recentlyViewedItems) {
      if (recentlyViewedItems.length === 20) {
        recentlyViewedItems.shift();
      }
      if (recentlyViewedItems.length < 20) {
        const productURL = window.location.href;
        const newItems = [...recentlyViewedItems, productURL];

        if (!recentlyViewedItems.includes(productURL)) {
          localStorage.setItem(
            `${ID}-RecentlyViewedItems`,
            JSON.stringify(newItems)
          );
        }
      }
    }
  });

  const regex = new RegExp(
    "((.*boots.com)(/)(health-pharmacy|holidays|new-to-boots|beauty|fragrance|baby-child|wellness$|wellness/|toiletries|electrical|mens|mens/mens-toiletries/shaving-grooming)(/)?.*)"
  );

  const isValidPage =
    window.location.pathname === "/" ||
    window.location.pathname === "/TopCategoriesDisplay" ||
    regex.test(window.location.href);

  if (isValidPage && !!recentlyViewedItems) {
    pollerLite([".oct-grid__row, #estore_category_heading"], () => {
      if (
        getDayDifference(storedDate, getTodaysDate()) < 7 &&
        recentlyViewedItems.length > 2
      ) {
        let entryElement;

        if (regex.test(window.location.href)) {
          if (
            window.location.pathname === "/beauty" ||
            window.location.pathname === "/holidays"
          ) {
            entryElement = document.querySelectorAll(
              ".oct-grid__row.oct-grid__row--full-width"
            )[18];
          } else if (document.querySelector(".oct-heading")) {
            entryElement = document
              .querySelector(".oct-heading")
              .closest(".oct-grid__row.oct-grid__row--full-width");
          } else if (
            document.querySelector("#estore_category_heading") &&
            !document.querySelector(".oct-grid__row")
          ) {
            entryElement = document.querySelector("#widget_breadcrumb");
          }
        } else {
          entryElement = document.querySelectorAll(
            ".oct-grid__row.oct-grid__row--full-width"
          )[1];
        }

        const rootElement = document.createElement("div");

        rootElement.classList.add(`${ID}-root`);
        rootElement.innerHTML = /* HTML */ `
          <div class="${ID}-header">
            <h3>Recently Viewed</h3>
            <button data-hide-recently-viewed>
              ${localStorage.getItem(`${ID}-carousel-state`) === "closed"
                ? "Show me"
                : "Hide"}
            </button>
          </div>
          <div
            class="${ID}-swiper swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events swiper-container-free-mode ${localStorage.getItem(
              `${ID}-carousel-state`
            ) === "closed"
              ? `${ID}-hidden`
              : ""}"
            data-recently-viewed-carousel
          >
            <div class="swiper-wrapper"></div>
            <div
              aria-label="next slide"
              role="button"
              tabindex="-1"
              class="swiper-button-next"
            ></div>
            <div
              aria-label="previous slide"
              role="button"
              tabindex="-1"
              class="swiper-button-prev"
            ></div>
            <div class="${ID}-loader-container">
              <div class="${ID}-loader"></div>
            </div>
          </div>
        `;

        insertAfterElement(entryElement, rootElement);

        Swiper.use([Navigation]);

        const swiper = new Swiper(`.${ID}-swiper`, {
          direction: "horizontal",
          observer: true,
          observeParents: true,
          observeSlideChildren: true,
          slidesPerView: 1.5,
          spaceBetween: 10,
          centeredSlides: true,
          centeredSlidesBounds: true,
          breakpoints: {
            480: {
              slidesPerView: 1.5,
            },
            640: {
              slidesPerView: 2.5,
            },
            900: {
              slidesPerView: 3.5,
            },
            1280: {
              slidesPerView: 5,
            },
          },
          navigation: {
            loop: true,
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          },
        });

        swiper.init();

        const promises = [];

        recentlyViewedItems.forEach((item) => {
          promises.unshift(
            sendHttpRequest("GET", item)
              .then((res) => {
                const temp = document.createElement("html");
                temp.innerHTML = res;

                const itemId = item.match(/.*([\d]{8}).*/);
                const itemImageId = itemId[itemId.length - 1];

                const url = item;
                const name = temp
                  .querySelector("#estore_product_title")
                  .innerText.trim();
                const image = `https://boots.scene7.com/is/image/Boots/${itemImageId}?wid=200&hei=200&op_sharpen=1`;

                return { url, name, image };
              })
              .catch(() => {
                localStorage.setItem(
                  `${ID}-RecentlyViewedItems`,
                  JSON.stringify(recentlyViewedItems.filter((i) => i !== item))
                );
              })
          );
        });

        Promise.all(promises).then((res) => {
          res.forEach((item, idx) => {
            if (item && item.url && item.name && item.image) {
              const productElement = document.createElement("div");
              productElement.classList.add("swiper-slide");
              productElement.innerHTML = /* HTML */ `
                <div class="${ID}-product">
                  <a href="${item.url}">
                    <div class="${ID}-product-image">
                      <img src="${item.image}" alt="${item.name}" />
                    </div>
                  </a>
                  <a href="${item.url}">
                    <h4>${item.name}</h4>
                  </a>
                  ${VARIATION == "1"
                    ? `
                      <button class="${ID}-product-button" data-remove-button>
                        Remove
                      </button>
                    `
                    : `
									<a href="${item.url}" class="${ID}-product-button">
										View
									</a>
									`}
                </div>
              `;

              swiper.addSlide(idx, productElement);

              const removeButton = productElement.querySelector(
                "[data-remove-button]"
              );

              if (removeButton) {
                removeButton.addEventListener("click", () => {
                  fireEvent("User removed product from carousel");

                  swiper.removeSlide(
                    [...recentlyViewedItems].reverse().indexOf(item.url)
                  );

                  const filteredItems = recentlyViewedItems.filter(
                    (i) => i !== item.url
                  );

                  recentlyViewedItems = filteredItems;

                  localStorage.setItem(
                    `${ID}-RecentlyViewedItems`,
                    JSON.stringify(filteredItems)
                  );
                });
              }
            }
          });

          if (document.querySelector(`.${ID}-loader-container`)) {
            document.querySelector(`.${ID}-loader-container`).remove();
          }

          const addMostPopularItems = (data) => {
            data.forEach((item) => {
              if (!recentlyViewedItems.includes(item.url)) {
                const productElement = document.createElement("div");
                productElement.classList.add("swiper-slide");
                productElement.innerHTML = /* HTML */ `
                  <div class="${ID}-product ${ID}-suggested">
                    <a href="${item.url}">
                      <div class="${ID}-product-image">
                        <img src="${item.image}" alt="${item.name}" />
                      </div>
                    </a>
                    <a href="${item.url}">
                      <h4>${item.name}</h4>
                    </a>
                    <a class="${ID}-suggested-product-text"
                      >Suggested for you</a
                    >
                  </div>
                `;

                swiper.addSlide(swiper.length, productElement);
              }
            });
          };

          const hasProducts = !!document.querySelector(`.${ID}-product a`);

          const staticMostPopularData = [
            {
              url: "https://www.boots.com/flowflex-antigen-rapid-test-lateral-flow-self-testing-kit-5-tests-10312496",
              name: "Flowflex Antigen Rapid Test Lateral Flow Self-Testing Kit 5 Tests",
              image:
                "https://boots.scene7.com/is/image/Boots/10312496?op_sharpen=1",
            },
            {
              url: "https://www.boots.com/estee-lauder-double-wear-stay-in-place-makeup-spf-10-30ml-10249140",
              name: "Estée Lauder Double Wear Stay-in-Place Foundation SPF 10 30ml",
              image:
                "https://boots.scene7.com/is/image/Boots/10249140?op_sharpen=1",
            },
            {
              url: "https://www.boots.com/the-ordinary-niacinamide-10-percent-and-zinc-1-percent-s-10277847",
              name: "The Ordinary Niacinamide 10% & Zinc 1% S 60ml",
              image:
                "https://boots.scene7.com/is/image/Boots/10277847?op_sharpen=1",
            },
            {
              url: "https://www.boots.com/soap-and-glory-a-blooming-glorious-collection-10306644",
              name: "Soap & Glory A Blooming Glorious Collection",
              image:
                "https://boots.scene7.com/is/image/Boots/10306644?op_sharpen=1",
            },
            {
              url: "https://www.boots.com/the-ordinary-natural-moisturizing-factors-and-ha-100ml-10279249",
              name: "The Ordinary Natural Moisturizing Factors & HA 100ml",
              image:
                "https://boots.scene7.com/is/image/Boots/10279249?op_sharpen=1",
            },
            {
              url: "https://www.boots.com/maybelline-eraser-eye-concealer-10154633p",
              name: "Maybelline Eraser Eye Concealer",
              image:
                "https://boots.scene7.com/is/image/Boots/10154633?op_sharpen=1",
            },
          ];

          if (hasProducts) {
            const fetchUrl = document
              .querySelector(`.${ID}-product a`)
              .href.match(/([^/]+$)/)[0];

            fetch(
              `https://optimisation-data-projects.nw.r.appspot.com/boots_lookalikey/get_lookalikey?url=/${fetchUrl}`
            )
              .then((res) => res.json())
              .then((d) => {
                const recommendedData = Object.keys(d.recs).map((r) =>
                  d.recs[r].recommended_algolia_id.toString()
                );

                fetchAlgoliaResults(recommendedData).then((d) => {
                  const mostPopularData = d
                    .map((el) => {
                      if (el)
                        return {
                          url: el.actionURL,
                          name: el.offerName,
                          image: el.referenceImageURL,
                        };
                    })
                    .filter((i) => i != undefined);

                  if (mostPopularData.length > 4) {
                    addMostPopularItems(mostPopularData);
                  } else {
                    addMostPopularItems(staticMostPopularData);
                  }
                });
              })
              .catch(() => addMostPopularItems(staticMostPopularData));
          } else {
            addMostPopularItems(staticMostPopularData);
          }
        });

        const hideButton = rootElement.querySelector(
          "[data-hide-recently-viewed]"
        );
        const recentlyViewedCarousel = rootElement.querySelector(
          "[data-recently-viewed-carousel"
        );

        hideButton.addEventListener("click", () => {
          fireEvent("User toggled carousel visibility");

          if (localStorage.getItem(`${ID}-carousel-state`) === "closed") {
            recentlyViewedCarousel.classList.remove(`${ID}-hidden`);
            localStorage.setItem(`${ID}-carousel-state`, "open");
            hideButton.innerText = "Hide";
          } else {
            recentlyViewedCarousel.classList.add(`${ID}-hidden`);
            localStorage.setItem(`${ID}-carousel-state`, "closed");
            hideButton.innerText = "Show me";
          }
        });
      }
    });

    // Tracking
    pollerLite([`.${ID}-product`], () => {
      const recentProducts = document.querySelectorAll(`.${ID}-product`);

      recentProducts.forEach((product) =>
        product.addEventListener("click", () =>
          fireEvent(
            `${ID} Variation ${VARIATION} - User clicked on recently viewed product`
          )
        )
      );
    });

    pollerLite([`.${ID}-root`], () => {
      fireEvent(
        `${ID} Variation ${VARIATION} - Recently viewed component rendered`
      );
    });
    // End Tracking
  }
};
