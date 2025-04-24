import settings from '../../lib/settings';
import { formContent } from '../../data/form-content';
import { submitForm, translate, getLanguage } from '../../lib/services';

const { ID } = settings;
const { VARIATION } = settings;

export default class WizardForm {
  constructor(options) {
    const opts = options || {};
    this.lang = opts.lang;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_wizardFormWrap`);
    if (this.lang === 'EN') {
      element.innerHTML = `
      <div class="${ID}_wizardForm">
        <h3 class="${ID}_wizardForm__title">${translate('Please select a reason for contacting us below')}</h3>
        <div class="${ID}_wizardForm__choicesWrap">
          <div class="${ID}_wizardForm__choices">
            <div class="${ID}_wizardForm__choiceWrap">
              <label for="call" class="${ID}_wizardForm__choice">
                <span class="iconic icon-Callback"></span>
                ${formContent.text_EN[0]}
              </label>
            </div>
            <div class="${ID}_wizardForm__choiceWrap">
              <label for="mail" class="${ID}_wizardForm__choice">
                <span class="fa fa-envelope"></span>
                ${formContent.text_EN[1]}
              </label>
            </div>
            <div class="${ID}_wizardForm__choiceWrap">
              <label for="quote" class="${ID}_wizardForm__choice">
                <span class="fa fa-file-text-o"></span>
                ${formContent.text_EN[2]}
              </label>
            </div>
          </div>
        </div>
        <div class="${ID}_wizardForm__wizardWrap" title="call">
          <input type="radio" id="call" name="trigger">
          <div class="${ID}_wizardForm__stepsWrap">
            <div class="${ID}_wizardForm__steps">
              <ul class="${ID}_wizardForm__stepsList">
                <li class="${ID}_wizardForm__stepsList__item active default" data-key="step-1"><span data-step="1"></span>${translate('Question')} 1</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2"><span data-step="2"></span>${translate('Question')} 2</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3"><span data-step="3"></span>${translate('Question')} 3</li>
              </ul>
            </div>
          </div>
          <div class="${ID}_wizardForm__formsWrap">
            <form action="https://www.technogym.com/gb/contacts/index/post/" id="${ID}-call-form" class="${ID}_wizardForm__wizard">
              <div class="${ID}_wizardForm__wizardBlock animate fadeInUp" data-show="default">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">${translate('Question')} 1/3</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[0].title}</h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_EN[0].desc}</span>
                <input type="text" name="fullname" id="fullname--call" required class="${ID}_wizardForm__wizardBlock__field">
                <div class="${ID}_wizardForm__button" data-target="step-2">${translate('Next')}</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">${translate('Question')} 2/3</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[5].title}</h4>
                <input type="tel" name="phone" id="phone--call" required class="${ID}_wizardForm__wizardBlock__field">
                <div class="${ID}_wizardForm__button" data-target="step-3">${translate('Next')}</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">${translate('Question')} 3/3</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[4].title}</h4>
                <div class="enquireWrap">
                  <span>${translate('I am enquiring about:')}</span>
                  <div class="enquire fa fa-angle-down">
                    <select class="${ID}__wizardForm__wizardBlockSelect" name="enquire" id="enquire--call">
                      <option value="" disabled selected>---</option>
                      <option value="${formContent.choices_EN[0]}">${formContent.choices_EN[0]}</option>
                      <option value="${formContent.choices_EN[1]}">${formContent.choices_EN[1]}</option>
                      <option value="${formContent.choices_EN[2]}">${formContent.choices_EN[2]}</option>
                    </select>
                  </div>
                </div>
                <div class="privacyPolicy">
                  <input type="checkbox" name="privacy" id="privacy" required>
                  <label for="privacy">${translate('I agree to the <a href="https://www.technogym.com/gb/terms-of-use/" target="_blank">Techogym Terms</a> of us of <a href="https://www.technogym.com/gb/privacy-policy/" target="_blank">Privacy Policy</a></label>')}
                </div>
                <span class="${ID}_wizardForm__button--send">${translate('Send Message')}</span>
              </div>
            </form>
          </div>
        </div>
        <div class="${ID}_wizardForm__wizardWrap" title="mail">
          <input type="radio" id="mail" name="trigger">
          <div class="${ID}_wizardForm__stepsWrap">
            <div class="${ID}_wizardForm__steps">
              <ul class="${ID}_wizardForm__stepsList">
                <li class="${ID}_wizardForm__stepsList__item active default" data-key="step-2-1"><span data-step="1"></span>${translate('Question')} 1</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2-2"><span data-step="2"></span>${translate('Question')} 2</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2-3"><span data-step="3"></span>${translate('Question')} 3</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2-4"><span data-step="4"></span>${translate('Question')} 4</li>
              </ul>
            </div>
          </div>
          <div class="${ID}_wizardForm__formsWrap">
            <form action="https://www.technogym.com/gb/contacts/index/post/" id="${ID}-mail-form" class="${ID}_wizardForm__wizard">
              <div class="${ID}_wizardForm__wizardBlock animate fadeInUp" data-show="default">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">${translate('Question')} 1/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[0].title}</h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_EN[0].desc}</span>
                <input type="text" name="fullname" id="fullname--mail" required class="${ID}_wizardForm__wizardBlock__field">
                <div class="${ID}_wizardForm__button" data-target="step-2-2" data-name="fullname--mail">${translate('Next')}</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2-2">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">${translate('Question')} 2/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question fullname--mail--receiver">${formContent.questions_EN[1].title}</h4>
                <input type="email" name="email" id="email--mail" required class="${ID}_wizardForm__wizardBlock__field">
                <div class="${ID}_wizardForm__button" data-target="step-2-3">${translate('Next')}</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2-3">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">${translate('Question')} 3/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[2].title}</h4>
                <textarea class="${ID}_wizardForm__wizardBlock__message" name="message" id="message--mail" rows="4" cols="50" required></textarea>
                <div class="${ID}_wizardForm__button" data-target="step-2-4">${translate('Next')}</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2-4">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">${translate('Question')} 4/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[4].title}</h4>
                <div class="enquireWrap">
                  <span>${translate('I am enquiring about:')}</span>
                  <div class="enquire fa fa-angle-down">
                    <select class="${ID}__wizardForm__wizardBlockSelect" name="enquire" id="enquire--mail">
                      <option value="" disabled selected>---</option>
                      <option value="${formContent.choices_EN[0]}">${formContent.choices_EN[0]}</option>
                      <option value="${formContent.choices_EN[1]}">${formContent.choices_EN[1]}</option>
                      <option value="${formContent.choices_EN[2]}">${formContent.choices_EN[2]}</option>
                    </select>
                  </div>
                </div>
                <div class="privacyPolicy">
                  <input type="checkbox" name="privacy" id="privacy" required>
                  <label for="privacy">${translate('I agree to the <a href="https://www.technogym.com/gb/terms-of-use/" target="_blank">Techogym Terms</a> of us of <a href="https://www.technogym.com/gb/privacy-policy/" target="_blank">Privacy Policy</a></label>')}
                </div>
                <span class="${ID}_wizardForm__button--send">${translate('Send Message')}</span>
              </div>
            </form>
          </div>
        </div>
        <div class="${ID}_wizardForm__wizardWrap" title="quote">
          <input type="radio" id="quote" name="trigger">
          <div class="${ID}_wizardForm__stepsWrap">
            <div class="${ID}_wizardForm__steps">
              <ul class="${ID}_wizardForm__stepsList">
                <li class="${ID}_wizardForm__stepsList__item active default" data-key="step-3-1"><span data-step="1"></span>${translate('Question')} 1</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-2"><span data-step="2"></span>${translate('Question')} 2</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-3"><span data-step="3"></span>${translate('Question')} 3</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-4"><span data-step="4"></span>${translate('Question')} 4</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-5"><span data-step="5"></span>${translate('Question')} 5</li>
              </ul>
            </div>
          </div>
          <div class="${ID}_wizardForm__formsWrap">
            <form action="https://www.technogym.com/gb/contacts/index/post/" id="${ID}-quote-form" class="${ID}_wizardForm__wizard">
              <div class="${ID}_wizardForm__wizardBlock animate fadeInUp" data-show="default">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">${translate('Question')} 1/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[0].title}</h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_EN[0].desc}</span>
                <input type="text" name="fullname" id="fullname--quote" required class="${ID}_wizardForm__wizardBlock__field">
                <div class="${ID}_wizardForm__button" data-target="step-3-2" data-name="fullname--quote">${translate('Next')}</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-2">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">${translate('Question')} 2/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question fullname--quote--receiver">${formContent.questions_EN[1].title}</h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_EN[1].desc} (${translate('Optional')})</span>
                <input type="email" name="email" id="email--quote" class="${ID}_wizardForm__wizardBlock__field">
                <div class="${ID}_wizardForm__button opt" data-target="step-3-3">${translate('Next')}</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-3">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">${translate('Question')} 3/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[2].title}</h4>
                <textarea class="${ID}_wizardForm__wizardBlock__message" name="message" id="message--quote" rows="4" cols="50" required></textarea>
                <div class="${ID}_wizardForm__button" data-target="step-3-4">${translate('Next')}</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-4">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">${translate('Question')} 4/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[3].title}</h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_EN[3].desc}</span>
                <input type="tel" name="phone" id="phone--quote" required class="${ID}_wizardForm__wizardBlock__field">
                <div class="${ID}_wizardForm__button" data-target="step-3-5">${translate('Next')}</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-5">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">${translate('Question')} 5/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[4].title}</h4>
                <div class="enquireWrap">
                  <span>${translate('I am enquiring about:')}</span>
                  <div class="enquire fa fa-angle-down">
                    <select class="${ID}__wizardForm__wizardBlockSelect" name="enquire" id="enquire--quote">
                      <option value="" disabled selected>---</option>
                      <option value="${formContent.choices_EN[0]}">${formContent.choices_EN[0]}</option>
                      <option value="${formContent.choices_EN[1]}">${formContent.choices_EN[1]}</option>
                      <option value="${formContent.choices_EN[2]}">${formContent.choices_EN[2]}</option>
                    </select>
                  </div>
                </div>
                <div class="privacyPolicy">
                  <input type="checkbox" name="privacy" id="privacy" required>
                  <label for="privacy">${translate('I agree to the <a href="https://www.technogym.com/gb/terms-of-use/" target="_blank">Techogym Terms</a> of us of <a href="https://www.technogym.com/gb/privacy-policy/" target="_blank">Privacy Policy</a></label>')}
                </div>
                <span class="${ID}_wizardForm__button--send">${translate('Send Message')}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    } else {
      element.innerHTML = `
      <div class="${ID}_wizardForm">
        <h3 class="${ID}_wizardForm__title">Seleziona il tipo di richiesta</h3>
        <div class="${ID}_wizardForm__choicesWrap">
          <div class="${ID}_wizardForm__choices">
            <div class="${ID}_wizardForm__choiceWrap">
              <label for="call" class="${ID}_wizardForm__choice">
                <span class="iconic icon-Callback"></span>
                ${formContent.text_IT[0]}
              </label>
            </div>
            <div class="${ID}_wizardForm__choiceWrap">
              <label for="mail" class="${ID}_wizardForm__choice">
                <span class="fa fa-envelope"></span>
                ${formContent.text_IT[2]}
              </label>
            </div>
            <div class="${ID}_wizardForm__choiceWrap">
              <label for="quote" class="${ID}_wizardForm__choice">
                <span class="fa fa-file-text-o"></span>
                ${formContent.text_IT[1]}
              </label>
            </div>
          </div>
        </div>
        <div class="${ID}_wizardForm__wizardWrap" title="call">
          <input type="radio" id="call" name="trigger">
          <div class="${ID}_wizardForm__stepsWrap">
            <div class="${ID}_wizardForm__steps">
              <ul class="${ID}_wizardForm__stepsList">
                <li class="${ID}_wizardForm__stepsList__item active default" data-key="step-1"><span data-step="1"></span>Domanda 1</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2"><span data-step="2"></span>Domanda 2</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3"><span data-step="3"></span>Domanda 3</li>
              </ul>
            </div>
          </div>
          <div class="${ID}_wizardForm__formsWrap">
            <form action="https://www.technogym.com/gb/contacts/index/post/" id="${ID}-call-form" class="${ID}_wizardForm__wizard">
              <div class="${ID}_wizardForm__wizardBlock animate fadeInUp" data-show="default">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 1/3</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[0].title}</h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_IT[0].desc}</span>
                <input type="text" name="fullname" id="fullname--call" required class="${ID}_wizardForm__wizardBlock__field">
                <div class="${ID}_wizardForm__button" data-target="step-2">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 2/3</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[3].title}</h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_IT[3].hint}</span>
                <input type="tel" name="phone" id="phone--call" required class="${ID}_wizardForm__wizardBlock__field">
                <div class="${ID}_wizardForm__button" data-target="step-3">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 3/3</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[4].title}</h4>
                <div class="enquireWrap">
                  <span>Sono interessato:</span>
                  <div class="enquire fa fa-angle-down">
                    <select class="${ID}__wizardForm__wizardBlockSelect" name="enquire" id="enquire--call">
                      <option value="" disabled selected>---</option>
                      <option value="${formContent.choices_IT[0]}">${formContent.choices_IT[0]}</option>
                      <option value="${formContent.choices_IT[1]}">${formContent.choices_IT[1]}</option>
                      <option value="${formContent.choices_IT[2]}">${formContent.choices_IT[2]}</option>
                    </select>
                  </div>
                </div>
                <div class="privacyPolicy">
                  <input type="checkbox" name="privacy" id="privacy" required>
                  <label for="privacy">Acconsento ai termini <a href="https://www.technogym.com/it/terms-of-use/" target="_blank">TechoGym</a> sul trattamento dei dati e alla <a href="https://www.technogym.com/it/privacy-policy/" target="_blank">Privacy Policy</a></label>
                </div>
                <span class="${ID}_wizardForm__button--send">Invia</span>
              </div>
            </form>
          </div>
        </div>
        <div class="${ID}_wizardForm__wizardWrap" title="mail">
          <input type="radio" id="mail" name="trigger">
          <div class="${ID}_wizardForm__stepsWrap">
            <div class="${ID}_wizardForm__steps">
              <ul class="${ID}_wizardForm__stepsList">
                <li class="${ID}_wizardForm__stepsList__item active default" data-key="step-2-1"><span data-step="1"></span>Domanda 1</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2-2"><span data-step="2"></span>Domanda 2</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2-3"><span data-step="3"></span>Domanda 3</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2-4"><span data-step="4"></span>Domanda 4</li>
              </ul>
            </div>
          </div>
          <div class="${ID}_wizardForm__formsWrap">
            <form action="https://www.technogym.com/gb/contacts/index/post/" id="${ID}-mail-form" class="${ID}_wizardForm__wizard">
              <div class="${ID}_wizardForm__wizardBlock animate fadeInUp" data-show="default">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 1/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[0].title}</h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_IT[0].desc}</span>
                <input type="text" name="fullname" id="fullname--mail" required class="${ID}_wizardForm__wizardBlock__field">
                <div class="${ID}_wizardForm__button" data-target="step-2-2" data-name="fullname--mail">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2-2">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 2/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question fullname--mail--receiver">${formContent.questions_IT[1].title}</h4>
                <input type="email" name="email" id="email--mail" required class="${ID}_wizardForm__wizardBlock__field">
                <div class="${ID}_wizardForm__button" data-target="step-2-3">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2-3">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 3/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[2].title}</h4>
                <textarea class="${ID}_wizardForm__wizardBlock__message" name="message" id="message--message" rows="4" cols="50" required></textarea>
                <div class="${ID}_wizardForm__button" data-target="step-2-4">Next</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2-4">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 4/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[4].title}</h4>
                <div class="enquireWrap">
                  <span>Sono interessato:</span>
                  <div class="enquire fa fa-angle-down">
                    <select class="${ID}__wizardForm__wizardBlockSelect" name="enquire" id="enquire--mail">
                      <option value="" disabled selected>---</option>
                      <option value="${formContent.choices_IT[0]}">${formContent.choices_IT[0]}</option>
                      <option value="${formContent.choices_IT[1]}">${formContent.choices_IT[1]}</option>
                      <option value="${formContent.choices_IT[2]}">${formContent.choices_IT[2]}</option>
                    </select>
                  </div>
                </div>
                <div class="privacyPolicy">
                  <input type="checkbox" name="privacy" id="privacy" required>
                  <label for="privacy">Acconsento ai termini <a href="https://www.technogym.com/it/terms-of-use/" target="_blank">TechoGym</a> sul trattamento dei dati e alla <a href="https://www.technogym.com/it/privacy-policy/" target="_blank">Privacy Policy</a></label>
                </div>
                <span class="${ID}_wizardForm__button--send">Invia</span>
              </div>
            </form>
          </div>
        </div>
        <div class="${ID}_wizardForm__wizardWrap" title="quote">
          <input type="radio" id="quote" name="trigger">
          <div class="${ID}_wizardForm__stepsWrap">
            <div class="${ID}_wizardForm__steps">
              <ul class="${ID}_wizardForm__stepsList">
                <li class="${ID}_wizardForm__stepsList__item active default" data-key="step-3-1"><span data-step="1"></span>Domanda 1</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-2"><span data-step="2"></span>Domanda 2</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-3"><span data-step="3"></span>Domanda 3</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-4"><span data-step="4"></span>Domanda 4</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-5"><span data-step="5"></span>Domanda 5</li>
              </ul>
            </div>
          </div>
          <div class="${ID}_wizardForm__formsWrap">
            <form action="https://www.technogym.com/gb/contacts/index/post/" id="${ID}-quote-form" class="${ID}_wizardForm__wizard">
              <div class="${ID}_wizardForm__wizardBlock animate fadeInUp" data-show="default">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 1/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[0].title}</h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_IT[0].desc}</span>
                <input type="text" name="fullname" id="fullname--quote" required class="${ID}_wizardForm__wizardBlock__field">
                <div class="${ID}_wizardForm__button" data-target="step-3-2" data-name="fullname--quote">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-2">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 2/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question fullname--quote--receiver">${formContent.questions_IT[1].title}</h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_IT[1].desc} (Opzionale)</span>
                <input type="email" name="email" id="email--quote" class="${ID}_wizardForm__wizardBlock__field">
                <div class="${ID}_wizardForm__button opt" data-target="step-3-3">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-3">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 3/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[2].desc}</h4>
                <textarea class="${ID}_wizardForm__wizardBlock__message" name="message" id="message--quote" rows="4" cols="50" required></textarea>
                <div class="${ID}_wizardForm__button" data-target="step-3-4">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-4">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 4/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[3].title}</h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_IT[3].desc}</span>
                <input type="tel" name="phone" id="phone--quote" required class="${ID}_wizardForm__wizardBlock__field">
                <div class="${ID}_wizardForm__button" data-target="step-3-5">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-5">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 5/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[4].title}</h4>
                <div class="enquireWrap">
                  <span>Sono interessato:</span>
                  <div class="enquire fa fa-angle-down">
                    <select class="${ID}__wizardForm__wizardBlockSelect" name="enquire" id="enquire--quote">
                      <option value="" disabled selected>---</option>
                      <option value="${formContent.choices_IT[0]}">${formContent.choices_IT[0]}</option>
                      <option value="${formContent.choices_IT[1]}">${formContent.choices_IT[1]}</option>
                      <option value="${formContent.choices_IT[2]}">${formContent.choices_IT[2]}</option>
                    </select>
                  </div>
                </div>
                <div class="privacyPolicy">
                  <input type="checkbox" name="privacy" id="privacy" required>
                  <label for="privacy">Acconsento ai termini <a href="https://www.technogym.com/it/terms-of-use/" target="_blank">TechoGym</a> sul trattamento dei dati e alla <a href="https://www.technogym.com/it/privacy-policy/" target="_blank">Privacy Policy</a></label>
                </div>
                <span class="${ID}_wizardForm__button--send">Invia</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    }

    this.component = element;
  }

  bindEvents() {
    const elements = this.component.querySelectorAll(`.${ID}_wizardForm__choiceWrap`);
    const activeList = this.component.querySelectorAll(`.${ID}_wizardForm__choice`);
    Array.from(elements).map(item => item.addEventListener('click', (e) => {
      activeList.forEach((el) => {
        el.classList.remove('active');
      });
      // add active class to the element clicked
      if (e.target.classList.contains('active')) {
        e.target.classList.remove('active');
      } else {
        e.target.classList.add('active');
      }
      // toggle the isShowing class to the formWrap
      const formWrap = this.component.querySelectorAll(`.${ID}_wizardForm__wizardWrap`);
      const formTarget = e.target.getAttribute('for');
      Array.from(formWrap).forEach((form) => {
        form.classList.remove('isShowing');
        const activated = form.classList.contains('isShowing');
        const formTitle = form.title;
        if (formTitle === formTarget) {
          if (!activated) {
            form.classList.add('isShowing');
          } else {
            form.classList.remove('isShowing');
          }
        }
      });
      // sets bullets and steps to default, when changing choice
      const startingBullet = this.component.querySelectorAll(`.${ID}_wizardForm__stepsList__item`);
      Array.from(startingBullet).forEach((bullet) => {
        if (bullet.classList.contains('default')) {
          bullet.classList.add('active');
        } else {
          bullet.classList.remove('active');
        }
      });

      const startingStep = this.component.querySelectorAll(`.${ID}_wizardForm__wizardBlock`);
      Array.from(startingStep).map(step => step.classList.remove('isShowing', 'isHiding'));
      const defaults = Array.from(startingStep);
      defaults.map((def, i) => {
        if (def.getAttribute('data-show')) {
          def.classList.add('isShowing');
        }
      });
    }));
    // change the active bullet
    const nextButton = this.component.querySelectorAll(`.${ID}_wizardForm__button`);
    Array.from(nextButton).map(item => item.addEventListener('click', (e) => {
      const dataTarget = e.target.getAttribute('data-target');
      const steps = this.component.querySelectorAll(`.${ID}_wizardForm__stepsList__item`);
      for (let i = 0; i < steps.length; i += 1) {
        steps[i].classList.remove('active');
      }
      Array.from(steps).map((step, i) => {
        const keyVal = step.getAttribute('data-key');
        if (dataTarget === keyVal) {
          step.classList.add('active');
        }
      });

      // change the active question
      const parent = e.target.parentElement;
      parent.classList.remove('isShowing');
      parent.classList.add('isHiding');
      window.setTimeout(() => {
        document.getElementById(dataTarget).classList.add('isShowing');
      }, 500);
    }));
    //Check if the user has entered a valid data
    const field = this.component.querySelectorAll(`.${ID}_wizardForm__wizardBlock__field`);
    Array.from(field).map(item => item.addEventListener('keyup', (e) => {
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
    const message = this.component.querySelectorAll(`.${ID}_wizardForm__wizardBlock__message`);
    Array.from(message).map(item => item.addEventListener('keyup', (e) => {
      const val = e.target.value;
      if (val) {
        e.target.parentNode.classList.remove('not-valid');
        e.target.parentNode.classList.add('valid');
      } else {
        e.target.parentNode.classList.remove('valid');
        e.target.parentNode.classList.add('not-valid');
      }
    }));
    const use = this.component.querySelectorAll(`.${ID}__wizardForm__wizardBlockSelect`);
    Array.from(use).map(useCase => useCase.addEventListener('change', () => {
      const opt = useCase.value;
      if (opt !== '---') {
        useCase.closest(`.${ID}_wizardForm__wizardBlock`).classList.remove('not-valid');
        useCase.closest(`.${ID}_wizardForm__wizardBlock`).classList.add('valid');
      } else {
        useCase.closest(`.${ID}_wizardForm__wizardBlock`).classList.remove('valid');
        useCase.closest(`.${ID}_wizardForm__wizardBlock`).classList.add('not-valid');
      }
    }));
    //Send POST request
    const send = this.component.querySelectorAll(`.${ID}_wizardForm__button--send`);
    Array.from(send).forEach((sender) => {
      sender.addEventListener('click', () => {
        const formId = sender.closest(`.${ID}_wizardForm__wizardWrap`).getAttribute('title');
        submitForm(VARIATION, formId);
      });
    });
    //change the name
    const nameChanger = this.component.querySelectorAll(`.${ID}_wizardForm__button`);
    Array.from(nameChanger).forEach((name) => {
      name.addEventListener('click', () => {
        const dataName = name.getAttribute('data-name');
        if (dataName) {
          const dName = this.component.querySelector(`#${dataName}`).value;
          const receiver = this.component.querySelector(`.${dataName}--receiver`);
          receiver.innerHTML = receiver.innerHTML.replace('[name]', dName);
        }
      });
    });
  }

  render() {
    document.querySelector('.forms').insertAdjacentElement('afterend', this.component);
  }
}
