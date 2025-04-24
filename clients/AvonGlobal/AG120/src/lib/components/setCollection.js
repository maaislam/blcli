import productCards from './productCards';

const setCollection = (id, collectionData, getDycategory) => {
    const title = getDycategory.split('-').join(' ');

    const htmlStr = `<div class="${id}__collectionContainer">
        <h1 class='${id}__headerName'>Najlepiej sprzedający się ${title}</h1>
        <div class='${id}__collection'>
            ${productCards(id, collectionData)}
        </div>
    </div>`;

    return htmlStr;
};
export default setCollection;
