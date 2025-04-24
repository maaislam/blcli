import { fullStory, events } from '../../../../lib/utils';
// import { NH007 } from './NH007';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH012',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    events.setTrackerName('tracker2');
    services.tracking();
    document.body.classList.add(settings.ID);

    // Build module
    const html = components.buildNewSearch();
    // Append module
    components.appendModule(html);

    // move form
    components.moveForm();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    buildNewSearch: function buildNewSearch() {
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
      <div class="NH012-search_area">
        <h2>${intro}</h2>
        <span>Search for ${title} breaks by coach</span>
        <div class="NH012-search"></div>
      </div>
      `;
      return html;
    },
    appendModule: function appendModule(elToAppend) {
      const ref = document.querySelector('#ctl00_ctl03_pnlResults');
      if (ref) {
        ref.insertAdjacentHTML('afterend', elToAppend);
      }
    },

    moveForm: () => {
      const searchForm = document.querySelector('.holiday-search');
      document.querySelector('.NH012-search').appendChild(searchForm);
    },
  },
};

export default Experiment;
