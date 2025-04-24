const initializeSwipeSlider = (product) => {
  const swiperButtonNext = () => {
    const nextArrow = document.createElement("div");
    nextArrow.classList.add("swiper-button-next", "button-next");
    return nextArrow;
  };
  const swiperButtonPrev = () => {
    const prevArrow = document.createElement("div");
    prevArrow.classList.add("swiper-button-prev", "button-prev");
    return prevArrow;
  };
  if (product.querySelector("ul.product-rollup").childElementCount > 4) {
    product.querySelector(".product-rollup-list").classList.add("swiper");
    product.querySelector(".product-rollup-list").append(swiperButtonNext(), swiperButtonPrev());
    product.querySelector(".product-rollup-list ul").classList.add("swiper-wrapper");
    product.querySelectorAll(".product-rollup li").forEach((liItem) => {
      liItem.classList.add("swiper-slide");
    });
  }
  var swiper = new Swiper(".swiper", {
    observer: true,
    observeParents: true,
    parallax: true,
    autoplay: 10000,
    autoplayDisableOnInteraction: false,
    speed: 1500,
    direction: "horizontal",
    slidesPerView: 3,
    grabCursor: true,
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      751: {
        slidesPerView: 3,
      },
      320: {
        slidesPerView: 2,
      },
    },
  });
};

export default initializeSwipeSlider;
