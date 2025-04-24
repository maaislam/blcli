import productCard from './productCard';

const productCards = (id, data) => {
  const htmlStr = `
        <div class="${id}__products">
          ${data.map((item) => productCard(id, item)).join('')}
        </div>
   `;

  return htmlStr;
};

export default productCards;
