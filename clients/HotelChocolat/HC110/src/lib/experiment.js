import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

export default () => {
  const { VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");

  if (VARIATION == "control") {
    return;
  }

  const imageData = {
    "ostrich-egg-classic": {
      v1: "https://blcro.fra1.digitaloceanspaces.com/HC110/300774-ind.jpg",
      v2: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw177c7cde/images/300774-3.gif?sw=500&sh=500&sm=fit",
    },
    "patisserie-chocolate-ostrich-easter-egg": {
      v1: "https://blcro.fra1.digitaloceanspaces.com/HC110/300789-ind.jpg",
      v2: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwb2422b91/images/300789-3.gif?sw=500&sh=500&sm=fit",
    },
    "ostrich-egg-dark": {
      v1: "https://blcro.fra1.digitaloceanspaces.com/HC110/300775-ind.jpg",
      v2: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw8bc9d98f/images/300775-3.gif?sw=500&sh=500&sm=fit",
    },
    "unbelievably-vegan-ostrich-easter-egg": {
      v1: "https://blcro.fra1.digitaloceanspaces.com/HC110/300790-ind.jpg",
      v2: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw9db72ce8/images/300790-3.gif?sw=500&sh=500&sm=fit",
    },
  };

  const getImageFromId = (id, ogimage) => {
    switch (id) {
      case "ostrich-egg-classic":
      case "/uk/shop/easter-eggs/ostrich-egg-classic.html":
        if (VARIATION === "1") {
          return imageData["ostrich-egg-classic"].v1;
        }
        if (VARIATION === "2") {
          return imageData["ostrich-egg-classic"].v2;
        }
        break;
      case "patisserie-chocolate-ostrich-easter-egg":
      case "/uk/shop/easter-eggs/patisserie-chocolate-ostrich-easter-egg.html":
        if (VARIATION === "1") {
          return imageData["patisserie-chocolate-ostrich-easter-egg"].v1;
        }
        if (VARIATION === "2") {
          return imageData["patisserie-chocolate-ostrich-easter-egg"].v2;
        }
        break;
      case "ostrich-egg-dark":
      case "/uk/shop/easter-eggs/ostrich-egg-dark.html":
        if (VARIATION === "1") {
          return imageData["ostrich-egg-dark"].v1;
        }
        if (VARIATION === "2") {
          return imageData["ostrich-egg-dark"].v2;
        }
        break;
      case "unbelievably-vegan-ostrich-easter-egg":
      case "/uk/unbelievably-vegan-ostrich-easter-egg.html":
        if (VARIATION === "1") {
          return imageData["unbelievably-vegan-ostrich-easter-egg"].v1;
        }
        if (VARIATION === "2") {
          return imageData["unbelievably-vegan-ostrich-easter-egg"].v2;
        }
        break;
      default:
        return ogimage;
    }
  };

  const checkImage = (el) => {
    const elImage = el.querySelector(".thumb-link > img");
    const newImage = getImageFromId(el.dataset.itemid, elImage.src);
    elImage.src = newImage;

    if (
      Object.keys(imageData).includes(el.dataset.itemid) &&
      !Object.values(imageData).includes(elImage.src)
    ) {
      new MutationObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target.src !== newImage) {
            entry.target.src = newImage;
          }
        });
      }).observe(elImage, { attributes: true });

      el.addEventListener("click", () =>
        fireEvent(`PLP item clicked - ${el.dataset.itemid}`)
      );
    }
  };

  const mutationObserver = new MutationObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.addedNodes.length > 0) {
        entry.addedNodes.forEach((node) => {
          if (node.nodeName === "UL") {
            const productListItems = node.querySelectorAll(
              ".grid-tile .product-tile"
            );
            productListItems.forEach((product) => checkImage(product));
          }
        });
      }
    });
  });

  const runPLPCheck = (parentEl) => {
    const productList = parentEl.querySelector(".search-result-content");
    const productListItems = parentEl.querySelectorAll(
      ".search-result-items .grid-tile .product-tile"
    );

    pollerLite([".search-result-items .grid-tile"], () => {
      productListItems.forEach((product) => checkImage(product));
      mutationObserver.observe(productList, { childList: true });
    });
  };

  runPLPCheck(document);

  pollerLite([".search-result-items"], () => {
    new MutationObserver((entries) => {
      entries.forEach((entry) => {
        entry.addedNodes.forEach((node) => {
          if (
            node.nodeName === "DIV" &&
            Array.from(node.classList).includes("primary-content")
          ) {
            runPLPCheck(node);
          }
        });
      });
    }).observe(document.getElementById("main"), { childList: true });
  });

  const checkPdpImage = () => {
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
      const mainImage = document.querySelector(".primary-image");
      const clone = imageButtons[0].cloneNode(true);
      imageButtons[0].parentElement.prepend(clone);

      new MutationObserver((entries) => {
        entries.forEach((entry) => {
          if (
            entry.target.classList.contains("selected") ||
            entry.target.classList.contains("active")
          ) {
            mainImage.src = getImageFromId(window.location.pathname);
          }
        });
      }).observe(clone, { attributes: true });

      spamImageClick(clone);
    }

    if (VARIATION === "2") {
      imageButtons[0].parentElement.prepend(imageButtons[3]);
      spamImageClick(imageButtons[3]);
    }
  };

  pollerLite(
    [".pdp-main", ".product-primary-image", ".pt_product-details"],
    checkPdpImage
  );
};
