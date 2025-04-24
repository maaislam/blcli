import shared from "../../../../../../core-files/shared";
import { pollerLite } from "../../../../../../lib/utils";
import { addClass, attributeCheck, moveElem, removeClass } from "./utils";

const { ID } = shared;
export const buttonDOMFn = (available, size, sku) => {
  const removeElement = (btn, selector) => {
    const parentNode = btn.parentNode;
    const selectorElem = parentNode.querySelector(`${selector}`);
    console.log("selectorElem", selectorElem);
    selectorElem && selectorElem.remove();
  };
  const btnFn = (collectionCTA, collectionStickyCTA, deliverCTA, deliverStickyCTA) => {
    const buttons = document.querySelectorAll(
      `.pr__btns [id^="product_add_to_trolley"], .pr__btns [id^="add_for_collection"], .pr__btns [id^="add_for_sticky_collection"]`
    );
    if (buttons.length > 0) {
      buttons.forEach((btn) => {
        if (attributeCheck(btn, `id`, `trolley`)) {
          if (btn.closest(`.pdp-float-cta__container`)) {
            removeElement(btn, `.${ID}-sticky-cta`);
            if (!(deliverStickyCTA instanceof Element) && deliverStickyCTA.includes(`<span`)) {
              moveElem(btn, deliverStickyCTA, `beforebegin`);
              console.log(btn, deliverStickyCTA);
              addClass(btn, `${ID}-x__hidden`);
            } else {
              removeClass(btn, `${ID}-x__hidden`);
              if (deliverStickyCTA.outerHTML && deliverStickyCTA.outerHTML.includes(`<span`)) {
                moveElem(btn, deliverStickyCTA, `beforebegin`);
                btn.remove();
              }
            }
          } else {
            removeElement(btn, `.${ID}-cta`);
            if (!(deliverCTA instanceof Element) && deliverCTA.includes(`<span`)) {
              moveElem(btn, deliverCTA, `beforebegin`);
              console.log(btn, deliverCTA);
              addClass(btn, `${ID}-x__hidden`);
            } else {
              removeClass(btn, `${ID}-x__hidden`);
              if (deliverCTA.outerHTML && deliverCTA.outerHTML.includes(`<span`)) {
                moveElem(btn, deliverCTA, `beforebegin`);
                btn.remove();
              }
            }
          }
        } else if (attributeCheck(btn, `id`, `collection`)) {
          if (btn.closest(`.pdp-float-cta__container`)) {
            removeElement(btn, `.${ID}-sticky-cta`);
            if (!(collectionStickyCTA instanceof Element) && collectionStickyCTA.includes(`<span`)) {
              moveElem(btn, collectionStickyCTA, `beforebegin`);
              console.log(btn, collectionStickyCTA);
              addClass(btn, `${ID}-x__hidden`);
            } else {
              removeClass(btn, `${ID}-x__hidden`);
              if (collectionStickyCTA.outerHTML && collectionStickyCTA.outerHTML.includes(`<span`)) {
                moveElem(btn, collectionStickyCTA, `beforebegin`);
                btn.remove();
              }
            }
          } else {
            removeElement(btn, `.${ID}-cta`);
            if (!(collectionCTA instanceof Element) && collectionCTA.includes(`<span`)) {
              moveElem(btn, collectionCTA, `beforebegin`);
              console.log(btn, collectionCTA);
              addClass(btn, `${ID}-x__hidden`);
            } else {
              removeClass(btn, `${ID}-x__hidden`);
              if (collectionCTA.outerHTML && collectionCTA.outerHTML.includes(`<span`)) {
                moveElem(btn, collectionCTA, `beforebegin`);
                btn.remove();
              }
            }
          }
        }
      });
    }
  };

  if (!available) {
    const collectionCTA = `<span id="add_for_collection_button_${sku}" class="btn fill btn--disabled ${ID}-cta">Not available for Click &amp; Collect</span>`,
      collectionStickyCTA = `<span id="add_for_sticky_collection_button_${sku}" class="btn fill btn--disabled ${ID}-sticky-cta">Not available for Click &amp; Collect</span>`,
      deliverCTA = `<span id="product_add_to_trolley_disabled_image" class="btn fill btn--disabled ${ID}-cta">Not available for delivery</span>`,
      deliverStickyCTA = `<span id="product_add_to_trolley_disabled_sticky_image" class="btn fill btn--disabled ${ID}-sticky-cta">Not available for delivery</span>`;
    btnFn(collectionCTA, collectionStickyCTA, deliverCTA, deliverStickyCTA);
  } else {
    if (size && sku) {
      pollerLite([() => window[`${ID}-$$info`]], () => {
        const info = window[`${ID}-$$info`];
        const selectedInfo = info.filter((el) => {
          const { productSize, productSku } = el;
          if (productSize && productSku && productSize == size && productSku == sku) {
            return el;
          }
        });
        //   console.log(`button selectedInfo`, selectedInfo);
        if (selectedInfo.length > 0) {
          const { collectionCTA, collectionStickyCTA, deliverCTA, deliverStickyCTA } = selectedInfo[0];
          btnFn(collectionCTA, collectionStickyCTA, deliverCTA, deliverStickyCTA);
        }
      });
    }
  }
};
