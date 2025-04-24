import shared from "../../../../../core-files/shared"

const { ID } = shared;

export const cardTypeContent = () => {

    document.querySelector('#AddCardRegistrationForm').classList.add(`${ID}-hidden`);

    const cardMarkup = 
    `<div class="${ID}-radioContainer">
        <h3>Please choose one of the following</h3>
        <div class="${ID}-radios">
            <div class="${ID}-radio">
                <input type="radio" id="none" value="noCard" name="cardType">
                <label for="none">I’ve picked up an Advantage Card in store or don’t have a card at all</label>
            </div>
            <div class="${ID}-radio">
                <input type="radio" value="oldCard" id="old" name="cardType">
                <label for="old">I have an older Advantage Card without a security code on the back</label>
            </div>
        </div>
        <p class="${ID}-loginText ${ID}-hidden">Log in to, or create a Boots.com account, and you’ll be able to link your card there</p>
        <div class="${ID}-continue disabled">Continue</div>
    </div>`;


    document.querySelector('.title').insertAdjacentHTML('afterend', cardMarkup);

}

export const cardType = () => {

    const radioContainer = document.querySelector(`.${ID}-radioContainer`);
    const radioButtons = document.querySelectorAll(`.${ID}-radio`);
    const emailForm = document.querySelector('#AddCardRegistrationForm');
    const continueBtn = document.querySelector(`.${ID}-radioContainer .${ID}-continue`);
    const loginTxt = document.querySelector(`.${ID}-loginText`);

    if(radioContainer.querySelector(`input[name="cardType"]:checked`)) {
        if(radioContainer.querySelector(`input[name="cardType"]:checked`).id === 'none') {
            loginTxt.classList.add(`${ID}-hidden`);
            continueBtn.textContent = 'Continue';
            continueBtn.classList.remove('disabled');

        } else if(radioContainer.querySelector(`input[name="cardType"]:checked`).id === 'old') {
            loginTxt.classList.remove(`${ID}-hidden`);
            continueBtn.textContent = 'Login/Register';
        }
    }


    // on radio check
    for (let index = 0; index < radioButtons.length; index += 1) {
        const element = radioButtons[index];
        element.addEventListener('click', () => {
            continueBtn.classList.remove('disabled');

            const selectedType = element.querySelector(`input`).id;

            if(selectedType === 'none') {
                loginTxt.classList.add(`${ID}-hidden`);
                continueBtn.textContent = 'Continue';

            } else if(selectedType === 'old') {
                loginTxt.classList.remove(`${ID}-hidden`);
                continueBtn.textContent = 'Login/Register';
            }
        });
    }

    // on continue click
    if(continueBtn.classList.contains('disabled')) {
        continueBtn.addEventListener('click', () => {

            radioContainer.classList.add(`${ID}-hidden`);

            const selectedOption = document.querySelector(`input[name="cardType"]:checked`).id;

            // show form
            if(selectedOption === 'none') {
                emailForm.classList.remove(`${ID}-hidden`);
            } 

            // take to login
            if(selectedOption === 'old') {
                window.location.href = 'https://www.boots.com/webapp/wcs/stores/servlet/BootsLogonForm';
            }
        });
    }

}