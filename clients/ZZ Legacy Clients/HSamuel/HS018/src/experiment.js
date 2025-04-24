import { setup } from './services';
import { banners } from './banners';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';
import settings from './settings';

const activate = () => {
  setup();
  const storeCategory = () => {
    const currentPageType = window.digitalData.page.pageInfo.pageType;
    const categoryName = window.digitalData.page.pageInfo.pageName;

    if (currentPageType === 'PDP' || currentPageType === 'PLP') {
      switch (true) {
        case (categoryName.indexOf('Wedding') > -1):
          localStorage.setItem('HS018-category', 'weddingRings');
          break;
        case (categoryName.indexOf('Engagement') > -1):
          localStorage.setItem('HS018-category', 'Engagement');
          break;
        case (categoryName.indexOf('Watches') > -1):
          localStorage.setItem('HS018-category', 'watches');
          break;
        case (categoryName.indexOf('Diamond') > -1):
          localStorage.setItem('HS018-category', 'Diamonds');
          break;
        default:
          localStorage.removeItem('HS018-category');
          break;
      }

      if (window.location.href.indexOf('disney') > -1) {
        localStorage.setItem('HS018-category', 'Disney');
      }
    }
  };

  const showBanner = () => {
    const storedCategory = localStorage.getItem('HS018-category');
    const bannerLink = document.querySelector('.mainContent .row .contents');
    const bannerImage = document.querySelector('.mainContent .row .contents img');
    const bannerSource = document.querySelector('.mainContent .row .contents source');
    for (let i = 0; i < Object.keys(banners).length; i += 1) {
      const data = Object.entries(banners)[i];
      const key = data[0];
      const category = data[1];
      if (key === storedCategory) {
        bannerLink.setAttribute('href', category.link);
        if (window.innerWidth < 767) {
          bannerImage.setAttribute('src', category.bannerMobile);
          bannerSource.setAttribute('srcset', category.bannerMobile);
        } else {
          bannerImage.setAttribute('src', category.bannerDesktop);
          bannerSource.setAttribute('srcset', category.bannerMobile);
        }
        bannerImage.removeAttribute('alt');
        bannerImage.addEventListener('click', () => {
          events.send(settings.ID, 'Click', `Clicked on personalised banner - Variation ${settings.VARIATION}`);
        });
      }
    }
  };

  /* const offerBanner = () => {
    const pageContent = document.querySelector('.mainContent');
    const newOfferBanner = document.createElement('div');
    newOfferBanner.classList.add('HS018-return_banner');
    newOfferBanner.innerHTML = '<a href="/webstore/l/diamonds/select%7csale/">
    <span>Shop up to 50% off Diamonds</span></a>';

    pageContent.insertBefore(newOfferBanner, pageContent.firstChild);
  };
  */
  storeCategory();

  if (window.digitalData.page.category.primaryCategory === 'Home') {
    pollerLite(['.mainContent .row .contents img'], () => {
      if (localStorage.getItem('HS018-category')) {
        events.send(settings.ID, 'View', `Personalised banner shown - Variation ${settings.VARIATION}`);
        showBanner();
      }
    });
  }
};

export default activate;
