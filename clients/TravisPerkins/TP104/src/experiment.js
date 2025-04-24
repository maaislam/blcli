import { fullStory, events, setCookie, deleteCookie } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{TP104}} - {{Test Description}}
 */
const Run = () => {
  let slideQ = false;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP104',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const basketWrap = bodyVar.querySelector('#cart');

      return {
        bodyVar,
        basketWrap,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
      components.bind();
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
      contentBuilder: () => {
        Exp.cache.basketWrap.insertAdjacentHTML('beforeend', `
          <section class="TP104_wrap">
            <h3>Already have an account?</h3>
            <div class="TP104_toggle-wrap">
              <div class="TP104_toggle-img TP104_active">
                <img src="//sb.monetate.net/img/1/581/1580558.png" />
              </div>
              <div class="TP104_toggle-img">
                <img src="//sb.monetate.net/img/1/581/1580559.png" />
              </div>
              <div class="TP104_toggle-img">
                <img src="//sb.monetate.net/img/1/581/1580560.png" />
              </div>
            </div>
            <div class="TP104_toggle-target">
              <div class="TP104_toggle-text TP104_active">
                <p class="TP104_quote"><span>“</span>I always log in to checkout because it saves time as it saves my info<span>”</span></p>
                <p class="TP104_person">James, 25-34, Joiner</p>
              </div>
              <div class="TP104_toggle-text">
                <p class="TP104_quote"><span>“</span>You don’t get a proper discount unless you use your account<span>”</span></p>
                <p class="TP104_person">John, 55-64, Builder</p>
              </div>
              <div class="TP104_toggle-text">
                <p class="TP104_quote"><span>“</span>I always login in case I need an accurate quote and it saves time<span>”</span></p>
                <p class="TP104_person">Diana, 50-59, Landscaper</p>
              </div>
            </div>
            <a class="TP104_login" href="//www.travisperkins.co.uk/cart">Log in</a>
          </section>
        `);
      },
      bind() {
        const toggleImg = Exp.cache.bodyVar.querySelectorAll('.TP104_toggle-wrap .TP104_toggle-img');
        const toggleContent = Exp.cache.bodyVar.querySelectorAll('.TP104_toggle-target .TP104_toggle-text');
        const loginBtn = Exp.cache.bodyVar.querySelector('.TP104_login');
        const eventJSON = {
          0: true,
          1: false,
          2: false,
        };

        loginBtn.addEventListener('click', () => {
          events.send(Exp.settings.ID, 'Click', 'Login button clicked');
          setCookie('TP104', 'RedirectToCart', 200000000);
        });

        poller([
          () => {
            let trigger = false;
            if (window.jQuery) {
              trigger = true;
            }
            return trigger;
          },
        ], () => {
          const $ = window.jQuery;

          [].forEach.call(toggleImg, (item, index) => {
            item.addEventListener('click', () => {
              if (!item.classList.contains('TP104_active') && slideQ === false) {
                slideQ = true;
                const currActive = Exp.cache.bodyVar.querySelector('.TP104_toggle-text.TP104_active');
                const currActiveImg = Exp.cache.bodyVar.querySelector('.TP104_toggle-img.TP104_active');

                currActiveImg.classList.remove('TP104_active');
                item.classList.add('TP104_active');

                eventJSON[index] = true;
                if (eventJSON[1] === true && eventJSON[2] === true) {
                  events.send(Exp.settings.ID, 'Clicked', 'User viewed all 3 quotes');
                }

                $(currActive).slideUp(() => {
                  $(toggleContent[index]).slideDown(() => {
                    currActive.classList.remove('TP104_active');
                    toggleContent[index].classList.add('TP104_active');
                    slideQ = false;
                  });
                });
              }
            });
          });
        });

        const viewMore = Exp.cache.bodyVar.querySelector('#view-more-btn');
        const viewLess = Exp.cache.bodyVar.querySelector('#view-less-btn');
        const content = document.querySelector('#content');

        viewMore.addEventListener('click', () => {
          content.classList.add('TP104_margin');
        });

        viewLess.addEventListener('click', () => {
          content.classList.remove('TP104_margin');
        });
      },
    },
  };

  Exp.init();
};

const Login = () => {
  const hide = document.createElement('style');
  hide.type = 'text/css';
  hide.setAttribute('id', 'TP104');
  hide.appendChild(document.createTextNode('body {display:none!important}'));
  document.head.appendChild(hide);
  setCookie('TP104', 'Cart', 200000000);
  window.location.href = 'https://www.travisperkins.co.uk/login';
};

const Redirect404 = () => {
  const hide = document.createElement('style');
  hide.type = 'text/css';
  hide.setAttribute('id', 'TP104');
  hide.appendChild(document.createTextNode('body {display:none!important}'));
  document.head.appendChild(hide);
  deleteCookie('TP104');
  window.location.href = 'https://www.travisperkins.co.uk/cart';
};

export { Run, Login, Redirect404 };
