import shared from "../../../../../../core-files/shared"
import { closeSlideTab, openSlideTab } from "../helpers";

export default () => {

    const { ID } = shared;

    const allUspLinks = document.querySelectorAll(`.${ID}-usp`);

    for (let index = 0; index < allUspLinks.length; index += 1) {
        const element = allUspLinks[index];

        let elToClick;


        if(element.querySelector(`.${ID}__textLink`)) {
            elToClick = element.querySelector(`.${ID}__textLink`);

        } else {
            elToClick = element;
        }

        elToClick.addEventListener('click', () => {
            
            const matchingContent = element.getAttribute('usp-attr');

            const matchingInnerContent = document.querySelector(`.${ID}-slideOutTab .${ID}-inner.${matchingContent}`);
            if(matchingInnerContent) {
                openSlideTab(matchingInnerContent);
            }
        });
        
    }

    const closeBox = document.querySelector(`.${ID}-slideOutTab .${ID}-close`);
    closeBox.addEventListener('click', () => {
        const elToHide = document.querySelector(`.${ID}-slideOutTab .${ID}-inner.active`);
        closeSlideTab(elToHide);
    });

    const overlay = document.querySelector(`.${ID}-overlay`);
    overlay.addEventListener('click', () => {
        const elToHide = document.querySelector(`.${ID}-slideOutTab .${ID}-inner.active`);
        closeSlideTab(elToHide);
    });
}