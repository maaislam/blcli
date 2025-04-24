import shared from "../../../../../../core-files/shared";
import product from "../components/product/product";
import filterMarker from "../components/filterMarker/filterMarker";

const { ID } = shared;

export default class RefiningLogic {
  constructor(data) {
    this.activeCategory = "all";
    this.sort = "default";
    this.filters = [];
    this.elements = document.querySelectorAll(`.${ID}-category-tab button`);
    this.categoryData = data;
    this.#updateDOM();
  }

  setActiveCategory(category) {
    this.activeCategory = category;
    this.filters = [];
    this.#clearAllFilterCheckboxes();
    this.#updateDOM();
  }

  setSortMethod(val) {
    this.sort = val;
    this.#updateDOM();
  }

  setCategoryFilters(filter) {
    if (!this.filters.includes(filter)) {
      this.filters.push(filter);
    } else {
      this.filters = this.filters.filter((f) => f !== filter);
      this.#clearFilterCheckbox(filter);
    }
    this.#updateDOM();
    this.#resetCheckboxes();
  }

  #resetCheckboxes() {
    const checkboxes = document.querySelectorAll(
      'fieldset div input[name="Category"]'
    );

    checkboxes.forEach((c) => {
      if (this.filters.includes(c.value)) {
        c.checked = true;
        c.parentElement.classList.add("selected");
      } else {
        c.checked = false;
        c.parentElement.classList.remove("selected");
      }
    });
  }

  #clearFilterCheckbox(filter) {
    document.querySelector(
      `.${ID}-filters__tray input[value="${filter}"]`
    ).checked = false;
  }

  #clearAllFilterCheckboxes() {
    const checkboxes = document.querySelectorAll(
      'fieldset div input[name="Category"]'
    );
    checkboxes.forEach((c) => {
      c.checked = false;
      c.parentElement.classList.remove("selected");
    });
  }

  #updateDOM() {
    (function updateTabChange(elements, category) {
      const ACTIVE_CLASS = `${ID}-active`;

      elements.forEach((el) => el.classList.remove(ACTIVE_CLASS));

      const activeElement = [...elements].filter(
        (el) => el.getAttribute("data-category") === category
      )[0];
      activeElement.classList.add(ACTIVE_CLASS);
    })(this.elements, this.activeCategory);

    const productGrid = document.querySelector(`.${ID}-product-grid`);

    (function clearAllProductCards() {
      const productElements = productGrid.querySelectorAll(`.${ID}-product`);

      productElements.forEach((el) => el.remove());
    })();

    const filterByCategory = (obj) => {
      if (this.filters.length > 0) {
        return obj.filter((el) => this.filters.includes(el.filter));
      }

      return obj;
    };

    let categoryObject = [];

    const getProductsByCategory = () => {
      if (this.activeCategory === "all") {
        categoryObject = [
          ...filterByCategory(Object.values(this.categoryData).flat()),
        ];
      } else {
        categoryObject = [
          ...filterByCategory(this.categoryData[this.activeCategory]),
        ];
      }
    };

    getProductsByCategory();

    if (this.sort === "low-to-high") {
      filterByCategory(
        (categoryObject = categoryObject.sort(
          (a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1))
        ))
      );
    } else if (this.sort === "high-to-low") {
      filterByCategory(
        (categoryObject = categoryObject.sort(
          (a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1))
        ))
      );
    }

    categoryObject.forEach((item) =>
      productGrid.append(
        product(
          item.url,
          item.brand,
          item.title,
          item.image,
          item.price,
          item.oldPrice,
          item.fastSelling,
          item.filter
        )
      )
    );

    (function renderActiveFilterMarkers(filters, setCategoryFilters) {
      const filterMarkerDisplay = document.querySelector(
        `.${ID}-filters__active-display`
      );

      if (filterMarkerDisplay) {
        filterMarkerDisplay.innerHTML = "";
      }

      filters.forEach((f) =>
        filterMarkerDisplay.append(filterMarker(f, () => setCategoryFilters(f)))
      );
    })(this.filters, this.setCategoryFilters.bind(this));

    (function refreshAvailableFilters(data, active) {
      let setOfProductsFromData;

      if (active === "all") {
        setOfProductsFromData = Object.values(data).flat();
      } else {
        setOfProductsFromData = data[active];
      }

      const filterData = Array.from(
        new Set(setOfProductsFromData.map((t) => t.filter))
      );

      const filterTrayOptions = document.querySelectorAll(
        `.${ID}-filters input[name="Category"], .${ID}-filters__tray input[name="Category"]`
      );

      filterTrayOptions.forEach((f) => {
        if (active !== "all" && !filterData.includes(f.value)) {
          f.parentElement.parentElement.style.display = "none";
        } else {
          f.parentElement.parentElement.style.display = "block";
        }
      });
    })(this.categoryData, this.activeCategory);

    (function updateProductCount() {
      const count = document.querySelector(
        `.${ID}-filters [data-product-count]`
      );
      const products = document.querySelectorAll(`.${ID}-product`);

      if (count) count.textContent = products.length;
    })();
  }
}
