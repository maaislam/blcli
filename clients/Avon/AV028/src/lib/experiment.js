/* eslint-disable no-new */
/**
 * AG018 - New PDP iteration - Price updates
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import NewProductDetails from './components/NewProductDetails/NewProductDetails';
import AdditionalOffer from './components/AdditionalOffer/AdditionalOffer';
import PDPCtas from './components/PDPCtas/PDPCtas';
import SelectedShade from './components/SelectedShade/SelectedShade';
import { pollerLite } from '../../../../../lib/utils';
import { angularCompile } from '../../../../../lib/utils/avon';

export default () => {
  setup();

  const { rootScope, ID, VARIATION } = shared;
  const { Market } = rootScope.ShopContext;
  const savingType = {
    CZ: 'total',
    SK: 'percentage',
    RU: VARIATION === '1' ? 'total' : 'percentage',
    default: VARIATION === '1' ? 'total' : 'percentage',
  };

  /** Make all changes */
  const init = () => {
    new NewProductDetails({
      savingType: savingType[Market] || savingType.default,
    });
    new SelectedShade();

    if (Market === 'RU') {
      /** Add additional social media sharing links */
      const addRussianSharingLinks = () => {
        pollerLite(['.SharingOverlay .Container'], () => {
          const $sharingLinks = $('.SharingOverlay');
          $sharingLinks.children('.Container').append(`
            <a class="okSvgIcon" ng-click="HideElementByClass('SharingOverlay');OkShare()"><svg-icon icon="social-ok"></svg-icon></a>
            <a class="vkSvgIcon" ng-click="HideElementByClass('SharingOverlay');VkShare()"><svg-icon icon="social-vk"></svg-icon></a>
          `);
          angularCompile($sharingLinks, $, $sharingLinks.scope());
        });
      };

      /** Remove English from shade names */
      const removeEnglishTextFromShades = () => {
        /**
         * @param {HTMLElement} element shade name element
         * @returns {string | null}
         */
        const getEnglishText = (element) => {
          const $shadeName = $(element);
          const shadeName = $shadeName.text();
          const regexMatches = shadeName.match(/([аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ\s-0-9]+)(\/.+)/);
          const englishText = regexMatches && regexMatches.length === 3 ? regexMatches[2] : null;
          return englishText;
        };

        /**
         * @param {HTMLElement} element shade name element
         */
        const removeEnglishText = (element) => {
          const $shadeName = $(element);
          const shadeName = $shadeName.text();
          const englishText = getEnglishText(element);
          const newShadeName = shadeName.replace(englishText, '');
          $shadeName[0].childNodes[0].textContent = newShadeName;
        };

        // Remove text for all shade names
        const $shadeNames = $('.Shades .GroupHeader .Dark');
        $shadeNames.each((index, element) => {
          removeEnglishText(element);
        });
      };

      addRussianSharingLinks();
      const shadeScope = $('.Shades').scope();
      if(shadeScope) {
        shadeScope.$watch('selectedShadeVariant', () => {
          setTimeout(removeEnglishTextFromShades, 0);
        });
      }
    }

    // Don't show the new additional offer component if running on the UK market (AV028)
    if (ID !== 'AV028') {
      new AdditionalOffer();
    } else {
      // If UK market, change the text to view additional offer
      pollerLite(['.Exclusive > span'], () => {
        $('.Exclusive > span').text('View additional offer');
      });
    }
  };

  init();

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });
};
