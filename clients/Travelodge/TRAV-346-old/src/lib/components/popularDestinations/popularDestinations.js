import { popularDestinationsList } from "../../data/data";

const popularDestinations = (id) => {
    const htmlStr = `
        <div class="${id}__popularDestinations">
            <p class="${id}__title">Popular destinations</p>
            <div class='${id}__popularDestinations-list'>
                ${popularDestinationsList.map((destination) => {
                    const { title, url, imgSrc } = destination;
                    return `
                        <div class="${id}__popularDestinations-item" href="${url}">
                            <img src="${imgSrc}" srcset="${imgSrc}" alt="${title}" />
                            <p class="${id}__destinationTitle">${title}</p>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>`;

    return htmlStr;
};
export default popularDestinations;
