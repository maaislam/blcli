import { fullStory, events } from '../../../../lib/utils';
import { navigationData } from './navCategories';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP140',
    VARIATION: '2',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    components.createNav();
    components.addSiteMapLinks();
    components.openFirstLevel();
    components.openSecondLevel();
    components.closeSecondLevel();

    components.sendEvents();
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
    /* create the new navigation */
    createNav: () => {
      function createLink(label, url) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = url;
        a.innerText = label;
        a.classList.add('MP140-level1_link');
        a.removeAttribute('href');
        li.appendChild(a);
        return li;
      }
      const component = document.createElement('div');
      component.classList.add('MP140_desktop_Navigation');

      const ul = document.createElement('ul');
      ul.classList.add('MP140_desktop_Navigation-l1');

      navigationData.forEach((linkData) => {
        const { name, url, html } = linkData;
        const li = createLink(name, url);
        if (html) {
          li.classList.add('MP140-navigation_level1-link');
          const sub = document.createElement('div');
          sub.classList.add('MP140-navigation_level2-dropdown');
          sub.innerHTML = `${html}`;
          li.appendChild(sub);
        }
        ul.appendChild(li);
      });

      component.appendChild(ul);

      const header = document.querySelector('#js-header .header_nav');
      header.appendChild(component);
    },
    /* Add the site map links to the nav from the old nav */
    addSiteMapLinks: () => {
      const siteMapLinks = document.querySelectorAll('.nav_category .pl-3.px-3.my-4 .my-3');
      const siteMapsInNewNav = document.querySelectorAll('.MP140-siteMap');

      for (let i = 0; i < siteMapsInNewNav.length; i += 1) {
        const siteMapWrapper = siteMapsInNewNav[i];
        [].forEach.call(siteMapLinks, (item) => {
          const newSiteMapLink = document.createElement('li');
          newSiteMapLink.innerHTML = item.innerHTML;
          siteMapWrapper.appendChild(newSiteMapLink);
        });
        const loginLink = document.createElement('li');
        loginLink.classList.add('MP140-login');
        loginLink.innerHTML = '<a href="#">Login/Register</a>';
        siteMapWrapper.appendChild(loginLink);
      }
    },
    /* Show the first level of the nav on click */
    openFirstLevel: () => {
      const { settings } = Experiment;
      const currentShopLinkParent = document.querySelector('.header_nav .col-xs-4.pt-sm-2');
      // replace the current shop link
      const newShopLink = document.createElement('div');
      newShopLink.classList.add('MP140-nav-toggle');
      newShopLink.innerHTML = 'Shop';
      currentShopLinkParent.insertBefore(newShopLink, currentShopLinkParent.firstChild);

      // toggle open the first level
      const newNavToggle = document.querySelector('.MP140-nav-toggle');
      const newNavLevel1 = document.querySelector('.MP140_desktop_Navigation-l1');
      newNavToggle.addEventListener('click', () => {
        if (newNavLevel1.classList.contains('MP140-level1_active')) {
          newNavLevel1.classList.remove('MP140-level1_active');
          newShopLink.classList.remove('MP140-nav_active');

          document.querySelector('.header_nav').style.height = '100px';

          events.send(settings.ID, 'Clicked', `closed the nav - Variation ${settings.VARIATION}`);
        } else {
          newNavLevel1.classList.add('MP140-level1_active');
          newShopLink.classList.add('MP140-nav_active');
          document.querySelector('.header_nav').style.height = 'auto';
          events.send(settings.ID, 'Clicked', `opened the navigation - Variation ${settings.VARIATION}`);
        }
      });
    },
    /* Show the second level of the nav on hover */
    openSecondLevel: () => {
      const secondLevelLinks = document.querySelectorAll('.MP140-navigation_level1-link');

      /* eslint-disable*/
      for (let i = 0; i < secondLevelLinks.length; i += 1) {
        secondLevelLinks[i].addEventListener('mouseenter', (e) => {
          for (let j = 0; j < secondLevelLinks.length; j += 1) {
            secondLevelLinks[j].classList.remove('MP140-navigation_level1-link_active');
          }
          e.currentTarget.classList.add('MP140-navigation_level1-link_active');
          [].forEach.call(document.querySelectorAll('.MP140-navigation_level2-dropdown'), (item) => {
            item.classList.remove('MP140-navigation_level2-dropdown_active');
          });
          e.currentTarget.querySelector('.MP140-navigation_level2-dropdown').classList.add('MP140-navigation_level2-dropdown_active');
        });
      }
    },
    /* Close the nav */
    closeSecondLevel: () => {
      // to here
      const secondLevelLinks = document.querySelectorAll('.MP140-navigation_level2-dropdown');

      for (let index = 0; index < secondLevelLinks.length; index += 1) {
        const element = secondLevelLinks[index];

        let secondNavtimeout;
        element.addEventListener('mouseleave', () => {
          secondNavtimeout = setTimeout(() => {
            element.classList.remove('MP140-navigation_level2-dropdown_active');
            element.parentNode.classList.remove('MP140-navigation_level1-link_active');
          }, 500);
          element.parentNode.addEventListener('mouseover', () => {
            clearTimeout(secondNavtimeout);
          });

          element.parentNode.addEventListener('mouseleave', () => {
            element.classList.remove('MP140-navigation_level2-dropdown_active');
            element.parentNode.classList.remove('MP140-navigation_level1-link_active');
            clearTimeout(secondNavtimeout);
          });
        });
      }

      /* eslint-disable */
     /* const secondLevelLinks = document.querySelectorAll('.MP140-navigation_level2-dropdown');
      for (let index = 0; index < secondLevelLinks.length; index += 1) {
        const element = secondLevelLinks[index];
        element.addEventListener('mouseenter', () => {
          element.addEventListener('mouseleave', (e) => {
              element.classList.remove('MP140-navigation_level2-dropdown_active');
              element.parentNode.classList.remove('MP140-navigation_level1-link_active');
            
          });
        }); */
      // }
    },

    sendEvents: () => {
      const { settings } = Experiment;

      const mainNavLinks = document.querySelectorAll('.MP140-level1_link');
      for (let j = 0; j < mainNavLinks.length; j += 1) {
        const element = mainNavLinks[j];
        element.addEventListener('mouseenter', () => {
          const link1Name = element.textContent;
          events.send(settings.ID, 'click', `Level 1 link: ${link1Name} Variation: ${settings.VARIATION}`, { sendOnce: true });
        });
      }

      const level2Links = document.querySelectorAll('.MP140-navigation_level2-dropdown a');
      for (let index = 0; index < level2Links.length; index += 1) {
        const element = level2Links[index];
        element.addEventListener('click', () => {
          const linkName = element.textContent;
          events.send(settings.ID, 'click', `Sub-subsections link: ${linkName} Variation: ${settings.VARIATION}`);
        });
      }
    },
  },
};

export default Experiment;
