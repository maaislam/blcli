import { fullStory } from '../../../../lib/utils';

/**
 * {{ITXXXHomepageBannerToApp}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ITXXXHomepageBannerToApp',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    const $ = window.jQuery;
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const iphoneImage = 'https://d191y0yd6d0jy4.cloudfront.net/xdlmtk9cpdg3h15.jpg';
    const iphoneLink = 'https://itunes.apple.com/gb/app/in-the-style/id1272097481?mt=8';
    const androidImage = 'https://d191y0yd6d0jy4.cloudfront.net/0t6s093em5ciuk8.jpg';
    const androidLink = 'https://play.google.com/store/apps/details?id=com.poqstudio.app.platform.its';
    // Build Banner
    const addBanner = (imgSrc, link) => {
      const html = `
      <div id="ITXXX_Banner" class="banner slide" onclick="setLocation('${link}');" data-slick-index="-1" aria-hidden="true" tabindex="-1" style="width: 1211px;">
          <div class="banner-image">
              <img sizes="100vw" src="${imgSrc}" alt="UK - NEW IN 18/04">
          </div>
          <div class="banner-content">
              <h2>&nbsp;</h2>
          </div>
      </div>
      `;
      return html;
    };
    const OS = services.whichOS();
    let bannerHtml = null;
    if (OS === 'Android') {
      bannerHtml = addBanner(androidImage, androidLink);
    }
    if (OS === 'iOS') {
      bannerHtml = addBanner(iphoneImage, iphoneLink);
    }
    // Add banner
    const appendBanner = (html) => {
      const ref = document.querySelector('.home-banner-mobile .banner-list .slick-list .slick-track');
      if (ref) {
        ref.insertAdjacentHTML('afterbegin', html);
      }
    };
    appendBanner(bannerHtml);
    // Check if its there
    const BannerIsAppended = document.querySelector('#ITXXX_Banner');
    if (BannerIsAppended) {
      $('.banner-list').slick('reinit');
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
    whichOS: function getMobileOperatingSystem() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      // Windows Phone must come first because its UA also contains "Android"
      if (/windows phone/i.test(userAgent)) {
        return 'Windows Phone';
      }
      if (/android/i.test(userAgent)) {
        return 'Android';
      }
      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'iOS';
      }
      return 'unknown';
    },
  },

  components: {},
};

export default Experiment;
