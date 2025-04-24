const renderPopup = (id, loginStatus, fireEvent) => {
  const htmlStr = `
    <div class="${id}__popup--overlay"> 
        <div class="${id}__overlay--contents">
            <div class="${id}__close-btn"><svg xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none">
                <path d="M1 1C2.75659 2.84442 5.3449 5.53333 5.3449 5.53333L9.5 9.5M9.5 1L1 9.5"
                        stroke="#616E80"
                        stroke-width="1.5" />
            </svg></div>
            <div class="paragraph">Please login or sign up to access trade prices.</div>
            <span class="small-paragraph">Signing up only takes a few minutes</span>
            <div class="btn-container">
                <div class="user-btn-wrapper">
                    <a class="${id}__popup-login" >Login</>
                    <a class="${id}__popup-signup" href="/create-account/cash">Sign up for online account</a>
                </div>
                <div class="${id}__cancel-btn">
                    Cancel
                </div>
            </div>
        </div>
    </div>`;
  if (loginStatus) {
    return;
  }
  document.body.insertAdjacentHTML('afterbegin', htmlStr);
  const overlay = document.querySelector(`.${id}__popup--overlay`);
  overlay.addEventListener('click', (e) => {
    const target = e.target;
    const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
    if (
      targetMatched(`.${id}__close-btn`) ||
      targetMatched(`.${id}__cancel-btn`) ||
      target.querySelector(`.${id}__overlay--contents`)
    ) {
      const clickedElem = target.closest(`.${id}__overlay--contents`) ? 'X or cancel button' : 'overlay';
      fireEvent(`Closes modal using ${clickedElem}`);
      overlay.remove();
    } else if (targetMatched(`.${id}__popup-login`)) {
      const loginBtn =
        document.querySelector('[data-test-id="header-account-button"] [data-test-id="link"]') ||
        document.querySelector('[data-test-id="header-account-button"]');
      fireEvent('Clicked “Login” in modal');
      overlay.remove();
      loginBtn.click();
    } else if (targetMatched(`.${id}__popup-signup`)) {
      fireEvent('Clicked “Sign up for an account” in modal');
    }
  });
};

export default renderPopup;
