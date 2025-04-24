const mainProduct = (id, data) => {
  const { title, shopAllUrl, image, description, btnText } = data;

  const htmlStr = `<div class='${id}__mainProduct'>
        <img src='${image}' alt='${title}' />
        <p class='${id}__title'>${title}</p>
        <p class='${id}__description'>${description}</p>
        <a href='${shopAllUrl}' class='${id}__shopNow'>${btnText}</a>
    </div>`;
  return htmlStr;
};
export default mainProduct;
