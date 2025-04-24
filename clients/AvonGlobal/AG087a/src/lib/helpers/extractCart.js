const getCartFromDOM = (id, parentElm) => {
  const title = parentElm.querySelector('[class$="_product_title"]').querySelector('h3').innerText;
  const imgSrc = parentElm.querySelector('[class$="_product_image"]').getAttribute('src');
  const quantity = parentElm.querySelector('[class$="_product_qty"]').getElementsByTagName('span')[0].innerText;
  const oldPrice = parentElm.querySelector('[class$="_product_price_old"]')?.innerText;
  const newPrice = parentElm.querySelector('[class$="_product_price_new"]').innerText;
  const variationBlock = parentElm.querySelector('[class$="_product_variation"]');
  const variantImage = variationBlock.querySelector('span')?.getAttribute('style').split('"')[1];
  const variantName = variationBlock.querySelector('p').innerText.trim();
  //console.log(variantImage);
  return {
    title,
    imgSrc,
    quantity,
    oldPrice,
    newPrice,
    variantImage,
    variantName,
  };
};
export default getCartFromDOM;
