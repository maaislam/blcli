import productCard from './productCard';

const productCards = (id, productData) => {
  const htmlString = `
    <div class="${id}__carousel__wrapper">
        <div class="${id}__carousel-title">Produse Bestseller</div>
        <div class="${id}__carousel swiper">
            <div class="${id}__carousel__item swiper-wrapper">
                ${productData.map((product) => productCard(id, product)).join('\n')}
            </div>
        </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
    </div>`;
  return htmlString;
};

export default productCards;
