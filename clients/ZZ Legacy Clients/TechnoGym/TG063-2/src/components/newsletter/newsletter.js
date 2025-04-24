import settings from '../../lib/settings';

const { ID } = settings;

export default class NewsLetter {
  constructor(options) {
    const opts = options || {};
    this.lang = opts.lang;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_newsletterWrap`);
    if (this.lang === 'EN') {
      element.innerHTML = `
        <div class="${ID}_newsletter">
          <h3 class="${ID}_newsletter__title">Don't miss out</h3>
          <p class="${ID}_newsletter__content">Join our newsletter for innovative training programmes, 
          news about products, exclusive special offers and top tips on developing a wellness lifestyle.</p>
          <form action="https://www.technogym.com/it/newsletter/subscriber/new/" class="${ID}_newsletter__form" method="post">
            <input class="${ID}_newsletter__formInput" type="email" name="pre-email" id="newsletter-pre-email" placeholder="Your Email">
            <span class="${ID}_newsletter__formSubmit">Submit</span>
          </form>
        </div>
      `;
    } else {
      element.innerHTML = `
        <div class="${ID}_newsletter">
          <h3 class="${ID}_newsletter__title">Rimani Aggiornato</h3>
          <p class="${ID}_newsletter__content">Iscriviti all newsletter e ricevi programmi di allenamento, 
          news sui prodotti, offerte esclusive e suggerimenti su come avere uno stile di vita sano.</p>
          <form action="https://www.technogym.com/it/newsletter/subscriber/new/" class="${ID}_newsletter__form" method="post">
            <input class="${ID}_newsletter__formInput" type="email" name="pre-email" id="newsletter-pre-email" placeholder="La Tua Email">
            <span class="${ID}_newsletter__formSubmit">Invia</span>
          </form>
        </div>
      `;
    }
    this.component = element;
  }

  bindEvents() {
    const formKey = document.querySelector('input[name="form_key"]').value;
    const subscribeButton = this.component.querySelector(`.${ID}_newsletter__formSubmit`);
    const lang = document.querySelector('body').classList.contains(`${ID}_italian`);
    const successBlock = `
      <div class="ns-box-inner">
        <span class="fa fa-check"></span>
        <p>Your enquiry was submitted and will be responded to as soon as possible. Thank you for contacting us.</p>
      </div>
      <span class="ns-close"></span>
    `;
    const errorBlock = `
      <div class="ns-box-inner">
        <span class="fa fa-times"></span>
        <p>Unable to submit your request. Please, try again later.</p>
      </div>
      <span class="ns-close"></span>
    `;
    const successBlockIT = `
      <div class="ns-box-inner">
        <span class="fa fa-check"></span>
        <p>La tua richiesta è stata inoltrata, riceverai risposta nel più breve tempo possibile. Grazie per averci contattato.</p>
      </div>
      <span class="ns-close"></span>
    `;
    const errorBlockIT = `
      <div class="ns-box-inner">
        <span class="fa fa-times"></span>
        <p>Impossibile inviare la tua richiesta. Riprova più tardi.</p>
      </div>
      <span class="ns-close"></span>
    `;
    subscribeButton.addEventListener('click', () => {
      const emailAddr = this.component.querySelector('#newsletter-pre-email').value;
      const request = new XMLHttpRequest();
      const data = `campaign=0&form_key=${formKey}&control_value=Pk&email=&pre-email=${encodeURIComponent(emailAddr)}&email_Pk=${encodeURIComponent(emailAddr)}&firstname_Pk=&lastname_Pk=&interest%5B%5D=well-life&secure_field_check=`;
      request.open('POST', this.component.querySelector(`.${ID}_newsletter__form`).action, true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const el = document.createElement('div');
          el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-success', 'ns-show');
          el.innerHTML = lang ? successBlockIT : successBlock;
          document.querySelector('body').insertAdjacentElement('afterbegin', el);
          const closeButton = el.querySelector('.ns-close');
          closeButton.addEventListener('click', () => {
            el.remove();
          });
        } else {
          const el = document.createElement('div');
          el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
          el.innerHTML = lang ? errorBlockIT : errorBlock;
          document.querySelector('body').insertAdjacentElement('afterbegin', el);
          const closeButton = el.querySelector('.ns-close');
          closeButton.addEventListener('click', () => {
            el.remove();
          });
        }
      };
      request.onerror = () => {
        const el = document.createElement('div');
        el.classList.add('ns-box', 'ns-bar', 'ns-effect-slidetop', 'ns-type-error', 'ns-show');
        el.innerHTML = lang ? errorBlockIT : errorBlock;
        document.querySelector('body').insertAdjacentElement('afterbegin', el);
        const closeButton = el.querySelector('.ns-close');
        closeButton.addEventListener('click', () => {
          el.remove();
        });
      };
      request.send(data);
    });
  }

  render() {
    document.querySelector('.filoblu-storelocator-view-holder').insertAdjacentElement('afterend', this.component);
  }
}
