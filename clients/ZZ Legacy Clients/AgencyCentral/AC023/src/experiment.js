import { fullStory, getCookie, events } from '../../../../lib/utils';

/**
 * {{AC023}} - {{Desktop Product Listing Page Information}}
 */
const run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'AC023',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const agencyTitles = bodyVar.querySelectorAll('#search-results-container > .agency-result .agency-title');
      const AC023MarkUp = `
      <div class="AC023-pop-up_modal">
        <div class="AC023-body_click"></div>
        <div class="AC023-inner_div">
        <a href="#" class="AC023-close_btn">✕</a>
          <div class="AC023-overflow_fix">
            <div class="AC023-Modal-Header-Wrapper">
              <p class="AC023-Modal-Header-Text">Before you go!</p>
            </div>
          <div class="AC023-Modal-Content-Wrap">
            <div class="AC023-Modal-Content-Text-Wrap">
              <p class="AC023-Modal-Text">You can access the recruitment agency's website from Agency Central.<br />Not only do you get sent straight to the website, but it also helps us out by letting the agency know where you came from!</p>
            </div>
            <div class="AC023-Modal-Button-Wrap">
              <span class="AC023-Button-Help">Show me the website link</span>
              <span class="AC023-Button-No">No, Thanks</span>
            </div>
          </div>

          </div>
        </div>
      </div>
      `;
      const profileCookie = getCookie('empOrCand');
      // eslint-disable-next-line
      let slideQ = false;

      return {
        bodyVar,
        agencyTitles,
        AC023MarkUp,
        profileCookie,
        slideQ,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Only run test if user is an employer or candidate
        if (Exp.cache.profileCookie.toUpperCase() === 'EMP' || Exp.cache.profileCookie.toUpperCase() === 'CND') {
          // Add modal markup, hide by default
          Exp.cache.bodyVar.insertAdjacentHTML('beforeend', Exp.cache.AC023MarkUp);
          this.modalFunctions();
          this.highlightButton();
          // Setup functions
          this.setupSelectFunction();
        }
      },
      setupSelectFunction() {
        // Adds the select event listener to all agency titles
        for (let i = 0; i < Exp.cache.agencyTitles.length; i += 1) {
          Exp.cache.agencyTitles[i].addEventListener('mouseup', () => {
            let checkSelection = window.getSelection().focusNode.parentNode;
            // eslint-disable-next-line
            if (checkSelection.textContent.toUpperCase().trim() === window.getSelection().toString().toUpperCase().trim()) {
              checkSelection = $(checkSelection);
              if (checkSelection.hasClass('agency-title')) {
                events.send('AC023', 'Selected', 'Title Highlighted', { sendOnce: true });
                // Remove selected agency class if it exists elsewhere
                if (Exp.cache.bodyVar.querySelector('.AC023-Selected-Agency')) {
                  Exp.cache.bodyVar.querySelector('.AC023-Selected-Agency').classList.remove('AC023-Selected-Agency');
                }
                // Add class for to target correct visit website button
                checkSelection.closest('.agency-result').toggleClass('AC023-Selected-Agency');
                Exp.components.modalFadeIn();
              }
            }
          });
        }
      },
      modalFunctions() {
        const modal = $('.AC023-pop-up_modal');
        const modalBG = modal.find('.AC023-body_click');

        modal.find('.AC023-close_btn').on('click', (e) => {
          if (Exp.cache.slideQ === false) {
            Exp.cache.slideQ = true;
            e.preventDefault();

            if (modal.hasClass('active')) {
              modal.fadeOut('slow', () => {
                modal.removeClass('active');
                Exp.cache.slideQ = false;
              });
            } else {
              modal.fadeIn('slow', () => {
                modal.addClass('active');
                Exp.cache.slideQ = false;
              });
            }
          }
        });

        modal.find('.AC023-Button-No').on('click', (e) => {
          events.send('AC023', 'Click', 'No Thanks', { sendOnce: true });
          if (Exp.cache.slideQ === false) {
            Exp.cache.slideQ = true;
            e.preventDefault();

            if (modal.hasClass('active')) {
              modal.fadeOut('slow', () => {
                modal.removeClass('active');
                Exp.cache.slideQ = false;
              });
            } else {
              modal.fadeIn('slow', () => {
                modal.addClass('active');
                Exp.cache.slideQ = false;
              });
            }
          }
        });

        modalBG.on('click', () => {
          if (modal.hasClass('active')) {
            modal.fadeOut('slow', () => {
              modal.removeClass('active');
              Exp.cache.slideQ = false;
            });
          }
        });
      },

      modalFadeIn() {
        const modal = $('.AC023-pop-up_modal');
        Exp.cache.slideQ = true;

        modal.fadeIn('slow', () => {
          modal.addClass('active');
          Exp.cache.slideQ = false;
        });
      },

      highlightButton() {
        $('.AC023-Button-Help').click(() => {
          events.send('AC023', 'Click', 'Show Me', { sendOnce: true });
          const selectedButton = $('.AC023-Selected-Agency').find('div[data-action="website"]');
          // Remove styling class if it exists
          if (Exp.cache.bodyVar.querySelector('.AC023-Glow')) {
            Exp.cache.bodyVar.querySelector('.AC023-Glow').classList.remove('AC023-Glow');
          }
          // Close the modal
          $('.AC023-close_btn').click();
          // Add styling class to visit website button, relative to selected title
          selectedButton.toggleClass('AC023-Glow');
          // Remove style after 8 seconds
          setTimeout(() => {
            // Remove styling class if it exists
            if (Exp.cache.bodyVar.querySelector('.AC023-Glow')) {
              Exp.cache.bodyVar.querySelector('.AC023-Glow').classList.remove('AC023-Glow');
            }
          }, 8000);
          // Add tracking to visit website button
          selectedButton.click(() => {
            events.send('AC023', 'Click', 'Highlighted Visit Website', { sendOnce: true });
          });
        });
      },
    },
  };

  Exp.init();
};

export default run;
