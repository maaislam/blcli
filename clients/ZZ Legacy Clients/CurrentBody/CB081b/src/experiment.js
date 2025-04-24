import { fullStory } from '../../../../lib/utils';

/**
 * {{CB081b}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'CB081b',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /*
    * 1/3/18 Add banners to category pages
    */
    function categoryBanners() {
      const smoothskinBanner = 'https://www.currentbody.com/media/tmp/catalog/product/h/p/hp-banner-personalised-smoothskin-no_text.jpg';
      const triaBanner = 'https://www.currentbody.com/media/tmp/catalog/product/h/p/hp-banner-personalised-tria-notext.jpg';
      const iluminageBanner = 'https://d191y0yd6d0jy4.cloudfront.net/bph0508iht8lypk.jpg';
      const pageURL = window.location.pathname;
      const addBanner = (bannerImageURL) => {
        const bannerHTML = `
          <div class="cb81-cat-banner" style="background: url(${bannerImageURL}) no-repeat center">

          </div>
        `;
        const ref = document.querySelector('#brand-image');
        ref.innerHTML = bannerHTML;
      };
      const matchURL = (url) => {
        if (url === '/smoothskin') {
          addBanner(smoothskinBanner);
        }
        if (url === '/tria') {
          addBanner(triaBanner);
        }
        if (url === '/iluminage') {
          addBanner(iluminageBanner);
        }
      };
      matchURL(pageURL);
    }
    categoryBanners();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  // components: {},
};

export default Experiment;
