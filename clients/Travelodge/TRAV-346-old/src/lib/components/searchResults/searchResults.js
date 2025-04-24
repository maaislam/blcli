import { highlightSearchTerm } from "../../helpers/utils";

const placesHTML = (id, places, value) => {
    return `
    <div style="margin-top:0" class='${id}__divider'></div>
    <div class="${id}__searchResults-places">
        <p class="${id}__searchResults-places--title">Places</p>
        <div class='${id}__searchResults-list'>
            ${places?.map((place) => {
                const { item } = place;
                const highlightedText = highlightSearchTerm(item.Option, value);

                return `<a class="${id}__searchResults-item">${highlightedText}</a>`;
            }).join('')}
        </div>
    </div>`;
};

const hotelsHTML = (id, hotels, value) => {
    return `
    <div class='${id}__divider'></div>
    <div class="${id}__searchResults-hotels">
        <p class="${id}__searchResults-hotels--title">Hotels</p>
        <div class='${id}__searchResults-list'>
            ${hotels?.map((hotel) => {
                const { item } = hotel;
                const highlightedText = highlightSearchTerm(item.Option, value);

                return `<a class="${id}__searchResults-item">${highlightedText}</a>`;
            }).join('')}
        </div>
    </div>`;
};


const searchResults = (id, places, hotels, value) => {
    const htmlStr = `
        <div class="${id}__searchResults">
            ${places?.length > 0 ? `${placesHTML(id, places, value)}` : ''}
            ${hotels?.length > 0 ? `${hotelsHTML(id, hotels, value)}` : ''}
        </div>`;

    return htmlStr;
};
export default searchResults;
