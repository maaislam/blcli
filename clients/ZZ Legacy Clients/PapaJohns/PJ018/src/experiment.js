import { fullStory, events } from '../../../../lib/utils';
import { observer, poller } from '../../../../lib/uc-lib';


const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ018',
    VARIATION: '4',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    // const { components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`PJ018V${settings.VARIATION}`);
    const isMobile = window.innerWidth < 797;
    const URL = window.location.href;
    let mobileHomepageBanner;
    let desktopHomepageBanner;
    let mobileOfferBanner;
    let desktopOfferBanner;
    let bannerLink;

    events.send(`PJ018 v${settings.VARIATION}`, 'Test Fired', 'PJ018 location test fired', { sendOnce: true });
    switch (settings.VARIATION) {
      case '1':
        mobileHomepageBanner = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5ab248ae1bf801521633454.jpg';
        desktopHomepageBanner = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5ab248fcb870b1521633532.jpg';
        mobileOfferBanner = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5ab2491718c161521633559.jpg';
        desktopOfferBanner = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5ab249a69b4ff1521633702.jpg';
        bannerLink = '/dealbuilder.aspx?promo=NPJPAPA999';
        break;
      case '2':
        mobileHomepageBanner = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5ab26585f1b3f1521640837.jpg';
        desktopHomepageBanner = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5ab265a645b261521640870.jpg';
        mobileOfferBanner = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5ab265b92d4491521640889.jpg';
        desktopOfferBanner = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5ab265ca048a31521640906.jpg';
        bannerLink = '/dealbuilder.aspx?promo=NPJPAPA1299';
        break;
      case '3':
        mobileHomepageBanner = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5ab2669021df51521641104.jpg';
        desktopHomepageBanner = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5ab266b4cf5b11521641140.jpg';
        mobileOfferBanner = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5ab266ca7046d1521641162.jpg';
        desktopOfferBanner = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5ab266e41637c1521641188.jpg';
        bannerLink = '/dealbuilder.aspx?promo=NPJPAPA1999';
        break;
      default:
        break;
    }
    const homepage = () => {
      const homeBanner = document.getElementById('ctl00_cphBody__objMainBanner__pnlBanner');
      if (homeBanner) {
        homeBanner.innerHTML = `
        <div class="PJ018-home_banner">
          <a href="#"></a>
          <img src="#"/>
        </div>`;
        const newHomeBanner = homeBanner.querySelector('.PJ018-home_banner');
        if (isMobile) {
          newHomeBanner.querySelector('img').setAttribute('src', mobileHomepageBanner);
        } else {
          newHomeBanner.querySelector('img').setAttribute('src', desktopHomepageBanner);
        }
        newHomeBanner.querySelector('a').setAttribute('href', bannerLink);
      }
    };
    if (settings.VARIATION !== '4') {
      poller([
        '#ctl00_cphBody__objMainBanner__pnlBanner',
      ], homepage());
    }

    const offersPage = () => {
      if (URL.indexOf('offers') > -1) {
        let offerPageBanner;
        if (isMobile) {
          offerPageBanner = document.querySelector('.menuBannerMobile');
        } else {
          offerPageBanner = document.querySelector('.customisePizza.infoDealBox');
        }
        offerPageBanner.innerHTML = `
        <div class="PJ018-offer_banner">
          <a href="#"></a>
          <img src="#"/>
        </div>`;
        services.getDeals();
        if (isMobile) {
          offerPageBanner.querySelector('img').setAttribute('src', mobileOfferBanner);
        } else {
          offerPageBanner.querySelector('img').setAttribute('src', desktopOfferBanner);
        }
        offerPageBanner.querySelector('a').setAttribute('href', bannerLink);
      }
    };
    if (settings.VARIATION !== '4') {
      offersPage();
    } else {
      services.hideDeals();
    }

    // mobile observer
    observer.connect(document.getElementById('ctl00__objHeader_upHeaderSummary'), () => {
      if (isMobile && settings.VARIATION !== '4') {
        homepage();
        offersPage();
      }
      if (settings.VARIATION === '4' && URL.indexOf('offers.aspx') >= 1) {
        services.hideDeals();
      }
    }, {
      config: { attributes: true, childList: true, subtree: false },
      throttle: 1000,
    });

    // desktop observer
    observer.connect(document.getElementById('ctl00__objHeader_upOmnibar'), () => {
      if (isMobile && settings.VARIATION !== '4') {
        homepage();
        offersPage();
      }
      if (settings.VARIATION === '4' && URL.indexOf('offers.aspx') >= 1) {
        settings.hideDeals();
      }
    }, {
      config: { attributes: true, childList: true, subtree: false },
      throttle: 1000,
    });
  },
  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
    /**
     * @desc get deals
     */
    getDeals: function getDeals() {
      let menuItems;
      let itemsWrapper;
      let topThreeItems;
      let thumbImg;
      if (window.innerWidth < 797) {
        topThreeItems = document.querySelector('.offers-m-cont');
        // eslint-disable-next-line prefer-destructuring
        itemsWrapper = document.querySelectorAll('.offers-m-cont')[1];
        menuItems = itemsWrapper.querySelectorAll('.offer-m');
        thumbImg = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5ab2851969b391521648921.jpg';
      } else {
        topThreeItems = document.querySelector('.menuItems');
        menuItems = topThreeItems.querySelectorAll('.offerList');
        thumbImg = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5ab284a84f11e1521648808.jpg';
      }
      for (let index = 0; index < menuItems.length; index += 1) {
        const element = menuItems[index];
        let menuItemTitle;
        if (window.innerWidth < 767) {
          menuItemTitle = element.querySelector('h2').textContent;
        } else {
          menuItemTitle = element.querySelector('h3').textContent;
        }
        if (menuItemTitle.indexOf('Papas Meal Deal') > -1) {
          if (document.body.classList.contains('PJ018V1')) {
            if (menuItemTitle.indexOf('£9.99') > -1) {
              element.classList.add('PJ018-smallDeal');
              topThreeItems.insertBefore(element, topThreeItems.firstChild);
            }
          }

          // medium deal
          if (document.body.classList.contains('PJ018V2')) {
            if (menuItemTitle.indexOf('£12.99') > -1) {
              element.classList.add('PJ018-mediumDeal');
              topThreeItems.insertBefore(element, topThreeItems.firstChild);
            }
          }

          // large deal
          if (document.body.classList.contains('PJ018V3')) {
            if (menuItemTitle.indexOf('£19.99') > -1) {
              element.classList.add('PJ018-endDeal');
              topThreeItems.insertBefore(element, topThreeItems.firstChild);
            }
          }
          element.classList.add('PJ018-mealDeal');
          element.querySelector('img').setAttribute('src', thumbImg);
        }
      }
    },
    hideDeals: function hideDeals() {
      let menuItems;
      let itemsWrapper;
      let topThreeItems;
      if (window.innerWidth < 797) {
        topThreeItems = document.querySelector('.offers-m-cont');
        // eslint-disable-next-line prefer-destructuring
        itemsWrapper = document.querySelectorAll('.offers-m-cont')[1];
        menuItems = itemsWrapper.querySelectorAll('.offer-m');
      } else {
        topThreeItems = document.querySelector('.menuItems');
        menuItems = topThreeItems.querySelectorAll('.offerList');
      }
      for (let index = 0; index < menuItems.length; index += 1) {
        const element = menuItems[index];
        let menuItemTitle;
        if (window.innerWidth < 767) {
          menuItemTitle = element.querySelector('h2').textContent;
        } else {
          menuItemTitle = element.querySelector('h3').textContent;
        }
        if (menuItemTitle.indexOf('Papas Meal Deal') > -1) {
          element.classList.add('PJ018-mealDeal');
        }
      }
    },
  },

  components: {},
};

export default Experiment;
