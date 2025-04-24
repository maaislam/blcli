import { fullStory, events } from '../../../../lib/utils';


/**
 * {{TP124m}} - {{Zero Search Results - Mobile}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP124m',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      // Clean search term text
      let searchedText = bodyVar.querySelector('.no-result h1').textContent.trim().replace(/Sorry, we couldn't find any results for '/g, '');
      // Remove full stop and quotation close
      searchedText = searchedText.substring(0, searchedText.length - 2);
      // Page content container
      const pageContainer = bodyVar.querySelector('.content_holder');
      // Site search container
      const siteSearchContainer = bodyVar.querySelector('.content_holder .siteSearch');
      // Second search form
      const searchForm = bodyVar.querySelector('.content_holder form[name="search_form"]');

      return {
        docVar,
        bodyVar,
        searchedText,
        pageContainer,
        siteSearchContainer,
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
        // insert Search tips
        Exp.render.searchTips();
        // insert page header above search tips
        Exp.render.pageHeader();
        // insert branch locator
        Exp.render.branchLocator();
        // Insert categories
        Exp.render.popularCategories();
        // Add tracking
        Exp.bindExperimentEvents.trackSearchBox();
        Exp.bindExperimentEvents.addCategoryTracking();
      },
    },
    render: {
      pageHeader() {
        Exp.cache.pageContainer.insertAdjacentHTML('afterbegin', `
        <div class="TP124m_Header_Container">
          <span class="TP124m_No_Result_Text">Oops we didn’t find any results for </span>
          <span class="TP124m_Searched_Text">"${Exp.cache.searchedText}"</span>
          <span class="TP124m_No_Result_Subheader">Don’t give up - check the spelling or try less specific search terms</span>
        </div>
        `);
      },
      searchTips() {
        Exp.cache.pageContainer.insertAdjacentHTML('afterbegin', `
        <div class="TP124m_Search_Tips_Container">
          <ul class="TP124m_Search_Tips_List">
            <li class="TP124m_Search_Tip">Ensure you have spelt all search words correctly</li>
            <li class="TP124m_Search_Tip">Enter fewer search words</li>
            <li class="TP124m_Search_Tip">Enter different search terms</li>
          </ul>
        </div>
        `);
      },
      branchLocator() {
        Exp.cache.siteSearchContainer.insertAdjacentHTML('afterend', `
        <div class="TP124m_Branch_Locator_Container">
          <span class="TP124m_Branch_Locator_Text">Contact your local branch using our <a href="/branch-locator" class="TP124m_Branch_Locator_Link">branch locator</a></span>
        </div>
        `);
      },
      popularCategories() {
        const categoryData = [
          { link: '/Product/Building-Materials/c/1500029', category: 'Building_Materials', data: 'Building Materials' },
          { link: '/Product/Gardens+Landscaping/c/1500098', category: 'Gardens_Landscaping', data: 'Gardens Landscaping' },
          { link: '/Product/Timber/c/1500000', category: 'Timber', data: 'Timber' },
          { link: '/Product/Kitchens/c/1509005', category: 'Kitchens', data: 'Kitchens' },
          { link: '/Product/Doors%2C-Windows+Joinery/c/1500152', category: 'Doors_Windows_Joinery', data: 'Doors Windows Joinery' },
          { link: '/Product/Bathrooms/c/1500376', category: 'Bathrooms', data: 'Bathrooms' },
          { link: '/Product/Decorating+Interiors/c/1500538', category: 'Decorating_Interiors', data: 'Decorating Interiors' },
          { link: '/Product/Electrical+Lighting/c/1500571', category: 'Electrical_Lighting', data: 'Electrical Lighting' },
          { link: '/Product/Fixings+Adhesives/c/1500237', category: 'Fixings_Adhesives', data: 'Fixings Adhesives' },
          { link: '/Product/Tool-Hire/c/1571000', category: 'Tool_Hire', data: 'Tool Hire' },
          { link: '/Product/Tools+Workwear/c/1500450', category: 'Tools_Workwear', data: 'Tools Workwear' },
          { link: '/Product/Plumbing+Heating/c/1500282', category: 'Plumbing_Heating', data: 'Plumbing Heating' },
        ];
        Exp.cache.pageContainer.insertAdjacentHTML('afterend', `
        <div class="TP124m_Categories_Wrap">
            <h3 class="TP124m_Category_Header">Or why not look through our popular categories?</h3>
          <div class="TP124m_Categories_Container">
          </div>
        </div>
        `);
        // Store selector for markup insertion
        const categoryContainer = Exp.cache.bodyVar.querySelector('.TP124m_Categories_Container');
        // Add categories
        for (let i = 0, n = categoryData.length; i < n; i += 1) {
          categoryContainer.insertAdjacentHTML('beforeend', `
          <div class="TP124m_Category_Block">
            <a data-tp124m-category="${categoryData[i].data}" href="${categoryData[i].link}" class="TP124m_Category_Link TP124m_Category_${categoryData[i].category}">
            </a>
          </div>
          `);
        }
      },
    },
    bindExperimentEvents: {
      // Track use of second search box
      trackSearchBox() {
        Exp.cache.searchForm.addEventListener('submit', () => {
          events.send(`${Exp.settings.ID}`, 'Search', 'Second search box', { sendOnce: true });
        });
      },
      // Track click to added categories
      trackCategory(e) {
        const category = e.target.getAttribute('data-tp124m-category');
        if (category) {
          events.send(`${Exp.settings.ID}`, 'Clicked', `Category: ${category}`, { sendOnce: true });
        }
      },
      addCategoryTracking() {
        const TP124mCategories = Exp.cache.bodyVar.querySelectorAll('.TP124m_Category_Link');
        for (let i = 0, n = TP124mCategories.length; i < n; i += 1) {
          TP124mCategories[i].addEventListener('click', Exp.bindExperimentEvents.trackCategory);
        }
      },
    },
  };

  Exp.init();
};

export default Run;
