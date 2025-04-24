/* eslint-disable no-new */

/**
 * AG006 - New PDP iteration
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, translate } from './services';
import shared from './shared';
import VariantHover from './components/VariantHover/VariantHover';
import PDPCtas from './components/PDPCtas/PDPCtas';
import { isOverflown, pollerLite } from '../../../../../lib/utils';
import SelectedShade from './components/SelectedShade/SelectedShade';
import { angularCompile } from '../../../../../lib/utils/avon';

export default () => {
  setup();
  const { $, ID, rootScope } = shared;

  /** Rearrange DOM where necessary for correct styling */
  const rearrangeDOM = () => {
    /**
     * Move regular price label to before the price value
     */
    const moveRegularPriceLabel = () => {
      const $regularPrice = $('.Details .ListPrice');
      $regularPrice
        .children('span')
        .remove();
      $regularPrice.prepend(`<span>${translate('Regular price')}</span>`);
    };

    const changeVariantSelectionHeight = () => {
      const change = () => {
        const $variants = $('.Shades.ng-scope');
        const variantsScope = $variants.scope();

        if (variantsScope) {
          const { isShadeExpanderVisible } = variantsScope;
          if (isShadeExpanderVisible) {
            $variants.addClass(`${ID}_variantsExpander`);
          }

          const $overflowContainer = $variants.find('.Group .Short');

          if ($overflowContainer.length && !isOverflown($overflowContainer[0])) {
            // Content is not overflown, hide expander
            $variants.addClass(`${ID}_hideVariantsExpander`);
          }
        }
      };

      $(function() {
        change();
      });
    };

    const init = () => {
      moveRegularPriceLabel();

      // Removed in amend 23/09/19
      // changeVariantSelectionHeight();
    };

    init();
  };

  /** Add additional social media sharing links */
  const addAdditionalSharingLinks = () => {
    const isRussianSite = rootScope.ShopContext.Market === 'RU';
    if (isRussianSite) {
      pollerLite(['.SharingOverlay .Container'], () => {
        const $sharingLinks = $('.SharingOverlay');
        $sharingLinks.children('.Container').append(`
          <a class="okSvgIcon" ng-click="HideElementByClass('SharingOverlay');OkShare()"><svg-icon icon="social-ok"></svg-icon></a>
          <a class="vkSvgIcon" ng-click="HideElementByClass('SharingOverlay');VkShare()"><svg-icon icon="social-vk"></svg-icon></a>
        `);
        angularCompile($sharingLinks, $, $sharingLinks.scope());
      });
    }
  };

  /** Make all changes */
  const init = () => {
    new VariantHover();
    new PDPCtas();
    new SelectedShade();
    rearrangeDOM();
    addAdditionalSharingLinks();
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });

  init();
};
