import { fullStory, events } from '../../../../lib/utils';


/**
 * {{TP127}} - {{3 Bullet Points (TP002 revision)}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP127',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      // Overview points
      const overviewPoints = bodyVar.querySelectorAll('#tab-overview .featureClass ul > li');
      // Price/login container
      const priceLoginContainer = bodyVar.querySelector('#tpPdpRightPanelComponent > .tpInfoWrapper');
      // Overview tab
      const overviewTab = docVar.getElementById('tab_01');
      // Reassigned when markup is added
      let insertedOverviewContainer;
      let readMore;

      return {
        docVar,
        bodyVar,
        overviewPoints,
        priceLoginContainer,
        insertedOverviewContainer,
        readMore,
        overviewTab,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      // const hide = document.getElementById(`${settings.ID}_flickerPrevention`);
      // hide.parentElement.removeChild(hide);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Render container markup
        Exp.render.contentContainer();
        // Assign selectors
        Exp.cache.insertedOverviewContainer = Exp.cache.bodyVar.querySelector('.TP127_Overview_Container');
        Exp.cache.readMore = Exp.cache.bodyVar.querySelector('.TP127_Read_More');
        // Render overview points
        Exp.render.addOverviewPoints();
        // bind function to read more link
        Exp.bindExperimentEvents.readMoreClick();
      },
    },
    render: {
      contentContainer() {
        // Inserts test markup container after price area
        Exp.cache.priceLoginContainer.insertAdjacentHTML('afterend', `
        <div class="TP127_Container">
          <ul class="TP127_Overview_Container">
          </ul>
          <span class="TP127_Read_More">Read More</span>
        </div>
        `);
      },
      addOverviewPoints() {
        // Loop through overview points and retrieve text for top 3
        for (let i = 0; i < Exp.cache.overviewPoints.length; i += 1) {
          if (i === 3) {
            break;
          } else {
            Exp.cache.insertedOverviewContainer.insertAdjacentHTML('beforeend', `
            <li class="TP127_Overview_Point">${Exp.cache.overviewPoints[i].textContent}</li>
            `);
          }
        }
      },
    },
    bindExperimentEvents: {
      // Scroll to overview when clicking read more
      readMoreClick() {
        Exp.cache.readMore.addEventListener('click', () => {
          // Send event
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Read More', { sendOnce: true });
          // click the overview tab, make sure overview points are displayed
          Exp.cache.overviewTab.click();
          // Scroll to overview points
          $('html, body').animate({ scrollTop: $(Exp.cache.overviewTab).offset().top - 50 });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
