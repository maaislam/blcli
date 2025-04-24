import { fullStory, events } from '../../../../lib/utils';


/**
 * {{AC037}} - {{Mobile Landing Page}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'AC037',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const USPBar = bodyVar.querySelector('.AC018_usp');
      const numberOfAgencies = bodyVar.querySelectorAll('.AC0018_title > h2 > strong')[0].textContent;
      const agencyLocation = bodyVar.querySelectorAll('.AC0018_title > h2 > strong')[1].textContent;
      const agencyRefineTitle = bodyVar.querySelector('.AC018_search-refine > h2');
      const searchResultContainer = bodyVar.querySelector('.AC018_search-results');
      const openRefineSearch = bodyVar.querySelector('.AC018_refine-sticky-btn');

      return {
        docVar,
        bodyVar,
        USPBar,
        numberOfAgencies,
        agencyLocation,
        agencyRefineTitle,
        searchResultContainer,
        openRefineSearch,
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
      // Default running event
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Insert content
        Exp.render.topTextArea();
        Exp.render.searchBarText();
        // Change refine title text - setting text content removes the close 'x'
        Exp.cache.agencyRefineTitle.firstChild.nodeValue = 'Improve your results';
        Exp.bindExperimentEvents.trackRefineBar();
        // Following no longer called, already exist in AC018/AC022
        // Exp.render.refineBar();
        // Add event listeners
        // Exp.bindExperimentEvents.handleRefineBar();
      },
    },
    render: {
      topTextArea() {
        Exp.cache.USPBar.insertAdjacentHTML('afterend', `
        <div class="AC037_Content_Area_Container">
          <h3 class="AC037_Location_Header">Looking for a recruitment agency in ${Exp.cache.agencyLocation}?</h3>
          <p class="AC037_Location_Information">With over ${Exp.cache.numberOfAgencies} agencies listed in ${Exp.cache.agencyLocation} alone, Agency Central 
            <span class="AC037_Bold">is the Recruitment Agency search engine.</span>
            <span class="AC037_Scroll_Down">Scroll Down for a list of agencies!</span>
          </p>
        </div>
        `);
      },
      searchBarText() {
        Exp.cache.searchResultContainer.insertAdjacentHTML('beforebegin', `
        <div class="AC037_Searchbar_Text_Container">
          <span class="AC037_Searchbar_Text">Showing 1-20 of ${Exp.cache.numberOfAgencies} agencies</span>
        </div>
        `);
      },
      // Refine bar and event listener already exist in AC018/AC022
      // refineBar() {
      // eslint-disable-next-line
      //   const AC037SearchBar = Exp.cache.bodyVar.querySelector('.AC037_Searchbar_Text_Container');
      //   AC037SearchBar.insertAdjacentHTML('afterend', `
      //     <div class="AC037_Refine_Bar_Container">
      //       <span class="AC037_Refine_Bar_Text">Refine your search for better results GO</span>
      //       <span class="AC037_Arrow"></span>
      //     </div>
      //   `);
      // },
    },
    bindExperimentEvents: {
    //   // Click refine search button to open search area
    //   handleRefineBar() {
    //     const refineBar = Exp.cache.bodyVar.querySelector('.AC037_Refine_Bar_Container');
    //     refineBar.addEventListener('click', () => {
    //       Exp.cache.openRefineSearch.click();
    //     });
    //   },
      trackRefineBar() {
        Exp.cache.openRefineSearch.addEventListener('click', () => {
          // Send event
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Sticky Refine', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
