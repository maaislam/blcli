const price = (ID, pricePerLitre, actualPrice) => {
  if (!pricePerLitre) return;
  const html = `<span class="${ID}__perLitre">(£${((actualPrice / pricePerLitre) * 1000).toFixed(2)}/Ltr)</span>`;
  return html.trim();
};

export default price;
