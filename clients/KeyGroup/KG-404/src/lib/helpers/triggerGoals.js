import { fireEvent } from '../../../../../../core-files/services';
const triggerGoals = (step) => {
  if (step === 2) {
    fireEvent('user has passed stage one by entering their house value');
    const postCodeElement = document.querySelector('input#Postcode');
    const postCodeWrapper = postCodeElement.closest('fieldset');
    postCodeWrapper.classList.add('custom-fieldset');
  } else if (step === 3) {
    fireEvent('user has passed stage two by entering their address');
  } else if (step === 4) {
    fireEvent('user has passed stage three - title + name');
  } else if (step === 5) {
    fireEvent(`user has passed stage four - DOB`);
  }
};
export default triggerGoals;
