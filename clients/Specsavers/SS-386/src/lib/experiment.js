/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import Swiper, { Navigation, Pagination } from "swiper";

const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  if (VARIATION == "control") {
    return;
  }

  Swiper.use([Navigation, Pagination]);

  new MutationObserver((mutations) => {
    for (let i = 0; i < mutations.length; i++) {
      if (mutations[i].addedNodes.length > 0) {
        renderVoucherSlider();
      }
    }
  }).observe(document.querySelector("body"), {
    childList: true,
    subtree: true,
  });

  function appendVouchersToSlider() {
    const slider = document.querySelector(`.${ID}-slider .swiper-wrapper`);
    const vouchers = document.querySelectorAll(".store-voucher");

    vouchers.forEach((voucher, idx) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.append(voucher.cloneNode(true));

      slider.append(slide);

      const voucherTitle = vouchers[idx]
        .querySelector("h3.store-voucher__title")
        .innerText.trim();

      new IntersectionObserver((i) => {
        if (i[0].isIntersecting) {
          fireEvent(`Voucher in view (${idx + 1})(${voucherTitle})`);
        }
      }).observe(slide);

      slide
        .querySelector(".specs-button.store-voucher__view-details-link")
        .addEventListener("click", () => {
          vouchers[idx]
            .querySelector(".specs-button.store-voucher__view-details-link")
            .click();

          const code = vouchers[idx]
            .querySelector(".store-voucher__code")
            ?.innerText.trim();

          document.body.setAttribute("data-voucher-idx", idx);

          if (code) {
            document.body.setAttribute("data-voucher-code", code);
          } else {
            document.body.removeAttribute("data-voucher-code");
          }

          fireEvent(`Click CTA (${idx + 1})(${voucherTitle})`);
        });
    });
  }

  function renderVoucherSlider() {
    if (document.querySelector(`.${ID}-root`)) {
      return;
    }

    const overviewContainer = document.querySelector(
      "div.store-overview-group__container"
    );
    const sliderContainer = document.createElement("div");

    sliderContainer.classList.add(`${ID}-root`);
    overviewContainer.append(sliderContainer);

    const amountOfOffers = document.querySelectorAll(".store-voucher").length;

    const Slider = `
		<div class="${ID}-slider-info">
			<p>${amountOfOffers} offer${
      amountOfOffers != 1 ? "s" : ""
    } currently available</p>
		</div>
		<div class="swiper ${ID}-slider">
      <div class="swiper-wrapper">
      </div>
			<div class="swiper-nav-container">
   			<div class="${ID}-swiper-button-prev">
   				<button>< Previous offer</button>
   			</div>
   			<div class="swiper-pagination"></div>
   			<div class="${ID}-swiper-button-next">
   				<button>Next offer ></button>
   			</div>
   		</div>
    </div>
		`;

    sliderContainer.insertAdjacentHTML("beforeend", Slider);

    appendVouchersToSlider();

    const swiper = new Swiper(`.${ID}-slider`, {
      spaceBetween: 20,
      navigation: {
        nextEl: `.${ID}-swiper-button-next button`,
        prevEl: `.${ID}-swiper-button-prev button`,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });

    swiper.on("activeIndexChange", () => {
      fireEvent(`Swipe (${swiper.activeIndex + 1})`);
    });

    (function reorderDOM() {
      document.getElementById("vouchers-banner").remove();

      document
        .querySelector(".specs-star-rating.general-information__rating")
        .insertAdjacentElement(
          "afterend",
          document.querySelector(".general-information__tooltip")
        );

      document
        .querySelector(".book-appointment-button__cta-container")
        .prepend(document.querySelector(".specs-info-item.store-availability"));

      function switchPosition() {
        const newVoucherContainer = document.querySelector(`.${ID}-root`);
        const mapContainer = document.querySelector(
          "section.store-map-section"
        );
        const storeDetailsContainer = document.querySelector(
          "section.store-details"
        );

        if (window.innerWidth >= 768) {
          storeDetailsContainer.append(mapContainer);
        } else {
          newVoucherContainer.append(mapContainer);
        }
      }

      switchPosition();

      window.addEventListener("resize", () => switchPosition());
    })();

    (function renameVoucherCta() {
      const ctas = document.querySelectorAll(
        ".store-voucher__view-details-link"
      );
      ctas.forEach((cta) => {
        cta.innerHTML = "View details & how to claim";
      });
    })();

    function editModal(voucherCode) {
      const modal = document.querySelector("#vouchers-modal");

      const printButton = document.createElement("button");
      printButton.classList.add(`${ID}-print-button`);
      printButton.textContent = "Print voucher";

      printButton.addEventListener("click", () => {
        const vouchers = document.querySelectorAll(
          "#vouchers_section .store-voucher"
        );

        vouchers[document.body.getAttribute("data-voucher-idx")]
          .querySelector(".specs-button.store-voucher__print-cta")
          .click();
      });

      modal
        .querySelector(".specs-card.info-box.vouchers__modal-additional-notes")
        .insertAdjacentElement("afterend", printButton);

      if (voucherCode) {
        const voucherCodeText = document.createElement("div");
        voucherCodeText.classList.add(`${ID}-voucher-code-text`);
        voucherCodeText.innerHTML = `
					<p>Use this code in store <span>${voucherCode}</span></p>
				`;

        modal
          .querySelector(
            ".specs-card.info-box.vouchers__modal-additional-notes"
          )
          .insertAdjacentElement("afterend", voucherCodeText);
      }
    }

    (function watchModal() {
      new MutationObserver((mutations) => {
        for (let i = 0; i < mutations.length; i++) {
          if (mutations[i].addedNodes[0]?.classList?.contains("specs-modal")) {
            editModal(document.body.getAttribute("data-voucher-code") || false);
          }
        }
      }).observe(document.querySelector("#main"), {
        childList: true,
        subtree: true,
      });
    })();
  }
};
