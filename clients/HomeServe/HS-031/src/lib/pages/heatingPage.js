import navRightItem from '../components/navRightItem';
import navbar from '../components/navbar';
import search from '../components/search';
import myHomeServe from '../components/myHomeServe';

const heatingPage = (id, isTab, isMobile) => {
  setTimeout(() => {
    const anchorPoint = document.querySelector('.hs-header .hs-primary-nav');
    //const navBarHeader = document.querySelector('#navig-bar');
    const navBarHeader = document.querySelector('.hs-header__top');
    const navToggleControl = document.querySelector('.hs-header__menu-button');
    const countrySelector = document.querySelector('.hs-header__buttons .hs-region-switcher__icon-button');
    // const loginButton = document.querySelector('.headerBox .brandLogo [href="https://www.homeserve.co.uk/uk/loggedin/my-homeserve"]');

    // loginButton.innerHTML = 'Log in';
    if (!document.querySelector(`.${id}_navbar-container`)) {
      //console.log('inserting navbar', anchorPoint);
      anchorPoint.insertAdjacentHTML('afterend', navbar(id));
    }

    //if login, push myhomeserve
    if (!document.querySelector(`.${id}_myHomeServe`) && window.isLoggedIn) {
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

    document.body.classList.add(`${id}_heatingPage`);
  }, 1500);
};
export default heatingPage;
