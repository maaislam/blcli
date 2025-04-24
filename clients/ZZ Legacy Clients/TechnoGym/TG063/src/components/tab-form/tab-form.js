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
        <label class="${ID}_tab-form__headerItem ${el === 'call' ? 'active' : ''}" for="${el}">
          <i class="${tabIcon}"></i>
          ${tabLabel}
        </label>
      </div>
      <!--end item-->
    `;
    const generateBlock = v => `
      <div class="${ID}_tab-form__inputBlock">
        <label class="${ID}_tab-form__inputLabel">${v.label} ${v.required ? '<strong>*</strong>' : ''}</label>
        ${v.type ? `<${v.type === 'textarea' ? 'textarea rows="4" cols="50"' : 'input'} class="${v.type === 'textarea' ? `${ID}_tab-form__inputTextarea` : `${ID}_tab-form__input`}" type="${v.type}" id="${v.id}" name="${v.name}" ${v.required ? 'required data-required="true"' : ''}>${v.type === 'textarea' ? '</textarea>' : ''}` : ''}
        <i class="fa fa-check-circle ${ID}_tab-form__validate"></i>
        <i class="fa fa-times-circle ${ID}_tab-form__error"></i>
        ${v.hint ? `<small class="${ID}_tab-form__errorHint">${v.hint}</small> ` : ''}
        ${v.select ? v.select : ''}
      </div>
      <!--end block-->
    `;
    function setSubmitButton(key, lang){
      if(lang === 'EN'){
        switch(key){
          case 'mail':
              return `
              <span class="${ID}_tab-form__submit">${TabFormData.EN.mail.submitButton}</span>
              `;
          case 'quote':
              return `
              <span class="${ID}_tab-form__submit">${TabFormData.EN.quote.submitButton}</span>
              `;
          case 'call':
              return `
              <span class="${ID}_tab-form__submit">${TabFormData.EN.call.submitButton}</span>
              `;
          default:
            break;            
        }
      } else {
        switch(key){
          case 'mail':
              return `
              <span class="${ID}_tab-form__submit">${TabFormData.IT.mail.submitButton}</span>
              `;
          case 'quote':
              return `
              <span class="${ID}_tab-form__submit">${TabFormData.IT.quote.submitButton}</span>
              `;
          case 'call':
              return `
              <span class="${ID}_tab-form__submit">${TabFormData.IT.call.submitButton}</span>
              `;
          default:
            break;            
        }
      }
    }
    const generateForm = (key, formFields, lang) => `
      <div class="${ID}_tab-form__bodyWrap">
        <input type="radio" name="tabTrigger" id="${key}" ${key === 'call' ? 'checked' : ''}>
        <form class="${ID}_tab-form__body" action="https://www.technogym.com/${lang == 'EN' ? 'gb' : 'it'}/contacts/index/post/" id="contactForm--${key}" method="post" novalidate>
          ${lang === 'EN' ? '<span class="hint"><sup>*</sup> Required field</span>' : '<span class="hint"><sup>*</sup> Campo obbligatorio</span>'}
          ${formFields.map(generateBlock).join(' ')}
          <div class="privacyPolicy">
          ${lang === 'EN' ? '<label for="">Having read and understood the <a href="https://www.technogym.com/gb/privacy-policy/" target="_blank">Privacy Policy</a> and having accepted the <a href="https://www.technogym.com/gb/terms-of-use/" target="_blank">TechnoGym Terms and Conditions</a>.</label>' : '<label for="">Letta e compresa la <a href="https://www.technogym.com/it/privacy-policy/" target="_blank">Privacy Policy</a> e accettati i <a href="https://www.technogym.com/it/terms-of-use/" target="_blank">Termini e le Condizioni d’uso</a></label>'}
            <label for="privacy">
              <input type="checkbox" name="privacy" id="privacy" required>
              ${lang === 'EN' ? 'I consent to the use of personal data for marketing and publicity purposes.' : 'Acconsento al trattamento dei miei dati personali per scopi di marketing e pubblicitari.'}
            </label>
          </div>
          ${setSubmitButton(key, lang)}
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
        <h3 class="TG063_wizardForm__title">Please select a reason for contacting us below</h3>
        <div class="${ID}_tab-form">
          <div class="${ID}_tab-form__header">
          ${headers}
          </div>
          <!--end header-->
          ${formContent}
        </div>
        <!--end tabs-->
        <div class="${ID}_contact-blockWrap" id="phone-numbers">
          <div class="${ID}_contact-block">
            <strong>or</strong>
            <h3 class="${ID}_contact-block__title">Call us on<span class="iconic icon-Callus"></span> 0800 316 2496</h3>
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
        <h3 class="TG063_wizardForm__title">Seleziona il tipo di richiesta</h3>
        <div class="${ID}_tab-form">
          <div class="${ID}_tab-form__header">
          ${headers}
          </div>
          <!--end header-->
          ${formContent}
        </div>
        <!--end tabs-->
        <div class="${ID}_contact-blockWrap" id="phone-numbers">
          <div class="${ID}_contact-block">
            <span>oppure</span>
            <h3 class="${ID}_contact-block__title">Chiama un nostro consulente al<span class="iconic icon-Callus"></span> 800 70 70 70 </h3>
            ${
              this.lang == 'EN' ?
              `
            <span class="${ID}_contact-block__text">Mobile: <strong>+39 0547 56047</strong></span>
            <span class="${ID}_contact-block__text">Fax: <strong>+39 0547 650505</strong></span>
            ` : ''}
          </div>
        </div>
    `;
    }
    this.component = element;
  }

  validate() {
    let valid = true;

    const field = this.component.querySelectorAll(`
      .${ID}_tab-form__bodyWrap input[type="radio"]:checked ~ .${ID}_tab-form__body .${ID}_tab-form__input
    `);
    Array.from(field).map(item => {
      const val = item.value;
      const elType = item.type;
      const isRequired = item.getAttribute('data-required');

      switch (elType) {
        case 'email': {
          const reg = RegExp(/^.+@.+\.\w{2,}$/);
          const res = reg.test(val);
            if(isRequired){
              if (res) {
                item.parentNode.classList.remove('not-valid');
                item.parentNode.classList.add('valid');
              } else {
                item.parentNode.classList.remove('valid');
                item.parentNode.classList.add('not-valid');

                valid = false;
              }
            }
          break;
        }
        case 'text': {
          if(isRequired){
            if (val !== '') {
              item.parentNode.classList.remove('not-valid');
              item.parentNode.classList.add('valid');
            } else {
              item.parentNode.classList.remove('valid');
              item.parentNode.classList.add('not-valid');

              valid = false;
            }
          }
          break;
        }
        case 'tel': {
          const reg = RegExp(/^\+?(\d.*){3,}$/);
          const res = reg.test(val);
          if(isRequired){
            if (res) {
              item.parentNode.classList.remove('not-valid');
              item.parentNode.classList.add('valid');
            } else {
              item.parentNode.classList.remove('valid');
              item.parentNode.classList.add('not-valid');

              valid = false;
            }
          }
          break;
        }
        default:
          break;
      }
    });

    const message = this.component.querySelectorAll(`
      .${ID}_tab-form__bodyWrap input[type="radio"]:checked ~ .${ID}_tab-form__body .${ID}_tab-form__inputTextarea
    `);
    Array.from(message).map(item => {
      const val = item.value;

      if (val) {
        item.parentNode.classList.remove('not-valid');
        item.parentNode.classList.add('valid');
      } else {
        item.parentNode.classList.remove('valid');
        item.parentNode.classList.add('not-valid');

        valid = false;
      }
    });

    return valid;
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
      this.validate();
    }));

    const message = this.component.querySelectorAll(`.${ID}_tab-form__inputTextarea`);
    Array.from(message).map(item => item.addEventListener('focusout', (e) => {
      this.validate();
    }));

    // Send the POST request
    const send = this.component.querySelectorAll(`.${ID}_tab-form__submit`);
    Array.from(send).forEach((sender) => {
      sender.addEventListener('click', () => {
        const formId = sender.closest(`.${ID}_tab-form__body`).getAttribute('id');
        const formParent = sender.closest(`.${ID}_tab-form__body`);
        const len = formId.length;
        const cleanStr = formId.substr(13, len);
        const isPrivacyChecked = formParent.querySelector('.privacyPolicy input[type="checkbox"]').checked;
        const valid = this.validate();

        if (!isPrivacyChecked) {
          formParent.querySelector('.privacyPolicy input[type="checkbox"]').setAttribute('style', 'border: 1px solid #f52c2c; box-shadow:0px 0px 5px 0px rgba(245,44,44,1); -webkit-box-shadow:0px 0px 5px 0px rgba(245,44,44,1); -moz-box-shadow:0px 0px 5px 0px rgba(245,44,44,1);');
        } else if(valid) {
          submitForm(VARIATION, cleanStr);
        }
      });
    });
  }

  render() {
    document.querySelector('.forms').insertAdjacentElement('afterend', this.component);
  }
}
