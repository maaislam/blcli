import productCard from "./productCard";

const productCards = (id, data) => {
    const { details } = data;
    const htmlStr = `<div class="${id}__productCards">
        ${details?.map((item) => productCard(id, item)).join('\n')}
    </div>`;
    return htmlStr;
};
export default productCards;
