import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const init = () => {
  let lastScrollTop = 0;
  const header = document.querySelector('.header-outer');
  const desktopNav = document.querySelector('.navigation-desktop');
  const searchContainer = document.querySelector('.search-container');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    const scrollDistance = window.scrollY || document.documentElement.scrollTop;

    if (scrollDistance > 0.4 * viewportHeight) {
      header.classList.add(`${ID}__slideUp`);
      desktopNav.classList.remove(`${ID}__navVisible`);
      isMobile && searchContainer.classList.add(`${ID}__slideUp`);

      if (!document.body.classList.contains(`${ID}__scrolledDown`)) {
        fireEvent('User scrolls down on the site');
        document.body.classList.add(`${ID}__scrolledDown`);
      }
    } else {
      header.classList.remove(`${ID}__slideUp`);
      desktopNav.classList.add(`${ID}__navVisible`);
      isMobile && searchContainer.classList.remove(`${ID}__slideUp`);
    }
  };

  window.addEventListener('scroll', function () {
    let currentScrollTop = window.scrollY || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      handleScroll();
    } else {
      // Scrolling up
      header.classList.remove(`${ID}__slideUp`);
      desktopNav.classList.add(`${ID}__navVisible`);
      isMobile && searchContainer.classList.remove(`${ID}__slideUp`);

      const viewportHeight = window.innerHeight;
      const scrollDistance = window.scrollY || document.documentElement.scrollTop;
      if (!document.body.classList.contains(`${ID}__scrolledUp`) && scrollDistance > 0.4 * viewportHeight) {
        fireEvent('User scrolls up on the site');
        document.body.classList.add(`${ID}__scrolledUp`);
      }
    }

    lastScrollTop = currentScrollTop;
  });
};

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  if (window.location.href.indexOf('us.neomwellbeing.com') > -1) {
    newEvents.property = 'G-KJ9062XWWK';
  } else if (window.location.href.indexOf('neomwellbeing.eu') > -1) {
    newEvents.property = 'G-9CQMVE6E0J';
  } else {
    newEvents.property = 'G-884D6MBLFG';
  }
  //fireEvent('Conditions Met');

  window.addEventListener('scroll', function () {
    const viewportHeight = window.innerHeight;
    const scrollDistance = window.scrollY || document.documentElement.scrollTop;
    if (scrollDistance > 0.4 * viewportHeight) {
      // Scrolling down
      if (!document.body.classList.contains(`${ID}__scrollDown`)) {
        fireEvent('Conditions Met');
        document.body.classList.add(`${ID}__scrollDown`);
      }
    }
  });

  document.body.addEventListener('pointerup', (e) => {
    const { target } = e;

    if (target.closest('.search-container')) {
      fireEvent('User interacts with search');
    } else if (target.closest('header [href="/cart"]')) {
      fireEvent('User navigates to bag');
    } else if (target.closest('.navigation-mobile__item')) {
      fireEvent('User interacts with nav');
    } else if (target.closest('a.site-logo')) {
      fireEvent('User interacts with logo');
    } else if (target.closest('#siteSelector-nav') || target.closest('#siteSelector-header')) {
      fireEvent('User interacts with site selector');
    } else if (target.closest('.header-actions [href="/account"]')) {
      fireEvent('User interacts with register/log in cta');
    } else if (target.closest('.wisp')) {
      fireEvent('User interacts with notifications');
    }
  });

  // document.body.addEventListener('mouseover', (e) => {
  //   const { target } = e;

  //   if (target.closest('.navigation-desktop__link')) {
  //     fireEvent('User interacts with nav');
  //   }
  // });

  if (VARIATION == 'control' || VARIATION == '2') {
    return;
  }

  init();
};
