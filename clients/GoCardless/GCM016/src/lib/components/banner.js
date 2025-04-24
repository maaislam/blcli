const banner = (id, pageData) => {
    const { attachTo } = pageData;

    const position = attachTo === 'body' ? `${id}__fixed` : '';

    const htmlStr = `

    <div class="${id}__webinerbanner ${position}">
        <div class="${id}__wrapper css-1gycr4w">
            <div class="${id}__webinerbanner--content">
                <div class="title">
                    [GoCardless Demo] Get Payment Certainty in Uncertain Times
                </div>
            </div>
            <div class="${id}__webinerbanner--btncontainer">
                <a href="" class="webiner-register css-mo3vs8">
                    <span class="css-y6l269">See Demo</span>
                </a>
                <a
                class="contact-sales css-oge8h1 css-5j6s9h">
                    <span class="css-y6l269">Contact Sales</span>
                </a>
            </div>
        </div>
    </div>`;

    return htmlStr.trim();
};

export default banner;
