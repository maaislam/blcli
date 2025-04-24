import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';

const { ID, VARIATION } = shared;


export const validQuestion = () => {
  let valid = false;
  const question = document.querySelector(`.${ID}-question__submit input`).value;

  if (question.length > 3) {
    valid = true;
    document.querySelector(`.${ID}-question__submit button#${ID}-submit-question`).classList.remove('inactive');
  } else {
    document.querySelector(`.${ID}-question__submit button#${ID}-submit-question`).classList.add('inactive');
  }

  return valid;
}

const showSuccess = () => {
  const qInput = document.querySelector(`.ME310-question__submit input`);
  qInput.value = '';
  document.querySelector(`.${ID}-loader`).classList.add('hidden');
  document.querySelector(`.${ID}-question__submit button#${ID}-submit-question`).classList.add('inactive');
  const successMsg = document.querySelector(`p#${ID}-success`);
  successMsg.classList.add('show');
  successMsg.classList.add('visible');

  setTimeout(() => {
    successMsg.classList.remove('visible');
  }, 5000);
  setTimeout(() => {
    successMsg.classList.remove('show');
  }, 5650);
}

export const submitForm = () => {
  const questionInput = document.querySelector(`.${ID}-question__submit input`).value;

  // if valid email
  if(validQuestion()) {

      const data = {question: questionInput, timestamp: new Date().getTime()}
      jQuery.ajax({
        //https://script.google.com/macros/s/AKfycbzU1olA65KLT8ukObD7RkYcrManAwOe58JTqocBONnTsQ_C2i_zqJ31Jn45QAO_VAFM/exec
        //AKfycbzU1olA65KLT8ukObD7RkYcrManAwOe58JTqocBONnTsQ_C2i_zqJ31Jn45QAO_VAFM

          url: "https://script.google.com/macros/s/AKfycbw6yRwVuWpP0BKiIMxnNJmcj209DvpCHi8uwOqOURBCQQlrf6gKNhzE7newUnlG2Tj3/exec",
          type: "POST",
          data: data,
          contentType: "application/javascript",
          dataType: 'jsonp',
          complete: function() {
            showSuccess();
          }
      });

      window.receipt = function(res) {
      }
  } else {
      // errorMessage.classList.add(`${ID}-errorShow`);
      // emailBox.classList.add(`${ID}-invalidEmail`);
  }
}



