const attendeeMessage = (id, data, msgAnchors) => {
  const warningHtmlStr = `
    <div class="${id}__custom-msg">
        <div class="warning-wrapper">
            <span class="warning-icon">${data.warningIcon}</span>
            <span class="warning-msg">${data.fillFormMsg}</span>
        </div>
        <div class="success-wrapper">
            <span class="warning-icon">${data.successIcon}</span>
            <span class="warning-msg">${data.successMsg}</span>
        </div>
    </div>
  `;

  msgAnchors.forEach((anchor) => {
    anchor.insertAdjacentHTML('beforebegin', warningHtmlStr);
    const requiredFields = anchor.parentElement.querySelectorAll('input[type="text"][required]');
    const renderMessage = () => {
      const isRequiredNotFilled = [...requiredFields].some((item) => item.value === '');
      //console.log(isRequiredNotFilled);
      const customLabel = anchor.parentElement.querySelector(`.${id}__custom-msg ~ label`);
      const warningMsg = anchor.parentElement.querySelector(`.${id}__custom-msg>.warning-wrapper`);
      const successMsg = anchor.parentElement.querySelector(`.${id}__custom-msg>.success-wrapper`);
      if (!isRequiredNotFilled) {
        warningMsg.classList.add(`${id}__hide`);
        successMsg.classList.remove(`${id}__hide`);
        customLabel.setAttribute('data-message', 'success');
      } else {
        warningMsg.classList.remove(`${id}__hide`);
        successMsg.classList.add(`${id}__hide`);
        customLabel.setAttribute('data-message', 'normal');
      }
    };

    requiredFields.forEach((field) => {
      renderMessage();
      //field.addEventListener('blur', renderMessage);
    });
  });
};
export default attendeeMessage;
