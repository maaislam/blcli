import { setup } from './services';
import { scrollTo, events } from '../../../../../lib/utils';
import settings from './settings';

/**
 * {{HH015}} - {{on page navigation improvements}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      // Render location for mobile and desktop
      const renderLocationDM = docVar.getElementById('intro');
      // Render location for table
      const renderLocationT = bodyVar.querySelector('#content > .row');
      const allHeaders = bodyVar.querySelectorAll('.col-xs-12 h2');
      const subNav = bodyVar.querySelector('.sub-nav');
      const subNavParent = bodyVar.querySelector('#sidebar > .row');
      const contentContainer = docVar.getElementById('main');
      // Reassigned when markup has rendered
      let HH015SideNav;
      let HH015NavigationHeader;
      // Used to track device for event handlers
      let currentDevice;
      return {
        docVar,
        bodyVar,
        renderLocationDM,
        allHeaders,
        subNav,
        subNavParent,
        renderLocationT,
        contentContainer,
        HH015SideNav,
        currentDevice,
        HH015NavigationHeader,
      };
    })(),
    init: () => {
      setup();
      Exp.render.initialRender();
      Exp.bindExperimentEvents.handleScroll();
      Exp.bindExperimentEvents.handleNavClick();
      Exp.bindExperimentEvents.handleResize();
    },
    services: {
      handleReRender: () => {
        // Initial Render - Desktop start: 992, Mobile end: 768
        if (window.innerWidth <= 767) {
          // Render mobile
          Exp.render.subNavigation(Exp.cache.renderLocationDM, 'afterbegin');
          Exp.render.contentsTable(Exp.cache.renderLocationDM);
          // Slide up navigation
          $(Exp.cache.subNav).slideUp();
          // Add class
          Exp.cache.bodyVar.querySelector('.HH015_Navigation_Header').classList.add('HH015_Nav_Closed');
          Exp.cache.currentDevice = 'M';
        } else if (window.innerWidth > 767 && window.innerWidth < 992) {
          // Render tablet
          Exp.render.contentsTable(Exp.cache.renderLocationT);
          Exp.render.subNavigation(Exp.cache.renderLocationDM, 'afterend');
          Exp.cache.currentDevice = 'T';
        } else {
          Exp.render.contentsTable(Exp.cache.renderLocationDM);
          Exp.render.subNavigation(Exp.cache.subNavParent, 'beforebegin');
          Exp.cache.currentDevice = 'D';
        }
      },
    },
    render: {
      initialRender: () => {
        // Insert container and header for navigation
        Exp.cache.subNav.insertAdjacentHTML('beforebegin', `
          <div class="HH015_Side_Navigation_Container">
            <div class="HH015_Navigation_Header_Container">
              <h2 class="HH015_Navigation_Header">Navigation</h2>
            </div>
          </div>
        `);
        // Move subnav to above container to keep content toegther
        Exp.cache.HH015SideNav = Exp.cache.bodyVar.querySelector('.HH015_Side_Navigation_Container');
        Exp.cache.HH015SideNav.insertAdjacentElement('beforeend', Exp.cache.subNav);
        Exp.services.handleReRender();
        Exp.cache.HH015NavigationHeader = Exp.cache.bodyVar.querySelector('.HH015_Navigation_Header');
      },
      contentsTable: (renderLocation) => {
        let markup = '';
        for (let i = 0, n = Exp.cache.allHeaders.length; i < n; i += 1) {
          // Add an attribute to keep element in sync with nodelist
          markup += `<div class="HH015_Content_Item" data-hh015-number="${i}">${Exp.cache.allHeaders[i].textContent}</div>`;
        }
        renderLocation.insertAdjacentHTML('afterbegin', `
          <div class="HH015_Contents_Table_Container">
            <h2 class="HH015_Contents_Table_Header">On this page</h2>
            <div class="HH015_Contents_Table">
              ${markup}
            </div>
          </div>
        `);
        // Bind event handler to contents table
        Exp.bindExperimentEvents.handleContentsTable();
      },
      subNavigation: (moveLocation, movePosition) => {
        // Move subnavigation
        moveLocation.insertAdjacentElement(movePosition, Exp.cache.HH015SideNav);
      },
    },
    bindExperimentEvents: {
      handleContentsTable: () => {
        Exp.cache.bodyVar.querySelector('.HH015_Contents_Table').addEventListener('click', (e) => {
          // Scroll if table item is clicked
          if (e.target.classList.contains('HH015_Content_Item')) {
            // Send event
            events.send(`${settings.ID}`, 'Clicked', 'On this page link', { sendOnce: true });
            // retrieve element to scroll to
            const scrollElement = Exp.cache.allHeaders[parseInt(e.target.getAttribute('data-hh015-number'), 10)].getBoundingClientRect();
            // Next line exceeds length
            // eslint-disable-next-line
            const scrollCompensation = window.pageYOffset || Exp.cache.docVar.documentElement.scrollTop;
            const scrollLocation = scrollElement.top + scrollCompensation;
            scrollTo(scrollLocation, 3000);
          }
        });
      },
      // Adds a scroll function to the window, toggles styling class to make side navigation sticky
      handleScroll: () => {
        window.addEventListener('scroll', () => {
          // If the subnav parent's top is out of the window (negative value) add sticky class
          const subNavTop = Exp.cache.subNav.getBoundingClientRect();
          if (subNavTop.top < 0) {
            Exp.cache.contentContainer.classList.add('HH015_Sticky');
          } else {
            Exp.cache.contentContainer.classList.remove('HH015_Sticky');
          }
        });
      },
      handleNavClick: () => {
        // call relavent function based on device type
        // Scroll to the top of the side navigation
        const pageContentTop = Exp.cache.docVar.getElementById('content');
        Exp.cache.bodyVar.querySelector('.HH015_Navigation_Header_Container').addEventListener('click', () => {
          // Send event
          events.send(`${settings.ID}`, 'Clicked', 'On page navigation', { sendOnce: true });
          // If on mobile, toggle navigation reveal, otherwise scroll to the navigation area
          if (Exp.cache.currentDevice === 'M') {
            $(Exp.cache.subNav).slideToggle();
            Exp.cache.bodyVar.querySelector('.HH015_Navigation_Header').classList.toggle('HH015_Nav_Closed');
          } else {
            scrollTo(pageContentTop.offsetTop, 3000);
          }
        });
      },
      handleResize: () => {
        // for tablets that have a desktop view on rotate, re-render content
        window.addEventListener('resize', () => {
          // remove markup, reset styling
          Exp.cache.bodyVar.querySelector('.HH015_Navigation_Header').classList.toggle('HH015_Nav_Closed');
          $(Exp.cache.subNav).slideDown();
          Exp.cache.bodyVar.querySelector('.HH015_Contents_Table_Container').remove();
          Exp.services.handleReRender();
        });
      },
    },
  };

  Exp.init();
};

export default Run;
