/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import clickHandler from './helpers/clickHandler';
import renderSamplePromo from './components/samplePromo';
import { prodToSampleMap } from './data';
import { getProductData } from './helpers/getProductData';
import observeDOM from './helpers/observeDOM';
import obsIntersection from './helpers/observeIntersection';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const init = (variants) => {
  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const productSkus = variants.map((variant) => variant.sku);
  //console.log('productSkus', productSkus);
  const variantSelected =
    variants.length === 1
      ? variants[0]
      : variants.filter(
          (item) => item.title == document.querySelector('#product-detail ').querySelector('.swatch-title').innerText.trim()
        )[0];

  const matchingSkuFromList = productSkus.map((productSku) => prodToSampleMap[productSku]).filter(Boolean)[0];

  //console.log('matchingSkuFromList', matchingSkuFromList);
  if (!matchingSkuFromList) {
    const popularSamples = JSON.parse(sessionStorage.getItem(`${ID}__popular-samples`));
    //console.log('no sample just popular-sample', popularSamples);
    const renderData = popularSamples.map(({ url, name, price, image_url }) => {
      return {
        sampleUrl: url,
        primaryImage: image_url,
        title: name,
        price: price,
      };
    });
    // console.log(renderData);
    renderSamplePromo(ID, renderData, false);
    const clickListenerAnchor = document.querySelector(`.${ID}__samplespromo`);

    clickHandler(ID, clickListenerAnchor, fireEvent);
    return;
  }

  const primarySampleUrl = `/products/${matchingSkuFromList.toLowerCase()}`;

  //console.log('handle', matchingSkuFromList);

  getProductData(primarySampleUrl).then((res) => {
    //console.log('sample 123', res);
    const sampleVariants = res.variants;
    const sampleToRender = sampleVariants.filter(
      (sampVariant) => sampVariant.title == variantSelected.title || sampVariant.title == 'Default Title'
    )[0];
    //console.log('sampleVariants', sampleVariants);
    const popularSamples = JSON.parse(sessionStorage.getItem(`${ID}__popular-samples`));
    //console.log('sampleToRender', sampleToRender);
    sampleToRender.primaryImg = res['featured_image'];
    const mergedSamples = VARIATION == 2 ? [sampleToRender] : [sampleToRender, ...popularSamples.slice(0, 2)];
    //const mergedSamples = VARIATION == 2 ? [...popularSamples.slice(0, 3)] : [sampleToRender, ...popularSamples.slice(0, 2)];
    //console.log('merged sample', mergedSamples);
    const modifiedMergedSamples = mergedSamples.map((item) => {
      const dataFromShopify = item['inventory_management'];
      const sampleUrl = dataFromShopify ? `${primarySampleUrl}?variant=${item.id}` : item.url;
      const primaryImage = dataFromShopify ? item.primaryImg : item['image_url'];
      const title = item.name;
      const price = dataFromShopify ? item['price'] / 100 : item.price;

      return {
        sampleUrl,
        primaryImage,
        title,
        price,
      };
    });

    //render new content
    //console.log('modified sample', modifiedMergedSamples);

    renderSamplePromo(ID, modifiedMergedSamples);

    // console.log('3 samples', modifiedMergedSamples);

    const clickListenerAnchor = document.querySelector(`.${ID}__samplespromo`);

    clickHandler(ID, clickListenerAnchor, fireEvent);
  });
};

export default () => {
  setup();

  //get most bought sample from DY, if different session

  //store in session storage
  /*********************************/

  //get product sku from PDP
  //check if it is in the list
  //if it is, show the relevant sample

  getProductData().then((result) => {
    //console.log(`${ID}__result`, result);
    //get sku
    const variants = VARIATION !== '2' ? result.variants : [];
    init(variants);

    //monitor variant selection by the user
    const mutationAnchor = '#product-detail';
    const mutationCallback = (mutation) => {
      const { addedNodes } = mutation;

      addedNodes.forEach((addedNode) => {
        if (addedNode.parentElement && addedNode.parentElement.matches('.swatch-title')) {
          init(variants);
        }
      });
    };

    VARIATION != 'control' && observeDOM(mutationAnchor, mutationCallback);
    const conditionsMetAnchor = VARIATION == 'control' ? `#product-tabs` : `.${ID}__samplespromo`;
    pollerLite([conditionsMetAnchor], () => {
      const target = document.querySelector(conditionsMetAnchor);

      const intersectionCallback = (entry) => {
        const intersectingElemClasses = entry.target.classList;
        if (entry.isIntersecting && !intersectingElemClasses.contains(`${ID}__seen`)) {
          intersectingElemClasses.add(`${ID}__seen`);
          // console.log('Conditions Met');
          fireEvent('Conditions Met');
        }
      };

      obsIntersection(target, 0.5, intersectionCallback);
    });
  });
};
