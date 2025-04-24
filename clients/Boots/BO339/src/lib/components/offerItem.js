const offerItem = (id, data) => {
  const { offer, category, promotionTitle } = data;

  const encodedPromotionTitle = encodeURIComponent(promotionTitle);
  const encodedCategory = encodeURIComponent(category[0]);

  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  const isMonth = months.some(month => encodedCategory.toLowerCase().includes(month));

  const url = isMonth
    ? `/sitesearch?criteria.promotionalText=${encodedPromotionTitle}`
    : `/sitesearch?criteria.promotionalText=${encodedPromotionTitle}&criteria.category=${encodedCategory}`;

  const html = `
        <a href='${url}' class="${id}__offerItem swiper-slide">
            <div class="${id}__offerMainHeader">${offer}</div>
            <div class="${id}__offerSubheader">${promotionTitle}</div>
            <div class="${id}__offerLink">SHOP NOW</div>
        </a>
    `;

  return html.trim();
};

export default offerItem;
