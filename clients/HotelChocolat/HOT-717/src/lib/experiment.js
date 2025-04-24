import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const quickLinks = [
  {
    title: 'Easter',
    url: '/uk/shop/easter-eggs/',
    image:
      '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
  },
  {
    title: 'Gift ideas',
    url: '/uk/shop/gift-ideas/',
    image:
      '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
  },
  {
    title: 'Chocolate',
    url: '/uk/shop/collections/',
    image:
      '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
  },
  {
    title: 'Hot Chocolate',
    url: '/uk/shop/collections/products/hot-chocolate/',
    image:
      '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
  },
  {
    title: 'Velvetiser',
    url: '/uk/shop/collections/products/the-velvetiser/',
    image:
      '/on/demandware.static/-/Sites-HotelChocolat-Library/default/v6c91385b5ec5b8dfd842d35c43cc7e59d9784c00/640px-Images/copper_velvetiser.png?version=1,670,939,453,000',
  },
  {
    title: 'Alcohol',
    url: '/uk/shop/collections/products/wine-chocolate/',
    image:
      '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit',
  },
  {
    title: 'Birthday Gift',
    url: '/uk/shop/gift-ideas/shop-by-occasion/birthday/',
    image:
      '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit',
  },
];

const wouldHaveSeen = (element, level) => {
  pollerLite([element], () => {
    var isFired = false;
    if (!isFired) {
      const targetDom = document.querySelector(element);
      if (targetDom) {
        var position = targetDom.getBoundingClientRect();
        if (position.top > 100 && position.bottom < window.innerHeight - 250) {
          fireEvent(`${level}`);
          isFired = true;
        }
      }
    }

    document.addEventListener('scroll', () => {
      if (!isFired) {
        const targetDom = document.querySelector(element);

        if (targetDom) {
          var position = targetDom.getBoundingClientRect();
          if (position.top > 100 && position.bottom < window.innerHeight - 100) {
            fireEvent(`${level}`);
            isFired = true;
          }
        }
      }
    });
  });
};

const init = () => {
  pollerLite(['#header-promo-banner'], () => {
    const promoBanner = document.querySelector('#header-promo-banner');

    let html = `
				<div class="${ID}-quick-links">
					<div class="quick-links__container">
					${quickLinks
            .map(
              (link) => `
            <div class="quick-links__item">
              <a href="${link.url}" class="quick-links__link">
                ${link.title}
              </a>
            </div>`
            )
            .join('')}
					</div>
				</div>
				`;

    promoBanner.insertAdjacentHTML('afterend', html);
    wouldHaveSeen(`.${ID}-quick-links`, `User sees the quicklinks`);

    const quickLinks = document.querySelectorAll(`.${ID}-quick-links a.quick-links__link`);
    if (quickLinks.length > 0) {
      quickLinks.forEach((link) => {
        link.addEventListener('click', () => {
          fireEvent(`User clicks on the ${link.textContent.trim()} quicklink`);
        });
      });
    }
  });
};

export default () => {
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-B37NQR1RWZ';

  setup();

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  init();
};
