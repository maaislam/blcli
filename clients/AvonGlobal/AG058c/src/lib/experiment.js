/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { throttle } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();
  const { rootScope, ID, VARIATION } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    const $pageContent = $('#CategoryPage');
    const $categories = $('#CategoriesSection');
    const $subCategories = $('.SubCategoryList');
    const isSubcatPage = ($subCategories.length > 0);
    const $content = (isSubcatPage ? $subCategories : $categories);
    const $back = $('#PreviousPage');
    const $backWrapper = $back.parent();
    const $brands = $('#BrandsSection');
    const $socials = $('.DashboardSocialIcons');

    // Add a wrapper to categories
    const $headerWrapper = $(`<div class="${ID}_wrapper"></div>`);
    const $catsWrapper = $(`<div class="${ID}_categories-wrapper ${ID}_has-right-arrow"></div>`);

    // Add scroll icons
    const $leftScroll = $(`<span class="${ID}_left-scroll"><img src="https://service.maxymiser.net/cm/images-eu/avon-mas/055E79B2C6097BF826DB36918B896BEDA0A03758250B4B39E4974864D22017B1.svg?meta=/AG058a---Horizontal-category-scroll-on-mobile-PLP---UK/Path4.svg" /></span>`);
    const $rightScroll = $(`<span class="${ID}_right-scroll"><img src="https://service.maxymiser.net/cm/images-eu/avon-mas/055E79B2C6097BF826DB36918B896BEDA0A03758250B4B39E4974864D22017B1.svg?meta=/AG058a---Horizontal-category-scroll-on-mobile-PLP---UK/Path4.svg" /></span>`);
    $catsWrapper.append($leftScroll).append($rightScroll);

    // Update category title
    const updateCatTitle = () => {
      $subCategories.find('li').removeClass(`${ID}_category-active`);
      $(this).parent().addClass(`${ID}_category-active`);
      const title = rootScope.ShopContext.Breadcrumbs[rootScope.ShopContext.Breadcrumbs.length - 1].Text; // @todo
      $back.siblings('h1').text(title); // Set category title
    };

    const backButtonScope = $back.scope();
    backButtonScope.$parent.$apply(() => {
      backButtonScope.$parent.LoadPreviousPage = () => {
        let crumbIndex = rootScope.ShopContext.Breadcrumbs.length - 2;
        let backUrl = null;
        if (crumbIndex > 0) backUrl = rootScope.ShopContext.Breadcrumbs[crumbIndex].Url;

        if (backUrl) location.replace(backUrl);
        else location.replace(document.referrer);
      }
    });

    // Cats or subcats?
    if (isSubcatPage) {
      $catsWrapper.append($subCategories);
      $subCategories.find('li a').click(updateCatTitle);
    }
    else {
      // Wrap up the cats
      $catsWrapper.append($categories);

      // Add active class to category when selected.
      $categories.find('.CategoryItem').click(function (e) {
        $(this).addClass(`${ID}_category-active`);
      });
    }

    // Move brands after socials
    // if ($brands.length > 0 && $socials.length > 0) $socials.after($brands);

    // Previous Page button change to icon
    if ($back.length > 0) {
      $back.parent().addClass(`${ID}_back-button-wrapper`);
      const title = rootScope.ShopContext.Breadcrumbs[rootScope.ShopContext.Breadcrumbs.length - 1].Text; // @todo
      $back.siblings('h1').text(title); // Set category title
      $back.find('a').siblings().remove(); // remove current arrow.
      $back.find('a').html('<img src="https://service.maxymiser.net/cm/images-eu/avon-mas/FB96CC9F628122B09AE85F4236EBEBD6F30B2E8223AA83415093A2D8DA5F46EF.svg?meta=/AG058a---Horizontal-category-scroll-on-mobile-PLP---UK/arrow_left.svg" alt="back" />');
    }

    // Add header items to a wrapper element so we can give it a nice background
    $headerWrapper.append($socials).append($backWrapper).append($catsWrapper);
    $pageContent.prepend($headerWrapper);

    // Move brands and additional to be after the cats wrapper.
    $headerWrapper.after($('#CategoryTools').parent())

  // Event listeners

    // Toggle arrows/fade effect on the list
    const throttledScroll = throttle(() => {
      const leftPos = $content.scrollLeft();

      if (leftPos > 20) $content.parent().addClass(`${ID}_has-left-arrow`);
      else $content.parent().removeClass(`${ID}_has-left-arrow`);

      const elmWidth = $content[0].scrollWidth;
      if ((leftPos + $content.width()) > (elmWidth - 20)) $content.parent().removeClass(`${ID}_has-right-arrow`);
      else $content.parent().addClass(`${ID}_has-right-arrow`);

    }, 100);
    $content.scroll(throttledScroll);

    // Scroll cats on icon click.
    $(`.${ID}_left-scroll`).click((e) => {
      $content.animate({
        scrollLeft: $content.scrollLeft() - 200
      }, 250);
    });
    $(`.${ID}_right-scroll`).click((e) => {
      $content.animate({
        scrollLeft: $content.scrollLeft() + 200
      }, 250);
    });

    // Hide our stuff if no cats/subcats are there.
    if ($content.children().length < 1) $content.parent().hide();
    else {
      events.send(`${ID}-${VARIATION}`, 'horizontal-categories-visible');
      // Track horizontal scroll visible
      if (isSubcatPage) {
        $subCategories.find('li a').click(function (e) {
          events.send(`${ID}-${VARIATION}`, 'click', $(this).text().trim());
        });
      }
      else {
        $categories.find('.CategoryItem').click(function (e) {
          events.send(`${ID}-${VARIATION}`, 'click', $(this).text().trim());
        });
      }
    }
  };


  init();
};
