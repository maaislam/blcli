import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import {
  insertAfterElement,
  sendHttpRequest,
  pollerLite,
} from "../../../../../lib/utils";
import colourSelect from "./components/colourSelect";
import purchaseOptions from "./components/purchaseOptions";
import starterKit from "./components/starterKit";
import subscriptionPanel from "./components/subscriptionPanel";
import imageStore from "./data/carouselImages";
import imageCarousel from "./components/imageCarousel";
import addToBasket from "./components/addToBasket";
import successMessage from "./components/successMessage";
import extraSlider from "./components/extraSlider";
import bottomContent from "./components/bottomContent";
import pageChanges from "./components/pageChanges";
import uspCircles from "./components/uspCircles";
import ProductTabs from "./components/productTabs";
import notificationTray from "./components/notificationTray";
import trayProduct from "./components/trayProduct";
import trayCarousel from "./components/trayCarousel";
// import starterKits from "./data/starterKits";
// import extras from "./data/extras";

export const fetchNewBasket = async () => {
  const page = await fetch(window.location.href);
  const html = await page.text();
  const data = new DOMParser().parseFromString(html, "text/html");
  const newBasket = data.querySelector("#mini-cart .mini-cart-wrapper");
  const oldBasket = document.querySelector("#mini-cart .mini-cart-wrapper");
  const quantityField = document.querySelector(
    "#mini-cart .minicart-total-qty"
  );
  const newQuantity = newBasket.getAttribute("data-qty");

  insertAfterElement(oldBasket, newBasket);

  quantityField.textContent = newQuantity;

  oldBasket.remove();
};

