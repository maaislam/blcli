const updateCategoryCarousel = (id) => {
    window.jQuery('.HCN-category-carousel-block--contents').slick('destroy');
    const carouselContainer = document.querySelector('.HCN-category-carousel-block--contents');
    carouselContainer.classList.add(`${id}__categoryCarousel`);
};
export default updateCategoryCarousel;
