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
                    <img src="https://images.ctfassets.net/40w0m41bmydz/6qbikYtnNrNYTOAu8phYMb/88c44db91e80963341b9c7c4a24e3e26/speakers__1_.png?w=670&h=670&q=50&fm=webp"
                        alt="webiner-image">
                </div>
            </div>
            <div class="webiner-content">
                <div class="title">[Webinar On Demand]</div>
                <div class="headline">Uncovering the true costs of payment collection</div>
                <div class="main-content">Every business collects payments. Do you know how much the payment methods you choose actually cost you? Watch our on-demand webinar to find out</div>
                <div class="btncontainer">
                    <a class="watch-demo css-oge8h1 css-5j6s9h">
                        <span class="css-y6l269">Watch demo</span>
                    </a>
                    <a href="https://gocardless.com/guides/posts/uncovering-payment-costs-webinar/" class="webiner-discover">
                        <span class="css-y6l269">Discover more ></span>
                    </a>
                </div>
            </div>
        </div>
    </div>`;

    return htmlStr.trim();
};

export default mainModal;