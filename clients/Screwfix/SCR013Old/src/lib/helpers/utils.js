import shared from "../../../../../../core-files/shared";
import { bootLists } from "../data";

const { ID } = shared;
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
      !target.classList.contains(`${className}`) && target.classList.add(`${className}`);
    } else {
      const newTarget = document.querySelectorAll(`${target}`);
      if (newTarget.length > 0) {
        newTarget.forEach((el) => {
          !el?.classList.contains(`${className}`) && el.classList.add(`${className}`);
        });
      }
    }
  }
};

export const removeClass = (target, className) => {
  if (target) {
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
        if (boot.URL && product.includes(boot.ProductName?.replace(/  +/g, " ").toLowerCase())) return boot;
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

const checkCTAAvailability = (info) => {
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
  if (productName) productSize = /(?<=size(\s+)?)\d+/gi.exec(productName)[0];
  return { productSize, productSku, collectionCTA, collectionStickyCTA, deliverCTA, deliverStickyCTA };
};

export const getProductsData = async (urls) => {
  const promises = urls.map((url) => fetch(url));
  const responses = await Promise.all(promises);
  const data = await Promise.all(
    responses.map((response) => {
      return response.text();
    })
  );
  var parser = new DOMParser();
  var info = [];
  // console.log(data);
  data.forEach((el) => {
    // console.log(el);
    if (el) {
      const parsed = parser.parseFromString(el, "text/html");
      // console.log(parsed);
      // console.log(checkCTAAvailability(parsed));
      info.push(checkCTAAvailability(parsed));
    }
  });
  return info;
};
