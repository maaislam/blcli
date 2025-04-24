import productCard from './productCard';

const productCards = (id, data) => {
  const htmlStr = `<div class="${id}__productCards">
        <div class="${id}__productCards-wrapper">
          ${data?.map((item) => productCard(id, item)).join('\n')}
        </div>
    </div>`;
  return htmlStr;
};
export default productCards;
