const banner = (id) => {
    const htmlStr = `

    <div class="${id}__webinerbanner ">
        <div class="${id}__wrapper css-1gycr4w">
            <div class="${id}__webinerbanner--content">
                <div class="title">
                    [Demo] Uncovering the costs of payment collection
                </div>
            </div>
            <div class="${id}__webinerbanner--btncontainer">
                <a href="/guides/posts/uncovering-payment-costs-webinar/" class="webiner-register css-oge8h1 css-5j6s9h">
                    <span class="css-y6l269">Register Now</span>
                </a>
                <a href="/g/uncover-costs-payments-sales/"
                class="contact-sales css-mo3vs8">
                    <span class="css-y6l269">Contact Sales</span>
                </a>
            </div>
        </div>
    </div>`;

    return htmlStr.trim();
};

export default banner;
