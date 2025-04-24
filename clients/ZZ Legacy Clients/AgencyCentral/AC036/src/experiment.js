import { fullStory, getCookie, setCookie, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
import searchFooterHTML from './searchFooterHTML';
import searchModalHTML from './searchModalHTML';

/**
 * {{AC024}} - {{Assisted Search Button}}
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'AC036',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const URLQ = window.location.search;
      const userBar = document.getElementById('user-bar');
      const userBarText = userBar.querySelector('.user-bar-text');
      const userBarClose = userBar.querySelector('.user-option-close');
      const favBtn = bodyVar.querySelector('#favourites-navbar-button');

      return {
        bodyVar,
        userBar,
        userBarText,
        userBarClose,
        favBtn,
        URLQ,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      if (!document.body.classList.contains('AC024')) {
        Exp.cache.bodyVar.classList.add(settings.ID);
        services.tracking();

        components.userOptionClick();
        components.identifyUser();
        components.searchPage.urlCheck();
        components.stillSearchingModal.urlCheck();
      }
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      fadeOut: (el) => {
        const elem = el;
        let op = 1;
        const timer = setInterval(() => {
          if (op <= 0.1) {
            clearInterval(timer);
            elem.style.display = 'none';
          }
          elem.style.opacity = op;
          op -= op * 0.1;
        }, 10);
      },
      fadeIn: (el) => {
        const elem = el;
        let op = 0;
        elem.style.opacity = op;
        elem.style.display = 'inline-block';

        const timer = setInterval(() => {
          if (op >= 1.0) {
            clearInterval(timer);
          }
          elem.style.opacity = op;
          op += 0.1;
        }, 10);
      },
    },
    components: {
      userOptionClick: () => {
        const empUserOption = Exp.cache.userBar.querySelector('.user-option[data-value="emp"]');

        empUserOption.addEventListener('click', () => {
          Exp.cache.bodyVar.classList.add('AC024_emp-msg');
          Exp.cache.userBarText.innerHTML = 'As an employer, you have access to our assisted search phoneline.<br /> Call 0345 557 8401 and let our team help you find the perfect agency for you.';

          Exp.cache.userBarClose.addEventListener('click', () => {
            Exp.cache.bodyVar.classList.add('AC024_hide');
          });
        });
      },
      identifyUser: () => {
        const empOrCandCookie = getCookie('empOrCand');

        if (empOrCandCookie && empOrCandCookie.toString().toLowerCase() === 'emp') {
          Exp.cache.favBtn.insertAdjacentHTML('afterend', '<div class="AC024_call-wrap"><a class="AC024_call-btn"><i class="fa fa-phone"></i></a><div class="AC024_phone_modal-wrap"><div class="AC024_phone-modal"><span>▲</span><div>You are eligible for our assisted search!<br /> Call 0345 557 8401</div></div></div></div>');
          Exp.components.callBtnClick();
        }
      },
      callBtnClick: () => {
        const callBtn = document.querySelector('.AC024_call-btn');

        callBtn.addEventListener('click', () => {
          events.send('AC024', 'Header Phone button clicked', 'User clicked the employer only button in the header', { sendOnce: true });
          callBtn.parentNode.classList.toggle('AC024_show-msg');
        });
      },
      searchPage: {
        urlCheck: () => {
          if (Exp.cache.URLQ.indexOf('&emp_cand=emp') > -1) {
            poller([
              '#search-results-container',
            ], Exp.components.searchPage.render);
          }
        },
        render: () => {
          document.getElementById('search-results-container').insertAdjacentHTML('afterend', searchFooterHTML);
          document.querySelector('.AC024_search_block .AC024_tel-link').addEventListener('click', () => {
            events.send('AC024', 'Footer Telephone link clicked', 'User clicked the telephone number in the footer module', { sendOnce: true });
          });
        },
      },
      stillSearchingModal: {
        urlCheck: () => {
          if (Exp.cache.URLQ.indexOf('&page=') > -1 && Exp.cache.URLQ.indexOf('&page=2') === -1 && Exp.cache.URLQ.indexOf('&page=1') === -1 && getCookie('AC024_modal') !== 'true') {
            events.send('AC024', 'Modal Displayed', 'User shown modal', { sendOnce: true });
            Exp.components.stillSearchingModal.render();
          }
        },
        render: () => {
          Exp.cache.bodyVar.insertAdjacentHTML('beforeend', searchModalHTML);
          document.querySelector('.pop-up_modal .AC024_tel-link').addEventListener('click', () => {
            events.send('AC024', 'Footer Telephone link clicked', 'User clicked the telephone number in the modal', { sendOnce: true });
          });
          setCookie('AC024_modal', 'true', 200000000);

          let slideQ = false;
          const modal = document.querySelector('.pop-up_modal');
          const modalBG = modal.querySelector('.body_click');

          slideQ = true;
          Exp.services.fadeIn(modal);
          setTimeout(() => {
            modal.classList.add('active');
            slideQ = false;
          }, 1000);

          modal.querySelector('.pop-up_modal .close_btn').addEventListener('click', () => {
            if (slideQ === false) {
              slideQ = true;
              Exp.services.fadeOut(modal);
              setTimeout(() => {
                modal.classList.remove('active');
                slideQ = false;
              }, 1000);
            }
          });
          modalBG.addEventListener('mousedown', () => {
            if (modal.classList.contains('active') && slideQ === false) {
              Exp.services.fadeOut(modal);
              setTimeout(() => {
                modal.classList.remove('active');
                slideQ = false;
              }, 1000);
            }
          });
        },
      },
    },
  };

  Exp.init();
};

export default Run;
