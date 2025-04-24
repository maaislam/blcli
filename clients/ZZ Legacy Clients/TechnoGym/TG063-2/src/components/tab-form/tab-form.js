import settings from '../../lib/settings';
import { TabFormData } from '../../data/form-content';
import { submitForm } from '../../lib/services';

const { ID } = settings;
const { VARIATION } = settings;

export default class TabForm {
  constructor(options) {
    const opts = options || {};
    this.lang = opts.lang;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const generateLabel = (el, tabLabel, tabIcon) => `
      <div class="${ID}_tab-form__headerItemWrap">
        <label class="${ID}_tab-form__headerItem ${el === 'mail' ? 'active' : ''}" for="${el}">
          <i class="${tabIcon}"></i>
          ${tabLabel}
        </label>
      </div>
      <!--end item-->
    `;
    const generateBlock = v => `
      <div class="${ID}_tab-form__inputBlock">
        <label class="${ID}_tab-form__inputLabel">${v.label} ${v.required ? '<strong>*</strong>' : ''}</label>

        ${v.type ? `<${v.type === 'textarea' ? 'textarea rows="4" cols="50"' : 'input'} 
        class="${v.type === 'textarea' ? `${ID}_tab-form__inputTextarea` : `${ID}_tab-form__input`}" 
        type="${v.type}" 
        id="${v.id}" 
        name="${v.name}" 
        ${v.required ? 'required' : ''}>
        ${v.type === 'textarea' ? '</textarea>' : ''}` : ''}
        <i class="fa fa-check-circle ${ID}_tab-form__validate"></i>
        <i class="fa fa-times-circle ${ID}_tab-form__error"></i>
        ${v.hint ? `<span class="${ID}_tab-form__errorHint">${v.hint}</span> ` : ''}
        ${v.select ? v.select : ''}
      </div>
      <!--end block-->
    `;
    const generateForm = (key, formFields, lang) => `
      <div class="${ID}_tab-form__bodyWrap">
        <input type="radio" name="tabTrigger" id="${key}" ${key === 'mail' ? 'checked' : ''}>
        <form class="${ID}_tab-form__body" action="https://www.technogym.com/gb/contacts/index/post/" id="contactForm--${key}" method="post" novalidate>
          ${formFields.map(generateBlock).join(' ')}
          <div class="privacyPolicy">
            <input type="checkbox" name="privacy" id="privacy" required>
            ${lang === 'EN' ? '<label for="privacy">I agree to the <a href="https://www.technogym.com/gb/terms-of-use/" target="_blank">TechoGym Terms</a> of us of <a href="https://www.technogym.com/gb/privacy-policy/" target="_blank">Privacy Policy</a></label>' : '<label for="privacy">Acconsento ai termini <a href="https://www.technogym.com/it/terms-of-use/" target="_blank">TechoGym</a> sul trattamento dei dati e alla <a href="https://www.technogym.com/it/privacy-policy/" target="_blank">Privacy Policy</a></label>'}
          </div>
          <span class="${ID}_tab-form__submit">${lang === 'EN' ? 'Submit' : 'Invia'}</span>
        </form>
      </div>
    `;
    const element = document.createElement('div');
    element.classList.add(`${ID}_tab-formWrap`);
    if (this.lang === 'EN') {
      const keys = Object.keys(TabFormData[`${this.lang}`]);
      let formContent = '';
      let headers = '';
      for (let i = 0; i < keys.length; i += 1) {
        const el = TabFormData[`${this.lang}`][keys[i]];
        const key = keys[i];
        headers += generateLabel(key, el.tabLabel, el.tabIcon);
        formContent += generateForm(key, el.formFields, this.lang);
      }
      element.innerHTML = `
        <div class="${ID}_tab-form">
          <div class="${ID}_tab-form__header">
          ${headers}
          </div>
          <!--end header-->
          ${formContent}
        </div>
        <!--end tabs-->
        <div class="${ID}_contact-blockWrap">
          <div class="${ID}_contact-block">
            <span>or</span>
            <h3 class="${ID}_contact-block__title">Call us on 0800 316 2496</h3>
            <span class="${ID}_contact-block__text">For spare parts and service contracts: <strong>01344 300236</strong></span>
            <span class="${ID}_contact-block__text">For technical assistance: <strong>01344 823700</strong></span>
          </div>
        </div>
    `;
    } else {
      const keys = Object.keys(TabFormData[`${this.lang}`]);
      let formContent = '';
      let headers = '';
      for (let i = 0; i < keys.length; i += 1) {
        const el = TabFormData[`${this.lang}`][keys[i]];
        const key = keys[i];
        headers += generateLabel(key, el.tabLabel, el.tabIcon);
        formContent += generateForm(key, el.formFields, this.lang);
      }
      element.innerHTML = `
        <div class="${ID}_tab-form">
          <div class="${ID}_tab-form__header">
          ${headers}
          </div>
          <!--end header-->
          ${formContent}
        </div>
        <!--end tabs-->
        <div class="${ID}_contact-blockWrap">
          <div class="${ID}_contact-block">
            <span>oppure</span>
            <h3 class="${ID}_contact-block__title">Contattaci all' 800 70 70 70</h3>
            <span class="${ID}_contact-block__text">Mobile: <strong>+39 0547 56047</strong></span>
            <span class="${ID}_contact-block__text">Fax: <strong>+39 0547 650505</strong></span>
          </div>
        </div>
    `;
    }
    this.component = element;
  }

