/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { observer, pollerLite } from '../../../../../lib/utils';

export default () => {
  setup();

  const whatPage = () => {
    if (window.dataLayer[1].eventAction === "Product Detail") {
      return 'pdp';
    }
    if (window.dataLayer[1].eventLabel === "Home Page") {
      return 'home';
    }
    if (window.dataLayer[1].eventLabel === "Category Page") {
      return 'plp';
    }
  }

  if (window.localStorage.getItem('PL040-close')) {
    return false;
  }

  const trigger = `
    <div class="PL040-trigger">
      <i class="fas fa-tags"></i> 
      <h3>Subscribe for <br />Special Offers</h3>
      <i class="fas fa-chevron-right"></i>
      <button class="PL-dontShow"><i class="fas fa-times"></i></button>
    </div>
  `;

  const newForm = `
    <div class="PL040-form">
      <div class="signupForm">
        <div>
          <i class="fas fa-tags"></i> 
          <h3>Receive all our latest discounts</h3>
        </div>
        
        <p>Keep me up to date with the latest discounts at Printerland by email.</p>

        <form>
          <div class="control__group">
              <input placeholder="${window.innerWidth > 749 ? "Your name *" : "Name *"}" type="text" data-val="true" data-val-required="*" id="Name2" name="Name" value="">
              <span class="text-danger field-validation-valid" data-valmsg-for="Name" data-valmsg-replace="true"></span>
          </div>

          <div class="control__group">
              <input placeholder="${window.innerWidth > 749 ? "Your email *" : "Email *"}" type="email" data-val="true" data-val-email="The Email Address field is not a valid e-mail address." data-val-required="*" id="EmailAddress2" name="EmailAddress" value="">
              <span class="text-danger field-validation-valid" data-valmsg-for="Name" data-valmsg-replace="true"></span>
          </div>

          <a id="lnkSubmitSubScription2" class="btn btn--cyan"><span>Subscribe</span></a>
        </form>

        <a href="https://www.printerland.co.uk/About-E111.aspx#privacy">View Our Privacy Policy</a>

        <button class="PL040-close"><i class="fas fa-times"></i></button>
      </div>

      <div class="successMessage">
        <h3>Thank you!</h3>

        <p>We will be in touch soon with our latest special offers.<br />
        In the meantime, use code <strong>SIGNUP5</strong> to get 5% off all ink and toner cartridges.</p>

        <button class="PL040-close PL-final"><i class="fas fa-times"></i></button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', trigger);
  document.body.insertAdjacentHTML('beforeend', newForm);

  pollerLite(['.PL040-form', '.PL040-trigger'], () => {
    const footerForm = document.querySelector('#formSubscribe');
    const newFormAdded = document.querySelector('.PL040-form');

    const addedTrigger = document.querySelector('.PL040-trigger');
    setTimeout(() => {
      addedTrigger.classList.add('PL-show')
    }, 3000);

    const firstClose = document.querySelector('button.PL-dontShow');

    addedTrigger.addEventListener('click', (e) => {
      if (!firstClose.contains(e.target)) {
        newFormAdded.classList.add('PL-show');
      } else {
        addedTrigger.classList.add('PL-hide');
        window.localStorage.setItem('PL040-close', 'true');
      }
    })

    // Observe for a successful form
    observer.connect(footerForm, () => {
      pollerLite(['.subscribemsg .messages.confirmation'], () => {
        newFormAdded.classList.add('PL-complete')
      });

    }, {
      config: {
        attributes: true,
        childList: true,
        subtree: true,
      }
    });


    // Mimic Inputs to original
    const ogName = footerForm.querySelector('input[name="Name"]');
    const ogEmail = footerForm.querySelector('input[type="email"]');
    const ogSubmit = footerForm.querySelector('a.btn');

    // Add event listeners to new inputs
    const newName = document.querySelector('.PL040-form input[name="Name"]');
    const newEmail = document.querySelector('.PL040-form input[type="email"]');
    const newSubmit = document.querySelector('.PL040-form a.btn');


    const closePopup = () => newFormAdded.classList.remove('PL-show');

    // Close buttons
    const closeBtns = document.querySelectorAll('.PL040-close');
    Array.from(closeBtns).forEach((btn) => {
      btn.addEventListener('click', () => {
        closePopup();
        if (btn.classList.contains('PL-final')) {
          addedTrigger.classList.add('PL-hide')
          window.localStorage.setItem('PL040-close', 'true');
        }
      });
    });

    const copyInput = (newInput, oldInput) => {
      if (!newInput.value) return;

      oldInput.value = newInput.value;
    };

    newSubmit.addEventListener('click', (e) => {
      if (newEmail.value.indexOf('@') == -1) {
        e.preventDefault();
        newEmail.classList.add('input-validation-error');
        setTimeout(() => {
          newEmail.classList.add('input-validation-error');
        }, 4000);
      }
      if (newName.value) {
        copyInput(newName, ogName);
      }
      if (newEmail.value) {
        copyInput(newEmail, ogEmail);
      }

      ogSubmit.click();
    });

    newName.addEventListener('keypress', (e) => {
      if(e.keyCode === 13){
        e.preventDefault(); // Ensure it is only this code that runs
        if (newName.value) {
          copyInput(newName, ogName);
        }
        if (newEmail.value) {
          copyInput(newEmail, ogEmail);
        }
        ogSubmit.click();
      }
    });

    newEmail.addEventListener('keypress', (e) => {
      if(e.keyCode === 13){
        e.preventDefault(); // Ensure it is only this code that runs
        if (newName.value) {
          copyInput(newName, ogName);
        }
        if (newEmail.value) {
          copyInput(newEmail, ogEmail);
        }
        ogSubmit.click();
      }
    });
  });

};
