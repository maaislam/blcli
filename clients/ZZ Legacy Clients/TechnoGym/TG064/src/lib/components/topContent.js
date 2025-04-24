export default () => {
  const container = document.querySelector('.amshopby-page-container');
  const productLines = document.querySelector('.custom-product-line');

  // create the top content container
  const topContent = document.createElement('div');
  topContent.classList.add('TG064-topContent');
  container.insertAdjacentElement('afterbegin', topContent);

  const topText = document.querySelector('.category-title');
  topContent.appendChild(topText);
  topContent.appendChild(productLines);
};
