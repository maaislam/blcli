import navRightItem from '../components/navRightItem';
import navbar from '../components/navbar';
import search from '../components/search';
import myHomeServe from '../components/myHomeServe';

const plumbingCoverPage = (id, isTab, isMobile) => {
  setTimeout(() => {
    const anchorPoint = document.querySelector('.navigation-bar');
    console.log('🚀 ~ setTimeout ~ anchorPoint:', anchorPoint);
    const navBarHeader = document.querySelector('#navigBar');
    const navToggleControl = document.querySelector('.navbar-toggler');
    const countrySelector = document.querySelector('.change-country');

    if (!document.querySelector(`.${id}_navbar-container`)) {
      anchorPoint.insertAdjacentHTML('afterend', navbar(id));
    }

    //if login, push myhomeserve
    if (!document.querySelector(`.${id}_myHomeServe`)) {
      countrySelector.insertAdjacentHTML('afterend', myHomeServe(id));
    }

    if (!document.querySelector(`.${id}_nav-toggle`) && isTab) {
      const navRightItemHtml = navRightItem(id, true, false);
      navToggleControl.insertAdjacentHTML('beforebegin', navRightItemHtml);
    }

    if (!document.querySelector(`.${id}_nav-toggle`) && isMobile) {
      const navRightItemHtml = navRightItem(id, false, true);
      navToggleControl.insertAdjacentHTML('beforebegin', navRightItemHtml);
      //navBarHeader?.closest('.container').classList.add(`${id}_container`);
      navBarHeader?.insertAdjacentHTML('afterend', search(id));
    }

    document.body.classList.add(`${id}_plumbingCoverPage`);
  }, 1500);
};
export default plumbingCoverPage;
