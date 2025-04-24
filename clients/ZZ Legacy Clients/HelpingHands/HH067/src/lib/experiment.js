/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import shared from './shared';

// Fallback additional links (particularly for child pages).
const fallbackLinks = [
  {
    label: 'Home Care in branch_name',
    url: 'https://www.helpinghandshomecare.co.uk/home-care-services/',
  },

  {
    label: 'Dementia Care',
    url: 'https://www.helpinghandshomecare.co.uk/home-care-services/dementia-care/',
  },

  {
    label: 'Domiciliary Care',
    url: 'https://www.helpinghandshomecare.co.uk/home-care-services/domiciliary-care/',
  },

  {
    label: 'Elderly Care',
    url: 'https://www.helpinghandshomecare.co.uk/home-care-services/elderly-care/',
  },

  {
    label: 'Respite Care',
    url: 'https://www.helpinghandshomecare.co.uk/home-care-services/respite-care/',
  },
];

export default () => {
  setup();
  const { ID } = shared;
  fireEvent('Conditions Met');
  const isBranchPage = () => {
    return window.location.pathname.indexOf('/our-locations/') !== -1 && document.body.classList.contains('single');
  };

  const isOutOfHours = () => {
    return !!document.querySelector('.inactive-care');
  };

  const updateBranchData = () => {
    // Phone & URL.
    var reviewsData = null;

    const branchUrl = window.location.pathname;
    let phone = document.querySelector('.branch-call-num .InfinityNumber');
    if (!phone) {
      // Oxfordshire has a different layout
      phone = document.querySelector('.branch-details .InfinityNumber');
    }

    if (phone) phone = phone.textContent.trim();
    else {
      // Fallback
      phone = '0333 060 5358';
    }

    // Reviews count, Rating, Reviews url.
    const branchPanel = document.querySelector('.reviews-box');
    if (branchPanel) {
      const starsList = branchPanel.querySelector('.branch-star-list');
      const branchReviews = branchPanel.querySelector('.branch-review-average');
      const viewAll = branchPanel.querySelector('.viewall');

      reviewsData = {
        stars: starsList ? starsList.outerHTML : null,
        rating: branchReviews ? branchReviews.childNodes[0].nodeValue.trim().replace('stars,', '') : null,
        total: branchReviews ? branchReviews.childNodes[1].textContent.trim() : null,
        reviewsUrl: viewAll ? viewAll.href : null,
      };
    }

    // Additional links: section class="branch-subpage-care subpage-elements-5"
    const additional = document.querySelector('.branch-subpage-care');
    const additionalList = additional ? additional.querySelectorAll('.row a') : false;

    let additionalLinks = fallbackLinks; // Default links.
    let branchTitle = document.querySelector('h1');
    if (branchTitle) branchTitle = branchTitle.textContent;

    if (additional && additionalList && additionalList.length > 4) {
      // Loop through anchors and get the label and url for each link.
      additionalLinks = [];
      additionalList.forEach((anchor) => {
        additionalLinks.push({
          label: anchor.textContent.trim(),
          url: anchor.href,
        });
      });
    } else if (branchTitle) {
      // set the branch name in the first fallback link to this page's title.
      const newLabel = additionalLinks[0].label.replace('branch_name', branchTitle);
      additionalLinks[0].label = newLabel;
    }

    // update session storage.
    localStorage.setItem(
      `${ID}_branch`,
      JSON.stringify({
        branchUrl,
        phone,
        branchTitle,
        reviewsData,
        additionalLinks,
      })
    );
  };

  const getBranchData = () => {
    return localStorage.getItem(`${ID}_branch`);
  };

  const makeInfinityNumber = () => {
    // Add our new panels to the infinity tracked numbers list.
    // This uses the Infinity API for proper number updates.
    let infinityTrackingAdded = false;

    const infinityCheckInterval = setInterval(() => {
      // Check whether Infinity has been loaded in
      if (window._ictt && !infinityTrackingAdded) {
        // Add the main menu number and our panel to the auto discover numbers list.
        window._ictt.push(['_setAutoDiscoveryClasses', ['InfinityNumber']]);

        // Trigger a fresh update of the numbers.
        window._ictt.push(['_allocate']);

        // Stop this from running again.
        infinityTrackingAdded = true;
        clearInterval(infinityCheckInterval);
      }
    }, 1000);
  };

  const makePanelMarkup = (data) => {
    // Parent branch layout - has reviews.
    if (data.reviewsData) {
      return `
        <div class="${ID}_location">
          <p>
            <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.2903 9.48905C19.2903 14.7297 9.64516 26 9.64516 26C9.64516 26 0 14.7297 0 9.48905C0 4.24839 4.31829 0 9.64516 0C14.972 0 19.2903 4.24839 19.2903 9.48905Z" fill="white"/>
              <circle cx="9.64504" cy="8.80645" r="3.77419" fill="#3C185B"/>
            </svg>
            Your local branch is <a class="${ID}_track-branch-link" href="${data.branchUrl}"><strong>${data.branchTitle}</strong></a> <a class="${ID}_underline ${ID}_track-change" href="/our-locations/">(change)</a>
          </p>
        </div>
        <div class="${ID}_flex">
          <div class="${ID}_flex ${ID}_wrap ${ID}_center">
            ${data.reviewsData.stars}
            <p class="${ID}_rating"><strong>${data.reviewsData.rating}</strong></p>
            <a class="${ID}_underline ${ID}_track-total" href="${data.reviewsData.reviewsUrl}">${data.reviewsData.total}</a>
          </div>
          <div class="cta-button">
            <span class="cta-button-icon">
              <i class="fa fa-phone"></i>
            </span>
            <a class="InfinityNumber" href="tel:${data.phone}">${data.phone}</a>
          </div>
          <i class="fa fa-info cta-button-info">
            <div class="cta-button-tooltip">
              Open Mon – Fri: 8am–7pm <br>
              Sat &amp; Sun: 9am–6pm
            </div>
          </i>
        </div>
      `;
    }

    // Child branch layout - no reviews.
    return `
      <div class="${ID}_flex">
        <div class="${ID}_location ${ID}_marginRight">
          <div class="${ID}_flex">
            <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.2903 9.48905C19.2903 14.7297 9.64516 26 9.64516 26C9.64516 26 0 14.7297 0 9.48905C0 4.24839 4.31829 0 9.64516 0C14.972 0 19.2903 4.24839 19.2903 9.48905Z" fill="white"/>
              <circle cx="9.64504" cy="8.80645" r="3.77419" fill="#3C185B"/>
            </svg>
            <div>
              <p>
                Your local branch is
              </p>
              <a class="${ID}_track-branch-link" href="${data.branchUrl}"><strong>${data.branchTitle}</strong></a> <a class="${ID}_underline ${ID}_track-change" href="/our-locations/">(change)</a>
            </div>
          </div>
        </div>
        <div class="cta-button">
          <span class="cta-button-icon">
            <i class="fa fa-phone"></i>
          </span>
          <a class="InfinityNumber" href="tel:${data.phone}">${data.phone}</a>
        </div>
        <i class="fa fa-info cta-button-info">
          <div class="cta-button-tooltip">
            Open Mon – Fri: 8am–7pm <br>
            Sat &amp; Sun: 9am–6pm
          </div>
        </i>
      </div>
    `;
  };

  const addMenuDropdown = (data) => {
    const menu = document.getElementById('menu-main-nav-1');
    menu.insertAdjacentHTML(
      'afterbegin',
      `
        <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children dropdown ${ID}_menu-item"><a title="Your branch" href="${
        data.additionalLinks[0].url
      }" class="dropdown-toggle" aria-haspopup="true">Your branch <span class="caret"></span></a>
          <ul role="menu" class=" dropdown-menu">
            <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" class="menu-item menu-item-type-post_type menu-item-object-page">
              <a class="${ID}_track-branch-nav" title="Visit ${data.branchTitle} branch page" href="${
        data.branchUrl
      }">Visit <strong>${data.branchTitle}</strong> branch page</a>
            </li>
            ${data.additionalLinks
              .map((link) => {
                return `
                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" class="menu-item menu-item-type-post_type menu-item-object-page">
                  <a class="${ID}_track-additional" title="${link.label}" href="${link.url}">${link.label}</a>
                </li>
              `;
              })
              .join('')}
          </ul>
        </li>
      `
    );
  };

  const updateDefaultNumber = (phone) => {
    if (!phone) return;
    // Update number in the default mobile view.
    const defaultCta = document.querySelector('.menu-item-care .InfinityNumber');
    if (defaultCta) {
      defaultCta.insertAdjacentHTML(
        'afterend',
        `
          <a class="InfinityNumber" href="tel:${phone}">${phone}</a>
        `
      );
      defaultCta.remove();
    }
  };

  const addMobileBranchSlideout = (data) => {
    // Add hidden slideout element.
    const slideout = document.createElement('div');
    document.body.insertAdjacentElement('beforeend', slideout);
    slideout.classList.add(`${ID}_slideout`);
    slideout.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="${ID}_slideout-overlay"></div>
      <div class="${ID}_slideout-content">
        <div class="${ID}_slideout-close">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5.66071 5.5M10.3214 10L5.66071 5.5M5.66071 5.5L10.3214 1L1 10" stroke="white"/>
          </svg>
        </div>
        <div class="${ID}_slideout-top">
          <p>Your local branch is <a class="${ID}_slideout-branch" href="${data.branchUrl}">
          <strong>${data.branchTitle}</strong>
          </a> <a class="${ID}_underline ${ID}_track-change" href="/our-locations/">(change)</a></p>
          ${
            data.reviewsData
              ? `
                <div class="${ID}_flex ${ID}_center">
                  ${data.reviewsData.stars}
                  <p class="${ID}_rating"><strong>${data.reviewsData.rating}</strong></p>
                  <a class="${ID}_underline ${ID}_track-total" href="${data.reviewsData.reviewsUrl}">${data.reviewsData.total}</a>
                </div>
                `
              : ''
          }
          ${
            isOutOfHours()
              ? `
              <div class="${ID}_slideout-outofhours">
                <img src="https://cdn-sitegainer.com/1kt8zdrpqymsmob.png" />
                <p>Our phone lines are currently closed but if you request a callback, we will get back to you.</p>
              </div>
              <div class="cta-button">
                <a class="InfinityNumber" href="/about-us/contact-us/request-a-callback/">
                  Request a callback
                </a>
              </div>
              `
              : `
              <div class="cta-button">
                <span class="cta-button-icon">
                  <i class="fa fa-phone"></i>
                </span>
                <a class="InfinityNumber" href="tel:${data.phone}">${data.phone}</a>
              </div>
            `
          }
          <a class="${ID}_slideout-btn-white ${ID}_track-mobile-branch-cta" href="${data.branchUrl}">
            View branch page
          </a>
        </div>
        <div class="${ID}_slideout-bottom">
          <p>Looking for more specific information?</p>
          <div class="${ID}_slideout-links">
            ${data.additionalLinks
              .map((link) => {
                return `
                  <a class="${ID}_track-additional" title="${link.label}" href="${link.url}">
                    <span>${link.label}</span>
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5.16667 5.81481L1 11" stroke="#3C185B" stroke-width="2"/>
                    </svg>
                  </a>
              `;
              })
              .join('')}
          </div>
        </div>
      </div>
    `
    );

    const menuItem = document.querySelector('.find-local a');
    if (menuItem) {
      menuItem.removeAttribute('href');
      menuItem.addEventListener('click', (e) => {
        e.preventDefault();

        // Show slideout
        slideout.classList.add(`${ID}_slideout-open`);
        document.body.classList.add(`${ID}_noscroll`);

        // Track
        fireEvent('Open - side panel mobile');

        return false;
      });
    }

    // Close.
    const closeBtn = document.querySelector(`.${ID}_slideout-close`);
    const overlay = slideout.querySelector(`.${ID}_slideout-overlay`);
    const closeSlideout = () => {
      slideout.classList.remove(`${ID}_slideout-open`);
      document.body.classList.remove(`${ID}_noscroll`);
      fireEvent('Close - side panel mobile');
    };
    if (closeBtn) {
      closeBtn.addEventListener('click', closeSlideout);
    }
    if (overlay) {
      overlay.addEventListener('click', closeSlideout);
    }
  };

  const addTracking = () => {
    // 'change location'
    const trackChange = document.querySelector(`.${ID}_track-change`);
    if (trackChange) {
      trackChange.addEventListener('click', () => {
        fireEvent('Click - change branch');
      });
    }
    // Total reviews
    const trackTotal = document.querySelector(`.${ID}_track-total`);
    if (trackTotal) {
      trackTotal.addEventListener('click', () => {
        fireEvent('Click - reviews page');
      });
    }
    // Mobile CTA view branch page
    const trackBranchCta = document.querySelector(`.${ID}_track-mobile-branch-cta`);
    if (trackBranchCta) {
      trackBranchCta.addEventListener('click', () => {
        fireEvent('Click - branch page mobile cta');
      });
    }
    const trackBranchLink = document.querySelector(`.${ID}_track-branch-link`);
    if (trackBranchLink) {
      trackBranchLink.addEventListener('click', () => {
        fireEvent('Click - branch page desktop link');
      });
    }

    const trackBranchNav = document.querySelector(`.${ID}_track-branch-nav`);
    if (trackBranchNav) {
      trackBranchNav.addEventListener('click', () => {
        fireEvent('Click - branch page nav link');
      });
    }
    const trackAdditional = document.querySelector(`.${ID}_track-additional`);
    if (trackAdditional) {
      trackAdditional.addEventListener('click', () => {
        fireEvent('Click - additional subpage');
      });
    }
  };

  const updateHeader = () => {
    // Branch data
    let data = getBranchData();
    if (!data) return;
    data = JSON.parse(data);

    // Prevent duplicate.
    if (document.querySelector(`.${ID}_wrapper`)) return;

    // Get menu items.
    const menu = document.querySelector('.menu-top');
    const menuNumber = menu.querySelector('.menu-item-care');

    // mark active to hide control.
    document.body.classList.add(`${ID}-active`);

    // Add our new menu block.
    const wrapper = document.createElement('div');
    wrapper.classList.add(`${ID}_wrapper`);
    if (isOutOfHours()) wrapper.classList.add(`${ID}_afterHours`);
    menuNumber.insertAdjacentElement('afterend', wrapper);

    // Fill block with branch information.

    wrapper.insertAdjacentHTML('afterbegin', makePanelMarkup(data));

    // Add menu dropdown item.
    addMenuDropdown(data);

    // Update default phone in header.
    updateDefaultNumber(data.phone);

    // Change find branch link to open a slideout on mobiles.
    addMobileBranchSlideout(data);

    // Run Infinity number generator.
    makeInfinityNumber();

    // Add tracking.
    addTracking();
  };

  const init = () => {
    if (isBranchPage()) {
      updateBranchData();
    }

    updateHeader();
  };

  // Run experiment.
  init();
};
