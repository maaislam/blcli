import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

export default () => {
  const { VARIATION } = shared;

  setup();

  if (VARIATION == "control") {
    return;
  }

  const checkPlpItems = () => {
    fireEvent("Conditions Met");
    const products = document.querySelectorAll(".product-tile");

    products.forEach((product) => {
      const image = product.querySelector("img");

      if (
        image.src ===
          "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw60a23b70/images/263393-2.gif?sw=875&sh=875&sm=fit" ||
        image.src ===
          "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwac9da686/images/263395-2.gif?sw=500&sh=500&sm=fit"
      ) {
        return;
      }

      switch (product.dataset.itemid) {
        case "263393":
        case "just-to-say-collection":
          if (VARIATION === "1") {
            image.src =
              "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw60a23b70/images/263393-2.gif?sw=875&sh=875&sm=fit";
          }
          if (VARIATION === "2") {
            image.src =
              "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw3e8ddf34/images/263393-1.jpg?sw=875&sh=875&sm=fit";
          }
          break;
        case "263395":
        case "straight-from-the-heart-valentine-chocolates":
          if (VARIATION === "1") {
            image.src =
              "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwac9da686/images/263395-2.gif?sw=500&sh=500&sm=fit";
          }
          if (VARIATION === "2") {
            image.src =
              "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw5589665a/images/263395-1.jpg?sw=500&sh=500&sm=fit";
          }
          break;
        default:
          return;
      }
    });
  };

  const mutationObserver = new MutationObserver((entries) => {
    entries.forEach((entry) => {
      if (
        entry &&
        entry.addedNodes.length !== 0 &&
        entry.addedNodes[0].nodeName === "DIV"
      ) {
        checkPlpItems();
      }
    });
  });

  const productList = document.querySelector(".search-result-content");

  pollerLite([".search-result-content .grid-tile"], () => {
    checkPlpItems();
    mutationObserver.observe(productList, {
      attributes: false,
      childList: true,
      subtree: true,
    });
  });

  const checkPdpImage = () => {
    fireEvent("Conditions Met");

    const imageButtons = document.querySelectorAll(
      ".product-thumbnails > .thumb"
    );

    const spamImageClick = (el) => {
      el.querySelector("img").click();
      if (!el.classList.contains("selected")) {
        setTimeout(() => spamImageClick(el), 100);
      }
    };

    if (VARIATION === "1") {
      imageButtons[0].parentElement.appendChild(imageButtons[0]);
      spamImageClick(imageButtons[1]);
    }

    if (VARIATION === "2") {
      imageButtons[0].parentElement.appendChild(imageButtons[0]);
      imageButtons[1].parentElement.appendChild(imageButtons[1]);
      spamImageClick(imageButtons[2]);
    }
  };

  const checkPdpSlickImage = () => {
    const slick = document.querySelector(
      ".product-image-container .slick-slider"
    );

    if (slick) {
      const slides = document.querySelectorAll(
        ".product-image-container .thumb.slick-slide"
      );

      if (VARIATION === "1") {
        slides[0].parentElement.appendChild(slides[0]);
      }

      if (VARIATION === "2") {
        slides[0].parentElement.appendChild(slides[0]);
        slides[1].parentElement.appendChild(slides[1]);
      }
    }
  };

  pollerLite([".pdp-main .product-primary-image"], () => {
    checkPdpImage();
    pollerLite(["#carousel-recommendations"], () => checkPlpItems());
  });

  pollerLite([".pdp-main .product-image-container > .slick-slider"], () => {
    checkPdpSlickImage();
    pollerLite(["#carousel-recommendations"], () => checkPlpItems());
  });
};
