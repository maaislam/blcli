const emailWrapper = (id, classes) => {
  const html = `
    <div class="${id}__emailWrapper">
        <div class="${id}__emailContainer">
            <div class="${id}__inputBox">
              <input name="email" placeholder="Email address" class="${id}__input ${classes}"/>
               <div class="${id}__success ${id}__hide">
                  <svg viewBox="0 0 76 76" class="success-message__icon icon-checkmark">
                      <circle cx="38" cy="38" r="36"/>
                      <path fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M17.7,40.9l10.9,10.9l28.7-28.7"/>
                  </svg>
                  <div class="${id}__successMessage">Email Subscribed Successfully</div>
                </div>
               <div class="${id}__error ${id}__hide">
                  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="oct-icon oct-signup__error__icon" aria-hidden="true" aria-label="" style="height: 20px; width: 20px; fill: black;"><path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm0 1a6 6 0 1 0 0 12A6 6 0 0 0 8 2zm0 8a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1zm.55-4.5v4h-1v-4h1z" fill="#D8221F" fill-rule="evenodd"></path></svg>
                  <div class="${id}__errorMessage" data-gtm-vis-first-on-screen11872246_612="70258" data-gtm-vis-recent-on-screen11872246_612="174961" data-gtm-vis-total-visible-time11872246_612="600" data-gtm-vis-has-fired11872246_612="1">
                  </div>
                </div>
            </div>
            <button class="${id}__btn">
              <span class="${id}__text">Sign up</span>
              <span class="${id}__loader"></span>
              </button>
        </div>
    </div>
  `;
  return html.trim();
};

export default emailWrapper;
