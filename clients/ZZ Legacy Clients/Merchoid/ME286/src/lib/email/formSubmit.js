import { setCookie } from "../../../../../../lib/utils";
import shared from "../shared";

export default () => {

    const {
        ID, VARIATION
    } = shared;


    const formButton = document.querySelector(`.${ID}-form button`);


    const validEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };  

    const randomGenerateOffer = () => {
        const offers = {
            offer1: {
                heading: `Get <span>£5</span> off when you spend <span>£50</span>`,
                usHeading: `Get <span>$5</span> off when you spend <span>$50</span>`,
                text: `Enter your unique code at checkout for <span>£5</span> when you spend <span>£50</span>`,
                usText: `Enter your unique code at checkout for <span>$5</span> when you spend <span>$50</span>`,
                voucher: 'MNTLA'
            },
           offer2: {
                heading: `Save <span>£5</span> when you spend <span>£45</span>`,
                usHeading: `Save <span>$5</span> when you spend <span>$45</span>`,
                text: `Enter your unique code at checkout to save <span>£5</span> when you spend <span>£45</span>`,
                usText: `Enter your unique code at checkout to save <span>$5</span> when you spend <span>$45</span>`,
                voucher: 'LAPZQ'
           },
           offer3: {
                heading: `Get <span>10%</span> off on orders over <span>£50</span>`,
                usHeading: `Get <span>10%</span> off on orders over <span>£50</span>`,
                text: `Enter your unique code at checkout to get <span>10% off</span> when you spend <span>£50</span>`,
                usText: `Enter your unique code at checkout to get <span>10% off</span> when you spend <span>$50</span>`,
                voucher: 'MZWPA'
           },
        }

       const keys = Object.keys(offers);
       const randomIndex = keys[Math.floor(Math.random() * keys.length)];
       const item = offers[randomIndex];

       // add the generated offer to the box
       const voucherHeading = document.querySelector(`.${ID}-emailModal .${ID}-success .${ID}-blockHeading h3`);
       const voucherText = document.querySelector(`.${ID}-emailModal .${ID}-success .${ID}-voucherBlock p`);
       const voucherInput = document.querySelector(`.${ID}-emailModal .${ID}-success .${ID}-voucher input`);
       
       if(window.location.href.indexOf('/uk') > -1) {
        voucherHeading.innerHTML = item.heading;
        voucherText.innerHTML = item.text;
       } else {
        voucherHeading.innerHTML = item.usHeading;
        voucherText.innerHTML = item.usText;
       }
       voucherInput.value = item.voucher;

    }
    

    // on success of form submit
    const showSuccess = () => {
        const emailBlock = document.querySelector(`.${ID}-modalInner .${ID}-content`);
        const successMessage = document.querySelector(`.${ID}-modalInner .${ID}-success`);
        successMessage.classList.add(`${ID}-successShow`);
        emailBlock.classList.add(`${ID}-emailHidden`);
    }

    const submitForm = () => {
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
                if(VARIATION === '1') {
                    randomGenerateOffer();

                    let mailIcon;
                    if (window.innerWidth < 1024) {
                      mailIcon = document.querySelector(`.header-right-links__cart-links .${ID}-mail`);
                    }
              
                    if (window.innerWidth >= 1024) {
                      mailIcon = document.querySelector(`.${ID}_icon.${ID}_mail`);
                    }

                    mailIcon.style.display = 'none';
                }
                setCookie(`${ID}-emailSignUp`, true);
            }
        } else {
            errorMessage.classList.add(`${ID}-errorShow`);
            emailBox.classList.add(`${ID}-invalidEmail`);
        }
    }

    document.querySelector(`.${ID}-form input`).addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            submitForm();
        } 
    });

    //form.addEventListener('submit', e => {
    formButton.addEventListener('click', (e) => {
        e.preventDefault();
        submitForm();
    });
}