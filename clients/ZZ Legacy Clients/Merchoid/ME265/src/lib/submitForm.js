import shared from "./shared";

export default () => {

    const { ID } = shared;


    const formButton = document.querySelector(`.${ID}-form .${ID}-button`);


    const validEmail = (email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };  
      

     // on success of form submit
    const showSuccess = () => {
        const successStep = document.querySelector(`.${ID}-successContent`);
        const introStep = document.querySelector(`.${ID}-signUpText`);
        successStep.classList.add(`${ID}-stepShow`);
        introStep.classList.remove(`${ID}-stepShow`);

        setTimeout(() => {
            localStorage.setItem(`ME265-closed`, 1);
            document.querySelector(`.${ID}-emailModal`).classList.remove(`${ID}-modalShow`);
            document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayShow`);
            document.body.classList.remove(`${ID}-noScroll`);
        }, 3000);
    }
    
    const submitFormEvent = () => {
      const emailBox = document.querySelector(`.${ID}-form input`);
      const emailInput = emailBox.value;
      const errorMessage = document.querySelector(`.${ID}-emailForm .${ID}-error`);

      // if valid email
      if(validEmail(emailInput)) {

        errorMessage.classList.remove(`${ID}-errorShow`);
        emailBox.classList.remove(`${ID}-invalidEmail`);
        formButton.classList.add(`${ID}-loading`);

        const data = {email: emailInput, timestamp: new Date().getTime()}
        jQuery.ajax({
            url: "https://script.google.com/macros/s/AKfycbzZpskgEPPq86-DCaNNnmDxDkf6o0E3Qg4vaqsBMlq9AS1H423i/exec",
          type: "POST",
          data: data,
          contentType: "application/javascript",
          dataType: 'jsonp'
        })
        .done(function(res) {
        })
        .fail(function(e) {

        });

        window.receipt = function(res) {
          // this function will execute upon finish
         formButton.classList.remove(`${ID}-loading`);
         showSuccess();
        }
    } else {
      errorMessage.classList.add(`${ID}-errorShow`);
      emailBox.classList.add(`${ID}-invalidEmail`);
    }
    }

    document.querySelector(`.${ID}-form input`).addEventListener("keydown", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        submitFormEvent();
      } 
    });

    formButton.addEventListener('click', (e) => {
        e.preventDefault();
        submitFormEvent();
    });

}