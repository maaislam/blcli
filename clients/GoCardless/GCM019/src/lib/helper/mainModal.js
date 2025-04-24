import { closeBtn } from '../assets'
const mainModal = (id, pageData) => {

    const { attachTo } = pageData;

    const position = attachTo === 'body' ? `${id}__fixed` : '';

    const htmlStr = `
    <div class="${id}__mainModal ${position}">
        <div class="${id}__mainModal--close">${closeBtn}</div>
        <div class="${id}__mainModal-wrapper">
            <div class="webiner-image">
                <div class="image-wrapper">
                    <img src="https://images.ctfassets.net/40w0m41bmydz/6wYn2eoVT1qzb31J2RoaBm/fbdde14dc17846a315cec5bd02c15eba/Demo_webinar_landing_page_assets_speakers.png?w=670&h=764&q=50&fm=webp"
                        alt="webiner-image">
                </div>
            </div>
            <div class="webiner-content">
                <div class="title">[Webinar On Demand]</div>
                <div class="headline">Payment certainty in uncertain times</div>
                <div class="main-content">Is your payment collection process ready for economic uncertainty? Join our
                    webinar to find out how you can protect your revenue by automating your payments.</div>
                <div class="btncontainer">
                    <a class="watch-demo css-oge8h1 css-5j6s9h">
                        <span class="css-y6l269">Watch demo</span>
                    </a>
                    <a href="https://gocardless.com/guides/posts/payment-certainty-in-uncertain-times/" class="webiner-discover">
                        <span class="css-y6l269">Discover more ></span>
                    </a>
                </div>
            </div>
        </div>
    </div>`;

    return htmlStr.trim();
};

export default mainModal;