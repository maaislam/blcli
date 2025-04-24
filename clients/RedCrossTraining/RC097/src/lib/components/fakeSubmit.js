const renderFakeSubmit = (id) => {
  const realBtn = document.getElementById('continueButton');
  realBtn.classList.add(`${id}__hide`);
  //render fake submit button
  const fakeBtn = `<a href="/basket/" class="cta" id="${id}__continueButton">Proceed to payment</a>`;
  realBtn.insertAdjacentHTML('afterend', fakeBtn);
  const errorAnchor = document.querySelector(`#${id}__continueButton`);
  const errorMsg = `<span class="${id}__submit-error ${id}__hide">Please add your attendee(s) details above to continue.</span>`;
  errorAnchor.insertAdjacentHTML('afterend', errorMsg);
};

export default renderFakeSubmit;
