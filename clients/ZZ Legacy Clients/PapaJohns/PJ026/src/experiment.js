import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ026',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    components.getactiveLink();
    components.addBanner();
    components.addBannerTitle();
    components.changeLinkonScroll();


    /* eslint-disable */
    window.prm.add_endRequest(function (sender, error) {
      try {
          functionWithError()
      } catch (e) {}
      
    });
    function functionWithError() {
      if (document.querySelector('.PJ026-title_banner')) {
        components.getactiveLink();
        components.addBannerTitle();
        components.changeLinkonScroll();
      }
    }
    /* eslint-enable */
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
    /**
    * @desc Determine the active link based on the page URL
    */
    getactiveLink: function getactiveLink() {
      const pageTitle = window.location.pathname.match(/^.*\/([^?#(\/]+).*(.aspx|(\/))$/)[1].replace(' ', '').replace('-', ''); // eslint-disable-line no-useless-escape
      // get the matching link
      const matchLink = document.querySelectorAll('.mainMenuCont a');
      for (let i = 0; i < matchLink.length; i += 1) {
        const element = matchLink[i];
        const linkName = element.textContent.trim().replace(/\s+/g, '').replace('-', '')
          .replace(/'/g, '')
          .replace('papas', '')
          .toLowerCase();
        if (linkName.indexOf(pageTitle) > -1) {
          element.classList.add('PJ026-linkPage');
        }
      }
    },
    /**
    * @desc Add small banner on pages
    */
    addBanner: function addBanner() {
      const pageWrap = document.querySelector('.main');
      const banner = document.createElement('div');
      banner.classList.add('PJ026-title_banner');
      banner.innerHTML = '<span></span>';
      pageWrap.insertBefore(banner, pageWrap.firstChild);
    },
    /**
    * @desc make the nav link white on scroll
    */
    changeLinkonScroll: function changeLinkonScroll() {
      const activeLink = document.querySelector('.mainMenu .PJ026-linkPage');
      let lastScrollTop = 0;
      window.addEventListener('scroll', () => {
        const scrollAmount = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollAmount > lastScrollTop) {
          activeLink.classList.add('PJ026-white_link');
        } else if (scrollAmount === 0) {
          activeLink.classList.remove('PJ026-white_link');
        }
        lastScrollTop = scrollAmount;
      }, false);
    },
    /**
    * @desc Add banner title
    */
    addBannerTitle: function addBannerTitle() {
      const bannerTitle = document.querySelector('.PJ026-title_banner span');
      const pageTitle = document.querySelector('.PJ026-linkPage').textContent;
      bannerTitle.textContent = pageTitle;
    },
  },
};

export default Experiment;
