import gender from "./gender";

const form = (id) => {
    const htmlStr = `
        <div class='formWrapper'>
            <form class='${id}__form'>
                <div class='formRow ${id}__optionSection'>
                    <div class='formRow__radioBtns'>
                        
                        <input type='radio' id='parentToBe' name='parent' value='parentToBe'>
                        <label for='parentToBe' class='${id}__option parentToBeLabel' data-label='parentToBe'>
                            <div class='type'>
                                <img src='https://blcro.fra1.digitaloceanspaces.com/MAM538/MAM538-parent-to-be.svg' alt='parentToBe'>
                                <span>Parent To Be</span>
                            </div>
                        </label>

                        <input type='radio' id='parent' name='parent' value='parent'>
                        <label for='parent' class='${id}__option alreadyParentLabel ${id}__selectedOption' data-label='alreadyParent'>
                            <div class='type'>
                                <img src='https://blcro.fra1.digitaloceanspaces.com/MAM538/MAM538-parent.svg' alt='Already A Parent'>
                                <span>Already A Parent</span>
                            </div>
                        </label>

                        <input type='radio' id='gifter' name='parent' value='gifter'>
                        <label for='gifter' class='${id}__option gifterLabel' data-label='gifter'>
                            <div class='type'>
                                <img src='https://blcro.fra1.digitaloceanspaces.com/MAM538/MAM538-gift.svg' alt='Gifting'>
                                <span>I'm Gifting</span>
                            </div>
                        </label>

                    </div>
                </div>
                <div class='formRow'>
                    <div class='babyInfo'>
                        ${gender(id)}
                        <input type='text' class='${id}__name ${id}-babyNameInput' id='name' name='childName'>
                        <label for='name' class='${id}-babyNameLabel ${id}-moving-label'>Name</label>
                    </div>
                </div>
                <div class='formRow'>
                    <label for='dueDate' class='dueDateLabel'>Due Date
                        <input type='date' id='dueDate' name='dueDate'>
                    </label>
                </div>
                <div class='formRow your-details-row'>
                    <h2 class='your-details'>Your details</h2>
                    <span>*Required fields</span>
                </div>
                <div class='formRow textInput ${id}__requiredInput'>
                    <input type='text' id='firstName' name='firstName' class="${id}-firstNameInput" required>
                    <label for='firstName' class='${id}-firstNameLabel ${id}-moving-label'>First name*</label>
                    <span class="nameRequiredText requiredText"></span>
                </div>
                <div class='formRow emailInput ${id}__requiredInput'>
                    <input type='email' id='email' name='email' required>
                    <label for='email' class='${id}-emailLabel ${id}-moving-label'>Email*</label>
                    <span class="emailRequiredText requiredText"></span>
                </div>
                <div class='formRow ${id}-submit-row'>
                    <div class='btnWrapper'>
                        <button type='submit' class='submitBtn'>Sign Up</button>
                    </div>
                </div>
                <div class='formRow'>
                    <p class='subtext'>
                    By entering your personal information and clicking submit, you agree and consent to receive marketing communications 
                    from us and confirm that you have read and agree to our <a href="/pages/terms-conditions">Terms & Conditions</a>, <a href="/pages/privacy-policy/">Privacy Policy</a> & <a href="/pages/cookie-policy/">Cookies Policy</a>. You can opt out at any time.
                    </p>
                </div>
            </form>
        </div>
    `;
    return htmlStr;
};
export default form;
