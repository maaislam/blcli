import { fullStory, events } from '../../../../lib/utils';
import productsDropDown from './markup';
import { mobileData } from './mobileNavigation/mobileNav';
import { businessCategories, businessCategoriesIT } from './businessSection/businessMarkup';
import { pollerLite } from '../../../../lib/uc-lib';
import { __, getLanguage } from './helpers';
import businessContent from './businessSection/businessContent';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TG058',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`TG058-lang--${getLanguage()}`);

    /* Desktop only functions */
    if (window.innerWidth > 767) {
      components.desktopTopHeaderContainer();
      components.topHeaderBar();
      components.mainNavBar();
      components.showNav();
      components.hideNav();
      components.homeDropdownSection();
      components.desktopNavEvents();
      components.moveContactLink();
    } else {
    /* Mobile navigation */
      components.mobileNav();
      components.showHideInnerNav();
      components.mobileHomeSection();
      components.mobileNavEvents();
    }

    /* Business section */
    if (document.body.classList.contains('cms-home')) {
      pollerLite(['.wrapper_container', '.popular-products-slider'], () => {
        components.forYourBusiness();
        components.addLinksToBusinessBlocks();
      });

      if (window.location.href.indexOf('/it/') > -1) {
        pollerLite(['.TG058-business-tab'], () => {
          components.forYourBusinessShowITclose();
        });
      } else {
        pollerLite(['.TG058-business-tab'], () => {
          components.forYourBusinessShowClose();
        });
      }
      components.slickTabs();
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc Desktop components
     */
    desktopTopHeaderContainer: () => {
      const header = document.querySelector('.wrapper .header-container');

      // create the top bar
      const newHeaderArea = document.createElement('div');
      newHeaderArea.classList.add('TG058-header');
      newHeaderArea.innerHTML = `
      <div class="TG058-topbar">
        <li><a href="${__('/gb/')}who-we-are/explore/">${__('Who we are')}</a></li>
        <li><a href="${__('/gb/')}technogym-interior-design/">Interior design</a></li>
        <li><a href="${__('/gb/')}newsroom">Newsroom</a></li>
      </div>`;

      header.insertBefore(newHeaderArea, header.firstChild);

      // overlay
      const navOverlay = document.createElement('div');
      navOverlay.classList.add('TG058-overlay');
      document.querySelector('.content-container').appendChild(navOverlay);
    },
    /**
     * @desc add the links to the top header bar
     */
    topHeaderBar: () => {
      const allTopLinks = document.querySelectorAll('#navtop-right .nav.navbar-nav.navbar-right .service-link');
      for (let index = 0; index < allTopLinks.length; index += 1) {
        const element = allTopLinks[index];
        document.querySelector('.TG058-topbar').appendChild(element);
      }

      document.querySelector('.service-link.contact-link a').removeAttribute('data-toggle');
    },


    /**
     * @desc Desktop navigation
     */
    mainNavBar: () => {
      // move nav & account links
      const wellnessLink = document.querySelector('#mywellness-link');
      document.querySelector('.navbar-right .mini-cart').insertAdjacentElement('beforebegin', wellnessLink);

      const newNavLinks = document.createElement('div');
      newNavLinks.classList.add('TG058-new_nav');
      newNavLinks.innerHTML = `
      <div class="TG058-topnav_link"><a href="${__('/gb/')}products.html"><span>${__('Our products')}</span></a><div class="TG058-level1 TG058-products"></div></div>
      <div class="TG058-topnav_link"><span>${__('For your home')}</span> <div class="TG058-level1 TG058-home"></div></div>`;
      document.querySelector('.tool-search').insertAdjacentElement('beforebegin', newNavLinks);

      const navMarkup = productsDropDown(__);
      document.querySelector('.TG058-products').innerHTML = navMarkup;
    },
    homeDropdownSection: () => {
      const homeDropdown = document.querySelector('.ul_navbar_Wrapper .home_section .children');
      if (homeDropdown) {
        document.querySelector('.TG058-home').appendChild(homeDropdown);
      }
    },
    /**
     * @desc Show the nav
     */
    showNav: () => {
      const { settings } = Experiment;
      const navLinks = document.querySelectorAll('.TG058-topnav_link');
      const overlay = document.querySelector('.TG058-overlay');

      for (let i = 0; i < navLinks.length; i += 1) {
        navLinks[i].addEventListener('mouseenter', (e) => {
          for (let j = 0; j < navLinks.length; j += 1) {
            navLinks[j].classList.remove('TG058-link_active');
          }
          e.currentTarget.classList.add('TG058-link_active');
          [].forEach.call(document.querySelectorAll('.TG058-level1'), (item) => {
            item.classList.remove('TG058-nav_active');
          });
          e.currentTarget.querySelector('.TG058-level1').classList.add('TG058-nav_active');
          overlay.classList.add('TG058-overlay_active');
          const level1Name = e.currentTarget.querySelector('span').textContent;
          events.send(settings.ID, 'Click', `${settings.ID} Desktop nav hover: ${level1Name}`, { sendOnce: true });
        });
      }
    },
    /**
    * @desc Hide the nav
    */
    hideNav: () => {
      const overlay = document.querySelector('.TG058-overlay');
      const navDropdowns = document.querySelectorAll('.TG058-level1');
      for (let index = 0; index < navDropdowns.length; index += 1) {
        const element = navDropdowns[index];
        element.addEventListener('mouseleave', () => {
          element.classList.remove('TG058-nav_active');
          [].forEach.call(document.querySelectorAll('.TG058-topnav_link'), (item) => {
            item.classList.remove('TG058-link_active');
          });
          overlay.classList.remove('TG058-overlay_active');
        });
      }
    },

    /**
    * @desc Create mobile navigation
    */
    mobileNav: () => {
      function createLink(label, url) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = url;
        a.innerText = label;
        a.classList.add('TG058-level1_link');
        li.appendChild(a);
        return li;
      }
      const component = document.createElement('div');
      component.classList.add('TG058_mobile_Navigation');

      const ul = document.createElement('ul');
      ul.classList.add('TG058_mobile_Navigation-l1');

      mobileData.forEach((linkData) => {
        const { name, url, html } = linkData;
        const li = createLink(name, url);
        li.classList.add('TG058-nav_link');
        if (html) {
          li.classList.add('TG058-collapsable');
          const sub = document.createElement('div');
          sub.classList.add('TG058_mobile_Navigation-level2');
          sub.innerHTML = `${html}`;
          li.appendChild(sub);
        }
        ul.appendChild(li);
      });

      component.appendChild(ul);

      // add the new nav
      const slideOutNav = document.querySelector('#bs-example-navbar-collapse-1');
      slideOutNav.appendChild(component);
    },
    showHideInnerNav: () => {
      const { settings } = Experiment;
      const navLinks = document.querySelectorAll('.TG058-collapsable .TG058-level1_link');
      for (let i = 0; i < navLinks.length; i += 1) {
        navLinks[i].addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          // click the h3
          for (let j = 0; j < navLinks.length; j += 1) {
            if (navLinks[j] !== e.currentTarget) {
              navLinks[j].classList.remove('TG058-level1link_active');
            }
          }
          if (e.currentTarget.classList.contains('TG058-level1link_active')) {
            e.currentTarget.classList.remove('TG058-level1link_active');
          } else {
            e.currentTarget.classList.add('TG058-level1link_active');

            const level1Name = e.currentTarget.textContent;
            events.send(settings.ID, 'Click', `${settings.ID} Mobile nav clicked: ${level1Name}`, { sendOnce: true });
          }

          if (document.querySelector('h3.TG058-level2link_active')) {
            document.querySelector('h3.TG058-level2link_active').classList.remove('TG058-level2link_active');
            document.querySelector('.TG058-level3.TG058-level3link_active').classList.remove('TG058-level3link_active');
          }

          const level2Categories = e.currentTarget.parentNode.querySelector('.TG058_mobile_Navigation-level2');
          // click the level 3 section
          [].forEach.call(document.querySelectorAll('.TG058_mobile_Navigation-level2'), (item) => {
            if (item !== level2Categories) {
              item.classList.remove('TG058-level2Head_active');
            }
          });

          if (level2Categories) {
            if (level2Categories.classList.contains('TG058-level2Head_active')) {
              e.currentTarget.parentNode.querySelector('.TG058_mobile_Navigation-level2').classList.remove('TG058-level2Head_active');
            } else {
              level2Categories.classList.add('TG058-level2Head_active');

              const level2Name = e.currentTarget.textContent;
              events.send(settings.ID, 'Click', `${settings.ID} Mobile nav clicked: ${level2Name}`, { sendOnce: true });
            }
          }
        });
      }

      // show the third level
      const secondLevelLinks = document.querySelectorAll('.TG058_level2 h3');
      for (let i = 0; i < secondLevelLinks.length; i += 1) {
        secondLevelLinks[i].addEventListener('click', (e) => {
          e.stopPropagation();
          // click the h3
          for (let j = 0; j < secondLevelLinks.length; j += 1) {
            if (secondLevelLinks[j] !== e.currentTarget) {
              secondLevelLinks[j].classList.remove('TG058-level2link_active');
            }
          }
          if (e.currentTarget.classList.contains('TG058-level2link_active')) {
            e.currentTarget.classList.remove('TG058-level2link_active');
          } else {
            e.currentTarget.classList.add('TG058-level2link_active');

            const level3Name = e.currentTarget.textContent;
            events.send(settings.ID, 'Click', `${settings.ID} Mobile nav clicked: ${level3Name}`, { sendOnce: true });
          }

          const level3Items = e.currentTarget.parentNode.querySelector('.TG058-level3');

          // click the level 3 section
          [].forEach.call(document.querySelectorAll('.TG058-level3'), (item) => {
            if (item !== level3Items) {
              item.classList.remove('TG058-level3link_active');
            }
          });

          if (level3Items.classList.contains('TG058-level3link_active')) {
            level3Items.classList.remove('TG058-level3link_active');
          } else {
            level3Items.classList.add('TG058-level3link_active');
          }
        });
      }
    },
    mobileHomeSection: () => {
      pollerLite(['.menu-item.level-0.navbar_section.home_section .children'], () => {
        const newhomeSection = document.querySelectorAll('.TG058_mobile_Navigation .TG058-nav_link.TG058-collapsable')[1].querySelector('.TG058_mobile_Navigation-level2 .TG058-for_home');
        const currentHomeArea = document.querySelector('.menu-item.level-0.navbar_section.home_section .children');
        newhomeSection.appendChild(currentHomeArea);
      });
    },

    /* Business section */
    forYourBusiness: () => {
      let categories;
      if (window.location.href.indexOf('/it/') > -1) {
        categories = businessCategoriesIT;
      } else {
        categories = businessCategories;
      }

      const yourBusinessWrapper = document.createElement('div');
      yourBusinessWrapper.classList.add('TG058-for_business');
      yourBusinessWrapper.innerHTML = `
      <h3>${__('For your business')}</h3>
      <div class="TG058-business_categories"><div class="TG058-business_categories-inner"></div></div>
      <div class="TG058-business_categories_content"></div>
      </div>`;
      document.querySelectorAll('.wrapper_container')[3].insertAdjacentElement('afterend', yourBusinessWrapper);

      for (let i = 0; i < Object.keys(categories).length; i += 1) {
        const data = Object.entries(categories)[i];
        const key = data[0];
        const categoryID = data[1];

        const businessTab = document.createElement('div');
        businessTab.id = categoryID;
        businessTab.classList.add('TG058-business-tab');
        businessTab.innerHTML = `<span>${key}</span>`;

        document.querySelector('.TG058-business_categories-inner').appendChild(businessTab);


        const innerBusinessTabs = document.querySelectorAll('.business_subsection.tab-parent');

        [].forEach.call(innerBusinessTabs, (element) => {
          document.querySelector('.TG058-business_categories_content').appendChild(element);
        });
      }

      // change the content and images
      businessContent();
    },
    addLinksToBusinessBlocks: () => {
      const businessBlocks = document.querySelectorAll('.business_subsection_COLUMN');
      for (let index = 0; index < businessBlocks.length; index += 1) {
        const element = businessBlocks[index];
        const blockLink = document.createElement('a');
        blockLink.classList.add('TG058-blockLink');
        const blocksTitleLink = element.querySelector('.business_text_Header a').getAttribute('href');
        blockLink.setAttribute('href', blocksTitleLink);
        element.appendChild(blockLink);
      }
    },
    /* open/close the tabs */
    forYourBusinessShowClose: () => {
      document.querySelector('.TG058-business-tab').classList.add('TG058-tabHeading_active');
      document.getElementById('fitness-facilities').classList.add('TG058-tab_active');

      const tabHeadings = document.querySelectorAll('.TG058-business-tab');

      for (let i = 0; i < tabHeadings.length; i += 1) {
        tabHeadings[i].addEventListener('click', (e) => {
          // remove active from tabs that currently open
          for (let j = 0; j < tabHeadings.length; j += 1) {
            tabHeadings[j].classList.remove('TG058-tabHeading_active');
          }

          // add class to active heading
          e.currentTarget.classList.add('TG058-tabHeading_active');
          // Remove active class from all content tabs
          [].forEach.call(document.querySelectorAll('.TG058-business_categories_content .business_subsection'), (item) => {
            item.classList.remove('TG058-tab_active');
          });
          // Make one active
          const id = `${e.currentTarget.id.replace('TG058-', '')}`;
          const matchingElm = document.querySelector(`.TG058-business_categories_content ${id}`);
          matchingElm.classList.add('TG058-tab_active');
        });
      }
    },

    forYourBusinessShowITclose: () => {
      document.querySelector('.TG058-business-tab').classList.add('TG058-tabHeading_active');
      document.getElementById('centro-fitness').classList.add('TG058-tab_active');

      const tabHeadings = document.querySelectorAll('.TG058-business-tab');

      for (let i = 0; i < tabHeadings.length; i += 1) {
        tabHeadings[i].addEventListener('click', (e) => {
          // remove active from tabs that currently open
          for (let j = 0; j < tabHeadings.length; j += 1) {
            tabHeadings[j].classList.remove('TG058-tabHeading_active');
          }

          // add class to active heading
          e.currentTarget.classList.add('TG058-tabHeading_active');
          // Remove active class from all content tabs
          [].forEach.call(document.querySelectorAll('.TG058-business_categories_content .business_subsection'), (item) => {
            item.classList.remove('TG058-tab_active');
          });
          // Make one active
          const id = `${e.currentTarget.id.replace('TG058-', '')}`;

          const matchingElm = document.querySelector(`.TG058-business_categories_content ${id}`);
          matchingElm.classList.add('TG058-tab_active');
        });
      }
    },
    slickTabs: () => {
      const $ = window.jQuery;
      // slick the active tabs
      pollerLite([
        '.business_subsection_COLUMNS',
      ], () => {
        $('.business_subsection_COLUMNS').slick({
          mobileFirst: true,
          arrows: true,
          infinite: false,
          slidesToShow: 1,
          responsive: [
            {
              breakpoint: 767,
              settings: 'unslick',
            },
          ],
        });
        if (window.innerWidth < 767) {
          $('.TG058-business-tab').click(() => {
            $('.business_subsection_COLUMNS').slick('refresh');
          });
        }
      });
    },
    moveContactLink: () => {
      // move phone before who we are
      const phoneLink = document.querySelector('.TG058-topbar .service-link.phone-link');
      const topLink = document.querySelector('.TG058-topbar li');
      topLink.insertAdjacentElement('beforebegin', phoneLink);
    },
    desktopNavEvents: () => {
      const { settings } = Experiment;
      const innerNavLinks = document.querySelectorAll('.TG058-nav_column li a');
      for (let i = 0; i < innerNavLinks.length; i += 1) {
        const element = innerNavLinks[i];
        element.addEventListener('click', () => {
          const desktopLinkText = element.textContent;
          events.send(settings.ID, 'Click', `${settings.ID} Desktop nav clicked: ${desktopLinkText}`, { sendOnce: true });
        });
      }
    },
    mobileNavEvents: () => {
      const { settings } = Experiment;
      const mobileNavLinks = document.querySelectorAll('.TG058-level3 li a');
      for (let i = 0; i < mobileNavLinks.length; i += 1) {
        const element = mobileNavLinks[i];
        element.addEventListener('click', () => {
          const mobileLinkText = element.textContent;
          events.send(settings.ID, 'Click', `${settings.ID} Desktop nav clicked: ${mobileLinkText}`, { sendOnce: true });
        });
      }
    },
  },
};

export default Experiment;
