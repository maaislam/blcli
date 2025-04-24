/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import "@babel/polyfill";
import Splide from "@splidejs/splide";
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { insertAfterElement } from "../../../../../lib/utils";
import banner from "./components/banner";
import bestSellingCard from "./components/bestSellingCard";
import filterCard from "./components/filterCard";
import loader from "./components/loader";
import error from "./components/error";
import productCard from "./components/productCard";
import scrollToTop from "./components/scrollToTop";

const { ID, VARIATION } = shared;

export default () => {
  setup();
  fireEvent("Conditions Met");

  if (VARIATION === "control") {
    return;
  }

  const locale = window.location.pathname.match(/\B\/([a-zA-Z0-9-]{0,})\S/)[1];

  // Remove Old Products
  const oldContent = document.querySelector("#maincontent");
  oldContent.remove();

  // Render Scroll To Top Button
  document.body.appendChild(scrollToTop(ID));

  // Render Banner
  const entryElement = document.querySelector(".review-fans");
  const newBanner = banner(ID);
  insertAfterElement(entryElement, newBanner);

  // Render Best Selling
  const newBestSelling = document.createElement("section");
  newBestSelling.classList.add(`${ID}-best-selling`);
  newBestSelling.innerHTML = /* HTML */ `
    <h2>Best Selling Geek Gifts</h2>
    <div class="${ID}-best-selling-list" data-best-selling-list>
      <div class="splide" id="${ID}-splide">
        <div class="splide__track">
          <ul class="splide__list"></ul>
        </div>
      </div>
    </div>
  `;

  insertAfterElement(newBanner, newBestSelling);

  const slider = document.getElementById(`${ID}-splide`);

  const productSlider = new Splide(slider, {
    perPage: 4,
    gap: "2rem",
    dragMinThreshold: 10,
    flickPower: 100,
    breakpoints: {
      500: {
        perPage: 1,
      },
      700: {
        perPage: 2,
      },
      900: {
        perPage: 3,
      },
    },
  });

  productSlider.mount();

  const getBestSelling = async () => {
    const res = await fetch(
      `https://www.merchoid.com/${locale}/all-products?gift=6151`
    );
    const data = await res.text();

    const temp = document.createElement("html");
    temp.innerHTML = data;

    const products = temp.querySelectorAll(".item.product.product-item");

    const productData = [];

    products.forEach((product) => {
      const url = product.querySelector(
        ".product.photo.product-item-photo"
      ).href;
      const title = product.querySelector(
        ".product.name.product-item-name"
      ).innerText;
      let price;
      if (locale === "uk") {
        price = product
          .querySelector(".price-box > span:not(.old-price)")
          .innerText.match(/£[\s\S]*$/);
      } else {
        price = product
          .querySelector(".price-box > span:not(.old-price)")
          .innerText.match(/€[\s\S]*$/);
      }
      const image = product
        .querySelector(".product-image-wrapper .mfwebp > img")
        .getAttribute("data-original");

      productData.push({
        url,
        title,
        price,
        image,
      });
    });

    productData.forEach((item, idx) => {
      if (idx < 4) {
        const slide = document.createElement("li");
        slide.classList.add("splide__slide");
        slide.appendChild(
          bestSellingCard(ID, item.url, item.image, item.title, item.price)
        );
        productSlider.add(slide);
      }
    });
  };

  getBestSelling();

  new MutationObserver((entries) => {
    entries.forEach(() => {
      const pagination = document.querySelector(
        `#${ID}-splide .splide__pagination`
      );
      const arrows = document.querySelector(`#${ID}-splide .splide__arrows`);

      if (pagination) arrows.style.display = "flex";
      else arrows.style.display = "none";
    });
  }).observe(slider, {
    attributes: true,
    subtree: true,
    childList: true,
  });

  // Render Filter Section
  const filterList = document.createElement("section");
  filterList.classList.add(`${ID}-filters`);
  filterList.id = "filters";
  filterList.innerHTML = /* HTML */ `
    <h2>Shop by</h2>
    <ul class="${ID}-filters-list" data-filters-list></ul>
  `;

  insertAfterElement(newBestSelling, filterList);

  const filters = [
    {
      text: "Gifts for Him",
      param: "gender=35&ucgender=6095",
    },
    {
      text: "Gifts for Her",
      param: "gender=35&ucgender=6096",
    },
    {
      text: "Unisex Gifts",
      param: "gender=35",
    },
    {
      text: `Gifts Under ${locale === "uk" ? "£" : "€"}10`,
      param: "price=-10",
    },
    {
      text: `Gifts Under ${locale === "uk" ? "£" : "€"}30`,
      param: "price=-30",
    },
    {
      text: `Gifts Under ${locale === "uk" ? "£" : "€"}50`,
      param: "price=-50",
    },
  ];

  const filterListElement = document.querySelector("[data-filters-list]");

  filters.forEach((filter) => {
    const { param, text } = filter;
    filterListElement.appendChild(filterCard(ID, param, text));
  });

  // Render Product Lister
  const newProductLister = document.createElement("section");
  newProductLister.innerHTML = /* HTML */ `
    <ul class="${ID}-product-list" data-product-list></ul>
  `;

  insertAfterElement(filterList, newProductLister);

  // Filter Functionality
  const filterButtons = document.querySelectorAll(`.${ID}-filter-card button`);
  const productsList = document.querySelector("[data-product-list]");
  const scrollToTopButton = document.querySelector("[data-scroll-button]");

  let selectedFilters = [];
  let foundProducts = [];

  const getProductInfo = (d) => {
    const temp = document.createElement("html");
    temp.innerHTML = d;

    const products = temp.querySelectorAll(".item.product.product-item");

    products.forEach((product) => {
      const url = product.querySelector(
        ".product.photo.product-item-photo"
      ).href;
      const title = product.querySelector(
        ".product.name.product-item-name"
      ).innerText;
      let price;
      if (locale === "uk") {
        price = product
          .querySelector(".price-box > span:not(.old-price)")
          .innerText.match(/£[\s\S]*$/);
      } else {
        price = product
          .querySelector(".price-box > span:not(.old-price)")
          .innerText.match(/€[\s\S]*$/);
      }
      const image = product
        .querySelector(".product-image-wrapper .mfwebp > img")
        .getAttribute("data-original");

      foundProducts.push({
        url,
        title,
        price,
        image,
      });
    });
  };

  const removeLoader = () => {
    const loader = document.querySelector("[data-loader]");

    if (loader) loader.remove();
  };

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target.querySelector("img");
        image.src = image.dataset.src;
        imageObserver.unobserve(image);
      }
    });
  });

  const renderProducts = (products) => {
    if (window.innerWidth <= 720) productsList.scrollIntoView(true);

    products.forEach((product) =>
      productsList.appendChild(
        productCard(
          ID,
          product.url,
          product.image,
          product.title,
          product.price
        )
      )
    );

    const productsCards = document.querySelectorAll("[data-product]");

    productsCards.forEach((card) => {
      imageObserver.observe(card);
    });
  };

  const filterSwitch = {
    disable: () => {
      filterButtons.forEach((button) =>
        button.setAttribute("data-disabled", "true")
      );
    },
    enable: () => {
      filterButtons.forEach((button) =>
        button.setAttribute("data-disabled", "false")
      );
    },
  };

  const getProductData = async (url) => {
    filterSwitch.disable();
    productsList.appendChild(loader(ID));
    foundProducts = [];

    const res = await fetch(url);
    const data = await res.text();

    const temp = document.createElement("html");
    temp.innerHTML = data;

    const pagination = temp.querySelectorAll(".items.pages-items")[1];

    if (pagination) {
      const pages = pagination.querySelectorAll(
        ":scope > li:not(.pages-item-next)"
      );

      if (pages.length !== 0) {
        const urls = [];

        pages.forEach((page, idx) => {
          const link = `${url}&p=${idx + 1}`;
          urls.push(link);
        });

        Promise.all(urls.map((url) => fetch(url)))
          .then((responses) => Promise.all(responses.map((res) => res.text())))
          .then((data) => {
            data.forEach((d) => {
              getProductInfo(d);
            });
          })
          .then(() => {
            removeLoader();
            filterSwitch.enable();

            if (foundProducts.length > 0) {
              renderProducts(foundProducts);

              if (foundProducts.length > 10) {
                scrollToTopButton.classList.add("active");
              } else {
                scrollToTopButton.classList.remove("active");
              }
            } else {
              productsList.appendChild(error(ID));
              scrollToTopButton.classList.remove("active");
            }
          });
      }
    } else {
      removeLoader();
      filterSwitch.enable();
      getProductInfo(data);

      if (foundProducts.length > 0) {
        renderProducts(foundProducts);

        if (foundProducts.length > 10) {
          scrollToTopButton.classList.add("active");
        } else {
          scrollToTopButton.classList.remove("active");
        }
      } else {
        productsList.appendChild(error(ID));
        scrollToTopButton.classList.remove("active");
      }
    }
  };

  // Initial Product Population
  getProductData(`https://www.merchoid.com/${locale}/all-products?gift=6151`);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (window.innerWidth <= 720) {
        const f = document.getElementById("filters");
        f.scrollIntoView(true);
      }

      productsList.innerHTML = "";
      button.classList.toggle("selected");

      if (button.classList.contains("selected")) {
        selectedFilters.push(button.dataset.filter);
      } else {
        selectedFilters = selectedFilters.filter(
          (f) => f !== button.dataset.filter
        );
      }

      getProductData(
        `https://www.merchoid.com/${locale}/all-products?gift=6151&${selectedFilters.join(
          "&"
        )}`
      );
    });
  });

  const handleScroll = () => {
    const anchor = scrollToTopButton.querySelector("a");
    if (document.documentElement.scrollTop > 4000) {
      anchor.classList.add("show");
    } else {
      anchor.classList.remove("show");
    }
  };

  document.addEventListener("scroll", handleScroll);
};
