import shared from '../shared';
import scrollToElement from './TG069/components/aboveTheFold/scrollTo';
import { __ } from '../helpers';

export default () => {

    const { ID } = shared;

    const myRunAppBanner = document.querySelector(`#${ID}-app`);

    myRunAppBanner.querySelector(`.${ID}-block_text_wrap`).innerHTML = 
    `<div class="${ID}-brochureBannerText">
        <h2>GET THE MYRUN CATALOGUE</h2>
        <ul>
            <li>- ${__('Receive your PDF catalogue to your email now')} </li>
            <li>- ${__('Complete Specification')}</li>
            <li>- ${__('Detailed Product Photography')}</li>
            <li>- ${__('Deep Dive on Feature Benefits')}</li>
        </ul>
        <div class="${ID}-brochureButton">Request Catalogue</div>
    </div>`;


    // smooth scroll to form
    myRunAppBanner.querySelector(`.${ID}-brochureButton`).addEventListener('click', () => {
        scrollToElement(document.querySelector(`.${ID}-bottomForm`));
    });
}