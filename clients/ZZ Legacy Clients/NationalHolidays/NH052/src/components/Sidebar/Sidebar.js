import settings from '../../lib/settings';
import StickySidebar from '../../vendors/stickySidebar';
import { events } from '../../../../../../lib/utils';

const { ID } = settings;

export default class Sidebar {
  constructor() {
    this.element = document.querySelector('.content .right .box-with-border');
    this.scrapeData();
    this.create();
    this.render();
    this.bindEvents();
  }

  /** Scrape data from DOM */
  scrapeData() {
    const { element } = this;
    const { getPlaceholderText } = Sidebar; // Static methods
    const additionalContent = Array.from(element.querySelectorAll('.side-block')).filter(el => !el.classList.contains('nodephide1'));

    /**
     * Gets text from a title in the sidebar
     * @param {string} name
     */
    const getSectionMarkup = (sectionTitle) => {
      const el = additionalContent.filter((content) => {
        const header = content.querySelector('strong');
        return header && header.innerText.trim().toLowerCase() === sectionTitle;
      })[0];

      let content;
      if (el) {
        const childEls = Array.from(el.children).filter(child => child.nodeName && (child.nodeName === 'P' || child.nodeName === 'A'));
        content = childEls.map(childEl => childEl.outerHTML.trim()).join('');
      }
      return content;
    };

    // Static values - always exists
    const title = element.querySelector('h3').innerText.trim();
    const days = element.querySelector('.side-days').innerText.trim();
    const hotel = element.querySelector('.hotel').innerText.trim();

    // Dynamic values - might exist depending on which step the user is on
    const departureDate = getSectionMarkup('departure date');
    const deposit = getSectionMarkup('deposit per passenger') || getSectionMarkup('deposit');
    const rooms = getSectionMarkup('room selection');
    const passengers = getSectionMarkup('passengers');
    const bookingOptions = getSectionMarkup('booking options');
    const cost = getSectionMarkup('total costs');
    const importantNotes = getSectionMarkup('important notes');

    // AJAX values - might exist but needs to be pulled in from other pages
    // Set placeholders for now then pull the values in once the component has been created
    const departurePoint = getPlaceholderText('Departure Point');
    const seatSelection = getPlaceholderText('Seat Selection');
    const specialRequests = getPlaceholderText('Special Requests');

    this.data = {
      title,
      groups: [
        [
          {
            name: 'Duration',
            data: days,
          },
          {
            name: 'Hotel',
            data: hotel,
          },
          {
            name: 'Departure Date',
            data: departureDate,
          },
          {
            name: 'Departure Point',
            data: departurePoint,
          },
        ],

        [
          {
            name: 'Rooms',
            data: rooms || getPlaceholderText('Rooms'),
          },
          {
            name: 'Passengers',
            data: passengers || getPlaceholderText('Passengers'),
          },
          {
            name: 'Seat Selection',
            data: seatSelection,
          },
          {
            name: 'Special Requests',
            data: specialRequests,
          },
        ],

        [
          {
            name: 'Important Notes',
            data: importantNotes,
          },
          {
            name: 'Booking options',
            data: bookingOptions,
          },
          {
            name: 'Total Costs',
            data: cost || getPlaceholderText('Total Costs'),
          },
          {
            name: 'Deposit Required',
            data: deposit,
          },
        ],
      ],
    };
  }

  /** Create component */
  create() {
    const { title, groups } = this.data;

    const element = document.createElement('div');
    element.className = `${ID}_Sidebar box-with-border white`;

    /* eslint-disable indent */
    element.innerHTML = `
      <div class="${ID}_Sidebar-title">
        <h3>${title}</h3>
      </div>

      ${groups.map(group => `
        <div class="${ID}_Sidebar-group">
          ${group.map((section) => {
            const { name, data } = section;
            return name && data !== undefined ? `
              <div class="${ID}_Sidebar-section${data === '' ? ` ${ID}_Sidebar-section--hide` : ''}">
                <div class="${ID}_Sidebar-header">${name}</div>
                <div class="${ID}_Sidebar-text">${data}</div>
              </div>
            ` : '';
          }).join('')}
        </div>
      `).join('')}
    `;
    /* eslint-enable indent */

    this.component = element;

    // Make AJAX request to populate dynamic fields
    const helpers = Sidebar.getHelpers();
    const { getPlaceholderText } = Sidebar; // Static methods
    helpers.seats.getSelectedSeats((str) => {
      this.updateSection('Seat Selection', str || getPlaceholderText('Seat Selection'));
    });
    helpers.bookingOptions.getSpecialRequests((str) => {
      this.updateSection('Special Requests', str || getPlaceholderText('Special Requests'));
    });
    helpers.passengers.getPickupPoints((str) => {
      this.updateSection('Departure Point', str || getPlaceholderText('Departure Point'));
    });
  }

