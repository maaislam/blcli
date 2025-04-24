import resultCard from "./resultCard";

const resultCards = (id, data) => {
    const htmlStr = `<div class="${id}__resultCards">
        ${data.map((item) => resultCard(id, item)).join('')}
    </div>`;

    return htmlStr;
};
export default resultCards;
