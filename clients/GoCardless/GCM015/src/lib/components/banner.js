const banner = (id) => {
  const htmlStr = `

    <div class="${id}__webinerbanner ">
        <div class="${id}__wrapper css-1gycr4w">
            <div class="${id}__webinerbanner--content">
                <div class="title">
                    [Live Demo] Payment Certainty in Uncertain Times
                </div>
            </div>
            <div class="${id}__webinerbanner--btncontainer">
                <a href="/guides/posts/payment-certainty-in-uncertain-times/" class="webiner-register css-mo3vs8">
                    <span class="css-y6l269">Register Now</span>
                </a>
                <a href="/webinar-contact-sales/"
                class="contact-sales css-oge8h1">
                    <span class="css-y6l269">Contact Sales</span>
                </a>
            </div>
        </div>
    </div>`;

  return htmlStr.trim();
};

export default banner;
