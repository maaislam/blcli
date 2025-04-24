import { bootLists } from "../data";

export const moveElem = (target, elem, position = "beforeend") => {
  const fn = (t) => {
    const type = elem instanceof Element ? `elem` : `html`;
    if (type == "elem") {
      t.insertAdjacentElement(position, elem);
    } else {
      t.insertAdjacentHTML(position, elem);
    }
  };
  if (target && elem) {
    if (target instanceof Element) {
      fn(target);
    } else {
      const newTarget = document.querySelector(`${target}`);
      // console.log("newTarget", newTarget);
      newTarget && fn(newTarget);
    }
  }
};

// export const removeElement = (target, elem) => {
//   const fn = (t) => {
//     const removableElem = t.querySelector(`${elem}`) || t.closest(`${elem}` || t.parentNode.querySelector(`${elem}`));
//     console.log(removableElem);
//     if (removableElem) removableElem.remove();
//   };
//   if (target && elem) {
//     if (target instanceof Element) {
//       fn(target);
//     } else {
//       const newTarget = document.querySelector(`${target}`);
//       // console.log("newTarget", newTarget);
//       newTarget && fn(newTarget);
//     }
//   }
// };

export const addClass = (target, className) => {
  if (target) {
    if (target instanceof Element) {
      // console.log(target);
      !target.classList.contains(`${className}`) && target.classList.add(`${className}`);
    } else {
      const newTarget = document.querySelectorAll(`${target}`);
      // console.log(newTarget);
      if (newTarget.length > 0) {
        newTarget.forEach((el) => {
          !el?.classList.contains(`${className}`) && el.classList.add(`${className}`);
        });
      }
    }
  }
};

export const removeClass = (target, className) => {
  if (target && className) {
    if (target instanceof Element) {
      target.classList.contains(`${className}`) && target.classList.remove(`${className}`);
    } else {
      const newTarget = document.querySelectorAll(`${target}`);
      if (newTarget.length > 0) {
        newTarget.forEach((el) => {
          el?.classList.contains(`${className}`) && el.classList.remove(`${className}`);
        });
      }
    }
  }
};

export const attributeCheck = (target, type, attributeName) => {
  if (target && attributeName) {
    if (target instanceof Element) {
      return target.getAttribute(`${type}`)?.toLowerCase().includes(`${attributeName}`);
    } else {
      const newTarget = document.querySelector(`${target}`);
      if (newTarget) return newTarget.getAttribute(`${type}`)?.toLowerCase().includes(`${attributeName}`);
    }
  }
};
export const attributeValueChanged = (target, attribute, value) => {
  if (target && attribute && value) {
    if (target instanceof Element && target.getAttribute(attribute)) {
      target.setAttribute(attribute, value);
    } else {
      const newTarget = document.querySelectorAll(`${target}`);
      if (newTarget.length > 0) {
        newTarget.forEach((el) => {
          if (el.getAttribute(attribute)) {
            el.setAttribute(attribute, value);
          }
        });
      }
    }
  }
};
export const bootsInfoFinder = (specific = false, product = false) => {
  if (specific) {
    let bootsInfo =
      bootLists.length > 0 &&
      bootLists.reduce((results, boot) => {
        if (boot[specific] && boot[specific] != `undefined`) results.push(boot[specific]);
        return results;
      }, []);
    return bootsInfo;
  } else if (product) {
    let bootsInfo =
      bootLists.length > 0 &&
      bootLists.filter((boot) => {
        const { URL } = boot;
        if (URL) {
          let productURLName = window.dataLayer[0]?.prodName?.toLocaleLowerCase()?.split(`size`)[0]?.replace(/\s+/g, " ").trim();
          if (productURLName.includes(`scruffs switchback ladies safety boots tan`)) productURLName = "scruffs switchback 3 safety boots tan";
          // console.log(productURLName);
          if (productURLName == URL || productURLName.includes(URL)) {
            return boot;
          }
        }
      });
    return bootsInfo;
  }
};

export const prdInfoFinder = (size = "", sku = "") => {
  if (sku && size) {
    let bootsInfo =
      bootLists.length > 0 &&
      bootLists.filter((boot) => {
        if (boot.URL && boot.ProductName && boot.Size) {
          if (boot.SKU == sku && boot.Size == size) {
            return boot;
          }
        }
      });
    return bootsInfo[0];
  } else {
    const url = window.location.href;
    let bootsInfo =
      bootLists.length > 0 &&
      bootLists.filter((boot) => {
        if (boot.URL && url.includes(boot.URL)) return boot;
      });
    return bootsInfo[0];
  }
};

const parsedFromResponse = (info) => {
  const deskCTAContainer = info.querySelector(`.pr__product .pr__btns .row`);
  const floatCTAContainer = info.querySelector(`.pdp-float-cta__container .pr-btns__container`);
  const collectionCTA = deskCTAContainer?.querySelector(`[id^="add_for_collection"]`);
  const collectionStickyCTA = floatCTAContainer?.querySelector(`[id^="add_for_sticky_collection"]`);
  // addClass(collectionStickyCTA, `${ID}-sticky`);
  const deliverCTA = deskCTAContainer?.querySelector(`[id^="product_add_to_trolley"]`);
  const deliverStickyCTA = floatCTAContainer?.querySelector(`[id^="product_add_to_trolley"]`);
  // addClass(deliverStickyCTA, `${ID}-sticky`);
  const productDescription = info.querySelector(`h1#product_description`);
  const productName = productDescription?.querySelector(`span[itemprop="name"]`)?.textContent?.trim();
  const productSku = productDescription?.querySelector(`span[itemprop="productID"]`)?.textContent?.trim();
  let productSize;
  if (productName) productSize = productName?.toLowerCase()?.split(`size`)[1].trim();
  return { productSize, productSku, collectionCTA, collectionStickyCTA, deliverCTA, deliverStickyCTA };
};

export const getProductsData = (urls) => {
  const promises = urls.map((url) => fetch(url));
  return Promise.all(promises)
    .then((results) => Promise.all(results.map((response) => response.text())))
    .then((data) => {
      var parser = new DOMParser();
      var info = [];
      data.forEach((el) => {
        // console.log(el);
        if (el) {
          const parsed = parser.parseFromString(el, "text/html");
          // console.log(parsed);
          // console.log(checkCTAAvailability(parsed));
          info.push(parsedFromResponse(parsed));
        }
      });
      return info;
    });
};
