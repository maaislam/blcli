import { fullStory, getCookie } from '../../../../lib/utils';
import modalMarkup from './lib/modal';

/**
 * {{AC025}} - {{Test Description}}
 */
const Run = () => {
  const $ = window.jQuery;
  let slideQ = false;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'AC025',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const candCheck = getCookie('empOrCand');
      let modal;
      let modalBG;

      return {
        bodyVar,
        candCheck,
        modal,
        modalBG,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
      components.modalEventBinders();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      ajax: (URL) => {
        const request = new XMLHttpRequest();
        request.open('GET', URL, true);

        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const div = document.createElement('div');
            let content;

            div.innerHTML = request.responseText;
            const header = div.querySelector('#agency-page > .row .col-lg-8.col-md-12:first-child h1').innerText;

            if (Exp.cache.candCheck === 'emp') {
              content = div.querySelector('#agency-page .show-if-employer');
            } else {
              content = div.querySelector('#agency-page .show-if-candidate');
            }

            Exp.cache.modal.find('.AC025_overflow_fix').html(`<h2>${header}</h2>`).append($(content)).append(`<a class="AC025_go-to" href="${URL}">View More</a>`);
            Exp.cache.modal.addClass('AC025_loader-toggle');
          } else {
            // We reached our target server, but it returned an error
            console.log('error 1');
          }
        };

        request.onerror = () => {
          // There was a connection error of some sort
          console.log('error 2');
        };

        request.send();
      },
    },
    components: {
      contentBuilder: () => {
        Exp.cache.bodyVar.insertAdjacentHTML('beforeend', modalMarkup);

        const agencyLinks = document.querySelectorAll('.contact-options-container .extra-contact-action.more-info-link');

        Exp.cache.modal = $('.AC025_pop-up_modal');
        Exp.cache.modalBG = Exp.cache.modal.find('.AC025_body_click');

        [].forEach.call(agencyLinks, (el) => {
          const thisLink = el.previousElementSibling.href;

          el.insertAdjacentHTML('beforebegin', `
            <a class="AC025_modal-ajax" data-link="${thisLink}"></a>
          `);
        });
      },
      modalEventBinders: () => {
        const ajaxBtns = document.querySelectorAll('.AC025_modal-ajax');

        [].forEach.call(ajaxBtns, (el) => {
          const thisLink = el.getAttribute('data-link');

          el.addEventListener('click', () => {
            Exp.services.ajax(thisLink);
          });
        });

        $('.AC025_close_btn, .AC025_modal-ajax').on('click', (e) => {
          if (slideQ === false) {
            slideQ = true;
            e.preventDefault();

            if (Exp.cache.modal.hasClass('active')) {
              Exp.cache.modal.fadeOut('slow', () => {
                Exp.cache.bodyVar.classList.remove('AC025_modal-show');
                Exp.cache.modal.removeClass('active AC025_loader-toggle');
                slideQ = false;
              });
            } else {
              console.log('show');
              Exp.cache.modal.fadeIn('slow', () => {
                Exp.cache.bodyVar.classList.add('AC025_modal-show');
                Exp.cache.modal.addClass('active');
                slideQ = false;
              });
            }
          }
        });

        Exp.cache.modalBG.on('click', () => {
          if (Exp.cache.modal.hasClass('active')) {
            Exp.cache.modal.fadeOut('slow', () => {
              Exp.cache.bodyVar.classList.remove('AC025_modal-show');
              Exp.cache.modal.removeClass('active AC025_loader-toggle');
              slideQ = false;
            });
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;
