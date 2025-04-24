const fifthStep = (id) => {
  const formLegendElem = document.querySelector('.form__legend');
  const formPrivacyElem = document.querySelector('.form__privacy-policy p');
  //const formGdprElem = document.querySelector('.form__gdpr p');
  const calcBtn = document.querySelector('.form__controls .btn--success[type="submit"]');
  const nextBtn = document.querySelector(`.${id}__next-btn`);
  //const submitBtn = document.querySelector('button[type="submit"]');

  // console.log('formPrivacyElem: ', formPrivacyElem);
  formLegendElem.textContent = "We're at the last step, we just need to know how to keep in touch.";
  //formGdprElem.textContent = `We’ll share product information relevant to your enquiry. Let us know if you don’t want to get this by:`;
  if (formPrivacyElem) {
    formPrivacyElem.innerHTML = `If you'd like to know how we use your data see our <a href="https://www.keyadvice.co.uk/privacy-policy" rel="noreferrer" target="_blank">privacy policy</a>`;
    formPrivacyElem.classList.add(`${id}__privacy-policy`);
  }
  calcBtn.classList.add(`${id}__hidden`);
  nextBtn.classList.remove(`${id}__hidden`);

  // const checkBothSuccess = () => {
  //     return Array.from(inputs).every((input) => {
  //         const wrapper = input.closest('.form__field-wrapper');
  //         return wrapper.classList.contains('form__field-wrapper--success');
  //     });
  // }

  // inputs.forEach((input) => {
  //     input.addEventListener('input', () => {
  //         setTimeout(() => {
  //             bothInputSuccess = checkBothSuccess();
  //             if (bothInputSuccess) {
  //                 nextBtn.disabled = false;
  //             } else {
  //                 nextBtn.disabled = true;
  //             }
  //         }, INPUTSUCCESSDELAY);
  //     });

  //     input.addEventListener('blur', () => {
  //         setTimeout(() => {
  //             bothInputSuccess = checkBothSuccess();
  //             if (bothInputSuccess) {
  //                 nextBtn.disabled = false;
  //             } else {
  //                 nextBtn.disabled = true;
  //             }
  //         }, INPUTSUCCESSDELAY);
  //     });

  // });
};
export default fifthStep;
