/** * HH044 - Mobile Call CTA Update
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/utils';

/**
 * Number parse from ld+json
 */
const getNumberFromStructuredData = () => {
  let result = false;
  document.querySelectorAll('[type="application/ld+json"]').forEach((s) => {
    if(s && s.innerText.trim()) {
      const json = JSON.parse(s.innerText.trim());
      if(json && json['@type'] == 'LocalBusiness' && json.telephone) {
        result = json.telephone;
      }
    }
  });
  return result;
};

/**
 * Parse location info from page
 *
 * @return {Promise}
 */
const saveLocationInfo = () => {
  return new Promise((res, rej) => {
    pollerLite([
      '#hero h1',
      '.branch-details .phone_ctp .InfinityNumber',
      () => !!getNumberFromStructuredData(),
    ], () => {
      const url = window.location.pathname.match(/\/$/) ? window.location.pathname : window.location.pathname + '/';
      const branchName = document.querySelector('#hero h1').innerText.trim();
      const phoneNumber = getNumberFromStructuredData();

      if(url && branchName && phoneNumber) {
      
        const infoObject = { url, branchName, phoneNumber };

        localStorage.setItem(shared.LOCATIONS_KEY, JSON.stringify(infoObject));

        res();
      }
    });
  });
};

/**
 * Parse location info
 */
const parseLocationInfo = () => {
  const savedString = localStorage.getItem(shared.LOCATIONS_KEY);

  let result = false;
  if(savedString) {
    result = JSON.parse(savedString);
  }

  return result;
};

/**
 * Helper mobile header
 */
const rebuildMobileHeader = (info) => {
  document.body.classList.add(`${shared.ID}-mobile-mode`);

  const navbarBrand = document.querySelector('.navbar-header .navbar-brand');
  if(navbarBrand) {
    navbarBrand.insertAdjacentHTML('afterend', `
      <div class="${shared.ID}-branch-box">
        <p class="xlead">Your branch:</p>
        <p class="xbranch">
          <a href="${info.url}">
            <strong>${info.branchName.length > 14 ? (info.branchName.substring(0,14) + '..') : info.branchName}</strong>
          </a>
        </p>
        <p class="xlink"><a href="/our-locations/">Change</a></p>
      </div>
    `);
  }

  // Burger menu amends
  const menuWrapper = document.querySelector('#main-nav .menu-wrapper');
  if(menuWrapper) {
    menuWrapper.insertAdjacentHTML('afterbegin', `
      <div class="${shared.ID}-numbox">
        <div class="${shared.ID}-numbox__num">
          <p class="${shared.ID}-numbox__numrow"><a class="InfinityNumber" data-ict-discovery-number="${info.phoneNumber}"
            >${info.phoneNumber}</a></p>
          <p class="${shared.ID}-numbox__hours">
            Mon - Fri: 8am-7pm
          </p>
          <p class="${shared.ID}-numbox__hours">
            Sat - Sun: 9am-6pm
          </p>
        </div>
        <div class="${shared.ID}-numbox__btn">
          <a class="" href="/about-us/contact-us/request-a-callback/">Request a Callback</a>
        </div>
      </div>
      <ul class="${shared.ID}-branchlinks">
        <li 
          itemscope="itemscope" 
          itemtype="https://www.schema.org/SiteNavigationElement" 
          class="${shared.ID}-view-branch menu-item menu-item-type-post_type menu-item-object-page"
        ><a 
          title="View Branch" 
          href="${info.url}"
          >View Branch</a>
        </li>

        <!--
        <li 
          itemscope="itemscope" 
          itemtype="https://www.schema.org/SiteNavigationElement" 
          class="menu-item menu-item-type-post_type menu-item-object-page"
        ><a 
          title="Types of Care" 
          href="${info.url}#typesofcare"
          >Types of Care</a>
        </li>

        <li 
          itemscope="itemscope" 
          itemtype="https://www.schema.org/SiteNavigationElement" 
          class="menu-item menu-item-type-post_type menu-item-object-page"
        ><a 
          title="Cost of Care" 
          href="${info.url}#costofcare"
          >Cost of Care</a>
        </li>

        <li 
          itemscope="itemscope" 
          itemtype="https://www.schema.org/SiteNavigationElement" 
          class="menu-item menu-item-type-post_type menu-item-object-page"
        ><a 
          title="Our Carers" 
          href="${info.url}#ourcarers"
          >Our Carers</a>
        </li>

        <li 
          itemscope="itemscope" 
          itemtype="https://www.schema.org/SiteNavigationElement" 
          class="menu-item menu-item-type-post_type menu-item-object-page"
        ><a 
          title="Reviews" 
          href="${info.url}#reviews"
          >Reviews</a>
        </li>
        -->
      </ul>
    `);
  }
};

/**
 * Helper modify nav
 */
