import {
  setup
} from './services';
import Journey from '../components/Journey';
import settings from './settings';
import {
  events
} from '../../../../../lib/utils';

const {
  ID,
  VARIATION
} = settings;

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();
  function scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
        if ( window.scrollY != 0 ) {
            window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval); 
    },15);
  }
  // Experiment code
  if (VARIATION === '2') {
    events.send(ID, 'Control', 'is-active');
    return false;
  } else {
    events.send(ID, 'FL050-test', 'is-active');
    const getPageData = () => {
      let dataObject;
      
      for (let i = 0; i < window.dataLayer.length; i += 1) {
        const data = window.dataLayer[i];
        if (typeof data === 'object' && data.event && data.event === 'FLAN_onLoad') {
          dataObject = data;
          break;
        }
      }
      return dataObject;
    };
    const pageData = getPageData();
    const pageType = pageData.pageType;
    let categoryName;
    let categoryLink;
    switch (pageType) {
      case 'Home':
        localStorage.setItem('backTo', JSON.stringify({}));
        break;
      case 'ProductDetail':
        const backTo = JSON.parse(localStorage.getItem('backTo'));
        let brandName;
        let brandlink;
        let categoryname;
        let categorylink;
        let isSizeSelected = false;
        if (window.innerWidth <= 768) {
          document.querySelector('.SizeDropDown').addEventListener('change', function(){
            isSizeSelected = true;
          });
          document.querySelector('#aAddToBag').addEventListener('touchstart', () => {
            if(isSizeSelected){
              brandName = document.querySelector('#productDetails #lblProductBrand').textContent.trim().toLowerCase();
              brandlink = window.dataLayer[1].productBrand.replace(/[&\s]/g, '-').toLowerCase();
              if (backTo) {
                categorylink = backTo.link;
                categoryname = backTo.name;
              } else {
                categorylink = null;
                categoryname = null;
              }
              if (!document.querySelector(`.${ID}_journeyWrap`)) {
                new Journey({
                  brand: brandName,
                  brandLink: brandlink,
                  categoryLink: categorylink,
                  categoryName: categoryname,
                });
              }
              jQuery('html, body').animate({
                scrollTop: jQuery('.BodyWrap').offset().top
              }, 1000);
            } else {
              let listener = false;
              setTimeout(function(){
                document.querySelector('.modal-body .SizeModalButton_AddToBag').addEventListener('touchstart', () => {
                  brandName = document.querySelector('#productDetails #lblProductBrand').textContent.trim().toLowerCase();
                  brandlink = window.dataLayer[1].productBrand.replace(/[&\s]/g, '-').toLowerCase();
                  if (backTo) {
                    categorylink = backTo.link;
                    categoryname = backTo.name;
                  } else {
                    categorylink = null;
                    categoryname = null;
                  }
                  if (!document.querySelector(`.${ID}_journeyWrap`)) {
                    new Journey({
                      brand: brandName,
                      brandLink: brandlink,
                      categoryLink: categorylink,
                      categoryName: categoryname,
                    });
                  }
                  listener = true;
                  if(listener){
                    scrollToTop(1500);
                    /*setTimeout(function () {
                      hideShoppingBag();
                    }, 16000);*/
                  }
                });
              }, 250);
            }
          });
        } else {
          document.querySelector('.SizeDropDown').addEventListener('change', function(){
            isSizeSelected = true;
          });
          document.querySelector('.addToBag').addEventListener('click', () => {
            brandName = document.querySelector('#productDetails #lblProductBrand').textContent.trim().toLowerCase();
            brandlink = window.dataLayer[1].productBrand.replace(/[&\s]/g, '-').toLowerCase();
            if (backTo) {
              categorylink = backTo.link;
              categoryname = backTo.name;
            } else {
              categorylink = null;
              categoryname = null;
            }
            if (!document.querySelector(`.${ID}_journeyWrap`)) {
              new Journey({
                brand: brandName,
                brandLink: brandlink,
                categoryLink: categorylink,
                categoryName: categoryname,
              });
            }
            if (isSizeSelected) {
              jQuery('html, body').animate({
                scrollTop: jQuery('#MoreFromLinks').offset().top
              }, 1000);
              /*setTimeout(function () {
                hideShoppingBag();
              }, 16000);*/
            }
          });
        }
        break;
      case 'BrowsePL':
        localStorage.setItem('backTo', JSON.stringify({}));
        categoryName = pageData.CategoryLevel0.trim();
        categoryLink = pageData.rollupURL;
        localStorage.setItem('backTo', JSON.stringify({
          name: categoryName,
          link: categoryLink
        }));
        break;
      case 'BrowseSearch':
        localStorage.setItem('backTo', JSON.stringify({}));
        categoryName = 'Search results';
        categoryLink = window.location.href;
        localStorage.setItem('backTo', JSON.stringify({
          name: categoryName,
          link: categoryLink
        }));
        break;
      default:
        break;
    }
  }
};

export default activate;
