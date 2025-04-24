import {__} from './helpers';
import {cacheDom} from '../../../../../lib/cache-dom';

class FormManager {
    /**
     * @param {HTMLFormElement} form
     */
    constructor(form) {
        this.form = form;
    }

    /**
     * Shifts form from one section to another
     *
     * @param {HTMLElement} to
     * @param {String} identifier
     * @param {Boolean} clear
     */
    shiftTo(to, dataset, clear = true) {
        if(clear) {
            to.innerHTML = '';
        }

        to.appendChild(this.form);

        this.addFormButton(dataset);

        this.applyShiftLogic(dataset);

        this.clearValidation();

        return this;
    }

    /**
     * Forms have custom buttons
     *
     * @param {String} identifier
     */
    addFormButton(dataset) {
        const submitWrap = cacheDom.get('.tg28-form-submit-wrap', true);
        if(submitWrap) {
            submitWrap.remove();
        }
                                                        
        const buttonText = dataset.buttontext;

        this.form.querySelector('form').insertAdjacentHTML('beforeend', `
            <div class="tg28-form-submit-wrap">
                <button type="submit" class="button button-default tg28-button-added">${buttonText}</button>
            </div>
        `);
    }

    /**
     * Post shift logic - things we do to the form
     * depending on where it's being moved to
     *
     * @param {String} identifier
     */
    applyShiftLogic(dataset) {
        const reasonField = cacheDom.get('select#reason'),
            toggleMessage = cacheDom.get('.tg28-toggle-message'),
            phoneLabel = cacheDom.get('.field.telephone > label'),
            phoneInput = cacheDom.get('.field.telephone [name=telephone]'),
            emailLabel = cacheDom.get('.field.email > label'),
            emailInput = cacheDom.get('.field.email [name=email]'),
            messageRow = cacheDom.get('.tg28-input-row--comment'),
            messageLabel = cacheDom.get('.tg28-input-row--comment > label'),
            messageTextarea = cacheDom.get('.tg28-input-row--comment textarea');

        console.log(dataset);

        // ----------------------------------------------------------
        // Reset message toggle
        // ----------------------------------------------------------
        toggleMessage.classList.add('tg28-toggle-message--hide');

        cacheDom.get('.tg28-input-row--comment label')
            .classList.remove('tg28-input-row--comment-hidden');
        cacheDom.get('.tg28-input-row--comment .input-box')
            .classList.remove('tg28-input-row--comment-hidden');

        // ----------------------------------------------------------
        // Apply dataset defined each item
        // ----------------------------------------------------------
        if(reasonField && dataset.reasonfield) {
            reasonField.value = dataset.reasonfield;
        }
        if(messageLabel && messageTextarea) {
            if(dataset.messagerequired === "0") {
                messageLabel.classList.remove('required');
                messageTextarea.classList.remove('required-entry');
            } else if(dataset.messagerequired === "1") {
                messageLabel.classList.add('required');
                messageTextarea.classList.add('required-entry');
            }
        }

        if(dataset.phonerequired === "1") {
            phoneLabel.classList.add('required');
            phoneInput.classList.add('required-entry');
        } else {
            phoneLabel.classList.remove('required');
            phoneInput.classList.remove('required-entry');
        }

        if(dataset.emailrequired === "1") {
            emailLabel.classList.add('required');
            emailInput.classList.add('required-entry');
        } else {
            emailLabel.classList.remove('required');
            emailInput.classList.remove('required-entry');
        }

        if(toggleMessage && dataset.showtogglemessage === "1") {
            toggleMessage.classList.remove('tg28-toggle-message--hide');

            cacheDom.get('.tg28-input-row--comment label')
                .classList.add('tg28-input-row--comment-hidden');
            cacheDom.get('.tg28-input-row--comment .input-box')
                .classList.add('tg28-input-row--comment-hidden');
        }
    }

    /**
     * Clear validation classes
     */
    clearValidation() {
        const advices = cacheDom.getAll('#contactForm .validation-advice', true);
        if(advices) {
            [].forEach.call(advices, (item) => {
                item.remove();
            });
        }

        const faileds = cacheDom.getAll('#contactForm .validation-failed', true);
        if(faileds) {
            [].forEach.call(faileds, (item) => {
                item.classList.remove('validation-failed');
            });
        }
    }
}

export default FormManager;
