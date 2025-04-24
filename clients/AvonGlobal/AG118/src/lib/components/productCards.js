import productCard from './productCard';

const productCards = (id, data) => {
  const htmlStr = `
        <div class="${id}__products swiper">
            <div class="${id}__products-wrapper swiper-wrapper">
                ${data.map((item) => productCard(id, item)).join('')}
            </div>
            <div class="swiper-pagination"></div>

            
        </div>
   `;

  return htmlStr;
};

export default productCards;
