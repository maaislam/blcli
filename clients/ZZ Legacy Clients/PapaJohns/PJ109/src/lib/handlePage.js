import bannerHTML from './html/banner';
import overlayHTML from './html/overlay';
import overlay from './overlay';
import shared from './shared';
const {ID, VARIATION} = shared;
import functionality from './functionality';
import { fireEvent } from './services';

const handlePage = () => {
    const tipjarBox = document.querySelector('.tipJar--box');
    // Insert banner
    const innerHTML = {
        banner: bannerHTML(),
        overlay: overlayHTML(),
    };
    const containerClass = tipjarBox.style.display !== 'none' ? 'tipjar-on-page' : '';
    const html = `${innerHTML.overlay}<div class="${ID}-container ${containerClass}">${innerHTML.banner}</div>`;
    tipjarBox.insertAdjacentHTML('beforebegin', html);
    fireEvent('Banner visible');
    functionality();
    overlay.init();
};

export default handlePage;