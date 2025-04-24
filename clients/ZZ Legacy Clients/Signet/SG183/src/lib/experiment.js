/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite, sendHttpRequest } from "../../../../../lib/utils";
import heading from "./components/heading/heading";
import accordion from "./components/accordion/accordion";
import brandCard from "./components/brandCard/brandCard";
import metalCard from "./components/metalCard/metalCard";
import card from "./components/card/card";
import Splide from "@splidejs/splide";

const { ID, VARIATION } = shared;

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  // eslint-disable-next-line no-unused-vars
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  return window.location.hostname.indexOf("ernestjones") > -1
    ? "ernestjones"
    : "hsamuel";
};

/**
 * Activate
 */
export default () => {
  setup();

  fireEvent("Conditions Met");

  const siteIdent = getSiteFromHostname();
  if (siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

  const checkSession = setInterval(function () {
    // eslint-disable-next-line no-unused-vars
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if (
      sessionStorage.getItem("analyticsDataSentFor") &&
      sessionStorage.getItem("analyticsDataSentFor") ===
        window.location.pathname
    ) {
      if (typeof s !== "undefined") {
        // eslint-disable-next-line no-undef
        s.eVar111 = `${ID} - V${VARIATION}`;
        // eslint-disable-next-line no-undef
        s.tl();
      }
      clearInterval(checkSession);
    }
  }, 1000);

  var checkCS = setInterval(function () {
    if (window._uxa) {
      window._uxa = window._uxa || [];
      window._uxa.push([
        "trackDynamicVariable",
        { key: `${ID}`, value: `Variation ${VARIATION}` },
      ]);
      clearInterval(checkCS);
    }
  }, 800);

  if (VARIATION !== "control") {
    console.log("HC183 RAN");

    const sliderOptions = {
      type: "slide",
      updateOnMove: true,
      perPage: 4,
      gap: "1rem",
      arrows: true,
      breakpoints: {
        540: {
          perPage: 1,
          arrows: false,
        },
        900: {
          perPage: 2,
          arrows: true,
        },
        1200: {
          perPage: 3,
        },
      },
    };

    const altSliderOptions = {
      type: "slide",
      updateOnMove: true,
      perPage: 4,
      gap: "1rem",
      arrows: true,
      breakpoints: {
        540: {
          perPage: 2,
          arrows: false,
        },
        900: {
          perPage: 3,
          arrows: true,
        },
      },
    };

    if (getSiteFromHostname() == "ernestjones") {
      if (window.location.pathname === "/webstore/jewellery.do")
        window.location.href =
          "https://www.ernestjones.co.uk/webstore/l/jewellery/";

      const headingData = [
        {
          url: "https://www.ernestjones.co.uk/webstore/l/rings/",
          name: "Rings",
          image: "https://d34qiagx43sg99.cloudfront.net/6017363-1490.webp",
        },
        {
          url: "https://www.ernestjones.co.uk/webstore/l/earrings-jewellery/",
          name: "Earrings",
          image: "https://d34qiagx43sg99.cloudfront.net/3677974-1490.webp",
        },
        {
          url: "https://www.ernestjones.co.uk/webstore/l/necklaces/",
          name: "Necklaces",
          image: "https://d34qiagx43sg99.cloudfront.net/5033071-1490.webp",
        },
        {
          url: "https://www.ernestjones.co.uk/webstore/l/ladies-bracelets/",
          name: "Bracelets",
          image: "https://d34qiagx43sg99.cloudfront.net/3400018-1490.webp",
        },
      ];

      heading(
        ID,
        headingData,
        "/webstore/jewellery.do?icid=hs-nv-jewellery-page"
      );

      const details = [
        {
          text: "Jewellery Brands",
        },
        {
          text: "Jewellery Metal Types",
        },
        {
          text: "The Jewellery Journal Blog",
        },
      ];

      pollerLite(["#seoBanner"], () => {
        const accordionRoot = document.getElementById("seoBanner");

        accordion(ID, details, accordionRoot);

        const getAccordionContent = () =>
          sendHttpRequest(
            "GET",
            "https://www.ernestjones.co.uk/webstore/jewellery.do?icid=ej-tn-jewellery"
          ).then((res) => {
            const temp = document.createElement("html");
            temp.innerHTML = res;
            const content = {
              brands: [],
              categories: [],
              services: [],
            };

            const brandCards = temp.querySelectorAll(
              ".brand-banner__brand-tile"
            );
            const metalCards = temp
              .querySelectorAll(".category-box-grid__content-container")[1]
              .querySelectorAll(
                ".category-box.category-box__link.category-box-grid__link"
              );

            const journalCards = temp.querySelectorAll(
              ".card.card__link.editorial-card-grid"
            );

            brandCards.forEach((card) => {
              const image = card
                .querySelector("picture img")
                .getAttribute("lazy-src");
              const url = card.href;
              const title = card.querySelector("picture img").alt;

              content.brands.push({
                url,
                image,
                title,
              });
            });

            metalCards.forEach((card) => {
              const image = card
                .querySelector("picture img")
                .getAttribute("lazy-src");
              const url = card.href;
              const title = card.querySelector(
                ".category-box__call-to-action"
              ).innerText;

              content.categories.push({
                url,
                image,
                title,
              });
            });

            journalCards.forEach((card) => {
              const image = card
                .querySelector("picture img")
                .getAttribute("lazy-src");
              const url = card.href;
              const title = card.querySelector(".card__title").innerText;
              const description =
                card?.querySelector(".card__body")?.innerText || "";

              content.services.push({
                url,
                image,
                title,
                description,
              });
            });

            return content;
          });

        const accordions = accordionRoot.querySelectorAll(
          `.${ID}-accordion__content`
        );

        accordions.forEach((accordion, idx) => {
          accordion.innerHTML = /* HTML */ `
            <div class="splide" id="splide-${idx + 1}">
              <div class="splide__track">
                <ul class="splide__list"></ul>
              </div>
            </div>
          `;
        });

        const splide1 = new Splide("#splide-1", altSliderOptions);
        const splide2 = new Splide("#splide-2", altSliderOptions);
        const splide3 = new Splide("#splide-3", sliderOptions);

        getAccordionContent().then((res) => {
          res.brands.forEach((brand) => {
            const slide = document.createElement("li");
            slide.classList.add("splide__slide");
            slide.appendChild(
              brandCard(ID, brand.url, brand.title, brand.image)
            );
            splide1.add(slide);
          });

          res.categories.forEach((category) => {
            const slide = document.createElement("li");
            slide.classList.add("splide__slide");
            slide.appendChild(
              metalCard(
                ID,
                category.url,
                category.title,
                category.image,
                null,
                true
              )
            );
            splide2.add(slide);
          });

          res.services.forEach((service) => {
            const slide = document.createElement("li");
            slide.classList.add("splide__slide");
            slide.appendChild(
              card(
                ID,
                service.url,
                service.title,
                service.image,
                service.description
              )
            );
            splide3.add(slide);
          });
        });

        splide1.mount();
        splide2.mount();
        splide3.mount();
        splide3.options = {
          perPage: 3,
        };
      });
    }

    if (getSiteFromHostname() == "hsamuel") {
      if (window.location.pathname === "/webstore/jewellery.do")
        window.location.href =
          "https://www.hsamuel.co.uk/webstore/l/jewellery/";

      const headingData = [
        {
          url: "/webstore/l/rings/",
          name: "Rings",
          image: "https://d34qiagx43sg99.cloudfront.net/1699075-1490.webp",
        },
        {
          url: "/webstore/l/earrings/",
          name: "Earrings",
          image: "https://d34qiagx43sg99.cloudfront.net/3677974-1490.webp",
        },
        {
          url: "/webstore/l/necklaces/",
          name: "Necklaces",
          image: "https://d34qiagx43sg99.cloudfront.net/1698893-1490.webp",
        },
        {
          url: "/webstore/l/bracelets/",
          name: "Bracelets",
          image: "https://d34qiagx43sg99.cloudfront.net/3105342-1490.webp",
        },
      ];
      heading(
        ID,
        headingData,
        "/webstore/jewellery.do?icid=hs-nv-jewellery-page"
      );

      const details = [
        {
          text: "Jewellery Brands",
        },
        {
          text: "Jewellery Categories",
        },
        {
          text: "Jewellery Services & Guides",
        },
      ];

      pollerLite(["#seo-banner"], () => {
        const accordionRoot = document.getElementById("seo-banner");

        accordion(ID, details, accordionRoot);

        const getAccordionContent = () =>
          sendHttpRequest(
            "GET",
            "https://www.hsamuel.co.uk/webstore/jewellery.do?icid=hs-nv-jewellery-page",
            () => {}
          ).then((res) => {
            const temp = document.createElement("html");
            temp.innerHTML = res;
            const content = {
              brands: [],
              categories: [],
              services: [],
            };

            const brandCards = temp.querySelectorAll(
              ".card-grid.card-grid--3-cards > .card.card__link"
            );
            const categoryCards = temp.querySelectorAll(
              ".category-box-grid__content-container > .category-box"
            );
            const serviceCards = temp
              .querySelectorAll(".card-grid.card-grid--2-cards")[2]
              .querySelectorAll(".card.card__link");

            brandCards.forEach((card) => {
              const image = card
                .querySelector("picture img")
                .getAttribute("lazy-src");
              const url = card.href;
              const title = card.querySelector(".card__title").innerText;
              const description =
                card?.querySelector(".card__body")?.innerText || "";

              content.brands.push({
                url,
                image,
                title,
                description,
              });
            });

            categoryCards.forEach((card) => {
              const image = card
                .querySelector("picture img")
                .getAttribute("lazy-src");
              const url = card.href;
              const title = card.querySelector(
                ".category-box__title"
              ).innerText;

              content.categories.push({
                url,
                image,
                title,
              });
            });

            serviceCards.forEach((card) => {
              const image = card
                .querySelector("picture img")
                .getAttribute("lazy-src");
              const url = card.href;
              const title = card.querySelector(".card__title").innerText;
              const description =
                card?.querySelector(".card__body")?.innerText || "";

              content.services.push({
                url,
                image,
                title,
                description,
              });
            });

            return content;
          });

        const accordions = accordionRoot.querySelectorAll(
          `.${ID}-accordion__content`
        );

        accordions.forEach((accordion, idx) => {
          accordion.innerHTML = /* HTML */ `
            <div class="splide" id="splide-${idx + 1}">
              <div class="splide__track">
                <ul class="splide__list"></ul>
              </div>
            </div>
          `;
        });

        const splide1 = new Splide("#splide-1", sliderOptions);
        const splide2 = new Splide("#splide-2", sliderOptions);
        const splide3 = new Splide("#splide-3", sliderOptions);

        getAccordionContent().then((res) => {
          res.brands.forEach((brand) => {
            const slide = document.createElement("li");
            slide.classList.add("splide__slide");
            slide.appendChild(
              card(ID, brand.url, brand.title, brand.image, brand.description)
            );
            splide1.add(slide);
          });

          res.categories.forEach((category) => {
            const slide = document.createElement("li");
            slide.classList.add("splide__slide");
            slide.appendChild(
              card(ID, category.url, category.title, category.image, null, true)
            );
            splide2.add(slide);
          });

          res.services.forEach((service) => {
            const slide = document.createElement("li");
            slide.classList.add("splide__slide");
            slide.appendChild(
              card(
                ID,
                service.url,
                service.title,
                service.image,
                service.description
              )
            );
            splide3.add(slide);
          });
        });

        splide1.mount();
        splide2.mount();
        splide3.mount();
        splide3.options = {
          perPage: 3,
        };
      });
    }
  } else {
    // any control code here
  }
};
