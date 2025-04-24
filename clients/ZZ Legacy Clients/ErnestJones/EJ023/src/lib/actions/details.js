import settings from '../settings';
import pubSub from '../PublishSubscribe';
import cache from '../cache';

/**
 * Helper reorganise section
 */
export const reorganiseDetailsSection = () => {
  const title = document.querySelector('h2.checkoutStep-one');
  const guestSelectorContainer = cache.get('guest-selector-container');
  if(!guestSelectorContainer) {
    return;
  }

  const radios = guestSelectorContainer.querySelectorAll('.radioButton');

  if(radios && radios.length) {
    const createAccountButton = radios[radios.length - 1];
    const alreadyGotAccount = radios[1];
    const guestButton = radios[0];
    const guestButtonLabel = guestButton.querySelector('label');
    const createAccountFields = createAccountButton.nextElementSibling;
    const emailContainer = cache.get('guest-selector-container').querySelector('.paddingWrap:first-of-type');
    const emailField = cache.get('guest-selector-container').querySelector('#email');

    createAccountButton.classList.add(`${settings.ID}-create-account-button`);

    createAccountFields.classList.add(`${settings.ID}-create-account-fields`);
    createAccountFields.classList.add(`${settings.ID}-create-account-fields--hide`);

    // Already got account 
    alreadyGotAccount.addEventListener('click', () => {
      pubSub.publish('clicked-already-got-account');
    });
    // Continue as guest
    guestButton.addEventListener('click', () => {
      pubSub.publish('clicked-continue-as-guest');
    });

    // Move the email address label and input
    const emailLabel = cache.get('guest-selector-container').querySelector('label[for=email]');
    const emailInput = cache.get('guest-selector-container').querySelector('#email'); 

    // 'create account' now becomes checkbox
    if(createAccountFields && emailField) {
      const createAccountRealInput = createAccountButton.querySelector('#create-an-account');

      if(createAccountRealInput) {
        emailField.insertAdjacentElement('afterend', createAccountFields);

        emailField.insertAdjacentHTML('afterend', `
          <div class="checkboxContainer">
            <input type="checkbox" class="${settings.ID}-future-use-checkbox">
            <label class="${settings.ID}-future-use-label">
              Create an account for future use
            </label>
          </div>
        `);

        const futureUse = document.querySelector(`.${settings.ID}-future-use-label`);
        const futureUseCheckbox = document.querySelector(`.${settings.ID}-future-use-checkbox`);

        if(futureUse && futureUseCheckbox) {
          futureUse.addEventListener('click', () => {
            futureUseCheckbox.click();
          });

          futureUseCheckbox.addEventListener('change', (e) => {
            const isChecked = e.currentTarget.checked;

            pubSub.publish('did-toggle-create-account', isChecked);

            if(guestButtonLabel) {
              guestButtonLabel.click();
            }

            if(isChecked) {
              createAccountFields.classList.remove(`${settings.ID}-create-account-fields--hide`);

              createAccountRealInput.checked = true;

              alreadyGotAccount.classList.add(`${settings.ID}-hide`);
            } else {
              createAccountFields.classList.add(`${settings.ID}-create-account-fields--hide`);

              createAccountRealInput.checked = false;

              alreadyGotAccount.style.display = 'block';

              alreadyGotAccount.classList.remove(`${settings.ID}-hide`);
            }
          });
        }
      }
    }
  }
};

/**
 * Helper add title before details section
 */
export const addTitleToPersonalFields = (title) => {
  cache.get('details-container').insertAdjacentHTML('beforebegin', `
    <h2 class="${settings.ID}-section-title">${title}</h2>
  `);
};
