import shared from "../../../../../../core-files/shared";
import { pollerLite } from "../../../../../../lib/utils";

const { ID, VARIATION } = shared;

// const productDescriptionGenerator = () => {
//   let url = window.location.href;
//   let productFullDescription,
//     productLongDescription,
//     pageType;
//     if (/ickle\-bubba/.test(url)) {
//     productFullDescription = document.querySelector(`#estore_product_longdesc`)?.cloneNode(true);
//     productLongDescription = productFullDescription?.querySelector(`#contentOmnipresent > div`)?.cloneNode(true);
//     productFullDescription?.querySelector(`#contentOmnipresent > div`)?.remove();
//     pageType = "ickle-bubba";
//   }
//   else if (/bugaboo\-/.test(url)) {
//     productFullDescription = document.querySelector(`#estore_product_longdesc`)?.cloneNode(true);
//     productLongDescription = productFullDescription?.querySelector(`#contentOmnipresent > div`)?.cloneNode(true);
//     productFullDescription?.querySelector(`#contentOmnipresent > div`)?.remove();
//     pageType = "ickle-bubba";
//   }
//   return {
//     productFullDescription,
//     productLongDescription,
//     pageType,
//   };
// };

export const featuresGenerator = (keyFeaturesData) => {
  let newkeyFeatures;
  pollerLite([`#estore_product_longdesc`], () => {
    // const { productFullDescription, productLongDescription, pageType } = productDescriptionGenerator();
    const productFullDescription = document.querySelector(`#estore_product_longdesc`)?.cloneNode(true);
    newkeyFeatures = `<div class="${ID}-newKeyFeatures">
  <h2 class="${ID}-newKeyFeatures-title">Key Features</h2>
  <p class="${ID}-newKeyFeatures-description auto-ellipsis">${keyFeaturesData.summary}</p>
  <div class="${ID}-newKeyFeatures-accordion">
    <div class="acc-container">
      <div class="acc">
        <div class="acc-content">
          <div class="acc-content-body">
            ${productFullDescription ? productFullDescription.outerHTML : ``}
          </div>
        </div>
      <div class="acc-head">
        <a href="javascript:void(0)" class="view-full">View full details<span></span></a>
        <a href="javascript:void(0)" class="view-less ${ID}--x-hidden">View less<span></span></a>
      </div>
      </div>
    </div>
  </div>
  <div class="${ID}-newKeyFeatures-products related-products-desktop">
  ${keyFeaturesData.products
    .map(
      (product) => `
  <div class="related-products-view">
      <div class="related-products-view-image"><img src="${product.image}"/></div>
      <p class="related-products-view-desc">${product.prod_desc}</p>
  </div>
  `
    )
    .join("")}
  </div>
  </div>
  `;
  });
  return newkeyFeatures;
};
