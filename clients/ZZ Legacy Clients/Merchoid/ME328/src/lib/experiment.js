/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import {
  insertAfterElement,
  insertBeforeElement,
} from "../../../../../lib/utils";
import banner from "./components/banner/banner";
import categoryList from "./components/categoryList/categoryList";
import categories from "./data/categories";
import productList from "./components/productList/productList";
import header from "./components/header/header";

const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  if (VARIATION == "control") return;

  const products = document.getElementsByClassName("product-item");

  const updateHeader = (text) => {
    document.querySelector(`.${header().className}`).textContent = text;
  };

  const clearProducts = (els) => {
    [...els].forEach((product) => {
      product.remove();
    });
  };

  const renderProducts = (els) => {
    clearProducts(products);

    const productListEl = document.querySelector(`.${productList().className}`);

    [...els].forEach((el) => productListEl.append(el));
  };

  const scrollToElement = (el) => {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getAllProducts = (products) => {
    [...products].forEach((product) => {
      categories[0].elements.push(product);

      const title = product
        .querySelector(".product-item-link")
        .textContent.match(/^([\s\w\d\D]+)(:)/)[1]
        .trim();

      categories.forEach((category) => {
        if (category.brandsToMatch.includes(title)) {
          category.elements.push(product);
        }
      });
    });

    return categories;
  };

  const state = {
    data: getAllProducts(products),
    activeCategory: 0,

    set setState(val) {
      this.activeCategory = val;

      updateHeader(this.data[this.activeCategory].title);

      if (window.innerWidth < 720) {
        scrollToElement(document.querySelector(`.${header().className}`));
      } else {
        scrollToElement(document.querySelector(`.${categoryList().className}`));
      }

      const categoryButtons = document.querySelectorAll(
        "[data-category-button]"
      );

      categoryButtons.forEach((button) => {
        button.classList.remove(`${ID}-active`);

        if (button.dataset.category === val) {
          button.classList.add(`${ID}-active`);
        }
      });

      renderProducts(this.data[this.activeCategory].elements);
    },
  };

  const entryElement = document.getElementById("maincontent");
  insertBeforeElement(entryElement, banner());

  // Render category list
  entryElement.prepend(
    categoryList((e) => (state.setState = e.target.dataset.category))
  );

  // Render header
  insertAfterElement(
    document.querySelector(`.${categoryList().className}`),
    header(state.data[0].title)
  );

  // Render product list
  insertAfterElement(
    document.querySelector(`.${header().className}`),
    productList()
  );

  renderProducts(state.data[0].elements);
};
