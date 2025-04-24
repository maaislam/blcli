/**
 * RC052 - Fundraising for BRC
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import whatWeDoPage from './components/whatWeDoPage';
import newsPageDesktop from './components/newsPageDesktop';
import newsPageMobile from './components/newsPageMobile';
import successPageDesktop from './components/successPageDesktop';
import successPageMobile from './components/successPageMobile';
import donateCtaBtnEventListener from './components/donateCtaBtnEventListener';

const activate = () => {
  setup();

  // Experiment code
  const screenWidth = window.innerWidth;
  const donateCtaBtnWrapper = `<div class='RC052-donateCta__wrapper'>
    <div class='RC052-donateCta'>Donate to British Red Cross</div>
  </div>`;

  /* What We Do Page */
  if (window && window.location && window.location.pathname && window.location.pathname === '/What-we-do.aspx') {
    whatWeDoPage(donateCtaBtnWrapper);
  /* News Pages */
  } else if (window && window.location && window.location.pathname && window.location.pathname.indexOf('/News-and-legislation') > -1) {
    if (screenWidth > 452) {
      // Desktop Sidebar
      newsPageDesktop();
    } else {
      // Mobile Sidebar
      newsPageMobile();
    }
    // Donate CTA button redirect
    pollerLite(['.RC052-donateSidebar__button'], () => {
      donateCtaBtnEventListener('.RC052-donateSidebar__button', 'News and legislation page');
    });
  /* Success Page */
  } else if (window && window.location && window.location.pathname && window.location.pathname === '/Purchase/PurchaseSuccess.aspx') {
    if (screenWidth > 452 && !document.querySelector('.RC028_Banner.RC028_Apps_Banner')) {
      pollerLite(['#wrapper main', '.main-container#content', '.main-content'], () => {
        successPageDesktop();
      });
    } else {
      pollerLite(['#wrapper main', '.main-container#content'], () => {
        successPageMobile();
      });
    }
    // Donate CTA button redirect
    pollerLite(['.RC052-sidebarDonation__btn'], () => {
      donateCtaBtnEventListener('.RC052-sidebarDonation__btn', 'Purchase Success page');
    });
  }
};

export default activate;
