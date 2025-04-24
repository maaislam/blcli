import { fullStory, events } from '../../../../lib/utils';
import RC026 from './lib/RC026';

/**
 * {{RC038}} - {{Social proof_business}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'RC038',
    VARIATION: 1,
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const url = window.location.href;
    const regex = /www.redcrossfirstaidtraining.co.uk\/[?&=]/;

    /**
     * @desc Homepage Content - Swaps content and creates bottom right content
     */
    if (url === 'https://www.redcrossfirstaidtraining.co.uk/' || regex.exec(url) !== null) {
      RC026();
      const topSectionWrapper = document.querySelector('.RC022_topSectionTextWrapper');
      const bottomSectionRight = document.querySelector('.RC022_bottomSectionRight');
      const reviewText = bottomSectionRight.querySelector('.RC022_bottom_review').innerHTML;
      bottomSectionRight.querySelector('.RC022_bottom_review').innerHTML = `“${reviewText}”`;
      const reviewQuoteContent = bottomSectionRight.innerHTML;
      topSectionWrapper.insertAdjacentHTML('afterbegin', reviewQuoteContent);

      // New Stat Container
      const newStatWrapper = `<div class='RC038_statWrapper'>
      <div class='RC038_statPercentage'><p>99%</p></div>
      <div class='RC038_stat'>
      <span class='RC038_statText'>Customer satisfaction score*</span>
      <span class='RC038_statSubText'>*According to our 2017 delegate feedback &amp; independent TrustPilot reviews</span>
      </div>
      </div>`;
      bottomSectionRight.insertAdjacentHTML('afterbegin', newStatWrapper);
    /**
     * @desc Category Page Content - Creates Banner
     */
    } else if (/Courses.aspx/.test(url) || /First-aid-at-work-courses-uk-mainland.aspx/.test(url) || /Where-we-train/.test(url) || /What-we-do/.test(url)) {
      // Adds new row and banner
      let bannerText;
      let bannerSubText;

      if (!localStorage.getItem('RC038v1-close')) {
        localStorage.setItem('RC038v1-close', '1');
        localStorage.setItem('RC038v1-url', url);
        localStorage.setItem('RC038v1-text', `<span>99%</span> customer satisfaction score*`); // eslint-disable-line quotes
        localStorage.setItem('RC038v1-subText', `*According to our 2017 delegate feedback &amp; independent TrustPilot reviews`); // eslint-disable-line quotes
        bannerText = localStorage.getItem('RC038v1-text');
        bannerSubText = localStorage.getItem('RC038v1-subText');
      } else if (localStorage.getItem('RC038v1-close')) {
        switch (localStorage.getItem('RC038v1-close')) { // eslint-disable-line default-case
          case '1':
            if (localStorage.getItem('RC038v1-url') === url) {
              bannerText = localStorage.getItem('RC038v1-text');
              bannerSubText = localStorage.getItem('RC038v1-subText');
            } else {
              localStorage.setItem('RC038v1-close', '2');
              localStorage.setItem('RC038v1-url', url);
              localStorage.setItem('RC038v1-text', `Benefit from our <span>35 years</span> of experience`); // eslint-disable-line quotes
              localStorage.setItem('RC038v1-subText', `Join 100, 000 other companies who trust us with their first aid training needs.`); // eslint-disable-line quotes
              bannerText = localStorage.getItem('RC038v1-text');
              bannerSubText = localStorage.getItem('RC038v1-subText');
            }
            break;
          case '2':
            if (localStorage.getItem('RC038v1-url') === url) {
              bannerText = localStorage.getItem('RC038v1-text');
              bannerSubText = localStorage.getItem('RC038v1-subText');
            } else {
              localStorage.setItem('RC038v1-close', '3');
              localStorage.setItem('RC038v1-url', url);
              localStorage.setItem('RC038v1-text', `Feel <span>prepared and confident</span> in any emergency`); // eslint-disable-line quotes
              localStorage.setItem('RC038v1-subText', `68% of course attendees have used their skills in real life`); // eslint-disable-line quotes
              bannerText = localStorage.getItem('RC038v1-text');
              bannerSubText = localStorage.getItem('RC038v1-subText');
            }
            break;
          case '3':
            if (localStorage.getItem('RC038v1-url') === url) {
              bannerText = localStorage.getItem('RC038v1-text');
              bannerSubText = localStorage.getItem('RC038v1-subText');
            } else {
              localStorage.setItem('RC038v1-close', '1');
              localStorage.setItem('RC038v1-url', url);
              localStorage.setItem('RC038v1-text', `<span>99%</span> customer satisfaction score*`); // eslint-disable-line quotes
              localStorage.setItem('RC038v1-subText', `*According to our 2017 delegate feedback &amp; independent TrustPilot reviews`); // eslint-disable-line quotes
              bannerText = localStorage.getItem('RC038v1-text');
              bannerSubText = localStorage.getItem('RC038v1-subText');
            }
            break;
        }
      }
      const bannerWrapper = `<div class='RC038_row'></div>
      <div class='RC038_bannerWrapper'>
      <div class='RC038_bannerContainer'>
      <p class='RC038_bannerText'>${bannerText}</p>
      <p class='RC038_bannerSubText'>${bannerSubText}</p>
      </div></div>`;
      document.querySelector('main').insertAdjacentHTML('afterbegin', bannerWrapper);
    }
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

  components: {},
};

export default Experiment;