  bindEvents() {
    //Remove active class
    const elements = this.component.querySelectorAll(`.${ID}_tab-form__headerItemWrap`);
    const labelsList = this.component.querySelectorAll(`.${ID}_tab-form__headerItem`);
    Array.from(elements).map(item => item.addEventListener('click', (e) => {
      for (let i = 0; i < labelsList.length; i += 1) {
        labelsList[i].classList.remove('active');
      }
      if (e.target.classList.contains('active')) {
        e.target.classList.remove('active');
      } else {
        e.target.classList.add('active');
      }
    }));
    //Check if the user has entered a valid data
    const field = this.component.querySelectorAll(`.${ID}_tab-form__input`);
    Array.from(field).map(item => item.addEventListener('focusout', (e) => {
      const val = e.target.value;
      const elType = e.target.type;
      switch (elType) {
        case 'email': {
          const reg = RegExp(/^.+@.+$/);
          const res = reg.test(val);
          if (res) {
            e.target.parentNode.classList.remove('not-valid');
            e.target.parentNode.classList.add('valid');
          } else {
            e.target.parentNode.classList.remove('valid');
            e.target.parentNode.classList.add('not-valid');
          }
          break;
        }
        case 'text': {
          if (val !== '') {
            e.target.parentNode.classList.remove('not-valid');
            e.target.parentNode.classList.add('valid');
          } else {
            e.target.parentNode.classList.remove('valid');
            e.target.parentNode.classList.add('not-valid');
          }
          break;
        }
        case 'tel': {
          const reg = RegExp(/^\+?(\d.*){3,}$/);
          const res = reg.test(val);
          if (res) {
            e.target.parentNode.classList.remove('not-valid');
            e.target.parentNode.classList.add('valid');
          } else {
            e.target.parentNode.classList.remove('valid');
            e.target.parentNode.classList.add('not-valid');
          }
          break;
        }
        default:
          break;
      }
    }));
    const message = this.component.querySelectorAll(`.${ID}_tab-form__inputTextarea`);
    Array.from(message).map(item => item.addEventListener('focusout', (e) => {
      const val = e.target.value;
      if (val) {
        e.target.parentNode.classList.remove('not-valid');
        e.target.parentNode.classList.add('valid');
      } else {
        e.target.parentNode.classList.remove('valid');
        e.target.parentNode.classList.add('not-valid');
      }
    }));
    //Send the POST request
    const send = this.component.querySelectorAll(`.${ID}_tab-form__submit`);
    Array.from(send).forEach((sender) => {
      sender.addEventListener('click', () => {
        const formId = sender.closest(`.${ID}_tab-form__body`).getAttribute('id');
        const len = formId.length;
        const cleanStr = formId.substr(13, len);
        submitForm(VARIATION, cleanStr);
      });
    });
  }

  render() {
    document.querySelector('.forms').insertAdjacentElement('afterend', this.component);
  }
}
