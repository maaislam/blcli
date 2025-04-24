import { setup } from './services';
import settings from './settings';

/**
 * {{HH036/HH025}} - {{Layout of branch information}}
 */
const { VARIATION } = settings;

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const renderLocation = bodyVar.querySelector('#content > .row > .hidden-lg.hidden-md.col-xs-12');
      // const box1BottomHalf = docVar.getElementById('intro');
      const locationCoveredTable = bodyVar.querySelector('.table.table-striped');
      const openingHoursTable = bodyVar.querySelector('.additional-details');
      const box3EndEl = bodyVar.querySelector('#rest-of-page > p:last-of-type');
      const introDetail = docVar.getElementById('intro');
      const managerDetail = docVar.getElementById('manager');
      const teamDetail = docVar.getElementById('team');
      const header = document.querySelector('#hero');
      // May not always exist
      const allContactButtons = bodyVar.querySelectorAll('#rest-of-page > a');
      // Reassigned in services
      // eslint-disable-next-line
      let carerReview = null;
      // Reassigned when content renders
      // eslint-disable-next-line
      let allMobileHeaders = null;
      // eslint-disable-next-line
      let allBoxes = null;
      // eslint-disable-next-line
      let allDesktopButtons = null;
      // eslint-disable-next-line
      let allDesktopBoxes = null;
      // eslint-disable-next-line
      let $contentSections = null;
      // Used to track current active toggle
      // eslint-disable-next-line
      let activeDesktop = 0;
      return {
        docVar,
        bodyVar,
        renderLocation,
        // box1BottomHalf,
        locationCoveredTable,
        openingHoursTable,
        carerReview,
        allBoxes,
        box3EndEl,
        introDetail,
        managerDetail,
        allDesktopBoxes,
        allDesktopButtons,
        teamDetail,
        header,
        activeDesktop,
        allMobileHeaders,
        allContactButtons,
        $contentSections,
      };
    })(),
    init: () => {
      const { render, services, bindExperimentEvents } = Exp;
      setup();
      services.getCarerReview();
      services.normaliseExceptions();
      render.markup();
      render.box2();
      render.box3();
      render.box1();
      render.bottomContainer();
      render.rearrangeDOM();
      render.locationText();
      render.mapsLocation();
      services.removeDuplicateCtas();
      bindExperimentEvents.handleMobileClick();
      bindExperimentEvents.handleDeskopClick();
      // bindExperimentEvents.handleWindowResize();

      if (VARIATION === '2') {
        services.shortenContent();
        services.moveReview();
      }
    },
    services: {
      getCarerReview: () => {
        const allReviewEl = Exp.cache.bodyVar.querySelectorAll('.pull-quote.quotation');
        for (let i = 0, n = allReviewEl.length; i < n; i += 1) {
          const currentText = allReviewEl[i].querySelector('.title').textContent.trim().toUpperCase();
          if (currentText.indexOf('CARER') !== -1 || currentText.indexOf('BRANCH MANAGER') !== -1) {
            Exp.cache.carerReview = allReviewEl[i];
            break;
          }
        }
      },

      /** Remove any repeating CTAs at bottom of content */
      removeDuplicateCtas: () => {
        const $oldCtas = $('#rest-of-page').find('a.btn');
        const $newCtas = $('.HH036_Container').find('a.btn');

        $oldCtas.each((ctaIdx, ctaEl) => {
          const markup = ctaEl.outerHTML;
          const $match = $newCtas.filter((newCtaIdx, newCtaEl) => markup === newCtaEl.outerHTML);
          if ($match.length) $match.remove();
        });
      },

      /**
       * Some pages have essential elements missing which affects how content is
       * divided into tabs. Make changes to normalise the DOM in these unique cases.
       */
      normaliseExceptions: () => {
        const pageFunctions = {
          basildon: () => {
            // Add HR and H2 above 'areas we cover' table
            const { locationCoveredTable } = Exp.cache;
            if (locationCoveredTable) locationCoveredTable.insertAdjacentHTML('beforebegin', '<hr><h2>Areas across Basildon that we cover:</h2>');
          },

          tamworth: () => {
            // Move stray location into location table
            const { locationCoveredTable } = Exp.cache;
            if (locationCoveredTable) {
              const $stray = $(locationCoveredTable).prev('p');
              if ($stray) $(locationCoveredTable).prepend($stray);
            }
          },

          richmond: () => {
            // Move quote and video outside of 'Carer' section to avoid grouping in second box
            const container = Exp.cache.bodyVar.querySelector('#rest-of-page');
            const quote = Exp.cache.bodyVar.querySelector('.pull-quote.quotation');
            const video = Exp.cache.bodyVar.querySelector('.video');
            container.insertAdjacentElement('beforeend', quote);
            container.insertAdjacentElement('beforeend', video);
          },
        };

        const location = window.location.pathname.match(/our-locations\/([\w-]+)/);
        if (location && location[1] && typeof pageFunctions[location[1]] === 'function') {
          pageFunctions[location[1]]();
        }
      },

      /** Add read more and read less buttons to the content */
      shortenContent: () => {
        // eslint-disable-next-line
        $(Exp.cache.allBoxes).each((i, box) => {
          const $box = $(box);
          const $content = $box.find('.HH036_Box_Elements_Content');
          const $toggleLength = $('<div class="HH036_toggleShorten" data-state="more"><span>Read more</span></div>');

          $toggleLength.on('click', () => {
            const shouldExpand = $toggleLength.attr('data-state') === 'more';
            if (shouldExpand) {
              $toggleLength.attr('data-state', 'less');
              $toggleLength.find('span').text('Read less');
              $content.removeClass('HH036_Box_Elements_Content--less');
            } else {
              $toggleLength.attr('data-state', 'more');
              $toggleLength.find('span').text('Read more');
              $content.addClass('HH036_Box_Elements_Content--less');

              // Scroll back to top when read less is clicked
              $('html, body').animate({
                scrollTop: $(Exp.cache.boxContainer).offset().top - 15,
              }, 0);
            }
          });

          // Render
          $content.after($toggleLength);
          $content.addClass('HH036_Box_Elements_Content--less');
        });
      },

      /** Move review above CTAs */
      moveReview: () => {
        const $restOfPage = $('#rest-of-page');
        const $review = $restOfPage.find('.pull-quote.quotation');
        const $social = $('#facebook');
        if ($review.length && !$social.length) {
          $restOfPage.prepend($review);
        }
      },
    },
    render: {
      markup: () => {
        let buttonText;
        if (VARIATION === '1') {
          buttonText = {
            options: 'Care Options',
            branch: 'Branch Details',
            carers: 'Information on carers',
          };
        } else if (VARIATION === '2') {
          buttonText = {
            options: 'Care <br>Options',
            branch: 'Branch <br>Details',
            carers: 'Info on <br>carers',
          };
        }

        Exp.cache.renderLocation.insertAdjacentHTML('beforebegin', `
          <div class="HH036_Container">
            <div class="HH036_Button_Container">
              <span class="HH036_Button1 HH036_Button HH036d HH036_Active" data-HH036-number="0">${buttonText.options}</span>
              <span class="HH036_Button2 HH036_Button HH036d" data-HH036-number="1">${buttonText.branch}</span>
              <span class="HH036_Button3 HH036_Button HH036d" data-HH036-number="2">${buttonText.carers}</span>
            </div>
            <div class="HH036_Box_Container">
              <div class="HH036_Box1 HH036_Box HH036_Active">
                <span class="HH036_Button1 HH036_Button HH036m" data-HH036-number="0">${buttonText.options}</span>
                  <div class="HH036_Box_Elements">
                  </div>
              </div>
              <div class="HH036_Box2 HH036_Box">
                <span class="HH036_Button2 HH036_Button HH036m" data-HH036-number="1">${buttonText.branch}</span>
                <div class="HH036_Box_Elements">
                </div>
              </div>
              <div class="HH036_Box3 HH036_Box">
                <span class="HH036_Button3 HH036_Button HH036m" data-HH036-number="2">${buttonText.carers}</span>
                <div class="HH036_Box_Elements">
                </div>
              </div>
            </div>
          </div>
        `);
        // Store Selectors
        Exp.cache.boxContainer = Exp.cache.bodyVar.querySelectorAll('.HH036_Box_Container');
        Exp.cache.allMobileHeaders = Exp.cache.bodyVar.querySelectorAll('.HH036_Button.HH036m');
        Exp.cache.allBoxes = Exp.cache.bodyVar.querySelectorAll('.HH036_Box_Elements');
        Exp.cache.allDesktopBoxes = Exp.cache.bodyVar.querySelectorAll('.HH036_Box');
        Exp.cache.allDesktopButtons = Exp.cache.bodyVar.querySelectorAll('.HH036_Button.HH036d');
        Exp.cache.$contentSections = $('#rest-of-page').children(':not(a, div)');

        // Show first tab by default
        if (VARIATION === '2') {
          Exp.cache.allMobileHeaders[0].classList.add('HH036_Open');
          $(Exp.cache.allBoxes[0]).show();
        }
      },
      box1: () => {
        const box1El = $(Exp.cache.bodyVar.querySelector('#rest-of-page')).children(':not(a, div)');
        for (let i = 0, n = box1El.length; i < n; i += 1) {
          Exp.cache.allBoxes[0].insertAdjacentElement('beforeend', box1El[i]);
        }

        if (Exp.cache.introDetail) {
          // If intro detail hasn't yet been moved, move it to box 1
          if (!$(Exp.cache.introDetail).parent().is('.HH036_Box_Elements')) {
            $(Exp.cache.introDetail).appendTo(Exp.cache.allBoxes[0]);
          }
        }


        // Exp.cache.allBoxes[0].insertAdjacentElement('beforeend', Exp.cache.box1BottomHalf);
      },
      box2: () => {
        const box2El = $(Exp.cache.box3EndEl).prevUntil('hr').addBack();
        for (let i = 0, n = box2El.length; i < n; i += 1) {
          Exp.cache.allBoxes[1].insertAdjacentElement('beforeend', box2El[i]);
        }
        Exp.cache.allBoxes[1].insertAdjacentElement('beforeend', Exp.cache.openingHoursTable);
        // Move table header
        const { locationCoveredTable } = Exp.cache;
        if (locationCoveredTable) {
          const tableHeader = $(locationCoveredTable).prevAll('h2')[0];
          Exp.cache.allBoxes[1].insertAdjacentElement('beforeend', tableHeader);
          Exp.cache.allBoxes[1].insertAdjacentElement('beforeend', locationCoveredTable);
        }
      },
      box3: () => {
        // Filter carer sections
        const $carerSections = (() => {
          // Keywords to search for in H2 elements
          const keywords = ['carer'];

          /**
           * Check if a string contains a keyword
           * @returns {boolean}
           */
          const containsKeyword = (str) => {
            let toReturn = false;
            keywords.forEach((keyword) => {
              if (str.toLowerCase().indexOf(keyword) > -1) toReturn = true;
            });
            return toReturn;
          };

          const $sections = Exp.cache.$contentSections.filter(function filterSections() {
            const isHeader = this.nodeName && (this.nodeName === 'H2' || (this.nodeName === 'P' && this.classList.contains('p2')));
            return isHeader && containsKeyword(this.innerHTML);
          }).map(function mapSections() {
            return $(this).nextUntil((i, el) => el.nodeName === 'HR').addBack();
          });

          return $sections;
        })();

        // Append carer sections to second tab
        $carerSections.each((i, $section) => {
          $section.appendTo(Exp.cache.allBoxes[2]);
        });

        // Move carer review
        if (Exp.cache.carerReview) {
          $(Exp.cache.carerReview).appendTo(Exp.cache.allBoxes[2]);
        }

        // Move manager details
        if (Exp.cache.managerDetail) {
          $(Exp.cache.managerDetail).appendTo(Exp.cache.allBoxes[2]);

          // Move intro details
          /**
           * Note: Sometimes the content in this section leads on to the manager details section
           * towards the end of the text, e.g. "This is what our branch manager has to say:".
           * For this reason if the manager detail section exists, move the intro section to above
           * the manager detail section
           */
          if (Exp.cache.introDetail) {
            $(Exp.cache.introDetail).insertBefore(Exp.cache.managerDetail);
          }
        }

        // Move team info
        if (Exp.cache.teamDetail) {
          $(Exp.cache.teamDetail).appendTo(Exp.cache.allBoxes[2]);
        }
      },
      bottomContainer: () => {
        // Rearrange bottom area
        const bottomArea = Exp.cache.docVar.getElementById('rest-of-page');

        // Get update elements
        const videoContainer = Exp.cache.bodyVar.querySelector('#rest-of-page .video');
        const customerQuote = Exp.cache.bodyVar.querySelector('#rest-of-page .pull-quote');
        if (videoContainer) {
          bottomArea.insertAdjacentElement('beforeend', videoContainer);
        }
        if (customerQuote) {
          bottomArea.insertAdjacentElement('beforeend', customerQuote);
        }

        // Move all contact buttons to top of the bottom area
        for (let i = Exp.cache.allContactButtons.length - 1; i >= 0; i -= 1) {
          bottomArea.insertAdjacentElement('afterbegin', Exp.cache.allContactButtons[i]);
        }

        // Move request a brochure cta to top of buttons
        if (Exp.cache.allContactButtons.length >= 2) {
          const requestBrochureCta = [].filter.call(Exp.cache.allContactButtons, el => el.getAttribute('href') === '/about-us/contact-us/request-a-brochure/')[0];
          const firstCta = Exp.cache.allContactButtons[0];
          if (requestBrochureCta && firstCta !== requestBrochureCta) {
            firstCta.insertAdjacentElement('beforebegin', requestBrochureCta);
          }
        }
      },
      rearrangeDOM: () => {
        // Move get in touch section above tabs
        const tabs = Exp.cache.bodyVar.querySelector('.HH036_Container');
        const getInTouchSection = Exp.cache.bodyVar.querySelector('#content .branch-details').parentElement;
        tabs.insertAdjacentElement('beforebegin', getInTouchSection);

        // Move intro paragraph to outside tabs
        if (Exp.cache.introDetail) {
          tabs.insertAdjacentElement('beforebegin', Exp.cache.introDetail);
        }

        // Wrap box content in container for read more / read less buttons
        $(Exp.cache.allBoxes).each((i, box) => {
          const $box = $(box);
          // Wrap content in container
          $box.children().wrapAll('<div class="HH036_Box_Elements_Content"></div>');
        });

        // If social form exists, move review below it
        const $social = $('#facebook');
        const $restOfPage = $('#rest-of-page');
        const $review = $restOfPage.find('.pull-quote.quotation');
        if ($social.length && $review.length) {
          $social.insertBefore($review);
        }
      },

      /** Change description text under the location title */
      locationText: () => {
        const { header } = Exp.cache;
        const locationName = header.querySelector('h1').innerText.trim();
        const locationDesc = header.querySelector('#strapline');
        locationDesc.innerText = `Providing care in your home across ${locationName} and the surrounding areas`;
      },

      /** Create Google Maps link */
      mapsLocation: () => {
        const allBranchDetails = document.querySelectorAll('.branch-details');
        const addressText = allBranchDetails[0].querySelector('.wpsl-location-address').innerText.trim();
        const googleMapsSearchLink = `https://www.google.co.uk/maps/search/${addressText}`;

        const address = document.querySelector('.wpsl-locations-details');
        address.insertAdjacentHTML('afterend', `<a target="_blank" id="HH036_mapsLink" href="${googleMapsSearchLink}">(view in Google Maps)</a>`);
      },
    },
    bindExperimentEvents: {
      handleMobileSlide: (el) => {
        if (VARIATION === '1') {
          $(Exp.cache.allBoxes[parseInt(el.getAttribute('data-HH036-number'), 10)]).slideToggle();
          el.classList.toggle('HH036_Open');
        } else if (VARIATION === '2') {
          $('.HH036_Open').removeClass('HH036_Open');
          $('.HH036_Active').removeClass('HH036_Active');
          $(Exp.cache.allBoxes).hide();
          $(Exp.cache.allBoxes[parseInt(el.getAttribute('data-HH036-number'), 10)]).show();
          el.classList.add('HH036_Open');
          $(el).closest('.HH036_Box').addClass('HH036_Active');
        }
      },
      handleMobileClick() {
        for (let i = 0, n = Exp.cache.allMobileHeaders.length; i < n; i += 1) {
          Exp.cache.allMobileHeaders[i].addEventListener('click', (e) => {
            this.handleMobileSlide(e.target);
          });
        }
      },
      handleDesktopReveal: (el) => {
        const nextActive = parseInt(el.getAttribute('data-HH036-number'), 10);
        Exp.cache.allDesktopBoxes[Exp.cache.activeDesktop].classList.toggle('HH036_Active');
        Exp.cache.allDesktopButtons[Exp.cache.activeDesktop].classList.toggle('HH036_Active');
        Exp.cache.allDesktopBoxes[nextActive].classList.toggle('HH036_Active');
        Exp.cache.allDesktopButtons[nextActive].classList.toggle('HH036_Active');
        Exp.cache.activeDesktop = nextActive;
      },
      handleDeskopClick() {
        for (let i = 0, n = Exp.cache.allDesktopButtons.length; i < n; i += 1) {
          Exp.cache.allDesktopButtons[i].addEventListener('click', (e) => {
            this.handleDesktopReveal(e.target);
          });
        }
      },
      handleWindowResize: () => {
        // window.addEventListener('resize', () => {
        //   console.log('window resize event');
        //   for (let i = 0, n = Exp.cache.allBoxes.length; i < n; i += 1) {
        //     // Remove active mobile class
        //     Exp.cache.allMobileHeaders[i].classList.remove('HH036_Open');
        //     // Remove any inline styles from jQuery slide
        //     Exp.cache.allBoxes[i].setAttribute('style', '');
        //     if (window.innerWidth < 992) {
        //       // Slideup mobile content
        //       $(Exp.cache.allBoxes[i]).slideUp();
        //     }
        //   }
        // });
      },
    },
  };

  Exp.init();
};

export default Run;
