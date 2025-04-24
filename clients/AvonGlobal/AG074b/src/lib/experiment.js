/* eslint-disable quotes */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { fireEvent, isMobile, setup } from './services';
import shared from './shared';
import Modal from './components/Modal/Modal';
import { throttle } from '../../../../../lib/uc-lib';
import { angularCompile, angularContextWrap, getTemplate, replaceTemplate } from '../../../../../lib/utils/avon';

export default () => {
  setup();
  const { rootScope, ID, VARIATION } = shared;
  const modal = new Modal();
  const title = $('#Breadcrumbs div:last-child span').text(); //'Vianočné darčeky'; //
  let catsArranged = false;

  const $banner = $(`<div class="${ID}_container ${ID}_banner">
     <h1>${title}</h1>
   </div>`);

  const topBanner = () => {
    if ($(`.${ID}_banner`).length > 0) return;

    const $crumbsWrapper = $('#BreadcrumbBar');
    const $crumbs = $('#Breadcrumbs');
    $crumbsWrapper.after($banner);

    // Move crumbs to the new banner.
    $banner.prepend($crumbs);
  };

  const topLinks = () => {
    if ($(`.${ID}_topLinks`).length > 0) return;
    const markup = `
       <div class="${ID}_container ${ID}_topLinks">
         <div class="${ID}_container ${ID}_topLinksRow">
           <a class="${ID}_mobile" href="/6500-6592/darceky/parfumove-sety">Parfumové sety</a>
           <a class="${ID}_mobile" href="/6500-6593/darceky/dekorativna-kozmetika">Dekoratívna kozmetika</a>
           <a class="${ID}_mobile" href="/6500-6594/darceky/starostlivost-o-telo">Starostlivosť o telo</a>
           <a class="${ID}_mobile" href="/6500-6595/darceky/starostlivost-o-vlasy">Starostlivosť o vlasy</a>
           <a class="${ID}_mobile" href="/6500-6596/darceky/starostlivost-o-plet">Starostlivosť o pleť</a>
           <a href="/6500-6531/darceky/darceky-do-10">DO 10 €</a>
           <a href="/6500-6532/darceky/darceky-do-20">DO 20 €</a>
           <a href="/6500-6533/darceky/darceky-nad-20">NAD 20 €</a>
           <a href="/6500-6534/darceky/pre-nu">PRE ŇU</a>
           <a href="/6500-6535/darceky/pre-neho">PRE NEHO</a>
           <a href="/6500-6536/darceky/pre-deti">PRE DETI</a>
         </div>
         <div class="${ID}_topLinksArrow">
           <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M1 1L8 8.5L1 16" stroke="#7F28C4" stroke-width="2"/>
           </svg>
         </div>
       </div>
     `;
    $banner.after(markup);

    if (isMobile()) {
      const $scrollRow = $(`.${ID}_topLinksRow`);
      const $arrow = $(`.${ID}_topLinksArrow`);
      // Toggle arrow/fade effect on the list
      const throttledScroll = throttle(() => {
        const leftPos = $scrollRow.scrollLeft();

        if (leftPos > 20) $arrow.hide();
        else $arrow.show();
      }, 100);
      $scrollRow.scroll(throttledScroll);
    }
  };

  const arrangeCategories = () => {
    if (catsArranged) return;

    const wrapper = document.querySelector('.SubCategoryName');
    const cats = document.querySelectorAll('.SubCategoryName li');
    const set1 = [];
    const set2 = [];
    const set3 = [];
    cats.forEach((c) => {
      if (c.innerText.trim().match(/Darčeky/)) {
        console.log('test1');
        set2.push(c);
      } else if (c.innerText.trim().match(/Pre\s/)) {
        console.log('test2');
        set3.push(c);
      } else {
        console.log('test3');
        set1.push(c);
      }
    });
    set3.forEach((d, idx) => {
      wrapper.insertAdjacentElement('beforeend', d);
      if (idx == set3.length - 1) {
        console.log('test4');
        d.classList.add(`${shared.ID}__cat-end`);
      }
    });
    set2.forEach((d, idx) => {
      wrapper.insertAdjacentElement('beforeend', d);
      if (idx == set2.length - 1) {
        console.log('test5');
        d.classList.add(`${shared.ID}__cat-end`);
      }
    });

    set1.forEach((d, idx) => {
      wrapper.insertAdjacentElement('beforeend', d);
      if (idx == set1.length - 1) {
        console.log('test6', d);
        d.classList.add(`${shared.ID}__cat-end`);
      }
    });

    // const wrapper = document.querySelector(".SubCategoryName");
    // const cats = document.querySelectorAll(".SubCategoryName li");
    // console.log(cats);
    // const group1 = document.createElement("div");
    // const group2 = document.createElement("div");
    // const group3 = document.createElement("div");
    // group1.classList.add(`${ID}_catGroup1`);
    // group2.classList.add(`${ID}_catGroup2`);
    // group3.classList.add(`${ID}_catGroup3`);

    // // Make sure we have all the cats as per designs
    // if (cats.length === 9) {
    //   wrapper.insertAdjacentElement("afterend", group1);
    //   group1.insertAdjacentElement("afterend", group2);
    //   group2.insertAdjacentElement("afterend", group3);

    //   group1.insertAdjacentElement("beforeend", cats[6]);
    //   group1.insertAdjacentElement("beforeend", cats[7]);
    //   group1.insertAdjacentElement("beforeend", cats[8]);
    //   // group1.insertAdjacentElement("beforeend", cats[9]);
    //   // group1.insertAdjacentElement("beforeend", cats[10]);

    //   group2.insertAdjacentElement("beforeend", cats[0]);
    //   group2.insertAdjacentElement("beforeend", cats[1]);
    //   group2.insertAdjacentElement("beforeend", cats[2]);

    //   group3.insertAdjacentElement("beforeend", cats[3]);
    //   group3.insertAdjacentElement("beforeend", cats[4]);
    //   group3.insertAdjacentElement("beforeend", cats[5]);
    //   catsArranged = true;
    // }
  };

  const modifyProductListTemplate = () =>
    new Promise((resolve, reject) => {
      const templateName = 'productListTemplate.html';
      const directiveName = 'product-list';
      const template = getTemplate(templateName);
      const $template = $('<div>').html(template);
      const $product = $template.find('.ProductListCell .ProductListItem');
      const $rating = $template.find('rating');
      const $image = $template.find('.ProductImage');
      const $name = $template.find('.ProductName');
      const $details = $template.find('.ProductDetails');

      // Add product ID to DOM
      $product.attr('data-product-id', '{{::product.Id}}');
      $template.find('.ProductListCell').addClass(`${ID}_product-modified`);

      // Add product type classes
      $product.attr('ng-class', `{"${ID}_hasVariants": !product.SingleVariantSku, "${ID}_isConditional": product.Conditional}`);

      // Move things around
      $name.after($image);
      $name.after($rating);

      const $heading = $(`<div class="${ID}_heading ${ID}_headingTop"></div>`);
      $details.prepend($heading);
      $heading.append($name).append($rating);

      $image.attr('href', '');
      $image.attr('ng-click', '$parent.$parent.openImageModal(product, Qty, addProductToCart, viewProduct)');

      const $reviewsWrapper = $(`<div ng-if="product.RatingCount" class="${ID}_reviewsWrapper"></div>`);
      $rating.after($reviewsWrapper);
      $reviewsWrapper.append($rating);

      const $count = $template.find(`.${ID}_ratingCount`);
      if ($count.length < 1) {
        $reviewsWrapper.append(`<p class="${ID}_ratingCount"><span ng-bind="product.RatingCount"></span> recenze</p>`);
      } else {
        $reviewsWrapper.append($count);
      }

      // Add Modal popup button.
      if ($template.find(`.${ID}_modalButton`).length < 1) {
        $image.after(`
         <div class="${ID}_modalButton vi-btn" ng-click="$parent.$parent.openImageModal(product, Qty, addProductToCart, viewProduct)">Čo je vovnútri?</span></div>
         `);
      }

      // Make layout 3 columns
      $template.find('.ProductList').addClass('ReadyToDisplay');

      replaceTemplate(templateName, $template.html(), () => {
        // Re-compile directive
        const $section = $(directiveName);
        $section.empty();
        const $sectionScope = $section.scope();
        angularCompile($section, $, $sectionScope, () => {
          $sectionScope.$apply(() => {
            // Add 'Open Modal' function to the ProductList scope.
            const openImageModal = (product, Qty, addProductToCart, viewProduct) => {
              fireEvent('Click - quick view');
              modal.createModal(product, Qty, addProductToCart, viewProduct);
            };
            $sectionScope.openImageModal = openImageModal;
          });
          angularContextWrap(resolve);
        });
      });
    });

  const modifyProductListTemplateMobile = () =>
    new Promise((resolve, reject) => {
      const templateName = 'productListTemplate.html';
      const directiveName = 'product-list';
      const template = getTemplate(templateName);
      const $template = $('<div>').html(template);
      const $product = $template.find('.ProductListCell .ProductListItem');
      const $rating = $template.find('rating');
      const $image = $template.find('.ProductImage');
      const $name = $template.find('.ProductName');
      const $details = $template.find('.ProductDetails');
      const $detailsTop = $template.find('.ProductDetailsTop');
      const $prices = $template.find('.Prices');

      // Add product ID to DOM
      $product.attr('data-product-id', '{{::product.Id}}');
      $template.find('.ProductListCell').addClass(`${ID}_product-modified`);
      // Add product type classes
      $product.attr('ng-class', `{"${ID}_hasVariants": !product.SingleVariantSku, "${ID}_isConditional": product.Conditional}`);
      // New layout for product details.
      let $productDetails = $template.find(`.${ID}_productDetails`);
      if ($productDetails.length < 1) {
        $productDetails = $(`<div class="${ID}_productDetails"></div>`);
      }
      let $rightSide = $template.find(`.${ID}_rightSide`);
      if ($rightSide.length < 1) {
        $rightSide = $(`<div class="${ID}_rightSide"></div>`);
      }
      let $leftSide = $template.find(`.${ID}_leftSide`);
      if ($leftSide.length < 1) {
        $leftSide = $(`<div class="${ID}_leftSide"></div>`);
      }
      $detailsTop.before($productDetails);
      $productDetails.append($leftSide);
      $productDetails.append($rightSide);

      $leftSide.prepend($image);

      $rightSide.append($prices);
      $rightSide.append($template.find('productquantity'));

      let $heading = $template.find(`.${ID}_heading`);
      if ($heading.length < 1) {
        $heading = $(`<div class="${ID}_heading"></div>`);
      }
      $details.prepend($heading);
      $heading.append($name);

      $image.attr('href', '');
      $image.attr('ng-click', '$parent.$parent.openImageModal(product, Qty, addProductToCart, viewProduct)');

      let $reviewsWrapper = $template.find(`.${ID}_reviewsWrapper`);
      if ($reviewsWrapper.length < 1) {
        $reviewsWrapper = $(`<div ng-if="product.RatingCount" class="${ID}_reviewsWrapper"></div>`);
      }
      $reviewsWrapper.append($rating);

      let $count = $template.find(`.${ID}_ratingCount`);
      if ($count.length < 1) {
        $reviewsWrapper.append(`<p class="${ID}_ratingCount"><span ng-bind="product.RatingCount"></span> recenze</p>`);
      } else {
        $reviewsWrapper.append($count);
      }

      $prices.append($reviewsWrapper);

      // Add Modal popup button.
      if ($template.find(`.${ID}_modalButton`).length < 1) {
        $image.after(`
         <div class="${ID}_modalButton vi-btn" ng-click="$parent.$parent.openImageModal(product, Qty, addProductToCart, viewProduct)">Čo je vovnútri?</span></div>
       `);
      }

      // Ready.
      $template.find('.ProductList').addClass('ReadyToDisplay');

      replaceTemplate(templateName, $template.html(), () => {
        // Re-compile directive
        const $section = $(directiveName);
        $section.empty();
        const $sectionScope = $section.scope();
        angularCompile($section, $, $sectionScope, () => {
          $sectionScope.$apply(() => {
            // Add 'Open Modal' function to the ProductList scope.
            const openImageModal = (product, Qty, addProductToCart, viewProduct) => {
              fireEvent('Click - quick view');
              modal.createModal(product, Qty, addProductToCart, viewProduct);
            };
            $sectionScope.openImageModal = openImageModal;
          });
          angularContextWrap(resolve);
        });
      });
    });

  const eventTracking = () => {
    // Interactions with top and side filters
    $(`${ID}_topLinksRow a`).click(function () {
      fireEvent(`Click - Top filter: ${$(this).text().trim()}`);
    });

    $(`#CategoryLeftNav a`).click(function () {
      fireEvent(`Click - Sidebar filter: ${$(this).text().trim()}`);
    });

    // Product clicks (if possible differentiate which products have a callout, e.g. “Super cena”)
    $(document).on('click', `.ProductList .ProductName`, function () {
      fireEvent(`Click - Product`);
    });

    // Quantity change and add to carts
    $(document).on('click', `.ProductList .QtyUp`, function () {
      fireEvent(`Click - Quantity increase`);
    });
    $(document).on('click', `.ProductList .QtyDown`, function () {
      fireEvent(`Click - Quantity decrease`);
    });
    $(document).on('change', `.ProductList .Quantity input`, function () {
      fireEvent(`Change - quantity change`);
    });
    $(document).on('click', `.${ID}_ModalImages .QtyUp`, function () {
      fireEvent(`Click - Quick view Quantity increase`);
    });
    $(document).on('click', `.${ID}_ModalImages .QtyDown`, function () {
      fireEvent(`Click - Quick view Quantity decrease`);
    });
    $(document).on('change', `.${ID}_ModalImages .Quantity input`, function () {
      fireEvent(`Change - Quick view quantity change`);
    });
    $(document).on('click', `.ProductList .AddToCart .Button`, function () {
      fireEvent(`Click - Add to cart`);
    });
    $(document).on('click', `.${ID}_ModalImages .AddToCart .Button`, function () {
      fireEvent(`Click - Add to cart`);
    });
  };

  const init = () => {
    // Add banner
    topBanner();
    topLinks();
    arrangeCategories();
    eventTracking();
  };

  // On productlist change
  const productListScope = $('product-list').scope();

  // Broadcast an event every time the product list changes
  productListScope.$watch('ProductListUI.FilteredProducts', () => {
    setTimeout(() => {
      if (isMobile()) {
        modifyProductListTemplateMobile();
      } else {
        modifyProductListTemplate();
      }
    }, 500);
  });

  init();
};
