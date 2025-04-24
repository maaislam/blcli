import { setup } from './services';
import { banners } from './banners';
import settings from './settings';
import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

const activate = () => {
  setup();

  const storeCategory = () => {
    const currentPageType = window.digitalData.page.pageInfo.pageType;
    const categoryName = window.digitalData.page.pageInfo.pageName;

    // set the storage based on page visited
    if (currentPageType === 'PDP' || currentPageType === 'PLP' || currentPageType === 'Promotional') {
      switch (true) {
        case (categoryName.indexOf('Watches') > -1):
          localStorage.setItem('EJ018-category', 'watches');
          break;
        case (categoryName.indexOf('Luxury') > -1):
          localStorage.setItem('EJ018-category', 'luxuryWatches');
          break;
        case (categoryName.indexOf('Engagement') > -1):
          localStorage.setItem('EJ018-category', 'engagement');
          break;
        case (categoryName.indexOf('Diamond') > -1):
          localStorage.setItem('EJ018-category', 'diamonds');
          break;
        default:
          localStorage.removeItem('EJ018-category');
          break;
      }
      // define luxury watches
      const luxuryRegex = /^(.*?(Luxury|TAG.Heuer|Omega|Cartier|Breitling|Chanel|Chopard|Glashutte|Tudor)[^$]*)$/;
      if (categoryName.match(luxuryRegex)) {
        localStorage.setItem('EJ018-category', 'luxuryWatches');
      }
      // set diamond/engagement if data doesn't have the name
      const diamondMatch = /^(.*?(diamond)[^$]*)$/;
      if (window.location.href.match(diamondMatch)) {
        localStorage.setItem('EJ018-category', 'diamonds');
      }
    }
  };

  const changeHomepage = () => {
    const storedCategory = localStorage.getItem('EJ018-category');
    const bannerLink = document.querySelector('.slot.hs8 .contents');
    const bannerImage = document.querySelector('.slot.hs8 .contents img');

    for (let i = 0; i < Object.keys(banners).length; i += 1) {
      const data = Object.entries(banners)[i];
      const key = data[0];
      const category = data[1];
      if (key === storedCategory) {
        bannerLink.setAttribute('href', category.link);
        if (window.innerWidth < 767) {
          bannerImage.setAttribute('src', category.bannerMobile);
          bannerLink.querySelector('source').setAttribute('srcset', category.bannerMobile);
        } else {
          bannerImage.setAttribute('src', category.banner);
          bannerLink.querySelector('source').setAttribute('srcset', category.banner);
        }
        bannerImage.removeAttribute('alt');
        bannerImage.addEventListener('click', () => {
          events.send(settings.ID, 'Click', `Clicked on personalised banner - Variation ${settings.VARIATION}`);
        });

        // reorder the page
        const firstToShow = document.querySelector(category.firstSection);
        bannerLink.insertAdjacentElement('afterend', firstToShow);

        // move the rest of the watches page
        if (key === 'watches') {
          const watchesRows = document.querySelector('#diamondjewellery ~ .row');
          const watchesSecondRow = document.querySelector('#diamondjewellery ~ .row ~ .row');
          const watchesThirdRow = document.querySelector('#diamondjewellery ~ .row ~ .row ~ .row');
          document.querySelector('#watches').appendChild(watchesRows);
          document.querySelector('#watches').appendChild(watchesSecondRow);
          document.querySelector('#watches').appendChild(watchesThirdRow);
        }
      }
    }
  };


  storeCategory();
  if (window.digitalData.page.category.primaryCategory === 'Home') {
    pollerLite(['.slot.hs8 .contents'], () => {
      if (localStorage.getItem('EJ018-category')) {
        events.send(settings.ID, 'View', `Personalised banner shown - Variation ${settings.VARIATION}`);
        changeHomepage();
      }
    });
  }
};

export default activate;
