import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, setCookie, getCookie, observer } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

let defaultLinks = [
  {
    link: `https://www.hotelchocolat.com/uk/shop/collections/prices/special-offers/`,
    text: `Sale`,
    image: `https://blcro.fra1.digitaloceanspaces.com/HC144%2Fsale.png`,
  },
  {
    link: `https://www.hotelchocolat.com/uk/shop/collections/products/wine-chocolate/`,
    text: `Chocolate Boxes`,
    image: `https://blcro.fra1.digitaloceanspaces.com/HC144%2Fchocolateboxes.png`,
  },
  {
    link: `https://www.hotelchocolat.com/uk/shop/collections/products/hot-chocolate/`,
    text: `Collections`,
    image: `https://blcro.fra1.digitaloceanspaces.com/HC144%2Fcollections.png`,
  },
  {
    link: `https://www.hotelchocolat.com/uk/shop/collections/products/hot-chocolate/`,
    text: `Velvetiser`,
    image: `https://blcro.fra1.digitaloceanspaces.com/HC144%2Fvelvetiser.png`,
  },
  {
    link: `https://www.hotelchocolat.com/uk/shop/collections/products/hot-chocolate/`,
    text: `Hot Chocolate`,
    image: `https://blcro.fra1.digitaloceanspaces.com/HC144%2Fhotchocolate.png`,
  },
  {
    link: `https://www.hotelchocolat.com/uk/shop/collections/products/hot-chocolate/`,
    text: `Alcohol`,
    image: `https://blcro.fra1.digitaloceanspaces.com/HC144%2Falcohol.png`,
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

// overrides for specific pages
// Instructions:
// 1. Uncomment the code below
// 2. Add the URL of the page you want to override
// 3. Add the links you want to show on that page
// 4. Repeat for as many pages as you want to override
// 5. Take the full window.HC144quicklinks array and copy it into the experiment JS section in AB tasty
// 6. Comment the code again and re-run the gulp script
// 7. Paste the minified code in below the window.HC144quicklinks array
// 8. Save and test the experiment on the new pages
// 9. Ensure the experiment targeting is set on the platform so the experiment only runs on the pages you want

// Client instructions are slightly different - if you find a client array when you come
// to the experiment JS section in AB tasty, assume that is the correct latest version
// and ask the consultant.

// window.HC144quicklinks = [
//   {
//     url: `/shop/collections/products/hot-chocolate/`,
//     content: [
//       {
//         link: `https://www.hotelchocolat.com/uk/shop/collections/prices/special-offers/`,
//         text: `Sale2`,
//         image: `https://blcro.fra1.digitaloceanspaces.com/HC144%2Fsale.png`,
//       },
//       {
//         link: `https://www.hotelchocolat.com/uk/shop/collections/products/wine-chocolate/`,
//         text: `Chocolate Boxes2`,
//         image: `https://blcro.fra1.digitaloceanspaces.com/HC144%2Fchocolateboxes.png`,
//       },
//       {
//         link: `https://www.hotelchocolat.com/uk/shop/collections/products/hot-chocolate/`,
//         text: `Collections2`,
//         image: `https://blcro.fra1.digitaloceanspaces.com/HC144%2Fcollections.png`,
//       },
//       {
//         link: `https://www.hotelchocolat.com/uk/shop/collections/products/hot-chocolate/`,
//         text: `Velvetiser2`,
//         image: `https://blcro.fra1.digitaloceanspaces.com/HC144%2Fvelvetiser.png`,
//       },
//       {
//         link: `https://www.hotelchocolat.com/uk/shop/collections/products/hot-chocolate/`,
//         text: `Hot Chocolate2`,
//         image: `https://blcro.fra1.digitaloceanspaces.com/HC144%2Fhotchocolate.png`,
//       },
//       {
//         link: `https://www.hotelchocolat.com/uk/shop/collections/products/hot-chocolate/`,
//         text: `Alcohol2`,
//         image: `https://blcro.fra1.digitaloceanspaces.com/HC144%2Falcohol.png`,
//       }
//     ]
//   }

// ];

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
    console.log('test', toDisplay);

    if (window.HC144quicklinks) {
      window.HC144quicklinks.forEach((item) => {
        if (window.location.href.indexOf(item.url) > -1) {
          linksUsed = item.content;
        }
      });
    }

    let linksHTML = `
  
    <div class="${ID}-quicklinks">
    
      <div class="${ID}-quicklinks--inner">

        ${linksUsed
          .map((item) => {
            return `
                <a href="${item.link}" class="${
              window.location.href === item.link ? `active-${VARIATION}` : ''
            } ${ID}-quicklinks--item ${item.text.replaceAll(' ', '-').toLowerCase()} ${VARIATION == '3' ? 'minimal' : ''}">

                  ${VARIATION !== '3' ? `<img src="${item.image}" class="${ID}-quicklinks--image" />` : ''}
                  <p class="${VARIATION === '3' ? 'no-margin' : ''}">${item.text}</p>

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

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

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
