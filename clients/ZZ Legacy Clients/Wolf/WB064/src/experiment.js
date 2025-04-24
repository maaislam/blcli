import { fullStory, setCookie, events } from '../../../../lib/utils';
import modalMarkup from './lib/modal';

/**
 * {{WB064}} - {{Test Description}}
 */
// http://res.cloudinary.com/wolfandbadger/image/upload/s--OH-dsN1n--/v1522320065/uc/OptimizedSaas.gif
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'WB064',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;

      return {
        bodyVar,
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
      contentBuilder: () => {
        let slideQ = true;
        const $ = window.jQuery;
        $('html, body').animate({
          scrollTop: 0,
        }, 300);
        setTimeout(() => {
          events.send(`${Exp.settings.ID}`, 'View', 'SaaS modal has been shown', { sendOnce: true });
          Exp.cache.bodyVar.classList.add('WB064_no-scroll');

          document.body.insertAdjacentHTML('beforeend', modalMarkup);
          const modal = $('.WB064_pop-up_modal');
          const modalBG = modal.find('.WB064_body_click');
          modal.fadeIn(() => { slideQ = false; });
          setCookie('WB064', 'Seen', 2000000000);

          modal.find('.WB064_close_btn').on('click', (e) => {
            if (slideQ === false) {
              slideQ = true;
              e.preventDefault();

              if (modal.hasClass('active')) {
                modal.fadeOut('slow', () => {
                  modal.removeClass('active');
                  slideQ = false;
                  Exp.cache.bodyVar.classList.remove('WB064_no-scroll');
                });
              } else {
                modal.fadeIn('slow', () => {
                  modal.addClass('active');
                  slideQ = false;
                });
              }
            }
          });

          modalBG.on('click', () => {
            if (modal.hasClass('active') && slideQ === false) {
              modal.fadeOut('slow', () => {
                modal.removeClass('active');
                Exp.cache.bodyVar.classList.remove('WB064_no-scroll');
                slideQ = false;
              });
            }
          });
        }, 300);
      },
    },
  };

  Exp.init();
};

export default Run;