  /** Event handlers */
  bindEvents() {
    const { getPlaceholderText } = Sidebar; // Static methods
    const helpers = Sidebar.getHelpers();
    const that = this;
    const { component } = that;

    setTimeout(() => {
      // Stick sidebar on scroll if sidebar is at least 200px less than content
      const leftHeight = document.querySelector('.content .left').offsetHeight;
      const rightHeight = document.querySelector('.content .right').offsetHeight;
      if ((leftHeight - rightHeight) > 200) {
        const sidebar = new StickySidebar('.main-content .content .right', {
          topSpacing: 20,
          containerSelector: '.main-content .content',
        });
      }
    }, 2000);

    const pageFunctions = {
      '/orderprocess/seatplan.aspx': () => {
        // Watch for changes to seats then update value in sidebar
        const seats = document.querySelector('.seat-area');

        seats.addEventListener('click', (e) => {
          let node = e.target;
          let clickedSeat = null;

          while (node !== this) {
            if (node.classList && node.classList.contains('seat')) {
              clickedSeat = node;
              break;
            }
            if (node.parentNode) {
              node = node.parentNode;
            } else {
              break;
            }
          }

          if (clickedSeat) {
            // Update seats in sidebar
            helpers.seats.getSelectedSeats((str) => {
              that.updateSection('Seat Selection', str || getPlaceholderText('Seat Selection'));
            });
          }
        });
      },

      '/orderprocess/bookingoptions.aspx': () => {
        // As user updates textarea, update sidebar
        const textarea = document.querySelector('#txtRequirements');
        textarea.addEventListener('change', () => {
          helpers.bookingOptions.getSpecialRequests((str) => {
            this.updateSection('Special Requests', str || getPlaceholderText('Special Requests'));
          });
        });
      },

      '/orderprocess/passengers.aspx': () => {
        // As user changes departure point, update sidebar
        const pickupSelects = Array.from(document.querySelectorAll('.pickup-list'));
        pickupSelects.forEach((el) => {
          el.addEventListener('change', () => {
            helpers.passengers.getPickupPoints((str) => {
              this.updateSection('Departure Point', str || getPlaceholderText('Departure Point'));
            });
          });
        });
      },
    };

    const pageFunction = pageFunctions[window.location.pathname.toLowerCase()];
    if (pageFunction) {
      pageFunction();
    }

    const changeLinks = Array.from(component.querySelectorAll('.change'));
    changeLinks.forEach((link) => {
      link.addEventListener('click', () => {
        events.send(ID, 'Clicked', 'Change Link');
      });
    });
  }

  /** Render component */
  render() {
    const { element, component } = this;
    element.insertAdjacentElement('beforebegin', component);
  }

  /**
   * Update the value of a section
   * @param {string} title
   * @param {string} value
   */
  updateSection(title, value) {
    const { component } = this;
    const sections = component.querySelectorAll(`.${ID}_Sidebar-section`);
    const thisSection = Array.from(sections).filter((section) => {
      const sectionTitle = section.querySelector(`.${ID}_Sidebar-header`).innerText.trim();
      return sectionTitle === title;
    });

    if (thisSection && thisSection[0] && value !== undefined) {
      thisSection[0].querySelector(`.${ID}_Sidebar-text`).innerHTML = value;
    }
  }

  /**
   * Gets placeholder text for if no data is available
   * This text changes depending on which page you're on
   * @param {string} name
   */
  static getPlaceholderText(sectionTitle) {
    const activeStep = {
      'Room Selection': '/orderprocess/availability.aspx',
      'Departure Date': '/orderprocess/passengers.aspx',
      'Departure Point': '/orderprocess/passengers.aspx',
      Passengers: '/orderprocess/passengers.aspx',
      'Seat Selection': '/orderprocess/seatplan.aspx',
      'Special Requests': '/orderprocess/bookingoptions.aspx',
      'Total Costs': '/orderprocess/availability.aspx',
    };

    const pathname = window.location.pathname.toLowerCase();
    let message;

    if (pathname === '/orderprocess/welcome.aspx') {
      // If user is on login page, don't return any placeholder text as the fields
      // don't exist on this page
      message = '';
    } else {
      const isActive = pathname === activeStep[sectionTitle];
      if (isActive && sectionTitle === 'Total Costs') {
        message = 'To be calculated in next step';
      } else {
        message = isActive ? 'Please select' : 'To be selected in future step';
      }
    }
    return message;
  }

