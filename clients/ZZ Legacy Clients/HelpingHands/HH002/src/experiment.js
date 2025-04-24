import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{HH002}} - {{Experiment Title}}
 */
let $ = null;
$ = window.jQuery;

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'HH002',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    if (Experiment.settings.VARIATION === '2') {
      events.send(Experiment.settings.ID, 'Control', 'Control version fired');
      return false;
    }
    const bodyVar = document.body;

    // Elements to move
    const map = bodyVar.querySelector('#content #map');

    const contactHeader = bodyVar.querySelector('.widget div.branch-details h2');
    const scrollToContact = bodyVar.querySelector('#content .row > .additional-details.col-xs-12');
    // eslint-disable-next-line
    // const careNumber = bodyVar.querySelector('.widget div.branch-details .col-md-12.col-sm-6.col-xs-12 .phone_ctp a');
    const jobNumber = bodyVar.querySelector('.widget div.branch-details .col-md-12.col-sm-6.col-xs-12 .phone_ctp:last-of-type a');
    // const requestCallbackBtn = bodyVar.querySelector('#rest-of-page > a.btn.btn-highlight');
    const emailUsBtn = bodyVar.querySelector('#rest-of-page > a.btn.btn-standard');
    const areaWeCoverTable = bodyVar.querySelector('#rest-of-page > table.table-striped');
    const address = bodyVar.querySelector('#sidebar .branch-details .col-md-12.col-sm-6.col-xs-12 .wpsl-location-address');
    const branchManager = bodyVar.querySelector('#sidebar .branch-details .col-md-12.col-sm-6.col-xs-12');
    let emailAddress;
    if (emailUsBtn) {
      emailAddress = emailUsBtn.href;
      emailAddress.replace('mailto:', '');
    }

    let branchManagerName;
    if (branchManager) {
      branchManagerName = branchManager.textContent.trim().match(/Branch Manager\n\s+(\w+\s\w+)/gm);
      if (branchManagerName !== null) {
        branchManagerName = branchManagerName[0].replace(/^\w+\s\w+\s+/, '');
      } else {
        const firstImage = bodyVar.querySelector('#meet-our-team .row .thumbnail .caption p strong');
        if (firstImage) {
          branchManagerName = firstImage.textContent;
        }
      }
    }

    const careNumberText = bodyVar.querySelector('#sidebar .InfinityNumber.clickable').textContent.trim();
    // if (careNumber) {
    //   careNumberText = careNumber.textContent.replace('tel:', '');
    // }

    let jobNumberText;
    if (jobNumber) {
      jobNumberText = jobNumber.textContent.replace('tel:', '');
    }

    let emailAddressText;
    if (emailAddress) {
      emailAddressText = emailAddress.replace('mailto:', '');
    }
    const cacheObject = {
      bodyVar,
      map,
      scrollToContact,
      careNumberText,
      jobNumberText,
      address,
      branchManagerName,
      contactHeader,
      // requestCallbackBtn,
      emailUsBtn,
      emailAddress,
      emailAddressText,
      areaWeCoverTable,
    };
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    // Move map
    pollerLite([
      map,
    ], () => {
      services.moveMap(map);
    });

    // Rename contact title
    services.renameContactHeader(contactHeader);
    // Add scrollTo ID
    services.addScrollToId(scrollToContact);
    // Build Mobile
    let htmlToAdd;
    if (services.isMobile()) {
      htmlToAdd = components.buildMobileModule(cacheObject);
    } else {
      htmlToAdd = components.buildModule(cacheObject);
    }
    // Add html to container
    services.addHtml(htmlToAdd);

    // Add scroll To Element
    const scrollToTimes = document.getElementById('scrollToTimes');
    const openingTimes = document.querySelector('.HH002-scrollTo');
    services.scrollTo(scrollToTimes, openingTimes);

    // Click tracking
    services.addTracking();
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
    /**
     * @desc Different for Desktop and Mobile
     * @param {Element} mapElement
     */
    moveMap(mapElement) {
      // Desktop
      if (Experiment.settings.VARIATION === '1') {
        const ref = document.querySelector('#intro');
        if (ref && mapElement) {
          ref.insertAdjacentElement('beforebegin', mapElement);
        }
      }
      // Mobile
      if (Experiment.settings.VARIATION === '2') {
        const ref = document.querySelector('.additional-details.col-xs-12');
        if (ref) {
          ref.insertAdjacentElement('beforeend', mapElement);
        }
      }
    },
    /**
     * @desc Rename the contact box title
     * @param {Element} title
     */
    renameContactHeader(title) {
      if (title) {
        title.textContent = 'Contact Us';
      }
    },
    /**
     * @desc adds an ID of HH002-scrollTo to element
     * @param {Element} element
     */
    addScrollToId(element) {
      if (element) {
        element.classList.add('HH002-scrollTo');
      }
    },
    /**
     * @desc Adds the HTML to the reference within the function
     * @param {String} html
     */
    addHtml(html) {
      const ref = document.querySelector('#main > .container');
      if (ref && html) {
        ref.insertAdjacentHTML('afterbegin', html);
        events.send(Experiment.settings.ID, 'Seen', 'Test module has been added');
      }
    },
    /**
     * Custom click tracking
     */
    addTracking() {
      const requestCallback = document.querySelector('a.HH002-button-callback');
      const downloadBrochure = document.querySelector('a.HH002-download');
      const bookAppointment = document.querySelector('a.button.HH002-book');
      const sendAMessage = document.querySelector('a.button.HH002-button-email');
      const emailAddress = document.querySelector('a.HH002-email-link');
      const emailUsBtn = document.querySelector('.a.HH002-email');

      if (requestCallback) {
        requestCallback.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Clicked', 'Request a Callback');
        });
      }
      if (downloadBrochure) {
        downloadBrochure.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Clicked', 'Download a Brochure');
        });
      }
      if (bookAppointment) {
        bookAppointment.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Clicked', 'Book an appointment');
        });
      }
      if (sendAMessage) {
        sendAMessage.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Clicked', 'Send us a message');
        });
      }
      if (emailAddress) {
        emailAddress.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Clicked', 'Email address');
        });
      }
      if (emailUsBtn) {
        emailUsBtn.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Click', 'Email us');
        });
      }
    },
    /**
     * Detect if on mobile size screen
     */
    isMobile() {
      let isMobile = false;
      if (window.innerWidth < 769) {
        isMobile = true;
      } else if (window.innerWidth >= 769) {
        isMobile = false;
      }
      return isMobile;
    },
    /**
     * @desc Adds a scroll animation
     * @param {Element} clicked
     * @param {Element} element
     */
    scrollTo(clicked, element) {
      if (clicked && element && $ !== null) {
        clicked.addEventListener('click', () => {
          $([document.documentElement, document.body]).animate({
            scrollTop: $(element).offset().top,
          }, 2000);
        });
      }
    },
  },

  components: {
    buildModule(htmlObject) {
      const isElement = (element) => {
        return element instanceof Element;
      };
      // const isLineOpen = () => {
      //   let lineOpen = false;
      //   const date = new Date();
      //   const time = date.toLocaleTimeString();
      //   const openingTime = '08:00:00';
      //   const closingTime = '19:00:00';
      //   if (time >= openingTime && time <= closingTime) {
      //     lineOpen = true;
      //   } else {
      //     lineOpen = false;
      //   }
      //   return lineOpen;
      // };
      // let care = '';
      // let job = '';
      let email = '';
      let address = '';
      let branchM = '';
      let area = '';
      let emailBtn = '';
      // if (htmlObject.careNumberText) {
      //   care = `<p>Looking for Care?</p>
      //   <a href="tel:${htmlObject.careNumberText}">${htmlObject.careNumberText}</a>`;
      // }
      // if (htmlObject.jobNumberText) {
      //   job = `<p>Looking for Jobs?</p>
      //   <a href="tel:${htmlObject.jobNumberText}">${htmlObject.jobNumberText}</a>`;
      // }
      if (htmlObject.emailAddressText) {
        email = '<a class="HH002-email-link" href="mailto:enquiries@helpinghands.co.uk">enquiries@helpinghands.co.uk</a>';
        emailBtn = '<a href="mailto:enquiries@helpinghands.co.uk" class="button HH002-button-email">Send an Email</a>';
      }
      if (htmlObject.address.hasChildNodes()) {
        address = `<p class="HH002_Heading">Address</p>${htmlObject.address.outerHTML}`;
      }
      if (htmlObject.branchManagerName) {
        branchM = `<p class="HH002_Heading">Branch Manager</p>
          <span class="HH002_Manager_Name">${htmlObject.branchManagerName}</span>
        `;
      }
      if (htmlObject.areaWeCoverTable) {
        area = `${htmlObject.areaWeCoverTable.outerHTML}`;
      }
      const html = `
        <div class="HH002-contact-module HH002-desktop">
          <div class="HH002-title">
            <h2>Contact Us</h2>
          </div>
          <div class="HH002-contact-wrap">
            <div class="HH002-contact-left">
              <p class="HH002_Heading">Opening Hours</p>
              <p>Our phone lines are open <br />from 8am - 7pm, 7 days a week</p>
              <p class="HH002_Call_Team">Call our team today on
                <span class="HH002_Number">${htmlObject.careNumberText}</span>
              </p>
            </div>
            <div class="HH002-contact-center">
              ${branchM}
              ${email}
            </div>
            <div class="HH002-contact-right">
              ${address}
            </div>
            <div class="HH002-contact-locations">
              <p>Locations covered:</p>
              <div class="HH002-table-wrap">
                ${area}
              </div>
            </div>            
            </div>
            <div class="HH002-contact-buttons">
              <div class="HH002_Other_Options_Container">
                <p class="HH002_Other_Options_Header HH002_Heading">Other options</p>
                <span class="HH002_Other_Options_Text">Not free right now? We can call you back at a time that best suits you, just request a call back.</span>
              </div>
              <div class="HH002_Button_Container">
                <div class="HH002-button">
                  ${emailBtn}
                </div>
                <div class="HH002-button">
                  <a href="https://www.helpinghandshomecare.co.uk/about-us/contact-us/request-a-brochure/" class="button HH002-button-brochure HH002-download">Download a Brochure</a>
                </div>
                <div class="HH002-button">
                  <a href="https://www.helpinghandshomecare.co.uk/about-us/contact-us/request-a-callback/" class="button HH002-button-callback">Request a Callback</a>
                </div>
              </div>
            </div>
        </div>
      `;
      return html;
    },
    buildMobileModule(htmlObject) {
      const isElement = (element) => {
        return element instanceof Element;
      };
      const isLineOpen = () => {
        let lineOpen = false;
        const date = new Date();
        const time = date.toLocaleTimeString();
        const openingTime = '08:00:00';
        const closingTime = '19:00:00';
        if (time >= openingTime && time <= closingTime) {
          lineOpen = true;
        } else {
          lineOpen = false;
        }
        return lineOpen;
      };
      let care = '';
      let job = '';
      // let email = '';
      let address = '';
      let branchM = '';
      let area = '';
      // let emailBtn = '';
      // let emailLink = '';
      if (htmlObject.careNumberText) {
        care = `<p>Looking for Care?</p>
        <a href="tel:${htmlObject.careNumberText}">${htmlObject.careNumberText}</a>`;
      }
      const jobContact = document.querySelector('.row  p:nth-of-type(2) .InfinityNumber').textContent.trim();
      job = `<p>Looking for Jobs?</p>
      <a href="tel:${jobContact}">${jobContact}</a>`;
      // if (htmlObject.emailAddressText) {
      //   email = `<p>Email:</p>
      // eslint-disable-next-line
      //   <a class="HH002-email-link" href="mailto:${htmlObject.emailAddressText}">${htmlObject.emailAddressText}</a>`;
      // eslint-disable-next-line
      //   emailBtn = `<a href="mailto:${htmlObject.emailAddressText}" class="button HH002-button-email">Send an Email</a>`;
      // eslint-disable-next-line
      //   emailLink = `<a class="HH002-email" href="mailto:${htmlObject.emailAddressText}">Email us</a>`;
      // }
      if (htmlObject.address.hasChildNodes()) {
        address = `<p>Address:</p>${htmlObject.address.outerHTML}`;
      }
      if (htmlObject.branchManagerName) {
        branchM = `<p class="HH002-Branch-Manager">Branch Manager: <strong>${htmlObject.branchManagerName}</strong></p>`;
      }
      if (htmlObject.areaWeCoverTable) {
        area = `${htmlObject.areaWeCoverTable.outerHTML}`;
      }
      const html = `
        <div class="HH002-contact-module HH002-mobile">
          <div class="HH002-title">
            <h2>Contact Us</h2>
          </div>
          <span class="HH002-subtitle">Important Numbers</span>
          <div class="HH002-contact-wrap">
            <div class="HH002-contact-left">
              ${care}
              ${job}
            </div>
            <div class="HH002-contact-center">
              <p>Opening Hours</p> 
              <p>Our phone lines are open <br />from 8am - 7pm, 7 days a week</p>
              ${isLineOpen() ? '<span class="HH002-line-open">Open now</span>' : '<span class="HH002-line-closed">Our phone lines are currently closed</span><br />'}
            </div>
            <div class="HH002-Branch-Details">
              ${address}
              <button id="scrollToTimes">View branch opening hours</button>
              ${branchM}
              <span class="HH002-Email-Title">Email:</span>
              <a href="mailto:enquiries@helpinghands.co.uk" class="button HH002-button-email">enquiries@helpinghands.co.uk</a>
            </div>
            <div class="HH002-contact-locations">
              <p>Covering Locations:</p>
              <div class="HH002-table-wrap">
                ${area}
              </div>
            </div>
            <div class="HH002-contact-buttons">
              <div class="HH002-button">
                <a href="https://www.helpinghandshomecare.co.uk/about-us/contact-us/request-a-callback/" class="button HH002-button-callback">Request a Callback</a>
              </div>
              <div class="HH002-button">
                <a href="mailto:enquiries@helpinghands.co.uk" class="button HH002-button-email">Send an Email</a>
              </div>
              <div class="HH002-button">
                <a href="https://www.helpinghandshomecare.co.uk/about-us/contact-us/request-a-brochure/" class="button HH002-download">Download a Brochure</a>
              </div>
            </div>
        </div>
      `;
      return html;
    },
  },
};

export default Experiment;
