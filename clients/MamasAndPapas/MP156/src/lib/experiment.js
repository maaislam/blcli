/**
 * MP156 - SEO Banner Redesign Desktop & Mobile
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events, viewabilityTracker } from '../../../../../lib/utils';

const activate = () => {
  setup();
  const width = window.innerWidth;
  let device = '';
  if (width <= 500) {
    device = 'mobile';
  } else {
    device = 'desktop';
  }

  // Experiment code
  const pagePathname = window.location.pathname;
  let pageTitle = '';
  switch(pagePathname) {
    case '/en-gb/c/boys-clothing':
      pageTitle = 'Boys Clothing';
      break;
    case '/en-gb/c/girls-clothing':
      pageTitle = 'Girls Clothing';
      break;
    case '/en-gb/c/pushchairs-prams':
      pageTitle = 'Pushchairs &amp; Prams';
      break;
    case '/en-gb/c/new-arrivals-travel':
      pageTitle = 'New In';
      break;
    case ' /en-gb/c/buggies-strollers':
      pageTitle = 'Buggies &amp; Strollers';
      break;
    case '/en-gb/c/twin-double-pushchairs':
      pageTitle = 'Twin &amp; Double Buggies';
      break;
    case '/en-gb/c/pushchairs-all':
      pageTitle = 'All Travel';
      break;
  }

  if (pageTitle !== '') {
    const newPageTitleContainer = `<div class="MP156-container MP156-pageTitle">${pageTitle}</div>`;
    const bannerContainer = document.querySelector('.yCmsComponent.content-plp .content');
    if (bannerContainer) {
      bannerContainer.insertAdjacentHTML('afterbegin', newPageTitleContainer);
    }

    const newPageTitle = document.querySelector('.MP156-pageTitle');
    // Desktop V1
    if (settings.VARIATION === '1') {
      if (newPageTitle) {
        newPageTitle.style.paddingBottom = '30px';
        const subCatLinks = document.querySelector('ul.filter-listContainer');
        if (subCatLinks) {
          subCatLinks.style.display = 'none';
        }
      }
    }
    // Get banner text
    const catBannerText = document.querySelector('p#category-banner-txt').innerText;

    const newPageTextContainer = `<div class="MP156-container MP156-pageText"><p>${catBannerText}</p></div>`;
    const footerContainer = document.querySelector('footer.footer.text-md-center.bg-white');
    if (footerContainer) {
      footerContainer.insertAdjacentHTML('beforebegin', newPageTextContainer);
    }
    // Mobile version
    if (device === 'mobile') {
      const slickItems = document.querySelectorAll('ul.filter-listContainer li');
      const listItems = document.createElement('ul');
      listItems.classList.add('MP156-list__mobile');
      listItems.classList.add('hidden');
      [].forEach.call(slickItems, (item) => {
        if (!item.classList.contains('slick-cloned')) {
          item.classList.remove('slick-slide');
          listItems.appendChild(item);
        }
      });
      newPageTitle.insertAdjacentElement('afterend', listItems);
      // Mobile V2
      if (settings.VARIATION === '2') {
        newPageTitle.insertAdjacentHTML('afterend', `<div class='MP156-arrow'></div>`);
        const listArrow = document.querySelector('.MP156-arrow');

        const onClick = () => {
          if (listArrow.classList.contains('active')) {
            listArrow.classList.remove('active');
            listItems.classList.add('hidden');
          } else {
            listArrow.classList.add('active');
            listItems.classList.remove('hidden');
          }
        };

        listArrow.addEventListener('click', onClick);
        newPageTitle.addEventListener('click', onClick);
      } else {
        document.querySelector('.yCmsComponent.content-plp').classList.add('MP156-banner__v1');
      }
      const mobilePageText = document.querySelector('.MP156-container.MP156-pageText');
      mobilePageText.classList.add('MP156-pageText__mobile');
    }

    // Add selected class to filter list items
    [].forEach.call(document.querySelectorAll('.filter-listContainer .filter-list-item a'), (link) => {
      if(link && ( 
        window.location.href.indexOf(link.href) > -1
        ||
        window.location.href.replace('en-gb/', '').indexOf(link.href) > -1
      )) {
        link.classList.add('MP156-active');
      }
    });
  }

  pollerLite(['.MP156-container.MP156-pageText'], () => {
    viewabilityTracker(document.querySelector('.MP156-container.MP156-pageText'), () => {
      events.send(settings.ID, `Variation ${settings.VARIATION} - User Saw`, `SEO Text`, { sendOnce: true });
    }, {removeOnView: true});
  });
};

export default activate;