  /**
   * Helper functions
   */
  static getHelpers() {
    return {
      seats: {
        /**
         * Gets selected seat string
         * @param {function} cb callback for after AJAX request
         * @returns {string}
         */
        getSelectedSeats: (cb) => {
          const pagePath = '/orderprocess/seatplan.aspx';
          const getActiveSeats = (container) => {
            const selected = container.querySelectorAll('.seat.selected');
            const str = Array.from(selected).map(seat => seat.getAttribute('title').trim()).join(', ');
            return str ? `<a class="change" href="SeatPlan.aspx">Change</a>${str}` : '';
          };

          if (window.location.pathname.toLowerCase() === pagePath) {
            // On seat page
            const data = getActiveSeats(document);
            if (cb) cb(data);
          } else {
            /*
             * The nav link for this page will have a href attribute if it has
             * already been visisted, meaning the user has gone backwards in the journey
             * In this scenario make an AJAX request to the seating page to check if any
             * seats have been selected
             */
            const seatingNavLink = document.querySelector('#OrderBanner_seats') || document.querySelector('#OrderBanner1_seats');
            if (seatingNavLink && seatingNavLink.href) {
              const request = new XMLHttpRequest();
              request.open('GET', pagePath, true);

              request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                  const temp = document.createElement('div');
                  temp.innerHTML = request.responseText;
                  const data = getActiveSeats(temp);
                  if (cb) cb(data);
                }
              };

              request.send();
            }
          }
        },
      },
      bookingOptions: {
        /**
         * Gets special requests string
         * @param {function} cb callback for after AJAX request
         * @returns {string}
         */
        getSpecialRequests: (cb) => {
          const pagePath = '/orderprocess/bookingoptions.aspx';
          const getSpecialRequests = (container) => {
            const input = container.querySelector('#txtRequirements');
            return input && input.value ? `<a class="change" href="bookingOptions.aspx">Change</a><p style="overflow: auto; max-height: 200px;">${input.value}</p>` : undefined;
          };

          if (window.location.pathname.toLowerCase() === pagePath) {
            // On seat page
            const data = getSpecialRequests(document);
            if (cb) cb(data);
          } else {
            /*
             * The nav link for this page will have a href attribute if it has
             * already been visisted, meaning the user has gone backwards in the journey
             * In this scenario make an AJAX request to the seating page to check if any
             * seats have been selected
             */
            const navLink = document.querySelector('#OrderBanner_bookingOptions') || document.querySelector('#OrderBanner1_bookingOptions');
            if (navLink && navLink.href) {
              const request = new XMLHttpRequest();
              request.open('GET', pagePath, true);

              request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                  const temp = document.createElement('div');
                  temp.innerHTML = request.responseText;
                  const data = getSpecialRequests(temp);
                  if (cb) cb(data);
                }
              };

              request.send();
            }
          }
        },
      },
      passengers: {
        /**
         * Gets pickup points string
         * @param {function} cb callback for after AJAX request
         * @returns {string}
         */
        getPickupPoints: (cb) => {
          const pagePath = '/orderprocess/passengers.aspx';
          const getPickupPoints = (container) => {
            const pickupPoints = Array.from(container.querySelectorAll('#paxList .pickup-list'));
            let markup = pickupPoints.map((el, i) => {
              const selection = el.selectedOptions[0];
              const content = selection.innerHTML.trim();
              return content && !/Please Select/.test(content) ? `
                ${pickupPoints.length > 1 ? `<p class="${ID}_Sidebar-small-header">Passenger ${i + 1}</p>` : ''}
                <p>${content}</p>
              ` : '';
            }).join('');
            if (markup) markup = `<a class="change" href="Passengers.aspx">Change</a>${markup}`;
            return markup;
          };

          if (window.location.pathname.toLowerCase() === pagePath) {
            // On seat page
            const data = getPickupPoints(document);
            if (cb) cb(data);
          } else {
            /*
             * The nav link for this page will have a href attribute if it has
             * already been visisted, meaning the user has gone backwards in the journey
             * In this scenario make an AJAX request to the seating page to check if any
             * seats have been selected
             */
            const navLink = document.querySelector('#OrderBanner_passengers') || document.querySelector('#OrderBanner1_passengers');
            if (navLink && navLink.href) {
              const request = new XMLHttpRequest();
              request.open('GET', pagePath, true);

              request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                  const temp = document.createElement('div');
                  temp.innerHTML = request.responseText;
                  const data = getPickupPoints(temp);
                  if (cb) cb(data);
                }
              };

              request.send();
            }
          }
        },
      },
    };
  }
}
