import { shopLinks, otherLinks, brandCategories, brandCategoriesV2, clothingLinks } from './lib/ME141-navLinks';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME141',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);

    // replace current nav
    const navigation = document.querySelector('.shiftnav-nav');
    navigation.innerHTML = `
    <div class="ME141-nav_tabs">
      <div id="ME141-shop" class="ME141-tab ME141-tab_active">Shop By</div>
      <div id="ME141-other" class="ME141-tab">Other</div>
      <div class="ME141-tab_slider"></div>
    </div>
    <div class="ME141-links ME141-shop ME141-tablinks_active"></div>
    <div class="ME141-links ME141-other"></div>
    <div class="ME141-subnav ME141-movies"><div class="ME141-back">Back</div></div>
    <div class="ME141-subnav ME141-gaming"><div class="ME141-back">Back</div></div>
    <div class="ME141-subnav ME141-comics"><div class="ME141-back">Back</div></div>
    <div class="ME141-subnav ME141-categories"><div class="ME141-back">Back</div></div>`;

    services.addOtherLinks();
    services.addShopLinks();
    services.addInnerLinks();
    services.addClothingNav();
    components.topTabs();
    components.showSubMenu();
    components.hideSubMenu();
    services.unbindScroll();


    const searchBar = document.querySelector('.shiftnav-search');
    const searchText = document.createElement('p');
    searchText.classList.add('ME141-search_title');
    searchText.innerHTML = 'Looking for something specific?';
    searchBar.insertBefore(searchText, searchBar.firstChild);
  },
  services: {
    /**
     * @desc Unbind event handlers added by shift nav that were preventing touch swipe
     */
    unbindScroll: function unbindScroll() {
      window.UC.poller([
        () => window.jQuery,
      ], () => {
        jQuery('.shiftnav-inner').unbind('touchmove touchstart touchend');
      });
    },


    /**
     * @desc Add 'other' links
     */
    addOtherLinks: function addOtherLinks() {
      const otherWrapper = document.querySelector('.ME141-other');
      for (let i = 0; i < Object.keys(otherLinks).length; i += 1) {
        const data = Object.entries(otherLinks)[i];
        const otherNavLink = document.createElement('li');
        otherNavLink.classList.add('ME141-navlink_other');
        otherNavLink.innerHTML = `<a href="${data[1].link}"><p>${data[1].name}</p><img class="ME141-icon" src="${data[1].icon}"/></a>`;
        otherWrapper.appendChild(otherNavLink);
      }
    },
    /**
     * @desc Add shop by links
     */
    addShopLinks: function addShopLinks() {
      const shopWrapper = document.querySelector('.ME141-shop');
      for (let i = 0; i < Object.keys(shopLinks).length; i += 1) {
        const data = Object.entries(shopLinks)[i];
        const shopNavLink = document.createElement('li');
        shopNavLink.classList.add('ME141-navlink_shop');
        if (data[1].navLink) {
          shopNavLink.setAttribute('data-target', data[1].navLink);
        }
        shopNavLink.innerHTML = `<a href="${data[1].link}"><p>${data[1].name}</p><img class="ME141-icon" src="${data[1].icon}"/></a>`;
        shopWrapper.appendChild(shopNavLink);
      }
    },
    /**
     * @desc Add all the sub nav links
     */
    addInnerLinks: function addInnerLinks() {
      const { settings } = Experiment;
      let brandLinksObj;
      if (settings.VARIATION === '1') {
        brandLinksObj = brandCategories;
      } else {
        brandLinksObj = brandCategoriesV2;
      }
      for (let i = 0; i < Object.keys(brandLinksObj).length; i += 1) {
        const data = Object.entries(brandLinksObj)[i];
        const key = data[0];
        const linksArr = data[1];
        const matching = document.querySelector(`.ME141-${key}`);
        linksArr.forEach((element) => {
          const brandLink = document.createElement('li');
          brandLink.classList.add('ME141-innerCat_link');
          brandLink.innerHTML = `<a href="${element.link}"><p>${element.name}</p><div class="ME141-icon"></div></a>`;
          matching.appendChild(brandLink);
          brandLink.querySelector('.ME141-icon').style.backgroundImage = `url("${element.icon}")`;
        });
      }
    },
    /**
     * @desc Add clothing 3rd nav
     */
    addClothingNav: function addClothingNav() {
      const clothingNav = document.createElement('div');
      clothingNav.classList.add('ME141-subnav_third');
      clothingNav.classList.add('ME141-subnav');
      clothingNav.innerHTML = '<div class="ME141-back">Back</div>';
      document.querySelector('.shiftnav-nav').appendChild(clothingNav);
      for (let i = 0; i < Object.keys(clothingLinks).length; i += 1) {
        const data = Object.entries(clothingLinks)[i];
        const clothingData = data[1];
        clothingData.forEach((element) => {
          const link = document.createElement('li');
          link.classList.add('ME141-innerClothing_link');
          link.innerHTML = `<a href="${element.link}"><p>${element.name}</p><div class="ME141-icon" src="${element.icon}"></div></a>`;
          clothingNav.appendChild(link);
          link.querySelector('.ME141-icon').style.backgroundImage = `url("${element.icon}")`;
        });
      }
      const clothingTrigger = document.querySelector('.ME141-categories .ME141-innerCat_link a');
      const clothingBack = document.querySelector('.ME141-subnav_third .ME141-back');
      clothingTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.ME141-subnav_third').classList.add('ME141-subnav_active');
      });
      clothingBack.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.ME141-subnav_third').classList.remove('ME141-subnav_active');
      });
    },
  },

  components: {
    /**
     * @desc Hide/Show clicked tabs
     */
    topTabs: function topTabs() {
      const navTab = document.querySelectorAll('.ME141-tab');
      for (let i = 0; i < navTab.length; i += 1) {
        navTab[i].addEventListener('click', (e) => {
          for (let j = 0; j < navTab.length; j += 1) {
            navTab[j].classList.remove('ME141-tab_active');
          }
          e.currentTarget.classList.add('ME141-tab_active');
          [].forEach.call(document.querySelectorAll('.ME141-links'), (item) => {
            item.classList.remove('ME141-tablinks_active');
          });
          const { id } = e.currentTarget;
          const matchingElm = document.querySelector(`.${id}`);
          matchingElm.classList.add('ME141-tablinks_active');
        });
      }
    },
    /**
     * @desc show sub menu
     */
    showSubMenu: function showSubMenu() {
      const innerLinks = document.querySelectorAll('.ME141-navlink_shop');
      [...innerLinks].forEach((element) => {
        if (element.hasAttribute('data-target')) {
          element.addEventListener('click', (e) => {
            e.preventDefault();
            [].forEach.call(document.querySelectorAll('.ME141-subnav'), (item) => {
              item.classList.remove('ME141-subnav_active');
            });
            const matchingClass = element.getAttribute('data-target');
            const matchingNav = document.querySelector(`.${matchingClass}`);
            matchingNav.classList.add('ME141-subnav_active');
          });
        }
      });
    },
    /**
     * @desc hide sub menu
     */
    hideSubMenu: function hideSubMenu() {
      const backButton = document.querySelectorAll('.ME141-back');
      [...backButton].forEach((element) => {
        element.addEventListener('click', () => {
          element.parentNode.classList.remove('ME141-subnav_active');
        });
      });
    },
  },
};

export default Experiment;
