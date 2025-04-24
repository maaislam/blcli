import { fullStory, events } from '../../../../lib/utils';


/**
 * {{AC034}} - {{Dummy Search Box Research Piece}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'AC034',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const searchBox = docVar.getElementById('search-bar-body');
      const searchBoxHeader = docVar.getElementById('search-bar-header');
      const dummyBoxMarkup = `
      <div class="AC034_Container">
        <span class="AC034_Sub_Header">What are you looking for today?</span>
        <div class="AC034_Search-Container">
          <input type="text" id="AC034_Search_Input" placeholder="Search" />
          <button class="AC034_Search_Button">Continue</button>
        </div>
      </div>
      `;

      const errorMessageMarkup = `
        <div class="AC034_Error_Message_Container">
          <span class="AC034_Error_Message">Sorry, our general search function doesn’t seem to be working at the moment. Please use our advanced search below. We apologise for the inconvenience!</span>
        </div>
      `;

      let AC034SearchButton;
      let AC034SearchInput;
      let AC034ErrorContainer;
      let AC034Container;

      return {
        docVar,
        bodyVar,
        searchBox,
        dummyBoxMarkup,
        AC034SearchButton,
        AC034SearchInput,
        errorMessageMarkup,
        searchBoxHeader,
        AC034ErrorContainer,
        AC034Container,
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
      const hide = document.getElementById(`${settings.ID}_flickerPrevention`);
      hide.parentElement.removeChild(hide);
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
        // Clear previous localstorage item if it exists: "AC034-Searchbox-Shown"
        if (localStorage.getItem('AC034-Searchbox-Shown')) {
          localStorage.removeItem('AC034-Searchbox-Shown');
        }
        // Toggle class to hide search box
        Exp.cache.searchBox.classList.toggle('AC034_Hide');
        // Render markup
        Exp.cache.searchBox.insertAdjacentHTML('beforebegin', Exp.cache.dummyBoxMarkup);
        Exp.cache.searchBoxHeader.insertAdjacentHTML('beforebegin', Exp.cache.errorMessageMarkup);
        // Store Selectors
        Exp.cache.AC034SearchButton = Exp.cache.bodyVar.querySelector('.AC034_Search_Button');
        Exp.cache.AC034SearchInput = Exp.cache.docVar.getElementById('AC034_Search_Input');
        Exp.cache.AC034ErrorContainer = Exp.cache.bodyVar.querySelector('.AC034_Error_Message_Container');
        Exp.cache.AC034Container = Exp.cache.bodyVar.querySelector('.AC034_Container');
        // Set item in local storage to prevent test showing again
        localStorage.setItem('AC034-Searchbox-Shown-V2', 'Shown');
        // Elements ready add functions
        this.setupFunctions();
      },
      setupFunctions() {
        // Add event to search button to get input text and send as event
        Exp.cache.AC034SearchButton.addEventListener('click', () => {
          const searchInput = Exp.cache.AC034SearchInput.value;
          // Toggle class to reveal search box
          Exp.cache.searchBox.classList.toggle('AC034_Hide');
          // Toggle styling class for error message
          Exp.cache.AC034ErrorContainer.classList.toggle('AC034_Error_Fade');
          // Fade out search box
          Exp.cache.AC034Container.classList.toggle('AC034_Fade');
          // Hide the search box
          setTimeout(() => {
            Exp.cache.AC034Container.classList.toggle('AC034_Hide');
            Exp.cache.AC034Container.classList.toggle('AC034_Fade');
          }, 950);
          // Scroll to error message
          $('html, body').animate({ scrollTop: $(Exp.cache.AC034ErrorContainer).offset().top - 200 });
          // Remove class after 10s
          setTimeout(() => {
            Exp.cache.AC034ErrorContainer.classList.toggle('AC034_Error_Fade');
          }, 10000);
          // Send an event if input is not empty
          if (searchInput) {
            events.send(`${Exp.settings.ID}`, 'Search', `${searchInput}`, { sendOnce: true });
          }
        });
        // Event on focus into text box
        Exp.cache.AC034SearchInput.addEventListener('focus', () => {
          events.send(`${Exp.settings.ID}`, 'Focus', 'Search Box', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
