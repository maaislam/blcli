import shared from "../../shared";
import scrollToElement from "../../scrollTo";
import appState from "./appState";

export default () => {

    const { ID } = shared;

    // open the form on click of any of the download brochure clicks
    const downloadButtons = document.querySelectorAll(`.${ID}-cta.${ID}-learnmore`);

    // change the text on the form
    const formText = document.querySelector(`.${ID}-mainForm h2`);
    const formButton = document.querySelector('.identity-input-submit.download-button');

    for (let index = 0; index < downloadButtons.length; index += 1) {

        const element = downloadButtons[index];
        element.addEventListener('click', (e) => {

            const productName = e.currentTarget.getAttribute('product-name');

            formText.textContent = `Request a ${productName} brochure`;
            formText.nextElementSibling.textContent = `Fill in the form to recieve your FREE brochure`;
            formButton.textContent = `Request a brochure`;

            // scroll to form
            scrollToElement(document.querySelector(`.${ID}-mainForm`));

            // change the download links
            const urlTarget = e.currentTarget.getAttribute('data-downloadlink');
            appState.activeDownloadLink = urlTarget;
            appState.downloadBrochure = 'yes';
            appState.productLink = e.currentTarget.getAttribute('data-product');
        });
    }
}