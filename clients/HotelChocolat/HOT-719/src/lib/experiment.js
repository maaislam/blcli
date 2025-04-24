import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, setCookie, getCookie, observer } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

let defaultLinks = [
  {
    text: 'Best sellers',
    link: '/uk/shop/gift-ideas/shop-by-occasion/best-chocolate/',
    image:
      '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
  },
  {
    text: 'Chocolate boxes',
    link: '/uk/shop/collections/products/chocolate-box/',
    image:
      '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
  },
  {
    text: 'Velvetiser',
    link: '/uk/shop/collections/products/the-velvetiser/',
    image:
      '/on/demandware.static/-/Sites-HotelChocolat-Library/default/v6c91385b5ec5b8dfd842d35c43cc7e59d9784c00/640px-Images/copper_velvetiser.png?version=1,670,939,453,000',
  },
  {
    text: 'Hot chocolate',
    link: '/uk/shop/collections/products/hot-chocolate/',
    image:
      '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
  },
  {
    text: 'Collections',
    link: '/uk/shop/collections/',
    image:
      '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
  },
  {
    text: 'Alcohol',
    link: '/uk/shop/collections/products/wine-chocolate/',
    image:
      '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit',
  },
];

let defaultArray = [
  {
    url: `/shop/collections/products/hot-chocolate/`,
    content: defaultLinks,
  },
  {
    url: `/shop/collections/products/all-products/`,
    content: defaultLinks,
  },
  {
    url: `/shop/collections/products/chocolate-hampers/`,
    content: defaultLinks,
  },
  {
    url: `/shop/collections/products/wine-chocolate/`,
    content: defaultLinks,
  },
  {
    url: `/shop/collections/`,
    content: defaultLinks,
  },
  {
    url: `/shop/gift-ideas/`,
    content: defaultLinks,
  },
  {
    url: `/shop/christmas/`,
    content: defaultLinks,
  },
  {
    url: `/shop/black-friday/`,
    content: defaultLinks,
  },
];

//please don't modify below this line
const startExperiment = () => {
  let currWindowHref = window.location.href;
  if (currWindowHref.indexOf(`?`) > -1) {
    currWindowHref = currWindowHref.split(`?`)[0];
  }
  let toDisplay = false;
  let displayedArray = [];

  defaultArray.forEach((item) => {
    let builtUpURL = `https://www.hotelchocolat.com/uk${item.url}`;
    if (currWindowHref == builtUpURL) {
      toDisplay = true;
      displayedArray = item.content;
    }
  });

  if (!toDisplay) {
    fireEvent(`Interaction - the experiment shouldn't fire on this category page`, true);
  } else {
    let linksUsed = displayedArray;
    let linksHTML = `
    <div class="${ID}-quicklinks">
      <div class="${ID}-quicklinks--inner">
        ${linksUsed
          .map((item) => {
            return `
                <a href="${item.link}" class="${
              window.location.href === item.link ? `active-${VARIATION}` : ''
            } ${ID}-quicklinks--item ${item.text.replaceAll(' ', '-').toLowerCase()}">

                  <img src="${item.image}" class="${ID}-quicklinks--image" style="display:none;" />
                  <p class="${ID}__text">${item.text}</p>
                </a>
              `;
          })
          .join('')}
      </div>
    </div>  
  `;

    pollerLite(['#page_heading'], () => {
      let pageHeading = document.getElementById('page_heading');
      pageHeading.insertAdjacentHTML('afterend', linksHTML);
      fireEvent('Interaction - experiment displayed on screen', true);

      let allAddedLinks = document.querySelectorAll(`.${ID}-quicklinks--item`);
      [].slice.call(allAddedLinks).forEach((item) => {
        item.addEventListener('click', (e) => {
          let linkText = e.target.closest(`.${ID}-quicklinks--item`).querySelector('p').innerText;
          fireEvent(`Click - user clicked ${linkText} link`, true);
          setCookie(`${ID}-clicked-link`, `true`);
        });
      });
    });
  }
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  pollerLite(['#wrapper'], () => {
    let wrapper = document.getElementById('wrapper');

    if (wrapper.classList.contains('pt_product-search-result')) {
      if (VARIATION !== 'control') {
        startExperiment();

        observer.connect(
          document.querySelector('#main'),
          () => {
            if (!document.querySelector(`.${ID}-quicklinks`)) {
              startExperiment();
            }
          },
          {
            attributes: true,
            childList: true,
          }
        );
      }
      fireEvent(`Interaction - user has viewed PLP page ${window.location.href}`, true);

      document.body.addEventListener('click', (e) => {
        if (e.target.closest('#QuickViewDialog #add-to-cart') || e.target.id == 'add-to-cart') {
          fireEvent(
            `Interaction - user has added item to basket using the Quick View ${
              getCookie(`${ID}-clicked-link`) == `true`
                ? `after clicking on a quicklink`
                : `without having clicked on a quicklink`
            }`,
            true
          );
        }
      });
    } else if (wrapper.classList.contains('pt_product-details')) {
      fireEvent(`Interaction - user has viewed PDP page ${window.location.href}`, true);

      document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
          fireEvent(
            `Interaction - user has added item to basket ${
              getCookie(`${ID}-clicked-link`) == `true`
                ? `after clicking on a quicklink`
                : `without having clicked on a quicklink`
            }`,
            true
          );
        }
      });
    }

    document.body.addEventListener('click', (e) => {
      if (e.target.closest('#search-form')) {
        fireEvent(`Click - user has clicked into the search field`, true);
      }
    });

    if (window.outerWidth < 960) {
      observer.connect(
        document.querySelector('#hamburger-menu'),
        () => {
          fireEvent(`Click - user has clicked the mobile navigation`, true);
          observer.disconnect();
        },
        {
          attributes: true,
          childList: true,
        }
      );
    } else {
      pollerLite([`#desktop-navigation`], () => {
        let nav = document.getElementById('desktop-navigation');
        nav.addEventListener('mouseenter', () => {
          fireEvent(`Interaction - user has entered the navigation`, true);
        });
      });
    }
  });
};
