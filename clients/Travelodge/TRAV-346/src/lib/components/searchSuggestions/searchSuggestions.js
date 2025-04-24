import popularDestinations from "../popularDestinations/popularDestinations";

const searchSuggestions = (id) => {
    const htmlStr = `
        <div class="${id}__searchSuggestions ${id}__hide">
            ${popularDestinations(id)}
        </div>`;

    return htmlStr;
};
export default searchSuggestions;
