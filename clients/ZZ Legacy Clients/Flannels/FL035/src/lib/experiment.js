/**
 * FL035 - A-Z Brands
 * @author User Conversion
 */
import { setup, topBrands, setCookies, searchBrands, clickEvents } from './services';
import settings from './settings';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const activate = () => {
  // Control
  if (settings.VARIATION === '3') {
    events.send(settings.ID, 'Control', 'Control event fired');
    return false;
  }

  setup();

  // Variables cached
  const title = cacheDom.get('h1.BrandsHead');
  // Top Nav
  // const menLink = cacheDom.get('nav#topMenu ul li.root.MenuGroupB > a');
  // const womenLink = cacheDom.get('nav#topMenu ul li.root.MenuGroupC > a');
  // const kidsLink = cacheDom.get('nav#topMenu ul li.root.MenuGroupD > a');
  // const subNavLinks = cacheDom.getAll('nav#topMenu li.root .SubMenuWrapper>ul li a');
  // const subNavLinksMobile = cacheDom.getAll('.accordionMenuContentWrap .shop>ul>li.root .has-dropdown .am-level a');
  // // Brands Nav
  // const bMenLink = cacheDom.get('.designMenImg p a');
  // const bWomenLink = cacheDom.get('.designWomenImg p a');
  // const bKidsLink = cacheDom.get('.designKidImg p a');

  const searchRef = cacheDom.get('.designLPContainer');
  const searchForm = cacheDom.get('#dnn_Search_dvSearch');
  const mobileSearch = cacheDom.get('#MobtxtSearch');

  // Experiment code
  // setCookies(menLink);
  // setCookies(womenLink);
  // setCookies(kidsLink);
  // setCookies(bMenLink);
  // setCookies(bWomenLink);
  // setCookies(bKidsLink);
  // if (subNavLinks.length) {
  //   for (let i = 0; subNavLinks.length > i; i += 1) {
  //     setCookies(subNavLinks[i]);
  //   }
  // }

  topBrands(title);

 
  if (settings.VARIATION === '1') {
    searchBrands.addInput(searchRef, searchForm);

    const brandSearch = document.querySelector('.FL035-brandSearch input#FL035-search');
    pollerLite([brandSearch], () => {
      searchBrands.addInputEvent(brandSearch);
    });
  }
  if (settings.VARIATION === '2') {
    searchBrands.addInputEvent(mobileSearch);
  }

  // Click events
  clickEvents();
};

export default activate;

