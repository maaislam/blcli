import { fullStory, events } from '../../../../lib/utils';

/**
 * {{TP105}} - {{Test Description}}
 */
const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP105',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const basketWrap = bodyVar.querySelector('.guestCheckoutContainer');

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
      components.slideShow();
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
        Exp.cache.basketWrap.insertAdjacentHTML('afterend', `
          <section class="TP105_wrap">
            <h3><span>or</span> Already have an account?</h3>
            <div class="TP105_slider">
              <div class="TP105_toggle-wrap">
                <div class="TP105_toggle-img TP105_active">
                  <img src="//sb.monetate.net/img/1/581/1580558.png" />
                </div>
                <div class="TP105_toggle-text TP105_active">
                  <p class="TP105_quote"><span>“</span>I always log in to checkout because it saves time as it saves my info<span>”</span></p>
                  <p class="TP105_person">James, 25-34, Joiner</p>
                </div>
              </div>
              <div class="TP105_toggle-wrap">
                <div class="TP105_toggle-img">
                  <img src="//sb.monetate.net/img/1/581/1580559.png" />
                </div>
                <div class="TP105_toggle-text">
                  <p class="TP105_quote"><span>“</span>You don’t get a proper discount unless you use your account<span>”</span></p>
                  <p class="TP105_person">John, 55-64, Builder</p>
                </div>
              </div>
              <div class="TP105_toggle-wrap">
                <div class="TP105_toggle-img">
                  <img src="//sb.monetate.net/img/1/581/1580560.png" />
                </div>
                <div class="TP105_toggle-text">
                  <p class="TP105_quote"><span>“</span>I always login in case I need an accurate quote and it saves time<span>”</span></p>
                  <p class="TP105_person">Diana, 50-59, Landscaper</p>
                </div>
              </div>
            </div>
            <a class="TP105_login" href="//www.travisperkins.co.uk/cart">Log in</a>
          </section>
        `);
      },
      bind() {
        const toggleImg = Exp.cache.bodyVar.querySelectorAll('.TP105_toggle-wrap .TP105_toggle-img');
        const loginBtn = Exp.cache.bodyVar.querySelector('.TP105_login');
        const eventJSON = {
          0: true,
          1: false,
          2: false,
        };

        loginBtn.addEventListener('click', () => {
          events.send(Exp.settings.ID, 'Click', 'Login button clicked');
          localStorage.setItem('TP105', 'RedirectToCart');
        });

        [].forEach.call(toggleImg, (item, index) => {
          item.addEventListener('click', () => {
            eventJSON[index] = true;
            if (eventJSON[1] === true && eventJSON[2] === true) {
              events.send(Exp.settings.ID, 'Clicked', 'User viewed all 3 quotes');
            }
          });
        });
      },
      slideShow() {
        $.getScript('//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', () => {
          $(Exp.cache.bodyVar.querySelector('.TP105_slider')).slick({
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 5000,
            autoplay: true,
          });
          Exp.components.bind();
        });
      },
    },
  };

  Exp.init();
};
const Login = () => {
  const hide = document.createElement('style');
  hide.type = 'text/css';
  hide.setAttribute('id', 'TP105');
  hide.appendChild(document.createTextNode('body {display:none!important}'));
  document.head.appendChild(hide);
  localStorage.clear('TP105');
  window.location.href = 'https://www.travisperkins.co.uk/login';
};

const Redirect404 = () => {
  const hide = document.createElement('style');
  hide.type = 'text/css';
  hide.setAttribute('id', 'TP104');
  hide.appendChild(document.createTextNode('body {display:none!important}'));
  document.head.appendChild(hide);
  localStorage.clear('TP104');
  window.location.href = 'https://www.travisperkins.co.uk/cart';
};

export { Run, Login, Redirect404 };
