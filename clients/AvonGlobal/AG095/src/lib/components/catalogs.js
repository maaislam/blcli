import catalogItem from './catalogItem';

const catalogs = (id, catalogsData) => {
  const htmlStr = `
    <div class="${id}__catalog-swiper">
        <div class="${id}__catalog-swiper--wrapper swiper-wrapper">
            ${catalogsData.map((data) => catalogItem(id, data)).join('\n')}
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
  `;
  return htmlStr;
};

export default catalogs;
