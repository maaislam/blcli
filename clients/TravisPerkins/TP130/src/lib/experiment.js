import { fullStoryMap, eventsMap } from '../../../../../lib/utils';

/**
 * {{TP130}} - {{Search Reviews}}
 */
const Run = (cache) => {
  const doc = document;
  const bodyVar = doc.body;
  const reviewElements = bodyVar.querySelectorAll('.reviewAvgRatingRange li a');

  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP130',
      VARIATION: '1',
    },
    init: () => {
      // Setup
      const { services, settings, components, bindings } = Exp;

      bodyVar.classList.add(settings.ID);
      
      components.render();
      bindings.reviewClick();
      services.tracking();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStoryMap(settings.ID, `Variation ${settings.VARIATION}`);
      },
      /*
        eventsMap.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      render() {
        const contentWrap = cache.get('contentWrap');
        const siteLinks = cache.get('reviewWrap').querySelectorAll('li a');
        const search = window.location.search;
        let searchText = doc.getElementById('search').value;
        let reviewValues = '';

        if (searchText) {
          reviewValues += `
            <p>You searched for "<strong>${searchText}</strong>"</p>
            <p>Filter by average review:</p>
          `;
        } else {
          reviewValues += '<p>Filter by average review:</p>';
        }

        for (let i = 0; i < siteLinks.length; i += 1) {
          const curr = siteLinks[i];
          const href = curr.href;
          const text = curr.nextSibling.nodeValue;

          if (href.indexOf('%3AreviewAvgRatingRange%3A5') > -1) {
            // 5 Stars
            reviewValues += `<a href="${href}" class="TP130_quick-review TP130_stars-5">${text}</a>`;
          } else if (href.indexOf('%3AreviewAvgRatingRange%3A4') > -1) {
            // 4 Stars
            reviewValues += `<a href="${href}" class="TP130_quick-review TP130_stars-4">+${text}</a>`;
          } else if (href.indexOf('%3AreviewAvgRatingRange%3A3') > -1) {
            // 3 Stars
            reviewValues += `<a href="${href}" class="TP130_quick-review TP130_stars-3">+${text}</a>`;
          }
        }

        contentWrap.insertAdjacentHTML('beforebegin', `
          <div class="TP130_filter-wrap">
            ${reviewValues}
          </div>
        `);
      },
    },
    bindings: {
      reviewClick() {
        const reviewLinks = bodyVar.querySelectorAll('.TP130_quick-review');

        for (let i = 0; i < reviewLinks.length; i += 1) {
          const curr = reviewLinks[i];

          curr.addEventListener('click', () => {
            eventsMap.send(`${Exp.settings.ID}`, 'Click', 'Review Button', { sendOnce: true });
          });
        }
      }
    }
  };

  Exp.init();
};

export default Run;
