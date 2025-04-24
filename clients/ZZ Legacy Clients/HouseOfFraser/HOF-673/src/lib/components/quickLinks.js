import quickLink from './quickLink';

const renderQuickLinks = (id, data) => {
  const htmlStr = `
    <div class="${id}__swiper-container swiper-container">
        <div class="${id}__swiper-wrapper swiper-wrapper">
            ${data.map((linkData) => quickLink(id, linkData)).join('\n')}
        </div>
    </div>
  `;
  return htmlStr;
};

export default renderQuickLinks;
