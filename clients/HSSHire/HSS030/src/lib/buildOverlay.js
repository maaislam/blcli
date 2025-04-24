import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const buildOverlay = () => {
    const html = `
    <div class="${ID}-overlay">
        <button class="${ID}-overlay__close ${ID}-overlay-close">X</button>
        <h4 class="${ID}-overlay__title">Are you a ...</h4>
        <a href="" class="btn btn-primary ${ID}-overlay-phone-number">Trade customer</a>
        <span class="${ID}-overlay__divider">or</span>
        <button class="btn btn-primary ${ID}-overlay-live-chat">DIY Customer</button>
    </div>
    `;
    return html;
};

export default buildOverlay;