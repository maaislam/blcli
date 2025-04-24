import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { closeBox, ctaClick, showBox } from "./helpers";


const {
    ID,
    VARIATION
} = shared;


export default class AgeLightbox {
    constructor() {
        this.create();
        this.bindEvents();
        this.render();

    }

    create() {

        const element = document.createElement('div');
        element.classList.add(`${ID}-ageBox`);
        element.innerHTML = `
        <div class="${ID}-close"></div>
        <div class="${ID}-modalInner">
            <h3>Age restricted Item</h3>
            <div class="${ID}-question ${ID}-first ${ID}-active">
                <p>This product is age restricted.</p>
                <p>You must be 18 or over to purchase and receive this item.</p>
                <div class="${ID}-options">
                    <p>Are you over the age of 18?</p>

                    <div class="${ID}-boxes">
                        <label class="${ID}-radio">
                            <div class="${ID}-radio__input">
                                <input type="radio" name="age" value="yes"/>
                                <span class="${ID}-radio__control"></span>
                            </div>
                             <span class="${ID}-radio__label">Yes, I'm over 18</span>
                        </label>
                  
                        <label class="${ID}-radio">
                            <div class="${ID}-radio__input">
                                <input type="radio" name="age" value="no"/>
                                <span class="${ID}-radio__control"></span>
                            </div>
                             <span class="${ID}-radio__label">No, I'm under 18</span>
                        </label>
                    </div>
                    <div class="${ID}-button ${ID}-disabled">Confirm</div>
                    <div class="${ID}-restrictedBox ${ID}-question">
                        <p>Sorry! You cannot purchase this item if you or the recipient is under the age of 18.</p>
                    </div>
                </div>
            </div>
        </div>`;

        this.component = element;

        // add overlay
        document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay ${ID}-overlayHide"></div>`);

    }

    bindEvents() {
        const { component } = this;


        component.querySelector(`.${ID}-close`).addEventListener('click', () => {
            noBox.classList.remove(`${ID}-active`);
            closeBox(component);
        });
        document.querySelector(`.${ID}-overlay`).addEventListener('click', () => {
            noBox.classList.remove(`${ID}-active`);
            closeBox(component);
        });
        
        const noBox = component.querySelector(`.${ID}-restrictedBox`);
        const ageCheck = component.querySelector(`.${ID}-first`);

        const noClicked = () => {
            noBox.classList.add(`${ID}-active`);
            fireEvent('Clicked Under 18');
            component.querySelector(`.${ID}-button`).classList.add(`${ID}-disabled`);
        }

        const yesClicked = () => {
            noBox.classList.remove(`${ID}-active`);
            fireEvent('Clicked Over 18');
            document.querySelector(`.${ID}-ageCheck`).classList.add(`${ID}-hidden`);
        }

        component.querySelectorAll('input[name="age"]').forEach((input) => {
            input.addEventListener('change', (e) => {
               if(e.currentTarget.value === 'no') {
                noClicked();
               }

               else if(e.currentTarget.value === 'yes') {
                yesClicked();
                component.querySelector(`.${ID}-button`).classList.remove(`${ID}-disabled`);
               }
            });
        });


       
      

        if(ageCheck && noBox) {

            component.querySelector(`.${ID}-button`).addEventListener('click', () => {
                const checkedAge = document.querySelector('input[name="age"]:checked');
                if (checkedAge.value === 'yes') {

                    yesClicked();

                    // add to bag
                    closeBox(component);
                    sessionStorage.setItem(`${ID}-over18`, true);

                    document.documentElement.classList.remove(`${ID}-alcohol`);
                    if(component.getAttribute('type') === 'addAll') {
                        document.querySelector('.button-fancy-large.add-all-to-cart').click();
                    }
                    else if(component.getAttribute('type') === 'addToBag') {
                        document.querySelector('#add-to-cart').click();
                    } else if(component.getAttribute('type') === 'subscription') {
                        document.querySelector('.impulse-upsell-wrapper #og-upsell-button').click();
                    }

                    document.querySelector(`.${ID}-ageCheck`).classList.add(`${ID}-hidden`);
                    document.documentElement.classList.add(`${ID}-noRestriction`);
                }
            });
        }
    }

    render() {
        const {
            component
        } = this;
        document.body.append(component);

        component.classList.add(`${ID}-modalHide`);
        document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayHide`);

    }
}
