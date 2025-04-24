import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import markup from './lib/buttonMarkup';
import mbMarkup from './lib/mobileMarkup';

/**
 * {{HH004}} - {{Test Description}}
 */
const Run = () => {
  let slideQ = false;
  let $ = null;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'HH004',
      VARIATION: '1',
    },
    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;
      const mobileNav = doc.getElementById('mobile-call-block');

      return {
        doc,
        bodyVar,
        mobileNav,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      contentBuilder() {
        const URL = window.location.pathname;
        const reg = /our-locations+\/+[a-zA-Z0-9]+/;
        let locationPage = false;
        let title;
        let number;

        if (Exp.settings.VARIATION === '2' && URL.match(reg)) {
          pollerLite([
            '#sidebar .branch-details h2 +.row .col-md-12:first-child p:first-child .phone_ctp .InfinityNumber.clickable a',
          ], () => {
            locationPage = true;
            title = Exp.cache.bodyVar.querySelector('h1').textContent.trim();
            number = Exp.cache.bodyVar.querySelector('#sidebar .branch-details h2 +.row .col-md-12:first-child p:first-child .phone_ctp .InfinityNumber.clickable a').textContent.trim();

            Exp.cache.bodyVar.insertAdjacentHTML('beforeend', markup(locationPage, title, number));

            Exp.cache.bodyVar.querySelector('.mobile-call-us-btn').textContent = 'Contact Us';
            Exp.cache.mobileNav.innerHTML = mbMarkup(locationPage, title, number);
            Exp.components.bindEvents();
          });
        } else {
          Exp.cache.bodyVar.insertAdjacentHTML('beforeend', markup(locationPage, title, number));

          Exp.cache.bodyVar.querySelector('.mobile-call-us-btn').textContent = 'Contact Us';
          Exp.cache.mobileNav.innerHTML = mbMarkup(locationPage, title, number);
          Exp.components.bindEvents();
        }
      },
      bindEvents() {
        const revealCallOptions = Exp.cache.bodyVar.querySelector('.HH004_call-cta');
        const callOptions = Exp.cache.bodyVar.querySelector('.HH004_contact-reveal-call');

        const revealMoreOptions = Exp.cache.bodyVar.querySelector('.HH004_more-cta');
        const moreOptions = Exp.cache.bodyVar.querySelector('.HH004_contact-reveal-more');

        const leaveAMessage = Exp.cache.bodyVar.querySelector('.HH004_leave_msg');
        const closeBtns = Exp.cache.bodyVar.querySelectorAll('.HH004_close');

        const revealMoreEmails = Exp.cache.bodyVar.querySelector('.HH004_open-email');
        const emailOptions = Exp.cache.bodyVar.querySelector('.HH004_contact-reveal-emails');

        revealCallOptions.addEventListener('click', () => {
          if (slideQ === false) {
            slideQ = true;
            if (callOptions.classList.contains('HH_active')) {
              callOptions.classList.remove('HH_active');
              revealCallOptions.classList.remove('HH_active-btn');
            } else {
              callOptions.classList.add('HH_active');
              revealCallOptions.classList.add('HH_active-btn');
            }
            
            if (moreOptions.classList.contains('HH_active')) {
              moreOptions.classList.remove('HH_active');
              revealMoreOptions.classList.remove('HH_active-btn');
              emailOptions.classList.remove('HH_active');
            }
            events.send(`${Exp.settings.ID}`, 'Click', 'User clicked on Call Us', { sendOnce: true });
            setTimeout(() => { slideQ = false; }, 600);
          }
        });

        revealMoreOptions.addEventListener('click', () => {
          if (slideQ === false) {
            slideQ = true;
            if (moreOptions.classList.contains('HH_active')) {
              moreOptions.classList.remove('HH_active');
              revealMoreOptions.classList.remove('HH_active-btn');
              emailOptions.classList.remove('HH_active');
            } else {
              moreOptions.classList.add('HH_active');
              revealMoreOptions.classList.add('HH_active-btn');
            }

            if (callOptions.classList.contains('HH_active')) {
              callOptions.classList.remove('HH_active');
              revealCallOptions.classList.remove('HH_active-btn');
            }
            setTimeout(() => { slideQ = false; }, 600);
          }
        });

        revealMoreEmails.addEventListener('click', () => {
          if (slideQ === false) {
            slideQ = true;
            if (emailOptions.classList.contains('HH_active')) {
              emailOptions.classList.remove('HH_active');
              revealMoreEmails.classList.remove('HH_active-btn');
            } else {
              emailOptions.classList.add('HH_active');
              revealMoreEmails.classList.add('HH_active-btn');
            }
            
            setTimeout(() => { slideQ = false; }, 600);
          }
        });

        [].forEach.call(closeBtns, (item) => {
          item.addEventListener('click', (e) => {
            const itemParent = item.parentNode;
            if (slideQ === false && itemParent.classList.contains('HH_active')) {
              slideQ = true;
              itemParent.classList.remove('HH_active');
              if (!itemParent.classList.contains('HH004_contact-reveal-emails')) {
                revealCallOptions.classList.remove('HH_active-btn');
                revealMoreOptions.classList.remove('HH_active-btn');
                emailOptions.classList.remove('HH_active');
              }
              setTimeout(() => { slideQ = false; }, 600);
            }
          });
        });
        
        leaveAMessage.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'User clicked on Leave a message', { sendOnce: true });
          window.LC_API.open_chat_window();
        });

        // Mobile bindings
        const ddBtn = Exp.cache.bodyVar.querySelectorAll('.HH004_reveal-next');
        const revealMB = Exp.cache.bodyVar.querySelector('.mobile-call-us-btn');
        const mbOptions = Exp.cache.bodyVar.querySelector('#mobile-call-block > section');
        const requestEvent = Exp.cache.bodyVar.querySelectorAll('.HH004_contact-btn');

        [].forEach.call(requestEvent, (item) => {
          item.addEventListener('click', () => {
            const content = item.textContent;
            events.send(`${Exp.settings.ID}`, `Click', 'User clicked on ${content}`, { sendOnce: true });
          });
        });

        pollerLite([
          () => {
            let trigger = false;
            if (window.jQuery) trigger = true;
            return trigger;
          },
        ], () => {
          $ = window.jQuery;
          const $mbOptions = $(mbOptions);

          [].forEach.call(ddBtn, (item) => {
            item.addEventListener('click', () => {
              if (slideQ === false) {
                const revealTab = item.nextElementSibling;
                const $revealTab = $(revealTab);
                const checkActive = Exp.cache.bodyVar.querySelector('.HH004_reveal-next.HH_active-btn');
                slideQ = true;

                if (revealTab.classList.contains('HH_active')) {
                  revealTab.classList.remove('HH_active');
                  $revealTab.slideUp();
                  item.classList.remove('HH_active-btn');
                } else {
                  revealTab.classList.add('HH_active');
                  $revealTab.slideDown();
                  item.classList.add('HH_active-btn');
                }
                
                if (item.classList.contains('HH004_call-event')) {
                  events.send(`${Exp.settings.ID}`, 'Click', 'User clicked on Call Us Dropdown', { sendOnce: true });
                } else if (item.classList.contains('HH004_email-event')) {
                  events.send(`${Exp.settings.ID}`, 'Click', 'User clicked on Email Us Dropdown', { sendOnce: true });
                } 

                setTimeout(() => { slideQ = false; }, 400);
              }
            });
          });

          revealMB.addEventListener('click', () => {
            if (slideQ === false) {
              slideQ = true;
              if (mbOptions.classList.contains('HH_active-mb')) {
                mbOptions.classList.remove('HH_active-mb');
                $mbOptions.slideUp();
                revealMB.classList.remove('HH_active-btn');
              } else {
                mbOptions.classList.add('HH_active-mb');
                $mbOptions.slideDown();
                revealMB.classList.add('HH_active-btn');
              }
              
              if (moreOptions.classList.contains('HH_active-mb')) {
                moreOptions.classList.remove('HH_active-mb');
                revealMoreOptions.classList.remove('HH_active-btn');
                emailOptions.classList.remove('HH_active');
              }
              setTimeout(() => { slideQ = false; }, 400);
            }
          });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
