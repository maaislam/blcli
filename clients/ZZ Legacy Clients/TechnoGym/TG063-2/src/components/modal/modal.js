import settings from '../../lib/settings';

const { ID } = settings;

export default class Modal {
  constructor(options) {
    const opts = options || {};
    this.lang = opts.lang;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_modalWrap`);
    if (this.lang === 'EN') {
      element.innerHTML = `
        <div class="${ID}_modal">
          <div class="${ID}_modal__header">
          <span class="${ID}_modal__title"><i class="fa fa-check-circle-o"></i>Form Successfully Submitted</span>
          <label for="triggerModal"><i class="fa fa-times-circle-o"></i></label>
          </div>
          <div class="${ID}_modal__body">
            <div class="${ID}_newsletter">
              <h3 class="${ID}_newsletter__title">Don't miss out</h3>
              <p class="${ID}_newsletter__content">Join our newsletter for innovative training programmes, 
              news about products, exclusive special offers and top tips on developing a wellness lifestyle.</p>
              <form action="https://www.technogym.com/gb/newsletter/subscriber/new/" class="${ID}_newsletter__form" method="post">
                <input class="${ID}_newsletter__formInput" type="email" name="pre-email" id="newsletter-pre-email" placeholder="Your Email">
                <span class="${ID}_newsletter__formSubmit">Submit</span>
              </form>
            </div>
            <span>or</span>
            <a href="https://www.technogym.com/gb/products.html" class="${ID}_newsletter__formSubmit">view technogym products</a>
          </div>
        </div>
    `;
    } else {
      element.innerHTML = `
        <div class="${ID}_modal">
          <div class="${ID}_modal__header">
          <span class="${ID}_modal__title"><i class="fa fa-check-circle-o"></i>Iscrizione Effettuata</span>
          <label for="triggerModal"><i class="fa fa-times-circle-o"></i></label>
          </div>
          <div class="${ID}_modal__body">
            <div class="${ID}_newsletter">
              <h3 class="${ID}_newsletter__title">Rimani aggiornato</h3>
              <p class="${ID}_newsletter__content">Iscriviti alla nostra Newsletter per ricevere consigli sull'allenamento e sullo stile di vita Wellness, news sui nostri prodotti e gli esclusivi benefici della nostra Community</p>
              <form action="https://www.technogym.com/it/newsletter/subscriber/new/" class="${ID}_newsletter__form" method="post">
                <input class="${ID}_newsletter__formInput" type="email" name="pre-email" id="newsletter-pre-email" placeholder="La Tua Email">
                <span class="${ID}_newsletter__formSubmit">Invia</span>
              </form>
            </div>
            <span>oppure</span>
            <a href="https://www.technogym.com/gb/products.html" class="${ID}_newsletter__formSubmit">scopri i prodotti technogym</a>
          </div>
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
        <p>You have successfully registered.</p>
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
        <p>Iscrizione effettuata correttamente.</p>
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
    const trigger = document.createElement('input');
    trigger.type = 'checkbox';
    trigger.name = 'triggerModal';
    trigger.id = 'triggerModal';
    document.querySelector('body').insertAdjacentElement('beforeend', trigger);
    document.querySelector('body').insertAdjacentElement('beforeend', this.component);
  }
}
