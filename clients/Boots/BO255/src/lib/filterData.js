// enter 'price', 'reviews' or 'brands'

import shared from "../../../../../core-files/shared";

/**
 * Format:
 * 'pathname': {
     type: 'price' or 'rating' or 'brands',

     // if type is brands, add in brands array like this:
     brands: ['brand1', 'brand2', 'brand3'] 
 }
 */

export const filterObj = {
  "/christmas/christmas-3-for-2": {
   type: 'price',
  },
  "/christmas/all-christmas": {
    type: 'price',
   },
  "/fragrance/perfume/all-perfume": {
    type: 'brands',
    brands: [
        'Christian Dior',
        'Paco Rabanne',
        'YVES SAINT LAURENT',
        'Hugo Boss',
        'Marc Jacobs',
        'Lancome',
        'Gucci',
        'Giorgio Armani',
        'Calvin Klein', 
        'Dolce & Gabbanna',
        'Thierry Mugler',
        'Estee Lauder'
    ]
  },

  "/fragrance/aftershave/mens-aftershave": {
    type: 'brands',
    brands: [
      'Christian Dior',
      'Hugo Boss',
      'Paco Rabanne',
      'Giorgio Armani',
      'Prada',
      'Tom Ford',
      'YVES SAINT LAURENT',
      'Jean Paul Gautier',
      'Calvin Klein', 
      'Dolce & Gabbanna',
  ]
  },
};

const { ID } = shared;

/**
 *
 * @returns the brand hero filters if in list or if on page
 */

export const brandFilters = (matchingURL) => {
  const brandData = matchingURL.brands;

  const allBrandFilters = document.querySelectorAll("#productsFacets #brand .facetSelect li");

  for (let index = 0; index < allBrandFilters.length; index += 1) {
    const element = allBrandFilters[index];
    const filterName = element.querySelector('.outline *[id^="facetLabel_"]');

    // add the hardcoded brands
    if (matchingURL.brands !== true) {
      if (brandData.indexOf(filterName.textContent) > -1) {
        const filterTarget = element.querySelector(".facetbutton").id;

        const brandFilter = document.createElement("div");
        brandFilter.classList.add(`${ID}-topFilter`);
        brandFilter.classList.add("swiper-slide");
        brandFilter.setAttribute("filter-target", filterTarget);
        brandFilter.innerHTML = `<span>${filterName.textContent}</span>`;

        document.querySelector(`.${ID}-filters .swiper-wrapper`).appendChild(brandFilter);
      }
    }
  }
};

/**
 *
 * @returns the review filter object
 */
export const reviewsData = () => {
  let filters;
  const filterArr = [];

  filters = document.querySelectorAll("#ratingContainer .ais-RatingMenu li a");

  for (let index = 0; index < filters.length; index += 1) {
    const element = filters[index];
    const elID = element.getAttribute("class");
    const elName = `${element.getAttribute("aria-label")}`;

    // if rating
    const dataObj = {};
    if (elName) {
      dataObj["name"] = elName;
    }
    dataObj["target"] = elID;
    filterArr.push(dataObj);
  }

  return filterArr;
};

export const categoryData = () => {
  let filters;
  const filterArr = [];

  filters = document.querySelectorAll("#categoryMenu .ais-HierarchicalMenu li a");

  for (let index = 0; index < filters.length; index += 1) {
    const element = filters[index];
    const elID = element.getAttribute("class");
    const elName = `${element.querySelector('span').innerText}`;
    const elHref = `${element.getAttribute("href")}`;

    // if rating
    const dataObj = {};
    if (elName) {
      dataObj["name"] = elName;
    }
    dataObj["target"] = elID;
    dataObj["link"] = elHref;
    filterArr.push(dataObj);
  }
  return filterArr;
};

/**
 *
 * @returns the price filter object
 */
export const priceData = () => {
  let filters;
  const filterArr = [];

  filters = document.querySelectorAll("#price .facetSelect li a");

  for (let index = 0; index < filters.length; index += 1) {
    const element = filters[index];
    const elID = element.getAttribute("id");
    const elName = `${element.querySelector("[id*=facetLabel]").textContent.trim()}`;

    // if rating
    const dataObj = {};
    if (elName) {
      dataObj["name"] = elName;
    }
    dataObj["target"] = elID;
    filterArr.push(dataObj);
  }

  return filterArr;
};

/**
 *
 * @returns the review hero filters
 */

export const addReviewFilters = () => {
  const allFilters = reviewsData();

  Object.keys(allFilters).forEach((i) => {
    const data = allFilters[i];
    const filter = document.createElement("div");
    filter.classList.add(`${ID}-topFilter`);
    filter.classList.add("swiper-slide");
    filter.setAttribute("filter-target", data.target);
    filter.innerHTML = `<span>${data.name}</span>`;
    document.querySelector(`.${ID}-filters .swiper-wrapper`).appendChild(filter);
  });
};

export const addCategoryFilters = () => {
  const allFilters = categoryData();

  Object.keys(allFilters).forEach((i) => {
    const data = allFilters[i];
    const filter = document.createElement("div");
    filter.classList.add(`${ID}-topFilter`);
    filter.classList.add("swiper-slide");
    filter.setAttribute("filter-target", data.target);
    filter.setAttribute("link", data.link);
    filter.innerHTML = `<span>${data.name}</span>`;
    document.querySelector(`.${ID}-filters .swiper-wrapper`).appendChild(filter);
  });
};

/**
 *
 * @returns the price hero filters
 */

export const addPriceFilters = () => {
  const allFilters = priceData();

  Object.keys(allFilters).forEach((i) => {
    const data = allFilters[i];
    const filter = document.createElement("div");
    filter.classList.add(`${ID}-topFilter`);
    filter.classList.add("swiper-slide");
    filter.setAttribute("filter-target", data.target);
    filter.innerHTML = `<span>${data.name}</span>`;
    document.querySelector(`.${ID}-filters .swiper-wrapper`).appendChild(filter);
  });
};

