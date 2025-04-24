import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import form from './components/form';
import modal from './components/modal';
import modalContent from './components/modalContent';
import inputHandler from './handlers/inputHandler';
import selectedOption from './helpers/selectedOption';

const { ID, VARIATION } = shared;

const init = () => {
  const body = document.body;
  const formHTML = form(ID);
  const modalContentHTML = modalContent(ID, formHTML);
  body.insertAdjacentHTML('afterbegin', modal(ID, modalContentHTML));

  function insertModal(e) {
    if (e.clientY < 0) {
      toggleModal();
      fireEvent('Exit Intent');
      document.removeEventListener('mouseleave', insertModal);
    }
  }

  document.addEventListener('mouseleave', insertModal);
    
};

const toggleModal = () => {
  document.querySelector(`.${ID}__modalWrapper`).classList.toggle(`${ID}__showModal`);
}

export default () => {

  setup();

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  //prevent the modal from showing if the user has already signed up - required before user API update (every 24 hours)
  if (localStorage.getItem(`${ID}-signed-up`) || localStorage.getItem(`${ID}-closed`)) {
    return;
  }

  init();

  inputHandler(ID);

  const sendInfo =  async () => {
    const form = document.querySelector(`.${ID}__form`);
    console.log('form', form)
    const formData = new FormData(form);
    const formDataToSend = new FormData();
    let relationship = formData.get('parent');
    if(relationship === 'parentToBe' || relationship === null) {
      relationship = 'parent';
    }
    const name = formData.get('name');
    const email = formData.get('email');
    const gender = formData.get('gender');
    const childName = formData.get('childName');
    const childDate = formData.get('dueDate');


    // Append key-value pairs to the FormData object
    formDataToSend.append('customer[relationship]', relationship);
    formDataToSend.append('customer[name]', name);
    formDataToSend.append('customer[email]', email);
    if(gender === 'Male'){
      formDataToSend.append('child[0][gender]', 'M');
    } else if (gender === 'Female'){
      formDataToSend.append('child[0][gender]', 'F');
    } else if (gender === 'Unknown'){
      formDataToSend.append('child[0][gender]', 'U');
    } else if (gender === 'Prefer not to say'){
      formDataToSend.append('child[0][gender]', 'R');
    }
    if(childName){
      formDataToSend.append('child[0][name]', childName);
    }
    if(childDate){
      formDataToSend.append('child[0][date]', childDate);
    }

    try {
      const response = await fetch('https://contact2.mamasandpapas.com/control/myfamily/newsletterSignup', {
        method: 'POST',
        body: formDataToSend,
      });
    
      if (response.ok) {
        // If response is successful (status in the range 200-299)
        console.log("Request successful. Displaying success message...");
        localStorage.setItem(`${ID}-signed-up`, 'true');
        location.href = 'https://www.mamasandpapas.com/pages/thank-you-email-sign-up';
        // You can display any success message here
      } else {
        // If response is not successful
        // console.error("Error:", response.status, response.statusText);
        response.json().then((data) => {
          console.log('data', data["error"]);
          const errorMessage = data["error"];
          const errorHtml = `
            <div class="formRow error-message">
              <p>${errorMessage}</p>
            </div>`;
          
          const errorDOM = document.querySelector('.error-message');
          if (errorDOM) {
            errorDOM.remove();
          }
          document.querySelector(`.${ID}-submit-row`).insertAdjacentHTML('afterend', errorHtml);
        });
      }
    } catch (error) {
      // Catching any network errors or other errors that might occur during the request
      console.error("Error:", error.message);
      // You can display an error message with the error message
    }

  }


  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('.close-button') || target.closest('.trigger')) {
      toggleModal();
      // localStorage.setItem(`${ID}-closed`, 'true');
      fireEvent('Click - user closes the exit intent');
    } else if (target.closest(`.${ID}__option`)) {
      const option = target.closest(`.${ID}__option`);
      selectedOption(ID, option);
      fireEvent(`Click - user selects an option - ${option.dataset.label}`);
      // console.log('Click - user selects an option - ', option.dataset.label);
    } else if (target.closest(`.${ID}__selectedGender`)) {
      const optionsContainer = document.querySelector(".options-container");
      optionsContainer.classList.toggle("active");
    } else if (target.closest(`.${ID}__genderOption`)) {
      const genderDropdown = document.querySelector(`.${ID}__genderDropdown`);
      const optionsContainer = document.querySelector(".options-container");
      const option = target.closest(`.${ID}__genderOption`);
      const selectedElem = document.querySelector(`.${ID}__selectedGender p`);
      const selectedValue = option.querySelector("label").textContent.trim();

      selectedElem.textContent = selectedValue;
      genderDropdown.setAttribute("data-selected", selectedValue);
      optionsContainer.classList.remove("active");
    } else if (target.closest(`.${ID}-submit-row`)){
      e.preventDefault();
      fireEvent('Click - user clicks to sign up');
      sendInfo();
    }
  });
};
