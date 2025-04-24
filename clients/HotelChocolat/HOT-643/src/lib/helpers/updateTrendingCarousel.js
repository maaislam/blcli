const updateTrendingCarousel = (id) => {
    window.jQuery('.HCN-product-carousel').slick('destroy');

    const carouselContainer = document.querySelector('.HCN-product-carousel');

    const htmlStr = `<a href="https://www.hotelchocolat.com/uk/apple-pie-hot-chocolate.html" class="HCN-item ${id}__promotedItem">
        <div class="HCN-item-wrapper">
            <div class='${id}__discountMessage'>20% Off Limited Time Only</div>
            <div class="HCN-item--image">
                <img src="https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwf8d7b6ea/images/504301-1X.jpg?sw=2000&sh=2000&sm=fit">
            </div>
            <div class="HCN-item--content ${id}__content">
                <h3> Apple Pie Drinking... </h3>
                <p> £13.50 </p>
            </div>
            <div class="HCN-item--content ${id}__hideContent">
                <h3> Apple Pie Drinking... </h3>
                <p> £13.50 </p>
            </div>
        </div>
    </a>`;
    carouselContainer.insertAdjacentHTML('afterbegin', htmlStr);

    window.jQuery('.HCN-product-carousel').slick({
        slidesToShow: 5,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: true,
                    centerMode: true,
                }
            }
        ]
    })
};
export default updateTrendingCarousel;
