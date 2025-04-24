import {
  setup,
  moveField,
  insertRequired,
  insertAdvice,
  validateCreditCard,
} from './services';
import settings from './settings';

const {
  ID
} = settings;

const activate = () => {
  setup();

  // Modifies left panel title
  const title = document.querySelector('.box-with-border h2');
  const titleText = document.querySelector('.box-with-border h2').textContent;
  const titleBox = document.createElement('div');
  titleBox.classList.add(`${ID}_titleWrap`);
  titleBox.innerHTML = `
    <div class="${ID}_title__content">
      <h2 class="${ID}_title">${titleText}</h2>
      <img src="https://ab-test-sandbox.userconversion.com/experiments/UKB001-lock.png" class="${ID}_title__img">
      <div class="${ID}_title__text">
        <input class="trigger" type="checkbox" id="dialogTrigger" name="dialogTrigger">
        We take online security seriously and do the utmost to protect your details - 
        <label for="dialogTrigger" class="${ID}_title__link">
          find out more
        </label>
        <div class="${ID}_dialogWrap">
          <div class="${ID}_dialog">
            <p class="${ID}_dialog__content">
              UKBreakaways are members of the Bonded Coach Holiday Group of the Confederation of Passenger Transport UK Ltd. This is a government approved consumer protection scheme.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
  title.remove();
  document.querySelector('.box-with-border').insertAdjacentElement('afterbegin', titleBox);
  /**
  * Rearrange form's fields
  */
  const form = document.querySelector('.left .box-with-border');
  const newForm = document.createElement('div');
  newForm.classList.add(`${ID}_formWrap`);
  newForm.innerHTML = `
    <div class="${ID}_form">
      <span class="required"><sup>*</sup>Indicates required field</span>
      <div class="${ID}_form__block" data-field="cardHolder">
      </div>
      <div class="${ID}_form__block" data-field="cardNumber">
      </div>
      <div class="${ID}_form__block" data-field="expiryDate">
      </div>
      <div class="${ID}_form__block" data-field="cvv">
      </div>
      <div class="${ID}_form__block" data-field="issueNum">
      </div>
      <div class="${ID}_form__block" data-field="validity">
      </div>
      <div class="${ID}_form__block" data-field="promo">
          <div class="${ID}_promo">
            <input type="checkbox" id="triggerPromo" name="triggerPromo">
            <label for="triggerPromo" class="${ID}_promo__header">
              Apply promo code
            </label>
            <div class="${ID}_promo__body">
            </div>
          </div>
      </div>
    </div>
  `;
  form.querySelector('hr').insertAdjacentElement('afterend', newForm);
  Array.from(form.querySelectorAll('.field-row-wide')).forEach(function (formField, i) {
    switch (i) {
      case 0:
        moveField(formField, '[data-field="cardNumber"]', form);
        insertRequired('[data-field="cardNumber"] label');
        insertAdvice('cardNumber');
        const cardNumber = document.querySelector('[data-field="cardNumber"] #txtCardNo').outerHTML;
        const wrapper = document.createElement('div');
        wrapper.classList.add('txtCardNo-wrap');
        wrapper.innerHTML = cardNumber;
        document.querySelector('[data-field="cardNumber"] #txtCardNo').remove();
        document.querySelector('[data-field="cardNumber"] label').insertAdjacentElement('afterend', wrapper);
        document.querySelector('[data-field="cardNumber"] #txtCardNo').addEventListener('blur', function(e){
          const cardNumber = e.target.value;
          if(cardNumber.length == 16){
            validateCreditCard(cardNumber);
          }
        });
        document.querySelector('[data-field="cardNumber"] #txtCardNo').addEventListener('keyup', function(e){
          const cardNumber = e.target.value;
          if(cardNumber.length == 16){
            validateCreditCard(cardNumber);
          } else if(cardNumber.length < 16){
            if(document.querySelector('.txtCardNo-wrap').getAttribute('data-validation')){
              document.querySelector('.txtCardNo-wrap').removeAttribute('data-validation');
            }
          }
        });
        break;
      case 1:
        moveField(formField, '[data-field="expiryDate"]', form);
        insertRequired('[data-field="expiryDate"] label');
        break;
      case 2:
        moveField(formField, '[data-field="issueNum"]', form);
        insertAdvice('issueNum');
        break;
      case 3:
        moveField(formField, '[data-field="validity"]', form);
        insertAdvice('validity');
        break;
      case 4:
        moveField(formField, '[data-field="cardHolder"]', form);
        insertRequired('[data-field="cardHolder"] label');
        break;
      case 5:
        moveField(formField, '[data-field="cvv"]', form);
        insertRequired('[data-field="cvv"] label');
        const info = document.createElement('label');
        info.classList.add('i-icon', `${ID}_info`);
        info.id = 'cvvInfo';
        info.setAttribute('for', 'infoTrigger');
        info.innerHTML = `
          <input class="trigger" type="checkbox" id="infoTrigger" name="infoTrigger">
          <div class="${ID}_dialogWrap">
            <div class="${ID}_dialog">
              <p class="${ID}_dialog__content">
                This 3 digit number is on the back of your payment card, next to the signature strip.
              </p>
            </div>
          </div>
        `;
        document.querySelector('[data-field="cvv"] #cv2modal').insertAdjacentElement('afterend', info);
        document.querySelector('[data-field="cvv"] #cv2modal').remove();
        break;
      case 6:
        const payContent = formField.innerHTML;
        formField.remove();
        const newBlock = document.createElement('div');
        newBlock.classList.add('box-with-border', 'orange', `${ID}_box-with-border`);
        newBlock.innerHTML = payContent;
        newBlock.querySelector('label').innerText = 'Total to pay today';
        document.querySelector('.box-with-border.purple').insertAdjacentElement('afterend', newBlock);
        const continueButton = document.querySelector('.left .box-with-border.orange');
        const continueButtonContent = continueButton.innerHTML;
        continueButton.remove();
        const buttonWrap = document.createElement('div');
        buttonWrap.classList.add(`${ID}_buttonWrap`);
        buttonWrap.innerHTML = continueButtonContent;
        document.querySelector(`.${ID}_box-with-border`).insertAdjacentElement('afterend', buttonWrap);
        const advice = document.createElement('div');
        advice.classList.add(`${ID}_advice`);
        advice.innerHTML = 'If you need any help please call us on <a href="tel:03446827000">03446827000</a> between 8am and 8pm 7 days a week';
        document.querySelector(`.${ID}_buttonWrap`).insertAdjacentElement('afterend', advice);
        break;
      case 7:
        moveField(formField, `[data-field="promo"] .${ID}_promo .${ID}_promo__body`, form);
        if(window.innerWidth <= 768){
          const promo = document.querySelector('[data-field="promo"]').innerHTML;
          document.querySelector('[data-field="promo"]').remove();
          const element = document.createElement('div');
          element.classList.add(`${ID}_form__block`);
          element.setAttribute('data-field', 'promo');
          element.innerHTML = promo;
          document.querySelector(`.${ID}_box-with-border`).insertAdjacentElement('afterend', element);
        }
        break;
      default:
        break;
    }
  });
  /**
   * Move cards icons from bottom of the page to the left panel
   */
  const cardsImg = document.querySelector('footer .card-type .right img').getAttribute('src');
  const imgWrap = document.createElement('div');
  imgWrap.classList.add(`${ID}_imgWrap`);
  imgWrap.innerHTML = `
    <img src="${cardsImg}" class="${ID}_img">
  `;
  document.querySelector(`.${ID}_formWrap`).insertAdjacentElement('beforebegin', imgWrap);
  /**
   * Hide the tooltip
   */
  document.body.addEventListener('click', function(e){
    if(e.target !== document.querySelector(`.${ID}_title__link`)){
      const triggers = document.querySelectorAll('.trigger');
      Array.from(triggers).forEach(function(trigger){
        const isChecked = trigger.checked;
        if(isChecked){
          trigger.click();
        }
      });
    }
  });
};

export default activate;
