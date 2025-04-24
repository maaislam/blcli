import { fullStory, events } from '../../../../lib/utils';


/**
 * {{TP124D}} - {{Zero Search Results Desktop}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP124D',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      // Breadcrumb with search term
      const searchTerm = bodyVar.querySelector('#breadcrumb li.active > span').textContent.trim();
      // Pageheader "Sorry we couldn't find any results"
      const pageHeader = bodyVar.querySelector('.content > h2');
      // Page subtitle "Try searching again"
      const pageSubTitle = bodyVar.querySelector('.item_container > .content > p');
      // Search form
      const searchFormContainer = bodyVar.querySelector('.item_container .siteSearch');
      // Search area container on page, insert category markup
      const searchAreaContainer = bodyVar.querySelector('.search_NoResult > .yCmsContentSlot');
      // search form for event tracking
      const searchForm = bodyVar.querySelector('.yCmsContentSlot .siteSearch.search > form');
      // Reassigned when rendering search area container
      let TP124DSearchContainer;
      // Reassigned when rendering category container
      let TP124DCategoryContainer;
      // Reassigned after all categories are rendered
      let TP124DCategories;
      return {
        docVar,
        bodyVar,
        searchTerm,
        pageHeader,
        pageSubTitle,
        searchFormContainer,
        TP124DSearchContainer,
        searchAreaContainer,
        TP124DCategoryContainer,
        TP124DCategories,
        searchForm,
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
        // Edit text of page title
        Exp.render.newPageTitle();
        // Edit search area
        Exp.render.searchAreaTips();
        // Insert Category Area
        Exp.render.categoryArea();
        // Add test tracking
        Exp.bindExperimentEvents.addCategoryTracking();
        Exp.bindExperimentEvents.searchAgainEvent();
      },
    },
    render: {
      // Changes text of page title and subtitle, inserts search term
      newPageTitle() {
        Exp.cache.pageHeader.textContent = 'Oops we didn’t find any results for: ';
        Exp.cache.pageHeader.insertAdjacentHTML('afterend', `
        <span class="TP124D_Searched_Term">${Exp.cache.searchTerm}</span>
        `);
        Exp.cache.pageSubTitle.textContent = 'Don’t give up - check the spelling or try less specific search terms';
      },
      // Moves search form into a container, inserts search tips
      searchAreaTips() {
        // Create a container for search form and tips
        Exp.cache.searchFormContainer.parentNode.insertAdjacentHTML('beforeend', `
        <div class="TP124D_Search_Area_Container"></div>
        `);
        // Insert title above form
        Exp.cache.searchFormContainer.insertAdjacentHTML('afterbegin', `
          <span class="TP124D_Search_Form_Title">Use our tips and try again:</span>
        `);
        // Assign selector
        Exp.cache.TP124DSearchContainer = Exp.cache.bodyVar.querySelector('.TP124D_Search_Area_Container');
        // Move form to container
        Exp.cache.TP124DSearchContainer.insertAdjacentElement('afterbegin', Exp.cache.searchFormContainer);
        // Insert Search tips
        Exp.cache.TP124DSearchContainer.insertAdjacentHTML('beforeend', `
        <div class="TP124D_Search_Tips_Container">
          <ul class="TP124D_Search_Tips">
            <li class="TP124D_Search_Tip">Ensure you have spelt all search words correctly</li>
            <li class="TP124D_Search_Tip">Enter fewer search words</li>
            <li class="TP124D_Search_Tip">Enter different search terms</li>
          </ul>
        </div>
        `);
        // Insert find branch locator markup
        Exp.cache.TP124DSearchContainer.insertAdjacentHTML('beforeend', `
         <span class="TP124D_Branch_Locator_Text">Contact your local branch using our <a class="TP124D_Branch_Locator_Link" href="/branch-locator">branch locator</a></span>
        `);
      },
      // Insert category area
      categoryArea() {
        const categoryData = [
          { img: '//sb.monetate.net/img/1/581/1557607.png', alt: 'Building Materials', link: '/Product/Building-Materials/c/1500029' },
          { img: '//sb.monetate.net/img/1/581/1557612.png', alt: 'Gardens & Landscaping', link: '/Product/Gardens+Landscaping/c/1500098' },
          { img: '//sb.monetate.net/img/1/581/1557615.png', alt: 'Timber', link: '/Product/Timber/c/1500000' },
          { img: '//sb.monetate.net/img/1/581/1557614.png', alt: 'Kitchens', link: '/Product/Kitchens/c/1509005' },
          { img: '//sb.monetate.net/img/1/581/1557609.png', alt: 'Doors, Windows & Joinery', link: '/Product/Doors%2C-Windows+Joinery/c/1500152' },
          { img: '//sb.monetate.net/img/1/581/1571058.png', alt: 'Bathrooms', link: '/Product/Bathrooms/c/1500376' },
          { img: '//sb.monetate.net/img/1/581/1571061.png', alt: 'Decorating & Interiors', link: '/Product/Decorating+Interiors/c/1500538' },
          { img: '//sb.monetate.net/img/1/581/1571063.png', alt: 'Electrical & Lighting', link: '/Product/Electrical+Lighting/c/1500571' },
          { img: '//sb.monetate.net/img/1/581/1571064.png', alt: 'Fixings & Adhesives', link: '/Product/Fixings+Adhesives/c/1500237' },
          { img: '//sb.monetate.net/img/1/581/1571065.png', alt: 'Tool Hire', link: '/Product/Tool-Hire/c/1571000' },
          { img: '//sb.monetate.net/img/1/581/1571068.png', alt: 'Tools & Workwear', link: '/Product/Tools+Workwear/c/1500450' },
          { img: '//sb.monetate.net/img/1/581/1573348.png', alt: 'Plumbing & Heating', link: '/Product/Plumbing+Heating/c/1500282' },
        ];
        Exp.cache.searchAreaContainer.insertAdjacentHTML('afterend', `
        <h3 class="TP124D_Category_Header">Or why not look through our popular categories?</h3>
        <div class="TP124D_Category_Conatiner">
        </div>
        `);
        // Store selector, and loop over category data
        Exp.cache.TP124DCategoryContainer = Exp.cache.bodyVar.querySelector('.TP124D_Category_Conatiner');
        for (let i = 0; i < categoryData.length; i += 1) {
          // Insert markup
          Exp.cache.TP124DCategoryContainer.insertAdjacentHTML('beforeend', `
          <div class="TP124D_Category_Block">
            <a class="TP124D_Category_Link" href="${categoryData[i].link}">
              <img class="TP124D_Category_Image" src="${categoryData[i].img}" alt="${categoryData[i].alt}" />
            </a>
          </div>
          `);
        }
        // Store Selector for event tracking
        Exp.cache.TP124DCategories = Exp.cache.bodyVar.querySelectorAll('.TP124D_Category_Link');
      },
    },
    bindExperimentEvents: {
      // Tracking code for categories
      trackCategory(e) {
        // Sends image alt tag text in event for which category is clicked
        const categoryClicked = e.target.alt;
        if (categoryClicked) {
          events.send(`${Exp.settings.ID}`, 'Clicked', `Category: ${categoryClicked}`, { sendOnce: true });
        }
      },
      // Binds tracking code to categories
      addCategoryTracking() {
        for (let i = 0; i < Exp.cache.TP124DCategories.length; i += 1) {
          Exp.cache.TP124DCategories[i].addEventListener('click', Exp.bindExperimentEvents.trackCategory);
        }
      },
      searchAgainEvent() {
        // Sends an event when the search again searchbox is used
        Exp.cache.searchForm.addEventListener('submit', () => {
          events.send(`${Exp.settings.ID}`, 'Search', 'Second search box', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
