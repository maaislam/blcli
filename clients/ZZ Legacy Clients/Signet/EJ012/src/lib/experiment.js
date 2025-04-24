/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import MobileHeaderNav from './components/topNavigation';
import settings from './settings';
import { observer } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  const headerNav = new MobileHeaderNav ({
    navLinks: [
      {
        icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/99A1EE69387A5F007B7987F97F4A32F8B0E667321FCCBD9F77D38C7E6B7E3F71/ernestjones-co-uk/EJ012---Mobile-Navigation/watch.svg',
        title: 'Watches',
        link: '/webstore/watches.do?icid=ej-tn-watches',
      },
      {
        icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/E78D21969D1991A152224F1F237B0537D60D4FB7A7BFE39B0711BAECA791B40D/ernestjones-co-uk/EJ012---Mobile-Navigation/engagement-rings.svg',
        title: 'Engagement Rings',
        link: '/webstore/engagement.do?icid=ej-tn-engagement',
      },
      {
        icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/4BD06767441883DE60750F60BAAD42765B197C23476CBA6B6F657CB1E81A3DD6/ernestjones-co-uk/EJ012---Mobile-Navigation/jewelry.svg',
        title: 'Jewellery',
        link: '/webstore/jewellery.do?icid=ej-tn-jewellery',
      },
      {
        icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/4FB3F03C4A36B15F46EB01A781BCCAA30DC354AE7B25772EBA98D8227F3A44B7/ernestjones-co-uk/EJ012---Mobile-Navigation/dimond.svg',
        title: 'Diamonds',
        link: '/webstore/diamonds.do?icid=ej-tn-diamonds',
      },
      {
        icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/AC2878EAB8330ED556569ECA301B6E6954588C0A9E9FADC59F821FAE949BB356/ernestjones-co-uk/EJ012---Mobile-Navigation/brands.svg',
        title: 'Brands',
        link: '/webstore/brand-index.do?icid=ej-tn-brands',
      },
      {
        icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/99A1EE69387A5F007B7987F97F4A32F8B0E667321FCCBD9F77D38C7E6B7E3F71/ernestjones-co-uk/EJ012---Mobile-Navigation/watch.svg',
        title: 'Sale',
        link: '/webstore/offers.do?icid=ej-tn-sale',
      },
    ],
  });

  const activeNavLink = () => {
    const URL = window.location.href;
    if (URL) {
      // if any links match the url, add active
      const allLinks = document.querySelectorAll(`.${settings.ID}-navLink`);
      for (let index = 0; index < allLinks.length; index += 1) {
        const element = allLinks[index];
        const navLink = element.querySelector('a').textContent.trim().toLowerCase().replace(' ', '').replace('rings', '');
        if (URL.indexOf(navLink) > -1) {
          element.classList.add(`${settings.ID}-nav_active`);
          document.querySelector(`.${settings.ID}_headerNav-inner`).insertAdjacentElement('afterbegin', element);
          return;
        } else {
          element.classList.remove(`${settings.ID}-nav_active`);
        }
      }
    }
  };
  activeNavLink();

  const removeNav = () => {
    // remove the nav
    const nav = document.querySelector(`.${settings.ID}_headerNav`);
    nav.remove();
  };

  if (window.location.href.indexOf('/webstore/l/') > -1) {
    observer.connect([document.querySelector('.browse__main-content')], () => {
      removeNav();
      const headerNav = new MobileHeaderNav ({
        navLinks: [
          {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/99A1EE69387A5F007B7987F97F4A32F8B0E667321FCCBD9F77D38C7E6B7E3F71/ernestjones-co-uk/EJ012---Mobile-Navigation/watch.svg',
            title: 'Watches',
            link: '/webstore/watches.do?icid=ej-tn-watches',
          },
          {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/E78D21969D1991A152224F1F237B0537D60D4FB7A7BFE39B0711BAECA791B40D/ernestjones-co-uk/EJ012---Mobile-Navigation/engagement-rings.svg',
            title: 'Engagement Rings',
            link: '/webstore/engagement.do?icid=ej-tn-engagement',
          },
          {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/4BD06767441883DE60750F60BAAD42765B197C23476CBA6B6F657CB1E81A3DD6/ernestjones-co-uk/EJ012---Mobile-Navigation/jewelry.svg',
            title: 'Jewellery',
            link: '/webstore/jewellery.do?icid=ej-tn-jewellery',
          },
          {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/4FB3F03C4A36B15F46EB01A781BCCAA30DC354AE7B25772EBA98D8227F3A44B7/ernestjones-co-uk/EJ012---Mobile-Navigation/dimond.svg',
            title: 'Diamonds',
            link: '/webstore/diamonds.do?icid=ej-tn-diamonds',
          },
          {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/AC2878EAB8330ED556569ECA301B6E6954588C0A9E9FADC59F821FAE949BB356/ernestjones-co-uk/EJ012---Mobile-Navigation/brands.svg',
            title: 'Brands',
            link: '/webstore/brand-index.do?icid=ej-tn-brands',
          },
          {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/99A1EE69387A5F007B7987F97F4A32F8B0E667321FCCBD9F77D38C7E6B7E3F71/ernestjones-co-uk/EJ012---Mobile-Navigation/watch.svg',
            title: 'Sale',
            link: '/webstore/offers.do?icid=ej-tn-sale',
          },
        ],
      });
      activeNavLink();
    }, {
      throttle: 1000,
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      },
    });


    observer.connect([document.querySelector('#filter-modal')], () => {
      removeNav();
      const headerNav = new MobileHeaderNav ({
        navLinks: [
          {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/99A1EE69387A5F007B7987F97F4A32F8B0E667321FCCBD9F77D38C7E6B7E3F71/ernestjones-co-uk/EJ012---Mobile-Navigation/watch.svg',
            title: 'Watches',
            link: '/webstore/watches.do?icid=ej-tn-watches',
          },
          {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/E78D21969D1991A152224F1F237B0537D60D4FB7A7BFE39B0711BAECA791B40D/ernestjones-co-uk/EJ012---Mobile-Navigation/engagement-rings.svg',
            title: 'Engagement Rings',
            link: '/webstore/engagement.do?icid=ej-tn-engagement',
          },
          {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/4BD06767441883DE60750F60BAAD42765B197C23476CBA6B6F657CB1E81A3DD6/ernestjones-co-uk/EJ012---Mobile-Navigation/jewelry.svg',
            title: 'Jewellery',
            link: '/webstore/jewellery.do?icid=ej-tn-jewellery',
          },
          {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/4FB3F03C4A36B15F46EB01A781BCCAA30DC354AE7B25772EBA98D8227F3A44B7/ernestjones-co-uk/EJ012---Mobile-Navigation/dimond.svg',
            title: 'Diamonds',
            link: '/webstore/diamonds.do?icid=ej-tn-diamonds',
          },
          {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/AC2878EAB8330ED556569ECA301B6E6954588C0A9E9FADC59F821FAE949BB356/ernestjones-co-uk/EJ012---Mobile-Navigation/brands.svg',
            title: 'Brands',
            link: '/webstore/brand-index.do?icid=ej-tn-brands',
          },
          {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/99A1EE69387A5F007B7987F97F4A32F8B0E667321FCCBD9F77D38C7E6B7E3F71/ernestjones-co-uk/EJ012---Mobile-Navigation/watch.svg',
            title: 'Sale',
            link: '/webstore/offers.do?icid=ej-tn-sale',
          },
        ],
      });
      activeNavLink();
    }, {
      throttle: 1000,
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      },
    });
  }
};

export default activate;
