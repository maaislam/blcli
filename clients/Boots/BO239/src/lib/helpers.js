import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;

/**
 * @returns page type - plp or pdp
 */
export const pageType = () => {
  let type;
  if (document.querySelector("#estore_lister_template_container")) {
    type = "plp";
  } else {
    type = "pdp";
  }
  return type;
};


/**
 * 
 * @param {*} obj - product object 
 * @param {*} n - number of items to be displayed
 * @returns 
 */
const firstNItems = (obj, n) => {
  return Object.keys(obj) //get the keys out
    .slice(0, n) //get the first N
    .reduce(function (memo, current) {
      //generate a new object out of them
      memo[current] = obj[current];
      return memo;
    }, {});
};


/**
 * 
 * @param {*} url - url of the product passed to load in data
 */
export const getData = (url) => {
  fetch(url)
    .then((r) => r.json())
    .then((d) => {
      if(d.Data) {
        addRecs(d.Data);
      }
    })
    .catch(() => {
      return;
    });
};

/**
 *
 * @returns Last viewed product index in grid
 */
const getProductIndex = () => {
  let productNoInGrid;

  const allItems = document.querySelectorAll(".grid_mode.grid li");
  for (let index = 0; index < allItems.length; index += 1) {
    const element = allItems[index];

    const journeyObj = JSON.parse(sessionStorage.getItem(`${ID}-journey`));
    const lastProduct = document.querySelector(`#estores_product_listing_widget a[href*="${journeyObj[0].pdp}"]`);
    const currentProduct = lastProduct.closest("li");

    if (element === currentProduct) {
      productNoInGrid = index;
      break;
    }
  }

  return productNoInGrid;
};

/**
 * Determine position that el needs to be placed
 */
const checkIndex = () => {
  if (getProductIndex() !== "undefined") {
    let prodPerRow;
    if (window.innerWidth < 767) {
      prodPerRow = 2;
    }
    if (window.innerWidth >= 767 && window.innerWidth < 1024) {
      prodPerRow = 3;
    }
    if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
      prodPerRow = 3;
    }
    if (window.innerWidth >= 1280) {
      prodPerRow = 4;
    }

    const currentIndex = getProductIndex();

    let productIndex = currentIndex + 1;

    if (productIndex % prodPerRow === 0) {
      productIndex = productIndex - 1;
    } else {
      if ((productIndex + 1) % prodPerRow === 0) {
        // do nothing
      } else if ((productIndex + 2) % prodPerRow === 0) {
        productIndex = productIndex + 1;
      } else if ((productIndex + 3) % prodPerRow === 0) {
        productIndex = productIndex + 2;
      }
    }
    

    return productIndex;
  }
};

/**
 * Create items based on variation
 */
const product = (image, title, price, oldPrice, url, reviewScore, reviewCount, hasAdvantagePrice, promotionalText) => {
  const card = document.createElement("a");
  card.href = url;
  card.classList.add(`${ID}-card`);
  card.innerHTML = /* html */ `
    <div class="${ID}-card-image ${hasAdvantagePrice ? "has-advantage-price" : ""}">
      <img src="${image}" alt="${title}" />
    </div>
    <div class="${ID}-card-content">
      <h4 class="${ID}-card-title">${title}</h4>
      <div class="${ID}-card-pricing">
				${oldPrice > price ? /* html */ `<span class="${ID}-card-price">Now £${price}</span><span class="${ID}-card-old-price">Was £${oldPrice}</span>` : /* html */ `<span class="${ID}-card-price">£${price}</span>`}
			</div>
			${
        promotionalText
          ? /* html */ `
      	<p class="${ID}-card-promo">${promotionalText}</p>
			`
          : ""
      }
    </div>
  `;

  return card;
};

const link = (title, url) => {
  const linkEl = document.createElement("a");
  linkEl.href = url;
  linkEl.classList.add(`${ID}-link`);
  linkEl.innerHTML = `<span class="${ID}-link-text">${title}</span>`;

  return linkEl;
};

const addRecs = (data) => {
  let content;
  if(VARIATION === '1') {
    content = 'Why not refine your search?';
  } else if(VARIATION === '2') {
    content = 'We think you might like...';
  }

  const objData = firstNItems(data, 4);


  const root = document.createElement("li");
  root.id = `${ID}-root`;
  root.classList.add(`estore_product_container`)
  root.innerHTML = `<div class="${ID}-title">
      <h2>Not exactly what you were looking for?</h2>
      <p>${content}</p>
      <div class="${ID}-close"</div>
    </div>
    <div class="${ID}-items-container">
    </div>`;


  const elToInsertAfter = document.querySelectorAll(".grid_mode.grid li")[checkIndex()];
  elToInsertAfter.insertAdjacentElement("afterend", root);


  const journeyObj = JSON.parse(sessionStorage.getItem(`${ID}-journey`));
  const lastProduct = document.querySelector(`#estores_product_listing_widget a[href*="${journeyObj[0].pdp}"]`);
  if(lastProduct) {
    const currentProduct = lastProduct.closest("li");
    currentProduct.classList.add(`${ID}-lastViewed`);
  }


  const itemsContainer = root.querySelector(`.${ID}-items-container`);

  Object.keys(objData).forEach((i) => {
    const el = objData[i];
    if (el) {
      const item = document.createElement("div");
      item.classList.add(`${ID}-item`);
      if (VARIATION === "1") {
        item.appendChild(link(el.link_name, el.link_url));
      } else {
        item.appendChild(
          product(
            el.product_data.referenceimageurl,
            el.product_data.offername,
            el.product_data.currentprice.toFixed(2),
            el.product_data.regularprice.toFixed(2),
            el.product_data.actionurl,
            el.product_data.averagereviewscore || 0,
            el.product_data.numberofreviews || 0,
            el.product_data.haspriceadvantagedeal,
            el.product_data.promotionaltext
          )
        );
      }
      itemsContainer.append(item);
    }
  });

  const closeBtn = root.querySelector(`.${ID}-close`);
  closeBtn.addEventListener("click", () => {
    document.querySelector(`.${ID}-lastViewed`).classList.remove(`${ID}-lastViewed`);
    root.remove();
    sessionStorage.removeItem(`${ID}-journey`);
  });

  const items = document.querySelectorAll(`.${ID}-item`);
  let type;
  if(VARIATION === '1') {
    type = 'Navigational link';
  }
  if(VARIATION === '2') {
    type = 'Product';
  }

  items.querySelector('a').forEach(item => {
    item.addEventListener('click', () => {
      fireEvent(`clicked ${type}`);
    })
  });
};
