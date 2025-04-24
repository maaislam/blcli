import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import formSubmit from "./formSubmit";

export default () => {

    const { ID } = shared;

    const pullInForm = () => {
        // pull in form
        return new Promise((resolve, reject) => {
          const emailEl = document.querySelector(`.${ID}-emailSignUp`);
            const request = new XMLHttpRequest();
                request.open('GET','https://www.boots.com/', true);
                request.onload = () => {
                  if (request.status >= 200 && request.status < 400) {
                    const temp = document.createElement('html');
                    temp.innerHTML = request.responseText;
                    const items = temp.querySelector('#cu_newsletter_signup');
                    emailEl.querySelector(`.${ID}-signUpform`).appendChild(items);
                    resolve();

                  }
                };
                request.send();
          
        });
    }

    document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-emailoverlay"></div>`);

    /*
    <div class="spinnerContainer">
            <img src="https://www.boots.com/wcsstore/eBootsStorefrontAssetStore/images/boots/boots_loader_spinner.gif" alt="">
          </div>
    */

    const createEmailBox = () => {
      const emailBox = document.createElement('div');
      emailBox.classList.add(`${ID}-emailSignUp`);
      emailBox.innerHTML = 
      `<div class="${ID}-emailContent container">
        <div class="${ID}-close"></div>
          
          <div class="${ID}-left">
            <div class="${ID}-bootsLILogo"></div>
            <div class="${ID}-signUpform"></div>
          </div>

          <div class="${ID}-right" style="background-image: url(https://service.maxymiser.net/cm/images-eu/new-boots-com/38554024E4365C028EE0238E732D708563C0E64BA00333D566C1C107643095F8.jpeg?meta=/BO136---Pharmacy-Homepage/210412358_1222060284905556_5775961665766830836_n1.jpeg)"></div>
          
        </div>`;

        document.body.appendChild(emailBox);
    }

    const boxEvents = () => {
        const emailBox = document.querySelector(`.${ID}-emailSignUp`);
        const overlay = document.querySelector(`.${ID}-emailoverlay`);

        const closeBox = () => {
          emailBox.classList.remove(`${ID}-emailShow`);
          overlay.classList.remove(`${ID}-overlayShow`);
          localStorage.setItem(`${ID}-emailClosed`, 1);
          document.documentElement.classList.remove(`${ID}-noScroll`);
        }

        const openBox = () => {
          emailBox.classList.add(`${ID}-emailShow`);
          overlay.classList.add(`${ID}-overlayShow`);
          document.documentElement.classList.add(`${ID}-noScroll`);
        }


        var timeoutInMiliseconds = 6000;
        var timeoutId; 
          
        function startTimer() { 
            // window.setTimeout returns an Id that can be used to start and stop a timer
            timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
        }
          
        function doInactive() {
           // do some other initialization
           openBox();
            // does whatever you need it to actually do - probably signs them out or stops polling the server for info
        }
        function resetTimer() { 
          window.clearTimeout(timeoutId)
          startTimer();
      }
      
        
        function setupTimers () {
            document.addEventListener("mousemove", resetTimer, false);
            document.addEventListener("mousedown", resetTimer, false);
            document.addEventListener("keypress", resetTimer, false);
            document.addEventListener("touchmove", resetTimer, false);
            
            startTimer();
        }
        
        window.addEventListener('load', () => {
            setupTimers();
        })



        const closeIcon = document.querySelector(`.${ID}-emailSignUp .${ID}-close`);

    
        closeIcon.addEventListener('click', () => {
          closeBox();
        });

        overlay.addEventListener('click', () => {
          closeBox();
        });

        // form submit
        const form = document.querySelector(`.${ID}-emailSignUp form`);
        form.addEventListener('submit', () => {
         // setTimeout(() => {
            //closeBox();
          //}, 10000);
        });
       
    }


    createEmailBox();

    pullInForm().then(() => {
        boxEvents();
        formSubmit();

        fireEvent('Email Sign Up Shown');

        // change box text
        const signUp = document.querySelector('#cu_newsletter_signup');
        signUp.querySelector('.newsletter_signupContainer h4').textContent = 'Save 20% on Love Island products';
        signUp.querySelector('.newsletter_signupContainer p').textContent = 'Save 20% across all Love Island products when you sign up to our newsletter';

        signUp.querySelector('.success').innerHTML = `
        <h3>Thanks! You've been added to our mailing list</h3>
        <p>Use this voucher code at checkout to get 20% off all Love Island products</p>
        <div class="${ID}-voucher">
            <input type="text" readonly value="SPOTTEDINTHEVILLA"/>
            <div class="${ID}-copyButton">
            <div class="${ID}-copyLabel">Copy to clipboard</div>
            </div>
            <div class="${ID}-codeCopied">Code copied!</div>
           
         </div>
         <div class="${ID}-button">Shop the Villa</div>`;

         const copyTextButton = document.querySelector(`.${ID}-copyButton`);
         const textToCopy = document.querySelector(`.${ID}-voucher input`);
         copyTextButton.addEventListener('click', () => {
            
            document.querySelector(`.${ID}-codeCopied`).classList.add(`${ID}-codeCopyShow`);
  
            textToCopy.select();
            textToCopy.setSelectionRange(0, 99999); /*For mobile devices*/
            document.execCommand("copy");

            setTimeout(() => {
              document.querySelector(`.${ID}-codeCopied`).classList.remove(`${ID}-codeCopyShow`);
          }, 1500);
         });


         const continueButton = document.querySelector(`.success .${ID}-button`);
         const emailBox = document.querySelector(`.${ID}-emailSignUp`);
         const overlay = document.querySelector(`.${ID}-emailoverlay`);
         continueButton.addEventListener('click', () => {
            emailBox.classList.remove(`${ID}-emailShow`);
            overlay.classList.remove(`${ID}-overlayShow`);
            localStorage.setItem(`${ID}-emailClosed`, 1);
            document.documentElement.classList.remove(`${ID}-noScroll`);
            window.location.href = 'https://www.boots.com/love-island/in-the-villa';
        });
    });

}