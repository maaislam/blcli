import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ PD024 }} - {{ Branding Filters }}
 */
const Run = () => {
  const Exp = {
    settings: {
      ID: 'PD024',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const newsletter = bodyVar.querySelector('.subcat_rightCol .news_signup');
      const categoryTitle = bodyVar.querySelector('.catBanner h2').innerText;

      localStorage.setItem('PD024_bucket', 'true');

      return {
        bodyVar,
        newsletter,
        categoryTitle,
      };
    })(),
    init: () => {
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
    },
    services: {
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      contentBuilder: () => {
        Exp.cache.newsletter.insertAdjacentHTML('afterend', `
          <div class="PD024_filter-wrap"><h2>Shop ${Exp.cache.categoryTitle} By Brand:</h2></div>
        `);

        const filterWrap = document.querySelector('.PD024_filter-wrap');
        const refinementToggle = document.querySelectorAll('.refinementToggle h4');
        let brandItem;

        [].forEach.call(refinementToggle, (item) => {
          if (item.innerText === 'Brand') {
            brandItem = item;
          }
        });

        brandItem = brandItem.parentNode.parentNode.parentNode;
        const brandFilters = brandItem.querySelectorAll('.facetValues .allFacetValues .facet_block li');

        [].forEach.call(brandFilters, (item) => {
          const itemText = item.innerText.replace(/\s*\(.*?\)\s*/g, '').trim();
          filterWrap.insertAdjacentHTML('beforeend', `
            <a class="PD024_new-brand" href="${item.querySelector('a').href}">${itemText}</a>
          `);
        });

        const newBrands = document.querySelectorAll('.PD024_new-brand');

        [].forEach.call(newBrands, (item) => {
          item.addEventListener('click', () => {
            events.send(`${Exp.settings.ID}`, 'Click', `User clicked ${item.innerText} in the new brand section`, { sendOnce: true });
          });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
