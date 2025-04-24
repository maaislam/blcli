const offerCount = (id, totalCountPromos) => {
  const html = `
        ${
          totalCountPromos > 1
            ? `<span>${totalCountPromos}</span> offers available`
            : totalCountPromos === 1
            ? `<span>${totalCountPromos}</span> offer available`
            : '<span>0</span> offer available'
        }
  `;
  return html.trim();
};

export default offerCount;
