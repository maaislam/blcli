const productCard = (id, data) => {
  const { categoryName, url, image } = data;

  const htmlStr = `<div class='${id}__productCard'>
        <a href='${url}' class="${id}__img-wrapper">
            <img src='${image}' alt='${categoryName}' />
        </a>
        <div class='${id}__details'>
            <p class='${id}__categoryName'>${categoryName}</p>
            <a href='${url}' class='${id}__shopNow'>Shop Now</a>
        </div>
    </div>`;
  return htmlStr;
};
export default productCard;
