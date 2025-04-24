import { fullStory, events } from '../../../../lib/utils';

/**
 * {{FL009}} - {{Sticky Nav Breadcrumb Variant}}
 */
const Run = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    settings: {
      ID: 'FL009',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const FL009PrevLink = localStorage.getItem('FL009_href');
      const FL009PrevTitle = localStorage.getItem('FL009_title');
      const productBrand = bodyVar.querySelector('#MoreFromLinks > ul > .MoreFromLinksRow > a');
      const navigationHeader = bodyVar.querySelector('#HeaderGroup');
      const contentParent = bodyVar.querySelector('#mp-pusher > .mp-scroller');

      return {
        bodyVar,
        FL009PrevLink,
        FL009PrevTitle,
        productBrand,
        navigationHeader,
        contentParent,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

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
    },
    components: {
      contentBuilder: () => {
        // Insert markup
        Exp.cache.navigationHeader.insertAdjacentHTML('afterend', `
        <div class="FL009-Wrap">
          <div class="FL009-Back-To-Wrap FL009-Back-To-Send">
            <a class="FL009-Back-To-Link FL009-Back-To-Send" href="${Exp.cache.FL009PrevLink}"><span class="FL009-Back-To-Text-Wrap FL009-Back-To-Send">Back to <span class="FL009-Back-To-Text FL009-Back-To-Send">${Exp.cache.FL009PrevTitle}</span></span></a>
          </div>

          <div class="FL009-Brand-Wrap FL009-Brand-Send">
            <a class="FL009-Brand-Link FL009-Brand-Send" href="${Exp.cache.productBrand.getAttribute('href')}"><span class="FL009-Brand-Text-Wrap FL009-Brand-Send">See all <span class="FL009-Brand-Text FL009-Brand-Send">${Exp.cache.productBrand.textContent}</span></span></a>
          </div>
        </div>
        `);
        // elements ready build scroll tracker
        Exp.components.getScrollPercent();
        // Build event tracking
        Exp.components.eventTracking();
      },
      getScrollPercent() {
        window.addEventListener('scroll', () => {
          // From stackoverflow
          const h = document.documentElement;
          const b = document.body;
          const st = 'scrollTop';
          const sh = 'scrollHeight';
          const scrollPercent = (((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100);
          // User has scrolled up to the top 10% of page, then show nav and hide test
          if (scrollPercent <= 10) {
            // Add styling class
            if (!Exp.cache.contentParent.classList.contains('FL009-Scrolled')) {
              Exp.cache.contentParent.classList.add('FL009-Scrolled');
            }
            // Remove styling class if it exists on scroll
          } else if (Exp.cache.contentParent.classList.contains('FL009-Scrolled')) {
            Exp.cache.contentParent.classList.remove('FL009-Scrolled');
          }
        });
      },
      eventTracking() {
        Exp.cache.bodyVar.querySelector('.FL009-Back-To-Wrap').addEventListener('click', (e) => {
          if (e.target.classList.contains('FL009-Back-To-Send')) {
            events.send(`${Exp.settings.ID}`, 'Click', 'Contextual Breadcrumb', { sendOnce: true });
          }
        });
        Exp.cache.bodyVar.querySelector('.FL009-Brand-Wrap').addEventListener('click', (e) => {
          if (e.target.classList.contains('FL009-Brand-Send')) {
            events.send(`${Exp.settings.ID}`, 'Click', 'Branded Breadcrumb', { sendOnce: true });
          }
        });
      },
    },
  };

  Exp.init();
};

const capturePrev = () => {
  const Exp = {
    capturePreviousPage: () => {
      const prevTitle = document.querySelector('.topheadbox h1 span').innerText.trim();
      let prevHref = window.location.pathname;

      // Check if pathname is search results
      if (prevHref.toUpperCase() === '/SEARCHRESULTS') {
        // new href is pathname + window location search
        prevHref += window.location.search;
      }

      localStorage.setItem('FL009_title', prevTitle);
      localStorage.setItem('FL009_href', prevHref);
    },
  };

  Exp.capturePreviousPage();
};

export { Run, capturePrev };
