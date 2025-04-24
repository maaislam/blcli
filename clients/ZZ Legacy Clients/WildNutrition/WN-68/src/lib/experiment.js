/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  function trackCarouselInteraction() {
    const observer = new MutationObserver((mutations) => {
      for (let i = 0; i < mutations.length; i += 1) {
        if (
          mutations[i].target.classList.contains(
            "prd-ProductImage_Slide-active"
          ) &&
          mutations[i].oldValue !==
            "prd-ProductImage_Slide prd-ProductImage_Slide-gallery glide__slide js-ProductGallery_Slide prd-ProductImage_Slide-active"
        ) {
          fireEvent("User interacted with carousel");
        }
      }
    });

    const observerOptions = {
      childList: true,
      subtree: true,
      attributeFilter: ["class"],
      attributes: true,
      attributeOldValue: true,
    };

    const desktopCarousel = document.querySelector(
      ".prd-Product_Image-desktop .prd-ProductImage_Slides"
    );
    const mobileCarousel = document.querySelector(
      ".prd-Product_Image-mobile .prd-ProductImage_Slides"
    );

    if (window.innerWidth < 768) {
      observer.observe(mobileCarousel, observerOptions);
    } else {
      observer.observe(desktopCarousel, observerOptions);
    }
  }

  if (VARIATION == "control") {
    trackCarouselInteraction();

    return;
  }

  function swapImages(elements, idx1, idx2) {
    const images = document.querySelectorAll(elements);

    const image1 = images[idx1].querySelector(".rsp-Image");
    const parent1 = image1.parentElement;

    const image2 = images[idx2].querySelector(".rsp-Image");
    const parent2 = image2.parentElement;

    parent1.append(image2);
    parent2.append(image1);
  }

  if (
    window.location.href.includes(
      "https://www.wildnutrition.com/products/food-grown-breast-feeding-complex"
    ) ||
    window.location.href.includes(
      "https://www.wildnutrition.com/products/botanical-menopause-complex"
    )
  ) {
    swapImages(".prd-ProductImage_Thumbnail", 0, 3);
    swapImages(".prd-Product_Image-desktop .prd-ProductImage_Slide", 0, 3);
    swapImages(".prd-Product_Image-mobile .prd-ProductImage_Slide", 0, 3);
  }

  if (
    window.location.href.includes(
      "https://www.wildnutrition.com/products/food-grown-pregnancy"
    ) ||
    window.location.href.includes(
      "https://www.wildnutrition.com/products/vegan-protein"
    )
  ) {
    swapImages(".prd-ProductImage_Thumbnail", 0, 1);
    swapImages(".prd-Product_Image-desktop .prd-ProductImage_Slide", 0, 1);
    swapImages(".prd-Product_Image-mobile .prd-ProductImage_Slide", 0, 1);
  }

  trackCarouselInteraction();
};
