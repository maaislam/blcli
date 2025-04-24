import settings from '../../lib/settings';

const { ID } = settings;

export default class Contacts {
  constructor(options) {
    const opts = options || {};
    this.lang = opts.lang;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_wizardFormWrap--contacts`);
    element.id = 'phone-numbers';
    if (this.lang === 'EN') {
      element.innerHTML = `
      <div class="${ID}_wizardForm">
        <h3 class="${ID}_wizardForm__title">call us on 0800 316 2496</h3>
        <div class="${ID}_wizardForm__choicesWrap">
          <div class="${ID}_wizardForm__choices">
            <div class="${ID}_wizardForm__choiceWrap">
              <div class="${ID}_wizardForm__choice">
                For spare parts and service contracs:
                <span>01344300236</span>
              </div>
            </div>
            <div class="${ID}_wizardForm__choiceWrap">
              <div class="${ID}_wizardForm__choice">
                For technical assistance:
                <span>01344823700</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    } else {
      element.innerHTML = `
      <div class="${ID}_wizardForm">
        <h3 class="${ID}_wizardForm__title">chiamaci all' 800 70 70 70</h3>
        <div class="${ID}_wizardForm__choicesWrap">
          <div class="${ID}_wizardForm__choices">
            <div class="${ID}_wizardForm__choiceWrap">
              <div class="${ID}_wizardForm__choice">
                Mobile:
                <span>+39 0547 56047</span>
              </div>
            </div>
            <div class="${ID}_wizardForm__choiceWrap">
              <div class="${ID}_wizardForm__choice">
                Fax:
                <span>+39 0547 650505</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    }

    this.component = element;
  }

  bindEvents() {

  }

  render() {
    document.querySelector('.block-store-locator').insertAdjacentElement('afterend', this.component);
  }
}
