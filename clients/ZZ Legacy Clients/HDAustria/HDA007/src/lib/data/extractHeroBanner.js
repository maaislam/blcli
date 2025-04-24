const heroBannerData = () => {
  const heroBanners = document.querySelector('.js-swiper');

  const sliderImgSource = heroBanners.querySelectorAll('img');

  return [...sliderImgSource]
    .map((item) => {
      return item.getAttribute('src') || item.getAttribute('data-src');
    })
    .filter((urls) => !urls?.includes('arrow-swiper'));
};

export default heroBannerData;
