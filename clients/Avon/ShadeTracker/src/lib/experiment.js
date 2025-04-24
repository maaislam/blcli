/**
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import shared from './shared';
import { getPageType } from './services';

export default () => {
  const { $, rootScope } = shared;

  const initPageTracking = (pageType) => {
    const pages = {
      foundationPDP() {
        /**
         * Add a string to the history in local storage
         * If the addition of this selection exceeds the limit of 10
         * items, the oldest item will be removed from the array
         * @param {string} choiceStr
         */
        const addChoiceToHistory = (choiceStr) => {
          const foundationData = window.localStorage.UC_foundationData;
          const history = foundationData ? foundationData.split(',') : [];
          history.push(choiceStr);
          if (history.length > 10) history.shift();
          window.localStorage.UC_foundationData = history.join(',');
        };

        /**
         * When a foundation is added to the cart, store the name
         * and shade in local storage
         */
        rootScope.$on('CartService_AddSuccess', (event, data) => {
          const { Name, VariantName } = data.LastProductChanged;
          addChoiceToHistory(`${Name}|${VariantName}`);
        });
      },

      foundationFinder() {
        const $types = $('.umbraco-foundation-finder a')
          .filter((index, element) => {
            const text = $(element)
              .text()
              .trim()
              .toLowerCase();

            const includedText = [
              'shop liquid foundations',
              'shop compact foundations',
              'shop powder foundations',
              'shopliquidfoundations',
              'shopcompactfoundations',
              'shoppowderfoundations',
            ];

            return includedText.indexOf(text) > -1;
          })
          .closest('.ContentStack');

        /**
         * Add a string to the history in local storage
         * If the addition of this selection exceeds the limit of 10
         * items, the oldest item will be removed from the array
         * @param {string} choiceStr
         */
        const addChoiceToHistory = (choiceStr) => {
          const foundationData = window.localStorage.UC_foundationFinderData;
          const history = foundationData ? foundationData.split(',') : [];
          history.push(choiceStr);
          if (history.length > 10) history.shift();
          window.localStorage.UC_foundationFinderData = history.join(',');
        };

        $types.each((index, element) => {
          const $type = $(element);

          const isTracked = $type.attr('uc') === 'tracked';
          if (isTracked) return false;

          const type = $type
            .find('.FontNormal > strong')
            .text()
            .trim();
          const shade = $type
            .closest('.ContentRow')
            .prev('.ContentRow')
            .find('.FontNormal > strong')
            .text()
            .trim();

          const $links = $type.find('a');
          $links.each((linkIndex, linkElement) => {
            const $link = $(linkElement);
            $link.click(() => {
              addChoiceToHistory(`${shade}|${type}`);
            });
          });

          $type.attr('uc', 'tracked');
        });
      },
    };

    if (pages[pageType] instanceof Function) pages[pageType]();
  };

  initPageTracking(getPageType());
};
