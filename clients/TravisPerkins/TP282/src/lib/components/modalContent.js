const modalContent = (id) => {
  const htmlStr = `
    <div class="${id}__close">
      <svg xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="12"
      viewBox="0 0 11 12"
      fill="none">
      <line y1="-1"
          x2="13.6614"
          y2="-1"
          transform="matrix(-0.68132 0.731986 -0.792628 -0.609706 9.30786 0)"
          stroke="#004631"
          stroke-width="2" />
      <line y1="-1"
          x2="13.6615"
          y2="-1"
          transform="matrix(-0.681367 -0.731942 0.79259 -0.609755 11.0009 9.99945)"
          stroke="#004631"
          stroke-width="2" />
      </svg>
    </div>
    <div class="${id}__title">
      Be the first to know
    </div>
    <div class="${id}__subtitle">
      Join our mailing list today to be the first to find out about latest trade news.
    </div>
    <div class="${id}__form">
      <form action=""
        method="post"
        id="">
      <input type="email"
            name="email"
            id="email"
            placeholder="Enter your email address..."
            required>
      <div class='email-error ${id}__hidden'>Please enter a valid email address</div>
      <button type="button"
            class="${id}__signUpBtn btn btn--primary">Sign up</button>
      </form>
    </div>
    <a class="${id}__login"
      href="/login">Already have an account? Log in.</a>
    <div class="${id}__terms">
      When joining, you agree to travisperkins.co.uk contacting you via email with information about news, goods, offers
      and services which we feel will be of interest to you. Please refer to our <a class="${id}__terms-link"
      href="/content/privacy-policy">privacy policy </a>for more information on how we use your details.
    </div>`;

  return htmlStr;
};

export default modalContent;
