/**
 * NE-320 - Mobile navigation restructure v3.0 UK
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { h, render } from 'preact';
import MobileSlidingNav from './components/MobileSlidingNav';
import { showHideHeader } from './helpers';
// This is replaced with window.navData1/window.navData2 when it goes into production
// import navData1 from './navData1';
// import navData2 from './navData2';
// import NE320bannerData from './NE320data';
// -------------------------------

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const getCustomerName = () => {
  const name = (document.querySelector('.nosto_customer .first_name')?.innerText || '').trim();

  return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : '';
};

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // Set app height - use var to workaround boottom toolbar issue in iOS
  const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }
  window.addEventListener('resize', appHeight)
  appHeight()

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const navigation = document.querySelector('nav.navigation');
  
  if(navigation) {
    const customerName = getCustomerName();
    let salutation = '';
    if(customerName) {
      salutation = `Hi, ${customerName}!`;
    }

    navigation.innerHTML = '';

    let blogTitle = 'Journal';
    if(shared.VARIATION == 2) {
      blogTitle = 'Blog';
    }

    const extraMarkup = (
      <div className="MobileSlidingNav__extra">
        <ul>
          <li>
            <a href="/pages/neom-is-here-for-you">Our story</a>
          </li>
          <li>
            <a href="/pages/contact">Customer services</a>
          </li>
          <li>
            <a href="/pages/sustainability">Sustainability</a>
          </li>
          <li>
            <a href="/pages/postage">Delivery &amp; returns</a>
          </li>
          <li>
            <a href="/blogs/wellbeing">{blogTitle}</a>
          </li>
          <li>
            <a href="https://support.neomorganics.com/hc/en-gb">Help &amp; FAQs</a>
          </li>
          <li>
            <a href="/pages/neom-is-here-for-you">Watch our story</a>
          </li>
          <li>
            <a href="/pages/our-locations">Locations</a>
          </li>

        </ul>
        
        <div className="MobileSlidingNav__currency">
        </div>
      </div>
    );

    let extraNavContent = null;

    if(shared.VARIATION == '1' || shared.VARIATION == '2') {
      extraNavContent = (
        <div className="MobileSlidingNav__extra-nav">
          <h2>Shop by
            <span className="MobileSlidingNav__font-madelyn">Wellbeing Need</span>
          </h2>
          <div class="MobileSlidingNav__wbcircles">
            <div class="MobileSlidingNav__wbcircle">
              <a href="/collections/scent-to-sleep" class="MobileSlidingNav__wbcircle-inner"></a>
                <span class="circleimage"></span>
                <strong>Better Sleep?</strong>
            </div>
            <div class="MobileSlidingNav__wbcircle">
              <a href="/collections/scent-to-de-stress" class="MobileSlidingNav__wbcircle-inner"></a>
                <span class="circleimage"></span>
                <strong>Less Stress?</strong>
            </div>
            <div class="MobileSlidingNav__wbcircle">
              <a href="/collections/scent-to-make-you-happy" class="MobileSlidingNav__wbcircle-inner"></a>
                <span class="circleimage"></span>
                <strong>Mood Boost?</strong>
            </div>
            <div class="MobileSlidingNav__wbcircle">
              <a href="/collections/scent-to-boost-your-energy" class="MobileSlidingNav__wbcircle-inner"></a>
                <span class="circleimage"></span>
                <strong>More Energy?</strong>
            </div>
          </div>
        </div>
      );
    }

    const handleClose = () => {
      const burger = document.querySelector('.header .header-burger');
      if(burger) {
        burger.click();
      }
    };

    let navData = null;
    // This is replaced with window.navData1/window.navData2 when it goes into production
    if(shared.VARIATION == 1) {
      // navData = navData1;
      navData = window.navData1;
    } else if(shared.VARIATION == 2) {
      // navData = navData1;
      navData = window.navData1;
    } else if(shared.VARIATION == 3) {
      // navData = navData2;
      navData = window.navData2;
    }
//
    let podCta = '';
    if(shared.VARIATION == 1 || shared.VARIATION == 2 || shared.VARIATION == 3) {
      podCta = (
        <a href="/pages/wellbeing-pod">
          <img className="MobileSlidingNav__more" 
            src="https://ucds.ams3.digitaloceanspaces.com/neomorganics/wellbeing-pod-more.png"/> 
        </a>
      );
    }

    render((
      <MobileSlidingNav extraNavContent={extraNavContent} extraMenuContent={extraMarkup} 
          data={navData} salutation={salutation} showLogout={salutation ? '/account/logout' : false} 
          handleClose={handleClose}
      >
        {podCta}
      </MobileSlidingNav>
    ), navigation);

    // --- NE-320 ---
    /**
     * @desc Hide Mobile header when menu is open
     * Observe when menu is open and show/hide header
     */
    let topBanner = null;
    pollerLite(['.header-outer .marketing-strip'], () => {
      topBanner = document.querySelector('.header-outer .marketing-strip');
    });

    showHideHeader(topBanner);
    
    observer.connect(document.querySelector('nav.navigation.has-background-white.has-text-left-touch'), () => {
      showHideHeader(topBanner);
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        // subtree: true,
      },
    });

    pollerLite(['.MobileSlidingNav__extra', '.MobileSlidingNav__extra-nav'], () => {
      /**
       * @desc Sticky Wellbeing Carousel functionality
       */
      const mobileListing = document.querySelector('.MobileSlidingNav__listing-wrap');
      document.querySelector('.MobileSlidingNav__extra-nav').classList.add('sticky');
      const wellbeingBanners = document.querySelector('.MobileSlidingNav__extra-nav').innerHTML;

      if (VARIATION == '1') {
        mobileListing.insertAdjacentHTML('afterend', `<div class="MobileSlidingNav__extra-nav ${ID}-MobileSlidingNav__extra-nav"></div>`);
        document.querySelector(`.${ID}-MobileSlidingNav__extra-nav`).innerHTML = wellbeingBanners;
      } else if (VARIATION == '2') {
        document.querySelector('.MobileSlidingNav__extra-nav.sticky').setAttribute('style', 'display: none !important;');
        mobileListing.insertAdjacentHTML('beforebegin', `<div class="MobileSlidingNav__extra-nav ${ID}-MobileSlidingNav__extra-nav"></div>`);
        document.querySelector(`.${ID}-MobileSlidingNav__extra-nav`).innerHTML = wellbeingBanners;
      }
      

      if (VARIATION == '1') {
        pollerLite(['nav.navigation.has-background-white.has-text-left-touch', `.MobileSlidingNav__extra-nav.${ID}-MobileSlidingNav__extra-nav`], () => {
          document.querySelector('.MobileSlidingNav__level.MobileSlidingNav__level-1.MobileSlidingNav__level--active').addEventListener("scroll", function() {
            let elementTarget = document.querySelector(`.MobileSlidingNav__extra-nav.${ID}-MobileSlidingNav__extra-nav`);
            // let productList = document.querySelector('.category-results-container');
            if (document.querySelector('nav.navigation.has-background-white.has-text-left-touch').classList.contains('is-visible')) {

              if (elementTarget.getBoundingClientRect().top <= 590) {
                document.querySelector(`.MobileSlidingNav__extra-nav.sticky`).setAttribute('style', 'display: none;');
              }
              if (elementTarget.getBoundingClientRect().top > 590) {
                document.querySelector(`.MobileSlidingNav__extra-nav.sticky`).removeAttribute('style');
              }
            }
            
          }, false);
        });
        
      }
    });

    /**
     * @desc On Variation 3 only, Shop Wellbeing Need is a 2nd level menu
     * Adds subtitles to the categories 
     */
    if (VARIATION == '3') {
      pollerLite(['.MobileSlidingNav__level.MobileSlidingNav__level-2[data-id="wellbeingneeds"]'], () => {
        let allWellbeingItems = document.querySelectorAll('.MobileSlidingNav__level.MobileSlidingNav__level-2[data-id="wellbeingneeds"] ul.MobileSlidingNav__listing li');
        const subtitles = ['Stop. Breathe. Sleep.', 'Feel the tension lift', 'Kickstart happy vibes', 'Supercharged you'];
        for (let i = 1; i < allWellbeingItems.length; i += 1) {
          let item = allWellbeingItems[i];
          item.querySelector('span').insertAdjacentHTML('afterend', `<span class="subtitle">${subtitles[i - 1]}</span>`);
          item.querySelector('a').setAttribute('style', 'padding-bottom: 28px;');
        }
      });
    }

    /**
     * @desc Second Level Nav Amends
     * Customise 2nd level banners with relevant banner image and URL
     */
    pollerLite([`.MobileSlidingNav__level.MobileSlidingNav__level-2 .MobileSlidingNav__extra-content a img`,
    `.MobileSlidingNav__level.MobileSlidingNav__level-2[data-id="bath&body"]`], () => {
      let NE320bannerData = window.NE320data;
      for (let i = 0; i < NE320bannerData.length; i += 1) {
        const bannerData = NE320bannerData[i];
        const menu = document.querySelector(`.MobileSlidingNav__level.MobileSlidingNav__level-2[data-id="${bannerData.id}"]`);
        if (menu) {
          menu.querySelector('.MobileSlidingNav__extra-content a').setAttribute('href', `${bannerData.link}`);
          menu.querySelector('.MobileSlidingNav__extra-content img').setAttribute('src', `${bannerData.img}`);
          menu.querySelector('.MobileSlidingNav__extra-content img').setAttribute('data-id', `${bannerData.id}`);
        }
      }
    });
    // --- End of NE-320 additions ---
    
    

    // Currency Selector
    const selector = document.querySelector('.header .site-selector');
    const currencyWrap = document.querySelector('.MobileSlidingNav__currency');

    if(selector && currencyWrap) {
      currencyWrap.insertAdjacentElement('afterbegin', selector);

      [].forEach.call(selector.querySelectorAll('option'), opt => {
        if(opt.innerText.match(/UK Store/)) {
          opt.innerText = 'United Kingdom (£ GBP)';
        } else if(opt.innerText.match(/US Store/)) {
          opt.innerText = 'United States ($ USD)';
        }
      });
    }

    // Tracking
    document.querySelector('.MobileSlidingNav__level.MobileSlidingNav__level-1 .MobileSlidingNav__extra-content').addEventListener('click', (e) => {
      fireEvent(`Click - Hero banner`);
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__level-1 .MobileSlidingNav__listing li a'), l => {
      l.addEventListener('click', (e) => {
        fireEvent(`Click - Level 1 - ${e.currentTarget.innerText.trim()}`);
      });
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__level-2 .MobileSlidingNav__listing li a'), l => {
      l.addEventListener('click', (e) => {
        fireEvent(`Click - Level 2 - ${e.currentTarget.innerText.trim()}`);
      });
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__more'), l => {
      l.addEventListener('click', (e) => {
        
        if (e.currentTarget.getAttribute('data-id') !== null) {
          fireEvent(`Click - Shop now banner - ${e.currentTarget.getAttribute('data-id')}`);
        } 
        
      });
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__wbcircle'), l => {
      l.addEventListener('click', (e) => {
        fireEvent(`Click - Wellbeing Circle`);
      });
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__extra li a'), l => {
      l.addEventListener('click', (e) => {
        fireEvent(`Click - Secondary Nav Link`);
      });
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__back'), l => {
      l.addEventListener('click', (e) => {
        fireEvent(`Click - Menu Link Back`);
      });
    });
  }
  
};
