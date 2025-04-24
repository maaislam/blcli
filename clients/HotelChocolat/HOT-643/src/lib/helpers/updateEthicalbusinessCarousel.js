const updateEthicalbusinessCarousel = (id) => {
    const carouselName = '.HCN-ethicalbusiness-product-carousel';
    const carouselContainer = document.querySelector(carouselName);
    carouselContainer.classList.add(`${id}__ethicalbusinessCarousel`);
    window.jQuery(carouselName).slick('destroy');
    window.jQuery(carouselName).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        infinite: true,
        // centerMode: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    })
};
export default updateEthicalbusinessCarousel;
