import { fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

const { ID } = shared;

const variation1 = () => {
  fireEvent("V1 Code Fired");
  pollerLite([".oct-carousel-hero .swiper-slide"], () => {
    const carousels = document.querySelectorAll(".oct-carousel-hero");

    const runExperiment = (carousel) => {
      const carouselSlides = carousel.querySelectorAll(
        ".swiper-slide:not(.swiper-slide-duplicate)"
      );

      const targetSlide = carouselSlides[2];

      targetSlide.innerHTML = /* HTML */ `
        <div class="${ID}-promo-banner">
          <img
            class="${ID}-promo-background desktop"
            src="https://boots.scene7.com/is/image/Boots/Beauty8a_ID2777_BackgroundHero_No7_RestoreAndRenew_NEW?scl=1&fmt=png-alpha"
            alt=""
          />
          <img
            class="${ID}-promo-background mobile"
            src="https://boots.scene7.com/is/image/Boots/Beauty8a_ID2777_Hero_No7_RestoreAndRenew_NEW_Mobile?scl=1&fmt=png-alpha"
            alt=""
          />
          <div class="${ID}-promo-content">
            <div class="${ID}-promo-logo">
              <img
                src="https://assets.boots.com/content/dam/boots/brands/brand---n/no7/no7-build-a-gift/no7-build-a-gift-2021-10/2021-09_no7_content-page_build-a-gift_logo.dam.ts%3D1634916040550.png"
                alt="No7"
              />
            </div>
            <h3 class="${ID}-promo-heading">3 for 2</h3>
            <p class="${ID}-promo-message">
              on No7's NEW & most powerful multi-benefit Foundation
            </p>
            <div class="${ID}-promo-buttons">
              <a
                href="https://www.boots.com/no7-restore-and-renew-serum-foundation-30ml-spf-30-10300813"
                >Shop now</a
              >
              <a
                href="https://www.boots.com/no7-skincare/no7-skincare-restore-renew"
                >Shop the regime</a
              >
            </div>
            <p class="${ID}-promo-small-print">
              9/10 said their skin felt smoother after two weeks* brought to you
              by the #1 foundation brand in Britain
            </p>
          </div>
        </div>
      `;

      let active = false;

      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fireEvent("Slide active and visible in user's viewport");

          entries[0].target.addEventListener("click", () => {
            fireEvent("Slide clicked by user");
          });
        }
      });

      const mutationObserver = new MutationObserver((entries) => {
        if (
          entries[0].target.classList.contains("swiper-slide-active") &&
          !active
        ) {
          active = true;
          intersectionObserver.observe(targetSlide);
        }

        if (
          !entries[0].target.classList.contains("swiper-slide-active") &&
          active
        ) {
          active = false;
          intersectionObserver.disconnect();
        }
      });

      mutationObserver.observe(targetSlide, { attributes: true });
    };

    carousels.forEach((carousel) => runExperiment(carousel));
  });

  return;
};

export default variation1;
