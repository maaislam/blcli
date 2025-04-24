import shared from "../../shared"
import { events } from '../../../../../../../lib/utils';

export default () => {

    const { ID, VARIATION } = shared;

    const dropHintLink = document.querySelector(`.${ID}__hint .${ID}__contentLink`);


   const sendEmail = () => {
        const ringURL = window.location.href;
        const subject = "Look what I've found";
        const emailBody = `I was feeling romantic and found this ring: ${ringURL}`;
        document.location = "mailto:?subject="+subject+"&body="+emailBody;
    }

    if(dropHintLink) {
        dropHintLink.addEventListener('click', () => {
            sendEmail();
            events.send(`${ID} variation: ${VARIATION}`, 'click', 'Drop a hint');
        });
    }
}