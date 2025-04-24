import { setCookie } from "../../../../../../lib/utils";

const wifiHandler = (ID) => {
    const wifiButton = document.querySelector(`.${ID}-wifi-container .${ID}-wifi-button`);

    const stayLength = wifiButton.getAttribute('data-stayLength');

    wifiButton.addEventListener('click', () => {
        localStorage.setItem(`${ID}-wifi`, `${stayLength}`);
        setCookie(`${ID}-wifi`, `true`);
    });
}

export default wifiHandler;