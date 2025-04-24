const setHeaderImageHeight = (id) => {
  const productImage = document.querySelector(`.${id}-image:not(.header-column__image)`);

  const headerImage = document.querySelector('.header-column__image');

  if (productImage && headerImage) {
    const productImageHeight = productImage.offsetHeight;
    console.log('🚀 ~ setHeaderImageHeight ~ productImageHeight:', productImageHeight);
    headerImage.style.height = `${productImageHeight}px`;
  }
};

export default setHeaderImageHeight;
