import { fullStory, events } from '../../../../lib/utils';

let $ = null;
/**
 * {{NH009}} - {{End of page search with context}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH009',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    events.setTrackerName('tracker2');
    $ = window.jQuery;
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    // Build module
    const html = services.buildModule();
    // Append module
    services.appendModule(html);
    // control module
    services.controlModule();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
    buildModule: function buildModule() {
      const intro = 'Ready to see our selection?';
      const urlName = window.location.pathname.split('/').slice(-1)[0];
      const newTitle = urlName.replace(/-/g, ' ');
      const xx = newTitle.split(' ').map((item) => {
        const x = item.substring(0, 1).toUpperCase() + item.substring(1).toLowerCase();
        return x;
      }).join(' ');
      // const title = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
      const words = ['And', 'To', 'By', 'From', 'Of', 'De', 'On'];
      let title = xx;
      words.forEach((word) => {
        title = title.replace(new RegExp(word, 'g'), word.toLowerCase());
        return title;
      });
      const html = `
        <div class="nh09-category-module">
          <div class="nh09-wrap">
            <h2>${intro}</h2>

            <button id="scroll-to-search">
              Search for ${title} by coach
            </button>
          </div>
        </div>
      `;
      return html;
    },
    appendModule: function appendModule(elToAppend) {
      const ref = document.querySelector('.main-content .content .container #ctl00_ContentPane');
      if (ref) {
        ref.insertAdjacentHTML('beforeend', elToAppend);
      }
    },
    controlModule: function controlModule() {
      const button = document.querySelector('.nh09-category-module .nh09-wrap button#scroll-to-search');
      const searchRef = document.querySelector('#main-body .right #ctl00_RightPane .holiday-search');
      if (button) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          // send event
          events.send('NH009', 'Click', 'User clicked the category module button', { sendOnce: true });
          $('html, body').animate({
            scrollTop: $(searchRef).offset().top - 100,
          }, 1000);
        });
      }
      // On click of search button in form
      const searchBtn = document.querySelector('.holiday-search .search-content #btnSearch');
      if (searchBtn) {
        searchBtn.addEventListener('click', () => {
          events.send('NH009', 'Click', 'User clicked the search button', { sendOnce: true });
        });
      }
    },
  },

  components: {},
};

export default Experiment;
