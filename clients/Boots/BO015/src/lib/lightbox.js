import shared from "./shared";
import { pollerLite } from "../../../../../lib/utils";

export default () => {

    const { ID } = shared;

    const createLightbox = () => {
    const cookieLightbox = document.createElement('div');
    cookieLightbox.classList.add(`${ID}-lightbox`);
    cookieLightbox.innerHTML = `
    <div class="${ID}-logo"></div>
    <div class="${ID}-cookieMessage"></div>`;

    document.body.appendChild(cookieLightbox);


    const overlay = document.createElement('div');
    overlay.classList.add(`${ID}-overlay`);
    document.body.appendChild(overlay);
    }

    createLightbox();

    const moveCookieMessage = () => {
        // move the cookie message to the lightbox
        const cookieMessage = document.querySelector('.optanon-alert-box-wrapper');
        document.querySelector(`.${ID}-lightbox .${ID}-cookieMessage`).appendChild(cookieMessage);
    }   
    moveCookieMessage();

    const hideLightbox = () => {
        const lightbox = document.querySelector(`.${ID}-lightbox`);
        const overlay = document.querySelector(`.${ID}-overlay`);

        lightbox.classList.add(`${ID}-lightbox_hide`);
        overlay.classList.add(`${ID}-overlay_hide`);
    }


    const acceptCookies = () => {
       
        const acceptButton = document.querySelector('.optanon-allow-all.accept-cookies-button');
        acceptButton.addEventListener('click', () => {
            hideLightbox();
        });

        pollerLite(['.optanon-button-wrapper.optanon-save-settings-button'], () => {
             // on click of the buttons in settings
            const cookieAllowAll = document.querySelector('.optanon-button-wrapper.optanon-allow-all-button');
            cookieAllowAll.addEventListener('click', () => {
                hideLightbox();
            });

            const saveSettings = document.querySelector('.optanon-button-wrapper.optanon-save-settings-button');
            saveSettings.addEventListener('click', () => {
                hideLightbox();
            });
        });
    }
    acceptCookies();
}
