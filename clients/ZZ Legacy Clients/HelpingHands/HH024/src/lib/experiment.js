import { setup } from './services';

/**
 * {{HH024/HH025}} - {{Layout of branch information}}
 */

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
      services.removeDuplicateCtas();
      bindExperimentEvents.handleMobileClick();
      bindExperimentEvents.handleDeskopClick();
      bindExperimentEvents.handleWindowResize();
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

      removeDuplicateCtas: () => {
        const $oldCtas = $('#rest-of-page').find('a.btn');
        const $newCtas = $('.HH024_Container').find('a.btn');

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
            if(quote) {
              container.insertAdjacentElement('beforeend', quote);
            }

            if(video) {
              container.insertAdjacentElement('beforeend', video);
            }
          },
        };

        const location = window.location.pathname.match(/our-locations\/([\w-]+)/);
        if (location && location[1] && typeof pageFunctions[location[1]] === 'function') {
          pageFunctions[location[1]]();
        }
      },
    },
    render: {
      markup: () => {
        Exp.cache.renderLocation.insertAdjacentHTML('beforebegin', `
          <div class="HH024_Container">
            <div class="HH024_Button_Container">
              <span class="HH024_Button1 HH024_Button HH024d HH024_Active" data-hh024-number="0">Care Options</span>
              <span class="HH024_Button2 HH024_Button HH024d" data-hh024-number="1">Information on carers</span>
              <span class="HH024_Button3 HH024_Button HH024d" data-hh024-number="2">Branch Details</span>
            </div>
            <div class="HH024_Box_Container">
              <div class="HH024_Box1 HH024_Box HH024_Active">
                <span class="HH024_Button1 HH024_Button HH024m" data-hh024-number="0">Care Options</span>
                  <div class="HH024_Box_Elements">
                  </div>
              </div>
              <div class="HH024_Box2 HH024_Box">
                <span class="HH024_Button2 HH024_Button HH024m" data-hh024-number="1">Information on carers</span>
                <div class="HH024_Box_Elements">
                </div>
              </div>
              <div class="HH024_Box3 HH024_Box">
                <span class="HH024_Button3 HH024_Button HH024m" data-hh024-number="2">Branch Details</span>
                <div class="HH024_Box_Elements">
                </div>
              </div>
            </div>
          </div>
        `);
        // Store Selectors
        Exp.cache.allMobileHeaders = Exp.cache.bodyVar.querySelectorAll('.HH024_Button.HH024m');
        Exp.cache.allBoxes = Exp.cache.bodyVar.querySelectorAll('.HH024_Box_Elements');
        Exp.cache.allDesktopBoxes = Exp.cache.bodyVar.querySelectorAll('.HH024_Box');
        Exp.cache.allDesktopButtons = Exp.cache.bodyVar.querySelectorAll('.HH024_Button.HH024d');
        Exp.cache.$contentSections = $('#rest-of-page').children(':not(a, div)');
      },
      box1: () => {
        const box1El = $(Exp.cache.bodyVar.querySelector('#rest-of-page')).children(':not(a, div)');
        if(box1El.filter((i,n) => n.nodeName != 'HR').length > 0) {
          for (let i = 0, n = box1El.length; i < n; i += 1) {
            Exp.cache.allBoxes[0].insertAdjacentElement('beforeend', box1El[i]);
          }
        } else {
          const intro = document.getElementById('intro');
          if(intro) {
            const introElms = $(intro).children(':not(a,div)');
            for (let i = 0, n = introElms.length; i < n; i += 1) {
              Exp.cache.allBoxes[0].insertAdjacentElement('beforeend', introElms[i]);
            }
          }
        }

        if (Exp.cache.introDetail) {
          // If intro detail hasn't yet been moved, move it to box 1
          if (!$(Exp.cache.introDetail).parent().is('.HH024_Box_Elements')) {
            $(Exp.cache.introDetail).appendTo(Exp.cache.allBoxes[0]);
          }
        }


        // Exp.cache.allBoxes[0].insertAdjacentElement('beforeend', Exp.cache.box1BottomHalf);
      },
      box2: () => {
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
          $section.appendTo(Exp.cache.allBoxes[1]);
        });

        // Move carer review
        if (Exp.cache.carerReview) {
          $(Exp.cache.carerReview).appendTo(Exp.cache.allBoxes[1]);
        }

        // Move manager details
        if (Exp.cache.managerDetail) {
          $(Exp.cache.managerDetail).appendTo(Exp.cache.allBoxes[1]);

          // Move intro details
          /**
           * Note: Sometimes the content in this section leads on to the manager details section
           * towards the end of the text, e.g. "This is what our branch manager has to say:".
           * For this reason include the intro section in box 2 even if it contains a keyword in
           * the title. If there are no manager details include this section in box 1 instead.
           */
          if (Exp.cache.introDetail) {
            $(Exp.cache.introDetail).insertBefore(Exp.cache.managerDetail);
          }
        }

        // Move team info
        if (Exp.cache.teamDetail) {
          $(Exp.cache.teamDetail).appendTo(Exp.cache.allBoxes[1]);
        }
      },
      box3: () => {
        const box3El = $(Exp.cache.box3EndEl).prevUntil('hr').addBack();
        for (let i = 0, n = box3El.length; i < n; i += 1) {
          Exp.cache.allBoxes[2].insertAdjacentElement('beforeend', box3El[i]);
        }
        Exp.cache.allBoxes[2].insertAdjacentElement('beforeend', Exp.cache.openingHoursTable);
        // Move table header
        const { locationCoveredTable } = Exp.cache;
        if (locationCoveredTable) {
          const tableHeader = $(locationCoveredTable).prevAll('h2')[0];
          Exp.cache.allBoxes[2].insertAdjacentElement('beforeend', tableHeader);
          Exp.cache.allBoxes[2].insertAdjacentElement('beforeend', locationCoveredTable);
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
        // Move all contact buttons to top  of the bottom area
        for (let i = 0, n = Exp.cache.allContactButtons.length; i < n; i += 1) {
          bottomArea.insertAdjacentElement('afterbegin', Exp.cache.allContactButtons[i]);
        }
      },
      rearrangeDOM: () => {
        // Move get in touch section above tabs
        const tabs = Exp.cache.bodyVar.querySelector('.HH024_Container');
        const getInTouchSection = Exp.cache.bodyVar.querySelector('#content .branch-details').parentElement;
        tabs.insertAdjacentElement('beforebegin', getInTouchSection);
      },
    },
    bindExperimentEvents: {
      handleMobileSlide: (el) => {
        $(Exp.cache.allBoxes[parseInt(el.getAttribute('data-hh024-number'), 10)]).slideToggle();
        el.classList.toggle('HH024_Open');
      },
      handleMobileClick() {
        for (let i = 0, n = Exp.cache.allMobileHeaders.length; i < n; i += 1) {
          Exp.cache.allMobileHeaders[i].addEventListener('click', (e) => {
            this.handleMobileSlide(e.target);
          });
        }
      },
      handleDesktopReveal: (el) => {
        const nextActive = parseInt(el.getAttribute('data-hh024-number'), 10);
        Exp.cache.allDesktopBoxes[Exp.cache.activeDesktop].classList.toggle('HH024_Active');
        Exp.cache.allDesktopButtons[Exp.cache.activeDesktop].classList.toggle('HH024_Active');
        Exp.cache.allDesktopBoxes[nextActive].classList.toggle('HH024_Active');
        Exp.cache.allDesktopButtons[nextActive].classList.toggle('HH024_Active');
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
        window.addEventListener('resize', () => {
          for (let i = 0, n = Exp.cache.allBoxes.length; i < n; i += 1) {
            // Remove active mobile class
            Exp.cache.allMobileHeaders[i].classList.remove('HH024_Open');
            // Remove any inline styles from jQuery slide
            Exp.cache.allBoxes[i].setAttribute('style', '');
            if (window.innerWidth < 992) {
              // Slideup mobile content
              $(Exp.cache.allBoxes[i]).slideUp();
            }
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;
