import shared from '../../../../../core-files/shared';

const { ID } = shared;


export const validQuestion = () => {
  let valid = false;
  const question = document.querySelector(`.${ID}-question__submit input`).value;

  if (question.length > 3) {
    valid = true;
    document.querySelector(`.${ID}-question__submit button#${ID}-submit-question`).classList.remove('inactive');
  } else {
    valid = false;
    document.querySelector(`.${ID}-question__submit button#${ID}-submit-question`).classList.add('inactive');
  }

  return valid;
}

const showSuccess = () => {
  const qInput = document.querySelector(`.${ID}-question__submit input`);
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
  const PDPurl = window.location.href;

  // if valid email
  if(validQuestion()) {
    console.log('valid question');

      const data = {question: questionInput, timestamp: new Date().getTime(), pdpurl: PDPurl};
      window.jQuery.ajax({
          url: "https://script.google.com/macros/s/AKfycbwf3l2BQx0SKmZhS4yIvqGdXMxsT7zwGCQvgSfIDXfBsepBrd3hIrS7_DmVTK2jY-mn/exec",
         // url: "https://script.google.com/macros/s/AKfycbw6yRwVuWpP0BKiIMxnNJmcj209DvpCHi8uwOqOURBCQQlrf6gKNhzE7newUnlG2Tj3/exec",
          type: "POST",
          data: data,
          contentType: "application/javascript",
          dataType: 'jsonp',
          complete: function() {
            showSuccess();
          }
      });

      window.receipt = function(res) {
        console.log(res)
      }
  } else {
      // errorMessage.classList.add(`${ID}-errorShow`);
      // emailBox.classList.add(`${ID}-invalidEmail`);
  }
}



