import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import localOptions from './options';
import offersNav from './lib/navMarkup';
import helpTab from './lib/helpMeTab';
import maleTab from './lib/maleTab';
import femaleTab from './lib/femaleTab';
import offersNavMB from './lib/navMarkupMobile';

/**
 * {{GD017}} - {{Navigation restructure}}
 */
const mobileCheck = window.mobileSite;
const opts = options || localOptions;

const { data } = opts;

const Run = () => {
  let $ = null;
  let slideQ = false;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'GD017',
      VARIATION: '1',
    },
    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;
      const navList = doc.getElementById('nav-primary-inner');

      return {
        doc,
        bodyVar,
        navList
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      if (mobileCheck === false) {
        components.contentBuilder();
        components.navTracking();
      } else {
        components.contentBuilderMB();
        pollerLite([() => !!window.jQuery], components.mobileBindings);
      }
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      findEl(element, target) {
        var current = element;
        while (!current.classList.contains(target)) {
          current = current.parentNode;
          if (!current.parentNode) {
            return false;
          } else if (current.classList.contains(target)) {
            return current;       
          }
        }
      },
    },
    components: {
      getOffers() {
        const _offerArr = [{
          href: data.var1link1,
          img: data.var1img1,
        }, {
          href: data.var1link2,
          img: data.var1img2,
        }, {
          href: data.var1link3,
          img: data.var1img3,
        }];

        return _offerArr;
      },
      contentBuilder() {
        const navItems = Exp.cache.navList.querySelectorAll('.list-container-level-2');
        const helpTabOld = Exp.cache.navList.querySelector('.nav-help.item-level-1');

        if(helpTabOld.classList.contains('expand-left')){
          helpTabOld.classList.remove('expand-left');
        }
        helpTabOld.classList.add('expand-right');

        [].forEach.call(navItems, (item) => {
          if (item.parentNode.classList.contains('nav-help')) {
            item.innerHTML = helpTab;
          } else if (item.parentNode.classList.contains('nav-men')) {
            item.innerHTML = maleTab;
          } else if (item.parentNode.classList.contains('nav-women')) {
            item.innerHTML = femaleTab;
          } else {
            const oldMarkup = item.innerHTML;
            const newMarkup = `<div class="GD017_container">${oldMarkup}</div>`;
            
            item.classList.add('GD017_container-table');
            item.innerHTML = newMarkup;
          }
        });

        Exp.cache.bodyVar.querySelector('.item-level-1.nav-help').insertAdjacentHTML('beforebegin', offersNav(Exp.components.getOffers()));        
      },
      contentBuilderMB() {
        Exp.cache.bodyVar.classList.add('GD017_mobile');
        const navItems = Exp.cache.navList.querySelectorAll('.list-container-level-2');
        const teleItem = Exp.cache.bodyVar.querySelector('#nav-secondary .contact-phone.menu-item');

        [].forEach.call(navItems, (item) => {
          const oldMarkup = item.innerHTML;
          const newMarkup = `<div class="GD017_container">${oldMarkup}</div>`;

          item.classList.add('GD017_container-table');
          item.innerHTML = newMarkup;
        });

        Exp.cache.navList.insertAdjacentHTML('afterend', offersNavMB(Exp.components.getOffers()));
        Exp.cache.doc.getElementById('nav-primary').insertAdjacentHTML('beforebegin', '<a class="GD017_close-nav"></a>');
        
        teleItem.insertAdjacentHTML('beforebegin', `
          <li class="GD017_lower-nav-item menu-item GD017-no-border"><a href="/share">Invite a friend, Share £45</a></li>
        `);
        teleItem.insertAdjacentHTML('afterend', `
          <li class="GD017_lower-nav-item menu-item GD017_login-btn"><a href="/login">Login</a></li>
        `);
      },
      mobileBindings() {
        $ = window.jQuery;
        const closeBtn = Exp.cache.doc.getElementById('nav-toggle');

        Exp.cache.doc.getElementById('nav-primary').addEventListener('click', (e) => {
          if (slideQ === false) {
            const elTarget = e.target;
            const contentReveal = $(elTarget.nextElementSibling);
            if (elTarget.classList.contains('GD017_reveal-more')) {
              slideQ = true;
              
              if (elTarget.classList.contains('GD017_active')) {
                elTarget.classList.remove('GD017_active');
                contentReveal.slideUp(() => {
                  slideQ = false;
                });
              } else {
                elTarget.classList.add('GD017_active');
                contentReveal.slideDown(() => {
                  slideQ = false;
                });
              }
            } else if (elTarget.classList.contains('GD017_dd-button')) {
              slideQ = true;
              
              if (elTarget.classList.contains('GD017_active')) {
                elTarget.classList.remove('GD017_active');
                contentReveal.slideUp(() => {
                  slideQ = false;
                });
              } else {
                elTarget.classList.add('GD017_active');
                contentReveal.slideDown(() => {
                  slideQ = false;
                });
              }
            }
          }
        });

        Exp.cache.bodyVar.querySelector('.GD017_close-nav').addEventListener('click', (e) => {
          closeBtn.click();
        });

        let headerTimeout;

        closeBtn.addEventListener('click', () => {
          if (closeBtn.classList.contains('GD017_nav-active')) {
            headerTimeout = setTimeout(() => {
              Exp.cache.bodyVar.classList.remove('GD017_full-screen');
            }, 400);
            closeBtn.classList.remove('GD017_nav-active');
          } else {
            closeBtn.classList.add('GD017_nav-active');
            Exp.cache.bodyVar.classList.add('GD017_full-screen');
            clearTimeout(headerTimeout);
          }
        });


        Exp.components.navTrackingMB();
      },
      navTracking() {
        const { services, settings } = Exp;
        Exp.cache.navList.addEventListener('click', (e) => {
          const { target } = e;
          const whichTab = services.findEl(target, 'item-level-1');
          let whichText = '';

          if (whichTab.classList.contains('nav-men')) {
            whichText = 'Male';
          } else if (whichTab.classList.contains('nav-women')) {
            whichText = 'Women';
          } else if (whichTab.classList.contains('nav-help')) {
            whichText = 'Help me choose';
          } else if (whichTab.classList.contains('nav-2for1')) {
            whichText = '2for1';
          }

          if (target.classList.contains('GD017_img-link') || target.parentNode.classList.contains('GD017_img-link')) {
            events.send(settings.ID, 'Click', target.querySelector('label').textContent + ' Label clicked in tab' + whichText);
          } else if (target.classList.contains('GD017_help-item')) {
            events.send(settings.ID, 'Click', target.textContent + ' link click in tab ' + whichText);
          } else if (target.classList.contains('GD017_shape-item')) {
            events.send(settings.ID, 'Click', target.textContent + ' shape type clicked in tab ' + whichText);
          } else if (target.classList.contains('GD017_hero-banner')) {
            events.send(settings.ID, 'Click', 'Large offer clicked in tab ' + whichText);
          } else if (target.classList.contains('GD017_banner')) {
            if (target.nextElementSibling) {
              events.send(settings.ID, 'Click', 'Small offer 1 clicked in tab ' + whichText);
            } else {
              events.send(settings.ID, 'Click', 'Small offer 2 clicked in tab ' + whichText);
            }
          } else if (target.parentNode.classList.contains('item-level-1')) {
            events.send(settings.ID, 'Click', 'Top level link clicked - ' + whichText);
          } else {
            events.send(settings.ID, 'Click', target.textContent + ' link clicked in ' + whichText);
          }
        });
      },
      navTrackingMB() {
        const { services, settings } = Exp;
        Exp.cache.doc.getElementById('nav-primary').addEventListener('click', (e) => {
          const { target } = e;
          let whichTab = services.findEl(target, 'GD017_nav-item');

          if (whichTab.classList.contains('GD017_male-tab')) {
            whichTab = 'Male';
          } else if (whichTab.classList.contains('GD017_female-tab')) {
            whichTab = 'Women';
          } else if (whichTab.classList.contains('GD017_helpme-tab')) {
            whichTab = 'Help me choose';
          } else if (whichTab.classList.contains('GD017_offers-tab')) {
            whichTab = '2for1';
          } else if (whichTab.classList.contains('GD017_FAQS')) {
            whichTab = 'FAQS';
          }

          if (target.classList.contains('GD017_nav-link') && target.classList.contains('GD017_reveal-more')) {
            events.send(settings.ID, 'Click', target.textContent + ' tab clicked');
          } else if (target.classList.contains('GD017_strapline')) {
            events.send(settings.ID, 'Click', target.querySelector('strong').textContent + ' strapline click in tab ' + whichTab);
          } else if (target.parentNode.classList.contains('GD017_strapline')) {
            events.send(settings.ID, 'Click', target.parentNode.querySelector('strong').textContent + ' strapline click in tab ' + whichTab);
          } else if (target.parentNode.classList.contains('GD017_shape-wrap')) {
            events.send(settings.ID, 'Click', target.textContent + ' shape clicked in tab ' + whichTab);
          } else if (target.classList.contains('GD017_offer-link')) {
            events.send(settings.ID, 'Click', target.href + ' offer clicked in ' + whichTab); 
          } else if (target.parentNode.classList.contains('GD017_offer-link')) {
            events.send(settings.ID, 'Click', target.parentNode.href + ' offer clicked in ' + whichTab); 
          }
        });

        Exp.cache.doc.getElementById('nav-secondary').addEventListener('click', (e) => {
          const { target } = e;

          events.send(settings.ID, 'Click', target.textContent + ' clicked in secondary nav'); 
        });
      },
    },
  };

  Exp.init();
};

export default Run;
