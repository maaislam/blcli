import { events, setCookie, getCookie, deleteCookie } from "../../../../../lib/utils";

const continueBtn = () => `<button class="BD-close BD004-continue btn tertiary-btn">Continue To Site</button>`;
const closeLink = () => `<button class="BD-close">Close</button>`;

const formValue = document.querySelector('[name=form_key]').value;

const loginForm = () => `
<form class="form form-login" action="https://www.brewdog.com/uk/customer/account/loginPost/referer/aHR0cHM6Ly93d3cuYnJld2RvZy5jb20vdWsv/" method="post" id="BD-login-form" novalidate="novalidate">
<input name="form_key" type="hidden" value="${formValue}">            <fieldset class="fieldset login">
    
    <div class="field email required">
        <label class="label BD-hide" for="email"><span>Email Address</span></label>
        <div class="control">
            <input name="login[username]" value="" placeholder="Email Address" autocomplete="off" id="email" type="email" class="input-text" title="Email" data-validate="{required:true, 'validate-email':true}" aria-required="true">
        </div>
    </div>
    <div class="field password required">
        <label for="pass" class="label BD-hide"><span>Password</span></label>
        <div class="control">
            <input name="login[password]" type="password" placeholder="Password" autocomplete="off" class="input-text" id="pass" title="Password" data-validate="{required:true}" aria-required="true">
        </div>
    </div>
    <div class="field actions BD-hide">
                            <div class="secondary"><a class="back-link" href="https://www.brewdog.com/uk/customer/account/forgotpassword/"><span>Forgotten Your Password?</span></a></div>
    </div>
    <div class="actions-toolbar">
        <div class="primary-action"><button type="submit" class="btn tertiary-btn" name="send" id="send2"><span>Login</span></button></div>
    </div>
   
</fieldset>
</form>
`;

export const popupHtml = () => {
    return `
        <div class="BD004-popup">
            <div class="BD004-popup--wrap">
            
                <div class="BD004-popup--center">
                    <h1 class="heading heading-1">Hey There!</h1>

                    <p>Do you have a BrewDog.com account?</p>

                    <div class="BD-close BD004-popup--close">
                        <img src="https://ucds.ams3.digitaloceanspaces.com/BD004/Screenshot_2020-07-09_at_14-removebg-preview.png" alt="close" />
                    </div>


                    <div class="BD004-popup--tabs">

                        <button class="BD-tabBtn BD-toggle" data-punk="yes">Yes</button>
                        <button class="BD-tabBtn BD-toggle" data-punk="no">No</button>

                        <div class="BD004-tabs--content">

                            <div class="BD004-tab--content BD004-tabs--yes BD-hide">
                                <p>Would you like to login before browsing?</p>

                                ${loginForm()}

                                ${closeLink()}
                            </div>

                            <div class="BD004-tab--content BD004-tabs--no BD-hide">
                                <input name="BD-age" type="checkbox" id="BD004-confirmAge" />
                                <label for="BD-age">I am at least 18 years of age and the minimum legal age for purchasing alcohol.</label>

                                ${continueBtn()}

                                ${closeLink()}
                            </div>


                            <div class="BD004-tabs--gen">
                                ${continueBtn()}

                                ${closeLink()}
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    `;
};


export const popupControls = {
    close(popup) {
        popup ? popup.classList.add('BD-hide') : null;

        events.send('BD004', 'BD004 Click', 'BD004 Closed popup');

        // Set storage
        window.localStorage.setItem('BD-closedPopup', true);
    },
    tabs() {
        const tabContainer = document.querySelector('.BD004-popup--tabs');
        const tabButtons = document.querySelectorAll('.BD004-popup--tabs button.BD-tabBtn');
        const yesContent = tabContainer.querySelector('.BD004-tabs--yes');
        const noContent = tabContainer.querySelector('.BD004-tabs--no');
        const genContent = tabContainer.querySelector('.BD004-tabs--gen');

        const toggle = (choice) => {
            switch (choice) {
                case 'yes':
                    genContent.classList.add('BD-hide');
                    noContent.classList.add('BD-hide');
                    yesContent.classList.remove('BD-hide');

                    events.send('BD004', 'BD004 Click', 'BD004 clicked yes');
                    
                    if (getCookie('BD004 - Non-EFP')) {
                        deleteCookie('BD004 - Non-EFP');
                    }
                    setCookie('BD004 - Equity punk', 'true');
                    break;
                case 'no':
                    genContent.classList.add('BD-hide');
                    noContent.classList.remove('BD-hide');
                    yesContent.classList.add('BD-hide');

                    events.send('BD004', 'BD004 Click', 'BD004 clicked no');

                    if (getCookie('BD004 - Equity punk')) {
                        deleteCookie('BD004 - Equity punk');
                    }
                    setCookie('BD004 - Non-EFP', 'true');
                    break;
                default:
                    break;
            }
        }

        if (tabContainer && tabButtons) {

            for (let i = 0; tabButtons.length > i; i += 1) {
                let thisTabTitle = tabButtons[i];

                thisTabTitle.addEventListener('click', (e) => {
                    tabButtons[0].classList.add('BD-toggle');
                    tabButtons[1].classList.add('BD-toggle');

                    thisTabTitle.classList.remove('BD-toggle');

                    toggle(e.target.getAttribute('data-punk'));
                });
            }

        }

    },
    run() {
        const closeBtns = document.querySelectorAll('.BD-close');
        const popup = document.querySelector('.BD004-popup');
        for (let i = 0; closeBtns.length > i; i += 1) {
            closeBtns[i].addEventListener('click', () => this.close(popup));
        }

        // Click outside the popup
        const popupWrap = popup.querySelector('.BD004-popup--wrap');

        popup.addEventListener('click', (e) => {
            if (!popupWrap.contains(e.target)){
                
                this.close(popup)
            }
        })
    }
};