export default (starterKits, extras) => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  class State {
    constructor(initialVal, effect) {
      this.state = initialVal;
      this.setState = this.setState.bind(this);
      this.effect = effect || null;
    }

    setState(val) {
      this.state = val;
      if (this.effect) this.effect();
    }
  }

  const globalState = {
    products: new State([]),
    velvetiserName: new State(0, () => {
      const pageTitle = document.querySelector("#main h1");
      pageTitle.textContent = globalState.velvetiserName.state;
    }),
    bundleItemName: new State(0),
    colour: new State(0),
    velvetiserId: new State(0, () => {
      globalState.products.state = [
        globalState.velvetiserId.state,
        globalState.starterKitId.state,
      ];
    }),
    purchaseOption: new State(0, () => {
      const wishlist = document.querySelector(".wishlist-wrapper");

      if (globalState.purchaseOption.state && VARIATION != 3) {
        wishlist.style.display = "none";
      } else {
        wishlist.style.display = "block";
      }
    }),
    starterKitId: new State(0, () => {
      globalState.products.state = [
        globalState.velvetiserId.state,
        globalState.starterKitId.state,
      ];
    }),
    currentPrice: new State(99.95, () => {
      document.querySelector(
        `.${ID}-add-to-basket`
      ).textContent = `Add to bag - £${globalState.currentPrice.state}`;
    }),
  };

  const pageTitle = document.querySelector("#main h1");

  // Onload Get Velvetiser SKU
  const pageLoadVelvetiserId = document.querySelector(
    '[itemprop="productID"]'
  ).textContent;

  switch (pageLoadVelvetiserId) {
    case "472726":
      globalState.colour.setState("copper");
      globalState.velvetiserName.setState("The Velvetiser - Copper Edition");
      globalState.velvetiserId.setState(472726);
      pageTitle.textContent = "The Velvetiser - Copper Edition";
      break;
    case "472727":
      globalState.colour.setState("charcoal");
      globalState.velvetiserName.setState("The Velvetiser - Charcoal Edition");
      globalState.velvetiserId.setState(472727);
      pageTitle.textContent = "The Velvetiser - Charcoal Edition";
      break;
    case "472725":
      globalState.colour.setState("white");
      globalState.velvetiserName.setState("The Velvetiser - White Edition");
      globalState.velvetiserId.setState(472725);
      pageTitle.textContent = "The Velvetiser - White Edition";
      break;
    case "472809":
      globalState.colour.setState("platinum");
      globalState.velvetiserName.setState("The Velvetiser - Platinum Edition");
      globalState.velvetiserId.setState(472809);
      pageTitle.textContent = "The Velvetiser - Platinum Edition";
      break;
  }

  // Subscription Price
  const productPrice = document.querySelector(".price-wrapper");
  productPrice.insertAdjacentHTML(
    "afterbegin",
    /* HTML */ `
      <div class="${ID}-top-subscription-price">
        <span class="${ID}-new-price">£49.95</span>
        <span class="${ID}-old-price">£99.95</span>
      </div>
    `
  );

  // Image Carousel
  const carouselEntry = document.querySelector(
    ".product-col-1.product-image-container"
  );
  carouselEntry.prepend(imageCarousel(imageStore[globalState.colour.state]));

  // Colour Select
  const entryEl = document.getElementsByClassName("product-number")[0];
  insertAfterElement(
    entryEl,
    colourSelect(globalState.colour.state, (e) => {
      e.preventDefault();
      globalState.colour.setState(e.target.dataset.colour);
      globalState.velvetiserId.setState(e.target.dataset.sku);
      globalState.velvetiserName.setState(e.target.dataset.productName);

      const buttons = document.querySelectorAll("[data-colour-select-button]");

      buttons.forEach((button) => {
        button.classList.remove(`${ID}-active`);

        if (button.dataset.colour === globalState.colour.state) {
          button.classList.add(`${ID}-active`);
        }
      });

      carouselEntry.prepend(
        imageCarousel(imageStore[globalState.colour.state])
      );
    })
  );

  // Add to Basket
  insertAfterElement(
    document.querySelector(`.${ID}-colour-select`),
    addToBasket((e) => {
      e.preventDefault();

      document
        .querySelector(`.${ID}-add-to-basket`)
        .classList.add(`${ID}-disabled`);

      if (VARIATION != "1") {
        sendHttpRequest(
          "POST",
          "https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax",
          `Quantity=1&cartAction=add&pid=${globalState.velvetiserId.state}`
        )
          .then(() => fetchNewBasket())
          .catch(() => console.log("-- failed to add item to cart"));

        document.getElementById("pdpMain").prepend(notificationTray());

        const notificationTrayEl = document.querySelector(
          `.${ID}-notification`
        );

        notificationTrayEl.classList.remove(`${ID}-notification--closed`);
        notificationTrayEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        const resetEverything = (e) => {
          e.preventDefault();

          notificationTrayEl.remove();

          document
            .querySelector(`.${ID}-add-to-basket`)
            .classList.remove(`${ID}-disabled`);

          if (document.querySelector(`.${ID}-success-message`)) {
            document.querySelector(`.${ID}-success-message`).remove();
          }
          if (document.querySelector(`.${ID}-extras`)) {
            document.querySelector(`.${ID}-extras`).remove();
          }

          globalState.starterKitId.setState(0);
          globalState.bundleItemName.setState(0);

          document
            .querySelector(`.${ID}-purchase-option__button.${ID}-active`)
            .classList.remove(`${ID}-active`);

          document.querySelector(`.${ID}-add-to-basket`).textContent =
            "Add to bag";

          globalState.purchaseOption.setState(0);

          document
            .querySelector(`.${ID}-add-to-basket`)
            .classList.add(`${ID}-disabled`);
        };

        const notifyProductAdd = (image, name, price) => {
          const trayProductContainer = document.querySelector(
            "[data-notification-product]"
          );

          trayProductContainer.append(
            trayProduct(image, name, price, (e) => resetEverything(e))
          );
        };

        const showExtras = (products, heading, subheading, onClick) => {
          const trayExtrasContainer = document.querySelector(
            "[data-notification-extras-container]"
          );

          trayExtrasContainer.append(
            trayCarousel(products, heading, subheading, onClick)
          );
        };

        notifyProductAdd(
          document.querySelector("[data-image-carousel-slide]").src,
          globalState.velvetiserName.state,
          globalState.currentPrice.state
        );

        showExtras(
          starterKits,
          "Make the most of your Velvetiser...",
          "Buy your starter kit now and save",
          (e) => {
            fireEvent("User added starter kit bundle");

            notifyProductAdd(
              e.target.parentElement.querySelector("img").src,
              e.target.parentElement.querySelector("h5").textContent,
              e.target.parentElement
                .querySelector(`.${ID}-starter-kit-card__price-is`)
                .textContent.slice(1)
            );

            fetchNewBasket();

            showExtras(
              extras,
              "Add a little extra?",
              "Enhance your home barista experience!",
              (e) => {
                fireEvent("User extra to bag");

                notifyProductAdd(
                  e.target.parentElement.querySelector("img").src,
                  e.target.parentElement.querySelector("h5").textContent,
                  e.target.parentElement
                    .querySelector(`.${ID}-starter-kit-card__price-is`)
                    .textContent.slice(1)
                );

                document
                  .querySelector("[data-notification-extras-toggle]")
                  .click();

                fetchNewBasket();
              }
            );
          }
        );

        const closeButton = document.querySelector("[data-notification-close]");
        closeButton.addEventListener("click", (e) => resetEverything(e));
      }

      if (VARIATION == "1") {
        globalState.products.state.forEach((product) => {
          sendHttpRequest(
            "POST",
            "https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax",
            `Quantity=1&cartAction=add&pid=${product}`
          ).then(() => fetchNewBasket());
        });

        insertAfterElement(
          document.querySelector(`.${ID}-add-to-basket`),
          successMessage(
            globalState.velvetiserName.state,
            globalState.bundleItemName.state,
            (e) => {
              e.preventDefault();
              if (document.querySelector(`.${ID}-success-message`)) {
                document.querySelector(`.${ID}-success-message`).remove();
              }
              if (document.querySelector(`.${ID}-extras`)) {
                document.querySelector(`.${ID}-extras`).remove();
              }

              globalState.starterKitId.setState(0);
              globalState.bundleItemName.setState(0);

              document
                .querySelector(`.${ID}-purchase-option__button.${ID}-active`)
                .classList.remove(`${ID}-active`);

              document.querySelector(`.${ID}-add-to-basket`).textContent =
                "Add to bag";

              globalState.purchaseOption.setState(0);
            }
          )
        );

        document.querySelector(`.${ID}-starter-kit`).remove();

        insertAfterElement(
          document.querySelector(`.${ID}-success-message`),
          extraSlider(extras)
        );
      }
    }, globalState.currentPrice.state)
  );

  const resetEverything = () => {
    if (document.querySelector(`.${ID}-notification`)) {
      document.querySelector(`.${ID}-notification`).remove();
    }
    if (document.querySelector(`.${ID}-success-message`)) {
      document.querySelector(`.${ID}-success-message`).remove();
    }
    if (document.querySelector(`.${ID}-extras`)) {
      document.querySelector(`.${ID}-extras`).remove();
    }
    if (document.querySelector(`.${ID}-starter-kit`)) {
      document.querySelector(`.${ID}-starter-kit`).remove();
    }
    if (document.querySelector(`.${ID}-subscription-panel`)) {
      document.querySelector(`.${ID}-subscription-panel`).remove();
      document
        .querySelector(`.${ID}-add-to-basket__container`)
        .classList.remove(`${ID}-hidden`);
    }

    globalState.currentPrice.setState(
      parseFloat(
        document
          .querySelector(".product-price .price-sales")
          .textContent.slice(1)
      )
    );

    globalState.starterKitId.setState(0);
    globalState.bundleItemName.setState(0);

    if (document.querySelector(`.${ID}-purchase-option__button.${ID}-active`)) {
      document
        .querySelector(`.${ID}-purchase-option__button.${ID}-active`)
        .classList.remove(`${ID}-active`);
    }

    document.querySelector(`.${ID}-add-to-basket`).textContent = "Add to bag";

    globalState.purchaseOption.setState(0);

    document
      .querySelector(`.${ID}-add-to-basket`)
      .classList.add(`${ID}-disabled`);

    document
      .querySelector(`.${ID}-top-subscription-price`)
      .classList.remove(`${ID}-visible`);
  };

  // Purchase Option
  insertAfterElement(
    document.querySelector(`.${ID}-colour-select`),
    purchaseOptions((e) => {
      e.preventDefault();

      fireEvent(
        `User selected payment option '${e.target.dataset.purchaseOption}'`
      );

      if (
        globalState.purchaseOption.state === e.target.dataset.purchaseOption &&
        (VARIATION == 1 || VARIATION == 2)
      ) {
        resetEverything();
        return;
      }

      if (
        VARIATION == 3 &&
        globalState.purchaseOption.state === "once" &&
        e.target.dataset.purchaseOption === "once"
      )
        return;

      globalState.purchaseOption.setState(e.target.dataset.purchaseOption);

      const buttons = document.querySelectorAll(
        `.${ID}-purchase-option__button`
      );

      buttons.forEach((button) => {
        button.classList.remove(`${ID}-active`);

        if (
          button.dataset.purchaseOption === globalState.purchaseOption.state
        ) {
          button.classList.add(`${ID}-active`);
        }
      });

      if (globalState.purchaseOption.state === "subscription") {
        globalState.currentPrice.setState(49.95);

        document
          .querySelector(`.${ID}-top-subscription-price`)
          .classList.add(`${ID}-visible`);

        if (document.querySelector(`.${ID}-starter-kit`)) {
          document.querySelector(`.${ID}-starter-kit`).remove();
        }

        document
          .querySelector(`.${ID}-add-to-basket__container`)
          .classList.add(`${ID}-hidden`);

        if (document.querySelector(`.${ID}-success-message`)) {
          document.querySelector(`.${ID}-success-message`).remove();
        }

        if (document.querySelector(`.${ID}-extras`)) {
          document.querySelector(`.${ID}-extras`).remove();
        }

        if (!document.querySelector(`.${ID}-subscription-panel`)) {
          insertAfterElement(
            document.querySelector(`.${ID}-purchase-option`),
            subscriptionPanel()
          );
        }
      }

      if (globalState.purchaseOption.state === "once") {
        globalState.currentPrice.setState(
          parseFloat(
            document
              .querySelector(".product-price .price-sales")
              .textContent.slice(1)
          )
        );

        document
          .querySelector(`.${ID}-add-to-basket`)
          .classList.remove(`${ID}-disabled`);

        document
          .querySelector(`.${ID}-top-subscription-price`)
          .classList.remove(`${ID}-visible`);

        if (document.querySelector(`.${ID}-subscription-panel`)) {
          document.querySelector(`.${ID}-subscription-panel`).remove();
          document
            .querySelector(`.${ID}-add-to-basket__container`)
            .classList.remove(`${ID}-hidden`);
        }

        if (document.querySelector(`.${ID}-success-message`)) {
          document.querySelector(`.${ID}-success-message`).remove();
        }

        if (document.querySelector(`.${ID}-extras`)) {
          document.querySelector(`.${ID}-extras`).remove();
        }

        if (VARIATION == "1") {
          if (!document.querySelector(`.${ID}-starter-kit`)) {
            insertAfterElement(
              document.querySelector(`.${ID}-purchase-option`),
              starterKit(
                globalState.starterKitId.setState,
                globalState.currentPrice.setState,
                globalState.currentPrice.state,
                globalState.bundleItemName.setState,
                starterKits
              )
            );
          }
        }
      }
    })
  );

  if (VARIATION == "3") {
    document.querySelector('[data-purchase-option="once"').click();
  }

  bottomContent();
  pageChanges();
  pollerLite([".recommendations"], () => {
    uspCircles();
  });

  if (window.innerWidth > 767) {
    new ProductTabs();
  }

  const addYTapi = () => {
    var tag = document.createElement("script");
    tag.className = `youtube`;
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  };

  addYTapi();

  /* eslint-disable */
  let player;

  function readyYoutube() {
    if (typeof YT !== "undefined" && YT && YT.Player) {
      player = new YT.Player("player", {
        height: "100%",
        width: "100%",
        videoId: "Xx5CwfpjToE",
        events: {
          onStateChange: onPlayerStateChange,
        },
      });

      let done = false;

      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          fireEvent("Clicked play video");
          done = true;
        }
      }
    } else {
      setTimeout(readyYoutube, 1000);
    }
  }
  readyYoutube();
  /* eslint-enable */

  insertAfterElement(
    document.querySelector(".product-col-2"),
    document.querySelector(".product-detail")
  );

  const topContentWrapper = document.createElement("div");
  topContentWrapper.classList.add(`${ID}-top-content`);
  topContentWrapper.append(document.querySelector(".product-col-1"));
  topContentWrapper.append(document.querySelector(".product-col-2"));

  insertAfterElement(
    document.getElementById("page_heading"),
    topContentWrapper
  );
};
