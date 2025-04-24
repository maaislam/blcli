import {
  setup,
  generateList,
  modifyFilter,
  getCachedItems,
} from './services';
import settings from './settings';
import {
  addPoller,
  addEventListener,
  addObserver
} from './winstack';

const {
  ID,
} = settings;

const categories = [{
    categoryUrl: 'all-lingerie',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'new-in-lingerie',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'seasonal-sets',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'black-white-and-nude-bras',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 't-shirt-bras',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'non-wired-bras',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'strapless-and-multiway-bras',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'bralettes',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'sports-bras',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'nursing-and-maternity-bras',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'sleep-bras',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'vest-tops-with-built-in-bra',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'bra-accessories-and-shapewear',
    categoryParent: 'lingerie'
  },
  {
    categoryUrl: 'all-clothing',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'new-in-clothing',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'dresses',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'shirts-and-tops',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'knitwear',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'coats-and-jackets',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'sportswear',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'vest-tops-with-built-in-bra',
    categoryParent: 'clothing'
  },
  {
    categoryUrl: 'all-swimwear',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'new-in-swimwear',
    categoryParent: ''
  },
  {
    categoryUrl: 'bikinis',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'swimsuits',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'tankinis',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'sports-swimsuits',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'maternity-swimsuits',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'beachwear-and-accessories',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'holiday-shop',
    categoryParent: 'swimwear'
  },
  {
    categoryUrl: 'all-nightwear',
    categoryParent: 'nightwear'
  },
  {
    categoryUrl: 'new-in-nightwear',
    categoryParent: 'nightwear'
  },
  {
    categoryUrl: 'sleep-bras',
    categoryParent: 'nightwear'
  },
  {
    categoryUrl: 'pyjama-tops',
    categoryParent: 'nightwear'
  },
  {
    categoryUrl: 'nightdresses',
    categoryParent: 'nightwear'
  },
  {
    categoryUrl: 'pyjama-bottoms',
    categoryParent: 'nightwear'
  },
  {
    categoryUrl: 'sportswear',
    categoryParent: 'sportswear'
  },
  {
    categoryUrl: 'new-in-sportswear',
    categoryParent: 'sportswear'
  },
  {
    categoryUrl: 'sports-tops',
    categoryParent: 'sportswear'
  },
  {
    categoryUrl: 'sports-bottoms',
    categoryParent: 'sportswear'
  },
  {
    categoryUrl: 'sports-swimsuits',
    categoryParent: 'sportswear'
  },
  {
    categoryUrl: 'sports-bras',
    categoryParent: 'sportswear'
  },
  {
    categoryUrl: 'wired-sports-bras',
    categoryParent: 'sportswear'
  },
  {
    categoryUrl: 'non-wired-sports-bras',
    categoryParent: 'sportswear'
  },
];
const activate = () => {
  setup();
  if (window.dataLayer[0].pageType === 'productListing') {
    /**
     * Removes old filters when the page loads
     * Commented once I have discovered that
     * React or Vue clean the localstorage
     */
    const address = window.location.href;
    (function () {
      categories.forEach(function (category, i) {
        if (address.indexOf(category.categoryUrl) > -1) {
          generateList(category.categoryParent);
          getCachedItems();
          /*
           * Adds experiment class to HTML since Vue or React
           * remove it from the body when you tap on the filters button
           * removing it some styles I apply to fix problems are not working
           * with this I am ensuring we have an untouchable reference to our css file
           */
          document.documentElement.classList.add(`${ID}`);
        }
      });
    })();
    addObserver([document.querySelector('.c-results-list')], () => {
      addPoller([
        '.c-results-list__items',
      ], () => {
        modifyFilter();
      });
    }, {
      childList: true,
      attributes: true
    });
    addObserver(document.querySelector('.c-results-facets--list'), () => {
      categories.forEach(function (category, i) {
        if (address.indexOf(category.categoryUrl) > -1) {
          generateList(category.categoryParent);
          getCachedItems();
        }
      });
    }, {
      subtree: false,
      childList: true,
      attributes: true
    });
  }
};

export default activate;