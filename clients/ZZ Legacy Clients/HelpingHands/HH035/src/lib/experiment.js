import { setup } from './services';
import { events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';

const { ID } = settings;

const activate = () => {
  setup();

  if (document.documentElement.classList.contains('mobile')) {
    // wrap navbar and CTA into a div
    const stickyNav = document.createElement('div');
    const navBar = document.querySelector('#main-nav');
    const CTA = document.querySelector('#mobile-cta-block');
    stickyNav.classList.add(`${ID}_stickyNav`);
    navBar.insertAdjacentElement('beforebegin', stickyNav);
    stickyNav.appendChild(navBar);
    stickyNav.appendChild(CTA);

    // checks if 30-y image is there and apply a class
    const target = document.querySelector(`.${ID}_stickyNav .logo-block.logo-mobile`);
    const childrenNum = target.children.length;
    if (childrenNum > 1) {
      target.classList.add('anniversary');
    }

    // add events
    const eventTargets = ['#mobile-cta-block .col-xs-6 a', '.mobile-call-us-btn'];
    [].forEach.call(eventTargets, function (target) {
      document.querySelector(target).addEventListener('click', function (e) {
        const curtarget = e.target;
        if (curtarget.classList.contains('mobile-call-us-btn')) {
          events.send(settings.ID, 'User clicked', 'Call Us CTA');
        } else {
          events.send(settings.ID, 'User clicked', 'Find a Branch CTA');
        }
      });
    });
    // Get the header
    const header = document.querySelector(`.${ID}_stickyNav`);

    // Get the offset position of the navbar
    var sticky = header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function addStickyness() {
      if (window.pageYOffset > 135) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
    // When the user scrolls the page, execute myFunction 
    window.onscroll = function () {
      addStickyness()
    };
    // Add and remove a class to the stickyNah when
    // The hamburger menu gets clicked
    const hamburger = document.querySelector('.navbar-toggle');
    hamburger.addEventListener('click', function(){
      document.querySelector(`.${ID}_stickyNav`).classList.toggle('open');
    });
  } else if (window.innerWidth > 992) {
    // wrap navbar and CTA into a div
    const stickyNav = document.createElement('div');
    const topNav = document.querySelector('#top-nav').innerHTML;
    stickyNav.classList.add(`${ID}_stickyNav`);
    stickyNav.innerHTML = `
      <div class="container-fluid visible-lg visible-md ${ID}_stickyBar" id="top-nav" style="display:none">
        ${topNav}
      </div>
    `;
    document.body.insertAdjacentElement('afterbegin', stickyNav);
    document.querySelector(`.${ID}_stickyNav`).removeAttribute('style');
    // changes bootstrap classes to #top-nav children
    // adds a tooltip to the 3rd element to show opening times
    const elements = document.querySelector(`.${ID}_stickyNav .${ID}_stickyBar .row`).children;
    [].forEach.call(elements, function (curElement, i) {
      if (curElement.localName != 'style') {
        switch (i) {
          case 1:
            curElement.classList.remove('col-md-3');
            curElement.classList.add('col-md-4');
            break;
          case 2:
            curElement.classList.remove('col-lg-3');
            curElement.classList.remove('col-md-3');
            curElement.classList.add('col-lg-4');
            curElement.classList.add('col-md-5');
            break;
          case 3:
            const target = curElement.querySelector(`.${ID}_stickyBar .contact .col-xs-12:last-child p`);
            const timeTooltip = document.createElement('span');
            timeTooltip.classList.add(`${ID}_timeTooltip`);
            timeTooltip.innerHTML = 'Open <strong>Mon - Fri:</strong> 8am - 7pm<br> <strong>Sat & Sun:</strong> 9am - 5:30pm';
            target.classList.add(`${ID}_timeTooltipWrap`);
            target.innerHTML = `
              <input type="checkbox" name="tooltipTrigger" id="tooltipTrigger">
              <label for="tooltipTrigger" class="${ID}_timeTooltip__label">View opening hours</label>
            `;
            target.insertAdjacentElement('beforeend', timeTooltip);
            break;
          case 4:
            curElement.setAttribute('style', 'display:none');
            break;
          default:
            break;
        }
      }
    });
    // Get the header
    const header = document.querySelector(`.${ID}_stickyNav`);
    const logoBlock = document.querySelector('.col-lg-4.logo-block');
    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function addStickyness() {
      if (window.pageYOffset > 200) {
        header.classList.add("sticky");
        logoBlock.classList.remove('col-lg-4');
        logoBlock.classList.remove('col-md-4');
        logoBlock.classList.add('col-lg-6');
        logoBlock.classList.add('col-md-5');
      } else {
        header.classList.remove("sticky");
        logoBlock.classList.remove('col-lg-6');
        logoBlock.classList.remove('col-md-5');
        logoBlock.classList.add('col-lg-4');
        logoBlock.classList.add('col-md-4');
      }
    }

    // When the user scrolls the page, execute myFunction 
    window.onscroll = function () {
      addStickyness()
    };
  }

  // If on branch page, update phone numbers in the header to match those for the branch
  pollerLite([
    // Wait for Infinity Number API to be available
    () => {
      try {
        return typeof window._ictt.push === 'function';
      } catch(e) {}
    },
    () => {
      try {
        return window._ictt.hasIntegrationsRun;
      } catch(e) {}
    },
    () => {
      try {
        return document.querySelectorAll('.branch-details .InfinityNumber').length >= 2;
      } catch (e) {}
    }
  ], () => {
    // Add a callback which will run when the Infinity Numbers
    // have loaded in (or immediately if they already exist)
    window._ictt.push(['_addCallback', () => {
      /**
       * Replace a number element with a new number
       * @param {HTMLElement} element Element containing old number
       * @param {string} number New number
       */
      const replaceNumber = (element, number) => {
        element.classList.remove('infinityNumber');
        element.href = `tel:${number.replace(/\s/g, '')}`;
        element.innerText = number;
      };

      const branchDetails = document.querySelector('.branch-details');
      const branchNumbers = [].map.call(branchDetails.querySelectorAll('.InfinityNumber'), el => el.innerText.trim());
      const [branchCareNumber, branchJobNumber] = branchNumbers;
      const header = document.querySelector(`.${ID}_stickyNav`);
      const headerNumberEls = header.querySelectorAll('a.InfinityNumber');
      const [headerCareNumberEl, headerJobNumberEl] = headerNumberEls;

      // Replace care number
      replaceNumber(headerCareNumberEl, branchCareNumber);

      // Replace job number
      replaceNumber(headerJobNumberEl, branchJobNumber);

      // Replace numbers on original desktop header
      const staticDesktopHeader = document.querySelector('body > #top-nav');
      if (staticDesktopHeader) {
        const staticDesktopHeaderNumberEls = staticDesktopHeader.querySelectorAll('a.InfinityNumber');
        const [staticDesktopHeaderCareNumberEl, staticDesktopHeaderJobNumberEl] = staticDesktopHeaderNumberEls;
        replaceNumber(staticDesktopHeaderCareNumberEl, branchCareNumber);
        replaceNumber(staticDesktopHeaderJobNumberEl, branchJobNumber);
      }
    }]);
  });
};


export default activate;