const modifyTopNav = (topNav, info) => {
  if(topNav) {
    // Modify Number
    const smallCol = topNav.querySelector('.col-lg-2');
    if(smallCol) {
      const midCol = smallCol.previousElementSibling;

      midCol.insertAdjacentElement('beforebegin', smallCol);

      smallCol.innerHTML = `
        <div class="${shared.ID}-numbox row">
          <div class="col-xs-12">
            <div class="${shared.ID}-numbox__branch">
              <p>Your branch:</p>
              <p><a class="${shared.ID}-numbox__branch-name" href="${info.url}">${info.branchName}</a></p>
              <p><a href="/our-locations/">Change</a></p>
            </div>
            <div class="${shared.ID}-numbox__num">
              <a class="${shared.ID}-infinity InfinityNumber" data-ict-discovery-number="${info.phoneNumber}">${info.phoneNumber}</a>
              <span data-html="true" data-toggle="tooltip" 
                data-placement="bottom"
                title="<div><span>Phone lines open</span>Mon - Fri: 8am-7pm<br>Sat - Sun: 9am-6pm</div>" 
                class="${shared.ID}-numbox__info glyphicon glyphicon-info-sign"></span>
            </div>
          </div>
        </div>
      `;
    }

    window['j' + ''.trim() + 'Query']('[data-toggle="tooltip"]').tooltip();
  }
};

/**
 * Helper desktop header
 */
const rebuildDesktopHeader = (info) => {
  document.body.classList.add(`${shared.ID}-desktop-mode`);

  const topNav = document.querySelector('#top-nav:not(.HH035_stickyBar)');
  const topNav2 = document.querySelector('#top-nav.HH035_stickyBar');

  modifyTopNav(topNav, info);
  modifyTopNav(topNav2, info);


  // Add new menu item
  const mainMenu = document.querySelector('#menu-main-nav');
  if(mainMenu) {
    mainMenu.insertAdjacentHTML('afterbegin', `
      <li 
        itemscope="itemscope" 
        itemtype="https://www.schema.org/SiteNavigationElement" 
        id="menu-item-840x" 
        class="${shared.ID}-branch-item menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children dropdown"
      >
        <a title="" 
          href="${info.url}" 
          class="dropdown-toggle" 
          aria-haspopup="true"
        ><span class="xwrap">${info.branchName} <span class="caret"></span></span><span class="glyphicon glyphicon-map-marker"></span></a>

        <!-- Submenu -->
        <ul role="menu" class=" dropdown-menu">

          <li 
            itemscope="itemscope" 
            itemtype="https://www.schema.org/SiteNavigationElement" 
            class="menu-item menu-item-type-post_type menu-item-object-page"
          ><a 
            title="View Branch" 
            href="${info.url}"
            >View Branch</a>
          </li>

          <li 
            itemscope="itemscope" 
            itemtype="https://www.schema.org/SiteNavigationElement" 
            class="menu-item menu-item-type-post_type menu-item-object-page"
          ><a 
            title="Types of Care" 
            href="${info.url}#typesofcare"
            >Types of Care</a>
          </li>

          <li 
            itemscope="itemscope" 
            itemtype="https://www.schema.org/SiteNavigationElement" 
            class="menu-item menu-item-type-post_type menu-item-object-page"
          ><a 
            title="Cost of Care" 
            href="${info.url}#costofcare"
            >Cost of Care</a>
          </li>

          <li 
            itemscope="itemscope" 
            itemtype="https://www.schema.org/SiteNavigationElement" 
            class="menu-item menu-item-type-post_type menu-item-object-page"
          ><a 
            title="Our Carers" 
            href="${info.url}#ourcarers"
            >Our Carers</a>
          </li>

          <li 
            itemscope="itemscope" 
            itemtype="https://www.schema.org/SiteNavigationElement" 
            class="menu-item menu-item-type-post_type menu-item-object-page"
          ><a 
            title="Reviews" 
            href="${info.url}#reviews"
            >Reviews</a>
          </li>

        </ul>
      </li>
    `);
  }
};

/**
 * Rebuild header helper
 */
const rebuildHeader = () => {
  const info = parseLocationInfo();
  if(info) {
    // Modify header
    setup();

    if(window.innerWidth <= shared.RESPONSIVE_BREAKPOINT) {
      rebuildMobileHeader(info);
    } else {
      rebuildDesktopHeader(info);

      // Now re-run the infinity number generation
      // @todo
    }

    window._ictt.push(['_allocate', () => {}]);
  }

  // Workaround orientation change
  window.addEventListener('orientationchange', () => window.location.reload());
};

/**
 * Entry point for experiment
 */
export default () => {
  // Run the our-locations checking
  if(window.location.pathname.match(shared.LOCATIONS_PAGE_REGEX)) {
    saveLocationInfo().then(() => rebuildHeader());
  } else {
    rebuildHeader();
  }

};
