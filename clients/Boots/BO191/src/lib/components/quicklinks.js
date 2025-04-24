import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared"
import { getData } from "../data";

const { ID } = shared;

export default () => {

    const urlData = getData();
    const links = urlData.quickLinks;

    Object.keys(links).forEach((i) => {
        const data = links[i];
        const quickLink = document.createElement('div');
        quickLink.classList.add(`${ID}-quickLink`);
        quickLink.innerHTML = `<a href="${data.link}"><span>${[i][0]}</span></a>`;

        if (document.querySelector(`.${ID}-quickLinks`)) {
            document.querySelector(`.${ID}-quickLinks .${ID}-container`).appendChild(quickLink);
        } 
    });


   const allLinks = document.querySelectorAll(`.${ID}-quickLink`);
   for (let index = 0; index < allLinks.length; index++) {
       const element = allLinks[index];
       element.addEventListener('click', () => {
        fireEvent('Click quick link');
       });
       
   }
}