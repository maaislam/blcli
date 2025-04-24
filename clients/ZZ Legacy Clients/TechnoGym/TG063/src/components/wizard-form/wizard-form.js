import settings from '../../lib/settings';
import { formContent } from '../../data/form-content';
import { submitForm } from '../../lib/services';

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
        <h3 class="${ID}_wizardForm__title">Please select a reason for contacting us below</h3>
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
                <li class="${ID}_wizardForm__stepsList__item active default" data-key="step-1" data-next="step-2"><span data-step="1"></span>Question 1</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2" data-previous="step-1" data-next="step-3"><span data-step="2"></span>Question 2</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3" data-previous="step-2" data-next="step-4"><span data-step="3"></span>Question 3</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-4" data-previous="step-3"><span data-step="4"></span>Question 4</li>
              </ul>
            </div>
          </div>
          <div class="${ID}_wizardForm__formsWrap">
            <form action="https://www.technogym.com/gb/contacts/index/post/" id="${ID}-call-form" class="${ID}_wizardForm__wizard">
              <div class="hint"><sup>*</sup> Required field</div>
              <div class="${ID}_wizardForm__wizardBlock animate fadeInUp" data-show="default" id="step-1">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Question 1/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">First Name<sup>*</sup></h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">Your first name</span>
                <input type="text" name="name" id="name--call" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button" data-target="step-2" data-name="name--call">Next</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Question 2/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">Last name<sup>*</sup></h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">Your Last Name</span>
                <input type="text" name="surname" id="surname--call" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button--back" data-target="step-1">Back</div>
                <div class="${ID}_wizardForm__button" data-target="step-3" data-surname="surname--call">Next</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Question 3/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question surname--call--receiver name--call--receiver">${formContent.questions_EN[5].title}<sup>*</sup></h4>
                <input type="tel" name="phone" id="phone--call" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button--back" data-target="step-2">Back</div>
                <div class="${ID}_wizardForm__button" data-target="step-4">Next</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-4">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Question 4/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[4].title}</h4>
                <div class="enquireWrap">
                  <span><sup>*</sup>I am enquiring for:</span>
                  <div class="enquire fa fa-angle-down">
                    <select class="${ID}__wizardForm__wizardBlockSelect" name="enquire" id="enquire--call">
                      <option value="" disabled selected>---</option>
                      <option value="private_individual">${formContent.choices_EN[0]}</option>
                      <option value="business">${formContent.choices_EN[1]}</option>
                      <option value="freelance_professional">${formContent.choices_EN[2]}</option>
                    </select>
                  </div>
                </div>
                <div class="privacyPolicy">
                  <label for="">Having read and understood the <a href="https://www.technogym.com/gb/privacy-policy/" target="_blank">Privacy Policy</a> and having accepted the <a href="https://www.technogym.com/gb/terms-of-use/" target="_blank">TechnoGym Terms and Conditions</a>.</label>
                  <label for="privacy">
                    <input type="checkbox" name="privacy" id="privacy-2" required>
                    I consent to the use of personal data for marketing and publicity purposes.
                  </label>
                </div>
                <div class="${ID}_wizardForm__button--back" data-target="step-3">Back</div>
                <div class="${ID}_wizardForm__button--send">Call me back</div>
              </div>
            </form>
          </div>
        </div>
        <div class="${ID}_wizardForm__wizardWrap" title="mail">
          <input type="radio" id="mail" name="trigger">
          <div class="${ID}_wizardForm__stepsWrap">
            <div class="${ID}_wizardForm__steps">
              <ul class="${ID}_wizardForm__stepsList">
                <li class="${ID}_wizardForm__stepsList__item active default" data-key="step-2-1" data-next="step-2-2"><span data-step="1"></span>Question 1</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2-2" data-previous="step-2-1" data-next="step-2-3"><span data-step="2"></span>Question 2</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2-3" data-previous="step-2-2" data-next="step-2-4"><span data-step="3"></span>Question 3</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2-4" data-previous="step-2-3" data-next="step-2-5"><span data-step="4"></span>Question 4</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2-5" data-previous="step-2-4"><span data-step="5"></span>Question 5</li>
              </ul>
            </div>
          </div>
          <div class="${ID}_wizardForm__formsWrap">
            <form action="https://www.technogym.com/gb/contacts/index/post/" id="${ID}-mail-form" class="${ID}_wizardForm__wizard">
            <div class="hint"><sup>*</sup> Required field</div>
              <div class="${ID}_wizardForm__wizardBlock animate fadeInUp" data-show="default" id="step-2-1">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Question 1/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">First Name<sup>*</sup></h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">Your first name</span>
                <input type="text" name="name" id="name--mail" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button" data-target="step-2-2" data-name="name--mail">Next</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2-2">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Question 2/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">Last name<sup>*</sup></h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">Your Last Name</span>
                <input type="text" name="surname" id="surname--mail" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button--back" data-target="step-2-1">Back</div>
                <div class="${ID}_wizardForm__button" data-target="step-2-3" data-surname="surname--mail">Next</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2-3">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Question 3/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question surname--mail--receiver name--mail--receiver">${formContent.questions_EN[1].title}<sup>*</sup></h4>
                <input type="email" name="email" id="email--mail" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button--back" data-target="step-2-2">Back</div>
                <div class="${ID}_wizardForm__button" data-target="step-2-4">Next</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2-4">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Question 4/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[2].title}<sup>*</sup></h4>
                <textarea class="${ID}_wizardForm__wizardBlock__message" name="message" id="message--mail" rows="4" cols="50" required></textarea>
                <div class="${ID}_wizardForm__button--back" data-target="step-2-3">Back</div>
                <div class="${ID}_wizardForm__button" data-target="step-2-5">Next</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2-5">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Question 5/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[4].title}</h4>
                <div class="enquireWrap">
                  <span><sup>*</sup>I am enquiring for:</span>
                  <div class="enquire fa fa-angle-down">
                    <select class="${ID}__wizardForm__wizardBlockSelect" name="enquire" id="enquire--mail">
                      <option value="" disabled selected>---</option>
                      <option value="private_individual">${formContent.choices_EN[0]}</option>
                      <option value="business">${formContent.choices_EN[1]}</option>
                      <option value="freelance_professional">${formContent.choices_EN[2]}</option>
                    </select>
                  </div>
                </div>
                <div class="privacyPolicy">
                  <label for="">Having read and understood the <a href="https://www.technogym.com/gb/privacy-policy/" target="_blank">Privacy Policy</a> and having accepted the <a href="https://www.technogym.com/gb/terms-of-use/" target="_blank">TechnoGym Terms and Conditions</a>.</label>
                  <label for="privacy">
                    <input type="checkbox" name="privacy" id="privacy-2" required>
                    I consent to the use of personal data for marketing and publicity purposes.
                  </label>
                </div>
                <div class="${ID}_wizardForm__button--back" data-target="step-2-4">Back</div>
                <div class="${ID}_wizardForm__button--send">Send message</div>
              </div>
            </form>
          </div>
        </div>
        <div class="${ID}_wizardForm__wizardWrap" title="quote">
          <input type="radio" id="quote" name="trigger">
          <div class="${ID}_wizardForm__stepsWrap">
            <div class="${ID}_wizardForm__steps">
              <ul class="${ID}_wizardForm__stepsList">
                <li class="${ID}_wizardForm__stepsList__item active default" data-key="step-3-1" data-next="step-3-2"><span data-step="1"></span>Question 1</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-2" data-previous="step-3-1" data-next="step-3-3"><span data-step="2"></span>Question 2</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-3" data-previous="step-3-2" data-next="step-3-4"><span data-step="3"></span>Question 3</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-4" data-previous="step-3-3" data-next="step-3-5"><span data-step="4"></span>Question 4</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-5" data-previous="step-3-4" data-next="step-3-6"><span data-step="5"></span>Question 5</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-6" data-previous="step-3-5"><span data-step="6"></span>Question 6</li>
              </ul>
            </div>
          </div>
          <div class="${ID}_wizardForm__formsWrap">
            <form action="https://www.technogym.com/gb/contacts/index/post/" id="${ID}-quote-form" class="${ID}_wizardForm__wizard">
            <div class="hint"><sup>*</sup> Required field</div>
              <div class="${ID}_wizardForm__wizardBlock animate fadeInUp" data-show="default" id="step-3-1">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Question 1/6</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">First Name<sup>*</sup></h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">Your first name</span>
                <input type="text" name="name" id="name--quote" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button" data-target="step-3-2" data-name="name--quote">Next</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-2">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Question 2/6</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">Last name<sup>*</sup></h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">Your Last Name</span>
                <input type="text" name="surname" id="surname--quote" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button--back" data-target="step-3-1">Back</div>
                <div class="${ID}_wizardForm__button" data-target="step-3-3" data-surname="surname--quote">Next</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-3">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Question 3/6</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question surname--quote--receiver name--quote--receiver">${formContent.questions_EN[1].title}</h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_EN[1].desc} (Optional)</span>
                <input type="email" name="email" id="email--quote" class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button--back" data-target="step-3-2">Back</div>
                <div class="${ID}_wizardForm__button opt" data-target="step-3-4">Next</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-4">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Question 4/6</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[3].title}<sup>*</sup></h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_EN[3].desc}</span>
                <input type="tel" name="phone" id="phone--quote" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button--back" data-target="step-3-3">Back</div>
                <div class="${ID}_wizardForm__button" data-target="step-3-5">Next</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-5">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Question 5/6</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[2].title}<sup>*</sup></h4>
                <textarea class="${ID}_wizardForm__wizardBlock__message" name="message" id="message--quote" rows="4" cols="50" required></textarea>
                <div class="${ID}_wizardForm__button--back" data-target="step-3-4">Back</div>
                <div class="${ID}_wizardForm__button" data-target="step-3-6">Next</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-6">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Question 6/6</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_EN[4].title}</h4>
                <div class="enquireWrap">
                  <span><sup>*</sup>I am enquiring for:</span>
                  <div class="enquire fa fa-angle-down">
                    <select class="${ID}__wizardForm__wizardBlockSelect" name="enquire" id="enquire--quote">
                      <option value="" disabled selected>---</option>
                      <option value="private_individual">${formContent.choices_EN[0]}</option>
                      <option value="business">${formContent.choices_EN[1]}</option>
                      <option value="freelance_professional">${formContent.choices_EN[2]}</option>
                    </select>
                  </div>
                </div>
                <div class="privacyPolicy">
                  <label for="">Having read and understood the <a href="https://www.technogym.com/gb/privacy-policy/" target="_blank">Privacy Policy</a> and having accepted the <a href="https://www.technogym.com/gb/terms-of-use/" target="_blank">TechnoGym Terms and Conditions</a>.</label>
                  <label for="privacy">
                    <input type="checkbox" name="privacy" id="privacy-2" required>
                    I consent to the use of personal data for marketing and publicity purposes.
                  </label>
                </div>
                <div class="${ID}_wizardForm__button--back" data-target="step-3-5">Back</div>
                <div class="${ID}_wizardForm__button--send">Send request</div>
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
                <li class="${ID}_wizardForm__stepsList__item active default" data-key="step-1" data-next="step-2"><span data-step="1"></span>Domanda 1</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2" data-previous="step-1" data-next="step-3"><span data-step="2"></span>Domanda 2</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3" data-previous="step-2" data-next="step-4"><span data-step="3"></span>Domanda 3</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-4" data-previous="step-3"><span data-step="4"></span>Domanda 4</li>
              </ul>
            </div>
          </div>
          <div class="${ID}_wizardForm__formsWrap">
            <form action="https://www.technogym.com/it/contacts/index/post/" id="${ID}-call-form" class="${ID}_wizardForm__wizard">
              <div class="hint"><sup>*</sup> Campo obbligatorio</div>
              <div class="${ID}_wizardForm__wizardBlock animate fadeInUp" data-show="default" id="step-1">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 1/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">Nome<sup>*</sup></h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">Inserisci il tuo nome</span>
                <input type="text" name="name" id="name--call" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button" data-target="step-2">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 2/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">Cognome<sup>*</sup></h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">Inserisci il tuo cognome</span>
                <input type="text" name="surname" id="surname--call" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button--back" data-target="step-1">Indietro</div>
                <div class="${ID}_wizardForm__button" data-target="step-3" data-surname="surname--call">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 3/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[3].title}<sup>*</sup></h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_IT[3].hint}</span>
                <input type="tel" name="phone" id="phone--call" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button--back" data-target="step-2">Indietro</div>
                <div class="${ID}_wizardForm__button" data-target="step-4">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-4">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 4/4</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[4].title}</h4>
                <div class="enquireWrap">
                  <span><sup>*</sup>Sono interessato:</span>
                  <div class="enquire fa fa-angle-down">
                    <select class="${ID}__wizardForm__wizardBlockSelect" name="enquire" id="enquire--call">
                      <option value="" disabled selected>---</option>
                      <option value="private_individual">${formContent.choices_IT[0]}</option>
                      <option value="business">${formContent.choices_IT[1]}</option>
                      <option value="freelance_professional">${formContent.choices_IT[2]}</option>
                    </select>
                  </div>
                </div>
                <div class="privacyPolicy">
                  <label for="">Letta e compresa la <a href="https://www.technogym.com/it/privacy-policy/" target="_blank">Privacy Policy</a> e accettati i <a href="https://www.technogym.com/it/terms-of-use/" target="_blank">Termini e le Condizioni d’uso</a></label>
                  <label for="privacy">
                    <input type="checkbox" name="privacy" id="privacy-2" required>
                    Acconsento al trattamento dei miei dati personali per scopi di marketing e pubblicitari.
                  </label>
                </div>
                <div class="${ID}_wizardForm__button--back" data-target="step-3">Indietro</div>
                <div class="${ID}_wizardForm__button--send">Richiamatemi</div>
              </div>
            </form>
          </div>
        </div>
        <div class="${ID}_wizardForm__wizardWrap" title="mail">
          <input type="radio" id="mail" name="trigger">
          <div class="${ID}_wizardForm__stepsWrap">
            <div class="${ID}_wizardForm__steps">
              <ul class="${ID}_wizardForm__stepsList">
                <li class="${ID}_wizardForm__stepsList__item active default" data-key="step-2-1" data-next="step-2-2"><span data-step="1"></span>Domanda 1</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2-2" data-previous="step-2-1" data-next="step-2-3"><span data-step="2"></span>Domanda 2</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2-3" data-previous="step-2-2" data-next="step-2-4"><span data-step="3"></span>Domanda 3</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2-4" data-previous="step-2-3" data-next="step-2-5"><span data-step="4"></span>Domanda 4</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-2-5" data-previous="step-2-4"><span data-step="5"></span>Domanda 5</li>
              </ul>
            </div>
          </div>
          <div class="${ID}_wizardForm__formsWrap">
            <form action="https://www.technogym.com/it/contacts/index/post/" id="${ID}-mail-form" class="${ID}_wizardForm__wizard">
              <div class="hint"><sup>*</sup> Campo obbligatorio</div>
              <div class="${ID}_wizardForm__wizardBlock animate fadeInUp" data-show="default" id="step-2-1">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 1/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">Nome<sup>*</sup></h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">Inserisci il tuo nome</span>
                <input type="text" name="name" id="name--mail" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button" data-target="step-2-2" data-name="name--mail">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2-2">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 2/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">Cognome<sup>*</sup></h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">Inserisci il tuo cognome</span>
                <input type="text" name="surname" id="surname--mail" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button--back" data-target="step-2-1">Indietro</div>
                <div class="${ID}_wizardForm__button" data-target="step-2-3" data-surname="surname--mail">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2-3">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 3/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question surname--mail--receiver name--mail--receiver">${formContent.questions_IT[1].title}<sup>*</sup></h4>
                <input type="email" name="email" id="email--mail" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button--back" data-target="step-2-2">Indietro</div>
                <div class="${ID}_wizardForm__button" data-target="step-2-4">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2-4">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 4/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[2].title}<sup>*</sup></h4>
                <textarea class="${ID}_wizardForm__wizardBlock__message" name="message" id="message--mail" rows="4" cols="50" required></textarea>
                <div class="${ID}_wizardForm__button--back" data-target="step-2-3">Indietro</div>
                <div class="${ID}_wizardForm__button" data-target="step-2-5">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-2-5">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 5/5</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[4].title}</h4>
                <div class="enquireWrap">
                  <span><sup>*</sup>Sono interessato:</span>
                  <div class="enquire fa fa-angle-down">
                    <select class="${ID}__wizardForm__wizardBlockSelect" name="enquire" id="enquire--mail">
                      <option value="" disabled selected>---</option>
                      <option value="private_individual">${formContent.choices_IT[0]}</option>
                      <option value="business">${formContent.choices_IT[1]}</option>
                      <option value="freelance_professional">${formContent.choices_IT[2]}</option>
                    </select>
                  </div>
                </div>
                <div class="privacyPolicy">
                  <label for="">Letta e compresa la <a href="https://www.technogym.com/it/privacy-policy/" target="_blank">Privacy Policy</a> e accettati i <a href="https://www.technogym.com/it/terms-of-use/" target="_blank">Termini e le Condizioni d’uso</a></label>
                  <label for="privacy">
                    <input type="checkbox" name="privacy" id="privacy-2" required>
                    Acconsento al trattamento dei miei dati personali per scopi di marketing e pubblicitari.
                  </label>
                </div>
                <div class="${ID}_wizardForm__button--back" data-target="step-2-4">Indietro</div>
                <div class="${ID}_wizardForm__button--send">Invia messaggio</div>
              </div>
            </form>
          </div>
        </div>
        <div class="${ID}_wizardForm__wizardWrap" title="quote">
          <input type="radio" id="quote" name="trigger">
          <div class="${ID}_wizardForm__stepsWrap">
            <div class="${ID}_wizardForm__steps">
              <ul class="${ID}_wizardForm__stepsList">
                <li class="${ID}_wizardForm__stepsList__item active default" data-key="step-3-1" data-next="step-3-2"><span data-step="1"></span>Domanda 1</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-2" data-previous="step-3-1" data-next="step-3-3"><span data-step="2"></span>Domanda 2</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-3" data-previous="step-3-2" data-next="step-3-4"><span data-step="3"></span>Domanda 3</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-4" data-previous="step-3-3" data-next="step-3-5"><span data-step="4"></span>Domanda 4</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-5" data-previous="step-3-4" data-next="step-3-6"><span data-step="5"></span>Domanda 5</li>
                <li class="${ID}_wizardForm__stepsList__item" data-key="step-3-6" data-previous="step-3-5"><span data-step="6"></span>Domanda 6</li>
              </ul>
            </div>
          </div>
          <div class="${ID}_wizardForm__formsWrap">
            <form action="https://www.technogym.com/it/contacts/index/post/" id="${ID}-quote-form" class="${ID}_wizardForm__wizard">
              <div class="hint"><sup>*</sup> Campo obbligatorio</div>
              <div class="${ID}_wizardForm__wizardBlock animate fadeInUp" data-show="default" id="step-3-1">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 1/6</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">Nome<sup>*</sup></h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">Inserisci il tuo nome</span>
                <input type="text" name="name" id="name--quote" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button" data-target="step-3-2" data-name="name--quote">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-2">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 2/6</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">Cognome<sup>*</sup></h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">Inserisci il tuo cognome</span>
                <input type="text" name="surname" id="surname--quote" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button--back" data-target="step-3-1">Indietro</div>
                <div class="${ID}_wizardForm__button" data-target="step-3-3" data-surname="surname--quote">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-3">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 3/6</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question surname--quote--receiver name--quote--receiver">${formContent.questions_IT[1].title}</h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_IT[1].desc} (Opzionale)</span>
                <input type="email" name="email" id="email--quote" class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button--back" data-target="step-3-2">Indietro</div>
                <div class="${ID}_wizardForm__button opt" data-target="step-3-4">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-4">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 4/6</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[3].title}<sup>*</sup></h4>
                <span class="${ID}_wizardForm__wizardBlock__desc">${formContent.questions_IT[3].desc}</span>
                <input type="tel" name="phone" id="phone--quote" required class="${ID}_wizardForm__wizardBlock__field" autofocus>
                <div class="${ID}_wizardForm__button--back" data-target="step-3-3">Indietro</div>
                <div class="${ID}_wizardForm__button" data-target="step-3-5">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-5">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 5/6</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[2].desc}<sup>*</sup></h4>
                <textarea class="${ID}_wizardForm__wizardBlock__message" name="message" id="message--quote" rows="4" cols="50" required></textarea>
                <div class="${ID}_wizardForm__button--back" data-target="step-3-4">Indietro</div>
                <div class="${ID}_wizardForm__button" data-target="step-3-6">Avanti</div>
              </div>
              <div class="${ID}_wizardForm__wizardBlock animate" id="step-3-6">
                <span class="${ID}_wizardForm__wizardBlock__questionNum">Domanda 6/6</span>
                <h4 class="${ID}_wizardForm__wizardBlock__question">${formContent.questions_IT[4].title}</h4>
                <div class="enquireWrap">
                  <span><sup>*</sup>Sono interessato:</span>
                  <div class="enquire fa fa-angle-down">
                    <select class="${ID}__wizardForm__wizardBlockSelect" name="enquire" id="enquire--quote">
                      <option value="" disabled selected>---</option>
                      <option value="private_individual">${formContent.choices_IT[0]}</option>
                      <option value="business">${formContent.choices_IT[1]}</option>
                      <option value="freelance_professional">${formContent.choices_IT[2]}</option>
                    </select>
                  </div>
                </div>
                <div class="privacyPolicy">
                  <label for="">Letta e compresa la <a href="https://www.technogym.com/it/privacy-policy/" target="_blank">Privacy Policy</a> e accettati i <a href="https://www.technogym.com/it/terms-of-use/" target="_blank">Termini e le Condizioni d’uso</a></label>
                  <label for="privacy">
                    <input type="checkbox" name="privacy" id="privacy-2" required>
                    Acconsento al trattamento dei miei dati personali per scopi di marketing e pubblicitari.
                  </label>
                </div>
                <div class="${ID}_wizardForm__button--back" data-target="step-3-5">Indietro</div>
                <div class="${ID}_wizardForm__button--send">Invia richiesta</div>
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
      //clickable step numbers
      const numbers = this.component.querySelectorAll(`.${ID}_wizardForm__stepsList__item`);
      let curContainer;
      let curSteps;
      Array.from(numbers).map(number => number.addEventListener('click', (e) => {
        const curNumber = e.target;
        let isCompleted = false;
        let nextStep;
        if(curNumber.getAttribute('data-completed')){
          isCompleted = true;
        }
        if(isCompleted){
          if(curNumber.getAttribute('data-next')){
            nextStep = curNumber.getAttribute('data-next');
          }
          const targetStep = this.component.querySelector(`#${nextStep}`);
          targetStep.querySelector(`.${ID}_wizardForm__button--back`).click();
          curContainer = e.target.closest(`.${ID}_wizardForm__wizardWrap`);
          curSteps = curContainer.querySelectorAll(`.${ID}_wizardForm__wizardBlock`);
          [].forEach.call(curSteps, function(step){
            step.classList.remove('isShowing');
            //step.classList.remove('isHiding')
          })
        }
      }));
      //Set the starting step
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
      /*if(e.target.parentNode.querySelector(`.${ID}_wizardForm__button--back`)){
        const previous = e.target.closest(`.${ID}_wizardForm__wizardBlock`).querySelector(`.${ID}_wizardForm__button--back`);
        const previousTarget = previous.getAttribute('data-target');
        document.querySelector(`[data-key="${previousTarget}"]`).setAttribute('data-completed', 'true');
      } else {

      }*/
      const parentId = e.target.parentNode.id;
      document.querySelector(`[data-key="${parentId}"]`).setAttribute('data-completed', 'true');
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
        document.getElementById(dataTarget).classList.remove('isHiding');
        document.getElementById(dataTarget).classList.add('isShowing');
      }, 500);
      window.setTimeout(() => {
        if (document.getElementById(dataTarget).querySelector(`.${ID}_wizardForm__wizardBlock__message`)) {
          document.getElementById(dataTarget).querySelector(`.${ID}_wizardForm__wizardBlock__message`).focus();
        } else if (document.getElementById(dataTarget).querySelector(`.${ID}_wizardForm__wizardBlock__field`)) {
          document.getElementById(dataTarget).querySelector(`.${ID}_wizardForm__wizardBlock__field`).focus();
        }
      }, 1500);
    }));
    //go back to the previous question
    const prevButton = this.component.querySelectorAll(`.${ID}_wizardForm__button--back`);
    Array.from(prevButton).map(item => item.addEventListener('click', (e) => {
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
        document.querySelector(`#${dataTarget}`).classList.remove('isHiding');
        document.querySelector(`#${dataTarget}`).classList.add('isShowing');
      }, 500);
    }));
    //Check if the user has entered a valid data
    const field = this.component.querySelectorAll(`.${ID}_wizardForm__wizardBlock__field`);
    Array.from(field).map(item => item.addEventListener('keyup', (e) => {
      const val = e.target.value;
      const elType = e.target.type;
      switch (elType) {
        case 'email': {
          const reg = RegExp(/^.+@.+\.\w{2,}$/);
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
          const res = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(val);
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
        const formParent = sender.closest(`.${ID}_wizardForm__wizardWrap`);
        const isPrivacyChecked = formParent.querySelector('.privacyPolicy input[type="checkbox"]').checked;
        if (isPrivacyChecked) {
          submitForm(VARIATION, formId);
        } else {
          formParent.querySelector('.privacyPolicy input[type="checkbox"]').setAttribute('style', 'border: 1px solid #f52c2c; box-shadow:0px 0px 5px 0px rgba(245,44,44,1); -webkit-box-shadow:0px 0px 5px 0px rgba(245,44,44,1); -moz-box-shadow:0px 0px 5px 0px rgba(245,44,44,1);');
        }
      });
    });
    //change the name
    const nameChanger = this.component.querySelectorAll(`.${ID}_wizardForm__button`);
    Array.from(nameChanger).forEach((name) => {
      name.addEventListener('click', () => {
        const dataName = name.getAttribute('data-name');
        const dataSurname = name.getAttribute('data-surname');
        if (dataName) {
          const dName = this.component.querySelector(`#${dataName}`).value;
          const receiver = this.component.querySelector(`.${dataName}--receiver`);
          if(receiver) {
            const nameElm = receiver.querySelector('.x-name');
            if(nameElm) {
              nameElm.innerHTML = dName;
            }
          }
        } else if (dataSurname){
          const dSurName = this.component.querySelector(`#${dataSurname}`).value;
          const receiver = this.component.querySelector(`.${dataSurname}--receiver`);
          if(receiver) {
            const surnameElm = receiver.querySelector('.x-surname');
            if(surnameElm) {
              surnameElm.innerHTML = dSurName;
            }
          }
        }
      });
    });
  }

  render() {
    document.querySelector('.forms').insertAdjacentElement('afterend', this.component);
  }
}
