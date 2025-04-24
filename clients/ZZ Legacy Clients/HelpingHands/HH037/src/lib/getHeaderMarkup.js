import shared from './shared';

/**
 * Returns the markup for the new header component based
 * on the profile type
 * @param {string|Number} profileType
 * @param {string} componentName
 * @returns {string}
 */
export default (profileType, componentName) => {
  const { userProfile } = shared;
  const infinityNumbersMarkup = {
    care: `<a data-tracked="true" id="${componentName}_careNumber" class="phone-number InfinityNumber" href="tel:03300376958" data-ict-discovery-number="03300376958" data-number-type="care">03300376958</a>`,
    job: `<a data-tracked="true" id="${componentName}_jobNumber" class="phone-number InfinityNumber" href="tel:03331224269" data-ict-discovery-number="03331224269" data-number-type="job">03331224269</a>`,
  };
  const getDesktopMarkup = {
    /**
     * @param {string} classes Custom classes for container
     * @returns {string}
     */
    logo(classes) {
      return `
        <div class="logo-block ${classes || ''}">
          <a href="/">
            <img src="/wp-content/themes/helpinghands-bbchild/images/logo-large.png" alt="Logo" class="logo-large img-responsive">
            <img src="/wp-content/themes/helpinghands-bbchild/images/logo.png" alt="Logo" class="logo-medium img-responsive">
            <img src="/wp-content/themes/helpinghands-bbchild/images/logo-30yrs.png" alt="Logo" class="logo-30yrs">
          </a>
        </div>
      `;
    },

    /**
     * @param {string} classes Custom classes for container
     * @returns {string}
     */
    carePhoneNumber(classes) {
      return `
        <div class="text-center contact ${classes || ''}">
          <div class="row">
            <div class="col-xs-12">
              <p>Looking for <b class="care-highlight">care?</b></p>
            </div>
            <div class="col-xs-12">
              ${infinityNumbersMarkup.care}
            </div>
            <div class="col-xs-12">
              <p class="${componentName}_openingTimesWrap">
                <input type="checkbox" name="${componentName}_tooltipTrigger" id="${componentName}_tooltipTrigger">
                <label for="${componentName}_tooltipTrigger" class="${componentName}_openingTimesLabel">View opening hours</label>
                <span class="${componentName}_openingTimes">Open <strong>Mon - Fri:</strong> 8am - 7pm<br> <strong>Sat &amp; Sun:</strong> 9am - 5:30pm</span>
              </p>
            </div>
          </div>
        </div>
      `;
    },

    /**
     * @param {string} classes Custom classes for container
     * @returns {string}
     */
    jobPhoneNumber(classes) {
      return `
        <div class="text-center contact ${classes || ''}">
          <div class="row">
            <div class="col-xs-12">
              <p>Looking for a <b class="job-highlight">job?</b></p>
            </div>
            <div class="col-xs-12">
              ${infinityNumbersMarkup.job}
            </div>
            <div class="col-xs-12">
              <p> <small>Award-winning training</small></p>
            </div>
          </div>
        </div>
      `;
    },

    /**
     * @param {string} classes Custom classes for container
     * @param {Array.<string>} includedMenuItems List of each prop from menuItems to include
     * @returns {string}
     */
    menu(classes, includedMenuItems) {
      return `
        <div class="text-center ${classes || ''}">
          <ul class="menu">
            ${includedMenuItems.map(item => this.menuItems[item]() || '').join('')}
          </ul>
        </div>
      `;
    },

    menuItems: {
      findLocalBranch() {
        return `
          <li class="find-local menu-item">
            <a data-tracked="true" id="${componentName}_findBranch" href="/our-locations/">
              Find local <strong>branch</strong>
            </a>
          </li>
        `;
      },
      findLocalBranchDropdown() {
        return `
          <li class="find-local menu-item" data-dropdown="true">
            <a data-tracked="true" id="${componentName}_findBranch" href="/our-locations/">Find local <strong>branch</strong></a>
            <div class="${componentName}_locationDropdown">
              <ul>
                <li><a data-tracked="true" id="${componentName}_newBranch" href="/our-locations/">Find a new <strong>branch</strong></a></li>
                <li><a data-tracked="true" id="${componentName}_savedBranch" href="/our-locations/${userProfile.location.toLowerCase()}">Visit the <strong>${userProfile.location} branch</strong></a></li>
              </ul>
            </div>
          </li>
        `;
      },
      requestACall() {
        return `
          <li class="request-a-call menu-item">
            <a data-tracked="true" id="${componentName}_requestACall" href="/about-us/contact-us/request-a-callback/">
              Request a <strong>call</strong>
            </a>
          </li>
        `;
      },
      existingCustomers() {
        return `
          <li class="existing-customers menu-item">
            <a data-tracked="true" id="${componentName}_existingCustomers" href="/existing-customers/">
              Existing <strong>customers</strong>
            </a>
          </li>
        `;
      },
      visitingCare() {
        return `
          <li class="visiting-care menu-item">
            <a data-tracked="true" id="${componentName}_visitingCare" href="/visiting-care/">
              Learn about <strong>visiting care</strong>
            </a>
          </li>
        `;
      },
      requestABrochure() {
        return `
          <li class="request-a-brochure menu-item">
            <a data-tracked="true" id="${componentName}_requestBrochure" href="/about-us/contact-us/request-a-brochure/">
              Request a free <strong>brochure today</strong>
            </a>
          </li>
        `;
      },
      // TODO:
      // Figure out what live chat link is supposed to do when
      // live chat isn't available
      liveChat() {
        return `
          <li class="live-chat menu-item">
            <a data-tracked="true" id="${componentName}_liveChat" href="#">
              <strong>Live chat</strong> with us now
            </a>
          </li>
        `;
      },
      homeVisit() {
        return `
          <li class="home-visit menu-item">
            <a data-tracked="true" id="${componentName}_homeVisit" href="/about-us/contact-us/book-a-home-visit/">
              Book a <strong>Home Visit</strong>
            </a>
          </li>
        `;
      },
    },
  };
  const getMobileMarkup = {
    // Retain original icon
    originalCallUs() {
      return `
        <div class="col-xs-6 ${componentName}_menuItem mobile-og-call-us">
          <div class="${componentName}_menuItemButton mobile-og-call-us-btn">
            <div class="${componentName}_iconWrap">
              <i class="glyphicon glyphicon-earphone"></i>
            </div>
            <div class="${componentName}_labelWrap">
              <p>Call us</p>
            </div>
          </div>
          
          <div class="${componentName}_menuDropdown" id="mobile-call-block">
            <div>
              ${infinityNumbersMarkup.care}
              <a href="https://www.helpinghandshomecare.co.uk/existing-customers/" class="btn btn-blue">
                Existing customers
              </a>
            </div>
            
            <div>
              ${infinityNumbersMarkup.job}
            </div>
          </div>
        </div>
      `;
    },

    callUs() {
      return `
        <div class="col-xs-6 ${componentName}_menuItem mobile-call-us">
          <div class="${componentName}_menuItemButton mobile-call-us-btn">
            <div class="${componentName}_iconWrap">
              <span class="${componentName}_icon"></span>
            </div>
            <div class="${componentName}_labelWrap">
              <p>Call us</p>
            </div>
          </div>
          
          <div class="${componentName}_menuDropdown" id="mobile-call-block">
            <div>
              ${infinityNumbersMarkup.care}
              <a href="https://www.helpinghandshomecare.co.uk/existing-customers/" class="btn btn-blue">
                Existing customers
              </a>
            </div>
            
            <div>
              ${infinityNumbersMarkup.job}
            </div>
          </div>
        </div>
      `;
    },

    requestACall() {
      return `
        <div class="col-xs-6 ${componentName}_menuItem mobile-request-call ${componentName}_menuDropdown--requestACall">
          <div class="${componentName}_menuItemButton mobile-request-call-btn">
            <div class="${componentName}_iconWrap">
              <span class="${componentName}_icon"></span>
            </div>
            <div class="${componentName}_labelWrap">
              <p>Call us or <strong>request a call</strong></p>
            </div>
          </div>
          
          <div class="${componentName}_menuDropdown">
            <ul>
              <li>
                <a data-tracked="true" id="${componentName}_callUs" class="InfinityNumber" href="tel:03300376958" data-ict-discovery-number="03300376958" data-number-type="care">
                  Call us <strong>now</strong>
                </a>
              </li>
              <li>
                <a data-tracked="true" id="${componentName}_requestACall" href="/request-a-callback/">
                  <strong>Request</strong> a call from us
                </a>
              </li>
            </ul>
          </div>
        </div>
      `;
    },

    // Retain original icon
    originalFindLocalBranch() {
      return `
        <div class="col-xs-6 ${componentName}_menuItem mobile-og-find-branch">
          <a data-tracked="true" id="${componentName}_findBranch" class="${componentName}_menuItemButton" href="/our-locations/">
            <div class="${componentName}_iconWrap">
              <i class="glyphicon glyphicon-map-marker"></i>
            </div>
            <div class="${componentName}_labelWrap">
              <p>Find a <strong>branch</strong></p>
            </div>
          </a>
        </div>
      `;
    },

    // Retain original icon
    originalFindLocalBranchDropdown() {
      return `
        <div class="col-xs-6 ${componentName}_menuItem mobile-og-find-branch ${componentName}_menuDropdown--findLocalBranch">
          <div class="${componentName}_menuItemButton mobile-og-find-branch-btn">
            <div class="${componentName}_iconWrap">
              <i class="glyphicon glyphicon-map-marker"></i>
              <span class="${componentName}_icon"></span>
            </div>
            <div class="${componentName}_labelWrap">
              <p>Find a <strong>branch</strong></p>
            </div>
          </div>

          <div class="${componentName}_menuDropdown">
            <ul>
              <li>
                <a data-tracked="true" id="${componentName}_newBranch" href="/our-locations/">
                  Find a new <strong>branch</strong>
                </a>
              </li>
              <li>
                <a data-tracked="true" id="${componentName}_savedBranch" href="/our-locations/${userProfile.location.toLowerCase()}">
                  Visit the <strong>${userProfile.location} branch</strong>
                </a>
              </li>
            </ul>
          </div>
        </div>
      `;
    },

    findLocalBranch() {
      return `
        <div class="col-xs-6 ${componentName}_menuItem mobile-find-branch">
          <a data-tracked="true" id="${componentName}_findBranch" class="${componentName}_menuItemButton" href="/our-locations/">
            <div class="${componentName}_iconWrap">
              <span class="${componentName}_icon"></span>
            </div>
            <div class="${componentName}_labelWrap">
              <p>Find a <strong>branch</strong></p>
            </div>
          </a>
        </div>
      `;
    },

    findLocalBranchDropdown() {
      return `
        <div class="col-xs-6 ${componentName}_menuItem mobile-find-branch ${componentName}_menuDropdown--findLocalBranch">
          <div class="${componentName}_menuItemButton mobile-find-branch-btn">
            <div class="${componentName}_iconWrap">
              <span class="${componentName}_icon"></span>
            </div>
            <div class="${componentName}_labelWrap">
              <p>Find a <strong>branch</strong></p>
            </div>
          </div>

          <div class="${componentName}_menuDropdown">
            <ul>
              <li>
                <a data-tracked="true" id="${componentName}_newBranch" href="/our-locations/">
                  Find a new <strong>branch</strong>
                </a>
              </li>
              <li>
                <a data-tracked="true" id="${componentName}_savedBranch" href="/our-locations/${userProfile.location.toLowerCase()}">
                  Visit the <strong>${userProfile.location} branch</strong>
                </a>
              </li>
            </ul>
          </div>
        </div>
      `;
    },

    visitingCare() {
      return `
        <div class="col-xs-6 ${componentName}_menuItem mobile-visiting-care">
          <a data-tracked="true" id="${componentName}_visitingCare" class="${componentName}_menuItemButton" href="/visiting-care/">
            <div class="${componentName}_iconWrap">
              <span class="${componentName}_icon"></span>
            </div>
            <div class="${componentName}_labelWrap">
              <p>Learn about <strong>visiting care</strong></p>
            </div>
          </a>
        </div>
      `;
    },

    findAJob() {
      return `
        <div class="col-xs-6 ${componentName}_menuItem mobile-find-job">
          <a data-tracked="true" id="${componentName}_findAJob" class="${componentName}_menuItemButton" href="/jobs/">
            <div class="${componentName}_iconWrap">
              <span class="${componentName}_icon"></span>
            </div>
            <div class="${componentName}_labelWrap">
              <p>Looking for a <strong>job?</strong></p>
            </div>
          </a>
        </div>
      `;
    },

    homeVisit() {
      return `
        <div class="col-xs-12 ${componentName}_menuItem mobile-book-appt">
          <a data-tracked="true" id="${componentName}_homeVisit" class="${componentName}_menuItemButton" href="/about-us/contact-us/book-a-home-visit/">
            <div class="${componentName}_iconWrap">
              <i class="glyphicon glyphicon-calendar"></i>
            </div>
            <div class="${componentName}_labelWrap">
              <p>Book an Appointment</p>
            </div>
          </a>
        </div>
      `;
    },
  };
  const profileMarkup = {
    1() {
      return `
        ${getDesktopMarkup.logo('col-lg-4 col-md-4')}
        ${getDesktopMarkup.menu('col-lg-4 col-md-4', ['visitingCare', 'findLocalBranch', 'liveChat'])}
        ${getDesktopMarkup.jobPhoneNumber('col-lg-2 col-md-2')}
        ${getDesktopMarkup.carePhoneNumber('col-lg-2 col-md-2')}
      `;
    },

    2() {
      return `
        ${getDesktopMarkup.logo('col-lg-6 col-md-5')}
        ${getDesktopMarkup.menu('col-lg-4 col-md-5', ['findLocalBranch', 'requestACall', 'existingCustomers'])}
        ${getDesktopMarkup.carePhoneNumber('col-lg-2 col-md-2')}
      `;
    },

    3() {
      return `
        ${getDesktopMarkup.logo('col-lg-5 col-md-5')}
        ${getDesktopMarkup.menu('col-lg-5 col-md-5', ['visitingCare', 'findLocalBranchDropdown', 'requestABrochure', 'liveChat'])}
        ${getDesktopMarkup.carePhoneNumber('col-lg-2 col-md-2')}
      `;
    },

    4() {
      return `
        ${getDesktopMarkup.logo('col-lg-6 col-md-5')}
        ${getDesktopMarkup.menu('col-lg-4 col-md-5', ['homeVisit', 'liveChat', 'requestACall', 'findLocalBranch'])}
        ${getDesktopMarkup.carePhoneNumber('col-lg-2 col-md-2')}
      `;
    },

    5() {
      return `
        ${getDesktopMarkup.logo('col-lg-5 col-md-5')}
        ${getDesktopMarkup.menu('col-lg-5 col-md-5', ['visitingCare', 'requestACall', 'findLocalBranchDropdown', 'homeVisit'])}
        ${getDesktopMarkup.carePhoneNumber('col-lg-2 col-md-2')}
      `;
    },

    6() {
      return `
        ${getMobileMarkup.visitingCare()}
        ${getMobileMarkup.findAJob()}
        ${getMobileMarkup.homeVisit()}
      `;
    },

    7() {
      return `
        ${getMobileMarkup.findLocalBranch()}
        ${getMobileMarkup.findAJob()}
      `;
    },

    8() {
      return '';
    },

    9() {
      return `
        ${getMobileMarkup.findLocalBranch()}
        ${getMobileMarkup.requestACall()}
      `;
    },

    10() {
      return `
        ${getMobileMarkup.findLocalBranchDropdown()}
        ${getMobileMarkup.requestACall()}
      `;
    },

    11() {
      return `
        ${getMobileMarkup.originalFindLocalBranch()}
        ${getMobileMarkup.originalCallUs()}
      `;
    },

    12() {
      return `
        ${getMobileMarkup.originalFindLocalBranchDropdown()}
        ${getMobileMarkup.originalCallUs()}
      `;
    },

    default() {
      return '';
    },
  };

  const getProfileMarkup = profileMarkup[profileType];
  return getProfileMarkup instanceof Function ? getProfileMarkup() : profileMarkup.default();
};
